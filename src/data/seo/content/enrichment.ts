import type { MoneyContent, MoneyExtraSection } from "./types";

type Enrichment = Pick<NonNullable<MoneyContent["interactive"]>, "conceptGlossary" | "mythVsReality"> & { faq?: MoneyContent["faq"]; extraSections?: MoneyExtraSection[] };

export const enrichmentByPath: Record<string, Enrichment> = {
  "/ley-segunda-oportunidad": {
    faq: [
      { q: "¿Qué requisitos de conducta debo cumplir para que se considere que actúo de buena fe?", a: "Básicamente, no haber sido condenado por delitos económicos en los últimos 10 años y no haber rechazado ofertas de empleo adecuadas a tu perfil en situaciones específicas antes del proceso.", plain: "Básicamente, no haber sido condenado por delitos económicos en los últimos 10 años y no haber rechazado ofertas de empleo adecuadas a tu perfil en situaciones específicas antes del proceso." },
      { q: "¿Es obligatorio tener bienes para solicitar la Ley de Segunda Oportunidad?", a: "No, puedes acogerte aunque no tengas ninguna propiedad o nómina; es lo que se conoce técnicamente como concurso sin masa, simplificando mucho el trámite.", plain: "No, puedes acogerte aunque no tengas ninguna propiedad o nómina; es lo que se conoce técnicamente como concurso sin masa, simplificando mucho el trámite." },
      { q: "¿Qué ocurre con las llamadas de acoso de los cobradores durante el proceso?", a: "Una vez presentada la solicitud en el juzgado, los acreedores tienen legalmente prohibido continuar con cualquier acción de reclamación o acoso telefónico hacia ti.", plain: "Una vez presentada la solicitud en el juzgado, los acreedores tienen legalmente prohibido continuar con cualquier acción de reclamación o acoso telefónico hacia ti." },
      { q: "¿Puedo pedir tarjetas o préstamos después de obtener la cancelación de deudas?", a: "Sí, una vez que el juez dicta la resolución, tienes derecho a desaparecer de los ficheros de morosidad como ASNEF, lo que te permite recuperar tu solvencia ante los bancos.", plain: "Sí, una vez que el juez dicta la resolución, tienes derecho a desaparecer de los ficheros de morosidad como ASNEF, lo que te permite recuperar tu solvencia ante los bancos." },
      { q: "¿Necesito tener muchas deudas para poder empezar el trámite?", a: "No hay un mínimo legal, pero sí debes demostrar que te encuentras en estado de insolvencia y que tienes deudas con, al menos, dos acreedores distintos (bancos, proveedores, administración, etc.).", plain: "No hay un mínimo legal, pero sí debes demostrar que te encuentras en estado de insolvencia y que tienes deudas con, al menos, dos acreedores distintos (bancos, proveedores, administración, etc.)." },
      { q: "¿Se detienen los embargos sobre mi nómina inmediatamente?", a: "Sí, uno de los mayores beneficios es que el juzgado ordena la paralización de las ejecuciones y embargos en curso mientras se resuelve tu caso.", plain: "Sí, uno de los mayores beneficios es que el juzgado ordena la paralización de las ejecuciones y embargos en curso mientras se resuelve tu caso." },
      { q: "¿Tengo que ir a juicio o declarar ante un juez?", a: "En la gran mayoría de los casos el proceso es estrictamente documental y por escrito; no suele ser necesaria una vista presencial ni interrogatorios.", plain: "En la gran mayoría de los casos el proceso es estrictamente documental y por escrito; no suele ser necesaria una vista presencial ni interrogatorios." },
      { q: "¿Qué pasa si mis deudas con Hacienda o la Seguridad Social superan los 10.000 euros?", a: "La ley permite cancelar un máximo de 10.000 euros por cada organismo; el resto de la deuda pública deberá incluirse en un plan de pagos fraccionado según tu capacidad real.", plain: "La ley permite cancelar un máximo de 10.000 euros por cada organismo; el resto de la deuda pública deberá incluirse en un plan de pagos fraccionado según tu capacidad real." },
    ],
    conceptGlossary: {
      title: "Diccionario básico para tu tranquilidad",
      subtitle: "Entiende los términos legales de la Ley de Segunda Oportunidad sin complicaciones.",
      terms: [
        { term: "EPI (Exoneración del Pasivo Insatisfecho)", definition: "Es el nombre legal del perdón de las deudas; la resolución judicial que certifica que ya no tienes que pagar lo que debías." },
        { term: "Insolvencia inminente", definition: "Situación en la que todavía estás al día con tus pagos, pero sabes con certeza que en los próximos meses no podrás afrontarlos." },
        { term: "Masa activa", definition: "Es el conjunto de todos tus bienes y derechos (casa, coche, cuentas bancarias) que pueden ser usados para saldar parte de la deuda." },
        { term: "Plan de pagos", definition: "Una alternativa propuesta para pagar una parte pequeña de tus deudas en cuotas de 3 a 5 años, permitiéndote conservar bienes importantes como tu casa." },
        { term: "Administrador concursal", definition: "Un profesional designado por el juez para supervisar tus cuentas y bienes durante el proceso, asegurando que todo sea transparente." },
      ],
    },
    mythVsReality: {
      title: "Verdades y mentiras sobre la cancelación de deudas",
      subtitle: "Desmontamos los bulos más comunes sobre la Ley de Segunda Oportunidad en España.",
      items: [
        { myth: "“Es un proceso solo para grandes empresarios o autónomos que han quebrado”", reality: "Cualquier persona física, incluyendo empleados por cuenta ajena, pensionistas o desempleados, puede utilizar esta ley para limpiar sus deudas." },
        { myth: "“Tardaré toda la vida en volver a tener una cuenta corriente o tarjeta”", reality: "Al finalizar el proceso y salir de los ficheros de morosidad, recuperas tu libertad financiera para contratar servicios y productos bancarios como cualquier otro ciudadano." },
        { myth: "“Si elijo el plan de pagos, tendré que vivir en la miseria absoluta”", reality: "El plan de pagos se diseña garantizando siempre que mantengas ingresos suficientes para cubrir tus necesidades básicas y las de tu familia (alquiler, comida, suministros)." },
        { myth: "“Mis deudas me perseguirán hasta la muerte si no puedo pagar nada”", reality: "La ley existe precisamente para evitar deudas perpetuas; si cumples los requisitos de buena fe, el juez puede cancelar legalmente aquello que es imposible que pagues." },
      ],
    },
    extraSections: [
      {
            "title": "La Deuda Pública: Límites con Hacienda y Seguridad Social",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Uno de los cambios más importantes es el tratamiento de las deudas públicas. A diferencia de las deudas bancarias, que pueden cancelarse al 100%, las contraídas con la **Agencia Tributaria** y la **Seguridad Social** tienen un límite legal."
                  },
                  {
                        "kind": "table",
                        "headers": [
                              "Tramo de Deuda",
                              "Capacidad de Cancelación"
                        ],
                        "rows": [
                              [
                                    "Primeros 5.000 €",
                                    "Cancelación del 100%"
                              ],
                              [
                                    "Desde 5.001 € hasta 10.000 €",
                                    "Cancelación del 50%"
                              ],
                              [
                                    "Exceso sobre 10.000 €",
                                    "No exonerable (se incluye en plan de pagos)"
                              ]
                        ]
                  },
                  {
                        "kind": "keyCallout",
                        "headline": "Hasta 20.000 € de ahorro",
                        "body": "Sumando los límites de ambos organismos, puedes eliminar hasta 20.000 € de deuda pública mediante este procedimiento legal."
                  },
                  {
                        "kind": "actionLink",
                        "to": "/deudas-hacienda-seguridad-social/deudas-hacienda",
                        "text": "Más sobre cancelar deudas con Hacienda"
                  }
            ]
      },
      {
            "title": "Deudas que la Ley NO permite borrar",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Aunque la Ley de Segunda Oportunidad es muy potente, el legislador protege ciertos derechos que no pueden ser cancelados bajo ninguna circunstancia."
                  },
                  {
                        "kind": "checkList",
                        "variant": "cross",
                        "items": [
                              "Pensiones de alimentos por hijos o familiares.",
                              "Responsabilidad civil por delitos o daños personales (lesiones).",
                              "Multas en procesos penales o sanciones administrativas muy graves.",
                              "Deudas por accidentes de trabajo.",
                              "Costas judiciales generadas por el propio proceso de segunda oportunidad."
                        ]
                  },
                  {
                        "kind": "callout",
                        "variant": "warning",
                        "text": "La parte de la hipoteca que no se cubra con el valor del inmueble sí puede llegar a cancelarse, pero el préstamo principal mientras mantengas la vivienda sigue vigente."
                  }
            ]
      },
      {
            "title": "Agilidad tras la Reforma de 2022",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "La nueva normativa ha simplificado drásticamente el proceso eliminando costes y pasos que antes eran obligatorios, como el Acuerdo Extrajudicial de Pagos."
                  },
                  {
                        "kind": "optionCards",
                        "columns": 2,
                        "items": [
                              {
                                    "icon": "ban",
                                    "title": "Adiós a Notarios y Mediadores",
                                    "text": "Ya no es necesario acudir a notaría ni contratar a un mediador concursal, lo que supone un ahorro directo de hasta 1.500 € en gastos de gestión."
                              },
                              {
                                    "icon": "sparkles",
                                    "title": "Trámite Directo",
                                    "text": "El proceso es ahora 100% judicial desde el primer día, lo que permite acortar los plazos de resolución en casos sin bienes."
                              }
                        ]
                  }
            ]
      },
      {
            "title": "Documentación y Revocación del proceso",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Para iniciar el camino necesitamos acreditar tu situación de insolvencia y tu buena fe ante el juzgado con documentación oficial."
                  },
                  {
                        "kind": "checkList",
                        "variant": "check",
                        "items": [
                              "Certificados de antecedentes penales.",
                              "Listado exhaustivo de acreedores y cuantías.",
                              "Inventario de bienes y derechos (nóminas, coches, propiedades).",
                              "Certificados de deuda con AEAT y Tesorería."
                        ]
                  },
                  {
                        "kind": "callout",
                        "variant": "info",
                        "title": "Vigilancia de 5 años",
                        "text": "La cancelación es efectiva desde la sentencia, pero los acreedores pueden pedir su revocación si en los siguientes 5 años mejoras de fortuna notablemente (herencias o loterías) o si se demuestra que ocultaste bienes."
                  }
            ]
      },
      {
            "title": "Plazos de reentrada: ¿Se puede usar dos veces?",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Si ya has pasado por este proceso anteriormente y la vida te ha vuelto a poner en una situación difícil, debes conocer los tiempos de espera legales para volver a solicitarlo."
                  },
                  {
                        "kind": "factGrid",
                        "columns": 2,
                        "items": [
                              {
                                    "value": "2 años",
                                    "label": "Tras Plan de Pagos",
                                    "detail": "Si la primera vez lograste la exoneración mediante un calendario de pagos."
                              },
                              {
                                    "value": "5 años",
                                    "label": "Tras Liquidación",
                                    "detail": "Si la primera vez entregaste tus bienes para cancelar las deudas."
                              }
                        ]
                  },
                  {
                        "kind": "actionLink",
                        "to": "/abogados-ley-segunda-oportunidad",
                        "text": "Consultar con un abogado experto"
                  }
            ]
      }
],
  },
  "/abogados-ley-segunda-oportunidad": {
    faq: [
      { q: "¿Qué requisitos debo cumplir para ser considerado deudor de buena fe?", a: "Significa no haber sido condenado por delitos económicos en los últimos 10 años y no haber ocultado bienes ni aportado información falsa sobre tu situación financiera durante el proceso.", plain: "Significa no haber sido condenado por delitos económicos en los últimos 10 años y no haber ocultado bienes ni aportado información falsa sobre tu situación financiera durante el proceso." },
      { q: "¿Puedo paralizar los embargos de mi nómina antes de la sentencia final?", a: "Sí, una vez que el abogado presenta la demanda en el juzgado y se admite a trámite, los embargos en curso se detienen y no se pueden iniciar otros nuevos contra tu patrimonio.", plain: "Sí, una vez que el abogado presenta la demanda en el juzgado y se admite a trámite, los embargos en curso se detienen y no se pueden iniciar otros nuevos contra tu patrimonio." },
      { q: "¿Qué deudas no se pueden cancelar con esta ley?", a: "Quedan fuera de la exoneración las deudas por pensiones de alimentos a hijos, las multas por infracciones penales y las deudas derivadas de responsabilidad civil extracontractual.", plain: "Quedan fuera de la exoneración las deudas por pensiones de alimentos a hijos, las multas por infracciones penales y las deudas derivadas de responsabilidad civil extracontractual." },
      { q: "¿Cómo funciona la cancelación de deudas con Hacienda y Seguridad Social?", a: "La ley permite cancelar un máximo de 10.000 € de deuda con la AEAT y otros 10.000 € con la Seguridad Social. Los primeros 5.000 € de cada una se perdonan íntegramente, y el resto hasta el límite al 50 %.", plain: "La ley permite cancelar un máximo de 10.000 € de deuda con la AEAT y otros 10.000 € con la Seguridad Social. Los primeros 5.000 € de cada una se perdonan íntegramente, y el resto hasta el límite al 50 %." },
      { q: "¿Tengo que ir a juicio o declarar ante un juez?", a: "En la mayoría de los casos actuales tras la reforma de 2022, el proceso es documental y no requiere que asistas a una vista presencial, gestionándose todo a través de tu abogado y procurador.", plain: "En la mayoría de los casos actuales tras la reforma de 2022, el proceso es documental y no requiere que asistas a una vista presencial, gestionándose todo a través de tu abogado y procurador." },
      { q: "¿Puedo pedir un préstamo después de acogerme a la Segunda Oportunidad?", a: "Legalmente sí, ya que una vez obtenida la sentencia, tienes derecho a desaparecer de los ficheros de morosidad, lo que recupera tu capacidad crediticia y solvencia ante los bancos.", plain: "Legalmente sí, ya que una vez obtenida la sentencia, tienes derecho a desaparecer de los ficheros de morosidad, lo que recupera tu capacidad crediticia y solvencia ante los bancos." },
      { q: "¿Qué ocurre si no tengo ningún bien a mi nombre?", a: "Se tramita mediante un concurso sin masa, la vía más rápida y económica. El juez dicta la cancelación de las deudas directamente al comprobar que no hay activos que liquidar.", plain: "Se tramita mediante un concurso sin masa, la vía más rápida y económica. El juez dicta la cancelación de las deudas directamente al comprobar que no hay activos que liquidar." },
      { q: "¿Cada cuánto tiempo se puede solicitar este beneficio legal?", a: "Puedes acogerte a la Ley de Segunda Oportunidad cada 10 años si obtuviste una exoneración definitiva, o cada 5 años si seguiste un plan de pagos previo.", plain: "Puedes acogerte a la Ley de Segunda Oportunidad cada 10 años si obtuviste una exoneración definitiva, o cada 5 años si seguiste un plan de pagos previo." },
    ],
    conceptGlossary: {
      title: "Diccionario para tu libertad financiera",
      subtitle: "Conceptos clave para entender tu proceso sin complicaciones legales.",
      terms: [
        { term: "EPI", definition: "Siglas de Exoneración del Pasivo Insatisfecho. Es el auto judicial que perdona tus deudas de forma oficial y definitiva." },
        { term: "Concurso sin masa", definition: "Procedimiento acelerado que se utiliza cuando el deudor no tiene bienes, ahorros o propiedades de valor para pagar a sus acreedores." },
        { term: "Pasivo exonerable", definition: "Es el conjunto de deudas que, según la normativa española actual, pueden ser canceladas legalmente por el juez." },
        { term: "Ficheros de morosidad", definition: "Listados como ASNEF o Badexcug donde las empresas anotan a quienes deben dinero; la sentencia de esta ley obliga a borrar tus datos de ellos." },
        { term: "Administrador Concursal", definition: "Profesional designado por el juez en ciertos casos para revisar la documentación y gestionar la liquidación de bienes si los hubiera." },
      ],
    },
    mythVsReality: {
      title: "Verdades y mentiras sobre la Segunda Oportunidad",
      subtitle: "No dejes que el miedo o la desinformación te impidan empezar de cero.",
      items: [
        { myth: "“Si me acojo a la ley, perderé mi casa de forma obligatoria”", reality: "Es falso. Si el valor de la hipoteca es mayor que el valor de la casa o si se acuerda un plan de pagos, puedes conservar tu vivienda habitual." },
        { myth: "“Es un proceso solo para empresas y autónomos en quiebra”", reality: "Cualquier persona física, incluidos asalariados, desempleados y pensionistas, puede solicitarlo si no puede pagar sus préstamos o tarjetas." },
        { myth: "“Tus deudas desaparecen pero tus avalistas tendrán que pagarlas”", reality: "La exoneración es personal. Sin embargo, existen estrategias legales para proteger a los avalistas o que ellos también inicien su propio proceso si es necesario." },
        { myth: "“Es un proceso muy caro que no me puedo permitir”", reality: "En Calma adaptamos los pagos del proceso a tu situación actual. El ahorro final de cancelar tus deudas compensa con creces la inversión en tu tranquilidad futura." },
      ],
    },
    extraSections: [
      {
            "title": "Marco Legal: El derecho a empezar de cero",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "La Ley de Segunda Oportunidad no es un invento reciente, sino un derecho consolidado en el **Texto Refundido de la Ley Concursal** (tras la reforma clave de la Ley 16/2022). Este mecanismo legal permite que particulares y autónomos insolventes soliciten el perdón de sus deudas ante el juez."
                  },
                  {
                        "kind": "factGrid",
                        "columns": 2,
                        "items": [
                              {
                                    "value": "Ley 16/2022",
                                    "label": "Última reforma",
                                    "detail": "Agiliza los plazos y elimina costes notariales."
                              },
                              {
                                    "value": "Insolvencia",
                                    "label": "Estado necesario",
                                    "detail": "Ya sea actual o inminente (previsión de impago)."
                              }
                        ]
                  }
            ]
      },
      {
            "title": "Las dos vías para cancelar tus deudas",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Dependiendo de tu situación patrimonial, tu abogado diseñará una estrategia basada en una de estas dos modalidades de Exoneración del Pasivo Insatisfecho (EPI):"
                  },
                  {
                        "kind": "optionCards",
                        "columns": 2,
                        "items": [
                              {
                                    "icon": "sparkles",
                                    "title": "Exoneración con liquidación",
                                    "text": "Ideal si no tienes bienes o estos carecen de valor. Se solicita el perdón directo de las deudas (concurso sin masa)."
                              },
                              {
                                    "icon": "shield",
                                    "title": "Plan de Pagos",
                                    "text": "Permite proteger tu vivienda habitual o herramientas de trabajo a cambio de un plan de pagos de 3 a 5 años.",
                                    "links": [
                                          {
                                                "to": "/ley-segunda-oportunidad/exoneracion-pasivo-insatisfecho",
                                                "label": "Saber más sobre el EPI"
                                          }
                                    ]
                              }
                        ]
                  }
            ]
      },
      {
            "title": "Qué deudas se eliminan (y cuáles no)",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Aunque la Ley permite cancelar la gran mayoría de deudas, existen límites legales que tu abogado debe gestionar, especialmente con las administraciones públicas."
                  },
                  {
                        "kind": "table",
                        "headers": [
                              "Tipo de Deuda",
                              "¿Es cancelable?"
                        ],
                        "rows": [
                              [
                                    "Préstamos, tarjetas y microcréditos",
                                    "Sí, al 100%"
                              ],
                              [
                                    "Hacienda y Seguridad Social",
                                    "Hasta 10.000 € por organismo"
                              ],
                              [
                                    "Pensiones de alimentos y multas penales",
                                    "No, por ley"
                              ],
                              [
                                    "Hipotecas (deuda sobrante tras subasta)",
                                    "Sí, el resto pendiente"
                              ]
                        ]
                  },
                  {
                        "kind": "actionLink",
                        "to": "/deudas-hacienda-seguridad-social/deudas-hacienda",
                        "text": "Consultar límites de deuda con Hacienda"
                  }
            ]
      },
      {
            "title": "Requisitos de Buena Fe: El estándar judicial",
            "blocks": [
                  {
                        "kind": "callout",
                        "variant": "info",
                        "text": "Para que un juez dicte el auto de exoneración, debe quedar acreditado que el deudor es de buena fe."
                  },
                  {
                        "kind": "checkList",
                        "variant": "check",
                        "items": [
                              "No haber sido condenado por delitos patrimoniales o contra Hacienda en los últimos 10 años.",
                              "Colaborar activamente con el juzgado y el administrador concursal.",
                              "No haber facilitado información falsa sobre tu situación económica.",
                              "No haber obtenido otra exoneración en los últimos 2 a 5 años."
                        ]
                  }
            ]
      },
      {
            "title": "Efectos inmediatos de iniciar el proceso",
            "blocks": [
                  {
                        "kind": "keyCallout",
                        "headline": "Tu tranquilidad empieza con la demanda",
                        "body": "Desde el mismo momento en que tu abogado presenta la solicitud en el juzgado mercantil, tu situación cambia legalmente."
                  },
                  {
                        "kind": "optionCards",
                        "columns": 3,
                        "items": [
                              {
                                    "icon": "ban",
                                    "title": "Adiós embargos",
                                    "text": "Se paralizan ejecuciones judiciales y embargos de nómina."
                              },
                              {
                                    "icon": "phone-off",
                                    "title": "Cese de acoso",
                                    "text": "Las agencias de recobro ya no pueden llamarte legalmente."
                              },
                              {
                                    "icon": "lock",
                                    "title": "Sin intereses",
                                    "text": "Se detiene el devengo de nuevos intereses y recargos de tus deudas."
                              }
                        ]
                  },
                  {
                        "kind": "actionLink",
                        "to": "/embargos/parar-embargo",
                        "text": "Cómo parar un embargo legalmente"
                  }
            ]
      },
      {
            "title": "Plazos y salida de ficheros (ASNEF)",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Un proceso de Segunda Oportunidad suele durar de **6 a 18 meses**. Una vez el juez firma el Auto de Exoneración (EPI), el último paso es limpiar tu historial crediticio."
                  },
                  {
                        "kind": "checkList",
                        "variant": "check",
                        "items": [
                              "Comunicación del auto judicial a los ficheros de morosidad.",
                              "Borrado obligatorio de datos en ASNEF, RAI y Equifax.",
                              "Recuperación de la capacidad para contratar suministros o financiación."
                        ]
                  },
                  {
                        "kind": "actionLink",
                        "to": "/asnef/salir-de-asnef",
                        "text": "Guía para salir de ASNEF tras el juicio"
                  }
            ]
      },
      {
            "title": "La Tercera Oportunidad",
            "blocks": [
                  {
                        "kind": "callout",
                        "variant": "info",
                        "title": "¿Se puede usar el mecanismo más de una vez?",
                        "text": "Sí. La ley permite una nueva exoneración tras el paso de un tiempo determinado (normalmente 10 años), siempre que la nueva insolvencia sea de nuevo fruto de la buena fe y causas sobrevenidas."
                  }
            ]
      }
],
  },
  "/cancelar-deudas": {
    faq: [
      { q: "¿Qué ocurre si mis deudas han sido vendidas a un fondo buitre?", a: "Tu derecho a cancelar deudas se mantiene intacto independientemente de quién sea el dueño actual. Estas entidades suelen comprar paquetes de deuda por un valor muy inferior al real, lo que a veces facilita la negociación de una quita.", plain: "Tu derecho a cancelar deudas se mantiene intacto independientemente de quién sea el dueño actual. Estas entidades suelen comprar paquetes de deuda por un valor muy inferior al real, lo que a veces facilita la negociación de una quita." },
      { q: "¿Puedo conservar mi vivienda habitual al acogerme a la Ley de Segunda Oportunidad?", a: "Sí, es posible siempre que el valor de la hipoteca sea similar al de mercado y las cuotas se mantengan al día. La ley actual permite planes de pagos que protegen el patrimonio esencial del deudor.", plain: "Sí, es posible siempre que el valor de la hipoteca sea similar al de mercado y las cuotas se mantengan al día. La ley actual permite planes de pagos que protegen el patrimonio esencial del deudor." },
      { q: "¿Existe algún límite de tiempo para que una deuda deje de ser exigible?", a: "En España, la mayoría de las deudas personales prescriben a los 5 años según el Código Civil, siempre que el acreedor no haya realizado una reclamación oficial durante ese periodo.", plain: "En España, la mayoría de las deudas personales prescriben a los 5 años según el Código Civil, siempre que el acreedor no haya realizado una reclamación oficial durante ese periodo." },
      { q: "¿Es posible eliminar deudas con Hacienda o la Seguridad Social?", a: "Sí, la normativa permite cancelar hasta un máximo de 10.000 euros con la AEAT y otros 10.000 euros con la Seguridad Social. El resto del importe debe abonarse mediante un plan de pagos fraccionado.", plain: "Sí, la normativa permite cancelar hasta un máximo de 10.000 euros con la AEAT y otros 10.000 euros con la Seguridad Social. El resto del importe debe abonarse mediante un plan de pagos fraccionado." },
      { q: "¿Qué es el Método Avalancha y cómo ayuda a ahorrar?", a: "Consiste en priorizar el pago de la deuda con el tipo de interés más alto mientras mantienes el mínimo en el resto. Es la vía técnica más eficiente para pagar menos intereses totales a largo plazo.", plain: "Consiste en priorizar el pago de la deuda con el tipo de interés más alto mientras mantienes el mínimo en el resto. Es la vía técnica más eficiente para pagar menos intereses totales a largo plazo." },
      { q: "¿Cómo me protege la ley frente al acoso de los cobradores?", a: "La ley española prohíbe prácticas que vulneren la dignidad o la intimidad del deudor, como llamadas en horarios intempestivos o informar a terceros. Iniciar un proceso legal de cancelación suele detener estas comunicaciones de forma inmediata.", plain: "La ley española prohíbe prácticas que vulneren la dignidad o la intimidad del deudor, como llamadas en horarios intempestivos o informar a terceros. Iniciar un proceso legal de cancelación suele detener estas comunicaciones de forma inmediata." },
      { q: "¿Qué cantidad mínima debo ahorrar antes de empezar a pagar deudas?", a: "Se recomienda crear un micro-fondo de emergencia de entre 500€ y 1.000€. Esto evita que cualquier imprevisto, como una avería doméstica, te obligue a pedir un nuevo préstamo y romper tu plan de cancelación.", plain: "Se recomienda crear un micro-fondo de emergencia de entre 500€ y 1.000€. Esto evita que cualquier imprevisto, como una avería doméstica, te obligue a pedir un nuevo préstamo y romper tu plan de cancelación." },
      { q: "¿Puedo salir de los ficheros de morosos como ASNEF antes de pagar todo?", a: "Al iniciar un procedimiento de Segunda Oportunidad o demostrar que la deuda está siendo disputada judicialmente, tienes derecho a solicitar la baja cautelar de tus datos en estos registros.", plain: "Al iniciar un procedimiento de Segunda Oportunidad o demostrar que la deuda está siendo disputada judicialmente, tienes derecho a solicitar la baja cautelar de tus datos en estos registros." },
    ],
    conceptGlossary: {
      title: "Diccionario para entender tus deudas",
      subtitle: "Conceptos clave explicados de forma sencilla para recuperar tu libertad financiera.",
      terms: [
        { term: "EPI (Exoneración del Pasivo Insatisfecho)", definition: "Es el nombre legal del perdón de las deudas. Es el auto judicial que dicta que ya no tienes que pagar aquello que no pudiste afrontar." },
        { term: "Quita", definition: "Acuerdo entre tú y el banco para reducir el total que debes a cambio de un compromiso de pago. Básicamente, una rebaja de tu deuda." },
        { term: "Fondo Buitre", definition: "Empresas de inversión que compran deudas impagadas a los bancos por poco dinero para luego intentar cobrarlas por el total al usuario." },
        { term: "Prescripción", definition: "El plazo legal tras el cual un acreedor pierde el derecho a reclamar una deuda por vía judicial si no lo ha hecho por escrito antes." },
        { term: "Mínimo Vital", definition: "Cantidad de dinero de tus ingresos que es inembargable y que la ley protege para que puedas cubrir tus necesidades básicas como alimentación o vivienda." },
      ],
    },
    mythVsReality: {
      title: "Verdades y mentiras sobre cancelar deudas",
      subtitle: "No dejes que el miedo o la falta de información te impidan empezar de cero.",
      items: [
        { myth: "“Si me declaro insolvente, nunca más podré pedir un préstamo.”", reality: "Falso. Tras el proceso y salir de los ficheros de morosos, tu capacidad crediticia se recupera progresivamente. Eres un perfil más seguro sin deudas que uno sobreendeudado." },
        { myth: "“Para cancelar deudas por ley tengo que perderlo todo.”", reality: "No es cierto. La reforma de la Ley de Segunda Oportunidad permite mantener la vivienda y bienes de trabajo mediante un plan de pagos ajustado a tu realidad." },
        { myth: "“Las deudas se heredan siempre y no hay forma de evitarlo.”", reality: "Existen mecanismos como la aceptación a beneficio de inventario, que permite que las deudas se paguen solo con los bienes de la herencia sin afectar a tu patrimonio personal." },
        { myth: "“Solo las empresas pueden acogerse a la Ley de Segunda Oportunidad.”", reality: "Realidad: Está diseñada específicamente para particulares y autónomos que actúan de buena fe y no tienen antecedentes por delitos económicos." },
      ],
    },
    extraSections: [
      {
            "title": "Antes de empezar: Control financiero básico",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Para **cancelar deudas** de forma definitiva, el primer paso no es legal, sino analítico. Necesitas un mapa real de tu economía para saber qué vía de escape es viable."
                  },
                  {
                        "kind": "factGrid",
                        "columns": 2,
                        "items": [
                              {
                                    "value": "Gastos Fijos",
                                    "label": "Supervivencia",
                                    "detail": "Vivienda, suministros, seguros y alimentación básica."
                              },
                              {
                                    "value": "Gastos Variables",
                                    "label": "Prescindibles",
                                    "detail": "Suscripciones, ocio y consumos hormiga que puedes recortar."
                              }
                        ]
                  },
                  {
                        "kind": "keyCallout",
                        "headline": "El Fondo de Emergencia de Rescate",
                        "body": "Antes de destinar cada euro a las deudas, intenta ahorrar un pequeño colchón de entre 500 € y 1.000 €. Esto evita que cualquier imprevisto (avería del coche o urgencia médica) te obligue a pedir un nuevo microcrédito."
                  }
            ]
      },
      {
            "title": "Estrategias de pago para deudas pequeñas o manejables",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Si aún tienes solvencia pero sientes que pierdes el control, existen dos métodos psicológicos y financieros para acelerar la limpieza de tus cuentas:"
                  },
                  {
                        "kind": "optionCards",
                        "columns": 2,
                        "items": [
                              {
                                    "icon": "sparkles",
                                    "title": "Método Bola de Nieve",
                                    "text": "Paga el mínimo de todas tus deudas excepto la más pequeña. Liquídala cuanto antes para ganar motivación emocional y suma ese dinero a la siguiente."
                              },
                              {
                                    "icon": "scale",
                                    "title": "Método Avalancha",
                                    "text": "Ataca primero la deuda con el tipo de interés (TAE) más alto. Matemáticamente es lo más eficiente porque ahorras más dinero en intereses a largo plazo."
                              }
                        ]
                  }
            ]
      },
      {
            "title": "Consolidación y tarjetas de transferencia: ¿Cuándo funcionan?",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Si tu historial crediticio aún es bueno, puedes intentar agrupar deudas antes de que la situación sea crítica."
                  },
                  {
                        "kind": "checkList",
                        "variant": "check",
                        "items": [
                              "Préstamos de consolidación: Unificar todo en una sola cuota con un interés menor al promedio actual.",
                              "Transferencia de saldo (0% TAE): Mover deuda de tarjetas caras a una nueva con interés promocional (suele durar 12-18 meses).",
                              "Mejor que endeudarte de nuevo: con la [reunificación de deudas](/reunificar-deudas) negociamos tu deuda actual para bajar cuota y total, sin pedir un crédito nuevo ni poner tu vivienda como garantía."
                        ]
                  },
                  {
                        "kind": "callout",
                        "variant": "warning",
                        "title": "Riesgo de las tarjetas",
                        "text": "Las tarjetas de transferencia suelen aplicar una comisión de apertura (3-5%). Si no liquidas el total antes de que acabe la promoción, el interés puede dispararse por encima del 20%."
                  }
            ]
      },
      {
            "title": "La negociación directa y sus riesgos reales",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Hablar con el banco antes del impago puede abrir puertas, pero debes conocer las consecuencias de cada pacto."
                  },
                  {
                        "kind": "table",
                        "headers": [
                              "Opción",
                              "Efecto Real"
                        ],
                        "rows": [
                              [
                                    "Carencia",
                                    "Solo pagas intereses durante unos meses; la deuda total no baja."
                              ],
                              [
                                    "Quita (vía privada)",
                                    "Acuerdas pagar una parte y que te perdonen el resto. Suele manchar tu historial crediticio."
                              ],
                              [
                                    "Ampliación de plazo",
                                    "Baja la cuota mensual, pero terminarás pagando mucho más dinero en intereses totales."
                              ]
                        ]
                  },
                  {
                        "kind": "actionLink",
                        "to": "/juicio-monitorio-recobro/juicio-monitorio-deuda",
                        "text": "Qué hacer si la negociación falla y recibes una demanda"
                  }
            ]
      },
      {
            "title": "Tus derechos frente al acoso y la prescripción",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "La ley protege tu dignidad y establece límites temporales a la reclamación de deudas."
                  },
                  {
                        "kind": "keyCallout",
                        "headline": "Protección contra el recobro",
                        "body": "Ninguna agencia puede acosarte, llamar a tus vecinos o contactarte en horarios intempestivos. Estas prácticas son denunciables."
                  },
                  {
                        "kind": "callout",
                        "variant": "info",
                        "title": "Prescripción de deudas",
                        "text": "En España, la mayoría de préstamos personales prescriben a los 5 años (según el Código Civil). Sin embargo, cualquier reclamación judicial o reconocimiento de deuda por tu parte 'pone a cero' el contador."
                  }
            ]
      },
      {
            "title": "Cómo detectar estafas en la reparación de deuda",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "No todas las empresas que prometen 'ayuda' son legítimas. Sospecha siempre si detectas estas señales:"
                  },
                  {
                        "kind": "checkList",
                        "variant": "cross",
                        "items": [
                              "Te piden cuotas de gestión elevadas antes de analizar tu caso o presupuesto.",
                              "Prometen borrarte de ASNEF por arte de magia sin pagar la deuda ni iniciar un proceso legal.",
                              "Dicen ser un 'servicio oficial del Gobierno' para cancelar tarjetas.",
                              "Te aconsejan dejar de pagar sin explicarte el riesgo de embargo de nómina."
                        ]
                  },
                  {
                        "kind": "actionLink",
                        "to": "/asnef/salir-de-asnef",
                        "text": "Aprende la vía legal para salir de ficheros de morosos"
                  }
            ]
      }
],
  },
  "/cancelacion-de-deudas": {
    faq: [
      { q: "¿Qué sucede con mis avalistas tras la cancelación de deudas?", a: "Si tus familiares o amigos avalaron tus préstamos, ellos siguen siendo responsables ante el banco a menos que también se acojan al proceso. No obstante, en Calma analizamos cada caso para proteger tu círculo cercano.", plain: "Si tus familiares o amigos avalaron tus préstamos, ellos siguen siendo responsables ante el banco a menos que también se acojan al proceso. No obstante, en Calma analizamos cada caso para proteger tu círculo cercano." },
      { q: "¿Puedo mantener mi coche si inicio el proceso?", a: "Sí, es posible conservarlo si el vehículo es imprescindible para tu actividad profesional o si su valor de venta es tan bajo que no compensa liquidarlo para pagar a los acreedores.", plain: "Sí, es posible conservarlo si el vehículo es imprescindible para tu actividad profesional o si su valor de venta es tan bajo que no compensa liquidarlo para pagar a los acreedores." },
      { q: "¿Qué ocurre con los embargos que ya tengo en mi nómina?", a: "En cuanto el juzgado admite a trámite tu solicitud de cancelación de deudas, los embargos activos se paralizan de forma inmediata. Esto te permite recuperar liquidez para tus gastos básicos desde el primer momento.", plain: "En cuanto el juzgado admite a trámite tu solicitud de cancelación de deudas, los embargos activos se paralizan de forma inmediata. Esto te permite recuperar liquidez para tus gastos básicos desde el primer momento." },
      { q: "¿Existe un límite máximo de dinero para poder acogerme a la ley?", a: "El límite legal en España está fijado en 5 millones de euros de deuda total. Si tu deuda es inferior a esa cifra y eres un particular o autónomo, cumples este criterio de cuantía.", plain: "El límite legal en España está fijado en 5 millones de euros de deuda total. Si tu deuda es inferior a esa cifra y eres un particular o autónomo, cumples este criterio de cuantía." },
      { q: "¿Cuánto tiempo debo esperar para volver a solicitar la Ley de Segunda Oportunidad?", a: "Si ya obtuviste la cancelación definitiva (EPI) anteriormente, la ley marca un plazo de espera de entre 2 y 5 años para volver a solicitarla, dependiendo de la vía utilizada en el proceso anterior.", plain: "Si ya obtuviste la cancelación definitiva (EPI) anteriormente, la ley marca un plazo de espera de entre 2 y 5 años para volver a solicitarla, dependiendo de la vía utilizada en el proceso anterior." },
      { q: "¿Es posible cancelar deudas derivadas de tarjetas de crédito revolving?", a: "Sí, los créditos rápidos y las tarjetas con intereses abusivos son las deudas más comunes que se eliminan en estos procedimientos, recuperando así el control de tus finanzas.", plain: "Sí, los créditos rápidos y las tarjetas con intereses abusivos son las deudas más comunes que se eliminan en estos procedimientos, recuperando así el control de tus finanzas." },
      { q: "¿Apareceré en algún registro público tras la cancelación?", a: "Existe un Registro Público Concursal donde constará el proceso, pero el beneficio principal es que tus datos deben ser borrados por ley de ficheros de morosidad como ASNEF o Badexcug.", plain: "Existe un Registro Público Concursal donde constará el proceso, pero el beneficio principal es que tus datos deben ser borrados por ley de ficheros de morosidad como ASNEF o Badexcug." },
      { q: "¿Qué pasa si mi situación económica mejora años después?", a: "Una vez obtenida la exoneración definitiva, los bienes o ingresos que ganes en el futuro son solo tuyos. Solo en casos muy específicos de herencias o premios de lotería durante los años siguientes podría revisarse el caso.", plain: "Una vez obtenida la exoneración definitiva, los bienes o ingresos que ganes en el futuro son solo tuyos. Solo en casos muy específicos de herencias o premios de lotería durante los años siguientes podría revisarse el caso." },
    ],
    conceptGlossary: {
      title: "Diccionario para entender tu libertad financiera",
      subtitle: "Te explicamos de forma sencilla los términos que leerás sobre la cancelación de deudas.",
      terms: [
        { term: "EPI", definition: "Es el nombre técnico del perdón judicial. Significa Exoneración del Pasivo Insatisfecho y es el documento que certifica que ya no debes nada legalmente." },
        { term: "Insolvencia", definition: "Es la situación real en la que el dinero que ingresas no te llega para cubrir tus gastos básicos y pagar tus deudas a la vez." },
        { term: "Quita", definition: "Es un acuerdo con el banco para que acepten cobrar solo una parte de la deuda, perdonándote el resto para que puedas pagarles." },
        { term: "Acreedor", definition: "Cualquier persona, banco o entidad pública a la que le debes dinero y que tiene el derecho legal de reclamártelo." },
        { term: "Buena fe", definition: "Es demostrar que no te has endeudado a propósito para no pagar, sino que tu situación se debe a circunstancias que no has podido controlar." },
        { term: "Ficheros de morosidad", definition: "Listas negras como ASNEF donde las empresas te apuntan cuando dejas de pagar, impidiéndote pedir financiación o contratar servicios básicos." },
      ],
    },
    mythVsReality: {
      title: "Verdades y mentiras sobre cancelar deudas",
      subtitle: "No te dejes engañar por falsas promesas; esto es lo que dice la ley española.",
      items: [
        { myth: "“Si cancelo mis deudas, perderé mi casa de forma obligatoria.”", reality: "Falso. Si la hipoteca está al día y el valor de la casa es menor o igual a lo que debes al banco, puedes mantener tu hogar bajo ciertas condiciones legales." },
        { myth: "“La cancelación de deudas solo sirve para empresas en quiebra.”", reality: "En absoluto. La Ley de Segunda Oportunidad está diseñada específicamente para personas físicas, familias y trabajadores autónomos agobiados por los préstamos." },
        { myth: "“Hace falta tener mucho dinero para pagar el juicio y los abogados.”", reality: "Al contrario, existen planes de pago flexibles y el ahorro que consigues al dejar de pagar cuotas de préstamos suele cubrir sobradamente la gestión del proceso." },
        { myth: "“Si tengo antecedentes penales de cualquier tipo, no puedo acogerme.”", reality: "Solo impiden el proceso los delitos socioeconómicos o contra Hacienda y la Seguridad Social. Otros antecedentes no relacionados no suelen ser un problema." },
        { myth: "“Mis deudas desaparecerán automáticamente sin pasar por el juzgado.”", reality: "No existe el borrado mágico. Para que la deuda sea legalmente inexistente, un juez debe firmar la sentencia de exoneración tras comprobar que cumples los requisitos." },
      ],
    },
    extraSections: [
      {
            "title": "Cómo proteger tu vivienda habitual durante el proceso",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Una de las mayores preocupaciones al buscar la **cancelación de deudas** es el miedo a perder la casa. Sin embargo, la jurisprudencia actual permite excluir la vivienda habitual de la liquidación si se cumplen ciertos criterios."
                  },
                  {
                        "kind": "checkList",
                        "variant": "check",
                        "items": [
                              "Estar al corriente de los pagos de la cuota hipotecaria.",
                              "Que el valor de mercado del inmueble sea inferior o similar a la deuda pendiente (valor residual nulo).",
                              "Que la vivienda sea la residencia habitual del deudor."
                        ]
                  },
                  {
                        "kind": "callout",
                        "variant": "info",
                        "text": "Si se cumplen estos requisitos, la deuda hipotecaria se mantiene vigente y sigues pagando tu cuota, pero el resto de tus deudas (tarjetas, préstamos, etc.) se cancelan."
                  }
            ]
      },
      {
            "title": "Situación de avalistas y prescripción de deudas",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Es fundamental entender qué ocurre con quienes te ayudaron a pedir el dinero y hasta cuándo pueden reclamarte legalmente si no inicias un proceso de cancelación."
                  },
                  {
                        "kind": "table",
                        "headers": [
                              "Concepto",
                              "Impacto Legal"
                        ],
                        "rows": [
                              [
                                    "Avalistas",
                                    "La LSO libera al deudor, pero el acreedor puede dirigirse al avalista salvo que este también se acoja a la ley."
                              ],
                              [
                                    "Prescripción",
                                    "La mayoría de deudas prescriben a los 5 años, pero cualquier reclamación interrumpe el plazo y reinicia el contador."
                              ],
                              [
                                    "Vigilancia",
                                    "Tras el auto de cancelación, existe un periodo de 5 años donde la exoneración de deudas podría revocarse si mejora tu fortuna por herencia o azar."
                              ]
                        ]
                  }
            ]
      },
      {
            "title": "Impacto fiscal y financiero de la cancelación",
            "blocks": [
                  {
                        "kind": "keyCallout",
                        "eyebrow": "Obligaciones tributarias",
                        "headline": "La deuda cancelada puede tributar como ganancia patrimonial",
                        "body": "Según la normativa vigente, el ahorro obtenido por una quita o cancelación suele considerarse ingreso imponible en el IRPF."
                  },
                  {
                        "kind": "paragraph",
                        "text": "No obstante, si la cancelación se obtiene a través de la [Ley Segunda Oportunidad](/ley-segunda-oportunidad), la ley prevé exenciones para que el deudor insolvente no tenga que pagar impuestos por una deuda que no pudo abonar."
                  },
                  {
                        "kind": "factGrid",
                        "columns": 2,
                        "items": [
                              {
                                    "value": "0€",
                                    "label": "Coste fiscal en LSO",
                                    "detail": "Generalmente exento para deudores insolventes."
                              },
                              {
                                    "value": "Favorable",
                                    "label": "Score Crediticio",
                                    "detail": "Mejora tras eliminar los registros en ASNEF."
                              }
                        ]
                  }
            ]
      },
      {
            "title": "Diferencia entre deudas garantizadas y no garantizadas",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "No todas las deudas se tratan igual ante la ley. Entender la diferencia es clave para priorizar tu estrategia de defensa."
                  },
                  {
                        "kind": "optionCards",
                        "columns": 2,
                        "items": [
                              {
                                    "icon": "wallet",
                                    "title": "Deudas No Garantizadas",
                                    "text": "Préstamos personales, tarjetas y facturas. Son las más sencillas de cancelar al 100% mediante exoneración judicial.",
                                    "links": [
                                          {
                                                "to": "/tarjetas-revolving/cancelar-tarjetas-revolving",
                                                "label": "Cancelar tarjetas"
                                          }
                                    ]
                              },
                              {
                                    "icon": "landmark",
                                    "title": "Deudas Garantizadas",
                                    "text": "Hipotecas o préstamos de coche. Si dejas de pagar, el acreedor puede ejecutar el bien de forma preferente.",
                                    "links": [
                                          {
                                                "to": "/embargos/parar-embargo",
                                                "label": "Evitar embargos"
                                          }
                                    ]
                              }
                        ]
                  }
            ]
      },
      {
            "title": "Negociación directa vs. Vía Judicial",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Si tu situación aún no es de insolvencia total, existen alternativas antes de llegar al juzgado mercantil."
                  },
                  {
                        "kind": "checkList",
                        "variant": "cross",
                        "items": [
                              "Planes de administración: Mediación para bajar intereses a cambio de no usar más crédito.",
                              "Quitas por pago único: Negociar pagar un 50% hoy para cerrar el expediente (requiere liquidez inmediata).",
                              "Reunificación: Si tienes ingresos estables pero cuotas muy altas, negociamos con tus entidades para bajar cuota y total, sin préstamo nuevo."
                        ]
                  },
                  {
                        "kind": "actionLink",
                        "to": "/reunificar-deudas",
                        "text": "Descubre si te conviene más la reunificación de deudas"
                  }
            ]
      }
],
  },
  "/reunificacion-deudas": {
    faq: [
      { q: "¿Reunificar es lo mismo que pedir un préstamo nuevo?", a: "No. Nosotros no te damos otro crédito ni te hacemos firmar una nueva hipoteca. Negociamos extrajudicialmente con tus entidades para rebajar la cuota mensual y el importe total que debes sobre la deuda que ya tienes.", plain: "No. Nosotros no te damos otro crédito ni te hacemos firmar una nueva hipoteca. Negociamos extrajudicialmente con tus entidades para rebajar la cuota mensual y el importe total que debes sobre la deuda que ya tienes." },
      { q: "¿Cuánto se puede rebajar de la deuda al negociar?", a: "Depende de cada acreedor, de la antigüedad de la deuda y de tu situación, por lo que cualquier cifra es orientativa. En el estudio gratuito te decimos qué margen de rebaja real esperamos en tu caso antes de empezar.", plain: "Depende de cada acreedor, de la antigüedad de la deuda y de tu situación, por lo que cualquier cifra es orientativa. En el estudio gratuito te decimos qué margen de rebaja real esperamos en tu caso antes de empezar." },
      { q: "¿Por qué baja también el total y no solo la cuota?", a: "Porque no alargamos el plazo: negociamos quitas y mejores condiciones con cada entidad. A diferencia de refinanciar, donde la cuota baja pero el total sube por los años de intereses, aquí buscamos reducir las dos cosas.", plain: "Porque no alargamos el plazo: negociamos quitas y mejores condiciones con cada entidad. A diferencia de refinanciar, donde la cuota baja pero el total sube por los años de intereses, aquí buscamos reducir las dos cosas." },
      { q: "¿Necesito estar al corriente o tener nómina para reunificar?", a: "No como en la vía bancaria. La negociación extrajudicial no exige aprobación de un banco ni tasación: trabaja sobre tu deuda actual, también si ya tienes impagos o estás en ASNEF.", plain: "No como en la vía bancaria. La negociación extrajudicial no exige aprobación de un banco ni tasación: trabaja sobre tu deuda actual, también si ya tienes impagos o estás en ASNEF." },
      { q: "¿Qué pasa si una entidad no acepta la negociación?", a: "Se negocia acreedor por acreedor, así que un 'no' de una entidad no bloquea el resto. Si la mayoría de tu deuda no es negociable y tu situación es de insolvencia, valoramos contigo la Ley de Segunda Oportunidad.", plain: "Se negocia acreedor por acreedor, así que un 'no' de una entidad no bloquea el resto. Si la mayoría de tu deuda no es negociable y tu situación es de insolvencia, valoramos contigo la Ley de Segunda Oportunidad." },
      { q: "¿Tengo que poner mi casa como garantía?", a: "No. Eso sería refinanciar, no reunificar. Nuestra reunificación es negociación pura sobre la deuda existente: no firmas hipotecas ni avales nuevos sobre tu vivienda.", plain: "No. Eso sería refinanciar, no reunificar. Nuestra reunificación es negociación pura sobre la deuda existente: no firmas hipotecas ni avales nuevos sobre tu vivienda." },
      { q: "¿Cuánto tarda la negociación?", a: "Varía según el número de acreedores y su disposición. El estudio inicial es inmediato y, a partir de ahí, la negociación se desarrolla en semanas; te vamos informando de cada acuerdo que cerramos.", plain: "Varía según el número de acreedores y su disposición. El estudio inicial es inmediato y, a partir de ahí, la negociación se desarrolla en semanas; te vamos informando de cada acuerdo que cerramos." },
    ],
    conceptGlossary: {
      title: "Diccionario para entender tu negociación",
      subtitle: "Conceptos clave explicados de forma sencilla para que tomes el control de tu deuda.",
      terms: [
        { term: "Negociación extrajudicial", definition: "Acuerdo privado con tus acreedores, sin pleitos, para rebajar la cuota y el importe total de la deuda." },
        { term: "Quita", definition: "Parte de la deuda que el acreedor acepta perdonar dentro de la negociación, reduciendo el total que pagarás." },
        { term: "Reunificar (Calma)", definition: "Negociar con las entidades para bajar cuota y total sobre tu deuda actual. No es un préstamo nuevo." },
        { term: "Refinanciar", definition: "Pedir un crédito nuevo que agrupa todo: baja la cuota pero alarga el plazo y encarece el total. No es lo que hacemos." },
        { term: "Acreedor", definition: "La entidad o empresa a la que debes dinero (banco, financiera, tarjeta, microcrédito) y con la que negociamos." },
        { term: "Insolvencia", definition: "Cuando no puedes hacer frente a tus deudas; si es total y no hay margen de negociación, la vía suele ser la Ley de Segunda Oportunidad." },
      ],
    },
    mythVsReality: {
      title: "Verdades y mentiras sobre la reunificación",
      subtitle: "Desmontamos los bulos más comunes para que no te lleves sorpresas.",
      items: [
        { myth: "“Reunificar es pedir otro préstamo para juntarlo todo”", reality: "Eso es refinanciar. Reunificar, como lo hacemos nosotros, es negociar con tus entidades para rebajar cuota y total sin firmar un crédito nuevo." },
        { myth: "“Al reunificar siempre acabas pagando más”", reality: "Eso ocurre al refinanciar, porque se alarga el plazo. En la negociación buscamos justo lo contrario: que baje el total, no solo la cuota." },
        { myth: "“Si estoy en ASNEF no puedo reunificar”", reality: "Por la vía bancaria sí es difícil, pero la negociación extrajudicial trabaja sobre tu deuda actual, también con impagos previos." },
        { myth: "“Tengo que poner mi vivienda como garantía”", reality: "No. Negociamos sobre la deuda existente, sin avales ni hipotecas nuevas sobre tu casa." },
      ],
    },
    extraSections: [
      {
        title: "Cómo negociamos tu deuda paso a paso",
        blocks: [
          { kind: "paragraph", text: "Reunificar con nosotros es un proceso de negociación, no una operación bancaria. Así trabajamos tu caso:" },
          {
            kind: "optionCards",
            columns: 2,
            items: [
              { icon: "scale", title: "Estudiamos tu deuda", text: "Analizamos cada préstamo, tarjeta y microcrédito para ver dónde hay margen real de rebaja y qué acreedores suelen negociar." },
              { icon: "users", title: "Negociamos por ti", text: "Hablamos con cada entidad para conseguir quitas y mejores condiciones, bajando la cuota mensual y el importe total." },
            ],
          },
        ],
      },
      {
        title: "Qué conseguimos al negociar",
        blocks: [
          { kind: "paragraph", text: "El objetivo no es aplazar la deuda, sino mejorarla de verdad:" },
          {
            kind: "checkList",
            variant: "check",
            items: [
              "**Menos cuota:** un pago mensual más bajo y asumible.",
              "**Menos total:** se reduce el importe global gracias a las quitas negociadas.",
              "**Sin préstamo nuevo:** no firmas otro crédito ni alargas el plazo.",
              "**Un solo interlocutor:** negociamos con todos tus acreedores por ti.",
            ],
          },
        ],
      },
      {
        title: "Reunificar no es refinanciar",
        blocks: [
          { kind: "paragraph", text: "Es la confusión más habitual y la diferencia es enorme para tu bolsillo:" },
          {
            kind: "table",
            headers: ["", "Reunificar (Calma)", "Refinanciar"],
            rows: [
              ["Qué es", "Negociar con tus entidades.", "Pedir un préstamo nuevo."],
              ["Cuota mensual", "Baja.", "Baja."],
              ["Coste total", "Baja (quitas negociadas).", "Sube (más años de intereses)."],
              ["Plazo", "No se alarga.", "Se alarga."],
              ["Tu vivienda", "Sin garantía nueva.", "A veces como aval."],
            ],
          },
          { kind: "actionLink", to: "/cancelar-deudas", text: "Si tu situación es de insolvencia total, infórmate sobre cómo cancelar deudas." },
        ],
      },
      {
        title: "Cuándo NO basta con reunificar",
        blocks: [
          {
            kind: "callout",
            variant: "warning",
            title: "Si la deuda te supera del todo",
            text: "Cuando no puedes asumir ninguna cuota y no tienes bienes de valor que proteger, negociar una rebaja no será suficiente. En ese caso, la vía adecuada suele ser la [Ley de Segunda Oportunidad](/ley-segunda-oportunidad), que cancela legalmente la deuda. Si ya tienes embargos, lo primero es [pararlos](/embargos/parar-embargo).",
          },
        ],
      },
    ],
  },
  "/reunificar-deudas": {
    faq: [
      { q: "¿Cómo se reunifican las deudas con vosotros?", a: "Negociamos extrajudicialmente con tus acreedores, uno a uno, para rebajar la cuota mensual y el importe total. No te damos un préstamo nuevo ni agrupamos todo en una hipoteca: trabajamos sobre la deuda que ya tienes.", plain: "Negociamos extrajudicialmente con tus acreedores, uno a uno, para rebajar la cuota mensual y el importe total. No te damos un préstamo nuevo ni agrupamos todo en una hipoteca: trabajamos sobre la deuda que ya tienes." },
      { q: "¿Qué necesito para empezar?", a: "Un listado aproximado de tus deudas y cuotas, y tus ingresos mensuales. Con eso hacemos el estudio gratuito y vemos qué margen de negociación hay en tu caso.", plain: "Un listado aproximado de tus deudas y cuotas, y tus ingresos mensuales. Con eso hacemos el estudio gratuito y vemos qué margen de negociación hay en tu caso." },
      { q: "¿Puedo reunificar si estoy en ASNEF o con impagos?", a: "Sí. A diferencia de la vía bancaria, la negociación extrajudicial trabaja sobre tu deuda actual aunque ya tengas impagos registrados. De hecho, esas deudas suelen tener más margen de rebaja.", plain: "Sí. A diferencia de la vía bancaria, la negociación extrajudicial trabaja sobre tu deuda actual aunque ya tengas impagos registrados. De hecho, esas deudas suelen tener más margen de rebaja." },
      { q: "¿Tengo que cambiar de banco o domiciliar la nómina?", a: "No. Como no firmamos un préstamo nuevo, no hay que cambiar de banco ni domiciliar nada. Solo negociamos con tus acreedores actuales para mejorar las condiciones de lo que debes.", plain: "No. Como no firmamos un préstamo nuevo, no hay que cambiar de banco ni domiciliar nada. Solo negociamos con tus acreedores actuales para mejorar las condiciones de lo que debes." },
      { q: "¿Por qué reunificar baja el total y refinanciar no?", a: "Porque al refinanciar alargas el plazo y pagas intereses durante más años, así que el total sube. Al reunificar negociamos quitas sobre la deuda existente, por lo que el importe global baja.", plain: "Porque al refinanciar alargas el plazo y pagas intereses durante más años, así que el total sube. Al reunificar negociamos quitas sobre la deuda existente, por lo que el importe global baja." },
      { q: "¿Qué pasa si algún acreedor no quiere negociar?", a: "Negociamos acreedor por acreedor, así que un rechazo no frena el resto. Si la mayor parte de tu deuda no se puede mejorar y eres insolvente, te planteamos la Ley de Segunda Oportunidad.", plain: "Negociamos acreedor por acreedor, así que un rechazo no frena el resto. Si la mayor parte de tu deuda no se puede mejorar y eres insolvente, te planteamos la Ley de Segunda Oportunidad." },
      { q: "¿Puedo reunificar siendo autónomo?", a: "Sí. La negociación no depende de la aprobación de un banco, sino del acuerdo con tus acreedores, así que también encaja con ingresos de autónomo. Lo estudiamos gratis en tu caso.", plain: "Sí. La negociación no depende de la aprobación de un banco, sino del acuerdo con tus acreedores, así que también encaja con ingresos de autónomo. Lo estudiamos gratis en tu caso." },
    ],
    conceptGlossary: {
      title: "Diccionario para entender tu negociación",
      subtitle: "Conceptos clave explicados de forma sencilla para que nadie te confunda.",
      terms: [
        { term: "Negociación extrajudicial", definition: "Acuerdo privado con tus acreedores, sin pleitos, para rebajar la cuota y el total de tu deuda." },
        { term: "Quita", definition: "Parte de la deuda que el acreedor acepta perdonar, reduciendo el importe total que pagarás." },
        { term: "Reunificar (Calma)", definition: "Negociar con las entidades para bajar cuota y total sobre tu deuda actual. Sin préstamo nuevo." },
        { term: "Refinanciar", definition: "Pedir un crédito nuevo que agrupa todo: baja la cuota pero alarga el plazo y encarece el total." },
        { term: "Sobreendeudamiento", definition: "Cuando el pago de tus deudas se come gran parte de tus ingresos y no llegas a fin de mes." },
      ],
    },
    mythVsReality: {
      title: "Verdades y mentiras sobre reunificar",
      subtitle: "Desmontamos los bulos más comunes para que decidas con total seguridad.",
      items: [
        { myth: "“Reunificar es juntarlo todo en un préstamo nuevo”", reality: "Eso es refinanciar. Reunificar con nosotros es negociar con tus entidades para rebajar cuota y total, sin firmar otro crédito." },
        { myth: "“Reunificar siempre encarece la deuda”", reality: "Encarece al refinanciar, porque se alarga el plazo. La negociación busca reducir el total, no aumentarlo." },
        { myth: "“Con impagos o en ASNEF no hay nada que hacer”", reality: "La negociación extrajudicial trabaja sobre tu deuda actual aunque tengas impagos; esas deudas suelen tener más margen de rebaja." },
        { myth: "“Tengo que poner mi casa como aval”", reality: "No. Negociamos sobre la deuda existente, sin hipotecas ni avales nuevos sobre tu vivienda." },
      ],
    },
    extraSections: [
      {
        title: "Reunificar paso a paso (negociando)",
        blocks: [
          { kind: "paragraph", text: "No tramitamos un préstamo: negociamos tu deuda. Estos son los pasos:" },
          {
            kind: "checkList",
            variant: "check",
            items: [
              "Reúne un listado de tus préstamos, tarjetas y cuotas actuales.",
              "Pedimos un estudio gratuito para ver el margen de rebaja real.",
              "Negociamos con cada acreedor quitas y mejores condiciones.",
              "Pasas a una cuota más baja y un total menor, sin crédito nuevo.",
            ],
          },
        ],
      },
      {
        title: "Reunificar vs refinanciar vs cancelar",
        blocks: [
          { kind: "paragraph", text: "Tres conceptos que se confunden y tienen efectos muy distintos:" },
          {
            kind: "table",
            headers: ["Vía", "Qué hace", "Efecto en el total"],
            rows: [
              ["Reunificar (Calma)", "Negocia con las entidades tu deuda actual.", "Baja (quitas)."],
              ["Refinanciar", "Pides un préstamo nuevo que agrupa todo.", "Sube (más años)."],
              ["Cancelar (LSO)", "Un juez exonera la deuda por insolvencia.", "Desaparece."],
            ],
          },
          { kind: "actionLink", to: "/ley-segunda-oportunidad/exoneracion-pasivo-insatisfecho", text: "Saber más sobre la cancelación total de deudas" },
        ],
      },
      {
        title: "Riesgos que debes conocer",
        blocks: [
          {
            kind: "keyCallout",
            eyebrow: "Atención",
            headline: "Cuidado con quien te ofrece un préstamo",
            body: "Si alguien te propone «reunificar» pidiendo un crédito nuevo o poniendo tu vivienda como garantía, en realidad te está refinanciando: bajas la cuota pero alargas el plazo y pagas más en total. Nosotros negociamos tu deuda actual, sin crédito nuevo.",
          },
          {
            kind: "callout",
            variant: "warning",
            text: "Si ya no puedes asumir ninguna cuota y no tienes bienes de valor que proteger, negociar una rebaja no bastará: valora la Ley de Segunda Oportunidad para cancelar la deuda.",
          },
        ],
      },
      {
        title: "Escenarios especiales: ASNEF y embargos",
        blocks: [
          { kind: "paragraph", text: "Estar en ficheros o con un embargo en marcha no te deja sin opciones:" },
          {
            kind: "optionCards",
            columns: 2,
            items: [
              { icon: "ban", title: "Con ASNEF o RAI", text: "La negociación extrajudicial trabaja sobre tu deuda aunque tengas impagos. Y, una vez saldada o rebajada, podrás [salir de ASNEF](/asnef/salir-de-asnef).", links: [ { to: "/asnef/salir-de-asnef", label: "Salir de ASNEF" } ] },
              { icon: "gavel", title: "Con embargos", text: "Si ya hay una orden judicial, la prioridad es [parar el embargo](/embargos/parar-embargo) y, en paralelo, negociar la deuda que lo provoca.", links: [ { to: "/juicio-monitorio-recobro/juicio-monitorio-deuda", label: "Gestionar juicio monitorio" } ] },
            ],
          },
        ],
      },
    ],
  },
  "/asnef/salir-de-asnef": {
    faq: [
      { q: "¿Qué requisitos legales deben cumplirse para que me incluyan en la lista?", a: "La deuda debe ser real, estar vencida y ser exigible. Además, la entidad tiene que haberte enviado un requerimiento previo de pago por una vía rastreable y la cuantía mínima para particulares suele ser de 50 euros.", plain: "La deuda debe ser real, estar vencida y ser exigible. Además, la entidad tiene que haberte enviado un requerimiento previo de pago por una vía rastreable y la cuantía mínima para particulares suele ser de 50 euros." },
      { q: "¿Me tienen que avisar obligatoriamente antes de aparecer en ASNEF?", a: "Sí, el fichero tiene un plazo máximo de 30 días naturales desde que recibe tus datos para notificarte por correo postal o email. Si no recibiste este aviso, podrías solicitar la baja inmediata por un defecto de forma.", plain: "Sí, el fichero tiene un plazo máximo de 30 días naturales desde que recibe tus datos para notificarte por correo postal o email. Si no recibiste este aviso, podrías solicitar la baja inmediata por un defecto de forma." },
      { q: "¿Qué es la caducidad por tiempo y cuánto dura?", a: "Es el borrado automático de tus datos tras el plazo máximo legal, que suele ser de 5 años desde el vencimiento de la deuda. Una vez pasado ese tiempo, la anotación debe desaparecer aunque la deuda no se haya pagado.", plain: "Es el borrado automático de tus datos tras el plazo máximo legal, que suele ser de 5 años desde el vencimiento de la deuda. Una vez pasado ese tiempo, la anotación debe desaparecer aunque la deuda no se haya pagado." },
      { q: "¿Cómo puedo agilizar el borrado si ya he pagado a mi acreedor?", a: "Lo ideal es enviar tú mismo el justificante de transferencia y tu DNI a través de la web o el correo postal de Equifax (gestores de ASNEF). Aunque el banco debería notificarlo en 10 días, hacerlo tú reduce los tiempos de espera considerablemente.", plain: "Lo ideal es enviar tú mismo el justificante de transferencia y tu DNI a través de la web o el correo postal de Equifax (gestores de ASNEF). Aunque el banco debería notificarlo en 10 días, hacerlo tú reduce los tiempos de espera considerablemente." },
      { q: "¿Es posible reclamar una indemnización por estar en el fichero?", a: "Sí, si la inclusión ha sido indebida o por un error de la compañía, puedes demandar por vulneración del derecho al honor. Los tribunales suelen valorar el daño reputacional basándose en cuántas entidades consultaron tus datos mientras estabas en la lista.", plain: "Sí, si la inclusión ha sido indebida o por un error de la compañía, puedes demandar por vulneración del derecho al honor. Los tribunales suelen valorar el daño reputacional basándose en cuántas entidades consultaron tus datos mientras estabas en la lista." },
      { q: "¿Qué hago si figuro por una deuda que yo no he contratado?", a: "Estamos ante un posible caso de suplantación de identidad; debes denunciarlo ante la policía y ejercer tu derecho de cancelación ante el fichero adjuntando la denuncia para que bloqueen la anotación mientras se investiga.", plain: "Estamos ante un posible caso de suplantación de identidad; debes denunciarlo ante la policía y ejercer tu derecho de cancelación ante el fichero adjuntando la denuncia para que bloqueen la anotación mientras se investiga." },
      { q: "¿Sirven de algo las empresas que prometen borrarte sin pagar ni cumplir requisitos?", a: "Cuidado con estas promesas, ya que a menudo solo tramitan una baja temporal mediante derechos ARCO que no soluciona el problema de fondo. La única vía legal duradera es el pago, la reclamación por error o la Ley de Segunda Oportunidad.", plain: "Cuidado con estas promesas, ya que a menudo solo tramitan una baja temporal mediante derechos ARCO que no soluciona el problema de fondo. La única vía legal duradera es el pago, la reclamación por error o la Ley de Segunda Oportunidad." },
      { q: "¿Cómo afecta ASNEF a la contratación de luz, agua o teléfono?", a: "Muchas compañías de suministros consultan estos ficheros antes de darte de alta y pueden denegarte el servicio o exigirte una fianza o depósito previo muy elevado como garantía de pago.", plain: "Muchas compañías de suministros consultan estos ficheros antes de darte de alta y pueden denegarte el servicio o exigirte una fianza o depósito previo muy elevado como garantía de pago." },
    ],
    conceptGlossary: {
      title: "Diccionario para entender ASNEF sin líos",
      subtitle: "Los términos legales que necesitas conocer explicados de forma sencilla.",
      terms: [
        { term: "Derechos ARCO", definition: "Tus facultades de acceso, rectificación, cancelación y oposición sobre tus datos personales para que nadie guarde información errónea sobre ti." },
        { term: "Equifax", definition: "Es la empresa privada que gestiona técnicamente la base de datos de ASNEF en España." },
        { term: "Requerimiento fehaciente", definition: "Es un aviso de impago del que queda constancia legal de envío y recepción, generalmente un burofax o carta certificada." },
        { term: "Derecho al Honor", definition: "Protección legal que impide que te incluyan injustamente en registros de morosos, lo que permite pedir compensaciones si hay fallos documentales." },
        { term: "Ley de Segunda Oportunidad", definition: "Mecanismo legal que permite a particulares y autónomos cancelar sus deudas impagables y, por tanto, salir de todos los ficheros de morosidad de forma definitiva." },
      ],
    },
    mythVsReality: {
      title: "Bulos y verdades sobre las listas de morosos",
      subtitle: "No dejes que el miedo o la desinformación te impidan recuperar tu tranquilidad financiera.",
      items: [
        { myth: "“Si la deuda es de hace menos de 50 euros no me pueden meter”", reality: "Es cierto; la normativa actual establece que para personas físicas la deuda debe ser igual o superior a 50 euros para ser inscrita legalmente." },
        { myth: "“Solo los bancos pueden registrarme en ASNEF”", reality: "Falso. Compañías de teléfono, eléctricas, aseguradoras y casi cualquier empresa de servicios que sea socia del fichero puede incluirte si dejas de pagar." },
        { myth: "“Una vez que pagas, desapareces de la lista para siempre en 24 horas”", reality: "Normalmente no es tan rápido. Aunque el acreedor debe informar, el proceso de actualización del fichero suele tardar entre 10 y 30 días." },
        { myth: "“ASNEF es una lista pública que cualquiera puede consultar con mi nombre”", reality: "No es pública. Solo pueden consultarla las entidades que tienen un interés legítimo, normalmente cuando vas a solicitar un producto financiero o servicio." },
      ],
    },
    extraSections: [
      {
            "title": "Requisitos para que te metan en ASNEF de forma legal",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "No cualquier impago justifica que tus datos terminen en un fichero de morosidad. La **Ley Orgánica de Protección de Datos** y la normativa de consumo establecen unos límites claros para proteger al ciudadano."
                  },
                  {
                        "kind": "checkList",
                        "variant": "check",
                        "items": [
                              "La deuda debe ser cierta, vencida y exigible (no puede ser una estimación o algo no vencido).",
                              "Importe mínimo de 50€ para personas físicas.",
                              "Requerimiento previo de pago: la empresa debe haberte pedido el dinero de forma fehaciente (ej. burofax).",
                              "Notificación de inclusión: el fichero tiene 30 días para avisarte de que has sido inscrito.",
                              "Inexistencia de controversia: si has reclamado la deuda judicial o administrativamente, no pueden incluirte."
                        ]
                  },
                  {
                        "kind": "callout",
                        "variant": "warning",
                        "text": "Si te han metido en el fichero sin cumplir estos pasos, podrías tener derecho a una indemnización por vulneración del derecho al honor."
                  }
            ]
      },
      {
            "title": "Derechos ARCO: solicita tu informe y limpia errores",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Tienes el control sobre tu información personal. Para consultar si estás en el fichero o corregir datos falsos, debes ejercer tus derechos ante Equifax (ASNEF) o Experian (BADEXCUG)."
                  },
                  {
                        "kind": "factGrid",
                        "columns": 2,
                        "items": [
                              {
                                    "value": "Acceso",
                                    "label": "Consulta gratis",
                                    "detail": "Derecho a saber qué deudas constan a tu nombre."
                              },
                              {
                                    "value": "Cancelación",
                                    "label": "Borrado de datos",
                                    "detail": "Si la deuda no es real o ya ha sido pagada."
                              },
                              {
                                    "value": "Rectificación",
                                    "label": "Corrección",
                                    "detail": "Para importes que no coinciden con la realidad."
                              },
                              {
                                    "value": "Oposición",
                                    "label": "Bloqueo",
                                    "detail": "En casos de suplantación de identidad."
                              }
                        ]
                  },
                  {
                        "kind": "paragraph",
                        "text": "Para agilizar el trámite, puedes enviar una carta al **Apartado de Correos 10.546, Madrid 28080**, adjuntando copia de tu DNI y el justificante de pago si lo tuviesas."
                  }
            ]
      },
      {
            "title": "Salir de ASNEF sin pagar: Plazos y Prescripción",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Existe un límite temporal para la permanencia de tus datos en estos registros, independientemente de si la deuda sigue existiendo civilmente."
                  },
                  {
                        "kind": "keyCallout",
                        "headline": "5 años de caducidad máxima",
                        "body": "Según la normativa actual, una anotación de morosidad no puede permanecer más de 5 años en el fichero. Una vez superado este plazo, el borrado debe ser automático y definitivo por parte de la entidad titular del fichero."
                  },
                  {
                        "kind": "actionLink",
                        "to": "/juicio-monitorio-recobro/juicio-monitorio-deuda",
                        "text": "Qué hacer si te demandan antes de que prescriba la deuda"
                  }
            ]
      },
      {
            "title": "La Ley de la Segunda Oportunidad como salida definitiva",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Cuando la deuda no es un error y no tienes capacidad para pagarla, el borrado temporal no sirve. La [Ley de la Segunda Oportunidad](/ley-segunda-oportunidad) permite eliminar las deudas legalmente y, con ello, limpiar todos los ficheros."
                  },
                  {
                        "kind": "table",
                        "headers": [
                              "Criterio",
                              "Requisito LSO"
                        ],
                        "rows": [
                              [
                                    "Buena fe",
                                    "No haber sido condenado por delitos socioeconómicos."
                              ],
                              [
                                    "Insolvencia",
                                    "No poder afrontar los pagos actuales o inminentes."
                              ],
                              [
                                    "Efecto en ASNEF",
                                    "Borrado inmediato tras el auto judicial de exoneración."
                              ]
                        ]
                  },
                  {
                        "kind": "optionCards",
                        "columns": 2,
                        "items": [
                              {
                                    "icon": "shield",
                                    "title": "Exoneración de Deudas",
                                    "text": "Limpia tus deudas con bancos y financieras.",
                                    "links": [
                                          {
                                                "to": "/ley-segunda-oportunidad/exoneracion-pasivo-insatisfecho",
                                                "label": "Ver proceso EPI"
                                          }
                                    ]
                              },
                              {
                                    "icon": "landmark",
                                    "title": "Deudas Públicas",
                                    "text": "También es posible cancelar parte de lo debido a la administración.",
                                    "links": [
                                          {
                                                "to": "/deudas-hacienda-seguridad-social/deudas-hacienda",
                                                "label": "Deudas Hacienda"
                                          }
                                    ]
                              }
                        ]
                  }
            ]
      },
      {
            "title": "Indemnizaciones por inclusión indebida",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "La justicia española es muy estricta con el uso de los ficheros de morosos. Si te han incluido por una deuda que habías reclamado o sin avisarte previamente, el Tribunal Supremo reconoce que se daña tu reputación (Derecho al Honor)."
                  },
                  {
                        "kind": "factGrid",
                        "columns": 2,
                        "items": [
                              {
                                    "value": "4 años",
                                    "label": "Plazo reclamar",
                                    "detail": "Tiempo para demandar desde la salida del fichero."
                              },
                              {
                                    "value": "3.000€ - 10.000€",
                                    "label": "Indemnización media",
                                    "detail": "Según consultas y tiempo de permanencia."
                              }
                        ]
                  },
                  {
                        "kind": "callout",
                        "variant": "info",
                        "text": "Muchos afectados no solo consiguen salir del fichero, sino que la indemnización recibida compensa con creces la deuda que originó el problema."
                  }
            ]
      },
      {
            "title": "Baja Cautelar: Una tregua necesaria",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Si estás en medio de un proceso judicial para demostrar que una deuda es usuraria (como en las [tarjetas revolving](/tarjetas-revolving/cancelar-tarjetas-revolving)), puedes solicitar la baja cautelar de ASNEF."
                  },
                  {
                        "kind": "keyCallout",
                        "headline": "Borrado mientras se decide el juicio",
                        "body": "Mientras el juez decide si la deuda es legal o no, tus datos deben ser retirados del fichero para que no te perjudiquen injustamente. Si ganamos el juicio, la baja pasará a ser definitiva."
                  },
                  {
                        "kind": "actionLink",
                        "to": "/microcreditos-prestamos/cancelar-microcreditos",
                        "text": "Limpiar ASNEF por microcréditos abusivos"
                  }
            ]
      }
],
  },
  "/embargos/parar-embargo": {
    faq: [
      { q: "¿Qué pasa si la deuda que me reclaman ya ha prescrito?", a: "Si el plazo legal para reclamar el pago ha pasado (habitualmente 5 años para préstamos y tarjetas), puedes presentar un escrito de oposición. Al alegar la prescripción ante el juzgado, el proceso de embargo debería detenerse definitivamente.", plain: "Si el plazo legal para reclamar el pago ha pasado (habitualmente 5 años para préstamos y tarjetas), puedes presentar un escrito de oposición. Al alegar la prescripción ante el juzgado, el proceso de embargo debería detenerse definitivamente." },
      { q: "¿Es posible frenar un embargo negociando con el banco?", a: "Sí, alcanzar un acuerdo de pagos extrajudicial permite solicitar al juzgado la suspensión del embargo. Es vital que el acreedor comunique oficialmente la paralización para que la cuenta o nómina quede liberada.", plain: "Sí, alcanzar un acuerdo de pagos extrajudicial permite solicitar al juzgado la suspensión del embargo. Es vital que el acreedor comunique oficialmente la paralización para que la cuenta o nómina quede liberada." },
      { q: "¿Cómo me afecta la Ley de Segunda Oportunidad si ya tengo la cuenta bloqueada?", a: "En cuanto presentas la solicitud de inicio del procedimiento, el juez dicta la paralización de todas las ejecuciones. Esto impide que se realicen nuevas retenciones y congela los intereses generados.", plain: "En cuanto presentas la solicitud de inicio del procedimiento, el juez dicta la paralización de todas las ejecuciones. Esto impide que se realicen nuevas retenciones y congela los intereses generados." },
      { q: "¿Puede Hacienda quitarme dinero directamente sin avisarme?", a: "Hacienda y la Seguridad Social tienen potestad para dictar diligencias de embargo de forma administrativa. No necesitan una sentencia judicial, pero sí deben notificarte previamente la providencia de apremio para que puedas pagar o recurrir.", plain: "Hacienda y la Seguridad Social tienen potestad para dictar diligencias de embargo de forma administrativa. No necesitan una sentencia judicial, pero sí deben notificarte previamente la providencia de apremio para que puedas pagar o recurrir." },
      { q: "¿Qué es la consignación judicial para evitar el embargo?", a: "Consiste en depositar la cantidad total reclamada (deuda más una estimación de intereses y costas) en la cuenta del juzgado. Esto paraliza cualquier intento de precinto de bienes o subasta de forma inmediata.", plain: "Consiste en depositar la cantidad total reclamada (deuda más una estimación de intereses y costas) en la cuenta del juzgado. Esto paraliza cualquier intento de precinto de bienes o subasta de forma inmediata." },
      { q: "¿Pueden embargarme las herramientas que uso para trabajar?", a: "No, según la Ley de Enjuiciamiento Civil, los instrumentos necesarios para el ejercicio de tu profesión, arte u oficio son inembargables. Siempre que su valor no sea desproporcionado respecto a la deuda, están protegidos.", plain: "No, según la Ley de Enjuiciamiento Civil, los instrumentos necesarios para el ejercicio de tu profesión, arte u oficio son inembargables. Siempre que su valor no sea desproporcionado respecto a la deuda, están protegidos." },
      { q: "¿Qué ocurre si detecto cláusulas abusivas en mi contrato de préstamo?", a: "Puedes oponerte al embargo alegando abusividad (como intereses de demora excesivos). Si el juez te da la razón, puede recalcular la deuda a la baja o incluso anular todo el procedimiento de ejecución.", plain: "Puedes oponerte al embargo alegando abusividad (como intereses de demora excesivos). Si el juez te da la razón, puede recalcular la deuda a la baja o incluso anular todo el procedimiento de ejecución." },
      { q: "¿Cuánto dinero me pueden retener si gano más del Salario Mínimo?", a: "Se aplica una escala por tramos: el primer tramo adicional al SMI se embarga al 30%, el segundo al 50%, y así sucesivamente. Recuerda que el primer importe equivalente al SMI es siempre sagrado e intocable.", plain: "Se aplica una escala por tramos: el primer tramo adicional al SMI se embarga al 30%, el segundo al 50%, y así sucesivamente. Recuerda que el primer importe equivalente al SMI es siempre sagrado e intocable." },
    ],
    conceptGlossary: {
      title: "Diccionario para entender tu situación",
      subtitle: "Términos legales explicados de forma sencilla para que nadie te confunda.",
      terms: [
        { term: "Providencia de apremio", definition: "Es la notificación oficial de la Administración (como Hacienda) que indica que el plazo de pago voluntario ha terminado y van a proceder al embargo." },
        { term: "Diligencia de embargo", definition: "El documento que detalla qué bienes específicos se van a retener, como una cuenta bancaria, una parte del sueldo o un vehículo." },
        { term: "Escrito de oposición", definition: "Tu derecho a defenderte ante el juzgado argumentando motivos legales por los que el embargo no debería producirse, como errores en la cantidad o deudas ya pagadas." },
        { term: "Límite de inembargabilidad", definition: "La cantidad mínima de dinero que la ley prohíbe que te quiten para asegurar que puedes cubrir tus necesidades básicas y las de tu familia." },
        { term: "Ejecución de títulos judiciales", definition: "El proceso por el cual un juez ordena cumplir a la fuerza una sentencia firme para pagar una deuda pendiente." },
        { term: "Costas judiciales", definition: "Los gastos derivados del proceso en el juzgado (abogados, procuradores) que suelen sumarse a la deuda original incrementándola hasta un 30%." },
      ],
    },
    mythVsReality: {
      title: "Verdades y mentiras sobre los embargos",
      subtitle: "No dejes que el miedo te impida tomar decisiones informadas.",
      items: [
        { myth: "“Si no tengo propiedades, no me pueden embargar nada.”", reality: "Falso. Aunque no tengas casa, pueden embargar tu nómina, la devolución de la Renta, saldos bancarios o futuras devoluciones de impuestos hasta cubrir la deuda." },
        { myth: "“Si cambio mi sueldo de banco, ya no podrán quitármelo.”", reality: "Es una solución temporal y arriesgada. Los juzgados y Hacienda cruzan datos con la Seguridad Social y localizarán tu nueva cuenta en poco tiempo." },
        { myth: "“Un embargo dura para siempre hasta que pagues.”", reality: "Las ejecuciones pueden caducar si el acreedor no solicita pasos nuevos en el proceso, aunque lo habitual es que se renueven periódicamente para evitarlo." },
        { myth: "“Solo una sentencia de un juez puede quitarme dinero de la cuenta.”", reality: "No es cierto. Organismos públicos como los Ayuntamientos, Hacienda o la Seguridad Social tienen capacidad para embargar directamente sin pasar por los tribunales." },
        { myth: "“La Ley de Segunda Oportunidad es solo para empresas.”", reality: "Al contrario. Es una herramienta diseñada específicamente para particulares y autónomos que no pueden pagar sus deudas, permitiendo parar embargos de forma legal." },
      ],
    },
    extraSections: [
      {
            "title": "Base legal y plazos: La Ley de Enjuiciamiento Civil",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Un embargo en España no es un proceso arbitrario; está estrictamente regulado por la **Ley de Enjuiciamiento Civil (LEC)** y, si es con la Administración, por la **Ley General Tributaria**. Conocer tus derechos es el primer paso para defenderte."
                  },
                  {
                        "kind": "keyCallout",
                        "eyebrow": "Derecho a la defensa",
                        "headline": "El 'Aviso de Ejecución'",
                        "body": "No abrir las notificaciones no detiene el proceso. Tienes plazos breves (normalmente entre 5 y 10 días) para oponerte legalmente antes de que el embargo sea firme."
                  },
                  {
                        "kind": "table",
                        "headers": [
                              "Tipo de Notificación",
                              "Plazo para actuar",
                              "Acción recomendada"
                        ],
                        "rows": [
                              [
                                    "Orden de ejecución judicial",
                                    "10 días hábiles",
                                    "Consignación o Recurso de Oposición"
                              ],
                              [
                                    "Diligencia de embargo (Hacienda)",
                                    "Aprox. 20 días",
                                    "Solicitud de fraccionamiento o alegaciones"
                              ],
                              [
                                    "Monitorio de recobro",
                                    "20 días hábiles",
                                    "Oposición por usura o falta de documentación"
                              ]
                        ]
                  }
            ]
      },
      {
            "title": "Motivos legales para impugnar un embargo",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Existen errores de forma o de fondo que permiten que un juez tumbe la orden de embargo. Estas son las vías más comunes para ganar un **Recurso de Oposición**:"
                  },
                  {
                        "kind": "checkList",
                        "variant": "check",
                        "items": [
                              "**Defecto de forma:** Errores en la notificación o falta de datos esenciales.",
                              "**Deuda prescrita:** Ha pasado el plazo legal (normalmente 5 años para deudas personales) y el acreedor ya no puede reclamarla.",
                              "**Tercería de dominio:** Los bienes embargados no pertenecen al deudor sino a otra persona.",
                              "**Embargo desproporcionado:** El valor de los bienes retenidos es excesivamente superior a la deuda real."
                        ]
                  },
                  {
                        "kind": "actionLink",
                        "to": "/juicio-monitorio-recobro/juicio-monitorio-deuda",
                        "text": "Aprende cómo oponerte a un juicio monitorio"
                  }
            ]
      },
      {
            "title": "Límites legales: Lo que nunca pueden quitarte",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "La ley protege tu supervivencia mínima. Según el Art. 607 de la LEC, hay bienes y cantidades que son **inembargables** por ley."
                  },
                  {
                        "kind": "optionCards",
                        "columns": 2,
                        "items": [
                              {
                                    "icon": "wallet",
                                    "title": "El SMI es sagrado",
                                    "text": "Es inembargable el Salario Mínimo Interprofesional (SMI) íntegro. Solo se puede embargar un porcentaje de lo que exceda esa cifra."
                              },
                              {
                                    "icon": "shield",
                                    "title": "Bienes de subsistencia",
                                    "text": "Mobiliario y ajuar de la vivienda, ropa, y herramientas necesarias para ejercer tu oficio o profesión."
                              }
                        ]
                  },
                  {
                        "kind": "callout",
                        "variant": "info",
                        "text": "Si tienes cargas familiares, puedes solicitar al juez una reducción de los porcentajes de embargo aplicados sobre el tramo que supera el SMI."
                  }
            ]
      },
      {
            "title": "Suspensión mediante la Ley de Segunda Oportunidad",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Si tu situación es de insolvencia (no puedes pagar tus deudas y mantener una vida digna), la **Ley de Segunda Oportunidad** es la herramienta más potente para frenar embargos de forma inmediata."
                  },
                  {
                        "kind": "factGrid",
                        "columns": 3,
                        "items": [
                              {
                                    "value": "Paralización",
                                    "label": "Inmediata",
                                    "detail": "Al solicitar el concurso se detienen las ejecuciones"
                              },
                              {
                                    "value": "Hacienda/SS",
                                    "label": "Incluidas",
                                    "detail": "Posibilidad de exonerar hasta 10.000€ de deudas públicas"
                              },
                              {
                                    "value": "BEPI",
                                    "label": "Cancelación",
                                    "detail": "Eliminación total del resto de deudas privadas"
                              }
                        ]
                  },
                  {
                        "kind": "actionLink",
                        "to": "/ley-segunda-oportunidad",
                        "text": "Consulta si cumples los requisitos de la LSO"
                  }
            ]
      },
      {
            "title": "Casos especiales: Hacienda y Seguridad Social",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "La vía administrativa es más rápida que la judicial. Para frenar un embargo de la Agencia Tributaria o de la Seguridad Social, las opciones se reducen a tres caminos claros:"
                  },
                  {
                        "kind": "optionCards",
                        "columns": 3,
                        "items": [
                              {
                                    "icon": "clock",
                                    "title": "Aplazamiento",
                                    "text": "Solicitar un plan de pagos antes de que se ejecute la orden.",
                                    "links": [
                                          {
                                                "to": "/deudas-hacienda-seguridad-social/deudas-hacienda",
                                                "label": "Deudas con Hacienda"
                                          }
                                    ]
                              },
                              {
                                    "icon": "scale",
                                    "title": "Reclamación E-A",
                                    "text": "Presentar una reclamación económico-administrativa en el plazo de un mes."
                              },
                              {
                                    "icon": "sparkles",
                                    "title": "Ley 2ª Oportunidad",
                                    "text": "Si eres autónomo o particular, frena sus embargos de raíz.",
                                    "links": [
                                          {
                                                "to": "/deudas-hacienda-seguridad-social/deudas-seguridad-social",
                                                "label": "Deudas Seg. Social"
                                          }
                                    ]
                              }
                        ]
                  }
            ]
      },
      {
            "title": "Consejos de mediación y prioridades",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Antes de llegar a la ejecución forzosa, existen estrategias de mediación. Es vital priorizar pagos para evitar perder activos esenciales."
                  },
                  {
                        "kind": "callout",
                        "variant": "warning",
                        "title": "Cuidado con las 'reparadoras' de deuda",
                        "text": "Evita empresas que prometen 'limpiar' tus embargos sin un respaldo jurídico real. La única forma legal de parar un embargo judicial es mediante el juzgado o acogihéndose a la LSO."
                  },
                  {
                        "kind": "checkList",
                        "variant": "check",
                        "items": [
                              "Ahorra en gastos prescindibles para proponer una consignación judicial parcial.",
                              "Busca asesoramiento legal senior para negociar con el procurador del acreedor.",
                              "Si tienes bienes valiosos (segunda residencia), considera la reunificación antes de que se anote el embargo.",
                              "Si no tienes bienes, la LSO es tu mejor defensa para salir de ficheros de morosidad."
                        ]
                  },
                  {
                        "kind": "actionLink",
                        "to": "/reunificacion-deudas",
                        "text": "Analizar opción de reunificar deudas"
                  }
            ]
      }
],
  },
  "/tarjetas-revolving/cancelar-tarjetas-revolving": {
    faq: [
      { q: "¿Qué documentos necesito si no tengo el contrato a mano?", a: "No te preocupes si no localizas los papeles. Solo con tu DNI y el nombre del banco podemos solicitarles nosotros mismos el histórico de movimientos y el contrato original para analizar tu caso.", plain: "No te preocupes si no localizas los papeles. Solo con tu DNI y el nombre del banco podemos solicitarles nosotros mismos el histórico de movimientos y el contrato original para analizar tu caso." },
      { q: "¿Qué significa que haya falta de transparencia en mi tarjeta?", a: "Ocurre cuando el banco te vendió la tarjeta sin explicarte claramente que la deuda nunca bajaba. Si la letra era ilegible o no te avisaron de cómo se suman los intereses, el contrato puede anularse por ley.", plain: "Ocurre cuando el banco te vendió la tarjeta sin explicarte claramente que la deuda nunca bajaba. Si la letra era ilegible o no te avisaron de cómo se suman los intereses, el contrato puede anularse por ley." },
      { q: "¿Qué bancos o tarjetas se pueden reclamar habitualmente?", a: "Casi todas las tarjetas de grandes superficies y entidades especializadas son reclamables, como Wizink, Carrefour PASS, Cetelem, Oney o las tarjetas Oro de la banca tradicional si superan el interés legal.", plain: "Casi todas las tarjetas de grandes superficies y entidades especializadas son reclamables, como Wizink, Carrefour PASS, Cetelem, Oney o las tarjetas Oro de la banca tradicional si superan el interés legal." },
      { q: "¿Cuánto tiempo suele tardar el banco en responder?", a: "Una vez enviamos la reclamación extrajudicial, la entidad tiene por ley hasta un mes para darnos una respuesta antes de que decidamos acudir a la vía judicial.", plain: "Una vez enviamos la reclamación extrajudicial, la entidad tiene por ley hasta un mes para darnos una respuesta antes de que decidamos acudir a la vía judicial." },
      { q: "¿Me pueden incluir en un fichero de morosos si dejo de pagar mientras reclamo?", a: "Si la deuda está siendo discutida judicialmente por usura, el banco no debería incluirte en registros como ASNEF. En Calma te asesoramos sobre cómo gestionar los pagos durante el proceso.", plain: "Si la deuda está siendo discutida judicialmente por usura, el banco no debería incluirte en registros como ASNEF. En Calma te asesoramos sobre cómo gestionar los pagos durante el proceso." },
      { q: "¿Qué pasa si el banco me llama para ofrecerme rebajar el interés?", a: "Muchos bancos intentan evitar el juicio ofreciendo bajar el tipo de interés al 20%, pero esto suele ser una trampa para que firmes que no vas a reclamar el dinero que ya te han cobrado de más.", plain: "Muchos bancos intentan evitar el juicio ofreciendo bajar el tipo de interés al 20%, pero esto suele ser una trampa para que firmes que no vas a reclamar el dinero que ya te han cobrado de más." },
      { q: "¿Puedo reclamar también el seguro de protección de pagos?", a: "Sí, si el contrato se declara nulo por usura, también deben devolverte las primas de los seguros que te impusieron vinculados a esa tarjeta, ya que dichos seguros también se anulan.", plain: "Sí, si el contrato se declara nulo por usura, también deben devolverte las primas de los seguros que te impusieron vinculados a esa tarjeta, ya que dichos seguros también se anulan." },
      { q: "¿Tengo que ir a declarar al juzgado?", a: "En la gran mayoría de los casos no es necesario. El proceso es eminentemente documental y legal, por lo que nuestros abogados se encargan de todo sin que tú tengas que desplazarte.", plain: "En la gran mayoría de los casos no es necesario. El proceso es eminentemente documental y legal, por lo que nuestros abogados se encargan de todo sin que tú tengas que desplazarte." },
    ],
    conceptGlossary: {
      title: "Diccionario para entender tu tarjeta",
      subtitle: "Conceptos clave explicados de forma sencilla para que no te pierdas nada.",
      terms: [
        { term: "TAE (Tasa Anual Equivalente)", definition: "Es el indicador real de lo que te cuesta el préstamo cada año, incluyendo intereses y las comisiones bancarias." },
        { term: "Interés compuesto", definition: "Un sistema donde los intereses no pagados se suman a la deuda principal, provocando que cada mes pagues intereses sobre intereses anteriores." },
        { term: "Crédito Rotativo", definition: "Un tipo de crédito que se renueva según vas pagando cuotas o usando la tarjeta, haciendo que la deuda parezca no terminar nunca." },
        { term: "Condena en costas", definition: "Es cuando el juez obliga al banco a pagar los gastos del abogado y procurador del cliente al haber ganado este el juicio." },
        { term: "Acuerdo Extrajudicial", definition: "Es el pacto que se intenta alcanzar con el banco antes de ir a juicio para que devuelvan el dinero de forma más rápida." },
      ],
    },
    mythVsReality: {
      title: "Verdades y mentiras sobre las revolving",
      subtitle: "No dejes que el miedo o la falta de información te impidan recuperar lo que es tuyo.",
      items: [
        { myth: "Si firmé el contrato voluntariamente, ya no puedo reclamar.", reality: "Falso. Aunque firmaras, si las condiciones son abusivas o el interés es usurario según el Tribunal Supremo, la ley te protege y el contrato puede anularse." },
        { myth: "Tengo que esperar a pagar toda la deuda para ir a juicio.", reality: "Al contrario, demandar cuanto antes ayuda a frenar la bola de nieve de intereses y, en muchos casos, a dejar de pagar esas cuotas infinitas." },
        { myth: "Solo se puede reclamar si el interés supera el 25%.", reality: "No siempre. Según la última jurisprudencia, si el interés supera en 6 puntos porcentuales el precio medio del mercado en su categoría, ya puede considerarse usura." },
        { myth: "Reclamar al banco me costará más caro que lo que voy a recuperar.", reality: "En Calma trabajamos a éxito: si tú no ganas, nosotros no cobramos. Además, si hay condena en costas, el banco acaba pagando los gastos del proceso." },
      ],
    },
    extraSections: [
      {
            "title": "Novedades jurisprudencia 2025: ¿Cuándo es usura?",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "La viabilidad de tu reclamación depende de la fecha del contrato y la **TAE aplicada**. Tras las sentencias 154/2025 y 155/2025 del Tribunal Supremo, el criterio para determinar la usura se ha vuelto más preciso."
                  },
                  {
                        "kind": "table",
                        "headers": [
                              "Criterio",
                              "Referencia Legal"
                        ],
                        "rows": [
                              [
                                    "Usura por interés",
                                    "Si la TAE supera en más de 6 puntos el tipo medio de mercado del Banco de España."
                              ],
                              [
                                    "Falta de transparencia",
                                    "Cláusulas ilegibles, falta de información sobre el coste real o el método de amortización."
                              ],
                              [
                                    "Acuerdos previos",
                                    "Se puede reclamar incluso si firmaste una reducción de intereses con el banco anteriormente."
                              ]
                        ]
                  },
                  {
                        "kind": "callout",
                        "variant": "info",
                        "text": "Si tu situación es de insolvencia y no puedes pagar este ni otros préstamos, la reclamación judicial puede ser insuficiente. En esos casos, es más efectivo acogerse a la [Ley de Segunda Oportunidad](/ley-segunda-oportunidad)."
                  }
            ]
      },
      {
            "title": "Entidades y tarjetas con más reclamaciones",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Casi cualquier tarjeta con modalidad de pago aplazado contratada antes de 2021 es susceptible de ser anulada. Estas son las más comunes en los juzgados españoles:"
                  },
                  {
                        "kind": "optionCards",
                        "columns": 3,
                        "items": [
                              {
                                    "icon": "landmark",
                                    "title": "Bancarias",
                                    "text": "WiZink, Santander (Visa 123), BBVA (Aqua/Proyecta), CaixaBank (IKEA, Oro), Bankintercard."
                              },
                              {
                                    "icon": "wallet",
                                    "title": "Comerciales",
                                    "text": "Carrefour PASS, Oney (Alcampo, Leroy Merlin), Tarjeta El Corte Inglés, Cetelem."
                              },
                              {
                                    "icon": "scale",
                                    "title": "Otras",
                                    "text": "Cofidis, Vivus, tarjetas de fidelización de aerolíneas o gasolineras (Cepsa, Repsol)."
                              }
                        ]
                  }
            ]
      },
      {
            "title": "Documentación y plazos del proceso",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "No te preocupes si no conservas los papeles; nustros abogados pueden solicitarlos por ti. Para agilizar el proceso, lo ideal es reunir:"
                  },
                  {
                        "kind": "checkList",
                        "variant": "check",
                        "items": [
                              "Contrato original de la tarjeta (si lo tienes).",
                              "Extractos mensuales de los últimos años.",
                              "Cuadro de amortización actualizado.",
                              "DNI o NIE en vigor."
                        ]
                  },
                  {
                        "kind": "factGrid",
                        "columns": 2,
                        "items": [
                              {
                                    "value": "1-2 meses",
                                    "label": "Fase Extrajudicial",
                                    "detail": "Negociación directa con el SAC del banco."
                              },
                              {
                                    "value": "9-15 meses",
                                    "label": "Fase Judicial",
                                    "detail": "Tiempo medio si el banco no acepta el acuerdo."
                              },
                              {
                                    "value": "Imprescriptible",
                                    "label": "Nulidad",
                                    "detail": "Puedes pedir la nulidad sin importar los años pasados."
                              },
                              {
                                    "value": "5 años",
                                    "label": "Restitución",
                                    "detail": "Plazo para reclamar la devolución de dinero pagado."
                              }
                        ]
                  }
            ]
      },
      {
            "title": "Anatocismo: La trampa de la deuda perpetua",
            "blocks": [
                  {
                        "kind": "keyCallout",
                        "headline": "El efecto bola de nieve",
                        "body": "El gran peligro de estas tarjetas es el anatocismo: los intereses no pagados se suman al capital pendiente, generando nuevos intereses. Esto crea una deuda infinita donde la cuota mensual apenas cubre los gastos financieros."
                  },
                  {
                        "kind": "callout",
                        "variant": "warning",
                        "text": "Si además de la revolving tienes nóminas o bienes en riesgo, es vital actuar antes de que lleguen los embargos. Puedes ver cómo [parar un embargo](/embargos/parar-embargo) aquí."
                  }
            ]
      },
      {
            "title": "Honorarios y condiciones de éxito",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Trabajamos bajo el modelo de cuota de éxito. Si tú no ganas, nosotros tampoco cobranos honorarios de gestión."
                  },
                  {
                        "kind": "checkList",
                        "variant": "check",
                        "items": [
                              "Estudio de viabilidad 100% gratuito.",
                              "Sin cuotas mensuales de socio.",
                              "Honorarios basados en un porcentaje de lo recuperado (normalmente el 20%).",
                              "Si el banco es condenado al pago de costas, el cliente no suele abonar nada."
                        ]
                  },
                  {
                        "kind": "actionLink",
                        "to": "/cancelacion-de-deudas",
                        "text": "Consulta otros métodos legales para cancelar deudas"
                  }
            ]
      }
],
  },
  "/microcreditos-prestamos/cancelar-microcreditos": {
    faq: [
      { q: "¿Qué pasa si me arrepiento justo después de recibir el dinero?", a: "Tienes el derecho de desistimiento, que te permite cancelar el contrato sin dar explicaciones en los 14 días naturales siguientes a la firma. Solo tendrás que devolver el capital recibido y los intereses acumulados de esos pocos días.", plain: "Tienes el derecho de desistimiento, que te permite cancelar el contrato sin dar explicaciones en los 14 días naturales siguientes a la firma. Solo tendrás que devolver el capital recibido y los intereses acumulados de esos pocos días." },
      { q: "¿Cómo puedo frenar los cobros automáticos en mi cuenta?", a: "Puedes solicitar la revocación de la autorización de pago (ACH) avisando a tu banco y a la entidad con al menos 3 días hábiles de antelación. Esto detiene el cargo automático, aunque la deuda legamente sigue existiendo hasta que se solucione el contrato.", plain: "Puedes solicitar la revocación de la autorización de pago (ACH) avisando a tu banco y a la entidad con al menos 3 días hábiles de antelación. Esto detiene el cargo automático, aunque la deuda legamente sigue existiendo hasta que se solucione el contrato." },
      { q: "¿A partir de qué interés se considera que un microcrédito tiene usura?", a: "No hay una cifra fija, pero el Tribunal Supremo suele considerar usurario un interés que supere notablemente el precio normal del dinero. En microcréditos con TAEs de tres o cuatro dígitos, las posibilidades de anular los intereses son muy altas.", plain: "No hay una cifra fija, pero el Tribunal Supremo suele considerar usurario un interés que supere notablemente el precio normal del dinero. En microcréditos con TAEs de tres o cuatro dígitos, las posibilidades de anular los intereses son muy altas." },
      { q: "¿Qué diferencia hay entre cancelar un microcrédito y un crédito rápido?", a: "Técnicamente, los microcréditos suelen ser de hasta 1.000 € y plazos cortos, mientras que los rápidos llegan a los 10.000 €. Ambos pueden cancelarse judicialmente si sus intereses son abusivos, recuperando todo lo pagado de más.", plain: "Técnicamente, los microcréditos suelen ser de hasta 1.000 € y plazos cortos, mientras que los rápidos llegan a los 10.000 €. Ambos pueden cancelarse judicialmente si sus intereses son abusivos, recuperando todo lo pagado de más." },
      { q: "¿Puedo bloquear mi historial para que nadie pida préstamos en mi nombre?", a: "Sí, puedes solicitar un congelamiento de tu reporte de crédito a las agencias de solvencia. Es un trámite gratuito y eficaz para evitar que empresas de microcréditos aprueben solicitudes fraudulentas usando tu identidad.", plain: "Sí, puedes solicitar un congelamiento de tu reporte de crédito a las agencias de solvencia. Es un trámite gratuito y eficaz para evitar que empresas de microcréditos aprueben solicitudes fraudulentas usando tu identidad." },
      { q: "¿Si anulo el contrato tengo que pagar algo?", a: "Si un juez declara el contrato nulo por usura, solo estarás obligado a devolver el capital principal que te prestaron. Si ya has pagado más de esa cantidad entre cuotas y comisiones, la entidad deberá devolverte a ti la diferencia.", plain: "Si un juez declara el contrato nulo por usura, solo estarás obligado a devolver el capital principal que te prestaron. Si ya has pagado más de esa cantidad entre cuotas y comisiones, la entidad deberá devolverte a ti la diferencia." },
      { q: "¿Qué es la Ley Azcárate y cómo me ayuda?", a: "Es la Ley de Represión de la Usura de 1908, que sigue vigente en España. Se utiliza para invalidar contratos de microcréditos con intereses desproporcionados o condiciones leoninas que se aprovecharon de tu situación económica.", plain: "Es la Ley de Represión de la Usura de 1908, que sigue vigente en España. Se utiliza para invalidar contratos de microcréditos con intereses desproporcionados o condiciones leoninas que se aprovecharon de tu situación económica." },
      { q: "¿Cómo puedo amortizar la deuda más rápido si no tengo liquidez?", a: "Lo ideal es una estrategia de liquidación enfocada en reducir el capital principal mediante pagos extraordinarios. En Calma te ayudamos a negociar quitas o reestructurar el pago para que el dinero vaya a la deuda y no a intereses infinitos.", plain: "Lo ideal es una estrategia de liquidación enfocada en reducir el capital principal mediante pagos extraordinarios. En Calma te ayudamos a negociar quitas o reestructurar el pago para que el dinero vaya a la deuda y no a intereses infinitos." },
    ],
    conceptGlossary: {
      title: "Diccionario legal sencillo",
      subtitle: "Entiende los términos que usan las entidades financieras sin complicaciones.",
      terms: [
        { term: "TAE (Tasa Anual Equivalente)", definition: "Es el coste real del préstamo cada año, sumando intereses y comisiones; es el dato clave para saber si tu microcrédito es abusivo." },
        { term: "Derecho de desistimiento", definition: "Tu facultad legal para dejar sin efecto un contrato de préstamo en los primeros 14 días sin necesidad de justificar por qué." },
        { term: "Interés Moratorio", definition: "Es el recargo extra que te aplican cuando te retrasas en un pago; también puede ser reclamado si es excesivo." },
        { term: "Orden de suspensión de pago", definition: "Instrucción que das a tu banco para que no permita que una empresa específica retire dinero de tu cuenta de forma automática." },
        { term: "Condonación de deuda", definition: "Acuerdo por el cual la entidad acreedora acepta perdonar una parte de lo que debes para que puedas cerrar el préstamo definitivamente." },
      ],
    },
    mythVsReality: {
      title: "Verdades y mentiras sobre los microcréditos",
      subtitle: "Desmontamos los bulos más comunes para que recuperes tu tranquilidad.",
      items: [
        { myth: "“Si firmé el contrato por internet, ya no hay marcha atrás.”", reality: "Falso. Tienes exactamente los mismos derechos que en un contrato físico, incluyendo el derecho a reclamar por usura o desistir en los primeros días." },
        { myth: "“Solo se pueden cancelar los intereses si son superiores al 200% TAE.”", reality: "No es cierto. Dependiendo del tipo de producto y la fecha del contrato, intereses mucho menores (en torno al 24%-30% en ciertos créditos) ya pueden considerarse abusivos." },
        { myth: "“Si dejo de pagar el cobro automático, la deuda desaparece.”", reality: "La deuda sigue activa en sus sistemas. Lo correcto es cancelar el pago y, en paralelo, iniciar una reclamación legal para que un juez dicte cuánto debes pagar realmente." },
        { myth: "“Ir a juicio contra una financiera es más caro que lo que voy a recuperar.”", reality: "En la mayoría de casos de usura, la entidad es condenada a pagar las costas del proceso, por lo que el trámite puede salirte gratis mientras recuperas tu dinero." },
      ],
    },
    extraSections: [
      {
            "title": "Derechos de cancelación y revocación inmediata",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Si acabas de solicitar un microcrédito y te has arrepentido, tienes herramientas legales para frenarlo antes de que la deuda se dispare. No siempre es necesario llegar a una reclamación judicial."
                  },
                  {
                        "kind": "table",
                        "headers": [
                              "Acción",
                              "Plazos y Condiciones",
                              "Impacto"
                        ],
                        "rows": [
                              [
                                    "Desistimiento",
                                    "14 días naturales desde la firma.",
                                    "Devuelves el capital sin dar explicaciones."
                              ],
                              [
                                    "Revocación ACH",
                                    "En cualquier momento por escrito.",
                                    "Frenas el cobro automático en tu cuenta."
                              ],
                              [
                                    "Orden de suspensión",
                                    "Mínimo 3 días antes del cobro.",
                                    "El banco bloquea un cargo específico."
                              ]
                        ]
                  },
                  {
                        "kind": "callout",
                        "variant": "info",
                        "title": "Nota sobre el banco",
                        "text": "Informar a la financiera no basta; comunica siempre a tu entidad bancaria la revocación de la autorización para evitar que sigan intentando domiciliar recibos."
                  }
            ]
      },
      {
            "title": "La Ley de Segunda Oportunidad para microcréditos",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Cuando los microcréditos superan tu capacidad de pago y la suma de deudas es inasumible, la [Ley de Segunda Oportunidad](/ley-segunda-oportunidad) es la herramienta definitiva para obtener la [exoneración del pasivo insatisfecho](/ley-segunda-oportunidad/exoneracion-pasivo-insatisfecho)."
                  },
                  {
                        "kind": "checkList",
                        "variant": "check",
                        "items": [
                              "Insolvencia demostrable: No puedes pagar tus deudas actuales.",
                              "Buena fe: No tener condenas por delitos económicos en los últimos 10 años.",
                              "Deuda multiacreedor: Tener deudas con al menos dos entidades distintas.",
                              "Sin bienes o liquidables: Ideal para quienes no tienen vivienda en propiedad pagada."
                        ]
                  },
                  {
                        "kind": "actionLink",
                        "to": "/abogados-ley-segunda-oportunidad",
                        "text": "Consultar con abogados especialistas en LSO"
                  }
            ]
      },
      {
            "title": "Intereses usurarios: Entidades con tipos abusivos",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "El Tribunal Supremo considera usura cualquier préstamo con un interés notablemente superior al normal del dinero. En microcréditos, donde se ven TAEs de tres y cuatro cifras, la nulidad suele ser clara."
                  },
                  {
                        "kind": "factGrid",
                        "columns": 2,
                        "items": [
                              {
                                    "value": "> 25%",
                                    "label": "Umbral de usura",
                                    "detail": "Referencia habitual en jurisprudencia para préstamos al consumo."
                              },
                              {
                                    "value": "Sólo Capital",
                                    "label": "Consecuencia",
                                    "detail": "Si se anula, solo devuelves lo prestado, sin intereses ni seguros."
                              }
                        ]
                  },
                  {
                        "kind": "paragraph",
                        "text": "Entidades como Cofidis, Creditea o Bondora han comercializado productos con TAEs que oscilan entre el 24% y más del 100%, siendo susceptibles de una [reclamación judicial por deuda](/juicio-monitorio-deuda)."
                  }
            ]
      },
      {
            "title": "Estrategias de renegociación y protección",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Si no quieres ir a juicio, existen vías intermedias para oxigenar tu economía mensual."
                  },
                  {
                        "kind": "optionCards",
                        "columns": 2,
                        "items": [
                              {
                                    "icon": "wallet",
                                    "title": "Reunificación",
                                    "text": "Agrupar todas las cuotas en una sola para bajar el pago mensual.",
                                    "links": [
                                          {
                                                "to": "/reunificar-deudas",
                                                "label": "Ver opciones de reunificación"
                                          }
                                    ]
                              },
                              {
                                    "icon": "shield",
                                    "title": "Congelamiento",
                                    "text": "Solicitar el bloqueo de acceso a tu historial en ASNEF o Experian para evitar nueva deuda.",
                                    "links": [
                                          {
                                                "to": "/asnef/salir-de-asnef",
                                                "label": "Gestionar ficheros"
                                          }
                                    ]
                              }
                        ]
                  }
            ]
      },
      {
            "title": "El peligro de los avalistas en préstamos rápidos",
            "blocks": [
                  {
                        "kind": "keyCallout",
                        "eyebrow": "Atención",
                        "headline": "El 40% de los avalistas terminan asumiendo la deuda",
                        "body": "En los microcréditos, si hay un avalista, la entidad irá contra sus bienes al primer impago."
                  },
                  {
                        "kind": "paragraph",
                        "text": "Para proteger a un avalista, las opciones son limitadas pero vitales: solicitar una liberación formal por solvencia sobrevenida del titular, refinanciar el préstamo excluyendo al aval o, en casos extremos, acogerte a la [cancelación de deudas](/cancelacion-de-deudas) para liberar a ambas partes si se cumplen los requisitos legales."
                  }
            ]
      },
      {
            "title": "Amortización y sostenibilidad financiera",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Para salir definitivamente del bucle de los préstamos rápidos, una vez cancelados los intereses abusivos, es fundamental cambiar la estrategia de pagos."
                  },
                  {
                        "kind": "checkList",
                        "variant": "check",
                        "items": [
                              "Amortización anticipada: Reduce capital lo antes posible para evitar intereses compuestos.",
                              "Fondo de emergencia: Priorizar un ahorro mínimo para no recurrir a dinero rápido ante imprevistos.",
                              "Banca regulada: Buscar préstamos personales con garantía bancaria, cuyos tipos rara vez superan el 10-12% TAE."
                        ]
                  }
            ]
      }
],
  },
  "/ley-segunda-oportunidad/exoneracion-pasivo-insatisfecho": {
    faq: [
      { q: "¿Pueden las empresas o sociedades acogirse a este proceso?", a: "No, la exoneración está diseñada exclusivamente para personas físicas, ya sean particulares o trabajadores autónomos. Las empresas (SL, SA) deben seguir el proceso de concurso de acreedores ordinario para su disolución.", plain: "No, la exoneración está diseñada exclusivamente para personas físicas, ya sean particulares o trabajadores autónomos. Las empresas (SL, SA) deben seguir el proceso de concurso de acreedores ordinario para su disolución." },
      { q: "¿Qué ocurre si no tengo bienes ni patrimonio?", a: "Es lo que se conoce como concurso sin masa. El juez puede conceder la exoneración de forma directa tras comprobar que no hay activos para liquidar, acelerando notablemente los plazos del proceso.", plain: "Es lo que se conoce como concurso sin masa. El juez puede conceder la exoneración de forma directa tras comprobar que no hay activos para liquidar, acelerando notablemente los plazos del proceso." },
      { q: "¿Necesito un abogado para tramitar la exoneración?", a: "Sí, la ley actual exige la intervención de un abogado y un procurador para presentar la solicitud ante el Juzgado de lo Mercantil. Es un proceso judicial reglado que requiere defensa técnica.", plain: "Sí, la ley actual exige la intervención de un abogado y un procurador para presentar la solicitud ante el Juzgado de lo Mercantil. Es un proceso judicial reglado que requiere defensa técnica." },
      { q: "¿Puedo volver a pedir el perdón de las deudas en el futuro?", a: "Sí, pero aplicando plazos de espera. Deben pasar entre 2 y 5 años desde la última exoneración concedida, dependiendo de si se obtuvo mediante liquidación o mediante un plan de pagos.", plain: "Sí, pero aplicando plazos de espera. Deben pasar entre 2 y 5 años desde la última exoneración concedida, dependiendo de si se obtuvo mediante liquidación o mediante un plan de pagos." },
      { q: "¿Qué deudas quedan fuera y tendré que pagar sí o sí?", a: "No se pueden cancelar las deudas por pensiones de alimentos a hijos, multas penales, deudas por responsabilidad civil derivada de delito ni aquellas que superen los límites en Hacienda o Seguridad Social.", plain: "No se pueden cancelar las deudas por pensiones de alimentos a hijos, multas penales, deudas por responsabilidad civil derivada de delito ni aquellas que superen los límites en Hacienda o Seguridad Social." },
      { q: "¿Qué documentos mínimos necesito para empezar?", a: "Básicamente, tu certificado de antecedentes penales, las tres últimas declaraciones de la renta, un listado detallado de tus acreedores y un informe de vida laboral actualizado.", plain: "Básicamente, tu certificado de antecedentes penales, las tres últimas declaraciones de la renta, un listado detallado de tus acreedores y un informe de vida laboral actualizado." },
      { q: "¿Si soy autónomo, puedo seguir trabajando durante el proceso?", a: "Totalmente. El objetivo de la ley es que puedas mantener tu actividad profesional para generar ingresos, siempre que cumplas con las obligaciones del proceso o del plan de pagos acordado.", plain: "Totalmente. El objetivo de la ley es que puedas mantener tu actividad profesional para generar ingresos, siempre que cumplas con las obligaciones del proceso o del plan de pagos acordado." },
      { q: "¿Se notificará mi situación a mi entorno o empresa?", a: "El proceso es público a nivel judicial, pero no se envía comunicación a tu empleador ni a tus familiares. Solo reciben la notificación los bancos y entidades a las que les debes dinero.", plain: "El proceso es público a nivel judicial, pero no se envía comunicación a tu empleador ni a tus familiares. Solo reciben la notificación los bancos y entidades a las que les debes dinero." },
    ],
    conceptGlossary: {
      title: "Diccionario para tu libertad financiera",
      subtitle: "Conceptos clave de la ley explicados para que los entiendas a la primera",
      terms: [
        { term: "EPI", definition: "Siglas de Exoneración del Pasivo Insatisfecho. Es el nombre técnico y legal que recibe el perdón de tus deudas por parte de un juez." },
        { term: "Buena fe del deudor", definition: "Es el requisito ético de no haber provocado la insolvencia a propósito ni tener antecedentes penales por delitos económicos o falsedad documental." },
        { term: "Concurso sin masa", definition: "Situación legal que ocurre cuando el deudor no tiene bienes suficientes (vivienda, coches o ahorros) para cubrir los gastos mínimos del juicio." },
        { term: "Plan de pagos", definition: "Calendario de entre 3 y 5 años que permite salvar tu vivienda o negocio, pagando una parte pequeña y asumible de la deuda antes de cancelar el resto." },
        { term: "Crédito público", definition: "Se refiere a las deudas que tienes con administraciones del Estado, principalmente con la Agencia Tributaria (Hacienda) y la Seguridad Social." },
        { term: "Masa activa", definition: "Es el conjunto de todos tus bienes, derechos y ahorros que pueden utilizarse para pagar a los acreedores antes de solicitar el perdón de la deuda sobrante." },
      ],
    },
    mythVsReality: {
      title: "Verdades y mentiras sobre la cancelación de deudas",
      subtitle: "No dejes que los bulos te impidan empezar de cero",
      items: [
        { myth: "“Si pido la exoneración, nunca más me darán un préstamo”", reality: "Falso. Una vez obtienes la sentencia, sales de los ficheros de morosos (ASNEF/Experian) y tu capacidad crediticia se restaura progresivamente al mejorar tu salud financiera." },
        { myth: "“Tengo que pagar una cantidad mínima para que me perdonen el resto”", reality: "Con la nueva ley, ya no es obligatorio haber pagado un porcentaje mínimo de la deuda. Si demuestras insolvencia y buena fe, puedes optar al perdón total de las deudas exonerables." },
        { myth: "“Hacienda es intocable y nunca me perdonarán nada”", reality: "Actualmente puedes cancelar hasta 10.000 € de Hacienda y otros 10.000 € de Seguridad Social. Es un límite marcado por la ley para facilitar el retorno de autónomos a la actividad." },
        { myth: "“Me voy a quedar sin nada, ni para comer”", reality: "La ley protege siempre el mínimo inembargable. El proceso garantiza que conserves lo necesario para vivir dignamente y, en muchos casos, permite salvar la vivienda habitual según el plan de pagos." },
      ],
    },
    extraSections: [
      {
            "title": "Un derecho ciudadano: el nuevo marco legal (TRLC)",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Desde la reforma de la Ley 16/2022, la **exoneración del pasivo insatisfecho** ha dejado de ser un beneficio que el juez puede otorgar, para convertirse en un **derecho del deudor insolvente**. Este cambio legal, impulsado por la Directiva Europea 2019/1023, busca el 'fresh start' o borrón y cuenta nueva para que las personas naturales puedan reinsertarse en la economía sin el estigma de la deuda perpetua."
                  },
                  {
                        "kind": "keyCallout",
                        "headline": "Personas naturales: las únicas beneficiarias",
                        "body": "Este mecanismo es exclusivo para personas físicas (consumidores, autónomos y profesionales). Las sociedades (SL, SA) no pueden pedir la EPI, ya que estas se extinguen tras la liquidación mercantil."
                  },
                  {
                        "kind": "actionLink",
                        "to": "/autonomos-concurso-acreedores/concurso-persona-fisica",
                        "text": "Más información sobre el concurso para personas físicas"
                  }
            ]
      },
      {
            "title": "El requisito de Buena Fe: qué es y cuándo se pierde",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Para acceder a la EPI es imprescindible ser un deudor de buena fe. La ley establece supuestos objetivos donde esta condición se considera inexistente, bloqueando el acceso al procedimiento."
                  },
                  {
                        "kind": "callout",
                        "variant": "warning",
                        "title": "Causas de exclusión por falta de buena fe",
                        "text": "No podrás acogerte si en los últimos 10 años has sido condenado por delitos contra el patrimonio, Hacienda Pública o Seguridad Social con penas superiores a 3 años, o si has recibido sanciones administrativas muy graves."
                  },
                  {
                        "kind": "checkList",
                        "variant": "cross",
                        "items": [
                              "Haber aportado información falsa al solicitar créditos.",
                              "Tener un concurso declarado como 'culpable' por el juez.",
                              "Haber actuado de forma temeraria o negligente al endeudarse.",
                              "Haber sido sancionado por infracciones tributarias o laborales muy graves."
                        ]
                  }
            ]
      },
      {
            "title": "La modalidad del Concurso sin Masa",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Es la vía más común para deudores que no tienen patrimonio o cuyo valor es tan bajo que ni siquiera cubriría los gastos del juicio. Permite una exoneración mucho más rápida."
                  },
                  {
                        "kind": "factGrid",
                        "columns": 2,
                        "items": [
                              {
                                    "value": "Sin liquidación",
                                    "label": "Activos nulos",
                                    "detail": "Si no hay bienes, no hay nada que vender."
                              },
                              {
                                    "value": "15 días",
                                    "label": "Plazo acreedores",
                                    "detail": "Tiempo para que los acreedores soliciten un administrador."
                              }
                        ]
                  },
                  {
                        "kind": "actionLink",
                        "to": "/cancelacion-de-deudas",
                        "text": "Consulta cómo cancelar deudas sin bienes"
                  }
            ]
      },
      {
            "title": "Salvaguardar la vivienda habitual con el Plan de Pagos",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "La ley permite actualmente proteger tu casa. Esto sucede especialmente bajo dos supuestos claros avalados por la jurisprudencia actual:"
                  },
                  {
                        "kind": "optionCards",
                        "columns": 2,
                        "items": [
                              {
                                    "icon": "shield",
                                    "title": "Plan de Pagos a 5 años",
                                    "text": "Aceptas un calendario de pagos parciales para proteger la vivienda y no liquidarla."
                              },
                              {
                                    "icon": "scale",
                                    "title": "Vivienda sin valor de mercado",
                                    "text": "Si la deuda hipotecaria es mayor que el valor real de la casa, el juez puede excluirla de la venta."
                              }
                        ]
                  },
                  {
                        "kind": "actionLink",
                        "to": "/embargos/parar-embargo",
                        "text": "Cómo parar el embargo de tu vivienda"
                  }
            ]
      },
      {
            "title": "Documentación indispensable para el juzgado",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Para que el juez dicte el Auto de exoneración, debemos preparar un expediente riguroso. Sin estos documentos, la solicitud no será admitida a trámite:"
                  },
                  {
                        "kind": "table",
                        "headers": [
                              "Tipo de Documento",
                              "Finalidad"
                        ],
                        "rows": [
                              [
                                    "Memoria Económica",
                                    "Explicación de las causas que te han llevado a la insolvencia."
                              ],
                              [
                                    "Inventario de Bienes",
                                    "Listado detallado de propiedades, vehículos y saldos bancarios."
                              ],
                              [
                                    "Relación de Acreedores",
                                    "Listado con nombre, cuantía y tipo de deuda de cada acreedor."
                              ],
                              [
                                    "Certificado de Penales",
                                    "Documento que acredita la ausencia de delitos que impidan la buena fe."
                              ]
                        ]
                  }
            ]
      },
      {
            "title": "Plazos y costes del procedimiento",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Tras la reforma de 2022, el proceso se ha agilizado al eliminarse la necesidad de mediador concursal en la mayoría de casos, reduciendo costes y tiempos."
                  },
                  {
                        "kind": "factGrid",
                        "columns": 3,
                        "items": [
                              {
                                    "value": "6-18 meses",
                                    "label": "Duración media",
                                    "detail": "Depende de la carga del juzgado."
                              },
                              {
                                    "value": "Obligatorio",
                                    "label": "Abogado y Procurador",
                                    "detail": "Intervención legal preceptiva."
                              },
                              {
                                    "value": "0 €",
                                    "label": "Mediador",
                                    "detail": "Ya no es necesario en la vía directa."
                              }
                        ]
                  },
                  {
                        "kind": "actionLink",
                        "to": "/abogados-ley-segunda-oportunidad",
                        "text": "Hablar con abogados especialistas en LSO"
                  }
            ]
      }
],
  },
  "/autonomos-concurso-acreedores/concurso-persona-fisica": {
    faq: [
      { q: "¿Qué ocurre si tengo deudas con Hacienda o la Seguridad Social?", a: "La ley permite cancelar hasta 10.000 euros de deuda con Hacienda y otros 10.000 con la Seguridad Social. El resto de la deuda pública debe abonarse mediante un plan de pagos personalizado.", plain: "La ley permite cancelar hasta 10.000 euros de deuda con Hacienda y otros 10.000 con la Seguridad Social. El resto de la deuda pública debe abonarse mediante un plan de pagos personalizado." },
      { q: "¿Puedo pedir el concurso si solo tengo un acreedor?", a: "No, la normativa exige la existencia de al menos dos acreedores diferentes (por ejemplo, un banco y una entidad de suministros) para poder iniciar el procedimiento legal.", plain: "No, la normativa exige la existencia de al menos dos acreedores diferentes (por ejemplo, un banco y una entidad de suministros) para poder iniciar el procedimiento legal." },
      { q: "¿Qué documentos básicos necesito preparar?", a: "Necesitarás un inventario de tus bienes, una lista detallada de tus deudas, los últimos certificados de antecedentes penales y una memoria que explique por qué no puedes pagar.", plain: "Necesitarás un inventario de tus bienes, una lista detallada de tus deudas, los últimos certificados de antecedentes penales y una memoria que explique por qué no puedes pagar." },
      { q: "¿Cuánto tiempo dura el proceso desde que empezamos?", a: "Aunque depende del juzgado, la mayoría de los casos de personas físicas suelen resolverse en un periodo de entre 6 y 18 meses.", plain: "Aunque depende del juzgado, la mayoría de los casos de personas físicas suelen resolverse en un periodo de entre 6 y 18 meses." },
      { q: "¿Qué pasa con mis tarjetas y cuentas bancarias durante el proceso?", a: "Generalmente, las tarjetas se bloquean para evitar que la deuda crezca, pero mantendrás una cuenta operativa para tus ingresos y gastos de subsistencia bajo supervisión profesional.", plain: "Generalmente, las tarjetas se bloquean para evitar que la deuda crezca, pero mantendrás una cuenta operativa para tus ingresos y gastos de subsistencia bajo supervisión profesional." },
      { q: "¿Puedo pedir el concurso si he cometido algún delito?", a: "Solo si no son delitos socioeconómicos, contra el patrimonio o Hacienda en los últimos 10 años. Otros delitos ajenos a la gestión del dinero no suelen impedir el proceso.", plain: "Solo si no son delitos socioeconómicos, contra el patrimonio o Hacienda en los últimos 10 años. Otros delitos ajenos a la gestión del dinero no suelen impedir el proceso." },
      { q: "¿Están obligados mis acreedores a aceptar la cancelación?", a: "Si cumples los requisitos legales de buena fe y presentas correctamente la solicitud, un juez dictará el perdón de las deudas sin que los acreedores puedan impedirlo.", plain: "Si cumples los requisitos legales de buena fe y presentas correctamente la solicitud, un juez dictará el perdón de las deudas sin que los acreedores puedan impedirlo." },
      { q: "¿Qué es el límite de los 5 millones de euros?", a: "Es la cantidad máxima de deuda total que permite la ley para tramitar este concurso simplificado; por encima de esa cifra, el proceso es más complejo.", plain: "Es la cantidad máxima de deuda total que permite la ley para tramitar este concurso simplificado; por encima de esa cifra, el proceso es más complejo." },
      { q: "¿Pueden quitarme la pensión de alimentos de mis hijos?", a: "No, las deudas por pensión de alimentos son legalmente intocables y no se pueden cancelar en este procedimiento bajo ningún concepto.", plain: "No, las deudas por pensión de alimentos son legalmente intocables y no se pueden cancelar en este procedimiento bajo ningún concepto." },
    ],
    conceptGlossary: {
      title: "Diccionario para tu tranquilidad",
      subtitle: "Conceptos clave del concurso explicados de forma sencilla",
      terms: [
        { term: "Insolvencia", definition: "Situación real en la que no puedes atender tus pagos corrientes, ya sea de forma inminente o porque ya has dejado de pagar." },
        { term: "EPI (Exoneración)", definition: "Es el perdón legal y definitivo de tus deudas, concedido por el juez tras verificar que cumples los requisitos de buena fe." },
        { term: "Masa activa", definition: "El conjunto de todos tus bienes y derechos (vivienda, coche, saldos bancarios) en el momento de pedir el concurso." },
        { term: "Acreedor", definition: "Cualquier persona o entidad a la que le debes dinero, ya sea un banco, una eléctrica o la administración pública." },
        { term: "Quita", definition: "Acuerdo o decisión legal por la que se reduce el importe total de la deuda que debes pagar." },
        { term: "Espera", definition: "Aplazamiento o prórroga del plazo para pagar una deuda, dándote más tiempo para reorganizar tu economía." },
      ],
    },
    mythVsReality: {
      title: "Verdades sobre la Ley de Segunda Oportunidad",
      subtitle: "Desmontamos los bulos más comunes para que decidas con información real",
      items: [
        { myth: "“Si pido el concurso, me quedo sin nada de dinero para vivir”", reality: "Falso. La ley protege el SMI (Salario Mínimo Interprofesional) y las cantidades necesarias para que tú y tu familia viváis con dignidad." },
        { myth: "“Apareceré para siempre en una lista de morosos”", reality: "Al contrario: el objetivo del proceso es que tus datos se borren de ficheros como ASNEF o EXPERIAN una vez obtenida la cancelación." },
        { myth: "“Si estoy casado en gananciales, mi pareja pierde todo su patrimonio”", reality: "No tiene por qué. Es posible disolver la sociedad de gananciales y proteger la parte de los bienes que legalmente le correspondan al cónyuge." },
        { myth: "“Este proceso solo sirve para empresas en quiebra”", reality: "Es un error común. Desde 2015, los particulares y autónomos tienen exactamente el mismo derecho a empezar de cero que las grandes compañías." },
        { myth: "“Las deudas con el banco nunca se perdonan”", reality: "Falso. Los préstamos personales, tarjetas y créditos rápidos son las deudas más fáciles de cancelar íntegramente de forma judicial." },
      ],
    },
    extraSections: [
      {
            "title": "Tipos de concurso: Voluntario vs. Necesario",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "No todos los concursos se inician de la misma forma. La ley distingue quién toma la iniciativa y qué consecuencias tiene para el deudor."
                  },
                  {
                        "kind": "optionCards",
                        "columns": 2,
                        "items": [
                              {
                                    "icon": "sparkles",
                                    "title": "Concurso Voluntario",
                                    "text": "Presentado por el propio deudor en un plazo de 2 meses desde que conoce su insolvencia. Permite mantener, por lo general, las facultades de administración bajo supervisión."
                              },
                              {
                                    "icon": "gavel",
                                    "title": "Concurso Necesario",
                                    "text": "Instado por un acreedor ante impagos generalizados. Es más arriesgado, ya que el deudor suele ser suspendido de sus facultades de administración y sustituido por el administrador concursal."
                              }
                        ]
                  }
            ]
      },
      {
            "title": "Requisitos legales y exclusiones",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Para acceder a este mecanismo y aspirar a la exoneración, el deudor debe cumplir estrictamente con el perfil de **buena fe** definido en el Texto Refundido de la Ley Concursal."
                  },
                  {
                        "kind": "checkList",
                        "variant": "check",
                        "items": [
                              "Deuda total inferior a 5 millones de euros.",
                              "No haber sido condenado por delitos económicos o contra la Hacienda Pública en los últimos 10 años.",
                              "Colaboración activa con el juzgado y la administración concursal.",
                              "No haber acudido a este procedimiento en los últimos 2 a 5 años (según el caso).",
                              "No haber rechazado ofertas de empleo adecuadas a su perfil en los meses previos."
                        ]
                  }
            ]
      },
      {
            "title": "Impacto en el patrimonio y la familia",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "El concurso no solo afecta a tus deudas, sino también a la gestión de tus bienes y tu entorno familiar, especialmente si hay un matrimonio de por medio."
                  },
                  {
                        "kind": "callout",
                        "variant": "info",
                        "title": "Sociedad de Gananciales",
                        "text": "Si estás casado en gananciales, los bienes comunes pueden integrarse en la masa del concurso para pagar deudas comunes. El cónyuge no concursado tiene derecho a solicitar la disolución del régimen matrimonial o el uso preferente de la vivienda habitual previo pago de su valor."
                  },
                  {
                        "kind": "paragraph",
                        "text": "Es fundamental asesorarse para proteger los derechos del cónyuge y evitar que las adquisiciones onerosas del último año sean impugnadas por presunción de donación."
                  },
                  {
                        "kind": "actionLink",
                        "to": "/abogados-ley-segunda-oportunidad",
                        "text": "Habla con un abogado experto en patrimonio familiar"
                  }
            ]
      },
      {
            "title": "Quitas y Esperas: ¿Qué se puede negociar?",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Si el objetivo no es la liquidación total sino salvar ciertos activos, se puede proponer un plan de pagos basado en dos herramientas clave:"
                  },
                  {
                        "kind": "factGrid",
                        "columns": 2,
                        "items": [
                              {
                                    "value": "40% - 50%",
                                    "label": "Quita Media",
                                    "detail": "Reducción del importe total de la deuda bancaria o comercial."
                              },
                              {
                                    "value": "5 - 10 años",
                                    "label": "Espera",
                                    "detail": "Aplazamiento de los pagos para ajustarlos a tus ingresos reales."
                              }
                        ]
                  }
            ]
      },
      {
            "title": "Deudas que no se pueden cancelar",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Aunque la [Ley de Segunda Oportunidad](/ley-segunda-oportunidad) es muy amplia, existen ciertos créditos que gozan de una protección especial por ley."
                  },
                  {
                        "kind": "table",
                        "headers": [
                              "Tipo de Deuda",
                              "Estado de Exoneración"
                        ],
                        "rows": [
                              [
                                    "Hacienda y Seguridad Social",
                                    "Limitada (máximo 10.000€ en cada organismo)"
                              ],
                              [
                                    "Pensiones de alimentos",
                                    "No exonerable (protección al menor)"
                              ],
                              [
                                    "Multas y sanciones penales",
                                    "No exonerable"
                              ],
                              [
                                    "Hipotecas",
                                    "Solo la deuda sobrante tras la subasta del bien"
                              ]
                        ]
                  },
                  {
                        "kind": "actionLink",
                        "to": "/deudas-hacienda-seguridad-social/deudas-hacienda",
                        "text": "Más info sobre deudas públicas"
                  }
            ]
      },
      {
            "title": "Riesgos: La calificación del concurso",
            "blocks": [
                  {
                        "kind": "callout",
                        "variant": "warning",
                        "title": "El riesgo del concurso culpable",
                        "text": "Si el juez determina que has provocado o agravado tu insolvencia por dolo o culpa grave (ocultar bienes, contabilidad falsa, etc.), el concurso se declarará culpable."
                  },
                  {
                        "kind": "paragraph",
                        "text": "Las consecuencias de un concurso culpable son severas e incluyen la inhabilitación para administrar bienes (de 2 a 15 años) y la pérdida del derecho a la [cancelación de deudas](/cancelar-deudas)."
                  }
            ]
      },
      {
            "title": "Documentación obligatoria",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Para iniciar el trámite con garantías, es necesario preparar un expediente exhaustivo que acredite tu situación real."
                  },
                  {
                        "kind": "checkList",
                        "variant": "check",
                        "items": [
                              "Memoria jurídica y económica: explicación de por qué has llegado a esta situación.",
                              "Inventario de bienes y derechos (viviendas, vehículos, cuentas, rentas).",
                              "Lista de acreedores con importes exactos, vencimientos y datos de contacto.",
                              "Certificado de antecedentes penales y certificado de empadronamiento.",
                              "Certificación de ingresos (nóminas, pensiones o facturación)."
                        ]
                  }
            ]
      }
],
  },
  "/juicio-monitorio-recobro/juicio-monitorio-deuda": {
    faq: [
      { q: "¿Qué requisitos debe cumplir la deuda para que me lleven a un monitorio?", a: "La deuda debe ser dineraria, estar vencida y ser exigible. Además, debe ser líquida, lo que significa que la cantidad reclamada debe determinarse mediante números exactos en la solicitud.", plain: "La deuda debe ser dineraria, estar vencida y ser exigible. Además, debe ser líquida, lo que significa que la cantidad reclamada debe determinarse mediante números exactos en la solicitud." },
      { q: "¿Dónde se celebra el juicio y qué juzgado es el responsable?", a: "El proceso se tramita en el Juzgado de Primera Instancia del domicilio del deudor. Si cambiaste de residencia recientemente, es fundamental acreditarlo para que el juzgado correspondiente sea el de tu ciudad actual.", plain: "El proceso se tramita en el Juzgado de Primera Instancia del domicilio del deudor. Si cambiaste de residencia recientemente, es fundamental acreditarlo para que el juzgado correspondiente sea el de tu ciudad actual." },
      { q: "¿Qué documentos puede usar la otra parte como prueba contra mí?", a: "Suelen presentar facturas, albaranes firmados, contratos, recibos bancarios o incluso certificaciones de impago de una comunidad de vecinos. Cualquier documento que demuestre una relación comercial previa suele ser admitido.", plain: "Suelen presentar facturas, albaranes firmados, contratos, recibos bancarios o incluso certificaciones de impago de una comunidad de vecinos. Cualquier documento que demuestre una relación comercial previa suele ser admitido." },
      { q: "¿Tengo que pagar tasas judiciales por ser persona física?", a: "No, los ciudadanos particulares están exentos de pagar tasas judiciales en España para este procedimiento. Solo las empresas (personas jurídicas) deben pagar una tasa fija de 100 euros si la deuda supera los 2.000 euros.", plain: "No, los ciudadanos particulares están exentos de pagar tasas judiciales en España para este procedimiento. Solo las empresas (personas jurídicas) deben pagar una tasa fija de 100 euros si la deuda supera los 2.000 euros." },
      { q: "¿Qué sucede después de los 20 días si decido no contestar?", a: "El juzgado dictará un decreto de terminación que permitirá al acreedor solicitar directamente el embargo de tus bienes o cuentas bancarias. Se cierra la vía de defensa y se inicia la fase de ejecución forzosa.", plain: "El juzgado dictará un decreto de terminación que permitirá al acreedor solicitar directamente el embargo de tus bienes o cuentas bancarias. Se cierra la vía de defensa y se inicia la fase de ejecución forzosa." },
      { q: "¿Se puede intentar solucionar antes de llegar al juzgado?", a: "Sí, de hecho la ley ahora impulsa los Medios Adecuados de Solución de Controversias (MASC). Intentar una negociación previa o una conciliación puede evitar el proceso judicial y ahorrar costes adicionales.", plain: "Sí, de hecho la ley ahora impulsa los Medios Adecuados de Solución de Controversias (MASC). Intentar una negociación previa o una conciliación puede evitar el proceso judicial y ahorrar costes adicionales." },
      { q: "¿Cuál es la cuantía máxima que me pueden reclamar por esta vía?", a: "No existe un límite máximo de dinero para iniciar un juicio monitorio. Se puede reclamar desde una factura de 50 euros hasta deudas millonarias, siempre que estén documentadas correctamente.", plain: "No existe un límite máximo de dinero para iniciar un juicio monitorio. Se puede reclamar desde una factura de 50 euros hasta deudas millonarias, siempre que estén documentadas correctamente." },
      { q: "¿Me pueden reclamar una deuda de hace más de 10 años?", a: "Generalmente las deudas personales prescriben a los 5 años según el Código Civil. Si la deuda es más antigua y no han interrumpido el plazo anteriormente, podrías oponerte alegando la prescripción.", plain: "Generalmente las deudas personales prescriben a los 5 años según el Código Civil. Si la deuda es más antigua y no han interrumpido el plazo anteriormente, podrías oponerte alegando la prescripción." },
      { q: "¿Qué pasa si me opongo y la deuda es superior a 15.000 euros?", a: "Si presentas oposición, el proceso monitorio se transforma en un juicio ordinario. Es una vía más larga y técnica que requiere obligatoriamente la asistencia de abogado y procurador.", plain: "Si presentas oposición, el proceso monitorio se transforma en un juicio ordinario. Es una vía más larga y técnica que requiere obligatoriamente la asistencia de abogado y procurador." },
    ],
    conceptGlossary: {
      title: "Diccionario jurídico para el juicio monitorio",
      subtitle: "Conceptos clave explicados para que entiendas cada paso del proceso civil.",
      terms: [
        { term: "Deuda líquida", definition: "Es aquella deuda que está expresada en una cifra numérica exacta o que puede calcularse fácilmente con una operación aritmética sencilla." },
        { term: "Ejecución forzosa", definition: "Fase judicial donde se procede al embargo de bienes, nóminas o cuentas para cobrar la deuda tras una sentencia o un monitorio no contestado." },
        { term: "Petición inicial", definition: "Documento con el que el acreedor arranca el proceso judicial, detallando quién debe, cuánto y por qué, aportando las pruebas del impago." },
        { term: "Procurador", definition: "Profesional encargado de representar al ciudadano ante el juzgado, gestionando las notificaciones y documentos para agilizar el proceso." },
        { term: "Requerimiento de pago", definition: "Notificación oficial del juzgado que te otorga un plazo legal de 20 días para que pagues o expliques por qué no debes ese dinero." },
        { term: "Vencimiento", definition: "Momento en el que el plazo pactado para el pago de una obligación termina, convirtiendo la deuda en reclamable legalmente." },
      ],
    },
    mythVsReality: {
      title: "Verdades y mentiras sobre el monitorio",
      subtitle: "Desmontamos los bulos más comunes para que actúes de forma segura.",
      items: [
        { myth: "“Si no recojo la notificación en correos o en el juzgado, el juicio se detiene”", reality: "Falso. Si el juzgado intenta notificarte y no lo logra, pueden usar edictos (publicaciones oficiales) y el proceso seguirá adelante incluso si no te enteras, acabando en embargo." },
        { myth: "“Para cualquier deuda de monitorio necesito obligatoriamente un abogado”", reality: "No siempre es así. Si la cantidad que te reclaman es menor de 2.000 euros, puedes presentar tu escrito de oposición tú mismo sin necesidad de profesionales." },
        { myth: "“El monitorio me puede llevar a la cárcel por no pagar”", reality: "En España nadie va a prisión por deudas civiles o préstamos impagados. El riesgo real es el embargo de tu patrimonio, no la privación de libertad." },
        { myth: "“Si me opongo al juicio monitorio, la deuda desaparece automáticamente”", reality: "No desaparece. La oposición simplemente cierra el monitorio y obliga al acreedor a ir a un juicio posterior más completo donde un juez decidirá quién tiene razón." },
      ],
    },
    extraSections: [
      {
            "title": "Requisitos legales para que te demanden en un monitorio",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "La Ley de Enjuiciamiento Civil (LEC) establece que no cualquier reclamación puede tramitarse por esta vía rápida. Para que un juzgado admita a trámite un juicio monitorio, la deuda debe cumplir cinco requisitos estrictos:"
                  },
                  {
                        "kind": "factGrid",
                        "columns": 3,
                        "items": [
                              {
                                    "value": "Dineraria",
                                    "label": "Debe ser dinero",
                                    "detail": "Moneda de curso legal."
                              },
                              {
                                    "value": "Líquida",
                                    "label": "Importe exacto",
                                    "detail": "Cifra numérica definida."
                              },
                              {
                                    "value": "Determinada",
                                    "label": "Deuda precisa",
                                    "detail": "Se sabe qué se reclama."
                              },
                              {
                                    "value": "Vencida",
                                    "label": "Plazo pasado",
                                    "detail": "Ya ha expirado el pago."
                              },
                              {
                                    "value": "Exigible",
                                    "label": "Sin condiciones",
                                    "detail": "No depende de nada más."
                              }
                        ]
                  },
                  {
                        "kind": "callout",
                        "variant": "info",
                        "text": "Si la deuda no cumple estos puntos (por ejemplo, si te reclaman que entregues un coche o termines una obra), el proceso monitorio no es el cauce legal adecuado."
                  }
            ]
      },
      {
            "title": "¿Qué deudas se suelen reclamar por esta vía?",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "El monitorio es el procedimiento estrella para el recobro en España porque no tiene límite de cuantía. Estos son los casos más habituales:"
                  },
                  {
                        "kind": "checkList",
                        "variant": "check",
                        "items": [
                              "Facturas impagadas de suministros o servicios.",
                              "Cuotas impagadas de la Comunidad de Propietarios (LPH Art. 21).",
                              "Préstamos personales, microcréditos o tarjetas revolving.",
                              "Albaranes de entrega no abonados entre empresas o autónomos.",
                              "Rentas de alquiler de vivienda o locales.",
                              "Liquidaciones de deudas entre particulares con justificante documental."
                        ]
                  },
                  {
                        "kind": "actionLink",
                        "to": "/microcreditos-prestamos/cancelar-microcreditos",
                        "text": "Si te reclaman un microcrédito, revisa si hay usura aquí"
                  }
            ]
      },
      {
            "title": "Documentos que sirven como prueba",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Para iniciar el monitorio, el acreedor debe aportar un principio de prueba. El juzgado aceptará documentos que, aunque sean creados por el acreedor, den apariencia de deuda real:"
                  },
                  {
                        "kind": "optionCards",
                        "columns": 2,
                        "items": [
                              {
                                    "icon": "shield",
                                    "title": "Firma del deudor",
                                    "text": "Contratos, recibos o cualquier documento físico o electrónico con tu firma o sello."
                              },
                              {
                                    "icon": "landmark",
                                    "title": "Documentos de tráfico",
                                    "text": "Facturas, albaranes de entrega y certificaciones de impago bancario."
                              }
                        ]
                  },
                  {
                        "kind": "paragraph",
                        "text": "Incluso conversaciones de WhatsApp, correos electrónicos o telegramas pueden usarse para acreditar la relación comercial y el impago."
                  }
            ]
      },
      {
            "title": "Cuándo necesitas abogado y procurador",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Muchos usuarios desconocen que la obligación de ir con profesionales depende del importe de la deuda y de tu reacción ante la demanda:"
                  },
                  {
                        "kind": "table",
                        "headers": [
                              "Fase del proceso",
                              "Deuda < 2.000€",
                              "Deuda > 2.000€"
                        ],
                        "rows": [
                              [
                                    "Solicitud inicial",
                                    "No obligatorio",
                                    "No obligatorio"
                              ],
                              [
                                    "Escrito de oposición",
                                    "No obligatorio",
                                    "Obligatorio"
                              ],
                              [
                                    "Ejecución (embargo)",
                                    "No obligatorio",
                                    "Obligatorio"
                              ]
                        ]
                  },
                  {
                        "kind": "callout",
                        "variant": "warning",
                        "text": "Incluso si no es obligatorio, oponerte sin abogado experto suele terminar en derrota, ya que el acreedor (bancos o fondos buitre) siempre acude con especialistas."
                  }
            ]
      },
      {
            "title": "Competencia: ¿Dónde se celebra el juicio?",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Por norma general, el demandante debe presentar la petición en el Juzgado de Primera Instancia del **domicilio del deudor**. Si no te localizan allí, se hará donde puedas ser hallado."
                  },
                  {
                        "kind": "paragraph",
                        "text": "Existe una excepción: en deudas de comunidades de vecinos, el administrador puede elegir entre el juzgado de tu domicilio o el del lugar donde esté la finca."
                  }
            ]
      },
      {
            "title": "¿Qué pasa si te opones? La transformación del juicio",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Al presentar tu escrito de oposición en los 20 días de plazo, el monitorio 'se rompe' y se convierte en un juicio ordinario para que el juez dicte sentencia:"
                  },
                  {
                        "kind": "optionCards",
                        "columns": 2,
                        "items": [
                              {
                                    "icon": "gavel",
                                    "title": "Juicio Verbal",
                                    "text": "Si la deuda es igual o inferior a 15.000€. Es un proceso más ágil con vista ante el juez.",
                                    "links": [
                                          {
                                                "to": "/juicio-monitorio-recobro/juicio-monitorio-deuda",
                                                "label": "Saber más"
                                          }
                                    ]
                              },
                              {
                                    "icon": "scale",
                                    "title": "Juicio Ordinario",
                                    "text": "Si la deuda supera los 15.000€. El acreedor tiene un mes para presentar demanda formal o el caso se archivará."
                              }
                        ]
                  }
            ]
      },
      {
            "title": "Costes, tasas y ejecución forzosa",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Si eres una persona física (particular o autónomo), **estás exento de pagar tasas judiciales** en España para defenderte. Sin embargo, si pierdes el juicio o no pagas, te enfrentas a:"
                  },
                  {
                        "kind": "checkList",
                        "variant": "cross",
                        "items": [
                              "Intereses de demora procesal: El interés legal del dinero incrementado en dos puntos.",
                              "Condena en costas: Pagar los gastos del abogado del acreedor (si la deuda supera los 2.000€).",
                              "Ejecución forzosa: El título ejecutivo permite embargar cuentas, nómina e inmuebles."
                        ]
                  },
                  {
                        "kind": "keyCallout",
                        "headline": "Si tu insolvencia es total, la solución no es oponerse",
                        "body": "Cuando no hay argumentos para negar la deuda y el embargo es inminente, lo más inteligente es acudir a la [Ley de Segunda Oportunidad](/ley-segunda-oportunidad) para cancelar las deudas legalmente."
                  },
                  {
                        "kind": "actionLink",
                        "to": "/embargos/parar-embargo",
                        "text": "Aprende cómo frenar el embargo judicial"
                  }
            ]
      }
],
  },
  "/deudas-hacienda-seguridad-social/deudas-hacienda": {
    faq: [
      { q: "¿Qué pasa si recibo una notificación de apremio?", a: "Es la señal de que el periodo voluntario ha terminado y Hacienda inicia el cobro forzoso. Tienes un último plazo para pagar con un recargo del 10 % antes de que empiecen a buscar bienes para embargar.", plain: "Es la señal de que el periodo voluntario ha terminado y Hacienda inicia el cobro forzoso. Tienes un último plazo para pagar con un recargo del 10 % antes de que empiecen a buscar bienes para embargar." },
      { q: "¿Me pueden embargar el sueldo por deudas con Hacienda?", a: "Sí, pero existen límites legales basados en el Salario Mínimo Interprofesional (SMI). Hacienda solo puede retener porcentajes de la parte que supere el SMI, asegurando que mantengas unos ingresos mínimos para vivir.", plain: "Sí, pero existen límites legales basados en el Salario Mínimo Interprofesional (SMI). Hacienda solo puede retener porcentajes de la parte que supere el SMI, asegurando que mantengas unos ingresos mínimos para vivir." },
      { q: "¿Qué es la retención de la devolución del IRPF?", a: "Si tienes deudas pendientes y te sale a devolver la declaración de la Renta, Hacienda no te ingresará el dinero. Lo compensará automáticamente para reducir o liquidar lo que les debes.", plain: "Si tienes deudas pendientes y te sale a devolver la declaración de la Renta, Hacienda no te ingresará el dinero. Lo compensará automáticamente para reducir o liquidar lo que les debes." },
      { q: "¿Puedo pagar mis deudas tributarias por Bizum?", a: "Sí, la Agencia Tributaria permite actualmente el pago de liquidaciones y deudas mediante Bizum para importes de hasta 3.000 euros, facilitando el trámite desde el móvil.", plain: "Sí, la Agencia Tributaria permite actualmente el pago de liquidaciones y deudas mediante Bizum para importes de hasta 3.000 euros, facilitando el trámite desde el móvil." },
      { q: "¿Hacienda puede reclamar mis facturas a mis propios clientes?", a: "Sí, a través de una diligencia de embargo de créditos. Hacienda notifica a tus clientes que, en lugar de pagarte a ti, deben ingresar ese dinero directamente en las arcas públicas.", plain: "Sí, a través de una diligencia de embargo de créditos. Hacienda notifica a tus clientes que, en lugar de pagarte a ti, deben ingresar ese dinero directamente en las arcas públicas." },
      { q: "¿Apareceré en la lista de morosos si debo poco dinero?", a: "No, la lista pública de deudores está reservada para casos muy graves donde la deuda supera los 600.000 euros y no ha sido pagada en los plazos fijados.", plain: "No, la lista pública de deudores está reservada para casos muy graves donde la deuda supera los 600.000 euros y no ha sido pagada en los plazos fijados." },
      { q: "¿Caducan las deudas con la Agencia Tributaria?", a: "Por norma general, las deudas prescriben a los 4 años. Sin embargo, cualquier notificación oficial o reconocimiento de deuda interrumpe este plazo y el contador vuelve a ponerse a cero.", plain: "Por norma general, las deudas prescriben a los 4 años. Sin embargo, cualquier notificación oficial o reconocimiento de deuda interrumpe este plazo y el contador vuelve a ponerse a cero." },
      { q: "¿Qué ocurre si no tengo dinero ni bienes para pagar?", a: "Hacienda te declarará fallido temporalmente, pero seguirá vigilando tu situación financiera durante años. En estos casos, la Ley de Segunda Oportunidad suele ser la mejor vía para cancelar estas deudas legalmente.", plain: "Hacienda te declarará fallido temporalmente, pero seguirá vigilando tu situación financiera durante años. En estos casos, la Ley de Segunda Oportunidad suele ser la mejor vía para cancelar estas deudas legalmente." },
    ],
    conceptGlossary: {
      title: "Diccionario para entender tus deudas",
      subtitle: "Conceptos clave explicados de forma sencilla para que Hacienda deje de sonar a chino.",
      terms: [
        { term: "Periodo Ejecutivo", definition: "La fase que empieza justo el día después de que venza el plazo para pagar un impuesto voluntariamente. Aquí es donde empiezan a sumarse los recargos." },
        { term: "Interés de Demora", definition: "Es como un alquiler por el tiempo que tardas en pagar. Se suma al recargo y se calcula diariamente sobre el importe que debes." },
        { term: "Providencia de Apremio", definition: "Es el aviso oficial donde Hacienda te informa de que va a proceder al embargo si no pagas de inmediato con el recargo correspondiente." },
        { term: "Diligencia de Embargo", definition: "La orden técnica que envía Hacienda a los bancos o pagadores para retener tu dinero y cobrar la deuda pendiente." },
        { term: "Deudor Fallido", definition: "Situación en la que la Administración reconoce que no puedes pagar porque no tienes bienes, aunque la deuda no desaparece del todo hasta que prescribe o se cancela legalmente." },
        { term: "Certificado Positivo", definition: "El documento que acredita que estás al corriente de tus pagos. Es fundamental si quieres pedir subvenciones o trabajar con el sector público." },
      ],
    },
    mythVsReality: {
      title: "Verdades y mentiras sobre Hacienda",
      subtitle: "Desmontamos los bulos más comunes para que tomes decisiones informadas.",
      items: [
        { myth: "“Si no abro la carta de Hacienda, no me pueden cobrar”", reality: "Las notificaciones publicadas en el boletín oficial tienen la misma validez legal. Ignorarlas solo impide que te defiendas y acelera los embargos." },
        { myth: "“Las deudas públicas no se pueden cancelar nunca”", reality: "Falso. Gracias a la Ley de Segunda Oportunidad, particulares y autónomos pueden exonerar hasta 10.000 euros de deuda con Hacienda bajo ciertos requisitos legales." },
        { myth: "“Hacienda te embarga toda la cuenta bancaria sin avisar”", reality: "Primero deben enviarte una providencia de apremio. No obstante, si no hay respuesta, el embargo se ejecuta automáticamente sobre el saldo disponible en ese momento." },
        { myth: "“Si me declaro insolvente, la deuda desaparece sola”", reality: "Ser insolvente solo detiene el cobro temporalmente porque no hay de dónde rascar, pero los intereses siguen sumando hasta que se logre una cancelación judicial." },
      ],
    },
    extraSections: [
      {
            "title": "Origen de la deuda y cómo consultarla",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Una deuda con la Agencia Tributaria surge cuando no se liquida un impuesto en plazo (**IVA, IRPF, Sociedades**) o tras una inspección con resultado a ingresar. Estas deudas acumulan recargos e intereses de demora desde el primer día de retraso."
                  },
                  {
                        "kind": "optionCards",
                        "columns": 2,
                        "items": [
                              {
                                    "icon": "landmark",
                                    "title": "Sede Electrónica",
                                    "text": "Accede a la sección Pagar, aplazar y consultar con tu Certificado Digital o Cl@ve PIN."
                              },
                              {
                                    "icon": "shield",
                                    "title": "Notificaciones",
                                    "text": "Revisa tu Dirección Electrónica Habilitada o las notificaciones físicas recibidas por correo."
                              }
                        ]
                  }
            ]
      },
      {
            "title": "Fases de la deuda: del periodo voluntario al ejecutivo",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "No es lo mismo deber dinero que estar en fase de apremio. Los tiempos marcan la gravedad y el coste de la sanción:"
                  },
                  {
                        "kind": "table",
                        "headers": [
                              "Periodo",
                              "Estado",
                              "Consecuencia"
                        ],
                        "rows": [
                              [
                                    "Voluntario",
                                    "Dentro de plazo legal",
                                    "Sin recargos. Certificados de estar al corriente positivos."
                              ],
                              [
                                    "Ejecutivo",
                                    "Plazo vencido",
                                    "Se devengan recargos y empieza el riesgo de embargo."
                              ],
                              [
                                    "Apremio",
                                    "Notificación recibida",
                                    "Fase final previa a la ejecución forzosa de bienes."
                              ]
                        ]
                  }
            ]
      },
      {
            "title": "Recargos e intereses por pagar tarde",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Si presentas un impuesto tarde sin que Hacienda te lo pida (extemporánea), los recargos van del **5% al 20%** según los meses de retraso. Si esperas a la providencia de apremio, los costes suben significativamente:"
                  },
                  {
                        "kind": "checkList",
                        "variant": "cross",
                        "items": [
                              "Recargo ejecutivo (5%): Antes de recibir la notificación de apremio.",
                              "Recargo de apremio reducido (10%): Si pagas en el plazo indicado en la notificación.",
                              "Recargo de apremio (20%): Si no pagas tras la notificación (sumando intereses de demora).",
                              "Interés de demora: Se sitúa sobre el 4,06% anual y se calcula por cada día de retraso."
                        ]
                  }
            ]
      },
      {
            "title": "Condiciones para aplazamientos y fraccionamientos",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Hacienda permite flexibilizar el pago para evitar el estrangulamiento financiero del contribuyente, siempre que se cumplan ciertos requisitos de solvencia y garantías."
                  },
                  {
                        "kind": "factGrid",
                        "columns": 2,
                        "items": [
                              {
                                    "value": "50.000 €",
                                    "label": "Límite sin aval",
                                    "detail": "Por debajo de esta cifra no necesitas presentar garantías."
                              },
                              {
                                    "value": "12-36 meses",
                                    "label": "Plazo máximo",
                                    "detail": "Varía según si eres persona física o empresa."
                              }
                        ]
                  },
                  {
                        "kind": "callout",
                        "variant": "info",
                        "text": "Los medios de pago admitidos incluyen domiciliación, tarjeta de crédito, Bizum o la compensación con devoluciones de otros impuestos (como la Renta)."
                  }
            ]
      },
      {
            "title": "Consecuencias del impago: El orden de los embargos",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "La AEAT tiene potestad para [parar embargos](/embargos/parar-embargo) ejecutando tus bienes sin pasar por un juzgado. Siguen un orden de prelación estricto según la Ley General Tributaria:"
                  },
                  {
                        "kind": "checkList",
                        "variant": "check",
                        "items": [
                              "Dinero efectivo y cuentas bancarias (lo primero en ser bloqueado).",
                              "Créditos, valores y títulos realizables a corto plazo.",
                              "Sueldos y pensiones (respetando el SMI inembargable).",
                              "Bienes inmuebles y establecimientos mercantiles.",
                              "Joyas, objetos de arte y coches."
                        ]
                  },
                  {
                        "kind": "keyCallout",
                        "headline": "Cuidado con la Lista de Morosos",
                        "body": "Si tu deuda supera los 600.000 € y no está suspendida o aplazada, tus datos aparecerán en el listado público anual de la AEAT."
                  }
            ]
      },
      {
            "title": "Prescripción y soluciones legales",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Por norma general, el derecho de la Administración para exigir el pago **prescribe a los 4 años**. Sin embargo, cualquier notificación oficial o reconocimiento de deuda reinicia el contador a cero."
                  },
                  {
                        "kind": "paragraph",
                        "text": "Si tu situación es de insolvencia total, la opción más sólida es acogerte a la [exoneración del pasivo insatisfecho](/ley-segunda-oportunidad/exoneracion-pasivo-insatisfecho), que permite cancelar hasta 10.000 € de deuda con Hacienda bajo ciertas condiciones."
                  },
                  {
                        "kind": "actionLink",
                        "to": "/ley-segunda-oportunidad",
                        "text": "Descubre si cumples los requisitos para cancelar tus deudas"
                  }
            ]
      }
],
  },
  "/deudas-hacienda-seguridad-social/deudas-seguridad-social": {
    faq: [
      { q: "¿Qué pasa si no puedo pagar los recargos del 20%?", a: "Los recargos se suman a la deuda principal automáticamente al día siguiente del impago. Si no se liquidan, la Seguridad Social puede iniciar el proceso de apremio y emitir embargos sobre tus cuentas o bienes.", plain: "Los recargos se suman a la deuda principal automáticamente al día siguiente del impago. Si no se liquidan, la Seguridad Social puede iniciar el proceso de apremio y emitir embargos sobre tus cuentas o bienes." },
      { q: "¿Puedo pedir una ayuda pública si tengo deudas pendientes?", a: "Generalmente no, ya que estar al corriente de pago es un requisito indispensable para la gran mayoría de subvenciones en España. Necesitarás el certificado de estar al corriente para que te concedan cualquier ayuda estatal o autonómica.", plain: "Generalmente no, ya que estar al corriente de pago es un requisito indispensable para la gran mayoría de subvenciones en España. Necesitarás el certificado de estar al corriente para que te concedan cualquier ayuda estatal o autonómica." },
      { q: "¿Qué métodos de pago acepta la Seguridad Social fuera de plazo?", a: "Puedes pagar mediante tarjeta de crédito o débito a través de la pasarela de pago en el portal Import@ss. También es posible realizar el ingreso por transferencia bancaria o en oficina con el documento de pago correspondiente.", plain: "Puedes pagar mediante tarjeta de crédito o débito a través de la pasarela de pago en el portal Import@ss. También es posible realizar el ingreso por transferencia bancaria o en oficina con el documento de pago correspondiente." },
      { q: "¿Cuánto tarda la Seguridad Social en contestar a una solicitud de aplazamiento?", a: "La administración dispone de un plazo máximo de tres meses para dictar y notificar la resolución. Si no recibes respuesta en ese tiempo, la solicitud suele entenderse como desestimada por silencio administrativo.", plain: "La administración dispone de un plazo máximo de tres meses para dictar y notificar la resolución. Si no recibes respuesta en ese tiempo, la solicitud suele entenderse como desestimada por silencio administrativo." },
      { q: "¿Me avisarán antes de embargar mi cuenta bancaria?", a: "Sí, la Administración envía una Diligencia de Embargo donde se especifica la cantidad adeudada. Si no pagas en el plazo voluntario que indica la notificación, proceden a la retención de fondos en tus cuentas.", plain: "Sí, la Administración envía una Diligencia de Embargo donde se especifica la cantidad adeudada. Si no pagas en el plazo voluntario que indica la notificación, proceden a la retención de fondos en tus cuentas." },
      { q: "¿Qué pasa si me equivoco al rellenar el modelo de aplazamiento?", a: "No te preocupes, recibirás un requerimiento para corregir el error. Dispondrás de un plazo de 10 días hábiles para subsanar los fallos o aportar la documentación que falte sin perder tu turno en la solicitud.", plain: "No te preocupes, recibirás un requerimiento para corregir el error. Dispondrás de un plazo de 10 días hábiles para subsanar los fallos o aportar la documentación que falte sin perder tu turno en la solicitud." },
      { q: "¿Puedo participar en un concurso público si tengo deudas?", a: "No, las empresas y autónomos con deudas vigentes con la Seguridad Social quedan excluidos de las licitaciones públicas. La solvencia técnica y financiera requiere no tener impagos con la Administración.", plain: "No, las empresas y autónomos con deudas vigentes con la Seguridad Social quedan excluidos de las licitaciones públicas. La solvencia técnica y financiera requiere no tener impagos con la Administración." },
      { q: "¿Cómo me aseguro de que el contador de los 4 años de prescripción sigue corriendo?", a: "La prescripción se interrumpe cada vez que la Seguridad Social envía una notificación oficial o tú realizas una gestión sobre la deuda. Para que prescriba, deben pasar 4 años seguidos sin que la Administración realice ninguna acción de cobro.", plain: "La prescripción se interrumpe cada vez que la Seguridad Social envía una notificación oficial o tú realizas una gestión sobre la deuda. Para que prescriba, deben pasar 4 años seguidos sin que la Administración realice ninguna acción de cobro." },
      { q: "¿Tiene algún coste pedir el certificado de estar al corriente de pago?", a: "No, es un trámite totalmente gratuito que puedes realizar tú mismo de forma inmediata si tienes certificado digital, Cl@ve o SMS activado en el portal Import@ss.", plain: "No, es un trámite totalmente gratuito que puedes realizar tú mismo de forma inmediata si tienes certificado digital, Cl@ve o SMS activado en el portal Import@ss." },
      { q: "¿Qué es la vía de apremio exactamente?", a: "Es la fase ejecutiva en la que la Seguridad Social ya no te pide que pagues voluntariamente, sino que utiliza su potestad legal para cobrar la deuda por la fuerza, principalmente mediante el embargo de activos.", plain: "Es la fase ejecutiva en la que la Seguridad Social ya no te pide que pagues voluntariamente, sino que utiliza su potestad legal para cobrar la deuda por la fuerza, principalmente mediante el embargo de activos." },
    ],
    conceptGlossary: {
      title: "Diccionario de términos de la Seguridad Social",
      subtitle: "Entiende los conceptos clave sin complicaciones legales",
      terms: [
        { term: "Import@ss", definition: "Es el portal digital de la Seguridad Social diseñado para que el ciudadano pueda consultar su situación, deudas y trámites desde su móvil u ordenador de forma sencilla." },
        { term: "Período ejecutivo", definition: "Fase que se activa justo cuando termina el plazo reglamentario de pago. En este momento, la deuda empieza a generar recargos e intereses de demora adicionales." },
        { term: "Interés de demora", definition: "Es un porcentaje adicional que se cobra por el retraso en el pago. Es diferente al recargo y se calcula en función del tiempo que pase hasta que saldes la deuda." },
        { term: "Diligencia de embargo", definition: "Documento oficial mediante el cual la Administración ordena la retención de dinero, sueldos o bienes para cubrir una deuda que no ha sido pagada a tiempo." },
        { term: "Sistema RED", definition: "Plataforma digital que utilizan empresas y profesionales para intercambiar datos y documentos con la Seguridad Social de forma telemática." },
        { term: "Prescripción", definition: "Plazo legal tras el cual la Administración pierde el derecho a reclamar una deuda por no haber realizado acciones de cobro durante un tiempo determinado (habitualmente 4 años)." },
      ],
    },
    mythVsReality: {
      title: "Mitos sobre las deudas con el Estado",
      subtitle: "Desmontamos los bulos más comunes para que duermas tranquilo",
      items: [
        { myth: "“Si el banco no me avisa, no me pueden embargar la cuenta”", reality: "La obligación de avisar es de la Seguridad Social, no del banco. Una vez recibida la orden, el banco está obligado por ley a bloquear el dinero de forma inmediata." },
        { myth: "“Las deudas con el Estado nunca se borran”", reality: "Falso. Gracias a la Ley de Segunda Oportunidad, particulares y autónomos pueden llegar a cancelar gran parte de estas deudas si cumplen ciertos requisitos de buena fe." },
        { myth: "“Si cierro mi empresa, las deudas se quedan en la sociedad”", reality: "No siempre. Si ha habido mala gestión o no se ha liquidado correctamente la empresa, la Seguridad Social puede derivar la responsabilidad al administrador y reclamarle el pago con sus bienes personales." },
        { myth: "“Si pido un aplazamiento, ya no soy un moroso para el Estado”", reality: "Exacto. Una vez concedido el aplazamiento y mientras cumplas con los pagos mensuales, legalmente se considera que estás al corriente de tus obligaciones." },
        { myth: "“Es mejor esperar a que la deuda prescriba que intentar negociar”", reality: "Es muy arriesgado. La Seguridad Social tiene sistemas automatizados que interrumpen la prescripción enviando notificaciones, por lo que es extremadamente raro que una deuda caduque sin ser reclamada." },
      ],
    },
    extraSections: [
      {
            "title": "Tipos de deudas y recargos por demora",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "No todas las deudas con la Tesorería General de la Seguridad Social (TGSS) tienen el mismo origen ni el mismo coste. Es fundamental distinguir el principal de los recargos, que crecen rápido si no se actúa a tiempo."
                  },
                  {
                        "kind": "table",
                        "headers": [
                              "Concepto",
                              "Impacto y detalle"
                        ],
                        "rows": [
                              [
                                    "Cuotas RETA",
                                    "Cotizaciones impagadas por autónomos."
                              ],
                              [
                                    "Cuotas Obreras",
                                    "Descontadas a empleados pero no ingresadas (tienen trato especial)."
                              ],
                              [
                                    "Prestaciones indebidas",
                                    "Cobros de paro o bajas que la administración reclama de vuelta."
                              ],
                              [
                                    "Sanciones",
                                    "Multas derivadas de actas de infracción de la Inspección de Trabajo."
                              ]
                        ]
                  },
                  {
                        "kind": "callout",
                        "variant": "warning",
                        "title": "La escala de recargos",
                        "text": "Si no pagas en plazo, el recargo es del 10% el primer mes. A partir del segundo mes, sube al 20%, a lo que hay que sumar los intereses de demora que se devengan diariamente sobre el principal."
                  }
            ]
      },
      {
            "title": "Cómo consultar cuánto debes y obtener informes",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Para trazar una estrategia de [cancelación de deudas](/cancelacion-de-deudas), primero necesitamos el mapa exacto de lo pendiente. Puedes consultarlo de varias formas:"
                  },
                  {
                        "kind": "checkList",
                        "variant": "check",
                        "items": [
                              "Import@ss: El portal de la Tesorería para el ciudadano.",
                              "Certificado Digital o Cl@ve: Necesarios para descargar el documento de deuda al instante.",
                              "Sede Electrónica: Sección Recaudación, donde puedes ver periodos y conceptos.",
                              "Vía SMS: Si tienes tu móvil registrado en la TGSS, puedes obtener informes rápidos."
                        ]
                  },
                  {
                        "kind": "paragraph",
                        "text": "Si necesitas contratar con terceros o pedir una subvención, lo que buscas es el **Certificado de estar al corriente de pago**, que acredita que no tienes deudas pendientes."
                  }
            ]
      },
      {
            "title": "Aplazamiento de deudas: requisitos y plazos",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Si no puedes acogerte a la [ley de segunda oportunidad](/ley-segunda-oportunidad), el aplazamiento administrativo permite pagar en cuotas mensuales (mínimo 100€) durante un máximo de 5 años."
                  },
                  {
                        "kind": "optionCards",
                        "columns": 2,
                        "items": [
                              {
                                    "icon": "shield",
                                    "title": "Deudas Aplazables",
                                    "text": "Cuotas del RETA y cuotas empresariales. Requiere que la deuda supere el doble del SMI."
                              },
                              {
                                    "icon": "ban",
                                    "title": "No Aplazables",
                                    "text": "Multas firmes, intereses ya vencidos y cuotas por accidentes de trabajo."
                              }
                        ]
                  },
                  {
                        "kind": "callout",
                        "variant": "info",
                        "text": "Las deudas que superan los 150.000€ suelen requerir garantías adicionales, como avales bancarios o hipotecas mobiliarias."
                  }
            ]
      },
      {
            "title": "Consecuencias legales de no pagar a la TGSS",
            "blocks": [
                  {
                        "kind": "keyCallout",
                        "headline": "La vía ejecutiva y los embargos",
                        "body": "La Seguridad Social tiene potestad para embargar tus bienes sin necesidad de pasar por un juez."
                  },
                  {
                        "kind": "factGrid",
                        "columns": 3,
                        "items": [
                              {
                                    "value": "Cuentas",
                                    "label": "Barrido de saldo",
                                    "detail": "Embargos en cuentas corrientes."
                              },
                              {
                                    "value": "Prestaciones",
                                    "label": "Bloqueo",
                                    "detail": "No podrás cobrar jubilación o bajas si debes cuotas."
                              },
                              {
                                    "value": "Herencias",
                                    "label": "Derivación",
                                    "detail": "La deuda puede pasar a tus herederos si no se gestiona."
                              }
                        ]
                  },
                  {
                        "kind": "actionLink",
                        "to": "/embargos/parar-embargo",
                        "text": "Aprende cómo parar un embargo de la Seguridad Social aquí"
                  }
            ]
      },
      {
            "title": "Prescripción de las deudas con la Seguridad Social",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Por norma general, el derecho de la Administración para determinar la deuda y exigir el pago **prescribe a los 4 años** desde que finalizó el plazo reglamentario de ingreso."
                  },
                  {
                        "kind": "callout",
                        "variant": "warning",
                        "title": "La interrupción del plazo",
                        "text": "Cualquier notificación oficial recibida por correo, una solicitud de aplazamiento firmada por ti o un inicio de expediente de embargo reinicia el contador de 4 años desde cero."
                  }
            ]
      },
      {
            "title": "Gestiones para colectivos específicos",
            "blocks": [
                  {
                        "kind": "paragraph",
                        "text": "Dependiendo de tu sector cinematográfico, agrícola o taurino, existen peculiaridades en la regularización de cuotas:"
                  },
                  {
                        "kind": "checkList",
                        "variant": "check",
                        "items": [
                              "Autónomos: Regularización anual obligatoria basada en ingresos reales.",
                              "Artistas y Taurinos: Devoluciones de cuotas tras el ajuste de retribuciones declaradas.",
                              "Empleados de Hogar: Consulta de recibos emitidos para evitar responsabilidades del empleador."
                        ]
                  },
                  {
                        "kind": "actionLink",
                        "to": "/autonomos-concurso-acreedores/concurso-persona-fisica",
                        "text": "Consulta la solución para autónomos en situación de insolvencia"
                  }
            ]
      }
],
  },
};
