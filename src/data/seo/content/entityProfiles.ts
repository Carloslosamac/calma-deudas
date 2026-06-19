/**
 * Perfiles ÚNICOS por entidad (generados con investigación real del sector y
 * revisados). Aportan el contenido diferenciador de cada ficha para evitar
 * contenido duplicado: intro, origen real, prácticas, miedos específicos y FAQ
 * propias. Las plantillas de entityContent.tsx los combinan con la estructura común.
 */

export type EntityWorry = { fear: string; reality: string };
export type EntityProfileFaq = { q: string; a: string };
export type EntityProfile = {
  metaDescription: string;
  intro: string;
  origin: string;
  detail: string;
  worries: EntityWorry[];
  faqs: EntityProfileFaq[];
};

export const entityProfiles: Record<string, EntityProfile> = {
  "kruk": {
    "metaDescription": "¿Recibes llamadas de Kruk? Descubre cómo gestionar tus deudas con Kruk España, tus derechos ante sus recobros y cómo la Ley de Segunda Oportunidad puede ayudarte.",
    "faqs": [
      {
        "a": "Casi siempre. Si la deuda proviene de una tarjeta revolving o un micropréstamo, nosotros podemos revisar si los intereses que te está reclamando Kruk son ilegales para anular esa parte o incluso la deuda entera.",
        "q": "¿Puedo negociar con Kruk el importe que me piden?"
      },
      {
        "q": "¿Cómo sé si mi deuda ha pasado a manos de Kruk oficialmente?",
        "a": "Kruk te avisará de que han comprado tu deuda mediante una carta certificada o notificación; a partir de ahí, ellos son tus nuevos acreedores y tienes derecho a pedirles el desglose completo de lo que te reclaman."
      }
    ],
    "detail": "Kruk se especializa en comprar carteras de deuda \"ya vencida\" a bancos como CaixaBank o BBVA, lo que significa que a menudo intentan cobrar deudas que ya han prescrito o que incluyen intereses abusivos del contrato original. Sus prácticas incluyen el contacto telefónico insistente y el envío de cartas que sugieren el inicio de acciones judiciales inmediatas para presionar al pago.",
    "worries": [
      {
        "fear": "¿Me van a embargar la nómina mañana mismo porque me lo han dicho por teléfono?",
        "reality": "No, Kruk no tiene poder para embargar nada directamente; solo un juez puede ordenar un embargo tras un proceso judicial largo donde tú tienes derecho a defenderte y oponerte."
      },
      {
        "fear": "¿Voy a estar en ASNEF para siempre por culpa de esta deuda comprada?",
        "reality": "La ley limita el tiempo que puedes estar en ficheros de morosidad y, además, si la deuda es nula o el importe es incorrecto, podemos solicitar la cancelación de tus datos en esos registros."
      }
    ],
    "origin": "Kruk España forma parte del Grupo Kruk, una multinacional de origen polaco que opera en varios países europeos como uno de los mayores gestores de activos impagados. No son un banco, sino un fondo que compra paquetes de deudas a entidades financieras por un precio muy inferior al valor real para luego intentar cobrarlas íntegramente.",
    "intro": "Si has recibido una carta de Kruk España, probablemente sientas la presión de quien te reclama una deuda que ya habías olvidado o que no para de crecer. Estamos aquí para decirte que, aunque ellos sean los nuevos dueños de esa deuda, tú sigues teniendo derechos legales para defenderte."
  },
  "intrum": {
    "faqs": [
      {
        "a": "Sí, como nuevos dueños de la deuda tienen derecho a iniciar el proceso, pero esto no significa que vayan a embargarte mañana; antes debe haber un juicio donde tú puedes defenderte.",
        "q": "¿Puede Intrum presentar una demanda de monitorio contra mí?"
      },
      {
        "a": "Rotundamente sí. Al ser un tercero que compró tu deuda por mucho menos de su valor real, existe un margen de negociación que permite cerrar el expediente con una quita importante.",
        "q": "¿Es posible negociar una reducción de la deuda con ellos?"
      }
    ],
    "detail": "Intrum se especializa en la compra de paquetes de deuda 'fallida' a bancos y teleoperadoras, intentando cobrar el importe íntegro mediante una gestión de recobro muy insistente. A menudo aplican comisiones de gestión o intereses que pueden ser objeto de reclamación si no estaban claramente estipulados en el contrato original.",
    "origin": "Intrum es una multinacional de origen sueco que se ha consolidado como uno de los mayores gestores de activos y recobro en España tras absorber a firmas como Lindorff o Aktua. Su modelo de negocio principal es la adquisición de carteras de impagos a entidades financieras para gestionarlas en su propio beneficio.",
    "metaDescription": "¿Recibes llamadas de Intrum? Descubre cómo gestionar tus deudas con ellos, tus derechos legales y cómo la Ley de Segunda Oportunidad puede ayudarte a recuperar la paz.",
    "worries": [
      {
        "reality": "Solo un juez puede ordenar un embargo tras un proceso judicial donde tienes derecho a oponerte; Intrum no tiene potestad para quitarte el dinero directamente.",
        "fear": "Me amenazan con enviarme al juzgado y embargar mi nómina de inmediato."
      },
      {
        "reality": "El acoso telefónico sistemático es denunciable y existen límites legales sobre la frecuencia y el horario de las comunicaciones de recobro.",
        "fear": "Me llaman a todas horas, incluso al trabajo, y me siento acosado."
      }
    ],
    "intro": "Si has recibido una carta o llamada de Intrum, probablemente sientas la presión de una deuda que parece no tener fin, pero recuerda que ahora eres tú quien tiene el control para negociar."
  },
  "eos": {
    "detail": "EOS Spain centra su actividad en la gestión de expedientes de recobro y la adquisición de carteras de deuda fallida, lo que significa que a menudo reclaman importes que originalmente pertenecían a bancos o energéticas. El conflicto suele surgir por la falta de transparencia en la cesión del contrato y la aplicación de intereses de demora o comisiones de gestión que inflan considerablemente la deuda original.",
    "faqs": [
      {
        "a": "Sí, es posible negociar un pago único con una quita (descuento) importante sobre el total, ya que ellos compraron tu deuda por un precio muy bajo y cualquier beneficio les resulta rentable.",
        "q": "¿Puedo proponer una quita a EOS Spain para cerrar mi deuda?"
      },
      {
        "a": "Si estás en una situación de insolvencia y cumples los requisitos de la Ley de Segunda Oportunidad, puedes cancelar legalmente todas las deudas gestionadas por EOS Spain sin tener que pagarlas.",
        "q": "¿Qué pasa si no puedo pagar lo que EOS Spain me reclama?"
      }
    ],
    "worries": [
      {
        "reality": "EOS Spain no tiene poder legal para embargar directamente; solo un juez puede ordenar un embargo tras un proceso judicial donde tú tienes derecho a defenderte.",
        "fear": "Me dicen que me van a embargar la nómina mañana mismo si no pago."
      },
      {
        "reality": "Estar en un fichero de morosos es reversible: una vez que se gestiona la deuda o se aplica la Ley de Segunda Oportunidad, el registro debe ser borrado por ley.",
        "fear": "Me han incluido en ASNEF y ya no puedo pedir ni una tarjeta ni un alta de suministros."
      }
    ],
    "metaDescription": "¿Te reclama una deuda EOS Spain? Descubre cómo gestionar sus reclamaciones, negociar quitas o cancelar tus deudas legalmente con la Ley de Segunda Oportunidad.",
    "intro": "Si has recibido una carta o llamada de EOS Spain, es probable que sepas lo que es sentir esa presión constante por una deuda que ya ni recordabas o que ha crecido sin control. No estás tratando con tu banco de siempre, sino con un especialista en recobros, pero eso no significa que no tengas salidas legales para recuperar tu tranquilidad.",
    "origin": "EOS Spain pertenece al Grupo EOS, un gigante internacional de origen alemán especializado en la gestión de activos y compra de carteras de crédito impagadas. En España, operan adquiriendo paquetes de deudas a entidades financieras y empresas de servicios para intentar cobrarlas de forma masiva."
  },
  "axactor": {
    "worries": [
      {
        "fear": "Me dicen que me van a embargar la nómina mañana mismo si no pago ahora.",
        "reality": "Axactor no tiene poder para embargar; solo un juez puede ordenar un embargo tras un proceso monitorio donde tú tienes derecho a defenderte y oponerte."
      },
      {
        "reality": "La ley protege tu privacidad y dignidad; el acoso telefónico recurrente o informar a terceros de tu deuda es denunciable y puede invalidar sus reclamaciones en ciertos casos.",
        "fear": "Me acosan con llamadas constantes a mi trabajo y a mis familiares."
      }
    ],
    "faqs": [
      {
        "a": "Como nuevos dueños de la deuda, legalmente pueden hacerlo incluso si no existe una sentencia judicial previa, aunque existen límites legales y procedimientos para salir de estos ficheros una vez resuelta la situación.",
        "q": "¿Puede Axactor incluirme en ASNEF si acaban de comprar mi deuda?"
      },
      {
        "a": "No estás obligado a aceptar su primera oferta; de hecho, estas empresas suelen estar abiertas a negociaciones o quitas importantes si se demuestra incapacidad de pago o si existen cláusulas abusivas en el contrato original.",
        "q": "¿Es obligatorio pagar la cantidad total que Axactor me reclama de golpe?"
      }
    ],
    "metaDescription": "¿Recibes llamadas de Axactor? Descubre quiénes son, por qué tienen tu deuda y cómo negociar o cancelarla con la Ley de Segunda Oportunidad. Recupera tu tranquilidad.",
    "detail": "Axactor se especializa en adquirir grandes carteras de deuda fallida a bancos como Santander, BBVA o CaixaBank, a menudo por una fracción de su valor nominal. Su modelo de negocio se basa en el recobro intensivo de créditos al consumo, descubiertos bancarios y deudas de tarjetas que las entidades originales ya dieron por perdidas.",
    "intro": "Si has recibido una carta o llamada de Axactor, es probable que tu antigua deuda bancaria haya cambiado de manos y ahora sientas la presión de un gigante del recobro europeo.",
    "origin": "Axactor es un grupo multinacional de origen noruego que opera en España como uno de los principales gestores de cobro y compradores de activos tóxicos. No son un banco, sino un \"servicer\" que adquiere paquetes de deudas impagadas para intentar rentabilizarlas mediante la reclamación amistosa o judicial."
  },
  "link-finanzas": {
    "worries": [
      {
        "reality": "Solo un juez puede ordenar un embargo tras un proceso judicial en el que tienes derecho a defenderte y revisar si la deuda contiene intereses abusivos.",
        "fear": "Me van a embargar la cuenta mañana mismo si no pago lo que dicen los de Link Finanzas."
      },
      {
        "fear": "Si Link Finanzas me ha metido en ASNEF, nunca más podré pedir financiación.",
        "reality": "Estar en un fichero de morosos es reversible; si la deuda es ilegítima o si te acoges a la Ley de Segunda Oportunidad, tus datos deben ser borrados legalmente."
      }
    ],
    "detail": "Como fondo de recobro, Link Finanzas suele reclamar deudas procedentes de microcréditos o tarjetas revolving con intereses que podrían ser considerados abusivos por la jurisprudencia española. Esto abre la puerta a reclamar el exceso de intereses pagados o incluso a anular el contrato si se demuestra falta de transparencia en la contratación original.",
    "faqs": [
      {
        "a": "Sí, como nuevos dueños de la deuda tienen derecho a reclamar, pero deben acreditar fehacientemente que la compra se realizó legalmente y tú conservas todos tus derechos de defensa.",
        "q": "¿Es legal que Link Finanzas me pida un dinero que yo no contraté con ellos?"
      },
      {
        "q": "¿Tengo que pagar obligatoriamente todo lo que Link Finanzas me pide?",
        "a": "No siempre; a veces compran carteras de deudas ya prescritas o con documentación incompleta, lo que facilita mucho la negociación o la cancelación total mediante la Ley de Segunda Oportunidad."
      }
    ],
    "origin": "Link Finanzas es lo que se conoce formalmente como un fondo de adquisición de activos, especializado en comprar \"paquetes\" de deudas impagadas a bancos y entidades de crédito. Su modelo de negocio se basa en comprar estas carteras por un precio inferior al valor nominal para luego intentar recuperar el total de la deuda del consumidor.",
    "intro": "¿Te ha llegado una carta o llamada de Link Finanzas reclamándote una deuda que antes era de un banco o una financiera? No te asustes, es una situación más común de lo que crees y tiene soluciones legales definitivas.",
    "metaDescription": "¿Te reclama una deuda Link Finanzas? Descubre cómo gestionar sus reclamaciones, defender tus derechos ante sus métodos de recobro y recuperar tu tranquilidad hoy."
  },
  "gescobro": {
    "detail": "Esta entidad no concede préstamos, sino que adquiere deudas ya existentes de bancos para intentar cobrarlas mediante presión telefónica constante. Sus reclamaciones a menudo incluyen comisiones de posición deudora y cargos adicionales que pueden ser legalmente cuestionables o haber prescrito.",
    "faqs": [
      {
        "a": "Por supuesto; al ser un fondo que compra deudas a bajo precio, suelen estar abiertos a quitas importantes, aunque siempre es mejor que un profesional valide si la deuda es real y no ha prescrito.",
        "q": "¿Puedo negociar con Gescobro para pagar menos del total?"
      },
      {
        "a": "No tienen autoridad para embargarte directamente; solo un juez puede hacerlo tras un proceso judicial donde tú tienes derecho a defenderte y oponerte.",
        "q": "¿Tienen poder para quitarme el dinero de la cuenta mañana mismo?"
      }
    ],
    "metaDescription": "¿Te reclama Gescobro una deuda? Descubre cómo gestionar sus llamadas, si pueden embargarte y cómo acogerte a la Ley de Segunda Oportunidad con Calma.",
    "origin": "Gescobro es una de las mayores agencias de gestión de cobro y recuperación de impagos en España, con más de 40 años de trayectoria. Actúan tanto como gestores para terceros como compradores de carteras de deuda fallida (deuda que el banco ya da por perdida).",
    "worries": [
      {
        "fear": "Me amenazan con meterme en el juicio y quitarme la casa por una deuda de tarjeta de hace años.",
        "reality": "Gescobro suele usar un tono impositivo, pero la realidad es que para embargar bienes necesitan ganar un juicio monitorio, donde tú puedes oponerte si hay cláusulas abusivas."
      },
      {
        "fear": "No paran de llamar a mi trabajo y a mis familiares, me da mucha vergüenza.",
        "reality": "El acoso telefónico a terceros es una práctica regulada y limitada; tienes derecho a exigir que paren y a canalizar toda la comunicación a través de profesionales para proteger tu privacidad."
      }
    ],
    "intro": "Si Gescobro ha empezado a llamarte a todas horas por una deuda que ni recordabas o que ya no podías pagar, no estás solo en esto. Es el momento de recuperar tu tranquilidad y entender que recibir sus cartas no significa que todo esté perdido."
  },
  "hoist-finance": {
    "origin": "Hoist Finance es una institución financiera de origen sueco que opera en España como uno de los principales compradores de carteras de deuda impagada (lo que comúnmente se conoce como 'fondo buitre'). Se especializan en adquirir préstamos y tarjetas de crédito de grandes bancos para gestionar ellos mismos el recobro a través de vía amistosa o judicial.",
    "detail": "Esta entidad no suele conceder préstamos, sino que adquiere deudas ya existentes de bancos como Santander o Wizink para intentar cobrarlas por su cuenta. Las reclamaciones suelen surgir porque aplican intereses de demora elevados o porque el cliente ya no reconoce la deuda original debido a la falta de documentación clara tras la venta del crédito.",
    "intro": "Si las cartas o llamadas de Hoist Finance han empezado a interrumpir tu tranquilidad, es normal sentir incertidumbre, pero recuerda que ellos solo son los nuevos dueños de una deuda antigua que aún tiene solución.",
    "faqs": [
      {
        "q": "¿Es posible negociar una rebaja de la deuda con Hoist Finance?",
        "a": "Sí, al ser un fondo de compra de deuda, suelen estar más abiertos a negociar quitas (descuentos) importantes porque ellos compraron tu deuda por un precio mucho menor al valor nominal."
      },
      {
        "a": "Lo primero es solicitar que acrediten la titularidad de la deuda y el desglose de lo que piden; si la deuda es inasumible, la Ley de Segunda Oportunidad puede ser tu mejor aliada para cancelarla.",
        "q": "¿Qué debo hacer si recibo una carta de Hoist Finance reclamando una deuda bancaria vieja?"
      }
    ],
    "metaDescription": "¿Recibes reclamaciones de Hoist Finance? Descubre quiénes son, cómo gestionar sus deudas y cómo la Ley de Segunda Oportunidad puede ayudarte a empezar de cero.",
    "worries": [
      {
        "fear": "Me han dicho que me van a embargar la nómina mañana mismo si no pago.",
        "reality": "Nadie puede embargarte sin pasar antes por un proceso judicial y una sentencia de un juez; las empresas de recobro no tienen autoridad para ejecutar embargos por sí mismas."
      },
      {
        "reality": "La ley de protección de datos es muy estricta y les prohíbe revelar tu situación de impago a terceros; si lo hacen, están cometiendo una infracción que puedes denunciar.",
        "fear": "Me da vergüenza que llamen a mis vecinos o a mi trabajo para informar de mi deuda."
      }
    ]
  },
  "servdebt": {
    "worries": [
      {
        "reality": "Un fondo de recobro no puede embargarte directamente; solo un juez puede hacerlo tras un proceso judicial donde tú tienes derecho a defenderte y oponerte a los intereses abusivos.",
        "fear": "Me amenazan con embargar mi sueldo inmediatamente si no pago lo que piden."
      },
      {
        "reality": "Estar en un fichero de morosos es reversible: una vez que se gestiona la deuda o se inicia la Ley de Segunda Oportunidad, puedes solicitar la baja y recuperar tu solvencia financiera.",
        "fear": "Me han incluido en ASNEF y no puedo pedir ni una tarjeta de crédito."
      }
    ],
    "intro": "¿Has recibido una notificación de Servdebt sobre una deuda que ni siquiera recordabas tener con tu antiguo banco? No te asustes, es más común de lo que crees y tiene una solución clara.",
    "faqs": [
      {
        "a": "Sí, como nuevos propietarios legales de la deuda, tienen derecho a reclamar judicialmente, pero antes de llegar ahí siempre hay margen para una mediación profesional o una reestructuración legal.",
        "q": "¿Puede Servdebt llevarme a juicio si no pago? Pantaleón?"
      },
      {
        "a": "Completamente. Al ser una entidad que compra deuda con descuento, están más abiertos a negociaciones de \"quita\" o, si cumples los requisitos, a ser incluidos en un proceso de Segunda Oportunidad para cancelar el total.",
        "q": "¿Es posible negociar una reducción de la deuda con ellos?"
      }
    ],
    "metaDescription": "¿Te reclama Servdebt una deuda? Descubre quiénes son, cómo gestionar sus llamadas y cómo cancelar tus deudas legalmente con Calma. Recupera tu tranquilidad.",
    "origin": "Servdebt es una entidad de gestión de activos y recuperación de deuda con una fuerte presencia en la Península Ibérica, operando como un \"servicer\" especializado. Se encargan de comprar grandes paquetes de créditos impagados a entidades bancarias para intentar cobrarlos por su cuenta.",
    "detail": "Servdebt actúa principalmente mediante la adquisición de carteras de deuda fallida a bancos como Santander o BBVA, gestionando desde préstamos personales hasta hipotecas en mora. Su modelo de negocio se basa en la insistencia telefónica y la presión judicial para recuperar créditos que compraron con un alto descuento, lo que a menudo permite negociar quitas importantes si se conoce el procedimiento legal."
  },
  "gesif": {
    "origin": "Gesif es una entidad con una larga trayectoria en España especializada en la gestión de cobro y recuperación de activos para terceros. A menudo trabaja comprando carteras de deuda impagada a bancos o grandes compañías de servicios, convirtiéndose en el nuevo titular de esos compromisos financieros.",
    "intro": "Si Gesif ha empezado a enviarte cartas o a llamarte, es probable que sientas el desconcierto de no saber quiénes son ni por qué tienen tus datos. Estamos aquí para decirte que tu situación con ellos tiene solución y que no tienes por qué afrontar esta presión en solitario.",
    "metaDescription": "¿Te reclama una deuda Gesif? Descubre quiénes son, cómo gestionar sus reclamaciones y cómo la Ley de Segunda Oportunidad puede ayudarte a cancelar tus deudas.",
    "faqs": [
      {
        "a": "Gesif ha comprado tu deuda a tu antiguo banco; ahora ellos son los nuevos acreedores y son quienes tienen el derecho legal de reclamar el pago.",
        "q": "¿Por qué me reclama Gesif si yo nunca contraté nada con ellos?"
      },
      {
        "a": "Sí, como gestores de carteras de deuda, están facultados para iniciar procedimientos judiciales, aunque siempre es preferible intentar una negociación o acogerte a la Ley de Segunda Oportunidad antes de llegar a ese punto.",
        "q": "¿Es verdad que Gesif puede llevarme a juicio por una deuda pequeña?"
      }
    ],
    "worries": [
      {
        "reality": "Aunque pueden incluirte en ficheros como ASNEF si existe una deuda real, una vez que solucionamos tu situación legalmente o mediante el perdón de deudas, tienes el derecho de desaparecer de esas listas y recuperar tu libertad financiera.",
        "fear": "Me amenazan con meterme en una lista de morosos y no podré volver a pedir un prestamo nunca."
      },
      {
        "reality": "Existen límites legales estrictos sobre el acoso y la protección de datos; no pueden informar a terceros de tu situación, y una vez que inicias un proceso de mediación o Ley de Segunda Oportunidad, esas llamadas deben cesar.",
        "fear": "No dejan de llamarme al trabajo y tengo miedo de que mis compañeros se enteren."
      }
    ],
    "detail": "Gesif actúa como un intermediario que adquiere o gestiona paquetes de deudas procedentes de préstamos personales, tarjetas y líneas de crédito de diversas entidades financieras. El problema principal radica en que la falta de información clara sobre el desglose de la deuda y la aplicación de comisiones adicionales provocan que los afectados se sientan atrapados en un bucle de pagos que nunca termina."
  },
  "procobro": {
    "worries": [
      {
        "fear": "Me dicen que me van a embargar la casa mañana mismo si no pago ahora.",
        "reality": "Nadie puede embargarte sin una sentencia judicial previa de un juez; Procobro solo puede proponer acuerdos o iniciar un monitorio, nunca ejecutar un embargo por su cuenta."
      },
      {
        "reality": "El acoso reiterado y la comunicación de tus deudas a terceros son prácticas que pueden vulnerar la Protección de Datos; tienes derecho a solicitar el cese de estas comunicaciones y a que se respete tu privacidad.",
        "fear": "No paran de llamar a mi trabajo y a mis familiares para presionarme."
      }
    ],
    "intro": "Si Procobro ha empezado a llamarte día y noche, es probable que hayan comprado una antigua deuda tuya y ahora intenten cobrarla con intereses acumulados; respira, aquí empieza tu camino para recuperar la paz.",
    "faqs": [
      {
        "a": "Sí, es lo que ocurre cuando una entidad vende su cartera de impagados; aun así, tienes derecho a exigir que demuestren por escrito que esa deuda es legítima y está vigente.",
        "q": "¿Es legal que me contacten si yo no contraté nada directamente con Procobro?"
      },
      {
        "a": "Si la deuda incluye intereses desproporcionados, es posible reclamar judicialmente para anularlos o recurrir a la Ley de Segunda Oportunidad si tu situación es de insolvencia total.",
        "q": "¿Puedo reducir el importe que me reclama Procobro?"
      }
    ],
    "metaDescription": "¿Recibes llamadas de Procobro? Descubre cómo gestionar tus deudas, frenar el acoso telefónico y recuperar la tranquilidad con soluciones legales a tu medida.",
    "detail": "Procobro gestiona deudas procedentes de préstamos rápidos, tarjetas y microcréditos adquiridos de terceras entidades, aplicando a menudo intereses que pueden considerarse abusivos. Su operativa se basa en una insistencia telefónica constante para cobrar importes que, en ocasiones, el deudor ni siquiera reconoce como propios tras el paso de los años.",
    "origin": "Procobro es una agencia de recobro española especializada en la gestión y mediación de impagos para grandes fondos y entidades financieras. Actúan como el \"rostro visible\" de deudas que han cambiado de manos, centrando su actividad en la recuperación por vía extrajudicial y judicial."
  },
  "iberia-collections": {
    "metaDescription": "¿Te reclama Iberia Collections? Descubre quiénes son, cómo funcionan sus cobros y las opciones legales para reducir tu deuda o eliminarla con la Ley de Segunda Oportunidad.",
    "origin": "Iberia Collections es una agencia de gestión de cobros y recobro de deudas que opera en el mercado español, especializada en la recuperación de activos para terceros o la gestión de carteras adquiridas. Actúan como el nuevo titular de tu deuda o como gestores de fondos de inversión que compran paquetes de préstamos impagados a la banca tradicional.",
    "detail": "Iberia Collections gestiona carteras de deuda procedentes principalmente de préstamos personales, tarjetas y líneas de crédito que los bancos originales dieron por perdidas. Sus reclamaciones suelen incluir intereses de demora y comisiones por reclamación de posiciones deudoras que pueden ser legalmente cuestionables si se analiza el contrato original.",
    "intro": "Si estás recibiendo llamadas o cartas de Iberia Collections, es probable que hayan comprado una deuda que antes tenías con otra entidad. No te asustes: que tu expediente haya cambiado de manos no significa que hayas perdido tus derechos ni que no tenga solución.",
    "worries": [
      {
        "reality": "Para que la inclusión sea legal, deben haberte notificado la cesión de la deuda y el requerimiento de pago previo; si no cumplen los requisitos formales, podrías reclamar el borrado de tus datos.",
        "fear": "Me amenazan con incluirme en el ASNEF de forma inmediata."
      },
      {
        "reality": "Solo un juez puede ordenar un embargo tras un proceso judicial; Iberia Collections es una empresa privada y no tiene autoridad para entrar en tu vivienda ni retirarte bienes por su cuenta.",
        "fear": "Van a venir a mi casa a embargarme los muebles o el coche."
      }
    ],
    "faqs": [
      {
        "q": "¿Pueden llevarme a juicio si no pago?",
        "a": "Sí, Iberia Collections tiene capacidad legal para demandar, pero antes de llegar ahí, suele pasar por una fase de reclamación amistosa donde se pueden negociar quitas o reestructurar el pago."
      },
      {
        "a": "Por supuesto; de hecho, al ser un fondo que compra deuda con descuento, a veces están más abiertos a aceptar una 'quita' (reducción de la deuda) que el banco original para cerrar el expediente rápido.",
        "q": "¿Es posible negociar una rebaja de lo que me piden?"
      }
    ]
  },
  "garnet": {
    "faqs": [
      {
        "q": "¿Puede Garnet meterme en ASNEF si no he contratado nada con ellos directamente?",
        "a": "Como nuevo propietario de la deuda, Garnet puede incluirte legalmente si la deuda es cierta y exigible, pero si existen irregularidades o la deuda está prescrita, puedes exigir que retiren tus datos inmediatamente."
      },
      {
        "a": "No necesariamente; estas empresas suelen preferir acuerdos extrajudiciales antes de llegar al juzgado, y en Calma podemos ayudarte a negociar una quita importante o evaluar si la Ley de Segunda Oportunidad permite cancelar la deuda.",
        "q": "Si recibo una carta de Garnet, ¿me van a embargar la cuenta mañana mismo?"
      }
    ],
    "intro": "Si has recibido una notificación de Garnet reclamándote un pago, es muy probable que no los conozcas de nada, pero ellos sí saben los detalles de tu antigua deuda bancaria. No te asustes por el nombre: es solo un fondo que ha comprado tu expediente para intentar cobrarlo, y eso te abre nuevas vías legales para defenderte.",
    "worries": [
      {
        "fear": "Me llaman a todas horas y dicen que me van a llevar a juicio de inmediato.",
        "reality": "Garnet utiliza la presión telefónica como estrategia comercial, pero solo un juez puede ordenar un embargo tras un proceso judicial largo donde tú tienes derecho a defenderte y revisar las cláusulas abusivas."
      },
      {
        "fear": "Si han comprado mi deuda, ahora tendré que pagar mucho más de lo que debía al principio.",
        "reality": "Al ser una deuda comprada a terceros, a menudo carecen de la documentación completa del contrato original, lo que nos permite cuestionar la legitimidad de los intereses y, en muchos casos, reducir drásticamente lo que te piden."
      }
    ],
    "origin": "Garnet es un fondo de inversión que opera en el mercado español especializado en la adquisición y gestión de carteras de deuda \"NPL\" (créditos no productivos). Compran paquetes de deuda masiva a bancos tradicionales por una fracción de su valor real para después intentar recuperar el importe total del consumidor.",
    "detail": "Garnet actúa como gestor de cobros y comprador de carteras procedentes de préstamos bancarios o tarjetas de crédito que las entidades originales dan por perdidas. Sus reclamaciones suelen derivar de deudas antiguas que han acumulado intereses de demora o que presentan falta de transparencia en el contrato original, lo que permite impugnar judicialmente gran parte de las cantidades exigidas.",
    "metaDescription": "¿Recibes reclamaciones de Garnet? Descubre cómo gestionar tu deuda con ellos, evitar el acoso telefónico y recuperar tu tranquilidad financiera con Calma."
  },
  "medina-cuadros": {
    "detail": "Esta entidad actúa principalmente como despacho jurídico y gestor de recobros para grandes bancos y fondos de inversión, utilizando la vía judicial como herramienta de presión. Es habitual encontrar reclamaciones por su insistencia telefónica o por iniciar procesos de monitorio para recuperar deudas que, en ocasiones, incluyen intereses que podrían considerarse abusivos o falta de documentación original.",
    "faqs": [
      {
        "q": "He recibido un monitorio de Medina Cuadros, ¿qué hago?",
        "a": "Es una notificación judicial real; ignorarlo puede derivar en un embargo automático tras 20 días. Contacta con nosotros para revisar si la deuda es correcta o si podemos negociar una quita importante o acogerte a la Ley de Segunda Oportunidad."
      },
      {
        "a": "Sí, si cumples los requisitos de insolvencia, puedes cancelar legalmente las deudas que te reclaman a través de este despacho, paralizando cualquier embargo en curso desde el inicio del proceso.",
        "q": "¿Puedo meter la deuda de Medina Cuadros en la Ley de Segunda Oportunidad?"
      }
    ],
    "metaDescription": "¿Recibes reclamaciones de Medina Cuadros? Recupera la tranquilidad. Te explicamos cómo gestionar sus llamadas y cómo cancelar deudas legalmente con Calma.",
    "origin": "Medina Cuadros es un veterano despacho de abogados español especializado en la gestión integral de cobros y servicios jurídicos para terceros. No suelen ser los dueños originales de tu préstamo, sino los representantes legales que entidades financieras contratan para recuperar impagos mediante la vía extrajudicial y judicial.",
    "worries": [
      {
        "reality": "Medina Cuadros no puede embargarte directamente; solo un juez puede hacerlo tras un proceso judicial donde tú tienes derecho a defenderte y oponerte si hay cláusulas abusivas.",
        "fear": "Me dicen que van a embargar mi nómina mañana mismo si no pago ahora."
      },
      {
        "reality": "La ley de protección de datos y el derecho al honor te protegen; si sus métodos sobrepasan el límite, esas deudas pueden ser cuestionadas y las comunicaciones limitadas legalmente.",
        "fear": "Me llaman a todas horas y temo que contacten con mis vecinos o mi trabajo."
      }
    ],
    "intro": "Si el nombre de Medina Cuadros ha aparecido en tu buzón o en tu teléfono, es normal que sientas una presión extra por su enfoque legal. Estamos aquí para recordarte que una carta del juzgado no es el final, sino el momento de empezar a defender tus derechos."
  },
  "gcbe": {
    "worries": [
      {
        "fear": "Me han dicho que si no pago hoy mismo, iniciarán un embargo inmediato sobre mi nómina.",
        "reality": "Solo un juez puede ordenar un embargo tras un procedimiento judicial; GCBE es una empresa privada y no tiene autoridad para quitarte dinero directamente de tu cuenta sin pasar por el juzgado."
      },
      {
        "reality": "Muchas de estas carteras incluyen intereses de demora que pueden ser considerados abusivos por un juez; tienes derecho a oponerte a esos importes inflados y revisarlos legalmente.",
        "fear": "La deuda que me piden es el doble de lo que yo recordaba haber dejado de pagar en su día."
      }
    ],
    "intro": "Si has empezado a recibir llamadas o cartas de GCBE, es probable que se deba a una deuda que tenías con un banco o compañía de teléfono y que ellos han comprado ahora. No te asustes, ver su nombre en tu buzón no es el fin del camino, sino el inicio de una fase donde tú puedes retomar el control.",
    "faqs": [
      {
        "q": "¿Tengo derecho a pedirles que me demuestren de dónde viene el importe total?",
        "a": "Por supuesto, puedes solicitarles por escrito el desglose detallado y el certificado de deuda para verificar que el importe que te piden se ajusta a la realidad de lo que debías originalmente."
      },
      {
        "a": "Tener el nombre en un fichero de morosos es una situación reversible; en el momento en que inicias un proceso legal de Ley de Segunda Oportunidad o alcanzas un acuerdo validado, existen mecanismos para limpiar tu historial crediticio.",
        "q": "¿GCBE puede mantenerme en ASNEF para siempre si no puedo pagarles todo ahora?"
      }
    ],
    "detail": "GCBE se especializa en la gestión y compra de carteras de deuda procedentes de entidades financieras y grandes empresas de suministros. Su práctica habitual es realizar un seguimiento insistente para recuperar el principal más intereses, lo que a menudo genera reclamaciones debido a la falta de claridad en el origen de la deuda o la aplicación de comisiones adicionales.",
    "metaDescription": "¿Te reclama GCBE una deuda? Descubre quiénes son, cómo gestionar sus reclamaciones y cómo la Ley de Segunda Oportunidad puede ayudarte a cancelar tus deudas.",
    "origin": "GCBE (Gestiô de Cobros Barcelona) es una entidad española dedicada profesionalmente a la recuperación de activos y la gestión de deudas impagadas. Actúan tanto como gestores de recobro para terceros como propietarios de las deudas que adquieren a precios reducidos para luego intentar cobrarlas íntegramente."
  },
  "prime-credit": {
    "detail": "Prime Credit actúa como un fondo de recobro que adquiere carteras de créditos fallidos, procedentes habitualmente de microcréditos o préstamos al consumo de diversas financieras. Las reclamaciones suelen surgir porque aplican intereses que muchas veces se consideran abusivos o por reclamar deudas que el usuario ya creía olvidadas o liquidadas.",
    "faqs": [
      {
        "q": "¿Es legal que Prime Credit me contacte si yo no he firmado nada con ellos?",
        "a": "Sí, como nuevos dueños de la deuda, tienen el derecho legal de contactarte para el cobro, pero siempre dentro de los límites del respeto y la legalidad vigente. No pueden acosarte."
      },
      {
        "a": "Absolutamente; a menudo es posible renegociar el importe total o, si cumples los requisitos, incluir esta deuda en un proceso de Ley de Segunda Oportunidad para cancelarla legalmente.",
        "q": "¿Puedo llegar a un acuerdo para pagar menos de lo que me piden?"
      }
    ],
    "worries": [
      {
        "reality": "Solo un juez puede ordenar un embargo tras un proceso judicial previo; Prime Credit es una empresa privada y no tiene autoridad para quitarte el dinero directamente.",
        "fear": "Me han dicho que me van a embargar la nómina mañana mismo si no pago."
      },
      {
        "reality": "La Ley de Protección de Datos prohíbe terminantemente que informen a terceros sobre tu situación financiera, y de hacerlo, estarían cometiendo una infracción grave.",
        "fear": "Van a llamar a mi trabajo o a mis vecinos para informar de mi deuda."
      }
    ],
    "origin": "Prime Credit es una entidad que opera en España especializada en la gestión y recuperación de activos financieros impagados. Su modelo de negocio consiste en comprar paquetes de deuda a bancos y financieras por un precio inferior al valor nominal para luego intentar cobrarlos íntegramente.",
    "intro": "Si Prime Credit ha empezado a contactarte por una deuda que ni siquiera recordabas tener, respira: es una situación más común de lo que crees y tiene solución legal.",
    "metaDescription": "¿Te reclama Prime Credit? Descubre quiénes son, cómo gestionar sus reclamaciones y cómo reducir o cancelar tu deuda con la Ley de Segunda Oportunidad."
  },
  "hipoges": {
    "origin": "Hipoges es una plataforma de referencia en el sector de la gestión de activos (servicer) con presencia en España, Portugal, Grecia e Italia. Se encarga de gestionar carteras de deuda que adquieren fondos de inversión o que los propios bancos les delegan paraExternalizar el recobro.",
    "faqs": [
      {
        "a": "Sí, como actuales gestores de la deuda, tienen la potestad de ofrecer acuerdos de pago o quitas para cerrar el expediente, algo que en Calma podemos ayudarte a negociar profesionalmente.",
        "q": "¿Puedo llegar a un acuerdo de quita con Hipoges?"
      },
      {
        "a": "Hipoges no es el banco original, sino el gestor que ha comprado o administra tu deuda; por lo tanto, las comunicaciones legales y las propuestas de pago vendrán ahora de su parte.",
        "q": "¿Por qué me escribe Hipoges si yo pedí el dinero a un banco?"
      }
    ],
    "metaDescription": "¿Te reclama una deuda Hipoges? Descubre quiénes son, cómo trabajan y cómo puedes solucionar tu situación legalmente con Calma. Recupera tu tranquilidad hoy.",
    "detail": "Hipoges actúa como gestor de activos financieros, manejando tanto préstamos personales como hipotecarios y activos inmobiliarios procedentes de la banca. Su operativa se centra en la recuperación de deudas mediante la negociación de quitas o la ejecución de garantías, lo que suele generar situaciones de gran presión para el deudor que ve cómo su hipoteca o préstamo ha cambiado de manos.",
    "intro": "Si has recibido una notificación de Hipoges, es probable que tu deuda bancaria haya sido vendida y ahora sientas la incertidumbre de no saber quién tiene las riendas de tu futuro financiero.",
    "worries": [
      {
        "fear": "Me van a quitar la casa de inmediato ahora que son ellos los dueños de mi hipoteca.",
        "reality": "La ejecución hipotecaria es un proceso judicial reglado que lleva tiempo; Hipoges a menudo prefiere negociar una salida o una dación en pago antes que agotar la vía judicial."
      },
      {
        "fear": "No paran de llamarme y enviarme cartas, siento que la deuda nunca dejará de crecer.",
        "reality": "Aunque los intereses de demora pueden asustar, la Ley de Segunda Oportunidad permite paralizar estos intereses y, en muchos casos, cancelar la deuda si no puedes pagarla."
      }
    ]
  },
  "solvia-servicer": {
    "metaDescription": "¿Debes dinero a Solvia Servicer? Te explicamos quiénes son, cómo funcionan sus reclamaciones y cómo puedes solucionar tu deuda con tranquilidad y Base Legal.",
    "origin": "Solvia Servicer es una de las principales plataformas de gestión de activos inmobiliarios y de crédito en España, con una trayectoria muy ligada originalmente al Banco Sabadell. Actualmente opera como un 'servicer' que gestiona carteras de deuda compradas por fondos de inversión, encargándose de la recuperación de estos préstamos a través de la vía amistosa o judicial.",
    "intro": "Si Solvia Servicer ha empezado a contactar contigo por una deuda hipotecaria o un préstamo antiguo, es normal sentir que la situación se te escapa de las manos. Estamos aquí para recordarte que, aunque ellos sean gestores profesionales de recobro, tu bienestar y tus derechos están protegidos por la ley.",
    "detail": "Esta entidad gestiona principalmente préstamos hipotecarios y deudas inmobiliarias que han sido cedidas por bancos como el Sabadell u otros fondos de inversión. Sus reclamaciones suelen derivar de la ejecución de garantías o de remanentes de deuda tras subastas, aplicando a menudo comisiones de gestión y demoras que elevan la cifra inicial de forma considerable.",
    "faqs": [
      {
        "a": "Sí, como gestores de carteras de deuda, tienen potestad para negociar quitas o planes de pago, aunque su objetivo principal es recuperar el máximo valor de la deuda en el menor tiempo posible.",
        "q": "¿Puedo negociar una rebaja de mi deuda directamente con Solvia?"
      },
      {
        "q": "¿La Ley de Segunda Oportunidad sirve para las deudas que me reclama Solvia?",
        "a": "Es el mecanismo legal diseñado precisamente para situaciones de insolvencia con entidades de recobro como Solvia, pudiendo cancelar la deuda legalmente si cumples los requisitos de buena fe."
      }
    ],
    "worries": [
      {
        "fear": "Me han dicho que van a ejecutar mi hipoteca de inmediato y me quedaré en la calle hoy mismo.",
        "reality": "Cualquier ejecución requiere un proceso judicial largo y garantista; no pueden desalojarte sin una orden de un juez, lo que nos da margen para negociar o aplicar la Ley de Segunda Oportunidad."
      },
      {
        "fear": "La deuda con Solvia no para de crecer por los intereses y nunca podré pagarla.",
        "reality": "Muchos de esos intereses pueden ser revisados judicialmente; además, si el coste total es inasumible, la Ley de Segunda Oportunidad permite la exoneración total de estas deudas privadas."
      }
    ]
  },
  "pepper-advantage": {
    "detail": "Se especializan en gestionar carteras de préstamos al consumo y deudas hipotecarias que otros bancos han vendido al no poder cobrarlas. Su modelo de negocio se basa en el recobro intensivo, lo que suele derivar en reclamaciones de los usuarios por falta de transparencia en la cesión de la deuda o por la aplicación de intereses que el cliente considera abusivos.",
    "worries": [
      {
        "fear": "Me dicen que me van a embargar la nómina mañana mismo si no pago ahora.",
        "reality": "Solo un juez puede ordenar un embargo tras un procedimiento judicial previo donde tú tienes derecho a defenderte; Pepper no puede quitarte el dinero directamente de tu cuenta."
      },
      {
        "reality": "Es una práctica común en los fondos de deuda; sin embargo, esto a menudo abre una vía legal para negociar quitas importantes o incluso anular cláusulas abusivas si el contrato original las contenía.",
        "fear": "Han comprado mi deuda por mucho menos de lo que me piden, me siento estafado."
      }
    ],
    "metaDescription": "¿Te reclama Pepper Advantage? Descubre cómo gestionar tu deuda, detener el acoso y recuperar tu tranquilidad financiera con el asesoramiento de Calma.",
    "intro": "Si has recibido una notificación de Pepper Advantage, es probable que tu antigua deuda haya cambiado de manos y ahora sientas la presión de una empresa especializada en recobros.",
    "origin": "Pepper Advantage es un \"servicer\" o gestor global de activos financieros que opera en España administrando carteras de crédito para terceros y fondos de inversión. Originalmente vinculada al grupo Pepper, su función principal es transformar préstamos impagados en dinero líquido mediante la gestión de cobro activa.",
    "faqs": [
      {
        "a": "Sí, aunque han comprado tu deuda, como consumidor tienes derecho a recibir información clara sobre el desglose de lo que te piden y a acogerte a mecanismos legales como la Ley de la Segunda Oportunidad si no puedes pagar.",
        "q": "¿Puedo defenderme si Pepper Advantage me reclama una deuda que no reconozco? Manuel, Madrid."
      },
      {
        "a": "No es obligatorio, pero sí muy recomendable. Pepper es una entidad profesional de recobro y negociar sin conocer tus derechos legales puede hacer que acabes pagando más de lo que te corresponde por ley.",
        "q": "¿Me conviene negociar directamente con ellos o buscar ayuda profesional? Sara, Valencia."
      }
    ]
  },
  "abanca-servicing": {
    "faqs": [
      {
        "a": "Sí, como cualquier acreedor, pueden iniciar un proceso monitorio en el juzgado, pero esto no es inmediato y sirve para que tú también puedas defenderte y revisar si existen cláusulas abusivas.",
        "q": "¿Puede Abanca Servicios Financieros presentar una demanda judicial contra mí?"
      },
      {
        "q": "¿Es posible eliminar la deuda con ellos sin llegar a pagarla entera?",
        "a": "Rotundamente sí; mediante la Ley de Segunda Oportunidad es posible cancelar legalmente estas deudas si cumples los requisitos de buena fe y falta de patrimonio para pagarlas."
      }
    ],
    "intro": "Si el teléfono no deja de sonar con llamadas de Abanca Servicios Financieros o has recibido una reclamación por un antiguo préstamo, es normal que sientas angustia, pero no estás solo.",
    "worries": [
      {
        "fear": "Me dicen que van a embargar mi nómina mañana mismo si no pago ahora.",
        "reality": "Nadie puede embargarte sin una orden judicial previa y un proceso donde tú tengas derecho a defenderte; las llamadas de recobro suelen usar esto como presión psicológica únicamente."
      },
      {
        "fear": "Tengo miedo de que mis vecinos o familiares se enteren de mi deuda por sus llamadas.",
        "reality": "La Ley de Protección de Datos prohíbe terminantemente que informen a terceros sobre tu situación financiera, y existen mecanismos legales para frenar el acoso telefónico excesivo."
      }
    ],
    "origin": "Esta entidad es la división especializada del Grupo Abanca encargada de la gestión de cobros y la recuperación de créditos, tanto propios como de carteras adquiridas. Opera principalmente en territorio español, centralizando la reclamación de impagos de tarjetas y préstamos que originalmente se contrataron con el banco.",
    "detail": "Sus productos estrella suelen ser préstamos personales y tarjetas de crédito Abanca, cuyas condiciones pueden incluir intereses que la jurisprudencia actual permite revisar. Cuando las cuotas se vuelven impagables, la entidad gestiona el recobro de forma intensiva, lo que genera una presión constante a través de llamadas y cartas que agobian al usuario.",
    "metaDescription": "¿Te reclama dinero Abanca Servicios Financieros? Descubre cómo gestionar tus deudas de forma segura y recuperar tu tranquilidad financiera con el apoyo de Calma."
  },
  "dovalue": {
    "faqs": [
      {
        "q": "¿Se puede negociar con doValue una rebaja de la deuda o una quita?",
        "a": "Sí, doValue compra carteras para recuperar el capital, por lo que suelen estar abiertos a convenios de quita o planes de pago fraccionados si se negocia con una estrategia sólida."
      },
      {
        "q": "¿Por qué me reclama doValue si yo nunca firmé un préstamo con ellos?",
        "a": "Es muy común que doValue sea quien te llame por una deuda que originalmente era de un banco (como el Santander); legalmente pueden reclamar, pero tú tienes derecho a exigir que acrediten la cesión del crédito y el desglose de lo que piden."
      }
    ],
    "detail": "Esta entidad gestiona principalmente carteras de préstamos fallidos y activos inmobiliarios procedentes de grandes bancos como Santander o Sareb. Las reclamaciones suelen surgir por la aplicación de intereses de demora elevados tras la compra de la deuda y, en ocasiones, por dificultades del usuario para reconocer el origen del importe debido a la falta de documentación clara tras la transferencia del contrato.",
    "metaDescription": "¿Te reclama una deuda doValue? Recupera la tranquilidad. Te explicamos quiénes son, cómo gestionar sus reclamaciones y cómo librarte de la deuda legalmente.",
    "origin": "doValue España es uno de los principales gestores de activos financieros e inmobiliarios (servicer) del sur de Europa, nacido de la compra de Altamira Asset Management. Su actividad principal es la recuperación de créditos impagados que adquieren o gestionan en nombre de entidades bancarias e inversores institucionales.",
    "worries": [
      {
        "reality": "doValue no puede embargarte directamente; necesitan una sentencia judicial previa y, aun así, la ley protege los mínimos inembargables de tu salario según el SMI actual.",
        "fear": "Me han dicho que me van a quitar la nómina y la casa por una deuda de hace años."
      },
      {
        "fear": "Me llaman de forma constante y me siento acosado por sus gestores de recobro.",
        "reality": "Tienes derecho a solicitar que cesen las comunicaciones abusivas y a canalizar toda la negociación de forma profesional, asegurándote de que cualquier acuerdo quede reflejado por escrito."
      }
    ],
    "intro": "Si has recibido una notificación de doValue (antigua Altamira Asset Management) reclamándote una deuda, es normal sentir confusión al no reconocer su nombre entre tus contratos originales."
  },
  "lindorff": {
    "faqs": [
      {
        "q": "¿Puede Lindorff demandarme judicialmente si no pago?",
        "a": "Sí, como actuales titulares de tu deuda, tienen la capacidad legal para iniciar un proceso judicial o incluirte en listas como ASNEF, pero esto no significa que la deuda sea incobrable o que no puedas negociarla."
      },
      {
        "q": "Me han ofrecido un descuento, ¿debería aceptarlo?",
        "a": "Es muy común que Lindorff ofrezca 'quitas' o descuentos para cerrar el expediente rápido; sin embargo, antes de firmar nada, es vital revisar si la deuda ha prescrito o si el importe incluye intereses abusivos que un juez podría anular."
      }
    ],
    "detail": "Lindorff se especializa en la adquisición de carteras de 'deuda fallida' provenientes de bancos y grandes compañías de servicios, lo que significa que a menudo intentan cobrar deudas que han sido vendidas por una fracción de su valor original. Sus prácticas se centran en el contacto telefónico insistente y el inicio de procesos monitorios, aunque muchas de estas deudas pueden contener cláusulas abusivas de los contratos iniciales que son reclamables.",
    "metaDescription": "¿Te reclama una deuda Lindorff? Descubre quiénes son, por qué tienen tu deuda y cómo la Ley de Segunda Oportunidad puede ayudarte a cancelar lo que debes.",
    "origin": "Lindorff es una entidad de origen escandinavo que, tras su fusión con Intrum Justitia, se ha consolidado como uno de los mayores gestores de recobro y compradores de deuda en España. Actúan como 'fondo buitre', adquiriendo paquetes de préstamos e impagos de entidades como Santander o CaixaBank para intentar recuperar el dinero por su cuenta.",
    "worries": [
      {
        "fear": "Me dicen que me van a quitar la casa y el sueldo si no pago hoy mismo.",
        "reality": "Lindorff es una empresa privada, no un juzgado; solo un juez puede ordenar un embargo tras un procedimiento legal donde tú tienes derecho a defenderte y revisar si la deuda es correcta."
      },
      {
        "fear": "No paran de llamarme al trabajo y a mis familiares, me siento acosado.",
        "reality": "Existen límites legales contra el acoso telefónico y la vulneración de tu privacidad; además, si te acoges a la Ley de Segunda Oportunidad, este contacto debe cesar por ley inmediatamente."
      }
    ],
    "intro": "Si has empezado a recibir llamadas o cartas de Lindorff, es probable que tu antigua deuda bancaria haya cambiado de manos, pero eso no significa que hayas perdido tus derechos."
  },
  "debt-consulting": {
    "worries": [
      {
        "reality": "Solo un juez puede ordenar un embargo tras un proceso judicial previo donde tú tienes derecho a defenderte; Debt Consulting no tiene autoridad para quitarte dinero directamente de tu cuenta.",
        "fear": "Me dicen que me van a embargar la nómina de inmediato si no pago hoy mismo."
      },
      {
        "fear": "No paran de llamarme al trabajo y a mis familiares, me siento acosado.",
        "reality": "La ley protege tu privacidad y prohíbe el acoso sistemático; existen límites legales sobre cómo pueden contactarte y siempre tienes el derecho de solicitar el cese de comunicaciones abusivas."
      }
    ],
    "faqs": [
      {
        "q": "¿Puede Debt Consulting meterme en un fichero de morosos?",
        "a": "Sí, como empresa que adquiere derechos de cobro, Debt Consulting tiene la facultad legal de incluir tus datos en ficheros como ASNEF si se cumplen los requisitos de notificación previa y certeza de la deuda."
      },
      {
        "a": "Rotundamente sí; mediante la Ley de Segunda Oportunidad o negociaciones directas, es posible alcanzar acuerdos de pago con quitas importantes o incluso la cancelación total si cumples el perfil legal.",
        "q": "¿Se puede negociar una quita con ellos para pagar menos?"
      }
    ],
    "origin": "Debt Consulting es una empresa española dedicada a la gestión de recobro y la adquisición de carteras de deuda de difícil cobro (NPL). Actúan como intermediarios o nuevos titulares de créditos originados principalmente en el sector bancario y de consumo.",
    "metaDescription": "¿Te reclama una deuda Debt Consulting? Descubre cómo gestionar sus reclamaciones, evitar el acoso y cancelar tus deudas con la Ley de Segunda Oportunidad.",
    "intro": "Si Debt Consulting te está contactando, es probable que hayan comprado una deuda que tenías con otra entidad y ahora sean ellos quienes gestionan el cobro. No te asustes por la insistencia de sus llamadas; aunque ahora sean los dueños de la deuda, tú sigues manteniendo todos tus derechos para defenderte.",
    "detail": "Esta entidad se especializa en la gestión de expedientes fallidos de grandes bancos y financieras, aplicando métodos de insistencia telefónica que pueden resultar abrumadores. A menudo, las deudas que reclaman incluyen intereses que podrían considerarse abusivos según la normativa actual, lo que permite abrir vías legales para su impugnación o renegociación."
  },
  "collectia": {
    "worries": [
      {
        "reality": "Collectia es una empresa privada y no tiene autoridad para embargar; solo un juez, tras un proceso judicial que lleva meses, puede ordenar un embargo sobre tu nómina o bienes.",
        "fear": "Me han dicho que si no pago hoy mismo, vendrán a mi casa a embargar mis muebles."
      },
      {
        "fear": "No paran de llamar a mi trabajo y temo que mis jefes se enteren de mis deudas.",
        "reality": "La ley de protección de datos prohíbe informar a terceros sobre tus deudas; si lo hacen, están cometiendo una infracción que puedes denunciar ante la AEPD."
      }
    ],
    "intro": "Si has recibido una carta o llamada de Collectia, es normal que sientas inquietud, pero recuerda que solo son gestores de una deuda que, en la mayoría de los casos, se puede negociar o incluso cancelar legalmente.",
    "detail": "Collectia se especializa en la gestión de cobro de facturas impagadas de sectores como telefonía, energía y banca, actuando tanto como agencia de servicios para terceros como comprador de carteras. Muchas reclamaciones surgen porque el usuario ya no reconoce la deuda, considera que el servicio no se prestó correctamente o los intereses aplicados han inflado el importe original de forma desproporcionada.",
    "faqs": [
      {
        "q": "¿Debo contestar a las llamadas de los gestores de Collectia? El tono a veces me asusta.",
        "a": "No es obligatorio, pero sí muy recomendable; así tendrás una prueba de que intentas solucionar el problema y podrás verificar si la deuda es legítima antes de que aumenten los intereses."
      },
      {
        "q": "¿Qué pasa si Collectia me reclama una cantidad que realmente no puedo pagar?",
        "a": "Si no puedes afrontar el pago, existen mecanismos legales como la Ley de la Segunda Oportunidad que permiten cancelar tus deudas si cumples los requisitos de buena fe e insolvencia."
      }
    ],
    "metaDescription": "¿Te reclama dinero Collectia? Descubre cómo gestionar sus llamadas, qué derechos te protegen y cómo eliminar tus deudas con la Ley de Segunda Oportunidad.",
    "origin": "Collectia es una de las empresas de gestión de cobro y recobro de deudas más importantes de España, con presencia internacional y sede principal en Madrid. Trabajan recuperando impagos para grandes compañías eléctricas, bancos y operadoras de telecomunicaciones, utilizando sistemas de contacto masivo para localizar a los deudores."
  },
  "an-cobros": {
    "worries": [
      {
        "fear": "Me amenazan con llevarme a juicio mañana mismo y embargarme la nómina de inmediato.",
        "reality": "AN Cobros no puede embargarte directamente; solo un juez puede hacerlo tras un proceso judicial largo donde tú tienes derecho a defenderte y oponerte."
      },
      {
        "fear": "Tengo miedo de que mis vecinos o mi familia se enteren porque no dejan de llamar.",
        "reality": "La ley de protección de datos prohíbe terminantemente que informen de tu deuda a terceros; si lo hacen, están cometiendo una infracción que puede ser denunciada."
      }
    ],
    "faqs": [
      {
        "q": "¿Puede el mecanismo de la Segunda Oportunidad detener las llamadas de AN Cobros?",
        "a": "Absolutamente. Una vez que te acoges a la Ley de Segunda Oportunidad y el juez admite a trámite tu caso, AN Cobros tiene la obligación legal de cesar cualquier tipo de contacto o reclamación directa contigo."
      },
      {
        "q": "¿Por qué me escribe AN Cobros si yo nunca contraté nada con ellos?",
        "a": "Significa que tu banco original ha vendido tu \"paquete\" de deuda para limpiar sus cuentas; ahora tu acreedor es AN Cobros, pero eso no cambia tus derechos: puedes seguir negociando o defendiéndote si la deuda es injusta."
      }
    ],
    "intro": "Si AN Cobros ha empezado a contactarte, es normal que sientas una mezcla de desconcierto y presión constante; pero recuerda que recibir sus cartas no significa que no tengas salida.",
    "detail": "Esta entidad se especializa en la gestión de expedientes fallidos, aplicando métodos de cobro intensivos que incluyen llamadas recurrentes y el envío de comunicaciones formales de impago. Sus reclamaciones suelen derivar de microcréditos o tarjetas revolving con altos intereses, lo que permite en muchos casos impugnar el saldo exigido si este incluye cláusulas abusivas.",
    "metaDescription": "¿Recibes reclamaciones de AN Cobros? Descubre cómo gestionar tu deuda y recuperar la paz con la Ley de Segunda Oportunidad. Información clara y soluciones reales.",
    "origin": "AN Cobros es una agencia de gestión de activos y recobro que opera en el mercado español, encargándose de recuperar impagos de terceros, principalmente de entidades financieras y telcos. Su modelo de negocio se basa en adquirir carteras de deuda a bajo coste para luego reclamar el importe total a los consumidores."
  },
  "norfin-holder": {
    "worries": [
      {
        "fear": "Me van a embargar la nómina mañana mismo si no pago lo que Norfin Holder me pide.",
        "reality": "Ninguna empresa de recobro puede embargarte directamente; solo un juez puede hacerlo tras un proceso judicial donde tú tienes derecho a defenderte y revisar si la deuda es correcta."
      },
      {
        "fear": "Voy a estar en el ASNEF para siempre por culpa de esta deuda comprada.",
        "reality": "La Ley establece límites de tiempo para estar en ficheros de morosidad y, además, si cancelas la deuda mediante una quita o la Ley de Segunda Oportunidad, tu nombre debe ser borrado definitivamente."
      }
    ],
    "metaDescription": "¿Te reclama Norfin Holder una deuda? Descubre quiénes son, cómo gestionar sus reclamaciones y cómo cancelar tus deudas legalmente con Calma. Recupera tu tranquilidad.",
    "detail": "Esta entidad se especializa en la adquisición de paquetes de deuda procedentes de préstamos personales, tarjetas y facturas impagadas de otras empresas. El problema suele surgir porque aplican métodos de recobro insistentes y, en ocasiones, la deuda ha generado intereses que pueden ser considerados abusivos o difíciles de verificar tras tantos cambios de dueño.",
    "intro": "Si has recibido una carta o llamada de Norfin Holder reclamándote una deuda antigua, es normal sentir desconcierto, pero no estás ante un callejón sin salida.",
    "origin": "Norfin Holder es una entidad financiera dedicada a la gestión de activos y compra de carteras de deuda en el mercado español. Actúa como un \"fondo de recobro\" que adquiere créditos que los bancos originales ya no quieren gestionar para intentar cobrarlos por su cuenta.",
    "faqs": [
      {
        "q": "¿Es posible llegar a un acuerdo de pago con Norfin Holder?",
        "a": "Sí, como fondo de recobro que opera en España, están abiertos a negociaciones para cerrar expedientes, y en Calma podemos ayudarte a lograr una quita importante o acogerte a la Ley de Segunda Oportunidad si no puedes pagar."
      },
      {
        "q": "¿Por qué Norfin Holder me reclama una deuda que yo no contraté con ellos?",
        "a": "Es su derecho solicitar el cobro, pero no el tuyo pagar algo que no esté legalmente justificado; siempre debes exigir el desglose total de la deuda y el documento que acredite que ellos son los nuevos dueños."
      }
    ]
  },
  "vivus": {
    "origin": "Vivus es una de las marcas comerciales de 4finance, un grupo internacional líder en préstamos de consumo digitales. Operan en España ofreciendo micropréstamos rápidos que se gestionan íntegramente de forma online o a través de su app móvil.",
    "faqs": [
      {
        "q": "¿Puedo cancelar mi deuda con Vivus si no tengo dinero para pagar?",
        "a": "Sí, es posible. Mediante la Ley de la Segunda Oportunidad o la reclamación por intereses abusivos, puedes conseguir que se anule la deuda restante o incluso que te devuelvan lo pagado de más si los intereses superan lo legalmente permitido."
      },
      {
        "q": "¿Vivus me puede meter en una lista de morosos?",
        "a": "Si dejas de pagar, Vivus incluirá tus datos en ficheros como ASNEF o EXPERIAN. Sin embargo, en Calma te ayudamos a salir de estos listados una vez que iniciamos el proceso legal para resolver tu situación."
      }
    ],
    "detail": "Se especializan en minicréditos de concesión casi instantánea con plazos de devolución muy cortos, generalmente de 30 días. El problema surge cuando los intereses de demora y las comisiones por impago se acumulan rápidamente, convirtiendo un pequeño préstamo de 300€ en una deuda difícil de gestionar que a menudo contiene cláusulas de intereses que pueden considerarse abusivas por la Justicia.",
    "metaDescription": "¿Debes dinero a Vivus? Descubre cómo gestionar tus microcréditos, defenderte de intereses abusivos y recuperar la tranquilidad con el equipo de Calma.",
    "intro": "Si sientes que el contador de Vivus no deja de subir y no ves el momento de terminar de pagar, no estás solo; esos plazos tan cortos están diseñados para atraparte.",
    "worries": [
      {
        "fear": "Me llaman a todas horas y me amenazan con llevarme a juicio mañana mismo.",
        "reality": "Vivus utiliza empresas de recobro para presionar, pero un proceso judicial no es inmediato. Además, antes de que ellos demanden, tú puedes reclamar la nulidad de esos intereses por ser desproporcionados."
      },
      {
        "fear": "He pagado ya el doble de lo que me prestaron y me siguen pidiendo más dinero.",
        "reality": "Muchos de los contratos de Vivus han sido anulados por jueces al presentar intereses usurarios; si ya has pagado el capital principal, podrías incluso dejar de deberles nada legalmente."
      }
    ]
  },
  "moneyman": {
    "origin": "Moneyman es una marca comercial operada por la entidad IDFinance España, centrada en el sector de los prestamistas privados online de respuesta rápida. Su modelo de negocio se basa en la tecnología para evaluar riesgos en segundos y ofrecer liquidez inmediata a particulares fuera del circuito bancario tradicional.",
    "intro": "Pediste unos pocos cientos de euros a Moneyman para salir de un apuro y ahora la deuda parece tener vida propia, multiplicándose cada semana que pasa. Respira: la rapidez con la que te concedieron ese dinero es también la prueba de las prácticas que podemos revisar para ayudarte a frenarlo.",
    "detail": "Moneyman se especializa en minicréditos de concesión casi instantánea, un modelo que suele aplicar intereses y comisiones por demora muy elevados si no se devuelve el dinero en el plazo corto estipulado (normalmente 30 días). Es habitual que los usuarios se vean atrapados en una rueda de \"prórrogas\" pagadas solo para aplazar el vencimiento, lo que provoca que la deuda crezca exponencialmente respecto al dinero prestado originalmente.",
    "faqs": [
      {
        "a": "Sí, es una práctica frecuente. Si te reclaman una cantidad que triplica o cuadruplica lo que pediste, es muy probable que existan cláusulas abusivas que un juez puede anular, reduciendo tu deuda solo al capital que realmente recibiste.",
        "q": "¿Se puede reclamar a Moneyman si ya he pagado intereses abusivos?"
      },
      {
        "q": "¿Qué pasa si mi deuda de Moneyman ha sido vendida a un fondo recobro?",
        "a": "Moneyman suele vender los paquetes de deuda impagada a terceros. Si esto sucede, la deuda sigue existiendo pero cambia de \"dueño\", aunque tus derechos para reclamar por usura o acogerte a la Ley de Segunda Oportunidad permanecen intactos."
      }
    ],
    "metaDescription": "¿Debes dinero a Moneyman? Descubre cómo gestionar tus microcréditos, detener el acoso de cobro y reducir tus deudas con soluciones legales efectivas.",
    "worries": [
      {
        "reality": "Moneyman suele utilizar mensajes de tono urgente para presionar, pero un proceso judicial es lento y requiere una notificación oficial del juzgado, no un SMS; además, en ese proceso tú puedes defenderte alegando usura.",
        "fear": "Me han dicho que me van a llevar a juicio mañana mismo si no pago los intereses."
      },
      {
        "reality": "La Ley de Segunda Oportunidad o una reclamación por intereses abusivos pueden limpiar tu historial crediticio de forma definitiva, eliminando esos apuntes que hoy te bloquean.",
        "fear": "Nunca saldré de ASNEF porque la deuda con Moneyman no para de subir por las comisiones."
      }
    ]
  },
  "mykredit": {
    "intro": "Lo que empezó como un microcrédito puntual de MyKredit para llegar a fin de mes se ha transformado en una bola de intereses y comisiones que no entiendes del todo. Queremos que sepas que esa falta de claridad juega a tu favor: muchos de estos contratos son revisables y reclamables.",
    "origin": "MyKredit es una marca comercial operada por Global Digital Finance Spain S.L., una entidad financiera tecnológica con sede en Madrid especializada en préstamos de consumo rápido. Se posicionan como una solución de liquidez urgente mediante procesos 100% digitales y sin apenas papeleo.",
    "metaDescription": "¿Debes dinero a MyKredit? Descubre cómo gestionar tus microcréditos, detener el acoso telefónico y eliminar intereses abusivos con el apoyo de Calma.",
    "detail": "MyKredit se especializa en minicréditos de concesión casi instantánea con plazos de devolución muy cortos, lo que frecuentemente deriva en intereses de demora y comisiones por impago elevados. Estos productos suelen presentar tipos de interés que superan con creces la media del mercado, facilitando un ciclo de sobreendeudamiento si no se liquidan a tiempo.",
    "worries": [
      {
        "fear": "Me han dicho que me van a llevar a juicio mañana mismo si no pago el total de la deuda.",
        "reality": "Los procesos judiciales no son inmediatos; MyKredit suele agotar primero la vía del recobro extrajudicial y, si llegaran al juzgado, es tu oportunidad para que un juez anule los intereses si son abusivos."
      },
      {
        "reality": "Estar en un fichero de morosos es reversible: una vez se liquida la deuda o se demuestra que los intereses eran ilegales, tienes derecho a que tus datos sean borrados definitivamente.",
        "fear": "No voy a poder pedir nunca más un préstamo porque me han metido en ASNEF."
      }
    ],
    "faqs": [
      {
        "q": "¿Puedo llegar a un acuerdo con MyKredit si no puedo pagar? Sat?",
        "a": "Sí, es posible negociar una quita o un plan de pagos, pero lo más efectivo suele ser revisar si tus contratos contienen intereses usurarios para anular los honorarios abusivos legalmente."
      },
      {
        "q": "¿Qué pasa si ignoro los mensajes de MyKredit?",
        "a": "Lo más probable es que recibas llamadas frecuentes de su departamento de recobros; es una práctica habitual para presionar, pero recuerda que tienen límites legales y no pueden acosarte ni amenazarte."
      }
    ]
  },
  "dineo": {
    "faqs": [
      {
        "a": "Sí, es posible negociar una reducción del importe total para abonar solo el capital prestado o solicitar una aplicación de la Ley de la Segunda Oportunidad si tu situación es de insolvencia total.",
        "q": "¿Se puede reducir la deuda con Dineo si no puedo pagar los intereses?"
      },
      {
        "q": "¿Cómo suele reclamar Dineo los pagos pendientes?",
        "a": "Principalmente por teléfono y correo electrónico de forma insistente; si no hay respuesta, suelen vender la deuda a fondos de recobro, pero recuerda que el acoso está limitado por el derecho al honor."
      }
    ],
    "worries": [
      {
        "fear": "Me han dicho que me van a llevar a juicio mañana mismo si no pago la deuda total.",
        "reality": "Los procesos judiciales llevan tiempo y a Dineo, como a cualquier entidad, le suele interesar más llegar a un acuerdo amistoso que iniciar un pleito que podrían perder si sus intereses se consideran usuarios."
      },
      {
        "fear": "Voy a estar en ASNEF para siempre y nadie me volverá a prestar dinero.",
        "reality": "La inscripción en ficheros de morosidad tiene que ser comunicada formalmente y, una vez solucionada la deuda o declarada nula por un juez, tus datos deben ser borrados inmediatamente."
      }
    ],
    "origin": "Dineo Crédito es una entidad financiera española especializada en microcréditos rápidos, vinculada estrechamente al grupo Cash Converters. Su modelo de negocio se basa en la concesión de pequeñas cantidades de capital de forma casi instantánea, tanto de manera digital como presencial.",
    "metaDescription": "¿Agobiado por una deuda con Dineo? Descubre cómo gestionar los intereses abusivos y recuperar tu tranquilidad con soluciones legales a tu medida. El fin del acoso empieza aquí.",
    "detail": "Dineo destaca por ofrecer dinero inmediato a través de su plataforma online o físicamente en las tiendas Cash Converters, utilizando el sistema de minipréstamos de corta duración. El problema surge con sus altos costes por demora y la acumulación de intereses que, en muchos casos, pueden ser considerados abusivos por la justicia española al superar de forma desproporcionada el tipo de interés normal del dinero.",
    "intro": "Si el minipréstamo de Dineo que pediste para un apuro se ha convertido en una bola de nieve imparable, recuerda que no estás solo y que existen herramientas legales para frenarlo."
  },
  "cofidis": {
    "worries": [
      {
        "reality": "Muchas de estas deudas pueden ser renegociadas o incluso anuladas si se demuestra que los intereses son abusivos o el contrato no es transparente, permitiéndote pagar solo lo prestado.",
        "fear": "Siento que voy a estar pagando los intereses de la línea de crédito de Cofidis toda la vida."
      },
      {
        "fear": "Me han dicho que si no pago hoy mismo, me van a llevar a juicio de inmediato.",
        "reality": "Cofidis suele agotar primero las vías de reclamación amistosa; un proceso judicial no es inmediato y, si ocurre, tienes derecho a defenderte y demostrar tu situación económica real."
      }
    ],
    "detail": "Cofidis es conocida por sus líneas de crédito 'Direct Cash' y sus préstamos proyectos, que permiten disponer de dinero rápido pero suelen acumular intereses elevados si se opta por el pago fraccionado mínimo. Muchas de las reclamaciones que reciben se centran en la falta de transparencia de sus contratos 'revolving', donde la deuda parece no bajar nunca a pesar de cumplir con las cuotas mensuales.",
    "faqs": [
      {
        "a": "Sí, es totalmente posible a través de una negociación extrajudicial o, si cumples los requisitos legales, mediante la Ley de Segunda Oportunidad para cancelar toda la deuda si no puedes pagarla.",
        "q": "¿Puedo reducir o eliminar mi deuda con Cofidis de forma legal?"
      },
      {
        "a": "Si dejas de pagar, empezarán a aplicar intereses de demora y comisiones por reclamación de cuota, por lo que lo más recomendable es buscar asesoramiento especializado antes de que la bola de nieve crezca.",
        "q": "¿Qué pasa si mi cuota de Cofidis sube y ya no puedo abonarla?"
      }
    ],
    "metaDescription": "¿Agobiado por una deuda con Cofidis? Recupera la tranquilidad. Descubre cómo reducir tus cuotas o cancelar tus préstamos mediante soluciones legales efectivas.",
    "intro": "Si sientes que tu línea de crédito con Cofidis se ha convertido en un pozo sin fondo donde pagas cada mes pero el saldo apenas baja, no estás solo. Sabemos que las llamadas constantes y los intereses acumulados pesan, pero hay mecanismos legales para recuperar el control de tu economía.",
    "origin": "Cofidis es una entidad financiera de origen francés que opera en España desde hace décadas como líder en el sector del crédito a distancia. Se especializa en la concesión de préstamos rápidos y líneas de crédito que se pueden contratar por teléfono o internet sin necesidad de cambiar de banco."
  },
  "creditea": {
    "detail": "Sus líneas de crédito y préstamos rápidos se caracterizan por intereses que, en ocasiones, superan con creces los tipos medios del mercado, lo que puede provocar que la deuda crezca indefinidamente. Además, el sistema de cuotas flexibles suele cubrir solo intereses, haciendo que el capital principal apenas disminuya a pesar de los pagos mensuales.",
    "faqs": [
      {
        "q": "¿Puedo cancelar mi deuda con Creditea mediante la Ley de Segunda Oportunidad?",
        "a": "¡Totalmente! Las deudas con Creditea pueden incluirse en la Ley de Segunda Oportunidad para que un juez las cancele legalmente si cumples los requisitos de buena fe."
      },
      {
        "q": "¿Qué pasa si ya pagué el préstamo pero los intereses eran abusivos?",
        "a": "Incluso si ya has terminado de pagar, si los intereses se consideran usurarios o abusivos, tienes derecho a reclamar la devolución de todo lo que pagaste de más."
      }
    ],
    "metaDescription": "¿Debes dinero a Creditea? Descubre cómo gestionar tus microcréditos, reclamar intereses abusivos o acogerte a la Ley de Segunda Oportunidad con Calma.",
    "worries": [
      {
        "fear": "Tengo miedo de que me lleven a juicio y me embarguen la nómina por no pagar.",
        "reality": "Creditea suele preferir la vía de recobro extrajudicial o incluirte en ficheros como ASNEF antes que ir a juicio; además, si el contrato tiene intereses abusivos, un juez podría incluso anularlo."
      },
      {
        "reality": "El acoso telefónico está limitado por ley y vulnerar tu privacidad puede ser denunciable; existen mecanismos legales para detener estas comunicaciones mientras solucionas tu deuda.",
        "fear": "Llaman constantemente a mi trabajo y a mis familiares para reclamar."
      }
    ],
    "origin": "Creditea es una marca comercial perteneciente a la empresa International Personal Finance Digital Spain (IPFD), especializada en financiación rápida online. Se instalaron en España ofreciendo 'dinero en 15 minutos' a través de procesos 100% digitales y sin avales.",
    "intro": "Si sientes que tu línea de crédito con Creditea se ha convertido en un pozo sin fondo donde pagas y pagas pero la deuda nunca baja, no estás solo."
  },
  "cashper": {
    "intro": "Si devolver el minicrédito de Cashper se ha vuelto imposible porque los honorarios e intereses superan con creces lo que pediste, no es culpa tuya: es el propio diseño del producto. Y precisamente por eso existe una vía legal para detener esa espiral hoy mismo.",
    "detail": "Sus minicréditos están diseñados para obtener liquidez inmediata, pero conllevan honorarios muy elevados que pueden superar el 2.000% TAE, lo que a menudo impide al usuario devolver el capital a tiempo. Esto genera una espiral de deudas donde los intereses de demora y las comisiones por impago multiplican la cantidad inicial en cuestión de semanas.",
    "origin": "Cashper es una marca comercial operada por Novum Bank Limited, una entidad financiera con sede en Malta que opera en el mercado español de microcréditos. Se especializan en conceder préstamos rápidos de pequeña cuantía, a menudo sin necesidad de nómina o aval, para solucionar urgencias puntuales.",
    "faqs": [
      {
        "a": "Sí, muchas de estas deudas pueden anularse o reducirse si se demuestra que los intereses eran usurarios o que no se evaluó correctamente tu capacidad de pago.",
        "q": "¿Puedo cancelar mi deuda con Cashper si los intereses son abusivos?"
      },
      {
        "q": "¿Qué pasa si Cashper me reclama una cantidad que no puedo pagar?",
        "a": "La Ley de la Segunda Oportunidad permite paralizar embargos y, en muchos casos, cancelar legalmente estas deudas si cumples los requisitos de buena fe."
      }
    ],
    "metaDescription": "¿Agobiado por una deuda con Cashper? Descubre cómo gestionar los intereses abusivos y recuperar tu tranquilidad financiera con soluciones legales efectivas.",
    "worries": [
      {
        "fear": "¿Me van a llevar a juicio mañana mismo por un préstamo de 300 euros?",
        "reality": "Cashper suele preferir la insistencia telefónica o la inclusión en ficheros de morosidad antes que la vía judicial inmediata; además, en un juzgado, sus altos intereses podrían ser declarados nulos."
      },
      {
        "fear": "He pagado ya más de lo que pedí y me siguen reclamando dinero.",
        "reality": "Esto ocurre porque tus pagos se destinan primero a honorarios y prórrogas; legalmente, si los intereses se consideran usura, podrías quedar liberado habiendo devuelto solo el capital prestado."
      }
    ]
  },
  "quebueno": {
    "worries": [
      {
        "fear": "Me han dicho que me van a llevar a juicio mañana mismo por no pagar 300 euros.",
        "reality": "Los procesos judiciales no son inmediatos; antes de un embargo, siempre hay una notificación oficial del juzgado y tú tienes derecho a oponerte si los intereses son abusivos."
      },
      {
        "fear": "No voy a poder pedir una hipoteca en el futuro porque QueBueno me ha metido en ASNEF.",
        "reality": "Estar en un fichero de morosos es reversible: una vez que se gestiona la deuda o se demuestra que es injusta, tienes derecho a que tus datos sean borrados por completo."
      }
    ],
    "intro": "Si un pequeño préstamo con QueBueno se ha convertido en una montaña de intereses que no te deja dormir, no estás solo: hay formas legales de frenar esta situación hoy mismo.",
    "detail": "QueBueno se caracteriza por ofrecer préstamos 'flash' de pequeñas cuantías que deben devolverse en apenas 30 días, lo que a menudo atrapa a los usuarios en una cadena de renovaciones o impagos con intereses de demora muy elevados. Muchas de estas deudas se vuelven reclamables legalmente debido a que los intereses aplicados pueden superar notablemente los límites marcados por la jurisprudencia española sobre usura.",
    "faqs": [
      {
        "a": "No, los intereses de demora tienen límites legales y, si son abusivos, un juez puede anularlos, obligándote a devolver solo el capital que realmente te prestaron.",
        "q": "¿Tengo que pagar toda la deuda de QueBueno aunque los intereses hayan duplicado el préstamo?"
      },
      {
        "q": "¿Puedo meter mi deuda de QueBueno en la Ley de Segunda Oportunidad?",
        "a": "Sí, aunque tu deuda sea pequeña, QueBueno suele estar incluido bajo la Ley de Segunda Oportunidad si tienes otros acreedores y no puedes hacer frente a los pagos."
      }
    ],
    "metaDescription": "¿Debes dinero a QueBueno? Descubre cómo gestionar tus microcréditos, reclamar intereses abusivos y recuperar la tranquilidad financiera con Calma.",
    "origin": "QueBueno es una marca comercial operada por la entidad Deuniza S.L.U., con sede en Barcelona, especializada en préstamos rápidos y microcréditos de concesión casi instantánea a través de su plataforma online. Se han posicionado en el mercado español como una solución de liquidez urgente para imprevistos domésticos o personales."
  },
  "wandoo": {
    "origin": "Wandoo Finance SL es una entidad financiera de origen letón que opera en España ofreciendo microcréditos rápidos a través de plataformas digitales. Se dedica a la gestión de préstamos de consumo a muy corto plazo, enfocándose en la rapidez de gestión y la mínima documentación.",
    "intro": "Si los intereses de tu préstamo con Wandoo han hecho que una pequeña cantidad se convierta en una montaña imposible de escalar, no estás solo. Sabemos lo que supone recibir avisos constantes y queremos que sepas que existen vías legales para recuperar el control de tu economía.",
    "detail": "Wandoo se especializa en préstamos de pequeña cuantía y concesión inmediata, donde el coste real (TAE) suele ser extremadamente alto en comparación con la banca tradicional. Es habitual que los usuarios entren en bucle al no poder devolver el capital más los honorarios en solo 30 días, lo que genera intereses de demora que disparan la deuda rápidamente.",
    "faqs": [
      {
        "a": "Sí, es posible reclamar si los intereses son desproporcionados o si el contrato no es transparente; en muchos casos, solo tendrías que devolver el dinero que te prestaron originalmente.",
        "q": "¿Se pueden anular los intereses de un préstamo de Wandoo? Pacharán"
      },
      {
        "a": "Nuestra recomendación es no pedir un nuevo microcrédito para pagar el anterior; es mejor analizar tu situación legal para detener la bola de nieve antes de que crezca más.",
        "q": "¿Qué pasa si no puedo pagar mi préstamo de Wandoo a tiempo?"
      }
    ],
    "worries": [
      {
        "fear": "¿Wandoo puede embargarme la cuenta mañana mismo por no pagar?",
        "reality": "No, ninguna entidad privada puede embargar tus bienes directamente; para ello necesitarían demandarte y que un juez dicte una orden tras un proceso judicial donde tú puedes defenderte."
      },
      {
        "reality": "Estar en un fichero de morosidad es reversible; si se demuestra que la deuda contiene intereses abusivos, puedes reclamar la limpieza de tus datos y salir del listado.",
        "fear": "Mis datos van a acabar en ASNEF y nunca más podré pedir financiación."
      }
    ],
    "metaDescription": "¿Debes dinero a Wandoo? Descubre cómo gestionar tus microcréditos, defenderte de intereses abusivos y recuperar la tranquilidad financiera con Calma."
  },
  "ferratum": {
    "metaDescription": "¿Debes dinero a Ferratum? Descubre cómo gestionar tus microcréditos, detener las reclamaciones y eliminar tus deudas legalmente con el apoyo de Calma.",
    "faqs": [
      {
        "a": "Sí, es perfectamente posible. Si has pagado más en intereses que el dinero que pediste originalmente, podemos estudiar tu caso para reclamar la nulidad del contrato y que la deuda quede saldada o te devuelvan el exceso.",
        "q": "¿Puedo cancelar mi deuda con Ferratum si los intereses son abusivos?"
      },
      {
        "a": "Ferratum suele vender las deudas impagadas a fondos de recobro (fondos buitre). Si esto ocurre, no te asustes: tus derechos se mantienen intactos y legalmente podemos seguir negociando o cancelando esa deuda mediante la Ley de Segunda Oportunidad.",
        "q": "He recibido una carta de un fondo diciendo que han comprado mi deuda de Ferratum, ¿qué hago?"
      }
    ],
    "worries": [
      {
        "reality": "Ferratum puede demandar, pero un juez debe validar primero la deuda. Si los intereses son usurarios, la demanda podría desestimarse y solo tendrías que devolver el capital prestado sin intereses.",
        "fear": "Me están amenazando con llevarme a juicio y quitarme la nómina por unos pocos cientos de euros."
      },
      {
        "reality": "Estar en ASNEF no es perpetuo. Con la Ley de Segunda Oportunidad o mediante la reclamación por intereses abusivos, podemos conseguir que salgas de los ficheros de morosidad y recuperes tu libertad financiera legalmente.",
        "fear": "Me llaman a todas horas y me han metido en ASNEF, ya no puedo pedir ni un contrato de teléfono."
      }
    ],
    "detail": "Ferratum se especializa en préstamos rápidos y líneas de crédito de concesión casi instantánea (\"dinero en 15 minutos\"), lo que a menudo deriva en intereses acumulados muy superiores al capital inicial. Es habitual que el usuario se vea atrapado en un sistema de prórrogas de pago que solo cubren intereses sin reducir la deuda real, generando una espiral de impagos y reclamaciones judiciales por cantidades que se han multiplicado.",
    "intro": "¿Sientes que el microcrédito de Ferratum se ha convertido en una montaña imposible de escalar? No estás solo: recuperar el control de tu economía frente a los intereses de demora es más sencillo de lo que parece.",
    "origin": "Ferratum es una marca financiera de origen finlandés (parte de Multitude Group) que opera en España ofreciendo soluciones de financiación ultrarrápida 100% online. Se posicionaron como pioneros en la banca móvil, enfocándose en microcréditos de pequeña cuantía para cubrir imprevistos urgentes del día a día."
  },
  "prestamer": {
    "intro": "¿Sientes que el contador de tu microcrédito con Préstamer no para de subir y te cuesta dormir? Es normal sentirse atrapado por sus intereses, pero el primer paso para recuperar tu tranquilidad es saber que esa deuda no es infinita.",
    "worries": [
      {
        "reality": "Los procesos judiciales suelen ser el último recurso y tardan meses; además, si el contrato tiene intereses usurarios, es la propia entidad la que suele evitar el juzgado.",
        "fear": "He leído que me van a llevar a juicio mañana mismo si no pago."
      },
      {
        "reality": "Estar en una lista de morosos es reversible: una vez se liquida o se gana la nulidad de la deuda por usura, tus datos deben ser borrados por ley.",
        "fear": "Me van a meter en ASNEF y nunca más podré pedir financiación."
      }
    ],
    "origin": "Préstamer es una entidad financiera que opera de forma 100% online en España, formando parte del grupo internacional Avantcard. Se presentan como un servicio de préstamos automáticos que utiliza algoritmos para aprobar crédito en apenas unos minutos, incluso con ASNEF.",
    "faqs": [
      {
        "a": "Sí, es una práctica común para presionar el cobro, pero sus llamadas tienen límites legales y no pueden acosarte a horas intempestivas ni contactar con tu entorno.",
        "q": "¿Préstamer puede llamar a mis familiares o a mi trabajo?"
      },
      {
        "q": "¿Se puede reclamar un contrato con Préstamer si ya he pagado el préstamo?",
        "a": "Totalmente. Si los intereses superan el precio normal del dinero de forma desproporcionada, un juez puede anular el contrato y obligarles a devolverte lo pagado de más."
      }
    ],
    "detail": "Se especializan en microcréditos de concesión casi instantánea, un modelo que aplica intereses de demora muy elevados y honorarios que pueden triplicar el capital original en poco tiempo. Esta acumulación de \"gastos de gestión\" y penalizaciones por impago suele ser la base de las reclamaciones por usura de sus clientes.",
    "metaDescription": "¿Debes dinero a Préstamer? Descubre cómo gestionar los intereses abusivos y recuperar tu tranquilidad financiera con el apoyo de Calma. Tu solución empieza hoy."
  },
  "kviku": {
    "intro": "Si los intereses de tu préstamo con Kviku han crecido tanto que parece imposible terminar de pagarlo, no estás solo. Es el momento de dejar de sentir presión y descubrir cómo las leyes españolas pueden protegerte frente a estas deudas.",
    "worries": [
      {
        "reality": "Las llamadas constantes son una táctica de recobro; aunque pueden incluirte en ficheros como ASNEF, tienes derecho a salir de ellos si la deuda es incorrecta o si te acoges a la Ley de Segunda Oportunidad.",
        "fear": "Me están llamando sin parar y dicen que me van a meter en una lista de morosos para siempre."
      },
      {
        "reality": "Muchos contratos de Kviku contienen cláusulas que los jueces españoles consideran usura. Es muy posible que legalmente ya no les debas nada o que incluso ellos tengan que devolverte dinero a ti.",
        "fear": "He pagado ya el doble de lo que me prestaron y me siguen reclamando dinero."
      }
    ],
    "faqs": [
      {
        "a": "En absoluto; es un aviso típico para presionar. El embargo solo lo puede dictar un juez tras un proceso judicial largo donde tú siempre tienes derecho a defenderte y oponerte.",
        "q": "¿Me pueden embargar la cuenta mañana mismo si no pago a Kviku?"
      },
      {
        "a": "Sí, las deudas con este tipo de entidades son las que mejor encajan en la Ley de Segunda Oportunidad para quedar canceladas si no puedes afrontarlas.",
        "q": "¿Puedo incluir el préstamo de Kviku en un proceso de Ley de Segunda Oportunidad?"
      }
    ],
    "metaDescription": "¿Debes dinero a Kviku? Descubre cómo gestionar tu deuda, evitar intereses abusivos y recuperar la tranquilidad. En Calma te ayudamos a encontrar una solución real.",
    "detail": "Kviku opera principalmente a través de microcréditos rápidos y líneas de crédito virtuales que suelen aplicar intereses abusivos escondidos tras el concepto de 'costes de gestión'. Su sistema de préstamos casi instantáneos facilita un sobreendeudamiento rápido, generando reclamaciones por la falta de transparencia en sus contratos y por la aplicación de comisiones de demora desproporcionadas.",
    "origin": "Kviku es una entidad de tecnología financiera (Fintech) que ofrece soluciones de crédito totalmente digitales, especializada en préstamos de pequeña cuantía y aprobación inmediata. Aunque tiene presencia internacional, en España actúa como un proveedor de microcréditos online para consumidores que necesitan liquidez urgente sin trámites bancarios."
  },
  "zaplo": {
    "worries": [
      {
        "fear": "¿Me van a llevar a juicio mañana mismo por no pagar las cuotas?",
        "reality": "Zaplo suele preferir el recobro insistente antes que la vía judicial inmediata. Además, si el contrato contiene intereses abusivos, tú tienes herramientas legales para defenderte e incluso impugnar la deuda."
      },
      {
        "reality": "La inclusión en ficheros de morosidad es reversible; una vez se soluciona la deuda o se demuestra que es improcedente por intereses de usura, tus datos deben ser borrados, permitiéndote recuperar tu historial crediticio.",
        "fear": "¿Estaré en ASNEF para siempre y nadie más me prestará dinero?"
      }
    ],
    "intro": "Si las cuotas de Zaplo han pasado de ser una ayuda a convertirse en una preocupación diaria, no estás solo: muchas personas se encuentran atrapadas por intereses que crecen sin parar.",
    "detail": "Zaplo se especializa en préstamos personales rápidos de cuantías intermedias, a menudo utilizados para cubrir imprevistos urgentes. El problema surge cuando se aplican intereses que pueden considerarse usurarios y comisiones por demora que disparan la deuda original, convirtiendo un respiro temporal en una carga financiera inasumible.",
    "faqs": [
      {
        "a": "Sí, es totalmente posible. Si los intereses superan el precio normal del dinero de forma desproporcionada, un juez puede anular el contrato, obligándote a devolver solo el capital que te prestaron sin intereses ni comisiones.",
        "q": "¿Se pueden reclamar los intereses de un préstamo de Zaplo si son muy altos?"
      },
      {
        "q": "¿Qué pasa si no puedo pagar mi cuota mensual a Zaplo?",
        "a": "Aunque se definen como préstamos personales, su gestión es similar a los microcréditos; si el acoso telefónico es constante o no puedes pagar, existen mecanismos legales como la Ley de Segunda Oportunidad para agrupar o cancelar estas deudas."
      }
    ],
    "origin": "Zaplo es una entidad financiera que opera de forma 100% online en España, formando parte del grupo internacional 4finance. Se posiciona como una alternativa rápida a la banca tradicional, ofreciendo disponibilidad de dinero inmediata a través de procesos de solicitud simplificados.",
    "metaDescription": "¿Preocupado por tu deuda con Zaplo? Descubre cómo gestionar los intereses elevados y recuperar tu tranquilidad financiera con el apoyo de Calma. Tu solución empieza aquí."
  },
  "contante": {
    "origin": "Contante es una marca comercial gestionada por la entidad financiera Creamfinance Spain S.L.U., especializada en la concesión de préstamos de pequeña cuantía y corta duración a través de internet. Se presentan en el mercado español como una solución rápida para imprevistos urgentes mediante procesos 100% digitales.",
    "metaDescription": "¿Debes dinero a Contante? Descubre cómo gestionar tus microcréditos, evitar intereses abusivos y recuperar tu tranquilidad con la Ley de Segunda Oportunidad.",
    "intro": "Si un pequeño anticipo con Contante se ha convertido en una montaña de intereses de la que no sabes cómo bajar, respira: no eres la primera persona a la que le pasa y tiene solución legal.",
    "worries": [
      {
        "reality": "Estar en un fichero de morosidad es reversible; lo importante es que muchas de esas prórrogas que pagaste podrían ser reclamables para reducir o incluso anular tu deuda actual.",
        "fear": "Me amenazan con meterme en ASNEF hoy mismo si no pago los honorarios de prórroga."
      },
      {
        "reality": "La ley prohíbe el acoso y la vulneración de tu privacidad; cualquier comunicación de Contante debe ser exclusivamente contigo, y existen mecanismos legales para frenar el recobro insistente.",
        "fear": "Van a llamar a mi trabajo para decir que les debo dinero."
      }
    ],
    "detail": "Contante opera bajo un sistema de 'anticipos de nómina' que, en la práctica, funcionan como microcréditos de devolución rápida en un solo pago. Su modelo puede generar una espiral de deuda debido a los elevados honorarios de gestión y las penalizaciones por demora, que a menudo superan con creces el capital originalmente prestado.",
    "faqs": [
      {
        "q": "¿Pueden cobrarme intereses infinitos si me retraso con Contante?",
        "a": "No, por ley los intereses y comisiones de demora están limitados; si te exigen el doble o triple de lo prestado, esos cargos podrían ser nulos y no tendrías obligación de pagarlos."
      },
      {
        "a": "Sí, como cualquier deuda de microcrédito, la Ley de Segunda Oportunidad permite cancelar el 100% de lo que les debes si no puedes afrontarlo por tu situación económica actual.",
        "q": "¿Se puede incluir mi deuda de Contante en la Ley de Segunda Oportunidad?"
      }
    ]
  },
  "okmoney": {
    "origin": "OkMoney es una marca comercial operada en España por Df-Sdr Ibérica S.L., enfocada en ofrecer liquidez inmediata a través de procesos 100% online. Su modelo de negocio se basa en la rapidez de concesión para importes bajos, generalmente a devolver en un plazo de 30 días.",
    "faqs": [
      {
        "q": "¿Tengo que pagar todos los intereses que me pide OkMoney?",
        "a": "¡No te agobies! Si los intereses son desproporcionados, solo estarías obligado a devolver el dinero que te prestaron inicialmente, sin los extras abusivos."
      },
      {
        "q": "¿Puedo incluir mi deuda con OkMoney en la Ley de Segunda Oportunidad?",
        "a": "Sí, es posible agrupar tus deudas mediante un plan de pagos o, si cumples los requisitos, cancelarlas definitivamente con la Ley de Segunda Oportunidad."
      }
    ],
    "worries": [
      {
        "reality": "Aunque pueden inscribirte en ficheros de morosidad, existen derechos legales que te protegen contra el acoso telefónico y opciones para salir de esos listados si la deuda es reclamable.",
        "fear": "Me están llamando constantemente y amenazan con incluirme en ASNEF hoy mismo."
      },
      {
        "fear": "Si no pago a OkMoney, me van a embargar la nómina la semana que viene.",
        "reality": "Un embargo solo puede ordenarlo un juez tras un proceso judicial largo que aún no ha ocurrido; además, tienes derecho a defenderte alegando cláusulas abusivas en el contrato."
      }
    ],
    "detail": "OkMoney se especializa en préstamos urgentes de pequeña cuantía que, al no devolverse en pocos días, generan intereses de demora y comisiones de gestión muy elevados. Muchos de sus contratos han sido cuestionados por aplicar tipos de interés que superan con creces la media del mercado, lo que permite a los usuarios reclamar la nulidad de los intereses por usura.",
    "intro": "¿Sientes que el minicrédito que pediste a OkMoney para un apuro se ha convertido en una montaña imposible de escalar? No estás solo: recuperar el control de tus finanzas es posible y estamos aquí para darte la mano.",
    "metaDescription": "¿Debes dinero a OkMoney? Descubre cómo gestionar tus microcréditos, reclamar intereses abusivos y recuperar la tranquilidad con la ayuda de Calma."
  },
  "solcredito": {
    "faqs": [
      {
        "a": "Sí, aunque Solcrédito es un intermediario, los contratos que facilita suelen tener intereses muy superiores a la media del mercado. Si los intereses se consideran usurarios, un juez puede anular el contrato y solo tendrás que devolver el capital prestado, sin intereses.",
        "q": "¿Es posible reclamar los intereses de mi préstamo con Solcrédito?"
      },
      {
        "q": "¿Qué pasa si no puedo pagar a tiempo mi microcrédito?",
        "a": "Depende de la fase en la que esté tu deuda. Si ya estás en un proceso judicial, es urgente actuar; si solo recibes llamadas, aún tienes margen para negociar o acogerte a la Ley de Segunda Oportunidad para agrupar o cancelar tus deudas."
      }
    ],
    "intro": "¿Sientes que el microcrédito que pediste a través de Solcrédito se ha convertido en una bola de nieve imparable? No estás solo: esta sensación de agobio es mucho más común de lo que crees cuando los intereses empiezan a acumularse.",
    "worries": [
      {
        "reality": "La ley de protección de datos prohíbe taxativamente que informen a terceros sobre tu deuda; si lo hacen, están cometiendo una infracción que puedes denunciar.",
        "fear": "Me da pánico que llamen a mi trabajo o a mis familiares para reclamar la deuda."
      },
      {
        "reality": "Para que exista un embargo debe haber una sentencia judicial previa y, en muchos casos, los intereses de estos préstamos son abusivos y pueden ser anulados legalmente.",
        "fear": "Creo que nunca dejaré de pagar intereses y que me acabarán embargando la cuenta."
      }
    ],
    "origin": "Solcrédito es una marca comercial gestionada por Fiizy, una entidad con sede en Estonia que opera en España como plataforma tecnológica de intermediación financiera. Su función principal es analizar el perfil del cliente para ofrecerle productos de microcréditos y préstamos rápidos de terceros proveedores.",
    "detail": "Solcrédito actúa principalmente como un buscador y mediador de préstamos rápidos que conecta a usuarios con prestamistas externos de intereses elevados. El problema suele surgir cuando se encadenan microcréditos con plazos de devolución muy cortos, lo que dispara los intereses de demora y las comisiones por impago, convirtiendo una pequeña urgencia en una deuda difícil de gestionar.",
    "metaDescription": "¿Debes dinero a Solcrédito? No dejes que los intereses te quiten el sueño. Descubre cómo gestionar tu deuda y recuperar tu tranquilidad financiera con Calma."
  },
  "fidinda": {
    "intro": "Si los pagos mensuales a Fidinda te están asfixiando y sientes que la deuda no baja a pesar de tu esfuerzo, no estás solo. Es el momento de recuperar el control y dejar de vivir con miedo al teléfono.",
    "detail": "Fidinda se especializa en préstamos rápidos de cuantías medias, aplicando a menudo intereses que superan con creces los límites del mercado tradicional. Sus contratos suelen incluir cláusulas de penalización por demora y seguros vinculados que elevan el coste total, haciendo que una pequeña urgencia económica se convierta en una deuda perpetua difícil de liquidar solo con las cuotas mensuales.",
    "faqs": [
      {
        "a": "Sí, es posible negociar una quita o una restructuración, pero lo más efectivo suele ser reclamar por la vía de la usura si los intereses son abusivos para cancelar el contrato legalmente.",
        "q": "¿Puedo negociar directamente con Fidinda para pagar menos?"
      },
      {
        "q": "¿Cuánto tardan en incluirme en ASNEF si dejo de pagar?",
        "a": "Fidinda suele reportar los impagos a ASNEF o Experian tras el primer mes de demora; no obstante, una vez resuelta la deuda o acogido a la Ley de Segunda Oportunidad, tienes derecho a que borren tus datos de estos ficheros."
      }
    ],
    "metaDescription": "¿No puedes pagar a Fidinda? Descubre cómo solucionar tus deudas de microcréditos, salir de ASNEF y recuperar la tranquilidad con el equipo de Calma.",
    "worries": [
      {
        "fear": "¿Pueden entrar en mi casa y quitarme mis cosas si no pago la cuota de Fidinda?",
        "reality": "Absolutamente no; solo un juez puede ordenar un embargo tras un proceso judicial largo, y con la Ley de Segunda Oportunidad podemos paralizar cualquier intento de ejecución antes de que ocurra."
      },
      {
        "fear": "Me han dicho que si no pago hoy mismo, la deuda se multiplicará por tres por los intereses.",
        "reality": "Fidinda suele aplicar comisiones por impago muy altas, pero muchas de estas cláusulas son abusivas legalmente y pueden ser anuladas por un juez, reduciendo tu deuda solo al capital que realmente te prestaron."
      }
    ],
    "origin": "Fidinda es una marca comercial operada habitualmente por Novum Bank Limited, una entidad financiera con sede en Malta que opera en el mercado español. Se centra en la concesión de créditos rápidos online de hasta 5.000 euros, prometiendo rapidez y flexibilidad pero bajo condiciones financieras de alto coste."
  },
  "prestalo": {
    "faqs": [
      {
        "q": "¿Puedo reclamar los intereses si ya he pagado el préstamo? Pais: \"España\"",
        "a": "Sí, es posible. Si los intereses aplicados se consideran usurarios o las comisiones son abusivas, un juez puede anular el contrato, obligándote a devolver solo el dinero que recibiste sin intereses."
      },
      {
        "q": "¿Préstalo me meterá en el ASNEF si dejo de pagar hoy mismo?",
        "a": "No es un proceso inmediato; primero deben notificarte la deuda fehacientemente y, tras un tiempo sin pago, te incluirán en ASNEF o Badexcug, dificultando pedir otros préstamos o contratar servicios."
      }
    ],
    "intro": "Si te sientes atrapado por los pagos de Préstalo y ves que tu deuda no deja de crecer a pesar de tus esfuerzos, no estás solo y, sobre todo, tienes derechos legales para frenarlo.",
    "detail": "Préstalo funciona principalmente como un intermediario financiero que conecta a usuarios con diversas empresas de minicréditos urgentes. El problema surge cuando se encadenan varios microcréditos con intereses de demora muy elevados, creando una bola de nieve donde las comisiones por impago superan rápidamente al capital prestado originalmente.",
    "worries": [
      {
        "fear": "Me están amenazando con un juicio rápido y el embargo de mi nómina por un préstamo pequeño.",
        "reality": "Préstalo o sus entidades asociadas suelen intentar primero el recobro amistoso; para que exista un embargo, debe haber una sentencia judicial previa y tú siempre tienes derecho a defenderte."
      },
      {
        "reality": "Muchos contratos vinculados a Préstalo contienen cláusulas de intereses que la justicia española suele anular, permitiéndote cancelar la deuda si ya has devuelto el capital inicial.",
        "fear": "He pagado ya el doble de lo que me prestaron y me siguen reclamando dinero."
      }
    ],
    "origin": "Préstalo es una plataforma tecnológica que opera en España como buscador y comparador de préstamos rápidos y microcréditos. Su modelo de negocio se basa en facilitar el acceso inmediato a liquidez a través de terceros, enfocándose en perfiles que necesitan dinero urgente sin grandes trámites.",
    "metaDescription": "¿Debes dinero a Préstalo? Descubre cómo gestionar tu deuda, reclamar intereses abusivos y recuperar la tranquilidad con la Ley de Segunda Oportunidad."
  },
  "credy": {
    "intro": "¿Sientes que el microcrédito que pediste a través de Credy se ha convertido en una bola informativa de intereses que no deja de crecer? No estás solo: esta sensación de agobio tiene una salida legal y definitiva.",
    "origin": "Credy es una plataforma de servicios financieros operada por Traffic Control S.A., especializada en la búsqueda y comparación de préstamos rápidos online. No es un banco tradicional, sino un buscador que facilita el acceso a financiación inmediata para personas que suelen ser rechazadas por la banca convencional.",
    "worries": [
      {
        "fear": "Me amenazan con meterme en ASNEF y no podré pedir ni un contrato de móvil.",
        "reality": "Estar en un fichero de morosos es reversible. Si logramos demostrar que tu deuda tiene intereses usurarios, podemos impugnar esa inclusión y limpiar tu historial crediticio."
      },
      {
        "fear": "He pagado ya el doble de lo que me prestaron y me siguen reclamando más dinero.",
        "reality": "Muchos de los contratos vinculados a Credy contienen cláusulas que la jurisprudencia española considera abusivas. Es muy probable que legalmente ya no debas nada o que incluso te tengan que devolver dinero a ti."
      }
    ],
    "detail": "Credy funciona como un intermediario financiero que conecta a usuarios con prestamistas externos, lo que a menudo resulta en una cadena de microcréditos con intereses muy superiores a la media del mercado. Estas deudas suelen crecer descontroladamente debido a las elevadas comisiones por demora y a la facilidad de contratar múltiples préstamos pequeños de forma sucesiva.",
    "metaDescription": "¿Debes dinero a Credy? Descubre cómo gestionar tus deudas de microcréditos, evitar intereses abusivos y recuperar tu tranquilidad con la ayuda de Calma.",
    "faqs": [
      {
        "a": "No desesperes, es una táctica habitual de presión. En Calma analizamos si los intereses que te piden son abusivos y, de ser así, podemos ayudarte a que solo tengas que devolver el capital prestado sin esos recargos desproporcionados.",
        "q": "¿Qué hago si no paran de llamarme por un préstamo de Credy?"
      },
      {
        "a": "Sí, si tu situación financiera es crítica y cumples los requisitos de insolvencia y buena fe, la Ley de Segunda Oportunidad permite cancelar legalmente las deudas acumuladas a través de intermediarios como Credy.",
        "q": "¿Puedo acogerme a la Ley de Segunda Oportunidad si mis deudas vienen de microcréditos?"
      }
    ]
  },
  "monedo-now": {
    "faqs": [
      {
        "q": "¿Tengo que pagar a Monedo si parece que la empresa ya no opera igual?",
        "a": "Aunque Kreditech (su matriz) cesó operaciones en varios mercados, la deuda no desaparece automáticamente; sin embargo, si tiene intereses usurarios, es posible reclamar la nulidad de esos intereses y pagar solo el capital que realmente te prestaron."
      },
      {
        "q": "¿Puedo incluir la deuda de Monedo en la Ley de Segunda Oportunidad?",
        "a": "Sí, la Ley de Segunda Oportunidad permite cancelar deudas de microcréditos como los de Monedo si cumples los requisitos de insolvencia y buena fe, dándote el respiro definitivo que necesitas."
      }
    ],
    "worries": [
      {
        "fear": "Recibo llamadas constantes y correos amenazantes por una deuda que no para de crecer.",
        "reality": "El acoso telefónico tiene límites legales y, si el contrato contiene usura, un juez puede dictaminar que solo debes devolver el dinero prestado, anulando todos los intereses abusivos."
      },
      {
        "fear": "Me han metido en ASNEF por Monedo Now y no puedo pedir ni una tarjeta.",
        "reality": "Estar en un fichero de morosos es una situación reversible; una vez iniciamos el proceso legal o la Ley de Segunda Oportunidad, existen mecanismos para salir de estos listados y recuperar tu tranquilidad financiera."
      }
    ],
    "origin": "Monedo Now fue una plataforma de préstamos personales online gestionada por el grupo alemán Kreditech, especializado en servicios financieros basados en tecnología de datos. Operó en España ofreciendo financiación rápida y flexible, principalmente dirigida a perfiles que encontraban dificultades para acceder al crédito bancario tradicional.",
    "detail": "Sus préstamos rápidos se basaban en un sistema de evaluación automática que permitía obtener dinero casi al instante, pero a cambio de intereses que a menudo superaban con creces el límite de la usura. Muchos usuarios se encuentran atrapados en una espiral de cuotas donde, tras meses pagando, el importe pendiente apenas disminuye debido a la carga de intereses y comisiones por demora.",
    "metaDescription": "¿Asfixiado por los intereses de Monedo Now? Descubre cómo gestionar tu deuda, reclamar intereses abusivos o acogerte a la Ley de Segunda Oportunidad con Calma.",
    "intro": "Si sientes que tu préstamo con Monedo Now se ha convertido en una sombra que no te deja avanzar, es importante que sepas que esos intereses interminables no son una condena perpetua."
  },
  "ibancar": {
    "origin": "Ibancar es una entidad financiera de origen español que opera principalmente online, enfocada en la concesión de préstamos rápidos con garantía sobre vehículos. A diferencia de las casas de empeño tradicionales, permiten que el cliente siga conduciendo su coche mientras devuelve el dinero.",
    "metaDescription": "¿Debes dinero a Ibancar y temes por tu coche? Descubre cómo gestionar tu deuda, evitar el embargo y recuperar la tranquilidad con el equipo de Calma.",
    "intro": "Si pediste un préstamo con Ibancar usando tu coche como garantía y ahora las cuotas te ahogan, no estás solo en esto. Es normal sentir miedo a perder tu medio de transporte, pero existen mecanismos legales diseñados precisamente para protegerte en estas situaciones.",
    "detail": "Se especializan en préstamos rápidos donde el coche actúa como aval, lo que suele generar intereses más elevados que la banca tradicional y el riesgo real de perder el vehículo. Muchas de las reclamaciones se centran en la falta de transparencia sobre los costes totales y las dificultades para recuperar la titularidad del coche una vez pagada la deuda.",
    "worries": [
      {
        "reality": "Nadie puede llevarse tu vehículo sin una orden judicial previa; tienes tiempo para asesorarte y buscar una renegociación o defensa legal.",
        "fear": "Tengo miedo de que vengan a mi casa a llevarse el coche sin previo aviso."
      },
      {
        "fear": "Siento que por mucho que pago, la deuda nunca baja debido a los intereses y gastos.",
        "reality": "Muchos préstamos con garantía de coche incluyen comisiones que pueden ser anulables por ley, permitiéndote reducir drásticamente lo que debes."
      }
    ],
    "faqs": [
      {
        "a": "Sí, aunque el coche sea el aval, si los intereses se consideran usurarios o abusivos por un juez, podrías anular el contrato y recuperar el exceso pagado.",
        "q": "¿Puedo reclamar si mi préstamo de Ibancar tiene intereses muy altos?"
      },
      {
        "q": "¿Me van a quitar el coche mañana mismo si no pago la cuota?",
        "a": "Ibancar no suele retirar el coche de inmediato; primero deben iniciar un proceso judicial donde tú tienes derecho a defenderte y proponer soluciones."
      }
    ]
  },
  "credito-si": {
    "faqs": [
      {
        "a": "Sí, muchas de las condiciones de estos microcréditos han sido anuladas por tribunales al considerarse desproporcionadas, lo que permite devolver solo lo que te prestaron.",
        "q": "¿Es posible anular los intereses de mi préstamo con CréditoSí?"
      },
      {
        "q": "¿Qué pasa si no puedo pagar una extensión del plazo?",
        "a": "Te recomendamos contactar con profesionales antes de pedir una prórroga, ya que estas suelen ser parches costosos que no solucionan el problema de fondo de la deuda."
      }
    ],
    "detail": "Sus préstamos se caracterizan por plazos de devolución muy cortos y honorarios que pueden disparar la deuda si no se devuelve a tiempo. El problema surge cuando los cargos por mora y las prórrogas constantes generan una espiral de intereses que a menudo superan con creces el capital solicitado originalmente.",
    "worries": [
      {
        "fear": "Me amenazan con incluirme en ASNEF y no podré pedir nunca más un préstamo.",
        "reality": "Estar en un fichero es una situación reversible; una vez se gestiona la deuda o se demuestra su irregularidad, tus datos deben ser borrados por ley."
      },
      {
        "fear": "Van a quitarme todo el dinero de la cuenta de golpe mañana mismo.",
        "reality": "Nadie puede embargar tus bienes o cuentas directamente sin una orden judicial previa tras un proceso donde tú tienes derecho a defenderte."
      }
    ],
    "origin": "CréditoSí es una marca gestionada por la entidad Creamfinance Spain S.L.U., especializada en la concesión de minicréditos rápidos y líneas de crédito online de gestión inmediata. Operan de forma totalmente digital para ofrecer liquidez urgente a través de procesos de aprobación automatizados.",
    "intro": "Si los mensajes de CréditoSí te están quitando el sueño por un préstamo que no para de crecer, no estás solo. Es posible frenar esta situación y recuperar el control de tu economía hoy mismo.",
    "metaDescription": "¿Agobiado por una deuda con CréditoSí? Descubre cómo gestionar tus microcréditos, detener el acoso y reducir lo que debes con la ayuda experta de Calma."
  },
  "cashgo": {
    "faqs": [
      {
        "q": "¿CashGo puede llevarme a juicio si no pago?",
        "a": "Sí, como cualquier deuda, puede derivar en un proceso judicial, pero lo habitual es que busquen acuerdos previos. Si te notifican una demanda, tienes un plazo corto para oponerte y cuestionar si los intereses son abusivos."
      },
      {
        "a": "No estás solo; muchas personas han conseguido reducir o anular sus deudas con CashGo si se demuestra que el contrato contenía intereses de usura. Nosotros podemos analizar tu caso para ver si el importe que te reclaman es legal o si puedes acogerte a la Ley de Segunda Oportunidad.",
        "q": "¿Qué hago si mi deuda con CashGo no para de subir?"
      }
    ],
    "origin": "CashGo es una entidad financiera que opera en España ofreciendo microcréditos rápidos a través de internet, diseñados para cubrir urgencias puntuales de liquidez. Su modelo de negocio se basa en la rapidez de gestión y en la aplicación de honorarios elevados por préstamos de corta duración.",
    "worries": [
      {
        "fear": "Me llaman a todas horas y tengo miedo de que contacten con mi empresa o mi familia.",
        "reality": "La ley protege tu privacidad y el acoso telefónico es denunciable; además, cualquier comunicación con terceros sobre tu deuda vulnera la protección de datos y tiene consecuencias legales para ellos."
      },
      {
        "fear": "He pagado el doble de lo que me prestaron y me dicen que todavía les debo dinero.",
        "reality": "Muchos contratos de microcréditos contienen cláusulas de usura que los juzgados españoles están anulando; podrías tener derecho a pagar solo el capital prestado o incluso a que te devuelvan lo pagado de más."
      }
    ],
    "intro": "Si un pequeño préstamo con CashGo se ha convertido en un problema que no te deja dormir, es importante que sepas que el contador puede detenerse. No eres la primera persona que se siente atrapada por sus condiciones, y hoy mismo puedes empezar a recuperar tu tranquilidad.",
    "detail": "Especializada en minicréditos de concesión casi instantánea, esta entidad aplica intereses y comisiones de demora que pueden hacer que una pequeña cantidad prestada crezca exponencialmente en pocos meses. Es habitual encontrar reclamaciones por falta de transparencia en sus contratos y por el uso de métodos de recobro insistentes cuando el cliente no puede hacer frente al pago en el corto plazo estipulado.",
    "metaDescription": "¿Debes dinero a CashGo y los intereses no dejan de crecer? Descubre cómo gestionar tu deuda, evitar el acoso y recuperar tu tranquilidad financiera con Calma."
  },
  "money24": {
    "origin": "Money24 es una plataforma de servicios financieros online que actúa como buscador y comparador de microcréditos, operando bajo la gestión de compañías con sede en Estonia. Se especializan en ofrecer liquidez inmediata a usuarios que suelen tener dificultades para acceder a la banca tradicional.",
    "intro": "Si un pequeño préstamo con Money24 se ha convertido en una montaña de intereses de la que no ves salida, no estás solo. Entendemos el agobio de los mensajes constantes y estamos aquí para devolverte la tranquilidad.",
    "worries": [
      {
        "reality": "Aunque pueden incluirte en listados como ASNEF, esto no es definitivo; una vez solucionada o renegociada la deuda mediante la Ley de Segunda Oportunidad, tienes derecho a que tus datos sean borrados.",
        "fear": "Me amenazan con meterme en ficheros de morosos y no podré pedir nunca más un préstamo."
      },
      {
        "fear": "Van a llamar a mi trabajo o a mis familiares para reclamar el dinero de Money24.",
        "reality": "El acoso telefónico a terceros es ilegal y vulnera la protección de datos; existen mecanismos legales para frenar estas comunicaciones y centrar la resolución en el juzgado o mediante mediación."
      }
    ],
    "faqs": [
      {
        "q": "¿Es posible anular mi deuda con Money24 mediante la Ley de Segunda Oportunidad?",
        "a": "Sí, los microcréditos son productos financieros que pueden ser cancelados o renegociados si se demuestra que los intereses son desproporcionados o que no se evaluó correctamente tu capacidad de pago."
      },
      {
        "a": "Más que un prestamista tradicional, funcionan como un buscador que te conecta con préstamos rápidos; si te están cobrando comisiones por servicios de gestión que no solicitaste, eso también podría ser reclamable.",
        "q": "¿Por qué mi deuda sigue subiendo si ya he pagado el capital inicial?"
      }
    ],
    "detail": "Esta entidad opera principalmente como un intermediario financiero que facilita el acceso a minicréditos inmediatos, los cuales suelen acarrear intereses y honorarios muy elevados por cortos periodos de tiempo. La acumulación de penalizaciones por impago y el uso de prórrogas costosas son las causas principales por las que sus clientes acaban atrapados en una deuda que crece exponencialmente.",
    "metaDescription": "¿Debes dinero a Money24 y los intereses no paran de subir? Descubre cómo gestionar tu deuda y recuperar tu tranquilidad con la ayuda experta de Calma."
  },
  "creditomovil": {
    "metaDescription": "¿Debes dinero a Crédito Móvil? Recupera tu tranquilidad. Descubre cómo gestionar tus microcréditos y reducir tu deuda legalmente con el apoyo de Calma.",
    "detail": "Su modelo de negocio se basa en el 'dinero rápido' aplicado a microcréditos de cuantías pequeñas que deben devolverse en plazos muy cortos. El problema surge con sus elevadas tasas de demora y honorarios que pueden triplicar el capital inicial, lo que a menudo permite reclamar la nulidad del contrato por intereses abusivos o falta de transparencia.",
    "origin": "Crédito Móvil es una marca que opera en el sector de los microcréditos online en España, especializada en conceder liquidez inmediata con requisitos mínimos. Pertenece a grupos financieros enfocados en la financiación alternativa para consumidores que necesitan cubrir gastos imprevistos de forma urgente.",
    "worries": [
      {
        "fear": "Me amenazan con meterme en ASNEF y no podré pedir ni un móvil.",
        "reality": "Aunque pueden incluirte en ficheros de morosidad, si la deuda es fruto de intereses abusivos, podemos impugnar esa anotación mientras se resuelve la reclamación."
      },
      {
        "fear": "¿Van a ir a mi casa o llamarme al trabajo para cobrarme?",
        "reality": "La ley prohíbe el acoso; las empresas de recobro tienen límites legales y no pueden contactar con tu entorno ni presionarte de forma que vulnere tu intimidad."
      }
    ],
    "intro": "Un préstamo de Crédito Móvil que prometía resolverte el mes se ha convertido en una cuota que vuelve cada poco tiempo, más alta de lo que recordabas. No es una sensación tuya: sus plazos cortos y tasas de demora están pensados así, y por eso son tan a menudo reclamables.",
    "faqs": [
      {
        "q": "¿Puedo anular mi deuda con Crédito Móvil si los intereses son abusivos?",
        "a": "Sí, en España es posible reclamar si los intereses superan notablemente el precio normal del dinero; si se declara nulo, solo tendrías que devolver el capital que te prestaron originalmente."
      },
      {
        "q": "¿Qué pasa si ya he pagado más capital del que recibí?",
        "a": "Por supuesto. Si ya has pagado más de lo que te prestaron sumando cuotas y comisiones, podrías incluso recibir una devolución del exceso pagado."
      }
    ]
  },
  "wizink": {
    "metaDescription": "¿Atrapado con la tarjeta WiZink? Descubre cómo cancelar tu deuda legalmente y recuperar los intereses abusivos. Respira tranquilo con la ayuda de Calma.",
    "worries": [
      {
        "fear": "Me llaman a todas horas y tengo miedo de que contacten con mi trabajo o familiares.",
        "reality": "Existen límites legales contra el acoso; una vez inicias un proceso de defensa o Ley de Segunda Oportunidad, puedes detener estas comunicaciones intrusivas legalmente."
      },
      {
        "reality": "La justicia española ya ha dictaminado en numerosas ocasiones contra los intereses desproporcionados de esta entidad, permitiendo anular contratos y devolver el exceso cobrado.",
        "fear": "Nunca voy a terminar de pagar mi tarjeta WiZink porque los intereses se comen mi cuota."
      }
    ],
    "faqs": [
      {
        "a": "Sí, muchas de estas tarjetas incluyen intereses abusivos o falta de transparencia; puedes recuperar lo pagado de más e incluso cancelar el contrato si se demuestra usura.",
        "q": "¿Se puede reclamar si mi tarjeta WiZink tiene intereses muy altos?"
      },
      {
        "q": "¿Puedo incluir mi deuda de WiZink en la Ley de Segunda Oportunidad?",
        "a": "Totalmente, es una de las deudas que más comúnmente se incluyen en este proceso legal para quedar libre de cargas y empezar de cero."
      }
    ],
    "detail": "WiZink se especializa en tarjetas de crédito revolving con intereses que a menudo rozan el límite de la usura, lo que provoca que la deuda apenas disminuya a pesar de pagar las cuotas mensuales. El sistema de pago aplazado y la capitalización de intereses generan un efecto de \"bola de nieve\" donde el cliente termina pagando intereses sobre intereses de forma indefinida.",
    "intro": "Si sientes que tu tarjeta WiZink es un pozo sin fondo donde los recibos no dejan de subir aunque no la uses, no estás solo: hay una salida legal para recuperar el control.",
    "origin": "WiZink es un banco digital con sede en Madrid que heredó el negocio de tarjetas de Citibank y Barclays en España. Se centra exclusivamente en productos de consumo, principalmente tarjetas de crédito con modalidades de pago flexible y depósitos de ahorro."
  },
  "cetelem": {
    "origin": "Cetelem es una filial de BNP Paribas Personal Finance que opera en España desde hace décadas, consolidándose como líder en financiación en el punto de venta. Se especializan en préstamos al consumo y tarjetas de crédito de pago aplazado vinculadas a establecimientos de tecnología, hogar y automoción.",
    "intro": "¿Sientes que tu deuda con Cetelem nunca baja a pesar de pagar cada mes sin falta? No eres tú ni es falta de planificación; el sistema de sus créditos está diseñado para que la deuda se autoalimente.",
    "metaDescription": "¿Debes dinero a Cetelem y no ves el final? Descubre cómo gestionar tu deuda, reclamar intereses o acogerte a la Ley de Segunda Oportunidad con Calma.",
    "faqs": [
      {
        "a": "Sí, es posible. La Ley de Segunda Oportunidad permite cancelar deudas con entidades como Cetelem si cumples los requisitos de insolvencia y buena fe, permitiéndote empezar de cero legalmente.",
        "q": "¿Se pueden cancelar mis deudas con Cetelem mediante la Ley de Segunda Oportunidad?"
      },
      {
        "a": "No es obligatorio, pero sí recomendable. Un profesional puede analizar si tu contrato contiene intereses usurarios o falta de transparencia, lo que te permitiría reducir la deuda o incluso recuperar dinero.",
        "q": "¿Es necesario un abogado para reclamar los intereses de mi tarjeta Cetelem?"
      }
    ],
    "worries": [
      {
        "reality": "Cetelem utiliza agencias de recobro con tácticas insistentes, pero un proceso judicial no es inmediato y, si ocurriera, es el momento en el que un juez puede declarar nulo tu contrato por usura.",
        "fear": "Me llaman a todas horas y dicen que me van a llevar a juicio mañana mismo."
      },
      {
        "fear": "Si dejo de pagar, me quitarán el coche o mi parte de la casa inmediatamente.",
        "reality": "Nadie puede embargarte nada sin una sentencia judicial previa; además, existen mínimos inembargables por ley que protegen tu sustento y el de tu familia."
      }
    ],
    "detail": "Cetelem es conocido por sus tarjetas 'revolving' y líneas de crédito integradas en grandes comercios, donde el sistema de cuotas bajas genera una espiral de intereses que apenas reduce el capital principal. En muchas ocasiones, la falta de transparencia en la contratación y la aplicación de seguros de protección de pagos no solicitados son los motivos principales detrás de las reclamaciones de sus clientes."
  },
  "oney": {
    "intro": "Si sientes que tu deuda con Oney nunca baja a pesar de no dejar de pagar, no es una sensación tuya: es el resultado de un sistema de intereses diseñado para perpetuarse.",
    "detail": "Sus tarjetas y líneas de crédito suelen estar vinculadas a compras en grandes establecimientos como Alcampo, Leroy Merlin o Decathlon, facilitando el fraccionamiento de pagos que a menudo se convierte en un sistema revolving. Este mecanismo puede hacer que los intereses se acumulen rápidamente, provocando que la deuda apenas disminuya a pesar de pagar las cuotas mensuales religiosamente.",
    "metaDescription": "¿Tienes deudas con Oney que no dejan de crecer? Descubre cómo cancelar intereses abusivos o acogerte a la Ley de Segunda Oportunidad con Calma. Recupera tu tranquilidad.",
    "faqs": [
      {
        "a": "Sí, es posible negociar una reducción o incluso la cancelación de intereses si se demuestra que el contrato contenía cláusulas abusivas o falta de transparencia.",
        "q": "¿Puedo reclamar los intereses de mi tarjeta Oney si los considero abusivos?"
      },
      {
        "q": "¿Qué pasa si ya no puedo pagar la cuota de mi tarjeta Alcampo-Oney?",
        "a": "En Calma revisamos tu caso para ver si cumples los requisitos de la Ley de Segunda Oportunidad, lo que permitiría paralizar los pagos y proteger tus bienes de forma inmediata."
      }
    ],
    "origin": "Oney es una entidad financiera de origen francés, anteriormente conocida como Banque Accord, que opera en España ofreciendo soluciones de pago y préstamos personales. Está estrechamente ligada al sector retail, actuando como el brazo financiero que gestiona las tarjetas de fidelidad y crédito de algunas de las mayores superficies comerciales del país.",
    "worries": [
      {
        "reality": "Oney suele vender estas deudas a fondos si no hay pago, pero el embargo es un proceso judicial largo que un juez debe autorizar; además, con la Ley de Segunda Oportunidad puedes paralizar estos procesos por ley.",
        "fear": "¿Me pueden denunciar y quitar la casa por una tarjeta de Oney?"
      },
      {
        "reality": "El acoso telefónico es una práctica que puedes frenar legalmente; además, una vez inicias un proceso de insolvencia, las entidades tienen prohibido seguir reclamándote la deuda de forma directa.",
        "fear": "Oney no para de llamarme al trabajo y a mis familiares."
      }
    ]
  },
  "carrefour": {
    "intro": "¿Sientes que tu Tarjeta PASS de Carrefour se ha convertido en una mochila que no deja de pesar por muchos pagos que hagas? No eres la única persona que ve cómo su deuda no baja a pesar del esfuerzo diario; hay una salida legal para recuperar tu tranquilidad.",
    "worries": [
      {
        "reality": "No, un embargo solo puede ordenarlo un juez tras un proceso judicial largo. Antes de eso, tienes margen para negociar o acogerte a soluciones legales que paralizan cualquier ejecución.",
        "fear": "¿Me pueden embargar el sueldo mañana mismo por no pagar la PASS?"
      },
      {
        "reality": "Estar en ASNEF es temporal y reversible. Una vez que resuelves la deuda o aplicas la Ley de Segunda Oportunidad, tienes derecho a que tus datos sean borrados y a recuperar tu historial crediticio limpio.",
        "fear": "Me han dicho que estaré en una 'lista negra' para siempre si reclamo."
      }
    ],
    "metaDescription": "¿Asfixiado por la deuda de la Tarjeta PASS de Carrefour (Oney)? Descubre cómo cancelar tus intereses o acogerte a la Ley de Segunda Oportunidad con Calma.",
    "origin": "La Tarjeta Carrefour PASS es gestionada por Servicios Financieros Carrefour, vinculada estrechamente al grupo Oney (propiedad de BPCE y Auchan). Es una de las financieras de consumo más extendidas en España, especializada en ofrecer crédito rápido directamente en el punto de venta.",
    "detail": "Su producto estrella es la Tarjeta PASS, que permite financiar compras en sus hipermercados y fuera de ellos mediante la modalidad 'revolving'. Este sistema suele generar una deuda difícil de liquidar, ya que las cuotas bajas apenas cubren los intereses generados, haciendo que el principal apenas disminuya mes a mes.",
    "faqs": [
      {
        "a": "Sí, muchas tarjetas PASS de Carrefour han sido reclamadas por falta de transparencia en la contratación o por intereses que la jurisprudencia considera abusivos. Si es el caso, podrías recuperar lo pagado de más.",
        "q": "¿Se puede reclamar el seguro de protección de pagos y los intereses?"
      },
      {
        "a": "Oney suele ser persistente en el recobro, pero recuerda que el acoso constante es ilegal. Existen mecanismos legales como la Ley de Segunda Oportunidad para frenar estas llamadas de forma definitiva.",
        "q": "¿Qué pasa si Oney me llama constantemente para cobrar?"
      }
    ]
  },
  "klarna": {
    "faqs": [
      {
        "a": "No exactamente, pero el impago de sus cuotas activa procesos de recobro y el reporte a ficheros de morosidad, lo que afectará seriamente a tu capacidad de pedir cualquier préstamo en el futuro.",
        "q": "¿Puedo ir a la cárcel por no pagar mis cuotas de Klarna?"
      },
      {
        "a": "Sí, como cualquier otra deuda financiera en España, si cumples los requisitos de insolvencia y buena fe, puedes incluir lo que les debes en el proceso para acogerte a la Ley de Segunda Oportunidad.",
        "q": "¿Puedo cancelar mi deuda con Klarna con la Ley de Segunda Oportunidad?"
      }
    ],
    "metaDescription": "¿No puedes pagar tus cuotas de Klarna? Descubre cómo solucionar tus deudas de pago aplazado y recuperar la tranquilidad. En Calma te ayudamos paso a paso.",
    "worries": [
      {
        "fear": "Me están enviando correos constantes y amenazan con pasar mi deuda a una agencia de recobro.",
        "reality": "Klarna suele ser persistente en sus comunicaciones digitales, pero existen límites legales para el acoso; la deuda se puede negociar o agrupar para que dejes de recibir esa presión diaria."
      },
      {
        "fear": "Me van a meter en ASNEF por una compra de 50 euros y nunca más podré tener una tarjeta.",
        "reality": "Es cierto que notifican a los ficheros, pero esa anotación es reversible: una vez que abordamos la deuda legalmente o mediante el pago, tienen la obligación de eliminar tus datos."
      }
    ],
    "origin": "Klarna es un banco sueco especializado en servicios financieros de pago aplazado (Buy Now, Pay Later) que ha revolucionado el comercio electrónico a nivel mundial. En España opera integrándose en las pasarelas de pago de miles de tiendas, permitiendo dividir compras en tres plazos o financiar importes mayores.",
    "detail": "Su modelo de 'Compra ahora, paga después' fomenta el gasto impulsivo en comercios online, fragmentando pagos que pueden acumularse rápidamente si no se gestionan con cuidado. El problema surge con sus planes de financiación a largo plazo y las penalizaciones por demora, que pueden convertir pequeñas compras en un ciclo de pagos difíciles de liquidar.",
    "intro": "Si las cuotas de tus compras online con Klarna se han convertido en una bola de nieve que no para de crecer, no estás solo ante la pantalla."
  },
  "caixabank-payments": {
    "faqs": [
      {
        "q": "¿Se puede renegociar una deuda con CaixaBank Payments?",
        "a": "Sí, es posible negociar una reducción del importe. En Calma te acompañamos para valorar si tu contrato es nulo por intereses abusivos y proponemos acuerdos para que pagues solo lo que realmente te prestaron."
      },
      {
        "q": "¿Por qué se consideran abusivas algunas de sus tarjetas?",
        "a": "Muchos de sus contratos carecen de la claridad necesaria o aplican intereses que superan los límites del Tribunal Supremo. Si es tu caso, podrías recuperar el exceso de intereses pagados y cancelar la deuda pendiente."
      }
    ],
    "worries": [
      {
        "fear": "Me dicen que si no pago me llevarán a juicio y me quitarán la casa.",
        "reality": "CaixaBank suele preferir la recuperación por vía amistosa o la venta de cartera; un embargo solo ocurre tras un proceso judicial largo y siempre garantizando el mínimo inembargable por ley."
      },
      {
        "fear": "Estar en ASNEF por una tarjeta MyCard me impedirá alquilar o contratar internet.",
        "reality": "Aunque la inclusión en ficheros es una molestia, si existen intereses abusivos podemos impugnar esa deuda y solicitar que te eliminen del registro mientras se resuelve la reclamación."
      }
    ],
    "metaDescription": "¿Debes dinero a CaixaBank Payments? Descubre cómo detener los intereses de tu tarjeta y recuperar tu tranquilidad financiera con el apoyo de Calma.",
    "origin": "CaixaBank Payments & Consumer es la entidad del Grupo CaixaBank que gestiona la financiación al consumo y los medios de pago. Es el resultado de la unión de varias financieras del grupo para centralizar todas las tarjetas de crédito y préstamos rápidos vinculados a compras.",
    "detail": "Esta filial se especializa en la comercialización de tarjetas MyCard y tarjetas de crédito con cuotas fijas que a menudo aplican intereses compuestos, dificultando que el saldo principal disminuya realmente. Muchas de estas tarjetas incluyen opciones de pago aplazado por defecto, lo que genera una bola de nieve de intereses que puede ser reclamable si se considera falta de transparencia o usura.",
    "intro": "Si sientes que tu tarjeta de CaixaBank no deja de crecer aunque pagues cada mes, no es una impresión tuya: es el funcionamiento de su sistema de intereses."
  },
  "santander-consumer": {
    "metaDescription": "¿Deuda con Santander Consumer? Recupera el control de tu economía. Analizamos tus préstamos y tarjetas gratis para reducir tu deuda o cancelarla legalmente.",
    "detail": "Se especializan en la financiación en el punto de venta, permitiéndote comprar muebles o electrodomésticos que acaban vinculados a tarjetas de crédito con intereses elevados. Muchas de las reclamaciones surgen porque lo que parecía un cómodo pago fraccionado se convierte en una deuda eterna debido a sistemas de 'revolving' complejos de entender.",
    "intro": "¿Esa compra financiada que parecía pequeña se ha convertido en una cuota que nunca baja? En Santander Consumer es común sentir que, por mucho que pagas, el saldo pendiente apenas se mueve.",
    "worries": [
      {
        "fear": "Me han dicho que si no pago Santander Consumer pueden embargar mi nómina directamente.",
        "reality": "Nadie puede embargar nada sin una sentencia judicial previa; antes de llegar a eso, hay muchas opciones legales para renegociar o cancelar la deuda."
      },
      {
        "fear": "¿Estaré toda la vida pagando intereses por una tarjeta que ya ni uso?",
        "reality": "Muchas de estas tarjetas tienen intereses que la justicia considera abusivos; si es tu caso, puedes dejar de pagar intereses y recuperar lo pagado de más."
      }
    ],
    "origin": "Santander Consumer Finance es la división del Grupo Santander enfocada en la financiación al consumo y préstamos personales. Opera principalmente a través de acuerdos con establecimientos comerciales (como tiendas de tecnología o concesionarios) para facilitar compras a plazos.",
    "faqs": [
      {
        "a": "Sí, si los intereses de tu tarjeta o préstamo de Santander Consumer son considerados usurarios por la ley, podemos ayudarte a que el contrato sea nulo y solo devuelvas el capital prestado.",
        "q": "¿Puedo reclamar los intereses de una tarjeta que ya he pagado?"
      },
      {
        "a": "Por supuesto, la Ley de la Segunda Oportunidad existe precisamente para situaciones donde, tras imprevistos, el pago mensual a Santander Consumer se vuelve inasumible.",
        "q": "¿Qué pasa si mi cuota de Santander Consumer es más alta de lo que puedo pagar cada mes?"
      }
    ]
  },
  "bankintercard": {
    "worries": [
      {
        "reality": "Nadie puede embargarte sin pasar antes por un proceso judicial prolongado; además, si te acoges a la Ley de Segunda Oportunidad, todos los embargos se paralizan por ley.",
        "fear": "He leído que Bankinter es un banco muy serio y me da miedo que me embarguen la nómina mañana mismo."
      },
      {
        "fear": "Me llaman a todas horas preguntando por mi deuda de Bankintercard y me siento acosado.",
        "reality": "Estas llamadas son tácticas de presión comercial; legalmente tienes derecho a que no te acosen y, una vez delegas tu caso en profesionales, esa comunicación cesa drásticamente."
      }
    ],
    "faqs": [
      {
        "q": "¿Me conviene aceptar la propuesta de quita que me ofrece Bankintercard?",
        "a": "No es una opción recomendada; los acuerdos privados suelen ofrecer rebajas pequeñas a cambio de que renuncies a tu derecho de reclamar judicialmente toda la usura acumulada."
      },
      {
        "q": "¿Puedo dejar de pagar mi tarjeta Bankinter si voy a reclamar?",
        "a": "Sí, es posible paralizar los pagos si se inicia un proceso de reclamación legal o la Ley de Segunda Oportunidad, protegiendo tu economía mientras se resuelve el caso."
      }
    ],
    "detail": "Sus tarjetas Bankintercard se basan en un sistema de pago aplazado donde la cuota mensual apenas cubre los intereses generados, convirtiendo la deuda en algo infinito. La falta de transparencia en la comercialización de este tipo de crédito 'revolving' permite a menudo reclamar la nulidad de los intereses por usura.",
    "intro": "Si sientes que tu tarjeta Bankintercard es un pozo sin fondo donde pagas y pagas pero la deuda no baja, no es una sensación tuya: es el diseño de este tipo de créditos.",
    "metaDescription": "¿Atrapado con Bankintercard o Bankinter Consumer Finance? Descubre cómo cancelar tus intereses por usura o eliminar tu deuda con la Ley de Segunda Oportunidad.",
    "origin": "Bankinter Consumer Finance es la filial del Grupo Bankinter especializada en consumo, que gestiona principalmente tarjetas de crédito y préstamos rápidos. Es la entidad que está detrás de tarjetas tan conocidas como la Bankintercard Oro o las tarjetas de fidelización de grandes marcas."
  },
  "carrefour-pass": {
    "intro": "Llevas meses, quizá años, pagando la Tarjeta PASS Carrefour y al mirar el saldo descubres que apenas ha bajado: cada cuota se va casi entera en intereses. Esa sensación de remar sin avanzar es el sello de las tarjetas revolving, y es exactamente lo que podemos reclamar por ti.",
    "detail": "La Tarjeta PASS ofrece una línea de crédito 'revolving' que permite aplazar las compras en sus hipermercados y otros establecimientos mediante cuotas mensuales reducidas. Estas cuotas suelen generar intereses elevados que se capitalizan, haciendo que la deuda se autoalimente y apenas disminuya a pesar de estar pagando años, lo que motiva frecuentes reclamaciones por falta de transparencia.",
    "origin": "Carrefour PASS es el servicio financiero del gigante de la distribución francés Carrefour, gestionado en España a través de su propia Entidad de Pago Híbrida. Su objetivo es facilitar el consumo mediante la financiación de compras y la concesión de préstamos personales a sus clientes habituales.",
    "faqs": [
      {
        "a": "No, el acoso telefónico tiene límites legales; puedes solicitar el cese de llamadas comerciales y, si la deuda es inasumible, existen vías legales para suspender los pagos de forma ordenada.",
        "q": "¿Es verdad que Carrefour puede llamarme a cualquier hora si me retraso?"
      },
      {
        "a": "Puedes solicitar el cuadro de amortización completo en cualquier atención al cliente de sus centros o por escrito; es tu derecho ver cuánto has pagado realmente y cuánto es interés.",
        "q": "¿Cómo puedo saber cuánto me queda de deuda real si el recibo no baja?"
      }
    ],
    "worries": [
      {
        "fear": "Me da miedo que me demanden y me quiten la nómina por las cuotas impagadas de la tarjeta.",
        "reality": "Antes de un embargo, debe haber un proceso judicial donde un juez analiza si tu contrato tiene cláusulas abusivas; además, por ley, una parte importante de tu salario es inembargable."
      },
      {
        "reality": "La Ley de Segunda Oportunidad permite cancelar legalmente tus deudas y, una vez obtenida la exoneración, tienes el derecho de desaparecer de los ficheros de morosidad.",
        "fear": "Creo que estaré en ASNEF para siempre y nunca más podré pedir financiación."
      }
    ],
    "metaDescription": "¿Atrapado por la Tarjeta PASS Carrefour? Descubre cómo cancelar tu deuda revolving o acogerte a la Ley de Segunda Oportunidad. Recupera tu paz con Calma."
  },
  "alcampo-oney": {
    "origin": "Oney Servicios Financieros es la entidad detrás de la tarjeta de fidelidad de Alcampo, nacida originalmente dentro del grupo francés Auchan. Se especializa en soluciones de pago aplazado y créditos al consumo en grandes superficies y establecimientos asociados.",
    "metaDescription": "¿Debes dinero a la Tarjeta Alcampo (Oney)? Descubre cómo detener los intereses y solucionar tu deuda con calma y asesoramiento legal. Recupera tu tranquilidad hoy.",
    "detail": "La Tarjeta Alcampo opera bajo el modelo Revolving de Oney, donde las cuotas bajas pueden hacer que la mayor parte del pago se destine a intereses y no a reducir el capital. Esto, sumado a seguros de protección de pagos a veces poco claros, puede atrapar al cliente en una deuda que parece no bajar nunca tras sus compras en hipermercados.",
    "intro": "¿Sientes que el ticket de tu tarjeta Alcampo nunca termina de pagarse a pesar de tus esfuerzos mensuales? No es solo una sensación: el sistema de Oney puede convertir una compra cotidiana en una carga financiera de años.",
    "faqs": [
      {
        "a": "Sí, si los intereses aplicados superan los umbrales del Banco de España o si no fuiste debidamente informado de las condiciones del crédito revolving, es posible reducir o anular la deuda.",
        "q": "¿Puedo reclamar los intereses de mi tarjeta Alcampo si ya la he cancelado?"
      },
      {
        "q": "¿Por qué mi deuda con Oney no baja si no dejo de pagar todos los meses?",
        "a": "En Oney es común que el pago mínimo solo cubra intereses; contactar con profesionales para renegociar o acogerte a la Ley de Segunda Oportunidad es el paso definitivo para salir de ese bucle."
      }
    ],
    "worries": [
      {
        "fear": "Me da miedo que Oney me llame al trabajo o llame a mis familiares por el impago de la tarjeta Alcampo.",
        "reality": "La ley protege tu privacidad; el acoso telefónico es denunciable y existen mecanismos legales para detener estas llamadas mientras gestionamos la reestructuración de tu deuda."
      },
      {
        "fear": "¿Pueden embargarme la nómina mañana mismo si dejo de pagar la cuota de Alcampo?",
        "reality": "Ninguna entidad puede embargarte sin un juicio previo y una orden judicial; antes de llegar a eso, tenemos margen para negociar o aplicar la Ley de Segunda Oportunidad."
      }
    ]
  },
  "leroy-merlin-oney": {
    "faqs": [
      {
        "a": "Sí, es posible. Si el contrato tiene intereses que la justicia considera usuarios o falta de transparencia en las condiciones, puedes recuperar lo pagado de más y cancelar la deuda pendiente.",
        "q": "¿Se puede reclamar la tarjeta de Leroy Merlin si ya la he cancelado?埋"
      },
      {
        "a": "Oney suele ofrecer opciones de refinanciación, pero antes de firmar nada, es vital que analicemos si tu contrato actual es reclamable para evitar que reconozcas una deuda que podría ser nula.",
        "q": "¿Qué pasa si no puedo pagar la cuota de este mes a Oney?"
      }
    ],
    "metaDescription": "¿Agobiado por la deuda de tu tarjeta Leroy Merlin (Oney)? Descubre cómo reducir lo que debes o cancelar tus intereses legalmente y recupera tu tranquilidad.",
    "worries": [
      {
        "reality": "Aunque el impago conlleva el riesgo de inclusión en ficheros, si iniciamos una reclamación por intereses abusivos o nos acogemos a la Ley de Segunda Oportunidad, existen mecanismos legales para paralizar el acoso y limpiar tu historial crediticio.",
        "fear": "Me van a meter en ASNEF y no podré pedir ni un préstamo para el coche."
      },
      {
        "fear": "He leído que Oney es muy insistente con las llamadas de recobro.",
        "reality": "Es cierto que son activos en recobros, pero la ley prohíbe el acoso; una vez que un profesional gestiona tu caso, esa presión cesa y la negociación pasa a manos expertas para proteger tu descanso."
      }
    ],
    "origin": "La tarjeta Leroy Merlin es gestionada por Oney Servicios Financieros, una entidad de origen francés especializada en crédito al consumo y soluciones de pago aplazado. Opera en España como uno de los principales aliados de grandes superficies para facilitar la financiación rápida a sus clientes.",
    "detail": "Esta tarjeta permite financiar compras en Leroy Merlin mediante la modalidad de pago aplazado (revolving), lo que a menudo genera una espiral de intereses donde la cuota mensual apenas cubre los honorarios generados. Muchos usuarios se encuentran atrapados en una deuda que parece no bajar nunca debido a la acumulación de intereses que se refinancian mes a mes.",
    "intro": "¿Sientes que por más que pagas tu tarjeta de Leroy Merlin el saldo pendiente apenas baja? No estás solo: el sistema de intereses de Oney puede convertir una reforma del hogar en una carga financiera de años."
  },
  "ikea-cetelem": {
    "intro": "¿Esa reforma en casa con la Tarjeta IKEA se ha convertido en una cuota mensual que nunca termina de bajar? No importa cuánto pagues, sentir que la deuda con Cetelem no se mueve es más común de lo que crees.",
    "worries": [
      {
        "fear": "Me da pánico que llamen a mis referencias personales o familiares para reclamar mi deuda de IKEA.",
        "reality": "La Ley de Protección de Datos prohíbe informar a terceros sobre tu situación de impago; estas llamadas suelen ser técnicas de presión que podemos frenar legalmente."
      },
      {
        "fear": "He pagado más de lo que gasté en muebles y sigo debiendo casi lo mismo.",
        "reality": "Esto ocurre por el sistema 'revolving' de Cetelem; si los intereses son abusivos, un juez puede anular el contrato y obligarles a devolverte todo lo que exceda el dinero prestado."
      }
    ],
    "origin": "La Tarjeta IKEA VISA es un producto financiero emitido por Banco Cetelem S.A.U., una de las entidades de crédito al consumo más grandes de Europa perteneciente al Grupo BNP Paribas. En España, Cetelem gestiona la financiación directa de clientes de IKEA a través de esta tarjeta de crédito y préstamos específicos.",
    "metaDescription": "¿Atrapado con los intereses de tu Tarjeta IKEA VISA de Cetelem? Descubre cómo dejar de pagar cuotas eternas y recuperar tu tranquilidad hoy mismo.",
    "faqs": [
      {
        "q": "¿Se puede reclamar el seguro de protección de pagos de la Tarjeta IKEA?",
        "a": "Sí, siempre que los intereses aplicados sean superiores a la media de las tarjetas revolving en la fecha del contrato, es posible recuperar lo pagado de más mediante una reclamación por usura."
      },
      {
        "q": "¿Puedo acogerme a la Ley de Segunda Oportunidad si mi mayor deuda es con la Tarjeta IKEA?",
        "a": "Por supuesto. Si tienes varios préstamos con Cetelem u otras entidades y no puedes pagarlos, la Ley de Segunda Oportunidad permite agruparlos y cancelarlos si cumples los requisitos legales."
      }
    ],
    "detail": "Esta tarjeta permite financiar las compras en la famosa cadena de muebles, aportando flexibilidad pero aplicando tipos de interés que a menudo rozan o superan los límites de la usura. Al funcionar bajo el sistema revolving, el cliente paga una cuota baja mientras los intereses se acumulan, haciendo que la deuda se perpetúe e impidiendo que el capital principal baje realmente."
  },
  "mediamarkt-card": {
    "faqs": [
      {
        "q": "¿Se pueden reclamar los intereses de la tarjeta MediaMarkt? Barbacoa",
        "a": "Sí, si los intereses aplicados superan los niveles permitidos por la jurisprudencia española, puedes reclamar la nulidad del contrato para devolver solo el capital prestado."
      },
      {
        "q": "¿Qué pasa si no puedo pagar la cuota este mes?",
        "a": "Si has dejado de pagar, es posible que el establecimiento bloquee tu línea de crédito, pero existen mecanismos legales para negociar o incluso cancelar la deuda si cumples ciertos requisitos."
      }
    ],
    "worries": [
      {
        "reality": "No, la entidad no va a entrar en tu casa a por el producto; lo que existe es una deuda dineraria que se puede renegociar o cancelar legalmente sin perder tus pertenencias personales.",
        "fear": "¿Me van a quitar el ordenador o el móvil que compré si dejo de pagar la tarjeta?"
      },
      {
        "reality": "Esto ocurre por el efecto 'revolving' de los intereses; la buena noticia es que muchos de estos contratos son reclamables por falta de transparencia o usura, permitiéndote recuperar lo pagado de más.",
        "fear": "He pagado ya el doble de lo que costaba el producto y sigo debiendo dinero."
      }
    ],
    "intro": "¿Esa televisión o móvil que compraste con la tarjeta de MediaMarkt se ha convertido en una deuda que nunca termina de bajar? No te preocupes, es una situación mucho más común de lo que crees y tiene una solución legal clara.",
    "origin": "La tarjeta MediaMarkt Club Card es un producto financiero gestionado habitualmente a través de entidades como CaixaBank Payments & Consumer. Su objetivo es facilitar el consumo inmediato mediante líneas de crédito revolvente y financiación en el punto de venta.",
    "detail": "La MediaMarkt Club Card suele ofrecerse en el momento de la compra para financiar tecnología, pero su modo de pago aplazado (revolving) a menudo genera intereses elevados que hacen que la deuda apenas disminuya. Muchos usuarios se encuentran atrapados en cuotas mensuales bajas que cubren principalmente intereses, alargando el pago del dispositivo mucho más de lo previsto.",
    "metaDescription": "¿Agobiado por la deuda de tu MediaMarkt Club Card? Descubre cómo reducir tus pagos o cancelar tus intereses abusivos con la ayuda experta de Calma."
  },
  "fnac-card": {
    "detail": "La Tarjeta FNAC, gestionada por CaixaBank Consumer Finance, suele aplicar intereses elevados en su modalidad de pago aplazado o 'revolving'. Los usuarios a menudo descubren que, tras años pagando cuotas mensuales, el capital apenas disminuye debido a la acumulación de intereses y comisiones por reclamación de cuotas impagadas.",
    "origin": "La Tarjeta FNAC es un producto de fidelización comercial emitido actualmente a través de CaixaBank Payments & Consumer. Aunque nació para ofrecer ventajas en tecnología y cultura, funciona como un crédito revolving que permite aplazar compras en la tienda y fuera de ella.",
    "metaDescription": "¿Deuda con tu Tarjeta FNAC? Descubre cómo reducir lo que debes o cancelar tus intereses. En Calma te ayudamos a recuperar tu tranquilidad financiera.",
    "faqs": [
      {
        "q": "¿Puedo reclamar los intereses de mi tarjeta FNAC si ya la he cancelado?业务",
        "a": "Sí, es posible. Si el contrato tiene intereses que la justicia considera usurarios o falta de transparencia, se puede anular el contrato y recuperar todo lo pagado que supere el capital prestado."
      },
      {
        "a": "Absolutamente. Si no puedes hacer frente a los pagos, la Ley de Segunda Oportunidad permite paralizar embargos y, si se cumplen los requisitos, cancelar legalmente estas deudas.",
        "q": "¿Cómo puedo dejar de pagar la tarjeta FNAC sin que me lleven a juicio?"
      }
    ],
    "intro": "¿Sientes que tu Tarjeta FNAC nunca se termina de pagar a pesar de haber liquidado tus compras hace tiempo? No eres el único que se siente atrapado en una deuda que parece no tener fin.",
    "worries": [
      {
        "reality": "Nadie puede retirarte tus bienes de inmediato; para que exista un embargo, debe haber un proceso judicial largo donde tú siempre tienes derecho a defenderte y negociar.",
        "fear": "Me van a quitar el ordenador o los libros que compré con la tarjeta si no pago."
      },
      {
        "reality": "Esto ocurre porque tu cuota se destina casi íntegramente a intereses; legalmente, si el interés es abusivo, podrías recuperar el exceso y quedar libre de deuda.",
        "fear": "He pagado mucho más de lo que gasté y la deuda sigue igual."
      }
    ]
  },
  "ae-card": {
    "intro": "Si el prestigio de tu tarjeta American Express se ha convertido en una carga financiera insoportable, es momento de recuperar el control sin perder la tranquilidad.",
    "detail": "American Express se caracteriza por ofrecer límites de crédito elevados y opciones de 'pago aplazado' que pueden derivar en intereses compuestos difíciles de liquidar. Muchos usuarios entran en una espiral de deuda al utilizar la modalidad revolving para financiar compras grandes o al no poder cubrir el saldo total de la modalidad 'Card' a final de mes.",
    "metaDescription": "¿Agobiado por las cuotas de American Express? Descubre cómo gestionar tu deuda, reclamar intereses o acogerte a la Ley de Segunda Oportunidad con Calma.",
    "faqs": [
      {
        "a": "Sí, siempre que cumplas los requisitos de insolvencia y buena fe, esta ley permite cancelar el saldo pendiente con American Express si no puedes pagarlo.",
        "q": "¿Puedo acogerme a la Ley de Segunda Oportunidad si mi deuda es con American Express?"
      },
      {
        "a": "Es muy probable; muchas de sus condiciones de pago aplazado han sido revisadas por tribunales al presentar intereses que superan la media del mercado para este tipo de productos.",
        "q": "¿Es posible que mi tarjeta de American Express tenga intereses abusivos?"
      }
    ],
    "origin": "American Express es una institución financiera con sede en Estados Unidos y una presencia consolidada en España como emisor de tarjetas de crédito y servicios de viaje. A diferencia de un banco tradicional, se centra en productos de pago premium y servicios financieros para particulares y empresas.",
    "worries": [
      {
        "reality": "Nadie puede embargarte sin una sentencia judicial previa; American Express tiene protocolos de recobro, pero existen mecanismos legales para proteger tus ingresos mínimos.",
        "fear": "¿Me pueden quitar mis bienes por una deuda con American Express?"
      },
      {
        "reality": "La ley protege tu privacidad; las entidades no pueden acosarte ni informar a terceros sobre tu deuda, y tú tienes derecho a solicitar que el contacto sea solo por canales oficiales.",
        "fear": "Tengo miedo de que su departamento de recobros presione a mi entorno."
      }
    ]
  },
  "ing-credit-card": {
    "intro": "Si sientes que tu deuda con el 'banco naranja' nunca baja a pesar de ser responsable con tus pagos, no estás solo: el sistema de pago aplazado de ING puede convertirse en una espiral difícil de gestionar.",
    "metaDescription": "¿Tu deuda con el pago aplazado de ING no para de crecer? Descubre cómo gestionar tus pagos, reclamar intereses y recuperar tu tranquilidad financiera con Calma.",
    "detail": "ING ofrece opciones de pago aplazado y tarjetas de crédito donde los intereses acumulados pueden hacer que la deuda no baje a pesar de cumplir con las cuotas. Muchas reclamaciones se centran en la falta de transparencia sobre el coste real de aplazar compras y en intereses que superan la media del mercado para este tipo de créditos al consumo.",
    "origin": "ING es una entidad bancaria de origen neerlandés con una fuerte presencia en España, conocida por ser pionera en la banca digital. Aunque se asocia con el ahorro, sus productos de pago aplazado y tarjetas de crédito funcionan bajo mecanismos de intereses que pueden atrapar a sus usuarios en deudas de larga duración.",
    "worries": [
      {
        "fear": "Me da miedo que ING me incluya en ficheros de morosos como ASNEF si dejo de pagar una cuota abusiva.",
        "reality": "Aunque pueden iniciar el proceso, si la deuda está siendo reclamada judicialmente por intereses usurarios, tienes argumentos legales para impedir o cancelar dicha inclusión."
      },
      {
        "reality": "No, ningún banco puede embargarte sin una sentencia judicial previa; además, siempre existen límites legales que protegen el Salario Mínimo Interprofesional para que puedas seguir viviendo.",
        "fear": "¿Pueden embargarme la nómina directamente si no puedo pagar las cuotas del pago aplazado?"
      }
    ],
    "faqs": [
      {
        "a": "Puedes solicitar el cuadro de amortización directamente desde tu área de cliente o por atención al cliente; es tu derecho saber cuánto de lo que pagas son intereses y cuánto capital real.",
        "q": "¿Cómo puedo saber cuánto me queda realmente por pagar de mi deuda con ING?"
      },
      {
        "a": "Sí, la Ley de la Segunda Oportunidad permite agrupar o incluso exonerar estas deudas si tu situación económica te impide hacer frente a los pagos mensuales.",
        "q": "¿Es posible cancelar mi deuda con ING si los intereses no me dejan avanzar?"
      }
    ]
  },
  "bbva-aqua": {
    "origin": "BBVA es una de las mayores entidades financieras de España, con una larga trayectoria en banca tradicional y digital. La gama Aqua es su apuesta más reciente por la seguridad digital, ofreciendo opciones de crédito flexible y pago aplazado a millones de clientes.",
    "intro": "Si el pago fraccionado de tu tarjeta BBVA Aqua ha pasado de ser una comodidad a una carga imposible de liquidar, no estás solo en esto.",
    "metaDescription": "¿Sientes que tu deuda con BBVA Aqua no deja de crecer? Descubre cómo gestionar tus pagos fraccionados y recuperar el control de tu economía con Calma.",
    "faqs": [
      {
        "q": "¿Puedo reclamar los intereses de mi tarjeta BBVA Aqua si son demasiado altos?",
        "a": "Sí, es posible negociar una reducción o incluso la eliminación de intereses si se demuestra que el contrato no era transparente, permitiéndote devolver solo el capital prestado."
      },
      {
        "q": "¿Es normal sentir que mi deuda con BBVA Aqua nunca baja aunque pague cada mes?",
        "a": "En absoluto. Si la deuda se ha vuelto inasumible, existen mecanismos legales como la Ley de Segunda Oportunidad para agrupar o cancelar tus deudas y recuperar tu tranquilidad."
      }
    ],
    "detail": "Esta tarjeta destaca por prescindir de números impresos para aumentar la seguridad, pero su facilidad para 'fraccionar compras' desde la app puede derivar en un bucle de intereses. Al activar el pago aplazado, las cuotas mensuales pueden cubrir apenas los intereses generados, haciendo que la deuda principal apenas disminuya mes tras mes.",
    "worries": [
      {
        "reality": "Aunque la entidad puede reclamar el impago, no pueden embargar tus ingresos directamente sin una orden judicial, y siempre existen límites legales que protegen tu salario mínimo.",
        "fear": "Me da miedo que BBVA me bloquee todas mis cuentas si dejo de pagar la cuota de la tarjeta Aqua."
      },
      {
        "fear": "He activado el pago fraccionado tantas veces que ya no sé cuánto debo ni cuándo terminaré de pagar.",
        "reality": "Esa sensación de 'deuda eterna' es común en los créditos revolving; la buena noticia es que legalmente puedes solicitar un cuadro de amortización claro y buscar soluciones para cerrar esa deuda de forma definitiva."
      }
    ]
  },
  "openbank-card": {
    "metaDescription": "¿Debes dinero a Openbank por pago aplazado? Descubre cómo gestionar tu deuda, reclamar intereses abusivos y recuperar tu tranquilidad financiera con Calma.",
    "faqs": [
      {
        "a": "Sí, si los intereses aplicados superan los umbrales establecidos por el Tribunal Supremo para créditos revolving, es posible reclamar la nulidad de las cláusulas y recuperar el exceso pagado.",
        "q": "¿Se pueden reclamar los intereses del pago aplazado de Openbank? Barbieri?"
      },
      {
        "a": "Openbank es una entidad que suele estar abierta a la negociación; nuestro equipo puede mediar para buscar una reestructuración o acogerte a la Ley de Segunda Oportunidad si cumples los requisitos.",
        "q": "¿Qué pasa si no puedo pagar mi tarjeta de Openbank este mes?"
      }
    ],
    "worries": [
      {
        "reality": "Aunque es un paso habitual tras varios impagos, estar en ASNEF no es una sentencia definitiva; existen mecanismos legales para salir y negociar la deuda de forma global.",
        "fear": "Tengo miedo de que Openbank me incluya en ficheros de morosos como ASNEF."
      },
      {
        "reality": "Openbank no puede embargarte directamente; para ello se requiere un proceso judicial previo donde siempre tienes derecho a defenderte y oponerte a los intereses desproporcionados.",
        "fear": "Siento que el Grupo Santander podría embargarme la nómina rápidamente."
      }
    ],
    "detail": "Openbank fomenta el uso del pago aplazado en sus tarjetas de crédito y el fraccionamiento de compras mediante el sistema 'Buy Now, Pay Later'. Estas modalidades suelen aplicar intereses revolventes que pueden hacer que la deuda no disminuya a pesar de pagar las cuotas mensuales, generando una situación de bloqueo financiero para el cliente.",
    "origin": "Openbank es el banco 100% digital del Grupo Santander, operando de forma independiente con un enfoque en la banca online y servicios financieros ágiles. Aunque nació como una entidad joven y moderna, sus productos de financiación siguen la lógica de los créditos al consumo y tarjetas con modalidades de pago flexible.",
    "intro": "Si te sientes atrapado por los intereses del pago aplazado de tu tarjeta Openbank, recuerda que no estás solo y que tu situación tiene una salida legal clara."
  },
  "tarjeta-you": {
    "metaDescription": "¿Agobiado por los intereses de la Tarjeta YOU? Descubre cómo reducir tu deuda, reclamar intereses abusivos y recuperar la calma con asesoramiento experto.",
    "detail": "La Tarjeta YOU, emitida por Advanzia Bank, se caracteriza por no exigir cambiar de banco, lo que facilita un uso descontrolado del crédito revolving. El problema surge con sus altos intereses y el sistema de pago fraccionado, donde las cuotas mensuales apenas cubren los intereses generados, haciendo que la deuda se vuelva eterna a pesar de los pagos regulares.",
    "origin": "La Tarjeta YOU es un producto financiero de Advanzia Bank, una entidad bancaria digital con sede en Luxemburgo que opera en toda Europa. Se introdujo en el mercado español como una tarjeta de crédito sin comisiones de emisión, pero basada en un modelo de ingresos por intereses de pago aplazado.",
    "intro": "¿Sientes que el saldo de tu Tarjeta YOU nunca baja por mucho que te esfuerces en pagar cada mes? No eres el único atrapado en esta espiral, pero hoy es el día en que recuperas el control de tu tranquilidad financiera.",
    "worries": [
      {
        "fear": "Me da miedo que Advanzia Bank me demande al ser un banco extranjero y me quiten todo lo que tengo.",
        "reality": "Aunque tengan sede en Luxemburgo, deben cumplir las leyes españolas y la Ley de Segunda Oportunidad; nunca te quitarán lo básico para vivir y siempre se puede negociar antes de llegar a ese punto."
      },
      {
        "fear": "He leído que los intereses de la Tarjeta YOU son legales y no podré recuperar mi dinero nunca.",
        "reality": "Muchos contratos de este tipo han sido anulados por el Tribunal Supremo por falta de transparencia o usura; un análisis profesional de tu contrato específico puede revelar que te deben dinero a ti."
      }
    ],
    "faqs": [
      {
        "q": "¿Puedo reclamar los intereses de mi Tarjeta YOU si ya la he cancelado?",
        "a": "Sí, es totalmente posible. Si el contrato tiene intereses abusivos o falta de transparencia, se puede reclamar la nulidad de las cláusulas y recuperar el dinero pagado de más que exceda el capital prestado."
      },
      {
        "a": "Si dejas de pagar, empezarán a aplicar comisiones por demora y podrías acabar en ficheros como ASNEF, pero recuerda que existen mecanismos legales para negociar o cancelar la deuda si no puedes afrontarla.",
        "q": "¿Qué pasa si no puedo pagar la cuota este mes?"
      }
    ]
  },
  "creditis-card": {
    "origin": "Créditis es una marca financiera especializada en soluciones de consumo y tarjetas de crédito de pago aplazado en el mercado español. Se centra en ofrecer financiación rápida y flexible, aunque sus condiciones suelen vincularse a intereses más elevados que los préstamos tradicionales.",
    "intro": "Si sientes que los pagos a tu tarjeta Créditis se han convertido en un pozo sin fondo donde tu deuda no baja nunca, no estás solo y, sobre todo, tienes derechos legales para frenarlo.",
    "detail": "Esta entidad comercializa principalmente tarjetas con modalidad de pago aplazado que, debido a la capitalización de intereses, pueden hacer que la deuda apenas disminuya a pesar de las cuotas mensuales. Estas condiciones suelen permitir reclamaciones por falta de transparencia en la contratación o por la aplicación de intereses que el Tribunal Supremo ha considerado abusivos en productos similares.",
    "metaDescription": "¿Atrapado por tu tarjeta Créditis? Descubre cómo reducir tu deuda, reclamar intereses abusivos y recuperar la tranquilidad financiera con la ayuda de Calma.",
    "worries": [
      {
        "reality": "Antes de cualquier embargo, debe haber un juicio donde tú puedes defenderte alegando intereses abusivos, lo cual suele paralizar o reducir drásticamente la cantidad reclamada.",
        "fear": "Tengo miedo de que Créditis me demande y me quiten la nómina por no poder pagar las cuotas."
      },
      {
        "fear": "Me agobia que me llamen constantemente y que mi nombre acabe en una lista de morosos para siempre.",
        "reality": "Si la deuda se debe a intereses injustos, existen mecanismos legales para solicitar su nulidad y salir de ficheros como ASNEF una vez se resuelve la situación de abuso."
      }
    ],
    "faqs": [
      {
        "q": "¿Se puede cancelar la deuda con Créditis si los intereses son muy altos?",
        "a": "Sí, es posible negociar una reducción del total o incluso la anulación de los intereses mediante una reclamación por falta de transparencia o usura, permitiéndote pagar solo lo que realmente te prestaron."
      },
      {
        "q": "¿Cómo sé si mi tarjeta Créditis es de tipo revolving?",
        "a": "Lo ideal es revisar tu contrato actual; si tu tarjeta funciona mediante el sistema de 'pago mínimo' constante, es muy probable que estés ante un crédito revolving reclamable por ley."
      }
    ]
  },
  "union-financiera-asturiana": {
    "intro": "Si las cuotas de Unión Financiera Asturiana te impiden llegar a fin de mes, no estás solo: muchas personas se ven atrapadas en financiaciones de consumo que parecen no terminar nunca.",
    "origin": "Unión Financiera Asturiana es una entidad financiera de crédito (EFC) con décadas de trayectoria en España, especializada en ofrecer préstamos rápidos y financiación en puntos de venta. Aunque tiene su sede histórica en Asturias, opera a nivel nacional financiando compras en diversos sectores comerciales.",
    "faqs": [
      {
        "a": "Sí, siempre que se demuestre que los intereses eran desproporcionados o que no hubo transparencia en la firma; el equipo de expertos de Calma puede analizar tu contrato para ver si es viable.",
        "q": "¿Se pueden reclamar los intereses de un préstamo de Unión Financiera Asturiana?"
      },
      {
        "a": "No te preocupes, es una práctica común para presionar el cobro, pero existen mecanismos legales como la Ley de la Segunda Oportunidad para frenar estos procesos y proteger tu patrimonio.",
        "q": "Me han enviado una notificación de juicio monitorio, ¿qué debo hacer?"
      }
    ],
    "worries": [
      {
        "reality": "Nadie puede embargarte de forma inmediata; para ello debe existir una sentencia judicial previa y, además, existen leyes que protegen el Salario Mínimo Interprofesional para que siempre tengas lo necesario para vivir.",
        "fear": "¿Pueden quitarme el coche o la nómina si no pago a Unión Financiera Asturiana?"
      },
      {
        "fear": "Me llaman a todas horas y me amenazan con incluirme en una lista de morosos.",
        "reality": "Aunque las llamadas de recobro son molestas, existen límites legales contra el acoso y, si te acoges a la Ley de Segunda Oportunidad, esas llamadas deben cesar por ley."
      }
    ],
    "metaDescription": "¿Agobiado por deudas con Unión Financiera Asturiana? Descubre cómo reducir tus cuotas o cancelar tus deudas legalmente con Calma. Recupera tu tranquilidad hoy.",
    "detail": "Su modelo de negocio se basa en la financiación de consumo en establecimientos, especialmente en sectores como el dental o el equipamiento del hogar, donde las cláusulas de pago aplazado pueden elevar drásticamente el coste final del préstamo. Esto genera a menudo deudas difícilmente asumibles porque los intereses se acumulan sobre el capital pendiente, convirtiendo una compra cotidiana en una carga financiera de años."
  },
  "evo-card": {
    "worries": [
      {
        "reality": "Si existe una disputa legal por intereses abusivos, puedes impugnar tu inclusión en ficheros de morosidad mientras se resuelve el caso.",
        "fear": "Tengo miedo de que EVO me incluya en ASNEF y no pueda pedir nunca más un préstamo."
      },
      {
        "fear": "Me asusta que Bankinter o EVO emprendan acciones legales contra mi casa por las cuotas impagadas de la tarjeta.",
        "reality": "Para deudas de tarjetas de crédito, es extremadamente raro llegar a un embargo de vivienda; antes existen fases de negociación y defensa legal donde podemos protegerte."
      }
    ],
    "intro": "Si sientes que tu tarjeta de EVO Banco se ha convertido en una cuenta sin fondo donde los intereses devoran tus pagos, no estás solo. Sabemos lo frustrante que es ver que tu esfuerzo mensual no reduce la deuda, pero hay mecanismos legales para recuperar el control.",
    "faqs": [
      {
        "q": "¿Puedo reclamar a EVO si ya cancelé mi tarjeta inteligente?",
        "a": "Sí, es posible recuperar los intereses si el contrato se considera abusivo, incluso si ya has terminado de pagar la tarjeta o el préstamo hace tiempo."
      },
      {
        "a": "La Ley de la Segunda Oportunidad es una vía legal para cancelar las deudas de EVO y otros bancos si no puedes afrontarlas, protegiendo tus bienes básicos y tu tranquilidad.",
        "q": "¿Qué pasa si mi deuda con EVO es tan alta que no puedo pagar ni el mínimo?"
      }
    ],
    "detail": "Sus tarjetas y líneas de crédito flexible permiten aplazar compras de forma automática, pero los intereses acumulados a menudo hacen que la deuda apenas disminuya a pesar de pagar las cuotas mensuales. En muchos casos, estos contratos incluyen cláusulas de intereses que la justicia española ha considerado desproporcionados, permitiendo reclamar la devolución de lo pagado de más.",
    "origin": "EVO Banco nació como una alternativa digital y moderna en el sector bancario español, actualmente integrada dentro del grupo Bankinter. Se especializa en productos de banca diaria y financiación al consumo, destacando por su 'Tarjeta Inteligente' que combina débito y crédito en un solo soporte.",
    "metaDescription": "¿Atrapado por los intereses de EVO Banco? Descubre cómo reclamar tu tarjeta de pago aplazado y eliminar tus deudas con la Ley de Segunda Oportunidad. Recupera la calma."
  },
  "imagin-card": {
    "origin": "imagin, perteneciente al Grupo CaixaBank, nació como la primera plataforma financiera solo para móviles en España, orientada principalmente a un público joven y digital. Ofrece servicios financieros ágiles que permiten gestionar cuentas, tarjetas y opciones de financiación flexible directamente desde su app oficial.",
    "metaDescription": "¿Debes dinero a imagin (Pago a plazos)? Descubre cómo gestionar tu deuda, reclamar intereses y recuperar la calma con soluciones legales a tu medida.",
    "intro": "Si el \"divide y vencerás\" de tus compras con imagin se ha convertido en una bola de nieve difícil de frenar, no estás solo: hay formas legales de recuperar el control de tu cuenta bancaria.",
    "faqs": [
      {
        "a": "Sí, es posible negociar una reducción o incluso la cancelación de intereses si se demuestra que el contrato no fue transparente o los intereses son excesivos según la ley.",
        "q": "¿Puedo reclamar los intereses de mi tarjeta de crédito imagin?"
      },
      {
        "a": "No te preocupes, si tu situación económica ha cambiado, puedes acogerte a la Ley de Segunda Oportunidad para agrupar todas tus deudas o buscar una exoneración legal.",
        "q": "¿Qué pasa si no puedo pagar las cuotas de mi 'imagin & Buy'?"
      }
    ],
    "worries": [
      {
        "fear": "Me da miedo que, al ser una app tan moderna, me bloqueen la cuenta o me presionen por el móvil constantemente.",
        "reality": "Aunque la gestión sea digital, tus derechos son los mismos que con un banco tradicional; no pueden realizar acoso telefónico y existen límites legales para el recobro."
      },
      {
        "fear": "Siento que nunca termino de pagar mi compra a plazos porque los intereses se comen mi cuota mensual.",
        "reality": "Esto sucede a menudo con el sistema revolving; legalmente, si la carga de intereses es desproporcionada, podrías quedar liberado de pagar los intereses y devolver solo el capital prestado."
      }
    ],
    "detail": "imagin permite fraccionar compras y pagos a través de sus tarjetas de crédito y el servicio 'imagin & Buy', donde los intereses pueden acumularse rápidamente si se abusa del pago mínimo. Muchas de las reclamaciones surgen por la falta de transparencia en el coste total de las compras aplazadas y los intereses que acaban convirtiendo una compra pequeña en una deuda a largo plazo."
  },
  "repsol-mastercard": {
    "intro": "Si tu tarjeta Repsol Mastercard ha pasado de ser una ayuda para ahorrar en carburante a convertirse en una factura que no deja de crecer, no estás solo en esto.",
    "metaDescription": "¿Agobiado por la deuda de tu Repsol Mastercard? Descubre cómo reducir lo que debes o cancelar tus deudas legalmente. Recupera tu tranquilidad con Calma.",
    "detail": "Esta tarjeta suele aplicar el sistema revolving en su modalidad de pago aplazado, lo que genera intereses compuestos que se acumulan mes tras mes sobre el capital pendiente. Las reclamaciones suelen centrarse en la falta de transparencia del contrato y en tipos de interés que, en muchos casos, han sido considerados desproporcionados por la jurisprudencia española.",
    "faqs": [
      {
        "a": "Sí, es posible reclamar tanto si la tarjeta sigue activa como si ya la has cancelado, siempre que se demuestre que hubo falta de transparencia o intereses abusivos.",
        "q": "¿Puedo reclamar mi tarjeta Repsol Mastercard si ya la he liquidado?"
      },
      {
        "q": "¿Qué pasa si no puedo pagar la cuota este mes?",
        "a": "Si la deuda es inasumible y tienes más acreedores, la Ley de Segunda Oportunidad permite cancelar legalmente tus deudas; si solo es esta tarjeta, una reclamación por intereses abusivos podría reducir drásticamente lo que debes."
      }
    ],
    "worries": [
      {
        "reality": "Esto ocurre porque gran parte de tu cuota se destina a pagar solo los intereses revolving; legalmente se puede revisar tu contrato para recalcular la deuda real sin esos intereses.",
        "fear": "Siento que por mucho que pago cada mes, el saldo de mi tarjeta Repsol apenas baja."
      },
      {
        "reality": "No, nadie puede embargarte sin un proceso judicial previo y una sentencia de un juez; antes de llegar a eso, tienes opciones legales para negociar o acogerte a la Ley de Segunda Oportunidad.",
        "fear": "¿Pueden embargarme la nómina mañana mismo si dejo de pagar la tarjeta?"
      }
    ],
    "origin": "La tarjeta Repsol Mastercard es un producto financiero emitido habitualmente a través de acuerdos con entidades bancarias como BBVA o WiZink. Está diseñada como un método de pago vinculado a beneficios en estaciones de servicio, pero funciona bajo una línea de crédito que permite el pago fraccionado."
  },
  "cepsa-starresa": {
    "intro": "¿Tu tarjeta Cepsa StarRessa se ha convertido en una carga pesada cada vez que vas a la gasolinera? Es frustrante sentir que el ahorro en combustible se esfuma debido a unos intereses que nunca dejan de crecer.",
    "detail": "Esta tarjeta funciona permitiendo el pago aplazado de carburante y servicios, aplicando en muchos casos tipos de interés que pueden considerarse abusivos debido a su carácter revolving. La complejidad de sus liquidaciones suele derivar en una 'deuda infinita' donde, a pesar de usar los descuentos en combustible, los intereses devoran los pagos mensuales del cliente.",
    "metaDescription": "¿Agobiado por la deuda de tu tarjeta Cepsa StarRessa? Descubre cómo cancelar intereses abusivos y recuperar tu tranquilidad financiera con el equipo de Calma.",
    "faqs": [
      {
        "a": "Sí, muchas de estas tarjetas incluyen cláusulas de intereses falta de transparencia. Podemos analizar tu contrato para reclamar la nulidad de esos intereses y reducir el saldo pendiente.",
        "q": "¿Se pueden reclamar los intereses de la tarjeta Cepsa StarRessa? Pachá?"
      },
      {
        "a": "No necesariamente. Si los intereses son declarados usurarios, el contrato se anula y solo tendrías que devolver el capital prestado sin intereses ni comisiones añadidas.",
        "q": "¿Si reclamo la tarjeta StarRessa tendré que pagar una indemnización a la entidad?"
      }
    ],
    "worries": [
      {
        "reality": "Aunque la tarjeta pudiera cancelarse tras la reclamación, el ahorro de eliminar los intereses abusivos suele ser muy superior al beneficio de los descuentos que ofrece en el surtidor. Pachá?",
        "fear": "Me da miedo que me quiten la tarjeta y no poder echar gasolina si reclamo."
      },
      {
        "reality": "Esto ocurre porque la modalidad revolving prioriza el pago de intereses sobre el capital; legalmente, podemos impugnar ese sistema para que tus cuotas realmente liquiden lo que debes.",
        "fear": "Siento que la deuda no baja a pesar de que cada mes pago mi cuota religiosamente."
      }
    ],
    "origin": "Comercializada originalmente bajo el paraguas de servicios para la movilidad de la petrolera Cepsa, esta tarjeta está gestionada o financiada por entidades bancarias especializadas en crédito al consumo. Su objetivo principal es ofrecer descuentos y facilidades de pago en la red de estaciones de servicio Cepsa tanto para profesionales como para particulares."
  },
  "santander": {
    "origin": "Banco Santander es una de las mayores entidades financieras del mundo, con origen en Cantabria y una presencia masiva en toda la red bancaria española. Operan principalmente a través de banca comercial para particulares, pymes y grandes empresas, siendo el acreedor principal de miles de familias en España.",
    "metaDescription": "¿Debes dinero al Banco Santander y no sabes cómo salir? Descubre cómo gestionar tus deudas, evitar el acoso y recuperar tu tranquilidad financiera hoy mismo.",
    "detail": "Banco Santander comercializa una amplia gama de productos que van desde préstamos personales y tarjetas de crédito hasta hipotecas y líneas de crédito para autónomos. Muchos usuarios acuden a nosotros porque, tras años pagando cuotas con intereses que se acumulan o tras un bache económico, ven cómo el pago de los intereses revolving o las comisiones por descubierto les impide reducir el capital principal de su deuda.",
    "intro": "Si el Banco Santander ha pasado de ser tu banco de confianza a una fuente constante de estrés por las cuotas que no dejan de subir, respira: no eres el único y tiene solución legal.",
    "faqs": [
      {
        "a": "Por supuesto. Si tienes tarjetas, préstamos o hipotecas con ellos y no puedes afrontarlos, el primer paso es analizar si existen cláusulas abusivas o si cumples los requisitos para acogerte a la Ley de Segunda Oportunidad para cancelar legalmente lo que no puedas pagar.",
        "q": "¿Es posible renegociar o cancelar mi deuda con Banco Santander?"
      },
      {
        "a": "Generalmente recibiras llamadas de su departamento de recobro o de empresas externas autorizadas. No te asustes: estas llamadas tienen un límite legal y no pueden acosarte; además, el embargo solo puede dictaminarlo un juez tras un proceso largo donde tú tendrás derecho a defenderte.",
        "q": "¿Qué pasa si Santander empieza a llamarme por falta de pago?"
      }
    ],
    "worries": [
      {
        "fear": "Siento que el Santander es demasiado grande y me va a embargar la nómina mañana mismo.",
        "reality": "Nadie, ni siquiera un banco tan grande, puede embargarte directamente sin pasar antes por un proceso judicial que lleva meses. Además, la ley protege una parte mínima de tu salario para que puedas seguir viviendo dignamente."
      },
      {
        "fear": "Me da miedo que me metan en ASNEF y nunca más pueda pedir financiación.",
        "reality": "Estar en un fichero de morosos es una situación reversible; una vez que gestionemos tu deuda o te acojas a la Ley de Segunda Oportunidad, tus datos desaparecerán de esos listados y podrás recuperar tu perfil crediticio."
      }
    ]
  },
  "bbva": {
    "intro": "Si las cuotas de tu préstamo o tarjeta de BBVA han empezado a quitarte el sueño, no estás solo: es uno de los bancos más grandes, pero también uno con el que más personas logran recuperar su tranquilidad financiera.",
    "worries": [
      {
        "fear": "¿Puede BBVA embargarme la cuenta de la nómina mañana mismo?",
        "reality": "No, un banco no puede embargar tus bienes directamente por un impago; necesitan primero interponer una demanda judicial y que un juez dicte una orden de embargo tras analizar tu situación."
      },
      {
        "fear": "Me llaman constantemente de recobros y me siento acosado.",
        "reality": "BBVA suele externalizar la gestión de deudas con agencias que pueden ser insistentes, pero tienes derecho a la privacidad y existen límites legales que protegen tu dignidad frente al acoso telefónico."
      }
    ],
    "origin": "BBVA (Banco Bilbao Vizcaya Argentaria) es una de las mayores entidades financieras de España, con una historia que se remonta a mediados del siglo XIX. Opera como un banco tradicional de servicios completos, gestionando desde hipotecas hasta tarjetas de crédito y préstamos al consumo para millones de clientes.",
    "faqs": [
      {
        "a": "Como entidad sólida, BBVA suele estar dispuesta a escuchar propuestas de renegociación, aunque para conseguir una quita real de la deuda o una cancelación total, a menudo es necesario recurrir a mecanismos legales como la Ley de Segunda Oportunidad.",
        "q": "¿Puedo negociar directamente con BBVA si no puedo pagar?"
      },
      {
        "q": "¿Me meterán en una lista de morosos si dejo de pagar una cuota?",
        "a": "No es automático; BBVA debe notificarte previamente por correo certificado y darte un plazo para regularizar la situación antes de incluirte en ficheros como ASNEF o Badexcug."
      }
    ],
    "metaDescription": "¿Problemas para pagar tus deudas con BBVA? Descubre cómo gestionar tus préstamos o tarjetas y recupera la tranquilidad con la Ley de Segunda Oportunidad.",
    "detail": "Sus productos estrella, como las tarjetas de crédito 'Después' o sus préstamos personales inmediatos, pueden volverse complicados debido a intereses acumulados o cuotas que parecen no bajar nunca. La facilidad de contratación desde su app a veces hace que el nivel de endeudamiento suba sin darnos cuenta, generando una situación de bloqueo financiero."
  },
  "caixabank": {
    "origin": "CaixaBank es una de las entidades financieras más grandes de España, con origen en la histórica caja de ahorros de Barcelona (\"la Caixa\"). Tras su fusión con Bankia, se ha consolidado como el banco líder en banca minorista, gestionando millones de cuentas, hipotecas y tarjetas en todo el país.",
    "worries": [
      {
        "reality": "CaixaBank utiliza agencias externas para presionar el cobro, pero estas empresas no son la autoridad y no pueden entrar en tu domicilio ni embargar tus bienes sin un juicio previo.",
        "fear": "Me llaman constantemente de su departamento de recobros y me asusta que vengan a mi casa."
      },
      {
        "fear": "He oído que CaixaBank siempre gana en los juzgados por ser un banco tan grande.",
        "reality": "La realidad es que los tribunales españoles han anulado miles de contratos de esta entidad por falta de transparencia o intereses abusivos, fallando a favor del consumidor de forma recurrente."
      }
    ],
    "metaDescription": "¿Tienes deudas con CaixaBank? Descubre cómo gestionar tus préstamos o tarjetas, frenar el acoso y acogerte a la Ley de Segunda Oportunidad con Calma.",
    "detail": "Comercializan una amplia gama de productos, desde tarjetas Visa o Mastercard con modalidad 'revolving' (pago aplazado) hasta préstamos personales con seguros vinculados. Muchas reclamaciones surgen porque el interés compuesto de sus tarjetas hace que la deuda apenas disminuya, o por comisiones de descubierto que los clientes consideran injustas.",
    "faqs": [
      {
        "q": "¿Puedo cancelar mi deuda con CaixaBank si no tengo ingresos?",
        "a": "Sí, es posible negociar una reestructuración o bien acogerte a la Ley de la Segunda Oportunidad si cumples los requisitos de insolvencia, permitiéndote cancelar legalmente lo que no puedas pagar."
      },
      {
        "a": "Aunque tienen sus propios procesos de recobro, legalmente no pueden embargarte sin una orden judicial previa tras un proceso donde tú habrás tenido derecho a defenderte.",
        "q": "¿Me van a quitar el dinero directamente de la cuenta por deber la tarjeta?"
      }
    ],
    "intro": "¿Sientes que tu préstamo o tarjeta de CaixaBank se ha convertido en una carga imposible de llevar? No estás solo: miles de personas en España están logrando poner fin al acoso telefónico y recuperar su tranquilidad financiera hoy mismo."
  },
  "bankinter": {
    "intro": "Si sientes que tu deuda con Bankinter se ha vuelto una sombra que no te deja avanzar, no estás solo; este banco tiene perfiles de ahorro muy claros, pero sus productos de crédito pueden ser asfixiantes.",
    "metaDescription": "¿Debes dinero a Bankinter? Descubre cómo gestionar tus préstamos o tarjetas y recupera la tranquilidad. Te ayudamos a cancelar tus deudas legalmente.",
    "faqs": [
      {
        "q": "¿Puedo incluir mi deuda de Bankinter en la Ley de Segunda Oportunidad?",
        "a": "Absolutamente. Si cumples los requisitos legales, las deudas con Bankinter (préstamos, tarjetas o avales) se pueden cancelar totalmente mediante esta ley, permitiéndote empezar de cero sin cargas."
      },
      {
        "a": "No temas, es muy común. Podemos revisar tu contrato para ver si los intereses son abusivos y negociar una reducción del importe o un plan de pagos que realmente puedas permitirte según tus ingresos actuales.",
        "q": "Tengo una tarjeta Bankinter Consumer Finance que nunca baja, ¿qué puedo hacer?"
      }
    ],
    "detail": "Bankinter es conocido por comercializar líneas de crédito y tarjetas revolving, como su popular Bankinter Consumer Finance y la tarjeta 'Obsidiana', que a menudo aplican intereses muy superiores a la media bancaria. Sus sistemas de amortización de cuotas bajas pueden atrapar a los clientes en una espiral de intereses donde la deuda principal apenas disminuye a pesar de los pagos mensuales constantes.",
    "worries": [
      {
        "fear": "¿Puede Bankinter quedarse con mi nómina o mi casa directamente por no pagar la tarjeta?",
        "reality": "No, Bankinter no puede embargarte de forma inmediata; para ello deben iniciar un proceso judicial previo donde tú tienes derecho a defenderte y oponerte si hay cláusulas abusivas."
      },
      {
        "fear": "Me están llamando constantemente de recobros y me da miedo descolgar el teléfono.",
        "reality": "Esas llamadas son una táctica de presión comercial, no tienen autoridad legal para entrar en tu casa ni para obligarte a pagar más de lo que tus necesidades básicas permiten."
      }
    ],
    "origin": "Bankinter es una de las entidades financieras más sólidas de España, nacida originalmente como un banco industrial participado por el Banco Santander y Bank of America. Con sede en Madrid, ha evolucionado hasta ser un referente en banca comercial y de consumo, operando a través de marcas como Bankinter Consumer Finance para sus productos de financiación rápida."
  },
  "sabadell": {
    "faqs": [
      {
        "a": "Sí, el Sabadell es una entidad abierta a negociar quitas o planes de refinanciación, aunque a menudo es más efectivo hacerlo a través de mediadores profesionales o buscando la cancelación por vía legal si la deuda es inasumible.",
        "q": "¿Puedo negociar mi deuda directamente con el Sabadell?"
      },
      {
        "q": "¿Cómo sé si el banco ha iniciado ya una demanda judicial contra mí?",
        "a": "Generalmente el banco te avisará mediante carta certificada o burofax antes de iniciar cualquier procedimiento importante; nuestro consejo es no ignorar las cartas y analizar si existen cláusulas abusivas."
      }
    ],
    "detail": "Banco Sabadell comercializa una amplia gama de productos como préstamos 'Expansión', tarjetas de crédito y líneas de crédito que a menudo incluyen comisiones por descubierto o intereses que se acumulan rápidamente si dejas de pagar. Además, es común que gestionen el recobro a través de empresas externas o que terminen vendiendo carteras de deuda a fondos de inversión, lo que genera una presión constante sobre el cliente.",
    "intro": "Sentir que el Sabadell te presiona con llamadas y cartas puede quitarte el sueño, pero recuerda que incluso con un banco tan grande, tienes derechos legales para frenar esta situación.",
    "origin": "Banco Sabadell es una de las entidades financieras históricas de España, con origen en Cataluña y una fuerte expansión nacional e internacional tras absorber bancos como la CAM. Se dedica a la banca comercial tradicional, ofreciendo desde hipotecas hasta financiación al consumo para particulares y empresas.",
    "worries": [
      {
        "fear": "Tengo miedo de que el Sabadell me embargue la nómina al primer mes de impago.",
        "reality": "Ningún banco puede embargarte directamente; necesitan una sentencia judicial y siempre respetando los límites legales que protegen el Salario Mínimo Interprofesional."
      },
      {
        "reality": "El banco suele externalizar el cobro, pero existen leyes de protección de datos y contra el acoso que limitan estas comunicaciones: no pueden llamarte de madrugada ni contactar con tus vecinos.",
        "fear": "Me están llamando a todas horas de empresas de recobro en nombre del banco."
      }
    ],
    "metaDescription": "¿Tienes deudas con Banco Sabadell? Recupera la paz con nuestra guía sobre cómo gestionar reclamaciones, negociar pagos o acogerte a la Ley de Segunda Oportunidad."
  },
  "abanca": {
    "faqs": [
      {
        "q": "¿Puedo renegociar las cuotas de mi préstamo con Abanca?",
        "a": "Sí, puedes negociar una carencia de capital o una reestructuración a través de su Código de Buenas Prácticas, aunque si la deuda es ya insostenible, la mediación legal suele ser más efectiva."
      },
      {
        "a": "Abanca suele insistir mediante llamadas y cartas, pero no pueden embargarte sin un juicio previo donde un juez analice tu situación económica real.",
        "q": "¿Me van a quitar la nómina inmediatamente si dejo de pagar?"
      }
    ],
    "origin": "Abanca es una entidad financiera española con un fuerte arraigo en el noroeste del país, nacida tras la reestructuración de las antiguas cajas de ahorros gallegas. Actualmente opera en todo el territorio nacional, ofreciendo servicios de banca tradicional tanto a particulares como a empresas.",
    "worries": [
      {
        "fear": "Me han dicho que si no pago mi tarjeta de Abanca me meterán en ASNEF y nunca podré pedir nada más.",
        "reality": "Estar en un fichero de morosidad es reversible; una vez que solventamos la deuda mediante la Ley de Segunda Oportunidad, tienes el derecho legal a desaparecer de esas listas."
      },
      {
        "fear": "Temo que Abanca se quede con mi casa por un préstamo personal impagado.",
        "reality": "Para que un préstamo personal afecte a tu vivienda debe haber un proceso judicial largo y, bajo la Ley de Segunda Oportunidad, tu vivienda habitual puede quedar protegida mientras liquidamos tus deudas."
      }
    ],
    "intro": "Si los recibos de Abanca han empezado a acumularse y las llamadas de recobro no te dejan dormir, es el momento de recuperar el control de tu economía.",
    "detail": "Abanca gestiona una amplia gama de productos que van desde préstamos personales y tarjetas de crédito hasta hipotecas variables y fijas. Sus reclamaciones suelen derivar de la aplicación de comisiones de descubierto repetitivas y, en ocasiones, por la falta de transparencia en la comercialización de tarjetas con intereses que rozan la usura.",
    "metaDescription": "¿Tienes deudas con Abanca? Descubre cómo gestionar tus préstamos o tarjetas y encuentra el camino hacia la tranquilidad financiera con la Ley de Segunda Oportunidad."
  },
  "openbank": {
    "origin": "Openbank es la filial bancaria 100% digital del Grupo Santander, pionera en España en ofrecer banca telefónica y online desde mediados de los años 90. Aunque funciona de forma independiente, cuenta con el respaldo de uno de los grupos financieros más grandes del mundo.",
    "metaDescription": "¿Agobiado por una deuda con Openbank? Descubre cómo gestionar tus pagos, evitar el acoso telefónico y recuperar tu tranquilidad financiera con Calma.",
    "detail": "Openbank opera principalmente con tarjetas de crédito 'Diamond' y préstamos personales rápidos que, aunque cómodos, pueden acumular intereses elevados si se aplaza el pago. Muchos usuarios se encuentran con deudas que no bajan debido al sistema 'revolving', donde la cuota mensual apenas cubre los intereses generados, perpetuando el saldo pendiente.",
    "faqs": [
      {
        "a": "Sí, existe la posibilidad de renegociar las condiciones o, si se cumplen los requisitos de insolvencia, acogerse a la Ley de Segunda Oportunidad para cancelar la deuda legalmente.",
        "q": "¿Puedo dejar de pagar a Openbank si mi situación económica ha empeorado?"
      },
      {
        "a": "Si no pagas, aplicarán comisiones por demora que aumentarán el total; sin embargo, no pueden embargarte directamente sin pasar antes por un proceso judicial donde tú podrás defenderte.",
        "q": "¿Qué pasa si ignoro las llamadas de recobro de Openbank?"
      }
    ],
    "intro": "Si sientes que tu cuenta de Openbank se ha convertido en un pozo sin fondo debido a los intereses de tu tarjeta o préstamo, no estás solo. Sabemos que lo que empezó como una facilidad digital hoy te quita el sueño, pero recuperar el control de tu economía es posible.",
    "worries": [
      {
        "reality": "Aunque compartan grupo, son entidades jurídicas distintas; no pueden realizar cargos automáticos entre cuentas de diferentes bancos sin un permiso judicial o contractual previo.",
        "fear": "¿Me va a quitar el dinero de mi cuenta el Santander por ser del mismo grupo?"
      },
      {
        "reality": "Estar en ficheros como ASNEF es reversible; una vez inicias un proceso de negociación o la Ley de Segunda Oportunidad, existen mecanismos legales para gestionar tu situación crediticia.",
        "fear": "Me amenazan con meterme en una lista de morosos y no podré pedir ni un móvil."
      }
    ]
  },
  "unicaja": {
    "faqs": [
      {
        "a": "Sí, es una de las opciones más habituales si tu situación económica ha cambiado, permitiendo unificar pagos o ajustar cuotas para que puedas respirar mientras recuperas tu estabilidad.",
        "q": "¿Puedo renegociar las condiciones de mi préstamo con Unicaja?"
      },
      {
        "a": "Si reúnes los requisitos, la Ley de Segunda Oportunidad permite cancelar legalmente tus deudas con entidades bancarias como Unicaja, paralizando inmediatamente cualquier embargo o acoso telefónico.",
        "q": "¿Sirve la Segunda Oportunidad para deudas con Unicaja?"
      }
    ],
    "metaDescription": "¿Asfixiado por deudas con Unicaja? Descubre cómo renegociar o cancelar tus cuotas legalmente. Recupera tu tranquilidad y vuelve a empezar hoy con Calma.",
    "detail": "A pesar de ser un banco de red tradicional, Unicaja ha integrado productos de Liberbank, manteniendo tarjetas de crédito con modalidades de pago aplazado y préstamos personales con intereses que, en ocasiones, superan la media del mercado. Estas condiciones pueden atrapar al cliente en una espiral de intereses donde la deuda apenas disminuye mes a mes aunque no se realicen nuevos gastos.",
    "intro": "Si las cuotas de tu préstamo o tarjeta de Unicaja se han vuelto una carga insoportable tras la fusión con Liberbank, no estás solo en esto.",
    "worries": [
      {
        "fear": "Me da miedo que me quiten la casa si dejo de pagar el préstamo personal de Unicaja.",
        "reality": "Un préstamo personal no tiene garantía hipotecaria directa; antes de cualquier embargo, debe existir un proceso judicial largo donde siempre tienes derecho a defenderte y buscar acuerdos."
      },
      {
        "fear": "He oído que Unicaja es muy insistente con las llamadas de recobro si me retraso unos días.",
        "reality": "Aunque las entidades bancarias suelen ser constantes en sus reclamaciones, existen leyes de protección al consumidor y de segunda oportunidad que limitan este acoso y te permiten frenarlo legalmente."
      }
    ],
    "origin": "Unicaja Banco es una entidad financiera española con sede en Málaga, con una fuerte presencia histórica en Andalucía y una expansión nacional tras su fusión con Liberbank. Se dedica a la banca comercial tradicional, ofreciendo desde hipotecas y seguros hasta tarjetas de crédito y préstamos al consumo."
  },
  "ibercaja": {
    "faqs": [
      {
        "q": "¿Puedo acogerme a la Segunda Oportunidad si mi deuda es con Ibercaja?",
        "a": "Sí, si tu situación económica ha cambiado, en Calma podemos ayudarte a negociar una reestructuración o aplicar la Ley de Segunda Oportunidad para cancelar lo que no puedas pagar."
      },
      {
        "a": "Ibercaja no puede embargarte directamente; para ello necesitarían una orden judicial tras un proceso donde tú tienes derecho a defenderte y proponer soluciones.",
        "q": "¿Me van a quitar el coche o la nómina si dejo de pagar una cuota?"
      }
    ],
    "detail": "A pesar de su imagen de banca de proximidad, sus tarjetas de crédito y préstamos personales pueden aplicar intereses que, en ocasiones, resultan difíciles de asumir ante un bache económico. Muchos usuarios se encuentran atrapados en deudas que no bajan debido a que los pagos mensuales se destinan casi íntegramente a cubrir costes de mantenimiento e intereses, estancando el capital pendiente.",
    "intro": "Si las cuotas de tus préstamos o tarjetas de Ibercaja han pasado de ser un apoyo a una carga insoportable, es normal que sientas ansiedad, pero no estás solo.",
    "origin": "Ibercaja Banco es una entidad financiera española con una larga historia vinculada a las cajas de ahorros, especialmente en la zona de Aragón y el centro peninsular. Actualmente opera como un banco privado que ofrece desde hipotecas hasta productos de consumo masivo en toda España.",
    "worries": [
      {
        "fear": "Me da vergüenza que Ibercaja llame a mis familiares o que se enteren en mi oficina de siempre.",
        "reality": "Ibercaja debe cumplir estrictamente con la Ley de Protección de Datos y no puede informar a terceros sobre tu situación de deuda ni realizar prácticas de acoso."
      },
      {
        "reality": "Tu historial como cliente es importante, pero si tu situación es de insolvencia, existen mecanismos legales como la Segunda Oportunidad que te protegen por encima de tu relación bancaria previa.",
        "fear": "He sido cliente de Ibercaja toda la vida y me da miedo que me cierren todas las puertas si no pago."
      }
    ],
    "metaDescription": "¿Debes dinero a Ibercaja y no ves salida? Descubre cómo gestionar tus deudas, evitar el acoso y recuperar tu tranquilidad con soluciones legales a tu medida."
  },
  "kutxabank": {
    "intro": "Si las cuotas de tu préstamo de Kutxabank se han vuelto una montaña imposible de escalar, no estás solo; muchos clientes se encuentran atrapados en intereses que no dejan de crecer.",
    "origin": "Kutxabank es una entidad financiera española nacida de la fusión de las tres cajas de ahorros de la Comunidad Autónoma Vasca: BBK, Kutxa y Vital. Actualmente opera en todo el territorio nacional, manteniendo un fuerte arraigo en el País Vasco y comercializando una amplia gama de productos de banca minorista.",
    "worries": [
      {
        "reality": "Un banco no puede embargar directamente tus bienes por un impago; necesita una orden judicial previa y, en cualquier caso, existen límites legales que protegen el Salario Mínimo Interprofesional.",
        "fear": "Me da miedo que Kutxabank embargue mi cuenta nómina si dejo de pagar una mensualidad."
      },
      {
        "fear": "Me preocupa que vendan mi deuda a un fondo buitre y el acoso sea constante.",
        "reality": "Aunque es una práctica común, tú sigues teniendo derechos legales: la deuda no aumenta por venderse y siempre puedes recurrir a la Ley de Segunda Oportunidad para cancelarla definitivamente."
      }
    ],
    "detail": "Sus préstamos personales y tarjetas de crédito a menudo aplican comisiones por descubierto o intereses que superan la media del mercado financiero, lo que dificulta que el cliente amortice el capital principal. En muchos casos, las reclamaciones se centran en la falta de transparencia en las condiciones de sus préstamos hipotecarios y la aplicación de cláusulas de gastos que hoy se consideran abusivas en términos legales.",
    "metaDescription": "¿Te preocupa tu deuda con Kutxabank? Descubre cómo gestionar tus préstamos, reclamar cláusulas abusivas y recuperar tu tranquilidad financiera con el apoyo de Calma.",
    "faqs": [
      {
        "a": "Sí, como entidad bancaria tradicional, Kutxabank suele estar abierta a propuestas de refinanciación si se presentan de forma profesional y viable antes de que la deuda pase a vía judicial.",
        "q": "¿Es posible negociar una cuota más baja directamente con Kutxabank?"
      },
      {
        "a": "Si cumples los requisitos de insolvencia y buena fe, esta ley te permite cancelar legalmente tus deudas con Kutxabank, paralizando cualquier embargo o acoso telefónico.",
        "q": "¿Puedo acogerme a la Ley de Segunda Oportunidad si tengo un préstamo con ellos?"
      }
    ]
  },
  "cajamar": {
    "origin": "Cajamar es la principal caja rural de España y la entidad de referencia del Grupo Cooperativo Cajamar, nacido de la unión de diversas cooperativas de crédito. Aunque nació con un enfoque puramente agrícola y local en Almería, hoy opera en todo el territorio nacional como un banco de proximidad para empresas y particulares.",
    "detail": "Cajamar destaca por su fuerte presencia en el sector agrícola, ofreciendo préstamos especializados para explotaciones y anticipos de cosechas, además de hipotecas tradiciones y tarjetas. Los problemas suelen surgir cuando las fluctuaciones de las campañas agrícolas o las subidas de tipos en sus préstamos tradicionales hacen que las cuotas se vuelvan insostenibles, dando lugar a intereses de demora que disparan la deuda original.",
    "metaDescription": "¿Tienes deudas con Cajamar? Descubre cómo gestionar tus impagos, evitar el embargo y recuperar tu tranquilidad financiera con soluciones legales a tu medida.",
    "faqs": [
      {
        "a": "Sí, como entidad bancaria, Cajamar puede incluirte en ficheros de morosidad si dejas de pagar, pero tienes derecho a ser notificado previamente y a buscar una solución legal para salir de ellos.",
        "q": "¿Cajamar puede incluirme en el ASNEF?"
      },
      {
        "q": "¿Puedo acogerme a la Ley de la Segunda Oportunidad con deudas de Cajamar?",
        "a": "Si el origen de tu deuda con Cajamar son cuotas impagadas y cumples el requisito de insolvencia, podemos agrupar todas tus deudas y solicitar la exoneración legal a través de la Ley de la Segunda Oportunidad."
      }
    ],
    "worries": [
      {
        "fear": "Me da miedo que Cajamar ejecute el embargo de mi cuenta de la explotación agrícola.",
        "reality": "Cualquier embargo debe ser ordenado por un juez; no sucede de un día para otro y existen límites legales que protegen el dinero necesario para tu subsistencia y el funcionamiento básico de tu actividad."
      },
      {
        "reality": "La gestión de la deuda tiene límites legales y no pueden vulnerar tu honor; existen mecanismos legales como la Ley de la Segunda Oportunidad que paralizan el acoso y cualquier interés abusivo.",
        "fear": "He recibido llamadas constantes de su departamento de recobros y me siento acosado."
      }
    ],
    "intro": "Si el compromiso con Cajamar te está quitando el sueño después de tantos años de confianza, queremos que sepas que tu situación financiera tiene un camino de vuelta a la tranquilidad."
  },
  "ing": {
    "faqs": [
      {
        "q": "¿Puedo cancelar mi deuda con ING sin pagarla entera?",
        "a": "Sí, es posible. Si cumples los requisitos de la Ley de Segunda Oportunidad y se demuestra que no puedes pagar, el juez puede cancelar legalmente tus deudas con ING junto con las de otros bancos."
      },
      {
        "a": "Es una práctica habitual de ING externaizar este proceso. No significa que debas más, sino que ahora negociarás con otra empresa que suele ser más insistente en sus llamadas comerciales.",
        "q": "¿Por qué me llama una empresa externa en nombre de ING para cobrarme?"
      }
    ],
    "worries": [
      {
        "reality": "Aunque en el contrato suelen incluir cláusulas de compensación, existen límites legales inembargables sobre tu salario y siempre puedes proteger tus ingresos cambiando tu operativa bancaria mientras solucionamos la situación.",
        "fear": "¿Pueden quitarme el dinero directamente de mi Cuenta Nómina si dejo de pagar un préstamo?"
      },
      {
        "reality": "Estar en un fichero de morosidad es una consecuencia temporal, pero no es el fin del mundo. Una vez que resolvemos tu insolvencia o la deuda se cancela legalmente, tienes el derecho de rectificación para salir de ese listado definitivamente.",
        "fear": "Me amenazan con meterme en ASNEF y no podré volver a pedir financiación."
      }
    ],
    "detail": "ING comercializa tarjetas de crédito 'Oro' y préstamos personales que a menudo incluyen intereses compuestos y comisiones por pagos atrasados que aumentan la deuda rápidamente. Si se acumulan impagos, el banco suele ceder la gestión o vender la deuda a fondos de recobro (fondos buitre), lo que intensifica la presión sobre el cliente.",
    "metaDescription": "¿Debes dinero a ING? Descubre cómo gestionar tus impagos, frenar el acoso por deudas y acogerte a la Ley de Segunda Oportunidad para empezar de cero con Calma.",
    "intro": "¿Sientes que el \"banco naranja\" ya no es tan amigable desde que no puedes hacer frente a tus cuotas? Si los préstamos o tarjetas de ING se han convertido en una carga inasumible, tenemos la llave para que recuperes el control.",
    "origin": "ING (ING Bank N.V. Sucursal en España) es una entidad financiera de origen neerlandés que se popularizó como \"el banco sin comisiones\". Aunque en sus inicios se centró en el ahorro, hoy es uno de los principales emisores de crédito al consumo y tarjetas en el mercado español."
  },
  "evo-banco": {
    "metaDescription": "¿Agobiado por deudas con EVO Banco? Descubre cómo gestionar tus préstamos o tarjetas y conoce si puedes acogerte a la Ley de Segunda Oportunidad con Calma.",
    "origin": "EVO Banco nació como la marca comercial para la expansión nacional de NovaGalicia Banco, aunque posteriormente fue adquirido por Bankinter. Se posiciona como una entidad digital enfocada en la sencillez, gestionando miles de cuentas, tarjetas y préstamos personales en toda España.",
    "detail": "Sus principales focos de reclamación son la Tarjeta Inteligente y los préstamos personales, que en ocasiones aplican intereses que los tribunales consideran desproporcionados o falta de transparencia en la contratación. Muchos usuarios se encuentran atrapados en sistemas de pago 'revolving', donde las cuotas apenas cubren los intereses, haciendo que la deuda parezca no bajar nunca.",
    "worries": [
      {
        "reality": "Aunque son el mismo banco, no pueden embargar tu saldo arbitrariamente sin un proceso judicial previo o una cláusula de compensación muy específica que se puede revisar legalmente.",
        "fear": "¿Me pueden quitar el dinero de mi cuenta de ahorros si dejo de pagar el préstamo?"
      },
      {
        "fear": "¿EVO pasará mi deuda a un fondo buitre y me acosarán a llamadas?",
        "reality": "Es una práctica común, pero el cambio de acreedor no empeora tus derechos; simplemente abre nuevas vías de negociación o defensa legal para liquidar la deuda por menos de lo que te piden."
      }
    ],
    "intro": "Si los recibos de tu Tarjeta Inteligente o los préstamos de EVO Banco han empezado a quitarte el sueño, no estás solo: hay mecanismos legales para recuperar el control.",
    "faqs": [
      {
        "a": "Sí, es posible negociar una dación en pago o una reestructuración si cumples ciertos requisitos, aunque a menudo la Ley de Segunda Oportunidad es una vía más definitiva para cancelar deudas inasumibles.",
        "q": "¿Puedo negociar mi hipoteca con EVO Banco si no puedo pagar?"
      },
      {
        "a": "No es un proceso automático; requiere un análisis de tu contrato para detectar cláusulas abusivas o intereses usurarios que permitan anular el contrato o devolverte lo pagado de más.",
        "q": "¿EVO Banco me devolverá los intereses de mi tarjeta si reclamo?"
      }
    ]
  },
  "myinvestor": {
    "origin": "MyInvestor es un neobanco español respaldado por Andbank España, El Corte Inglés Seguros y AXA, nacido originalmente como un gestor de inversiones digital. Se caracteriza por un modelo de negocio centrado en productos financieros de bajo coste y préstamos diseñados específicamente para clientes con capacidad de inversión.",
    "faqs": [
      {
        "q": "¿Puedo incluir mi deuda con MyInvestor en la Ley de Segunda Oportunidad? Short answer: Sí.",
        "a": "Sí, como cualquier banco español, si existe una insolvencia real y cumples los requisitos de buena fe, las deudas con MyInvestor se pueden cancelar legalmente."
      },
      {
        "q": "¿Qué pasa si mi cuenta se queda en negativo por un préstamo de inversión? Short answer: Te contactarán para regularizarlo.",
        "a": "MyInvestor suele operar de forma digital, por lo que las comunicaciones serán por esa vía, pero si la deuda persiste, podrían iniciar procedimientos judiciales para reclamar el saldo pendiente."
      }
    ],
    "detail": "Aunque es conocido por sus productos de inversión, ofrece hipotecas y préstamos para invertir con tipos de interés variables que pueden volverse difíciles de sostener si cambian tus circunstancias económicas. Las reclamaciones suelen surgir cuando el cliente no puede cubrir las cuotas de estos créditos específicos o cuando se ejecutan garantías en momentos de caída del mercado.",
    "worries": [
      {
        "fear": "¿Pueden quitarme mis ahorros o fondos de inversión si no pago el préstamo?",
        "reality": "Si el préstamo tiene como garantía tus inversiones (pignoración), el banco puede ejecutarlas, pero siempre bajo un proceso regulado y con total transparencia legal."
      },
      {
        "fear": "¿Me van a demandar por ser un banco de inversión y no un prestamista común?",
        "reality": "El proceso es el mismo que con cualquier banco; antes de llegar al juzgado, existen mecanismos de mediación y defensa del cliente que podemos activar para protegerte."
      }
    ],
    "intro": "Si un préstamo para invertir o una hipoteca con MyInvestor se ha convertido en una carga que no te deja dormir, no estás solo: hay formas legales de recuperar tu tranquilidad.",
    "metaDescription": "¿Te agobian las deudas con MyInvestor? Descubre cómo gestionar tus préstamos, tus derechos como consumidor y cómo eliminar tus deudas legalmente con Calma."
  },
  "deutsche-bank": {
    "faqs": [
      {
        "a": "Sí, como banco tradicional, Deutsche Bank suele estar abierto a procesos de negociación de buena fe, especialmente bajo el marco de la Ley de Segunda Oportunidad si cumples los requisitos legales.",
        "q": "¿Es posible negociar una quita o reestructuración con Deutsche Bank?"
      },
      {
        "a": "Si dejas de pagar, el banco iniciará un proceso de recobro y, eventualmente, podría incluirte en ficheros de morosidad como ASNEF, pero siempre tienes derecho a ser notificado y a buscar una solución legal antes de llegar a mayores.",
        "q": "¿Qué pasa si tengo un préstamo personal impagado con ellos?"
      }
    ],
    "origin": "Deutsche Bank España es la filial del gigante bancario alemán, con una trayectoria de décadas en nuestro país centrada en banca comercial y de inversión. A diferencia de las financieras online, es un banco físico con una estructura corporativa sólida y protocolos de recobro muy estandarizados.",
    "worries": [
      {
        "fear": "Me da pánico que Deutsche Bank me embargue la nómina por mi préstamo personal de inmediato.",
        "reality": "Un banco no puede embargarte directamente; necesita una sentencia judicial previa y siempre se respetará el Salario Mínimo Interprofesional, por lo que nunca te quedarás sin nada para vivir. Archivar tu caso bajo la Ley de Segunda Oportunidad paraliza cualquier ejecución."
      },
      {
        "fear": "Al ser un banco internacional tan grande, ¿serán implacables y no podré solucionar mi deuda jamás?",
        "reality": "Precisamente su gran tamaño hace que sigan normativas estrictas de consumo y que prefieran cerrar expedientes mediante acuerdos legales o someterse a la Ley de Segunda Oportunidad antes que mantener deudas incobrables eternamente."
      }
    ],
    "intro": "Si te sientes asfixiado por un préstamo o una tarjeta de Deutsche Bank, no estás solo; esta entidad alemana tiene una fuerte presencia en España y sus procesos de reclamación pueden ser muy insistentes.",
    "detail": "Sus cuentas corrientes y préstamos personales suelen incluir comisiones de mantenimiento o intereses que, al acumularse por impago, derivan en una deuda difícil de gestionar. Además, comercializan tarjetas de crédito y productos de inversión complejos que pueden generar saldos negativos imprevistos si no se cancelan correctamente.",
    "metaDescription": "¿Tienes deudas con Deutsche Bank? Recupera la tranquilidad. Te explicamos cómo gestionar tus impagos y acogerte a la Ley de Segunda Oportunidad. Sin miedo."
  },
  "mediolanum": {
    "intro": "Si el modelo de banca personal de Mediolanum te ha acabado generando una deuda difícil de gestionar, no estás solo y, sobre todo, no es el final del camino.",
    "origin": "Banco Mediolanum es una entidad de origen italiano que opera en España bajo un modelo de asesoramiento personalizado a través de sus 'Family Bankers'. A diferencia de la banca tradicional de oficinas físicas, se centran en la gestión del ahorro y productos de crédito ligados a la inversión.",
    "faqs": [
      {
        "a": "Sí, es totalmente posible agrupar tus deudas con Mediolanum dentro de un plan de Ley de Segunda Oportunidad para reducir tus cuotas mensuales y recuperar el aire.",
        "q": "¿Puedo reunificar mis deudas con Banco Mediolanum si ya no puedo pagar?"
      },
      {
        "a": "Aunque es una entidad con una estructura comercial distinta, sus contratos están sometidos a la misma normativa de transparencia que cualquier banco español y pueden ser revisados por un experto.",
        "q": "¿Son reclamables los intereses de los préstamos de Mediolanum?"
      }
    ],
    "worries": [
      {
        "fear": "Mi asesor personal de Mediolanum me presiona mucho y me da vergüenza mi situación.",
        "reality": "Recuerda que tu 'Family Banker' es un comercial de la entidad; no permitas que la relación personal nuble tus derechos legales a renegociar o cancelar tu deuda."
      },
      {
        "fear": "¿Pueden embargar mis ahorros o inversiones si dejo de pagar el préstamo vinculado?",
        "reality": "Cualquier embargo requiere una orden judicial previa, y con la Ley de Segunda Oportunidad se pueden paralizar estos procesos mientras se busca una solución definitiva para tu caso."
      }
    ],
    "metaDescription": "¿Debes dinero a Banco Mediolanum? Descubre cómo gestionar tu deuda, evitar el acoso y acogerte a la Ley de Segunda Oportunidad para empezar de nuevo con Calma.",
    "detail": "Esta entidad suele ofrecer líneas de crédito y cuentas con condiciones vinculadas a la inversión, lo que puede complicar la cancelación de la deuda si los activos pierden valor. Muchos usuarios se encuentran atrapados en 'Family Bankers' que, tras una relación de confianza, dificultan la negociación de quitas o reestructuraciones cuando la situación económica familiar empeora."
  },
  "pichincha": {
    "intro": "Si las cuotas de tu préstamo con Banco Pichincha te están quitando el sueño, no estás solo: existe un camino legal para recuperar tu tranquilidad financiera.",
    "worries": [
      {
        "reality": "La Ley de Protección de Datos prohíbe a la entidad informar a terceros sobre tu deuda; la negociación es privada y solo te concierne a ti.",
        "fear": "Tengo miedo de que mis familiares en Ecuador o aquí se enteren de que no puedo pagar."
      },
      {
        "reality": "Aunque sea un grupo internacional, operan bajo la ley española, lo que significa que tienes los mismos derechos y protecciones que con cualquier otro banco nacional.",
        "fear": "Siento que por ser un banco internacional pueden tomar medidas legales más agresivas contra mi patrimonio."
      }
    ],
    "metaDescription": "¿Tienes deudas con Banco Pichincha? Descubre cómo gestionar tus pagos, evitar el acoso y acogerte a la Ley de Segunda Oportunidad para empezar de nuevo con Calma.",
    "origin": "Banco Pichincha es la mayor entidad financiera de Ecuador y opera en España como banco comercial bajo la supervisión del Banco de España. En nuestro país, se ha especializado tanto en el servicio a la comunidad latinoamericana como en banca digital a través de su marca Pibank.",
    "faqs": [
      {
        "a": "Sí, si cumples los requisitos de insolvencia y buena fe, es posible cancelar judicialmente lo que no puedes pagar, incluyendo tus compromisos con esta entidad.",
        "q": "¿Puedo acogerme a la Ley de Segunda Oportunidad si mi deuda es con Banco Pichincha?"
      },
      {
        "a": "No suelen embargar de inmediato; primero deben demandarte judicialmente y solo un juez puede ordenar el embargo tras un proceso que lleva meses.",
        "q": "¿Banco Pichincha puede quitarme el dinero de mi cuenta sin avisar si les debo una cuota?"
      }
    ],
    "detail": "Su actividad en España se centra en préstamos personales y cuentas de ahorro que, ante impagos, generan intereses de demora y comisiones que engordan la deuda rápidamente. Muchos clientes enfrentan dificultades cuando las cuotas de sus préstamos Pibank o Pichincha se vuelven inasumibles debido a cambios en su situación económica personal."
  },
  "banca-march": {
    "origin": "Banca March es una entidad financiera española con sede en Palma de Mallorca, fundada en 1926 por Juan March Ordinas. Se distingue por ser uno de los pocos bancos familiares que quedan en España, centrando su modelo de negocio en la gestión de altos patrimonios y el asesoramiento a empresas.",
    "metaDescription": "¿Tienes deudas con Banca March? Recupera tu tranquilidad: descubre cómo gestionar tus préstamos, evitar embargos y acogerte a la Ley de Segunda Oportunidad con Calma.",
    "detail": "Ofrece principalmente servicios de banca privada y patrimonial, además de créditos personales e hipotecarios con estructuras de pago que pueden volverse rígidas ante un bache económico. Muchos usuarios reclaman por la falta de flexibilidad en el pago de préstamos y el cobro de comisiones de descubierto cuando los ahorros fallan, lo que acaba generando una espiral de deuda difícil de gestionar.",
    "faqs": [
      {
        "a": "Sí, aunque sea un banco enfocado en patrimonios, puedes acogerte a la Ley de Segunda Oportunidad para cancelar tus deudas con ellos si eres insolvente y actúas de buena fe.",
        "q": "¿Puedo acogerme a la Ley de Segunda Oportunidad si tengo un préstamo con Banca March?"
      },
      {
        "q": "¿Qué pasa si dejo de pagar una línea de crédito en este banco?",
        "a": "Lo más probable es que vendan tu deuda a un fondo de recobro o inicien un procedimiento judicial; por eso es vital que busquemos una solución legal antes de que lleguen a embargar tus bienes."
      }
    ],
    "intro": "Si tu situación con Banca March ha pasado de la tranquilidad a las llamadas por impagos, no estás solo; incluso en la banca más exclusiva, las deudas pueden desbordarse.",
    "worries": [
      {
        "reality": "Tus derechos son los mismos que los de cualquier ciudadano: si demuestras tu insolvencia real ante la ley, la entidad no puede impedirte acogerte a mecanismos de condonación de deuda.",
        "fear": "Al ser un banco para clientes con alto patrimonio, pensarán que tengo dinero escondido y no me dejarán cancelar la deuda."
      },
      {
        "fear": "Me da miedo que Banca March ejecute mi hipoteca o préstamo personal de forma inmediata por su solidez financiera.",
        "reality": "Cualquier ejecución judicial requiere tiempos legales largos y existen herramientas legales, como la Ley de Segunda Oportunidad, que paralizan estos procesos y protegen tus bienes básicos."
      }
    ]
  },
  "laboral-kutxa": {
    "detail": "A diferencia de los grandes bancos nacionales, Laboral Kutxa aplica un modelo cooperativo donde los préstamos personales y anticipos suelen estar vinculados a la nómina del cliente, facilitando un sobreendeudamiento cuando cambian las circunstancias laborales. Sus tarjetas de crédito y préstamos 'fáciles' pueden generar intereses que, sumados a las comisiones por descubierto, dificultan la liquidación total de la deuda.",
    "intro": "Si los recibos de Laboral Kutxa han pasado de ser una ayuda a un peso insoportable que no te deja dormir, recuerda que no eres el primero ni el último en pasar por esto.",
    "worries": [
      {
        "reality": "Es una duda común, pero existen mecanismos legales para proteger tus derechos básicos y evitar que un bache económico acabe con todo tu patrimonio vinculado a la entidad.",
        "fear": "Como soy socio cooperativista, ¿pueden quitarme mis aportaciones si dejo de pagar el préstamo?"
      },
      {
        "reality": "Laboral Kutxa debe cumplir estrictamente con la Ley de Protección de Datos; además, nosotros podemos intermediar para que dejen de contactarte y recuperes tu privacidad.",
        "fear": "Me da vergüenza que llamen a mi sucursal de toda la vida y se enteren mis vecinos."
      }
    ],
    "metaDescription": "¿Problemas para pagar tus préstamos de Laboral Kutxa? Recupera la tranquilidad. Te explicamos cómo solucionar tus deudas y acogerte a la Ley de Segunda Oportunidad.",
    "origin": "Laboral Kutxa es una cooperativa de crédito vasca surgida de la fusión entre Caja Laboral e Ipar Kutxa. Con una fuerte presencia en el norte de España, opera como una entidad bancaria tradicional que ofrece desde hipotecas hasta financiación al consumo para particulares y profesionales.",
    "faqs": [
      {
        "q": "¿Es posible negociar directamente con Laboral Kutxa si no puedo pagar?",
        "a": "Sí, al ser una entidad con fuerte arraigo social, suelen estar abiertos a escuchar, aunque sus soluciones internas a veces son insuficientes para una insolvencia real; ahí es donde la Ley de Segunda Oportunidad es clave."
      },
      {
        "q": "¿Me pueden embargar toda la nómina si la tengo domiciliada con ellos?",
        "a": "Por ley, no pueden dejarte sin lo mínimo para vivir. Si tu deuda es con ellos, podemos ayudarte a proteger tu salario y buscar una solución definitiva para cancelar el total de lo que debes."
      }
    ]
  },
  "cajasur": {
    "worries": [
      {
        "reality": "Existe un orden legal de embargos y las deudas por préstamos personales tienen límites de protección sobre tu vivienda habitual y tu salario mínimo que te amparan.",
        "fear": "Cajasur me va a quitar la casa porque no puedo pagar el préstamo personal que pedí con ellos."
      },
      {
        "reality": "Estar en un fichero de morosidad es una situación reversible; una vez que logramos cancelar o renegociar tu deuda con Cajasur, tienes el derecho legal a que tus datos sean borrados.",
        "fear": "Me han metido en el ASNEF y ya nunca podré salir de ahí ni pedir financiación de nuevo."
      }
    ],
    "intro": "Sentir que tu banco de \"toda la vida\" como Cajasur te asfixia con cuotas que no bajan es agotador, pero recuperar el control de tu economía es totalmente posible.",
    "faqs": [
      {
        "q": "¿Puedo cancelar mi deuda con Cajasur si no puedo pagar? El banco me dice que no hay opciones.",
        "a": "Sí, es posible negociar una reducción o eliminación de la deuda mediante la Ley de Segunda Oportunidad o detectando cláusulas abusivas en tus contratos de préstamo o tarjeta."
      },
      {
        "a": "No te preocupes; Cajasur suele externalizar estos avisos para presionar, pero legalmente existe un proceso reglado y no pueden actuar fuera de la ley ni quitarte tus bienes de un día para otro sin orden judicial.",
        "q": "He recibido una carta de una empresa de recobro que trabaja para Cajasur, ¿qué debo hacer?"
      }
    ],
    "detail": "Con una fuerte presencia en Andalucía y el País Vasco, Cajasur comercializa una amplia gama de productos que incluyen hipotecas con cláusulas complejas e intereses en tarjetas de crédito que pueden volverse insostenibles. Muchos clientes enfrentan reclamaciones por falta de transparencia en sus contratos o por comisiones de descubierto que disparan la deuda original sin previo aviso.",
    "metaDescription": "¿Agobiado por una deuda con Cajasur? Descubre cómo gestionar tus impagos, evitar el acoso y acogerte a soluciones legales para recuperar tu tranquilidad económica.",
    "origin": "Cajasur Banco es una entidad financiera española con sede en Córdoba, que forma parte del Grupo Kutxabank tras su integración en 2011. Históricamente vinculada a las cajas de ahorros andaluzas, hoy opera como un banco comercial convencional que ofrece servicios de financiación a particulares y empresas."
  },
  "bankoa-abanca": {
    "metaDescription": "¿Tienes deudas con Bankoa Abanca y no puedes pagar? Descubre cómo gestionar tus préstamos, frenar intereses y recuperar la tranquilidad financiera con ayuda.",
    "origin": "Bankoa fue históricamente un banco industrial clave en el País Vasco hasta que fue adquirido por el Grupo Abanca, consolidando su presencia en el norte de España. Esta integración ha convertido a la entidad en un gigante financiero que gestiona desde depósitos hasta créditos personales masivos.",
    "detail": "Se especializa en préstamos al consumo, hipotecas y tarjetas que, al aplicarse sobre perfiles de economía familiar, pueden generar sobreendeudamiento si cambian las circunstancias del cliente. La integración de los sistemas de Bankoa en Abanca ha podido generar procesos de reclamación más automatizados, dificultando a veces la negociación directa para reestructurar las cuotas.",
    "intro": "Si el cambio de Bankoa a Abanca te ha pillado en un momento financiero delicado y las cuotas de tus préstamos se han vuelto inasumibles, no estás solo. Sabemos que ver cómo tu banco de \"toda la vida\" se transforma en una gran entidad puede generar miedo, pero existen mecanismos legales para proteger tus ingresos.",
    "worries": [
      {
        "fear": "Tengo miedo de que Abanca sea más agresiva con los embargos que la antigua Bankoa.",
        "reality": "Ningún banco puede embargarte directamente sin una orden judicial previa, y la ley protege siempre una parte de tu salario vinculada al Salario Mínimo Interprofesional."
      },
      {
        "reality": "El proceso de ejecución hipotecaria es largo, está muy regulado y ofrece múltiples fases de defensa para buscar una dación en pago o una reestructuración antes de perder la vivienda.",
        "fear": "Me han dicho que si no pago me quitarán la casa inmediatamente."
      }
    ],
    "faqs": [
      {
        "q": "¿Puedo solicitar una carencia de mi hipoteca tras la absorción por Abanca?",
        "a": "Sí, como cliente de Bankoa que ahora pertenece a Abanca, tienes derecho a solicitar una carencia o renegociación bajo el Código de Buenas Prácticas si cumples los requisitos legales."
      },
      {
        "a": "No es posible ir a la cárcel por no pagar un préstamo personal o una tarjeta; en España las deudas civiles se resuelven mediante el embargo de bienes, pero nunca con penas de prisión.",
        "q": "¿Me pueden meter en la cárcel si no pago mi préstamo de Bankoa?"
      }
    ]
  },
  "imagin": {
    "worries": [
      {
        "fear": "¿Me van a quitar el dinero de mi otra cuenta de CaixaBank si no pago en imagin?",
        "reality": "Al ser la misma entidad legal (CaixaBank), pueden intentar compensar saldos entre cuentas, pero existen límites legales y formas de proteger tu sueldo mínimo vital para que no te quedes a cero."
      },
      {
        "fear": "Al ser un banco digital, ¿pueden embargarme la nómina de un día para otro?",
        "reality": "Ningún banco, sea digital o físico, puede embargarte sin pasar antes por un proceso judicial y una sentencia de un juez; tienes tiempo y derechos para defenderte antes de que eso ocurra."
      }
    ],
    "metaDescription": "¿Debes dinero a imagin? Descubre cómo gestionar tus deudas, evitar el acoso telefónico y recuperar tu tranquilidad financiera con el apoyo de Calma.",
    "origin": "imagin (anteriormente imaginBank) es la plataforma de servicios financieros digitales lanzada por CaixaBank en España. Funciona como un banco 100% móvil enfocado en el público joven, ofreciendo desde cuentas corrientes hasta préstamos y tarjetas de crédito bajo el respaldo del grupo bancario más grande del país.",
    "faqs": [
      {
        "q": "¿Se pueden reclamar los intereses de una tarjeta o préstamo de imagin?",
        "a": "Sí, al ser una marca de CaixaBank, la reclamación se gestiona a través de la infraestructura del banco; podemos ayudarte a revisar si tus contratos tienen cláusulas abusivas."
      },
      {
        "q": "¿Me van a meter en ASNEF si tengo una deuda pendiente con ellos?",
        "a": "Si dejas de pagar, tras varios avisos, es muy probable que incluyan tus datos en ficheros como ASNEF, lo que te dificultará pedir otros préstamos, pero es algo que podemos solucionar cancelando la deuda."
      }
    ],
    "detail": "Aunque su apariencia es digital y joven, sus productos como el préstamo imagin&Go o el uso de tarjetas de crédito pueden aplicar intereses elevados y comisiones por descubierto si no se gestionan a tiempo. Al ser puramente móvil, la acumulación de deudas por pequeños préstamos rápidos o fraccionamientos de compras suele pasar desapercibida hasta que la situación financiera se vuelve insostenible.",
    "intro": "Si los recibos de \"imagin\" han pasado de ser notificaciones en tu móvil a una preocupación constante al despertar, no estás solo. Aunque parezca un banco joven y desenfadado, las deudas con ellos son reales, pero tu tranquilidad también puede serlo."
  },
  "self-bank-singular": {
    "worries": [
      {
        "reality": "Si tienes deuda vencida, la entidad puede pignorar garantías, pero siempre bajo el marco del contrato firmado y manteniendo tus derechos mínimos de subsistencia si se llega a una vía judicial.",
        "fear": "¿Pueden ejecutar mis inversiones para cobrar la deuda?"
      },
      {
        "reality": "La Ley de Protección de Datos prohíbe terminantemente que cualquier entidad informe a terceros sobre tus deudas; el trato debe ser estrictamente confidencial entre el banco y tú.",
        "fear": "Me da apuro que contacten con mi entorno por tratarse de banca privada."
      }
    ],
    "intro": "Si el apalancamiento o un préstamo con Self Bank (ahora Singular Bank) se ha convertido en una carga que no te deja dormir, no estás solo.",
    "faqs": [
      {
        "a": "Sí, como entidad bancaria regulada por el Banco de España, sus préstamos y tarjetas están sujetos a la Ley de Segunda Oportunidad si cumples los requisitos de buena fe.",
        "q": "¿Puedo cancelar mis deudas con Self Bank mediante la Ley de Segunda Oportunidad?"
      },
      {
        "a": "No es lo habitual en perfiles de banca de inversión, pero si la deuda es cierta y el impago se prolonga, podrían incluirte en ficheros como ASNEF previo aviso legal.",
        "q": "¿Me pueden meter en una lista de morosos por una deuda con Singular Bank?"
      }
    ],
    "detail": "Aunque operan como banca privada y de inversión, productos como sus cuentas de crédito, préstamos personales o el apalancamiento en inversiones pueden generar saldos negativos difíciles de cubrir. La complejidad de sus instrumentos financieros a veces conlleva liquidaciones inesperadas que derivan en deudas que el cliente no puede afrontar con sus ingresos mensuales.",
    "origin": "Self Bank nació como la filial online de Boursorama (Société Générale) y tras su adquisición por el fondo Warburg Pincus, se integró bajo la marca Singular Bank. Actualmente es una entidad española enfocada en la gestión de patrimonios y banca privada que ofrece servicios de inversión y financiación personalizada.",
    "metaDescription": "¿Debes dinero a Self Bank o Singular Bank? Recupera tu tranquilidad. Te ayudamos a gestionar tus deudas y descubrir si puedes cancelarlas legalmente."
  },
  "revolut-bank": {
    "faqs": [
      {
        "q": "¿Se puede aplicar la Ley de la Segunda Oportunidad con Revolut?坐",
        "a": "Sí, Revolut Bank opera legalmente en España bajo licencia bancaria europea, por lo que sus deudas se pueden acoger a la Ley de la Segunda Oportunidad si cumples los requisitos de buena fe."
      },
      {
        "a": "A diferencia de otros bancos, Revolut suele gestionar las reclamaciones de forma digital; si dejas de pagar, recibirás avisos vía app y mail antes de que tu caso pase a agencias de recobro externas.",
        "q": "¿Cómo reclama Revolut los recibos que no he podido pagar?"
      }
    ],
    "origin": "Revolut nació en el Reino Unido como una 'fintech' de cambio de divisas y ha evolucionado hasta convertirse en Revolut Bank UAB, un banco con sede en Lituania que opera en toda la Unión Europea. En España, funciona con IBAN español y ofrece servicios financieros completos, estando bajo la supervisión del Banco Central Europeo.",
    "worries": [
      {
        "fear": "¿Pueden embargarme la cuenta de Revolut al ser un banco digital extranjero?坐",
        "reality": "Al operar con IBAN español (ES), Revolut está plenamente integrado en el sistema bancario nacional, por lo que un embargo solo ocurriría mediante una orden judicial previa en España."
      },
      {
        "fear": "Me da miedo que cierren mi cuenta de un día para otro y no pueda recuperar mi dinero.坐",
        "reality": "Si tienes deudas, el banco puede restringir el crédito, pero existen leyes de protección al consumidor que impiden que te dejen en desamparo total; además, tus ahorros hasta 100.000€ están protegidos por el Fondo de Garantía de Depósitos."
      }
    ],
    "intro": "Si tu cuenta de Revolut ha pasado de ser una herramienta de ahorro a una fuente de estrés por un préstamo o tarjeta que no puedes devolver, no estás solo.",
    "detail": "Sus productos 'Revolut Bank UAB', como préstamos personales y tarjetas de crédito, se contratan rápidamente desde la app, lo que a veces lleva a un sobreendeudamiento por la facilidad de acceso al crédito inmediato. Los problemas suelen surgir con las comisiones por impago y el uso de la tarjeta 'Metal' o planes superiores que, sumados a los intereses, pueden crear una bola de deuda difícil de gestionar.",
    "metaDescription": "¿Problemas para pagar tus deudas con Revolut? Descubre cómo gestionar tus préstamos, detener los intereses y recuperar tu tranquilidad financiera con Calma."
  },
  "n26": {
    "metaDescription": "¿Debes dinero a N26? Descubre cómo gestionar tus deudas con este banco digital y conoce tus derechos para cancelar tus pagos con la Ley de Segunda Oportunidad.",
    "faqs": [
      {
        "a": "Sí, aunque sea un banco digital, N26 tiene ficha bancaria en España. Si el impago persiste, pueden inscribir tus datos en ASNEF o EXPERIAN tras notificártelo.",
        "q": "¿Puede N26 incluirme en ficheros de morosidad como ASNEF?"
      },
      {
        "q": "¿Es posible cancelar una deuda con N26 mediante la Ley de Segunda Oportunidad?",
        "a": "Sí, las deudas con N26 se pueden incluir en un proceso de Ley de Segunda Oportunidad para cancelarlas o reestructurarlas legalmente junto con el resto de tus deudas."
      }
    ],
    "detail": "N26 ofrece cuentas con descubiertos autorizados y préstamos personales rápidos gestionados íntegramente desde su app, lo que facilita el acceso inmediato al crédito pero también puede llevar a un sobreendeudamiento silencioso. Al ser una entidad puramente digital, si dejas de pagar, el bloqueo de la cuenta y las comisiones de demora se activan automáticamente, dificultando la gestión de tu liquidez diaria.",
    "worries": [
      {
        "fear": "¿Me van a quitar todo el dinero que ingrese en mi cuenta de N26 sin avisar?",
        "reality": "Aunque N26 puede compensar saldos deudores con ingresos, existen límites legales inembargables (como el Salario Mínimo Interprofesional) que protegen tu subsistencia básica ante cualquier reclamación."
      },
      {
        "fear": "¿Es más difícil negociar con ellos porque no tienen oficinas físicas donde ir a reclamar?",
        "reality": "Aunque no tengan oficinas, N26 está sujeto a la normativa del Banco de España. Un proceso legal reglado, como la Segunda Oportunidad, les obliga a sentarse a negociar o aceptar la resolución judicial de la deuda."
      }
    ],
    "intro": "¿Sientes que el control de tu cuenta N26 se te ha escapado de las manos por un préstamo o un descubierto que no dejas de pagar? No dejes que las notificaciones de la app te quiten el sueño; hay opciones legales para recuperar tu tranquilidad financiera.",
    "origin": "N26 es un banco digital de origen alemán que opera en España con su propia sucursal bancaria y presencia física mínima, centrando su modelo en la banca móvil. Se ha popularizado por su sencillez para abrir cuentas y contratar productos financieros con apenas unos clics desde el smartphone."
  },
  "wizink-bank": {
    "metaDescription": "¿Atrapado con WiZink? Descubre cómo cancelar tu deuda revolving, dejar de pagar intereses abusivos y recuperar tu tranquilidad con expertos en deudas.",
    "origin": "WiZink Bank es un banco digital con presencia en España y Portugal, que nació tras la adquisición del negocio de tarjetas de Barclays y popularizó su modelo a través de Popular-e. Se centra principalmente en productos de ahorro y, sobre todo, en la comercialización de tarjetas de crédito de pago aplazado en centros comerciales y aeropuertos.",
    "intro": "¿Sientes que tu tarjeta de WiZink es un pozo sin fondo donde los intereses se comen todo tu esfuerzo? No estás solo: miles de personas en España están atrapadas en la misma espiral de deuda revolving, pero existe una salida legal definitiva.",
    "faqs": [
      {
        "a": "Sí, es posible recuperar los intereses pagados de más si se demuestra que el tipo de interés aplicado era abusivo o que no hubo transparencia en el contrato. Mucha gente ya ha conseguido cancelar su deuda pendiente y recibir una devolución.",
        "q": "¿Puedo reclamar a WiZink si ya he pagado toda mi deuda?"
      },
      {
        "a": "En absoluto. Aunque WiZink suele proponer acuerdos privados para bajar el interés, a veces estos incluyen cláusulas que te impiden reclamar en el futuro. Es mejor que analicemos tu caso antes de que firmes nada.",
        "q": "¿Estoy obligado a aceptar el acuerdo que me ofrece WiZink por teléfono?"
      }
    ],
    "worries": [
      {
        "reality": "Es el efecto 'revolving': los intereses son tan altos que la cuota mínima no cubre ni los gastos generados. Mediante la Ley de Segunda Oportunidad o la Ley de Usura, podemos pedir la nulidad de esos intereses.",
        "fear": "Siento que nunca terminaré de pagar porque mi deuda de la tarjeta incluso sube aunque no la use."
      },
      {
        "fear": "Me da pánico que llamen a mi trabajo o a mis familiares para reclamar el pago.",
        "reality": "Existen límites legales claros contra el acoso telefónico y, una vez que inicias un proceso de insolvencia o reclamación formal, las entidades deben canalizar la comunicación a través de tus representantes legales."
      }
    ],
    "detail": "Esta entidad se ha especializado en tarjetas de crédito revolving con intereses muy por encima de la media del mercado, lo que genera una deuda que apenas disminuye a pesar de pagar las cuotas mensuales. Muchas de sus reclamaciones se centran en la falta de transparencia en la contratación y en la aplicación de intereses que el Tribunal Supremo ha llegado a considerar usurarios en diversos casos."
  },
  "cooperativo-caja-rural": {
    "metaDescription": "¿Agobiado por deudas con Caja Rural? Descubre cómo solucionar tus impagos y recuperar tu estabilidad financiera con la Ley de Segunda Oportunidad. Recupera tu calma.",
    "detail": "Sus créditos personales, hipotecas y tarjetas de crédito suelen basarse en la cercanía, lo que hace que el impago genere una presión emocional mayor al ser la oficina de confianza. Sin embargo, muchas de estas operaciones incluyen comisiones por descubierto o intereses que en ocasiones han sido señalados judicialmente por su falta de transparencia.",
    "origin": "Caja Rural no es un único banco, sino un grupo de cooperativas de crédito españolas con un fuerte arraigo local y agrícola. Operan bajo una estructura de banca de proximidad, ofreciendo servicios financieros tradicionales a particulares y empresas en el ámbito rural y urbano.",
    "intro": "Si te sientes atrapado por los préstamos o tarjetas de Caja Rural, ese banco de \"toda la vida\", debes saber que recuperar tu tranquilidad financiera es un derecho legal.",
    "worries": [
      {
        "reality": "La gestión de deudas en mora suele derivarse a departamentos centrales o externos, por lo que tu situación será tratada con profesionalidad y fuera del trato diario de la oficina local.",
        "fear": "Me da vergüenza que los empleados de mi oficina de siempre sepan que no puedo pagar."
      },
      {
        "fear": "Al ser una cooperativa, ¿son más agresivos para recuperar el dinero que otros bancos?",
        "reality": "Se rigen por la misma normativa bancaria y judicial que cualquier banco central; no tienen poderes especiales y el proceso de reclamación debe respetar siempre tus derechos legales.坐支"
      }
    ],
    "faqs": [
      {
        "a": "Sí, es posible negociar una reestructuración o acogerte a la Ley de Segunda Oportunidad para cancelar la deuda si cumples los requisitos de insolvencia y buena fe.",
        "q": "¿Puedo eliminar legalmente mi deuda con Caja Rural si no puedo pagar?坐支"
      },
      {
        "q": "¿Me van a quitar mi sueldo directamente si dejo de pagar una cuota?",
        "a": "No es inmediato; Caja Rural debe iniciar un proceso judicial de ejecución y ser un juez quien ordene el embargo de la parte proporcional de tu nómina tras analizar tu situación."
      }
    ]
  }
};

export const getEntityProfile = (slug?: string): EntityProfile | undefined =>
  slug ? entityProfiles[slug] : undefined;
