import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface FormData {
  debt_amount: string;
  loan_number: string;
  default: string;
  fullName: string;
  email: string;
  phone: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Pipedrive lead function invoked');
    
    const formData: FormData = await req.json();
    console.log('Received form data:', { ...formData, phone: '***' }); // Hide sensitive data in logs

    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.phone) {
      throw new Error('Missing required fields: fullName, email, or phone');
    }

    // Validate input lengths
    if (formData.fullName.length > 100 || formData.email.length > 255 || formData.phone.length > 20) {
      throw new Error('Input exceeds maximum length');
    }

    const apiToken = Deno.env.get('PIPEDRIVE_API_TOKEN');
    if (!apiToken) {
      console.error('PIPEDRIVE_API_TOKEN not configured');
      throw new Error('Pipedrive API token not configured');
    }

    // Sanitize and prepare data
    const sanitizedName = formData.fullName.trim();
    const sanitizedEmail = formData.email.trim().toLowerCase();
    const sanitizedPhone = formData.phone.trim();
    const defaultStatus = formData.default === 'si' ? 'yes' : 'no';

    console.log('Creating Person in Pipedrive');
    
    // Step 1: Create Person in Pipedrive
    const personResponse = await fetch(`https://api.pipedrive.com/v1/persons?api_token=${apiToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: sanitizedName,
        email: [{ value: sanitizedEmail, primary: true }],
        phone: [{ value: sanitizedPhone, primary: true }],
      }),
    });

    if (!personResponse.ok) {
      const errorText = await personResponse.text();
      console.error('Pipedrive Person API error:', errorText);
      throw new Error(`Failed to create person in Pipedrive: ${personResponse.status}`);
    }

    const personData = await personResponse.json();
    const personId = personData.data.id;
    console.log('Person created with ID:', personId);

    // Step 2: Create Lead in Pipedrive with custom fields
    console.log('Creating Lead in Pipedrive');
    
    const leadResponse = await fetch(`https://api.pipedrive.com/v1/leads?api_token=${apiToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: sanitizedName,
        person_id: personId,
        value: {
          amount: parseInt(formData.debt_amount) || 0,
          currency: 'EUR',
        },
        label_ids: [], // Can be configured later with specific lead labels
        // Custom fields with their Pipedrive API keys
        '6daddd06a280f80804900a1a2985151fdf8af769': formData.debt_amount,        // debt_amount
        'caa93aefcc2aa65f8b9d70df8be1104b134d1a8e': defaultStatus,               // default (yes/no)
        '19fe4cbbd5b81d574d1a0e1eae0889dd81f15797': formData.loan_number,        // loan_number
      }),
    });

    if (!leadResponse.ok) {
      const errorText = await leadResponse.text();
      console.error('Pipedrive Lead API error:', errorText);
      throw new Error(`Failed to create lead in Pipedrive: ${leadResponse.status}`);
    }

    const leadData = await leadResponse.json();
    console.log('Lead created successfully:', leadData.data.id);

    // Step 3: Add a note to the lead with all the form details
    console.log('Adding note to lead with form details');
    
    const noteResponse = await fetch(`https://api.pipedrive.com/v1/notes?api_token=${apiToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: `📋 DETALLES DEL ANÁLISIS DE DEUDA

💰 Monto total de deuda: ${formData.debt_amount}€
🏦 Número de préstamos/entidades: ${formData.loan_number}
⚠️ Estado de mora: ${defaultStatus === 'yes' ? '✅ SÍ - En impago' : '❌ NO - Al corriente'}

👤 Datos de contacto:
- Nombre completo: ${sanitizedName}
- Email: ${sanitizedEmail}
- Teléfono: ${sanitizedPhone}

🎯 Próximos pasos: Contactar para análisis detallado de la situación financiera`,
        lead_id: leadData.data.id,
        person_id: personId,
        pinned_to_lead_flag: 1, // Pin the note so it's always visible
      }),
    });

    if (!noteResponse.ok) {
      console.error('Failed to add note, but lead was created successfully');
    }

    return new Response(
      JSON.stringify({
        success: true,
        personId: personId,
        leadId: leadData.data.id,
        message: 'Lead created successfully in Pipedrive',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in pipedrive-lead function:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
