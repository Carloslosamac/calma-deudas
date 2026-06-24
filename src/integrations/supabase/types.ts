export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      generated_casos: {
        Row: {
          category: string
          created_at: string
          debt_amount: string
          dek: string
          faq: Json
          headline: string
          hero_alt: string | null
          id: string
          keywords: string[]
          location: string
          meta_description: string | null
          name: string
          published_at: string | null
          read_time: string | null
          sections: Json
          seo_title: string | null
          slug: string
          solution: string
          status: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          debt_amount: string
          dek: string
          faq?: Json
          headline: string
          hero_alt?: string | null
          id?: string
          keywords?: string[]
          location: string
          meta_description?: string | null
          name: string
          published_at?: string | null
          read_time?: string | null
          sections?: Json
          seo_title?: string | null
          slug: string
          solution: string
          status?: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          debt_amount?: string
          dek?: string
          faq?: Json
          headline?: string
          hero_alt?: string | null
          id?: string
          keywords?: string[]
          location?: string
          meta_description?: string | null
          name?: string
          published_at?: string | null
          read_time?: string | null
          sections?: Json
          seo_title?: string | null
          slug?: string
          solution?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      generated_posts: {
        Row: {
          authors: string[]
          category: string
          created_at: string
          excerpt: string
          faq: Json
          hero_alt: string | null
          hero_image: string | null
          id: string
          key_takeaways: string[] | null
          keywords: string[] | null
          meta_description: string | null
          published_at: string | null
          read_time: string | null
          roadmap_id: number | null
          sections: Json
          seo_title: string | null
          sidebar: Json | null
          slug: string
          status: string
          title: string
          tldr: string | null
          updated_at: string
        }
        Insert: {
          authors?: string[]
          category: string
          created_at?: string
          excerpt: string
          faq?: Json
          hero_alt?: string | null
          hero_image?: string | null
          id?: string
          key_takeaways?: string[] | null
          keywords?: string[] | null
          meta_description?: string | null
          published_at?: string | null
          read_time?: string | null
          roadmap_id?: number | null
          sections?: Json
          seo_title?: string | null
          sidebar?: Json | null
          slug: string
          status?: string
          title: string
          tldr?: string | null
          updated_at?: string
        }
        Update: {
          authors?: string[]
          category?: string
          created_at?: string
          excerpt?: string
          faq?: Json
          hero_alt?: string | null
          hero_image?: string | null
          id?: string
          key_takeaways?: string[] | null
          keywords?: string[] | null
          meta_description?: string | null
          published_at?: string | null
          read_time?: string | null
          roadmap_id?: number | null
          sections?: Json
          seo_title?: string | null
          sidebar?: Json | null
          slug?: string
          status?: string
          title?: string
          tldr?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "generated_posts_roadmap_id_fkey"
            columns: ["roadmap_id"]
            isOneToOne: false
            referencedRelation: "seo_roadmap"
            referencedColumns: ["id"]
          },
        ]
      }
      generator_runs: {
        Row: {
          created_at: string
          error: string | null
          failed_count: number
          finished_at: string | null
          id: string
          published_count: number
          source: string
          started_at: string
          status: string
          target: number | null
        }
        Insert: {
          created_at?: string
          error?: string | null
          failed_count?: number
          finished_at?: string | null
          id?: string
          published_count?: number
          source?: string
          started_at?: string
          status?: string
          target?: number | null
        }
        Update: {
          created_at?: string
          error?: string | null
          failed_count?: number
          finished_at?: string | null
          id?: string
          published_count?: number
          source?: string
          started_at?: string
          status?: string
          target?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
        }
        Relationships: []
      }
      sales_cases: {
        Row: {
          case_text: string
          created_at: string
          created_by: string | null
          diagnosis_client: string | null
          diagnosis_internal: string | null
          guide_fields: Json
          id: string
          label: string
          solution_client: string | null
          solution_internal: string | null
          triage_solution: string | null
          triage_title: string | null
          updated_at: string
        }
        Insert: {
          case_text: string
          created_at?: string
          created_by?: string | null
          diagnosis_client?: string | null
          diagnosis_internal?: string | null
          guide_fields?: Json
          id?: string
          label: string
          solution_client?: string | null
          solution_internal?: string | null
          triage_solution?: string | null
          triage_title?: string | null
          updated_at?: string
        }
        Update: {
          case_text?: string
          created_at?: string
          created_by?: string | null
          diagnosis_client?: string | null
          diagnosis_internal?: string | null
          guide_fields?: Json
          id?: string
          label?: string
          solution_client?: string | null
          solution_internal?: string | null
          triage_solution?: string | null
          triage_title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      seo_index_checks: {
        Row: {
          created_at: string
          done: boolean
          done_at: string | null
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          done?: boolean
          done_at?: string | null
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          done?: boolean
          done_at?: string | null
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      seo_roadmap: {
        Row: {
          cluster: string | null
          created_at: string
          entidad: string | null
          estado: string
          id: number
          intencion: string | null
          keywords: string[] | null
          post_slug: string | null
          prioridad: string | null
          sprint: string | null
          tipo_pagina: string | null
          titulo: string
          updated_at: string
          url_sugerida: string | null
        }
        Insert: {
          cluster?: string | null
          created_at?: string
          entidad?: string | null
          estado?: string
          id: number
          intencion?: string | null
          keywords?: string[] | null
          post_slug?: string | null
          prioridad?: string | null
          sprint?: string | null
          tipo_pagina?: string | null
          titulo: string
          updated_at?: string
          url_sugerida?: string | null
        }
        Update: {
          cluster?: string | null
          created_at?: string
          entidad?: string | null
          estado?: string
          id?: number
          intencion?: string | null
          keywords?: string[] | null
          post_slug?: string | null
          prioridad?: string | null
          sprint?: string | null
          tipo_pagina?: string | null
          titulo?: string
          updated_at?: string
          url_sugerida?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      zoho_tokens: {
        Row: {
          id: number
          refresh_token: string
          updated_at: string
        }
        Insert: {
          id?: number
          refresh_token: string
          updated_at?: string
        }
        Update: {
          id?: number
          refresh_token?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
