import type { Referencia } from "@/types/referencia";

/**
 * Las 20 referencias de segmentos.json (vivobook, zenbook, tuf, rog),
 * combinadas con data/products.json y data/quizzes.json de una sesión
 * anterior. No escribir specs a mano aquí: actualizar /contenido y
 * products.json/quizzes.json, luego regenerar este archivo.
 */
export const referencias: Referencia[] = [
  {
    "slug": "vivobook-go-15-ryzen3-7320u",
    "linea": "vivobook",
    "nombre": "ASUS Vivobook Go 15 (E1504FA)",
    "codigo": "E1504FA-NJ323W",
    "tagline": "¿Buscas algo liviano para lo básico sin gastar de más? Este es tu equipo.",
    "intro": "Estudiante o alguien del hogar que necesita un portátil liviano para internet, Office y streaming.",
    "ficha": [
      {
        "componente": "Sistema operativo",
        "dato": "Windows 11 Home"
      },
      {
        "componente": "Procesador",
        "dato": "AMD Ryzen 3 7320U"
      },
      {
        "componente": "Memoria RAM",
        "dato": "8 GB LPDDR5"
      },
      {
        "componente": "Gráficos",
        "dato": "AMD Radeon integrados"
      },
      {
        "componente": "IA / NPU",
        "dato": "Sin NPU dedicada; no es Copilot+ PC"
      },
      {
        "componente": "Pantalla",
        "dato": "15.6\" Full HD (1920x1080), 60 Hz, 250 nits, IPS (estimado, sin confirmar)"
      },
      {
        "componente": "Almacenamiento",
        "dato": "SSD 512 GB M.2 NVMe"
      },
      {
        "componente": "Batería",
        "dato": "Hasta 10 horas de uso típico (estimado, sin confirmar)"
      },
      {
        "componente": "Portabilidad",
        "dato": "Aprox. 1.6 kg, 1.9 cm de grosor (estimado, sin confirmar)"
      },
      {
        "componente": "Garantía",
        "dato": "2 años",
      }
    ],
    "procesador": {
      "marca": "AMD",
      "modelo": "Ryzen 3 7320U",
      "serie": "Ryzen 3 7000",
      "nucleos": 4,
      "hilos": 8,
      "frecuenciaMax": "4.1 GHz",
      "npuTops": null,
      "queSignifica": "Procesador de 4 núcleos y 8 hilos pensado para tareas cotidianas de oficina e internet.",
      "comoDecirlo": "Le rinde bien para lo básico: internet, Office, videollamadas y streaming, sin trabarse.",
      "paraQueAlcanza": [
        "Navegar y redes sociales",
        "Office y correo",
        "Videollamadas",
        "Streaming de series"
      ]
    },
    "memoria": {
      "ram": "8 GB",
      "tipoRam": "LPDDR5",
      "almacenamiento": "512 GB SSD",
      "comoDecirlo": "8GB le alcanza para varias pestañas y programas livianos a la vez; el SSD de 512GB es bien rápido para guardar tus cosas.",
      "caso": "soldada"
    },
    "pantallaDetalle": {
      "pulgadas": 15.6,
      "resolucion": "1920x1080 (Full HD)",
      "tipo": "IPS",
      "hz": 60,
      "nits": 250,
      "comoDecirlo": "Pantalla grande de 15.6 pulgadas, cómoda para ver series y trabajar sin forzar la vista."
    },
    "clienteIdeal": "Estudiante o alguien del hogar que necesita un portátil liviano para internet, Office y streaming.",
    "leAlcanzaPara": [
      "Navegar y redes sociales",
      "Office y correo",
      "Videollamadas",
      "Streaming de series"
    ],
    "noEsPara": [
      "Juegos exigentes o de última generación",
      "Edición de video profesional en 4K",
      "Tareas que necesiten tarjeta de video dedicada"
    ],
    "ganchos": [
      {
        "cliente": "Busca su primer portátil, sin gastar de más",
        "frase": "¿Buscas algo liviano para lo básico sin gastar de más? Este es tu equipo."
      },
      {
        "cliente": "Quiere ver series y trabajar cómodo",
        "frase": "Pantalla grande de 15.6 pulgadas para ver tus series y trabajar cómodo."
      },
      {
        "cliente": "Es estudiante y recién está empezando",
        "frase": "Ideal para el hogar o para el estudiante que está empezando."
      }
    ],
    "objeciones": [
      {
        "dice": "¿Le alcanza para varias cosas a la vez?",
        "responde": "Sí, para lo básico: navegar, Office, redes y streaming sin trabarse. Si necesita edición pesada, te muestro otro modelo."
      },
      {
        "dice": "¿Por qué no tiene más RAM?",
        "responde": "8GB alcanza bien para el uso diario; si el cliente edita video o usa muchos programas pesados, lo subimos a un Vivobook con 16GB."
      }
    ],
    "compararCon": {
      "abajo": null,
      "arriba": {
        "id": "vivobook-go-15-ryzen5-7520u",
        "diferencias": [
          "Mismo precio casi igual",
          "Más fluido con varias apps abiertas a la vez"
        ]
      }
    },
    "quiz": [
      {
        "pregunta": "¿Para qué tipo de cliente es ideal el Vivobook Go 15 (Ryzen 3)?",
        "opciones": [
          "Quien necesita un portátil liviano para internet, Office y streaming",
          "Un editor de video profesional",
          "Un gamer competitivo",
          "Alguien que necesita una estación de trabajo para 3D"
        ],
        "correcta": 0,
        "explicacion": "Es un equipo pensado para lo básico del hogar o el estudio: navegar, Office y streaming."
      },
      {
        "pregunta": "¿Qué procesador trae este Vivobook Go 15?",
        "opciones": [
          "AMD Ryzen 3 7320U",
          "Intel Core i9-13900H",
          "Snapdragon X Elite",
          "AMD Ryzen 9 8945HS"
        ],
        "correcta": 0,
        "explicacion": "Trae un AMD Ryzen 3 7320U, de 4 núcleos y 8 hilos, pensado para tareas cotidianas."
      },
      {
        "pregunta": "¿Cuánta RAM y almacenamiento trae?",
        "opciones": [
          "8 GB de RAM y 512 GB de SSD",
          "32 GB de RAM y 2 TB de SSD",
          "4 GB de RAM y 128 GB de SSD",
          "16 GB de RAM y 1 TB de SSD"
        ],
        "correcta": 0,
        "explicacion": "8GB de RAM le alcanza para el uso diario, con un SSD de 512GB bien rápido."
      },
      {
        "pregunta": "Un cliente pregunta si le alcanza para varias cosas a la vez. ¿Qué le respondes?",
        "opciones": [
          "Sí, para lo básico: navegar, Office, redes y streaming sin trabarse",
          "No, solo sirve para una tarea a la vez",
          "Necesita instalar un programa aparte para eso",
          "Solo funciona conectado a internet"
        ],
        "correcta": 0,
        "explicacion": "Para lo básico funciona bien sin trabarse; si el cliente necesita edición pesada, se recomienda otro modelo."
      },
      {
        "pregunta": "¿Qué trae el Vivobook Go 15 para quienes digitan muchos números?",
        "opciones": [
          "NumberPad (teclado numérico)",
          "Una calculadora física aparte",
          "Un mouse especial para números",
          "Nada adicional"
        ],
        "correcta": 0,
        "explicacion": "Trae NumberPad: un teclado numérico aparte, útil para facturación o cajero."
      },
      {
        "pregunta": "El cliente pregunta si le puede subir la memoria RAM más adelante. ¿Qué le respondes?",
        "opciones": [
          "Sí, pero hay que cambiar el módulo que ya tiene por uno más grande, porque solo tiene una ranura.",
          "No, la memoria viene soldada a la placa y no se puede ampliar en este equipo.",
          "Sí, se le puede sumar un módulo adicional sin tocar el que ya tiene, porque le queda una ranura libre.",
          "Sí, pero solo se puede subir llevándolo a un centro de servicio autorizado, nunca en la tienda."
        ],
        "correcta": 1,
        "explicacion": "8GB le alcanza para varias pestañas y programas livianos a la vez; el SSD de 512GB es bien rápido para guardar tus cosas."
      },
      {
        "pregunta": "¿Cuánto almacenamiento SSD trae este equipo?",
        "opciones": [
          "256 GB",
          "1 TB",
          "512 GB",
          "128 GB"
        ],
        "correcta": 2,
        "explicacion": "Trae 512 GB SSD: suficiente para guardar fotos, documentos, juegos o programas sin quedarse corto."
      }
    ],
    "duracionMin": 5,
    "dificultad": "básico",
    "imagen": "/products/vivobook-go-15-ryzen3.svg"
  },
  {
    "slug": "vivobook-go-15-ryzen5-7520u",
    "linea": "vivobook",
    "nombre": "ASUS Vivobook Go 15 (E1504FA)",
    "codigo": "E1504FA-NJ523W",
    "tagline": "Un paso arriba del Ryzen 3: más fluidez sin subir mucho el precio.",
    "intro": "Quien quiere un poco más de fluidez que el modelo básico, sin pasarse de presupuesto.",
    "ficha": [
      {
        "componente": "Sistema operativo",
        "dato": "Windows 11 Home"
      },
      {
        "componente": "Procesador",
        "dato": "AMD Ryzen 5 7520U"
      },
      {
        "componente": "Memoria RAM",
        "dato": "8 GB LPDDR5"
      },
      {
        "componente": "Gráficos",
        "dato": "AMD Radeon integrados"
      },
      {
        "componente": "IA / NPU",
        "dato": "Sin NPU dedicada; no es Copilot+ PC"
      },
      {
        "componente": "Pantalla",
        "dato": "15.6\" Full HD (1920x1080), 60 Hz, 250 nits, IPS (estimado, sin confirmar)"
      },
      {
        "componente": "Almacenamiento",
        "dato": "SSD 512 GB M.2 NVMe"
      },
      {
        "componente": "Batería",
        "dato": "Hasta 10 horas de uso típico (estimado, sin confirmar)"
      },
      {
        "componente": "Portabilidad",
        "dato": "Aprox. 1.6 kg, 1.9 cm de grosor (estimado, sin confirmar)"
      },
      {
        "componente": "Garantía",
        "dato": "2 años",
      }
    ],
    "procesador": {
      "marca": "AMD",
      "modelo": "Ryzen 5 7520U",
      "serie": "Ryzen 5 7000",
      "nucleos": 4,
      "hilos": 8,
      "frecuenciaMax": "4.3 GHz",
      "npuTops": null,
      "queSignifica": "Procesador de 4 núcleos y 8 hilos con mayor frecuencia que el Ryzen 3, para multitarea más fluida.",
      "comoDecirlo": "Un poco más de potencia que el Ryzen 3: se siente más fluido con varias pestañas y programas abiertos.",
      "paraQueAlcanza": [
        "Multitarea liviana",
        "Office y correo",
        "Videollamadas",
        "Edición básica de fotos"
      ]
    },
    "memoria": {
      "ram": "8 GB",
      "tipoRam": "LPDDR5",
      "almacenamiento": "512 GB SSD",
      "comoDecirlo": "8GB le alcanza para varias pestañas y programas livianos a la vez; el SSD de 512GB es bien rápido para guardar tus cosas.",
      "caso": "soldada"
    },
    "pantallaDetalle": {
      "pulgadas": 15.6,
      "resolucion": "1920x1080 (Full HD)",
      "tipo": "IPS",
      "hz": 60,
      "nits": 250,
      "comoDecirlo": "Pantalla grande de 15.6 pulgadas, cómoda para ver series y trabajar sin forzar la vista."
    },
    "clienteIdeal": "Quien quiere un poco más de fluidez que el modelo básico, sin pasarse de presupuesto.",
    "leAlcanzaPara": [
      "Multitarea liviana",
      "Office y correo",
      "Videollamadas",
      "Edición básica de fotos"
    ],
    "noEsPara": [
      "Juegos exigentes o de última generación",
      "Edición de video profesional en 4K",
      "Tareas que necesiten tarjeta de video dedicada"
    ],
    "ganchos": [
      {
        "cliente": "Quiere un poco más de fluidez que la entrada",
        "frase": "Un paso arriba del Ryzen 3: más fluidez sin subir mucho el precio."
      },
      {
        "cliente": "Quiere ver series y trabajar cómodo",
        "frase": "Pantalla grande de 15.6 pulgadas para ver tus series y trabajar cómodo."
      },
      {
        "cliente": "Busca algo más de potencia en casa o estudio",
        "frase": "Para el cliente que quiere un poco más de potencia en casa o en el estudio."
      }
    ],
    "objeciones": [
      {
        "dice": "¿En qué se nota la diferencia con el Ryzen 3?",
        "responde": "En que abre más cosas a la vez sin trabarse: varias pestañas, Office y videollamadas juntas."
      },
      {
        "dice": "¿Sirve para editar video?",
        "responde": "Para cortes y ediciones livianas sí; para edición profesional te muestro un Zenbook o ProArt."
      }
    ],
    "compararCon": {
      "abajo": {
        "id": "vivobook-go-15-ryzen3-7320u",
        "diferencias": [
          "Mismo precio casi igual",
          "Menos fluido en multitarea"
        ]
      },
      "arriba": {
        "id": "vivobook-15-x1504ma-bq919w",
        "diferencias": [
          "Cambia a procesador Intel",
          "Suma un chip de IA (NPU), aunque no es Copilot+"
        ]
      }
    },
    "quiz": [
      {
        "pregunta": "¿Qué procesador trae este Vivobook Go 15?",
        "opciones": [
          "AMD Ryzen 5 7520U",
          "AMD Ryzen 3 7320U",
          "Intel Core i5-13420H",
          "Snapdragon X X1"
        ],
        "correcta": 0,
        "explicacion": "Este modelo trae un Ryzen 5 7520U, un paso arriba del Ryzen 3."
      },
      {
        "pregunta": "¿En qué se nota la diferencia con el modelo de Ryzen 3?",
        "opciones": [
          "Abre más cosas a la vez sin trabarse: varias pestañas, Office y videollamadas juntas",
          "Trae pantalla OLED y el otro no",
          "Tiene el doble de almacenamiento",
          "Es un Copilot+ PC y el otro no"
        ],
        "correcta": 0,
        "explicacion": "El Ryzen 5 rinde más en multitarea y se siente más fluido con varias apps abiertas."
      },
      {
        "pregunta": "¿Cuánta RAM y almacenamiento trae?",
        "opciones": [
          "8 GB de RAM y 512 GB de SSD",
          "16 GB de RAM y 1 TB de SSD",
          "4 GB de RAM y 256 GB de SSD",
          "32 GB de RAM y 2 TB de SSD"
        ],
        "correcta": 0,
        "explicacion": "8GB de RAM y 512GB de SSD, igual que el modelo de Ryzen 3."
      },
      {
        "pregunta": "¿Sirve este equipo para editar video?",
        "opciones": [
          "Para cortes y ediciones livianas sí; para edición profesional se recomienda un Zenbook o ProArt",
          "Sí, para edición profesional de cine",
          "No sirve para ningún tipo de edición",
          "Solo edita video en blanco y negro"
        ],
        "correcta": 0,
        "explicacion": "Para edición liviana funciona bien; para proyectos profesionales conviene un equipo con más potencia gráfica."
      },
      {
        "pregunta": "¿Qué trae el Vivobook Go 15 para quienes digitan muchos números?",
        "opciones": [
          "NumberPad (teclado numérico)",
          "Una calculadora física aparte",
          "Un mouse especial para números",
          "Nada adicional"
        ],
        "correcta": 0,
        "explicacion": "Trae NumberPad: un teclado numérico aparte, útil para facturación o cajero."
      },
      {
        "pregunta": "El cliente pregunta si le puede subir la memoria RAM más adelante. ¿Qué le respondes?",
        "opciones": [
          "Sí, pero hay que cambiar el módulo que ya tiene por uno más grande, porque solo tiene una ranura.",
          "Sí, se le puede sumar un módulo adicional sin tocar el que ya tiene, porque le queda una ranura libre.",
          "No, la memoria viene soldada a la placa y no se puede ampliar en este equipo.",
          "Sí, pero solo se puede subir llevándolo a un centro de servicio autorizado, nunca en la tienda."
        ],
        "correcta": 2,
        "explicacion": "8GB le alcanza para varias pestañas y programas livianos a la vez; el SSD de 512GB es bien rápido para guardar tus cosas."
      },
      {
        "pregunta": "¿Cuánto almacenamiento SSD trae este equipo?",
        "opciones": [
          "256 GB",
          "1 TB",
          "128 GB",
          "512 GB"
        ],
        "correcta": 3,
        "explicacion": "Trae 512 GB SSD: suficiente para guardar fotos, documentos, juegos o programas sin quedarse corto."
      }
    ],
    "duracionMin": 5,
    "dificultad": "básico",
    "imagen": "/products/vivobook-go-15-ryzen5.svg"
  },
  {
    "slug": "vivobook-15-x1504ma-bq919w",
    "linea": "vivobook",
    "nombre": "ASUS Vivobook 15 (X1504MA)",
    "codigo": "X1504MA-BQ919W",
    "tagline": "Es el equipo ideal para empezar: pantalla grande, rápido para lo cotidiano y con la confianza de la marca ASUS.",
    "intro": "Alguien que compra su primer portátil (o lo está renovando) para uso en el hogar o el estudio: navegar, Office, streaming y videollamadas, sin gastar de más.",
    "ficha": [
      {
        "componente": "Sistema operativo",
        "dato": "Windows 11 Home"
      },
      {
        "componente": "Procesador",
        "dato": "Intel Core 5 315"
      },
      {
        "componente": "Memoria RAM",
        "dato": "8 GB DDR5"
      },
      {
        "componente": "Gráficos",
        "dato": "Intel integrados"
      },
      {
        "componente": "IA / NPU",
        "dato": "NPU integrada, hasta 15 TOPS; no es Copilot+ PC (requiere 40 TOPS)"
      },
      {
        "componente": "Pantalla",
        "dato": "15.6\" Full HD (1920x1080), 60 Hz, 250 nits, IPS-level"
      },
      {
        "componente": "Almacenamiento",
        "dato": "SSD 512 GB M.2 NVMe PCIe 4.0"
      },
      {
        "componente": "Batería",
        "dato": "42 Wh, hasta 8 horas de uso típico (estimado, sin confirmar)"
      },
      {
        "componente": "Portabilidad",
        "dato": "Aprox. 1.7 kg, 1.99 cm de grosor (estimado, sin confirmar)"
      },
      {
        "componente": "Garantía",
        "dato": "2 años",
      }
    ],
    "procesador": {
      "marca": "Intel",
      "modelo": "Core 5 315",
      "serie": "Intel Core Series 1 (antes Meteor Lake)",
      "nucleos": 6,
      "hilos": 8,
      "frecuenciaMax": "4.5 GHz",
      "npuTops": 15,
      "queSignifica": "Tiene un acelerador de IA real (mejora videollamadas y filtros de Windows Studio Effects), pero no alcanza los 40 TOPS que exige Microsoft para Copilot+ PC.",
      "comoDecirlo": "Sí tiene un chip de IA que ayuda en las videollamadas y algunos filtros de Windows, pero no es de los Copilot+ que traen lo último en IA.",
      "paraQueAlcanza": [
        "Navegar y redes sociales",
        "Office y correo",
        "Videollamadas con mejoras de IA",
        "Streaming de series"
      ]
    },
    "memoria": {
      "ram": "8 GB",
      "tipoRam": "DDR5",
      "almacenamiento": "512 GB SSD",
      "caso": "se-cambia",
      "comoDecirlo": "Trae 8GB de memoria. Si más adelante necesita más, se la subimos a 16 o hasta 32GB, pero cambiando el módulo que ya tiene, no agregando uno nuevo, porque el equipo solo tiene una ranura."
    },
    "pantallaDetalle": {
      "pulgadas": 15.6,
      "resolucion": "1920x1080 (Full HD)",
      "tipo": "IPS-level",
      "hz": 60,
      "nits": 250,
      "comoDecirlo": "Pantalla grande de 15.6 pulgadas en Full HD: nítida para trabajar, estudiar o ver tus series."
    },
    "clienteIdeal": "Alguien que compra su primer portátil (o lo está renovando) para uso en el hogar o el estudio: navegar, Office, streaming y videollamadas, sin gastar de más.",
    "leAlcanzaPara": [
      "Navegar y redes sociales",
      "Office y correo",
      "Videollamadas con mejoras de IA",
      "Streaming de series"
    ],
    "noEsPara": [
      "Juegos exigentes o de última generación",
      "Edición de video profesional en 4K",
      "Tareas que necesiten tarjeta de video dedicada"
    ],
    "ganchos": [
      {
        "cliente": "Quiere su primer portátil para la casa",
        "frase": "Es el equipo ideal para empezar: pantalla grande, rápido para lo cotidiano y con la confianza de la marca ASUS."
      },
      {
        "cliente": "Le preocupa quedarse corto de memoria",
        "frase": "Tranquilo, este trae una ranura disponible: si más adelante necesita más memoria, se la subimos sin cambiar de equipo."
      },
      {
        "cliente": "Pregunta si tiene inteligencia artificial",
        "frase": "Sí, trae un chip de IA que ayuda en videollamadas; si busca lo último en IA (Copilot+), te muestro el Vivobook S14."
      },
      {
        "cliente": "Quiere algo liviano para cargar todos los días",
        "frase": "Pesa poco más de kilo y medio: lo lleva al trabajo o la universidad sin esfuerzo."
      }
    ],
    "objeciones": [
      {
        "dice": "¿Por qué solo trae 8GB de memoria?",
        "responde": "Porque está pensado para el uso diario: navegar, Office, redes y streaming. Si el cliente necesita más, se la podemos subir más adelante."
      },
      {
        "dice": "¿Es un Copilot+ PC?",
        "responde": "No. Tiene un chip de IA (NPU) que ayuda en tareas puntuales, pero no llega a los 40 TOPS que exige Microsoft para esa categoría."
      },
      {
        "dice": "¿Le puedo agregar más memoria después?",
        "responde": "Sí, pero no se 'suma': como solo tiene una ranura, hay que cambiar el módulo de 8GB por uno más grande."
      },
      {
        "dice": "¿Sirve para trabajar con muchos programas abiertos a la vez?",
        "responde": "Para el día a día sí. Si abre muchísimos programas pesados a la vez, lo ideal es subirle la memoria o mostrarle un equipo con más RAM de fábrica."
      }
    ],
    "compararCon": {
      "abajo": {
        "id": "vivobook-go-15-ryzen5-7520u",
        "diferencias": [
          "Sube a procesador Intel con NPU de 15 TOPS",
          "La RAM sigue siendo de 8GB"
        ]
      },
      "arriba": {
        "id": "vivobook-15-i3-bq3904w",
        "diferencias": [
          "Mismo tamaño de pantalla",
          "Cuadriplica el almacenamiento a 1TB"
        ]
      }
    },
    "quiz": [
      {
        "pregunta": "¿Este Vivobook 15 es un Copilot+ PC?",
        "opciones": [
          "No, su NPU llega a 15 TOPS y se necesitan 40 TOPS",
          "Sí, es Copilot+ PC",
          "Solo si se conecta a internet",
          "Sí, pero solo con Windows 10"
        ],
        "correcta": 0,
        "explicacion": "Microsoft exige un mínimo de 40 TOPS de NPU para la certificación Copilot+ PC; este equipo trae 15 TOPS."
      },
      {
        "pregunta": "¿Qué procesador trae este Vivobook 15?",
        "opciones": [
          "Intel Core 5 315",
          "AMD Ryzen 5 7520U",
          "Snapdragon X X1",
          "Intel Core i9"
        ],
        "correcta": 0,
        "explicacion": "Trae un Intel Core 5 315, de la familia Intel Core Series 1."
      },
      {
        "pregunta": "El cliente quiere subir la memoria RAM más adelante. ¿Qué le explicas?",
        "opciones": [
          "Que hay que cambiar el módulo de 8GB por uno más grande, porque solo hay una ranura",
          "Que se puede agregar un segundo módulo sin problema",
          "Que no se puede subir la memoria nunca",
          "Que necesita comprar un disco duro externo"
        ],
        "correcta": 0,
        "explicacion": "El equipo solo tiene una ranura de memoria, así que la expansión es por reemplazo, no por suma."
      },
      {
        "pregunta": "¿Para qué le alcanzan los 8GB de RAM de fábrica?",
        "opciones": [
          "Para internet, Office, redes y videollamadas",
          "Para edición de video profesional 4K",
          "Para correr varias máquinas virtuales a la vez",
          "No le alcanza para nada"
        ],
        "correcta": 0,
        "explicacion": "8GB alcanza bien para el uso diario del hogar y el estudio."
      },
      {
        "pregunta": "¿Cuánto almacenamiento trae este equipo?",
        "opciones": [
          "512 GB de SSD",
          "128 GB de SSD",
          "1 TB de disco duro",
          "No trae almacenamiento interno"
        ],
        "correcta": 0,
        "explicacion": "Trae un SSD M.2 NVMe de 512GB."
      },
      {
        "pregunta": "Un cliente pregunta si el equipo \"tiene IA\". ¿Qué le respondes?",
        "opciones": [
          "Sí, tiene un chip de IA que ayuda en videollamadas y filtros, pero no es Copilot+",
          "No tiene ningún tipo de IA",
          "Sí, es exactamente igual a un Copilot+ PC",
          "La IA solo funciona con internet"
        ],
        "correcta": 0,
        "explicacion": "La NPU de 15 TOPS ayuda en tareas puntuales, pero no alcanza los 40 TOPS de Copilot+."
      },
      {
        "pregunta": "¿Qué tamaño y resolución tiene la pantalla?",
        "opciones": [
          "15.6\" Full HD",
          "14\" OLED 4K",
          "17\" Full HD",
          "13\" HD"
        ],
        "correcta": 0,
        "explicacion": "Pantalla de 15.6 pulgadas en Full HD (1920x1080)."
      },
      {
        "pregunta": "¿Para qué tipo de cliente es ideal este Vivobook 15?",
        "opciones": [
          "Quien compra su primer portátil para el hogar o el estudio",
          "Un diseñador gráfico profesional",
          "Un gamer competitivo",
          "Una empresa que necesita servidores"
        ],
        "correcta": 0,
        "explicacion": "Es el equipo de entrada ideal para el hogar o el estudio, sin gastar de más."
      },
      {
        "pregunta": "El cliente pregunta si le puede subir la memoria RAM más adelante. ¿Qué le respondes?",
        "opciones": [
          "No, la memoria viene soldada a la placa y no se puede ampliar en este equipo.",
          "Sí, se le puede sumar un módulo adicional sin tocar el que ya tiene, porque le queda una ranura libre.",
          "Sí, pero solo se puede subir llevándolo a un centro de servicio autorizado, nunca en la tienda.",
          "Sí, pero hay que cambiar el módulo que ya tiene por uno más grande, porque solo tiene una ranura."
        ],
        "correcta": 3,
        "explicacion": "Trae 8GB de memoria. Si más adelante necesita más, se la subimos a 16 o hasta 32GB, pero cambiando el módulo que ya tiene, no agregando uno nuevo, porque el equipo solo tiene una ranura."
      },
      {
        "pregunta": "¿Cuánto almacenamiento SSD trae este equipo?",
        "opciones": [
          "512 GB",
          "256 GB",
          "1 TB",
          "128 GB"
        ],
        "correcta": 0,
        "explicacion": "Trae 512 GB SSD: suficiente para guardar fotos, documentos, juegos o programas sin quedarse corto."
      }
    ],
    "duracionMin": 6,
    "dificultad": "básico",
    "imagen": "/products/vivobook-15-x1504ma.svg"
  },
  {
    "slug": "vivobook-15-i3-bq3904w",
    "linea": "vivobook",
    "nombre": "ASUS Vivobook 15 (X1504VA)",
    "codigo": "X1504VA-BQ3904W",
    "tagline": "¿Necesita guardar muchísimo sin quedarse sin espacio? Este trae 1 Terabyte.",
    "intro": "Quien necesita guardar muchos archivos (fotos, documentos, videos) sin gastar de más.",
    "ficha": [
      {
        "componente": "Sistema operativo",
        "dato": "Windows 11 Home"
      },
      {
        "componente": "Procesador",
        "dato": "Intel Core i3 (13va Gen.)"
      },
      {
        "componente": "Memoria RAM",
        "dato": "8 GB DDR4"
      },
      {
        "componente": "Gráficos",
        "dato": "Intel UHD integrados"
      },
      {
        "componente": "IA / NPU",
        "dato": "Sin NPU dedicada; no es Copilot+ PC"
      },
      {
        "componente": "Pantalla",
        "dato": "15.6\" Full HD (1920x1080), 60 Hz, 250 nits, IPS (estimado, sin confirmar)"
      },
      {
        "componente": "Almacenamiento",
        "dato": "SSD 1 TB M.2 NVMe"
      },
      {
        "componente": "Batería",
        "dato": "Hasta 10 horas de uso típico (estimado, sin confirmar)"
      },
      {
        "componente": "Portabilidad",
        "dato": "Aprox. 1.7 kg, 2 cm de grosor (estimado, sin confirmar)"
      },
      {
        "componente": "Garantía",
        "dato": "2 años",
      }
    ],
    "procesador": {
      "marca": "Intel",
      "modelo": "Core i3-1315U",
      "serie": "Intel Core i3 (13th Gen)",
      "nucleos": 6,
      "hilos": 8,
      "frecuenciaMax": "4.5 GHz",
      "npuTops": null,
      "queSignifica": "Procesador Intel de nivel inicial con buen desempeño en tareas de oficina.",
      "comoDecirlo": "Es confiable para trabajo de oficina, internet y estudio, con hartísimo espacio para guardar archivos.",
      "paraQueAlcanza": [
        "Office y estudio",
        "Internet y redes",
        "Guardar muchos archivos (1TB)"
      ]
    },
    "memoria": {
      "ram": "8 GB",
      "tipoRam": "DDR4",
      "almacenamiento": "1 TB SSD",
      "comoDecirlo": "1TB es un montón de espacio: guarda miles de fotos, videos y documentos sin preocuparse.",
      "caso": "se-suma"
    },
    "pantallaDetalle": {
      "pulgadas": 15.6,
      "resolucion": "1920x1080 (Full HD)",
      "tipo": "IPS",
      "hz": 60,
      "nits": 250,
      "comoDecirlo": "Pantalla grande y clara para trabajar y ver contenido."
    },
    "clienteIdeal": "Quien necesita guardar muchos archivos (fotos, documentos, videos) sin gastar de más.",
    "leAlcanzaPara": [
      "Office y estudio",
      "Internet y redes",
      "Guardar muchos archivos (1TB)"
    ],
    "noEsPara": [
      "Juegos exigentes o de última generación",
      "Edición de video profesional en 4K",
      "Tareas que necesiten tarjeta de video dedicada"
    ],
    "ganchos": [
      {
        "cliente": "Necesita guardar muchísimo sin quedarse sin espacio",
        "frase": "¿Necesita guardar muchísimo sin quedarse sin espacio? Este trae 1 Terabyte."
      },
      {
        "cliente": "Trabaja con muchos documentos o fotos",
        "frase": "Ideal para el cliente que trabaja con muchos documentos o fotos."
      },
      {
        "cliente": "Necesita algo confiable para oficina y estudio",
        "frase": "Confiable para la oficina y el estudio del día a día."
      }
    ],
    "objeciones": [
      {
        "dice": "¿Por qué tan poca RAM si tiene tanto almacenamiento?",
        "responde": "El fuerte de este equipo es el espacio: 1TB para guardar de todo. Para multitarea pesada, te muestro el de 16GB."
      },
      {
        "dice": "¿Sirve para trabajar desde casa?",
        "responde": "Sí, para Office, correo y videollamadas va muy bien."
      }
    ],
    "compararCon": {
      "abajo": {
        "id": "vivobook-15-x1504ma-bq919w",
        "diferencias": [
          "Menos almacenamiento (512GB vs. 1TB)",
          "El X1504MA trae NPU y este no"
        ]
      },
      "arriba": {
        "id": "vivobook-15-core5-120u-8gb",
        "diferencias": [
          "Mismo tamaño de pantalla",
          "Procesador más rápido en multitarea",
          "La mitad del almacenamiento (512GB)"
        ]
      }
    },
    "quiz": [
      {
        "pregunta": "¿Qué destaca más a este Vivobook 15?",
        "opciones": [
          "Su 1 Terabyte de almacenamiento",
          "Su tarjeta de video dedicada",
          "Su pantalla OLED",
          "Su chip de inteligencia artificial"
        ],
        "correcta": 0,
        "explicacion": "El fuerte de este equipo es el espacio: 1TB para guardar de todo."
      },
      {
        "pregunta": "¿Qué procesador trae?",
        "opciones": [
          "Intel Core i3 (13va Generación)",
          "AMD Ryzen 7",
          "Intel Core Ultra 7",
          "Snapdragon X Elite"
        ],
        "correcta": 0,
        "explicacion": "Trae un Intel Core i3 de 13va generación, confiable para oficina y estudio."
      },
      {
        "pregunta": "¿Por qué tiene tan poca RAM si tiene tanto almacenamiento?",
        "opciones": [
          "El fuerte de este equipo es el espacio; para multitarea pesada se recomienda el de 16GB",
          "Porque le falló la memoria de fábrica",
          "Porque no puede tener más de 8GB nunca",
          "Porque así es más lento a propósito"
        ],
        "correcta": 0,
        "explicacion": "Este modelo prioriza el almacenamiento; si el cliente necesita más multitarea, se sube a un Vivobook de 16GB."
      },
      {
        "pregunta": "¿Sirve este equipo para trabajar desde casa?",
        "opciones": [
          "Sí, para Office, correo y videollamadas va muy bien",
          "No, solo sirve para ver videos",
          "Solo si se conecta a un monitor externo",
          "No tiene Windows instalado"
        ],
        "correcta": 0,
        "explicacion": "Para tareas de oficina, correo y videollamadas funciona muy bien."
      },
      {
        "pregunta": "¿Cuánto almacenamiento trae este Vivobook 15?",
        "opciones": [
          "1 TB de SSD",
          "256 GB de SSD",
          "512 GB de SSD",
          "2 TB de disco duro"
        ],
        "correcta": 0,
        "explicacion": "Trae 1TB de SSD: espacio de sobra para fotos, documentos y videos."
      },
      {
        "pregunta": "El cliente pregunta si le puede subir la memoria RAM más adelante. ¿Qué le respondes?",
        "opciones": [
          "No, la memoria viene soldada a la placa y no se puede ampliar en este equipo.",
          "Sí, pero hay que cambiar el módulo que ya tiene por uno más grande, porque solo tiene una ranura.",
          "Sí, pero solo se puede subir llevándolo a un centro de servicio autorizado, nunca en la tienda.",
          "Sí, se le puede sumar un módulo adicional sin tocar el que ya tiene, porque le queda una ranura libre."
        ],
        "correcta": 3,
        "explicacion": "1TB es un montón de espacio: guarda miles de fotos, videos y documentos sin preocuparse."
      },
      {
        "pregunta": "¿Cuánto almacenamiento SSD trae este equipo?",
        "opciones": [
          "1 TB",
          "512 GB",
          "2 TB",
          "256 GB"
        ],
        "correcta": 0,
        "explicacion": "Trae 1 TB SSD: suficiente para guardar fotos, documentos, juegos o programas sin quedarse corto."
      }
    ],
    "duracionMin": 5,
    "dificultad": "básico",
    "imagen": "/products/vivobook-15-i3-1tb.svg"
  },
  {
    "slug": "vivobook-15-core5-120u-8gb",
    "linea": "vivobook",
    "nombre": "ASUS Vivobook 15 (X1504VA)",
    "codigo": "X1504VA-BQ598W",
    "tagline": "Buen punto medio entre precio y potencia para el día a día.",
    "intro": "Quien quiere un portátil confiable para trabajo y estudio, con buen balance de precio y desempeño.",
    "ficha": [
      {
        "componente": "Sistema operativo",
        "dato": "Windows 11 Home"
      },
      {
        "componente": "Procesador",
        "dato": "Intel Core 5 120U"
      },
      {
        "componente": "Memoria RAM",
        "dato": "8 GB DDR4"
      },
      {
        "componente": "Gráficos",
        "dato": "Intel UHD integrados"
      },
      {
        "componente": "IA / NPU",
        "dato": "Sin NPU dedicada; no es Copilot+ PC"
      },
      {
        "componente": "Pantalla",
        "dato": "15.6\" Full HD (1920x1080), 60 Hz, 250 nits, IPS (estimado, sin confirmar)"
      },
      {
        "componente": "Almacenamiento",
        "dato": "SSD 512 GB M.2 NVMe"
      },
      {
        "componente": "Batería",
        "dato": "Hasta 11 horas de uso típico (estimado, sin confirmar)"
      },
      {
        "componente": "Portabilidad",
        "dato": "Aprox. 1.7 kg, 2 cm de grosor (estimado, sin confirmar)"
      },
      {
        "componente": "Garantía",
        "dato": "2 años",
      }
    ],
    "procesador": {
      "marca": "Intel",
      "modelo": "Core 5 120U",
      "serie": "Intel Core 5 (Series 1)",
      "nucleos": 6,
      "hilos": 8,
      "frecuenciaMax": "4.9 GHz",
      "npuTops": null,
      "queSignifica": "Procesador Intel de nivel medio con buen balance de potencia y eficiencia.",
      "comoDecirlo": "Buen equilibrio entre precio y desempeño: rápido para el día a día y multitarea ligera.",
      "paraQueAlcanza": [
        "Office y multitarea",
        "Streaming y video en HD",
        "Videollamadas"
      ]
    },
    "memoria": {
      "ram": "8 GB",
      "tipoRam": "DDR4",
      "almacenamiento": "512 GB SSD",
      "comoDecirlo": "8GB le alcanza bien para el día a día, con un SSD de 512GB bien rápido.",
      "caso": "se-suma"
    },
    "pantallaDetalle": {
      "pulgadas": 15.6,
      "resolucion": "1920x1080 (Full HD)",
      "tipo": "IPS",
      "hz": 60,
      "nits": 250,
      "comoDecirlo": "Pantalla grande y clara para trabajar y ver contenido."
    },
    "clienteIdeal": "Quien quiere un portátil confiable para trabajo y estudio, con buen balance de precio y desempeño.",
    "leAlcanzaPara": [
      "Office y multitarea",
      "Streaming y video en HD",
      "Videollamadas"
    ],
    "noEsPara": [
      "Juegos exigentes o de última generación",
      "Edición de video profesional en 4K",
      "Tareas que necesiten tarjeta de video dedicada"
    ],
    "ganchos": [
      {
        "cliente": "Busca equilibrio entre precio y potencia",
        "frase": "Buen punto medio entre precio y potencia para el día a día."
      },
      {
        "cliente": "Hace multitarea de oficina y videollamadas",
        "frase": "Rápido para multitarea de oficina y videollamadas."
      },
      {
        "cliente": "Quiere pantalla grande y cómoda",
        "frase": "Pantalla grande y cómoda para trabajar todo el día."
      }
    ],
    "objeciones": [
      {
        "dice": "¿Es mucho mejor que el de Core i3?",
        "responde": "Sí, el Core 5 rinde más en multitarea y se siente más fluido con varias apps abiertas."
      },
      {
        "dice": "¿Debería llevar el de 16GB en vez de este?",
        "responde": "Si el cliente abre muchas apps pesadas a la vez, sí; para uso normal de oficina, 8GB le alcanza bien."
      }
    ],
    "compararCon": {
      "abajo": {
        "id": "vivobook-15-i3-bq3904w",
        "diferencias": [
          "Menos potencia de procesador",
          "El doble de almacenamiento"
        ]
      },
      "arriba": {
        "id": "vivobook-15-core5-120u-tactil-16gb",
        "diferencias": [
          "Mismo procesador",
          "Pantalla táctil",
          "El doble de RAM"
        ]
      }
    },
    "quiz": [
      {
        "pregunta": "¿Qué resume mejor a este Vivobook 15?",
        "opciones": [
          "Buen equilibrio entre precio y desempeño para el día a día",
          "Es el modelo gamer más potente de la línea",
          "Es el modelo más económico de todo el catálogo",
          "Es exclusivo para diseño gráfico profesional"
        ],
        "correcta": 0,
        "explicacion": "El Core 5 120U da un buen balance de precio y desempeño para multitarea de oficina."
      },
      {
        "pregunta": "¿Es mucho mejor este procesador que el del Vivobook con Core i3?",
        "opciones": [
          "Sí, el Core 5 rinde más en multitarea y se siente más fluido con varias apps abiertas",
          "No, son exactamente iguales",
          "No, el i3 es más potente",
          "Solo cambia el color del equipo"
        ],
        "correcta": 0,
        "explicacion": "El Core 5 rinde más que el i3 en tareas de multitarea."
      },
      {
        "pregunta": "¿Debería el cliente llevar el de 16GB en vez de este de 8GB?",
        "opciones": [
          "Si abre muchas apps pesadas a la vez, sí; para uso normal de oficina, 8GB le alcanza bien",
          "Siempre debe llevar el de 16GB sin excepción",
          "Nunca hace falta más de 8GB, bajo ninguna circunstancia",
          "El de 16GB es exactamente igual de rápido"
        ],
        "correcta": 0,
        "explicacion": "8GB alcanza para uso normal de oficina; para multitarea pesada conviene el de 16GB."
      },
      {
        "pregunta": "¿Qué tipo de Wi-Fi trae este modelo?",
        "opciones": [
          "Wi-Fi 6",
          "Wi-Fi 4",
          "No trae Wi-Fi",
          "Solo se conecta por cable"
        ],
        "correcta": 0,
        "explicacion": "Trae Wi-Fi 6: conexión más estable y rápida, ideal para videollamadas."
      },
      {
        "pregunta": "¿Cuánto almacenamiento trae este Vivobook 15?",
        "opciones": [
          "512 GB de SSD",
          "1 TB de SSD",
          "128 GB de SSD",
          "2 TB de disco duro"
        ],
        "correcta": 0,
        "explicacion": "Trae un SSD de 512GB, suficiente para el uso diario."
      },
      {
        "pregunta": "El cliente pregunta si le puede subir la memoria RAM más adelante. ¿Qué le respondes?",
        "opciones": [
          "Sí, se le puede sumar un módulo adicional sin tocar el que ya tiene, porque le queda una ranura libre.",
          "No, la memoria viene soldada a la placa y no se puede ampliar en este equipo.",
          "Sí, pero hay que cambiar el módulo que ya tiene por uno más grande, porque solo tiene una ranura.",
          "Sí, pero solo se puede subir llevándolo a un centro de servicio autorizado, nunca en la tienda."
        ],
        "correcta": 0,
        "explicacion": "8GB le alcanza bien para el día a día, con un SSD de 512GB bien rápido."
      },
      {
        "pregunta": "¿Cuánto almacenamiento SSD trae este equipo?",
        "opciones": [
          "256 GB",
          "512 GB",
          "1 TB",
          "128 GB"
        ],
        "correcta": 1,
        "explicacion": "Trae 512 GB SSD: suficiente para guardar fotos, documentos, juegos o programas sin quedarse corto."
      }
    ],
    "duracionMin": 5,
    "dificultad": "intermedio",
    "imagen": "/products/vivobook-15-core5-8gb.svg"
  },
  {
    "slug": "vivobook-15-core5-120u-tactil-16gb",
    "linea": "vivobook",
    "nombre": "ASUS Vivobook 15 táctil (X1504VA)",
    "codigo": "X1504VA (táctil) — confirmar sufijo",
    "tagline": "¿Quiere tocar la pantalla directo, como en el celular? Este Vivobook es táctil.",
    "intro": "Quien quiere la comodidad de tocar la pantalla directo, con más RAM para multitarea.",
    "ficha": [
      {
        "componente": "Sistema operativo",
        "dato": "Windows 11 Home"
      },
      {
        "componente": "Procesador",
        "dato": "Intel Core 5 120U"
      },
      {
        "componente": "Memoria RAM",
        "dato": "16 GB DDR4"
      },
      {
        "componente": "Gráficos",
        "dato": "Intel UHD integrados"
      },
      {
        "componente": "IA / NPU",
        "dato": "Sin NPU dedicada; no es Copilot+ PC"
      },
      {
        "componente": "Pantalla",
        "dato": "15.6\" Full HD (1920x1080) táctil, 60 Hz, 250 nits, IPS (estimado, sin confirmar)"
      },
      {
        "componente": "Almacenamiento",
        "dato": "SSD 512 GB M.2 NVMe"
      },
      {
        "componente": "Batería",
        "dato": "Hasta 10 horas de uso típico (estimado, sin confirmar)"
      },
      {
        "componente": "Portabilidad",
        "dato": "Aprox. 1.8 kg, 2 cm de grosor (estimado, sin confirmar)"
      },
      {
        "componente": "Garantía",
        "dato": "2 años",
      }
    ],
    "procesador": {
      "marca": "Intel",
      "modelo": "Core 5 120U",
      "serie": "Intel Core 5 (Series 1)",
      "nucleos": 6,
      "hilos": 8,
      "frecuenciaMax": "4.9 GHz",
      "npuTops": null,
      "queSignifica": "Procesador Intel de nivel medio con buen balance de potencia y eficiencia.",
      "comoDecirlo": "Buen equilibrio entre precio y desempeño: rápido para el día a día y multitarea ligera.",
      "paraQueAlcanza": [
        "Office y multitarea",
        "Streaming y video en HD",
        "Videollamadas",
        "Anotar o firmar sobre la pantalla"
      ]
    },
    "memoria": {
      "ram": "16 GB",
      "tipoRam": "DDR4",
      "almacenamiento": "512 GB SSD",
      "comoDecirlo": "16GB le da mucha más fluidez para tener varias apps abiertas a la vez, sin trabarse.",
      "caso": "se-suma"
    },
    "pantallaDetalle": {
      "pulgadas": 15.6,
      "resolucion": "1920x1080 (Full HD)",
      "tipo": "IPS táctil",
      "hz": 60,
      "nits": 250,
      "comoDecirlo": "Pantalla táctil: puedes tocarla directo para navegar, firmar o anotar."
    },
    "clienteIdeal": "Quien quiere la comodidad de tocar la pantalla directo, con más RAM para multitarea.",
    "leAlcanzaPara": [
      "Office y multitarea",
      "Streaming y video en HD",
      "Videollamadas",
      "Anotar o firmar sobre la pantalla"
    ],
    "noEsPara": [
      "Juegos exigentes o de última generación",
      "Edición de video profesional en 4K",
      "Tareas que necesiten tarjeta de video dedicada"
    ],
    "ganchos": [
      {
        "cliente": "Quiere tocar la pantalla como en el celular",
        "frase": "¿Quiere tocar la pantalla directo, como en el celular? Este Vivobook es táctil."
      },
      {
        "cliente": "Quiere que todo se sienta fluido",
        "frase": "Con 16GB de RAM, todo se siente más fluido."
      },
      {
        "cliente": "Firma documentos o anota seguido",
        "frase": "Ideal para quien firma documentos o anota seguido."
      }
    ],
    "objeciones": [
      {
        "dice": "¿La pantalla táctil sirve para algo en un portátil normal?",
        "responde": "Sí: para firmar documentos, navegar rápido o anotar sobre PDFs, sin necesitar mouse."
      },
      {
        "dice": "¿Vale la pena pagar más por el táctil?",
        "responde": "Si el cliente firma documentos o usa apps táctiles seguido, sí vale la pena."
      }
    ],
    "compararCon": {
      "abajo": {
        "id": "vivobook-15-core5-120u-8gb",
        "diferencias": [
          "Misma pantalla y procesador",
          "Sin táctil",
          "La mitad de RAM"
        ]
      },
      "arriba": {
        "id": "vivobook-14-snapdragon-x1-16gb",
        "diferencias": [
          "Cambia de tamaño (14\")",
          "Suma Copilot+ PC con batería mucho más larga",
          "Pierde la pantalla táctil"
        ]
      }
    },
    "quiz": [
      {
        "pregunta": "¿Qué tiene de especial la pantalla de este Vivobook 15?",
        "opciones": [
          "Es táctil: se puede tocar directo para navegar, firmar o anotar",
          "Es una pantalla curva",
          "Es una pantalla plegable",
          "Se puede desmontar del teclado"
        ],
        "correcta": 0,
        "explicacion": "Esta versión del Vivobook 15 trae pantalla táctil."
      },
      {
        "pregunta": "¿La pantalla táctil sirve para algo en un portátil normal?",
        "opciones": [
          "Sí: para firmar documentos, navegar rápido o anotar sobre PDFs, sin necesitar mouse",
          "No sirve para nada en un portátil",
          "Solo sirve para jugar videojuegos",
          "Solo funciona con un lápiz especial que no se incluye"
        ],
        "correcta": 0,
        "explicacion": "La pantalla táctil es útil para firmar, navegar y anotar sin depender del mouse o el touchpad."
      },
      {
        "pregunta": "¿Cuánta RAM trae esta versión táctil?",
        "opciones": [
          "16 GB",
          "8 GB",
          "4 GB",
          "32 GB"
        ],
        "correcta": 0,
        "explicacion": "Esta versión trae 16GB de RAM, más que el Vivobook 15 básico de 8GB."
      },
      {
        "pregunta": "¿Vale la pena pagar más por la versión táctil?",
        "opciones": [
          "Si el cliente firma documentos o usa apps táctiles seguido, sí vale la pena",
          "Nunca vale la pena pagar más por eso",
          "Solo vale la pena si el cliente es gamer",
          "Solo vale la pena si el cliente edita video profesional"
        ],
        "correcta": 0,
        "explicacion": "Para quien firma documentos o anota seguido, la pantalla táctil sí justifica el costo extra."
      },
      {
        "pregunta": "¿Qué procesador trae este modelo?",
        "opciones": [
          "Intel Core 5 120U",
          "Intel Core i3 (13va Gen.)",
          "AMD Ryzen 5 7520U",
          "Snapdragon X X1"
        ],
        "correcta": 0,
        "explicacion": "Trae el mismo Intel Core 5 120U que la versión no táctil, con más RAM."
      },
      {
        "pregunta": "El cliente pregunta si le puede subir la memoria RAM más adelante. ¿Qué le respondes?",
        "opciones": [
          "No, la memoria viene soldada a la placa y no se puede ampliar en este equipo.",
          "Sí, se le puede sumar un módulo adicional sin tocar el que ya tiene, porque le queda una ranura libre.",
          "Sí, pero hay que cambiar el módulo que ya tiene por uno más grande, porque solo tiene una ranura.",
          "Sí, pero solo se puede subir llevándolo a un centro de servicio autorizado, nunca en la tienda."
        ],
        "correcta": 1,
        "explicacion": "16GB le da mucha más fluidez para tener varias apps abiertas a la vez, sin trabarse."
      },
      {
        "pregunta": "¿Cuánto almacenamiento SSD trae este equipo?",
        "opciones": [
          "256 GB",
          "1 TB",
          "512 GB",
          "128 GB"
        ],
        "correcta": 2,
        "explicacion": "Trae 512 GB SSD: suficiente para guardar fotos, documentos, juegos o programas sin quedarse corto."
      }
    ],
    "duracionMin": 5,
    "dificultad": "intermedio",
    "imagen": "/products/vivobook-15-core5-tactil-16gb.svg"
  },
  {
    "slug": "vivobook-14-snapdragon-x1-16gb",
    "linea": "vivobook",
    "nombre": "ASUS Vivobook 14 (X1407QA)",
    "codigo": "X1407QA-NJ323W",
    "tagline": "Es un Copilot+ PC: lo último en IA de Windows, directo en un Vivobook.",
    "intro": "Quien busca batería larga, algo moderno y liviano, con las nuevas funciones de IA de Windows.",
    "ficha": [
      {
        "componente": "Sistema operativo",
        "dato": "Windows 11 Home"
      },
      {
        "componente": "Procesador",
        "dato": "Snapdragon X X1-26-100"
      },
      {
        "componente": "Memoria RAM",
        "dato": "16 GB LPDDR5"
      },
      {
        "componente": "Gráficos",
        "dato": "Qualcomm Adreno"
      },
      {
        "componente": "IA / NPU",
        "dato": "NPU Qualcomm Hexagon, hasta 45 TOPS (Copilot+ PC)"
      },
      {
        "componente": "Pantalla",
        "dato": "14\" Full HD (1920x1080), 60 Hz, 300 nits, IPS (estimado, sin confirmar)"
      },
      {
        "componente": "Almacenamiento",
        "dato": "SSD 512 GB M.2 NVMe"
      },
      {
        "componente": "Batería",
        "dato": "Hasta 13 horas de uso típico (estimado, sin confirmar)"
      },
      {
        "componente": "Portabilidad",
        "dato": "Aprox. 1.5 kg, 1.8 cm de grosor (estimado, sin confirmar)"
      },
      {
        "componente": "Garantía",
        "dato": "2 años",
      }
    ],
    "procesador": {
      "marca": "Qualcomm",
      "modelo": "Snapdragon X X1-26-100",
      "serie": "Snapdragon X",
      "nucleos": 8,
      "hilos": 8,
      "frecuenciaMax": "3.4 GHz (hasta 4.0 GHz boost)",
      "npuTops": 45,
      "queSignifica": "Chip ARM con NPU dedicada que habilita funciones de Copilot+ con muy bajo consumo.",
      "comoDecirlo": "Es un Copilot+ PC: tiene un chip especial de IA que mejora videollamadas, fotos y tareas de Windows, y la batería dura muchísimo.",
      "paraQueAlcanza": [
        "Multitarea liviana con mucha batería",
        "Funciones de IA de Windows (Copilot+)",
        "Videollamadas con mejoras automáticas"
      ]
    },
    "memoria": {
      "ram": "16 GB",
      "tipoRam": "LPDDR5",
      "almacenamiento": "512 GB SSD",
      "comoDecirlo": "16GB le da mucha fluidez para tener varias apps abiertas a la vez.",
      "caso": "soldada"
    },
    "pantallaDetalle": {
      "pulgadas": 14,
      "resolucion": "1920x1080 (Full HD)",
      "tipo": "IPS",
      "hz": 60,
      "nits": 300,
      "comoDecirlo": "Pantalla cómoda de 14 pulgadas, fácil de llevar a todas partes."
    },
    "clienteIdeal": "Quien busca batería larga, algo moderno y liviano, con las nuevas funciones de IA de Windows.",
    "leAlcanzaPara": [
      "Multitarea liviana con mucha batería",
      "Funciones de IA de Windows (Copilot+)",
      "Videollamadas con mejoras automáticas"
    ],
    "noEsPara": [
      "Juegos exigentes o de última generación",
      "Edición de video profesional en 4K",
      "Tareas que necesiten tarjeta de video dedicada"
    ],
    "ganchos": [
      {
        "cliente": "Pregunta por lo último en IA de Windows",
        "frase": "Es un Copilot+ PC: lo último en IA de Windows, directo en un Vivobook."
      },
      {
        "cliente": "Necesita batería que dure muchísimo",
        "frase": "La batería le dura muchísimo gracias a su chip ARM."
      },
      {
        "cliente": "Quiere algo moderno y liviano",
        "frase": "Ideal para el cliente que quiere algo moderno y liviano."
      }
    ],
    "objeciones": [
      {
        "dice": "¿Corre todos mis programas?",
        "responde": "La mayoría de apps de uso diario sí; algunos programas muy específicos de Windows antiguo pueden necesitar revisión. Para esos casos, te muestro un Vivobook Intel o AMD."
      },
      {
        "dice": "¿Qué es un Copilot+ PC?",
        "responde": "Es la nueva categoría de Windows con IA integrada: mejora videollamadas, fotos y búsquedas, todo sin gastar batería de más."
      }
    ],
    "compararCon": {
      "abajo": {
        "id": "vivobook-15-core5-120u-tactil-16gb",
        "diferencias": [
          "Pierde la pantalla táctil",
          "Gana Copilot+ PC y muchísima más batería"
        ]
      },
      "arriba": {
        "id": "vivobook-16-ryzenai5-16gb",
        "diferencias": [
          "Misma categoría Copilot+",
          "Pantalla más grande (16\")",
          "Corre Windows x86 nativo sin limitaciones"
        ]
      }
    },
    "quiz": [
      {
        "pregunta": "¿Qué hace especial a un Copilot+ PC como el Vivobook 14?",
        "opciones": [
          "Trae un chip de IA (NPU) integrado",
          "Es más barato que los demás portátiles",
          "No necesita cargador",
          "Viene sin Windows instalado"
        ],
        "correcta": 0,
        "explicacion": "Los Copilot+ PC tienen un NPU dedicado para tareas de inteligencia artificial."
      },
      {
        "pregunta": "¿Para qué le sirve al cliente el NPU de hasta 45 TOPS?",
        "opciones": [
          "Para mejorar videollamadas y tareas de Windows sin gastar batería extra",
          "Para jugar videojuegos en 4K",
          "Para cargar el equipo más rápido",
          "Para aumentar el almacenamiento"
        ],
        "correcta": 0,
        "explicacion": "El NPU acelera tareas de IA como las videollamadas, sin consumir batería de más."
      },
      {
        "pregunta": "¿Corre este equipo todos los programas de Windows?",
        "opciones": [
          "La mayoría de apps de uso diario sí; algunos programas muy específicos pueden necesitar revisión",
          "No corre ningún programa de Windows",
          "Solo corre aplicaciones de Qualcomm",
          "Necesita instalar Windows aparte"
        ],
        "correcta": 0,
        "explicacion": "Por ser un chip ARM, la mayoría de apps corren bien; para programas muy específicos conviene revisar antes."
      },
      {
        "pregunta": "Un cliente quiere algo liviano que le dure toda la jornada sin cargador. ¿Qué le destacas?",
        "opciones": [
          "Su batería de larga duración gracias al chip ARM, y que es liviano",
          "Que tiene tarjeta de video dedicada para videojuegos",
          "Que pesa más de 2 kg pero rinde mucho",
          "Que no trae SSD, solo disco duro"
        ],
        "correcta": 0,
        "explicacion": "El Snapdragon X cuida mucho la batería, y el diseño es liviano: justo lo que necesita alguien que lo carga todo el día."
      },
      {
        "pregunta": "¿Qué es un Copilot+ PC?",
        "opciones": [
          "La nueva categoría de Windows con IA integrada: mejora videollamadas, fotos y búsquedas",
          "Un portátil que solo sirve para trabajar en la nube",
          "Un portátil sin teclado físico",
          "Un portátil exclusivo para programadores"
        ],
        "correcta": 0,
        "explicacion": "Copilot+ PC es la categoría de equipos con IA integrada de bajo consumo de batería."
      },
      {
        "pregunta": "El cliente pregunta si le puede subir la memoria RAM más adelante. ¿Qué le respondes?",
        "opciones": [
          "Sí, pero hay que cambiar el módulo que ya tiene por uno más grande, porque solo tiene una ranura.",
          "Sí, se le puede sumar un módulo adicional sin tocar el que ya tiene, porque le queda una ranura libre.",
          "No, la memoria viene soldada a la placa y no se puede ampliar en este equipo.",
          "Sí, pero solo se puede subir llevándolo a un centro de servicio autorizado, nunca en la tienda."
        ],
        "correcta": 2,
        "explicacion": "16GB le da mucha fluidez para tener varias apps abiertas a la vez."
      },
      {
        "pregunta": "¿Cuánto almacenamiento SSD trae este equipo?",
        "opciones": [
          "256 GB",
          "1 TB",
          "128 GB",
          "512 GB"
        ],
        "correcta": 3,
        "explicacion": "Trae 512 GB SSD: suficiente para guardar fotos, documentos, juegos o programas sin quedarse corto."
      }
    ],
    "duracionMin": 5,
    "dificultad": "intermedio",
    "imagen": "/products/vivobook-14-snapdragon-x1.svg"
  },
  {
    "slug": "vivobook-16-ryzenai5-16gb",
    "linea": "vivobook",
    "nombre": "ASUS Vivobook 16 (M1607KA)",
    "codigo": "M1607KA-MB341W",
    "tagline": "Pantalla grande de 16\" con procesador AMD de IA (Copilot+).",
    "intro": "Quien quiere pantalla grande, potencia AMD y las funciones nuevas de IA de Windows.",
    "ficha": [
      {
        "componente": "Sistema operativo",
        "dato": "Windows 11 Home"
      },
      {
        "componente": "Procesador",
        "dato": "AMD Ryzen AI 5 340"
      },
      {
        "componente": "Memoria RAM",
        "dato": "16 GB LPDDR5"
      },
      {
        "componente": "Gráficos",
        "dato": "AMD Radeon integrados"
      },
      {
        "componente": "IA / NPU",
        "dato": "NPU AMD XDNA 2, hasta 50 TOPS (Copilot+ PC)"
      },
      {
        "componente": "Pantalla",
        "dato": "16\" WUXGA (1920x1200) 16:10, 60 Hz, 300 nits, IPS (estimado, sin confirmar)"
      },
      {
        "componente": "Almacenamiento",
        "dato": "SSD 512 GB M.2 NVMe"
      },
      {
        "componente": "Batería",
        "dato": "Hasta 11 horas de uso típico (estimado, sin confirmar)"
      },
      {
        "componente": "Portabilidad",
        "dato": "Aprox. 1.9 kg, 2.1 cm de grosor (estimado, sin confirmar)"
      },
      {
        "componente": "Garantía",
        "dato": "2 años",
      }
    ],
    "procesador": {
      "marca": "AMD",
      "modelo": "Ryzen AI 5 340",
      "serie": "Ryzen AI 5 300",
      "nucleos": 6,
      "hilos": 12,
      "frecuenciaMax": "5.0 GHz",
      "npuTops": 50,
      "queSignifica": "Procesador AMD con NPU integrada (XDNA 2) que habilita funciones de IA de Windows (Copilot+).",
      "comoDecirlo": "Es un Copilot+ PC de AMD: potente para multitarea y con chip de IA que ayuda en videollamadas y fotos.",
      "paraQueAlcanza": [
        "Multitarea pesada",
        "Funciones de IA de Windows (Copilot+)",
        "Edición liviana de fotos y video"
      ]
    },
    "memoria": {
      "ram": "16 GB",
      "tipoRam": "LPDDR5",
      "almacenamiento": "512 GB SSD",
      "comoDecirlo": "16GB le da mucha fluidez para tener varias apps abiertas a la vez.",
      "caso": "soldada"
    },
    "pantallaDetalle": {
      "pulgadas": 16,
      "resolucion": "1920x1200 (WUXGA)",
      "tipo": "IPS",
      "hz": 60,
      "nits": 300,
      "comoDecirlo": "Pantalla grande de 16 pulgadas, cómoda para trabajar y ver contenido."
    },
    "clienteIdeal": "Quien quiere pantalla grande, potencia AMD y las funciones nuevas de IA de Windows.",
    "leAlcanzaPara": [
      "Multitarea pesada",
      "Funciones de IA de Windows (Copilot+)",
      "Edición liviana de fotos y video"
    ],
    "noEsPara": [
      "Juegos exigentes o de última generación",
      "Edición de video profesional en 4K",
      "Tareas que necesiten tarjeta de video dedicada"
    ],
    "ganchos": [
      {
        "cliente": "Quiere pantalla grande con IA integrada",
        "frase": "Pantalla grande de 16\" con procesador AMD de IA (Copilot+)."
      },
      {
        "cliente": "Hace multitarea pesada",
        "frase": "16GB de RAM para multitarea sin trabas."
      },
      {
        "cliente": "Quiere potencia y pantalla grande en casa",
        "frase": "Ideal para quien quiere potencia y pantalla grande en casa."
      }
    ],
    "objeciones": [
      {
        "dice": "¿Qué diferencia tiene con el Snapdragon?",
        "responde": "Ambos son Copilot+ PC; este corre Windows x86 nativo sin ninguna limitación de compatibilidad, además de tener pantalla más grande."
      },
      {
        "dice": "¿Es muy pesado?",
        "responde": "Pesa un poco más por la pantalla de 16\", pero se compensa con más pantalla y potencia."
      }
    ],
    "compararCon": {
      "abajo": {
        "id": "vivobook-14-snapdragon-x1-16gb",
        "diferencias": [
          "Pantalla más chica (14\")",
          "Bastante más batería por el chip ARM"
        ]
      },
      "arriba": {
        "id": "vivobook-16-i5-13420h-1tb",
        "diferencias": [
          "Pierde Copilot+ PC",
          "Gana potencia bruta (procesador serie H)",
          "1TB de almacenamiento"
        ]
      }
    },
    "quiz": [
      {
        "pregunta": "¿Qué hace especial a este Vivobook 16?",
        "opciones": [
          "Es un Copilot+ PC de AMD con pantalla grande de 16\"",
          "Es el único Vivobook con pantalla OLED",
          "No trae Windows instalado",
          "Es exclusivamente para gaming"
        ],
        "correcta": 0,
        "explicacion": "Combina un procesador AMD Copilot+ con una pantalla grande de 16 pulgadas."
      },
      {
        "pregunta": "¿Cuántos TOPS de IA tiene la NPU de este equipo?",
        "opciones": [
          "Hasta 50 TOPS",
          "Hasta 5 TOPS",
          "No tiene NPU",
          "Hasta 200 TOPS"
        ],
        "correcta": 0,
        "explicacion": "Su NPU AMD XDNA 2 llega hasta 50 TOPS, habilitando funciones Copilot+."
      },
      {
        "pregunta": "¿Qué diferencia tiene con el Vivobook 14 de Snapdragon?",
        "opciones": [
          "Ambos son Copilot+ PC; este corre Windows x86 nativo y tiene pantalla más grande",
          "Este no es un Copilot+ PC",
          "Este no trae NPU",
          "Son exactamente el mismo equipo"
        ],
        "correcta": 0,
        "explicacion": "Los dos son Copilot+ PC, pero el Vivobook 16 AMD corre Windows nativo sin limitaciones de compatibilidad y tiene pantalla de 16\"."
      },
      {
        "pregunta": "¿Es muy pesado este equipo?",
        "opciones": [
          "Pesa un poco más por la pantalla de 16\", pero se compensa con más pantalla y potencia",
          "Pesa menos de 1 kg",
          "Es el modelo más liviano del catálogo",
          "Pesa lo mismo que un celular"
        ],
        "correcta": 0,
        "explicacion": "Al tener pantalla de 16\", pesa un poco más que los modelos de 14\", pero gana en pantalla y potencia."
      },
      {
        "pregunta": "¿Cuánta RAM trae este Vivobook 16?",
        "opciones": [
          "16 GB",
          "8 GB",
          "4 GB",
          "64 GB"
        ],
        "correcta": 0,
        "explicacion": "Trae 16GB de RAM, suficiente para multitarea sin trabas."
      },
      {
        "pregunta": "El cliente pregunta si le puede subir la memoria RAM más adelante. ¿Qué le respondes?",
        "opciones": [
          "Sí, pero hay que cambiar el módulo que ya tiene por uno más grande, porque solo tiene una ranura.",
          "Sí, se le puede sumar un módulo adicional sin tocar el que ya tiene, porque le queda una ranura libre.",
          "Sí, pero solo se puede subir llevándolo a un centro de servicio autorizado, nunca en la tienda.",
          "No, la memoria viene soldada a la placa y no se puede ampliar en este equipo."
        ],
        "correcta": 3,
        "explicacion": "16GB le da mucha fluidez para tener varias apps abiertas a la vez."
      },
      {
        "pregunta": "¿Cuánto almacenamiento SSD trae este equipo?",
        "opciones": [
          "512 GB",
          "256 GB",
          "1 TB",
          "128 GB"
        ],
        "correcta": 0,
        "explicacion": "Trae 512 GB SSD: suficiente para guardar fotos, documentos, juegos o programas sin quedarse corto."
      }
    ],
    "duracionMin": 5,
    "dificultad": "avanzado",
    "imagen": "/products/vivobook-16-ryzenai5.svg"
  },
  {
    "slug": "vivobook-16-i5-13420h-1tb",
    "linea": "vivobook",
    "nombre": "ASUS Vivobook 16 (X1605VA)",
    "codigo": "X1605VA-MB341W",
    "tagline": "Pantalla grande de 16\" con un procesador de mayor potencia (serie H).",
    "intro": "Quien necesita más potencia real para trabajo o estudio exigente, en una pantalla grande.",
    "ficha": [
      {
        "componente": "Sistema operativo",
        "dato": "Windows 11 Home"
      },
      {
        "componente": "Procesador",
        "dato": "Intel Core i5-13420H"
      },
      {
        "componente": "Memoria RAM",
        "dato": "16 GB DDR4"
      },
      {
        "componente": "Gráficos",
        "dato": "Intel UHD integrados"
      },
      {
        "componente": "IA / NPU",
        "dato": "Sin NPU dedicada; no es Copilot+ PC"
      },
      {
        "componente": "Pantalla",
        "dato": "16\" WUXGA (1920x1200) 16:10, 60 Hz, 300 nits, IPS (estimado, sin confirmar)"
      },
      {
        "componente": "Almacenamiento",
        "dato": "SSD 1 TB M.2 NVMe"
      },
      {
        "componente": "Batería",
        "dato": "Hasta 8 horas de uso típico (estimado, sin confirmar)"
      },
      {
        "componente": "Portabilidad",
        "dato": "Aprox. 2 kg, 2.2 cm de grosor (estimado, sin confirmar)"
      },
      {
        "componente": "Garantía",
        "dato": "2 años",
      }
    ],
    "procesador": {
      "marca": "Intel",
      "modelo": "Core i5-13420H",
      "serie": "Intel Core i5 (13th Gen H)",
      "nucleos": 8,
      "hilos": 12,
      "frecuenciaMax": "4.6 GHz",
      "npuTops": null,
      "queSignifica": "Procesador de la serie H, con más núcleos y mayor consumo, pensado para tareas más demandantes.",
      "comoDecirlo": "Tiene más músculo que los procesadores livianos: ideal para multitarea pesada y programas más exigentes.",
      "paraQueAlcanza": [
        "Multitarea pesada",
        "Edición liviana de fotos y video",
        "Hojas de cálculo grandes"
      ]
    },
    "memoria": {
      "ram": "16 GB",
      "tipoRam": "DDR4",
      "almacenamiento": "1 TB SSD",
      "comoDecirlo": "16GB y 1TB: multitarea fluida y espacio de sobra para guardar todo.",
      "caso": "se-suma"
    },
    "pantallaDetalle": {
      "pulgadas": 16,
      "resolucion": "1920x1200 (WUXGA)",
      "tipo": "IPS",
      "hz": 60,
      "nits": 300,
      "comoDecirlo": "Pantalla grande de 16 pulgadas, cómoda para trabajar."
    },
    "clienteIdeal": "Quien necesita más potencia real para trabajo o estudio exigente, en una pantalla grande.",
    "leAlcanzaPara": [
      "Multitarea pesada",
      "Edición liviana de fotos y video",
      "Hojas de cálculo grandes"
    ],
    "noEsPara": [
      "Juegos exigentes o de última generación",
      "Edición de video profesional en 4K",
      "Tareas que necesiten tarjeta de video dedicada"
    ],
    "ganchos": [
      {
        "cliente": "Quiere pantalla grande y más potencia",
        "frase": "Pantalla grande de 16\" con un procesador de mayor potencia (serie H)."
      },
      {
        "cliente": "Necesita espacio y RAM para multitarea",
        "frase": "1TB de espacio y 16GB de RAM: multitarea sin trabas."
      },
      {
        "cliente": "Exige rendimiento sin pasar a un gamer",
        "frase": "Para el cliente que exige más rendimiento sin pasarse a un gamer."
      }
    ],
    "objeciones": [
      {
        "dice": "¿Es un equipo gamer?",
        "responde": "No, es un Vivobook de alto rendimiento para trabajo y estudio exigente; si busca jugar, te muestro la línea gaming o ROG."
      },
      {
        "dice": "¿Por qué pesa más que los otros Vivobook?",
        "responde": "Por la pantalla de 16\" y el procesador más potente; a cambio rinde más en tareas pesadas."
      }
    ],
    "compararCon": {
      "abajo": {
        "id": "vivobook-16-ryzenai5-16gb",
        "diferencias": [
          "Pierde la pantalla más brillante y Copilot+",
          "Gana potencia y 1TB"
        ]
      },
      "arriba": {
        "id": "vivobook-s14-snapdragon-x1-oled",
        "diferencias": [
          "Cambia a diseño premium con pantalla OLED",
          "Mucha más batería",
          "Pierde almacenamiento (512GB) y potencia bruta"
        ]
      }
    },
    "quiz": [
      {
        "pregunta": "¿Es este Vivobook 16 un equipo gamer?",
        "opciones": [
          "No, es un Vivobook de alto rendimiento para trabajo y estudio exigente",
          "Sí, es un equipo gamer con tarjeta de video dedicada",
          "Sí, viene con la línea ROG",
          "No, es el modelo más básico del catálogo"
        ],
        "correcta": 0,
        "explicacion": "Este Vivobook está pensado para trabajo y estudio exigente, no para gaming; para jugar se recomienda la línea gaming o ROG."
      },
      {
        "pregunta": "¿Qué tipo de procesador trae?",
        "opciones": [
          "Intel Core i5-13420H, de la serie H de mayor potencia",
          "Intel Core i3 de nivel inicial",
          "Un procesador ARM Snapdragon",
          "AMD Ryzen 3"
        ],
        "correcta": 0,
        "explicacion": "La serie H de Intel tiene más núcleos y potencia que las series U, pensada para tareas más demandantes."
      },
      {
        "pregunta": "¿Por qué pesa un poco más que otros Vivobook?",
        "opciones": [
          "Por la pantalla de 16\" y el procesador más potente",
          "Porque tiene una batería más grande que todos los demás",
          "Porque trae dos discos duros",
          "Porque incluye un cargador adicional"
        ],
        "correcta": 0,
        "explicacion": "La combinación de pantalla grande y procesador de la serie H añade algo de peso, a cambio de más rendimiento."
      },
      {
        "pregunta": "¿Cuánto almacenamiento y RAM trae?",
        "opciones": [
          "16 GB de RAM y 1 TB de SSD",
          "8 GB de RAM y 256 GB de SSD",
          "4 GB de RAM y 512 GB de SSD",
          "32 GB de RAM y 4 TB de SSD"
        ],
        "correcta": 0,
        "explicacion": "Trae 16GB de RAM y 1TB de SSD: multitarea fluida y espacio de sobra."
      },
      {
        "pregunta": "¿Para qué cliente es ideal este Vivobook 16?",
        "opciones": [
          "Quien necesita más potencia real para trabajo o estudio exigente",
          "Un cliente que solo navega en internet ocasionalmente",
          "Un cliente que busca el equipo más económico posible",
          "Un cliente que solo usa el equipo para videollamadas"
        ],
        "correcta": 0,
        "explicacion": "Es para clientes que necesitan más potencia de la que ofrecen los Vivobook de procesadores U."
      },
      {
        "pregunta": "El cliente pregunta si le puede subir la memoria RAM más adelante. ¿Qué le respondes?",
        "opciones": [
          "Sí, se le puede sumar un módulo adicional sin tocar el que ya tiene, porque le queda una ranura libre.",
          "No, la memoria viene soldada a la placa y no se puede ampliar en este equipo.",
          "Sí, pero hay que cambiar el módulo que ya tiene por uno más grande, porque solo tiene una ranura.",
          "Sí, pero solo se puede subir llevándolo a un centro de servicio autorizado, nunca en la tienda."
        ],
        "correcta": 0,
        "explicacion": "16GB y 1TB: multitarea fluida y espacio de sobra para guardar todo."
      },
      {
        "pregunta": "¿Cuánto almacenamiento SSD trae este equipo?",
        "opciones": [
          "512 GB",
          "1 TB",
          "2 TB",
          "256 GB"
        ],
        "correcta": 1,
        "explicacion": "Trae 1 TB SSD: suficiente para guardar fotos, documentos, juegos o programas sin quedarse corto."
      }
    ],
    "duracionMin": 5,
    "dificultad": "avanzado",
    "imagen": "/products/vivobook-16-i5-13420h.svg"
  },
  {
    "slug": "vivobook-s14-snapdragon-x1-oled",
    "linea": "vivobook",
    "nombre": "ASUS Vivobook S14 OLED (S3407QA)",
    "codigo": "S3407QA-LC323W",
    "tagline": "La línea S de Vivobook: diseño más cuidado y pantalla OLED.",
    "intro": "Quien busca un equipo más cuidado en diseño, liviano, con pantalla OLED y batería larga.",
    "ficha": [
      {
        "componente": "Sistema operativo",
        "dato": "Windows 11 Home"
      },
      {
        "componente": "Procesador",
        "dato": "Snapdragon X X1-26-100"
      },
      {
        "componente": "Memoria RAM",
        "dato": "16 GB LPDDR5"
      },
      {
        "componente": "Gráficos",
        "dato": "Qualcomm Adreno"
      },
      {
        "componente": "IA / NPU",
        "dato": "NPU Qualcomm Hexagon, hasta 45 TOPS (Copilot+ PC)"
      },
      {
        "componente": "Pantalla",
        "dato": "14\" 2.8K (2880x1800) 16:10, 120 Hz, 400 nits, OLED (estimado, sin confirmar)"
      },
      {
        "componente": "Almacenamiento",
        "dato": "SSD 512 GB M.2 NVMe"
      },
      {
        "componente": "Batería",
        "dato": "Hasta 13 horas de uso típico (estimado, sin confirmar)"
      },
      {
        "componente": "Portabilidad",
        "dato": "Aprox. 1.4 kg, 1.5 cm de grosor (estimado, sin confirmar)"
      },
      {
        "componente": "Garantía",
        "dato": "2 años",
      }
    ],
    "procesador": {
      "marca": "Qualcomm",
      "modelo": "Snapdragon X X1-26-100",
      "serie": "Snapdragon X",
      "nucleos": 8,
      "hilos": 8,
      "frecuenciaMax": "3.4 GHz (hasta 4.0 GHz boost)",
      "npuTops": 45,
      "queSignifica": "Chip ARM con NPU dedicada que habilita funciones de Copilot+ con muy bajo consumo.",
      "comoDecirlo": "Es un Copilot+ PC: tiene un chip especial de IA que mejora videollamadas, fotos y tareas de Windows, y la batería dura muchísimo.",
      "paraQueAlcanza": [
        "Multitarea liviana con mucha batería",
        "Funciones de IA de Windows (Copilot+)",
        "Ver contenido en pantalla OLED"
      ]
    },
    "memoria": {
      "ram": "16 GB",
      "tipoRam": "LPDDR5",
      "almacenamiento": "512 GB SSD",
      "comoDecirlo": "16GB le da mucha fluidez para tener varias apps abiertas a la vez.",
      "caso": "soldada"
    },
    "pantallaDetalle": {
      "pulgadas": 14,
      "resolucion": "2880x1800 (2.8K)",
      "tipo": "OLED",
      "hz": 120,
      "nits": 400,
      "comoDecirlo": "Pantalla OLED con colores muy vivos y negros profundos, ideal para ver series y trabajar con detalle."
    },
    "clienteIdeal": "Quien busca un equipo más cuidado en diseño, liviano, con pantalla OLED y batería larga.",
    "leAlcanzaPara": [
      "Multitarea liviana con mucha batería",
      "Funciones de IA de Windows (Copilot+)",
      "Ver contenido en pantalla OLED"
    ],
    "noEsPara": [
      "Juegos exigentes o de última generación",
      "Edición de video profesional en 4K",
      "Tareas que necesiten tarjeta de video dedicada"
    ],
    "ganchos": [
      {
        "cliente": "Quiere diseño cuidado y pantalla OLED",
        "frase": "La línea S de Vivobook: diseño más cuidado y pantalla OLED."
      },
      {
        "cliente": "Necesita Copilot+ con batería larga",
        "frase": "Es un Copilot+ PC con batería que le rinde todo el día."
      },
      {
        "cliente": "Quiere algo bonito y con tecnología de punta",
        "frase": "Ideal para quien quiere algo bonito, liviano y con tecnología de punta."
      }
    ],
    "objeciones": [
      {
        "dice": "¿Vale la pena pagar más por el OLED?",
        "responde": "Sí, si al cliente le importa mucho la imagen: colores más vivos y negros más profundos que una pantalla IPS normal."
      },
      {
        "dice": "¿Corre todos mis programas?",
        "responde": "La mayoría de apps de uso diario sí; para programas muy específicos de Windows antiguo, te muestro un Vivobook Intel o AMD."
      }
    ],
    "compararCon": {
      "abajo": {
        "id": "vivobook-16-i5-13420h-1tb",
        "diferencias": [
          "Pierde potencia bruta y almacenamiento",
          "Gana diseño premium, pantalla OLED y más batería"
        ]
      },
      "arriba": {
        "id": "vivobook-s14-coreultra5-oled",
        "diferencias": [
          "Mismo diseño y pantalla OLED",
          "Corre Windows x86 nativo sin limitaciones de compatibilidad"
        ]
      }
    },
    "quiz": [
      {
        "pregunta": "¿Qué distingue a la línea S de Vivobook?",
        "opciones": [
          "Un diseño más cuidado, con pantalla OLED",
          "Es la única línea con teclado mecánico",
          "Es exclusiva para gaming",
          "No trae Windows preinstalado"
        ],
        "correcta": 0,
        "explicacion": "La línea S es un escalón más premium dentro de Vivobook, con pantalla OLED."
      },
      {
        "pregunta": "¿Es este equipo un Copilot+ PC?",
        "opciones": [
          "Sí, trae NPU Qualcomm Hexagon de hasta 45 TOPS",
          "No, no tiene NPU",
          "Solo si se compra con una tarjeta gráfica aparte",
          "No, esa función es solo para computadores de escritorio"
        ],
        "correcta": 0,
        "explicacion": "Al traer el Snapdragon X X1, es un Copilot+ PC con NPU integrada."
      },
      {
        "pregunta": "¿Qué ventaja tiene la pantalla OLED frente a una IPS normal?",
        "opciones": [
          "Colores más vivos y negros más profundos",
          "Es más barata de producir",
          "Dura menos tiempo encendida",
          "No se puede usar al aire libre"
        ],
        "correcta": 0,
        "explicacion": "El panel OLED mejora el color y el contraste frente a una pantalla IPS normal."
      },
      {
        "pregunta": "¿Vale la pena pagar más por el panel OLED?",
        "opciones": [
          "Sí, si al cliente le importa mucho la imagen: colores más vivos y negros más profundos",
          "Nunca vale la pena pagar más por eso",
          "Solo si el cliente va a jugar videojuegos todo el día",
          "No hay diferencia real con una pantalla IPS"
        ],
        "correcta": 0,
        "explicacion": "Para clientes que valoran mucho la imagen (fotos, series, diseño), el OLED sí justifica el costo extra."
      },
      {
        "pregunta": "¿Corre este equipo todos los programas de Windows?",
        "opciones": [
          "La mayoría de apps de uso diario sí; para programas muy específicos de Windows antiguo, conviene revisar",
          "No corre ningún programa de Windows",
          "Solo corre aplicaciones de Qualcomm",
          "Necesita instalar Windows aparte"
        ],
        "correcta": 0,
        "explicacion": "Por ser un chip ARM, la mayoría de apps corren bien; para programas muy específicos conviene revisar antes."
      },
      {
        "pregunta": "El cliente pregunta si le puede subir la memoria RAM más adelante. ¿Qué le respondes?",
        "opciones": [
          "Sí, pero hay que cambiar el módulo que ya tiene por uno más grande, porque solo tiene una ranura.",
          "No, la memoria viene soldada a la placa y no se puede ampliar en este equipo.",
          "Sí, se le puede sumar un módulo adicional sin tocar el que ya tiene, porque le queda una ranura libre.",
          "Sí, pero solo se puede subir llevándolo a un centro de servicio autorizado, nunca en la tienda."
        ],
        "correcta": 1,
        "explicacion": "16GB le da mucha fluidez para tener varias apps abiertas a la vez."
      },
      {
        "pregunta": "¿Cuánto almacenamiento SSD trae este equipo?",
        "opciones": [
          "256 GB",
          "1 TB",
          "512 GB",
          "128 GB"
        ],
        "correcta": 2,
        "explicacion": "Trae 512 GB SSD: suficiente para guardar fotos, documentos, juegos o programas sin quedarse corto."
      }
    ],
    "duracionMin": 5,
    "dificultad": "avanzado",
    "imagen": "/products/vivobook-s14-snapdragon-oled.svg"
  },
  {
    "slug": "vivobook-s14-coreultra5-oled",
    "linea": "vivobook",
    "nombre": "ASUS Vivobook S14 OLED (S5406A)",
    "codigo": "S5406A-MB341W",
    "tagline": "Lo último de Intel con IA integrada, en un equipo premium.",
    "intro": "Quien quiere lo último de Intel con IA integrada, en un equipo premium con pantalla OLED.",
    "ficha": [
      {
        "componente": "Sistema operativo",
        "dato": "Windows 11 Home"
      },
      {
        "componente": "Procesador",
        "dato": "Intel Core Ultra 5"
      },
      {
        "componente": "Memoria RAM",
        "dato": "16 GB LPDDR5"
      },
      {
        "componente": "Gráficos",
        "dato": "Intel Arc integrados"
      },
      {
        "componente": "IA / NPU",
        "dato": "NPU Intel AI Boost, hasta 11 TOPS (Copilot+ PC)"
      },
      {
        "componente": "Pantalla",
        "dato": "14\" 2.8K (2880x1800) 16:10, 120 Hz, 400 nits, OLED (estimado, sin confirmar)"
      },
      {
        "componente": "Almacenamiento",
        "dato": "SSD 512 GB M.2 NVMe"
      },
      {
        "componente": "Batería",
        "dato": "Hasta 11 horas de uso típico (estimado, sin confirmar)"
      },
      {
        "componente": "Portabilidad",
        "dato": "Aprox. 1.4 kg, 1.5 cm de grosor (estimado, sin confirmar)"
      },
      {
        "componente": "Garantía",
        "dato": "2 años",
      }
    ],
    "procesador": {
      "marca": "Intel",
      "modelo": "Core Ultra 5 226V",
      "serie": "Intel Core Ultra 5 (Series 2)",
      "nucleos": 8,
      "hilos": 8,
      "frecuenciaMax": "4.5 GHz",
      "npuTops": 11,
      "queSignifica": "Procesador Intel con NPU integrada (Copilot+ PC) y buen desempeño gráfico integrado.",
      "comoDecirlo": "Es un Copilot+ PC de Intel: trae el chip de IA, buen rendimiento gráfico integrado y pantalla OLED.",
      "paraQueAlcanza": [
        "Multitarea con IA integrada",
        "Edición liviana de fotos y video",
        "Ver contenido en pantalla OLED"
      ]
    },
    "memoria": {
      "ram": "16 GB",
      "tipoRam": "LPDDR5",
      "almacenamiento": "512 GB SSD",
      "comoDecirlo": "16GB le da mucha fluidez para tener varias apps abiertas a la vez.",
      "caso": "soldada"
    },
    "pantallaDetalle": {
      "pulgadas": 14,
      "resolucion": "2880x1800 (2.8K)",
      "tipo": "OLED",
      "hz": 120,
      "nits": 400,
      "comoDecirlo": "Pantalla OLED con colores muy vivos y negros profundos, ideal para ver series y trabajar con detalle."
    },
    "clienteIdeal": "Quien quiere lo último de Intel con IA integrada, en un equipo premium con pantalla OLED.",
    "leAlcanzaPara": [
      "Multitarea con IA integrada",
      "Edición liviana de fotos y video",
      "Ver contenido en pantalla OLED"
    ],
    "noEsPara": [
      "Juegos exigentes o de última generación",
      "Edición de video profesional en 4K",
      "Tareas que necesiten tarjeta de video dedicada"
    ],
    "ganchos": [
      {
        "cliente": "Quiere lo último de Intel con IA",
        "frase": "Lo último de Intel con IA integrada, en un equipo premium."
      },
      {
        "cliente": "Crea o ve contenido en pantalla OLED",
        "frase": "Pantalla OLED con colores de cine, ideal para crear y ver contenido."
      },
      {
        "cliente": "Quiere algo bonito y premium",
        "frase": "Ideal para quien quiere algo bonito, liviano y con tecnología de punta."
      }
    ],
    "objeciones": [
      {
        "dice": "¿Vale la pena pagar más por el OLED?",
        "responde": "Sí, si al cliente le importa mucho la imagen: colores más vivos y negros más profundos que una pantalla IPS normal."
      },
      {
        "dice": "¿Qué diferencia tiene con el de Snapdragon?",
        "responde": "Este corre Windows x86 nativo sin ninguna limitación de compatibilidad; el Snapdragon tiene más batería."
      }
    ],
    "compararCon": {
      "abajo": {
        "id": "vivobook-s14-snapdragon-x1-oled",
        "diferencias": [
          "Más batería por el chip ARM",
          "El Snapdragon tiene alguna limitación de compatibilidad"
        ]
      },
      "arriba": null
    },
    "quiz": [
      {
        "pregunta": "¿Qué distingue a la línea S de Vivobook?",
        "opciones": [
          "Un diseño más cuidado, con pantalla OLED",
          "Es la única línea con teclado mecánico",
          "Es exclusiva para gaming",
          "No trae Windows preinstalado"
        ],
        "correcta": 0,
        "explicacion": "La línea S es un escalón más premium dentro de Vivobook, con pantalla OLED."
      },
      {
        "pregunta": "¿Qué trae este equipo que lo hace un Copilot+ PC?",
        "opciones": [
          "NPU Intel AI Boost integrada",
          "Una tarjeta de video dedicada",
          "Una segunda pantalla",
          "Un disco duro mecánico"
        ],
        "correcta": 0,
        "explicacion": "El Intel Core Ultra 5 trae una NPU integrada (Intel AI Boost) que lo hace un Copilot+ PC."
      },
      {
        "pregunta": "¿Qué ventaja tiene la pantalla OLED frente a una IPS normal?",
        "opciones": [
          "Colores más vivos y negros más profundos",
          "Es más barata de producir",
          "Dura menos tiempo encendida",
          "No se puede usar al aire libre"
        ],
        "correcta": 0,
        "explicacion": "El panel OLED mejora el color y el contraste frente a una pantalla IPS normal."
      },
      {
        "pregunta": "¿Vale la pena pagar más por el panel OLED?",
        "opciones": [
          "Sí, si al cliente le importa mucho la imagen: colores más vivos y negros más profundos",
          "Nunca vale la pena pagar más por eso",
          "Solo si el cliente va a jugar videojuegos todo el día",
          "No hay diferencia real con una pantalla IPS"
        ],
        "correcta": 0,
        "explicacion": "Para clientes que valoran mucho la imagen (fotos, series, diseño), el OLED sí justifica el costo extra."
      },
      {
        "pregunta": "¿Qué diferencia tiene con la versión Snapdragon del Vivobook S14?",
        "opciones": [
          "Este corre Windows x86 nativo sin limitaciones de compatibilidad; el Snapdragon tiene más batería",
          "Este no trae pantalla OLED",
          "Este no es un Copilot+ PC",
          "Son exactamente el mismo equipo"
        ],
        "correcta": 0,
        "explicacion": "Ambos son Copilot+ PC con OLED; la diferencia está en el tipo de chip: x86 nativo (Intel) vs. ARM con más batería (Snapdragon)."
      },
      {
        "pregunta": "El cliente pregunta si le puede subir la memoria RAM más adelante. ¿Qué le respondes?",
        "opciones": [
          "Sí, pero hay que cambiar el módulo que ya tiene por uno más grande, porque solo tiene una ranura.",
          "Sí, se le puede sumar un módulo adicional sin tocar el que ya tiene, porque le queda una ranura libre.",
          "No, la memoria viene soldada a la placa y no se puede ampliar en este equipo.",
          "Sí, pero solo se puede subir llevándolo a un centro de servicio autorizado, nunca en la tienda."
        ],
        "correcta": 2,
        "explicacion": "16GB le da mucha fluidez para tener varias apps abiertas a la vez."
      },
      {
        "pregunta": "¿Cuánto almacenamiento SSD trae este equipo?",
        "opciones": [
          "256 GB",
          "1 TB",
          "128 GB",
          "512 GB"
        ],
        "correcta": 3,
        "explicacion": "Trae 512 GB SSD: suficiente para guardar fotos, documentos, juegos o programas sin quedarse corto."
      }
    ],
    "duracionMin": 5,
    "dificultad": "avanzado",
    "imagen": "/products/vivobook-s14-coreultra5-oled.svg"
  },
  {
    "slug": "zenbook-a14",
    "linea": "zenbook",
    "nombre": "ASUS Zenbook A14 (UX3407)",
    "codigo": "UX3407QA-QD232W",
    "tagline": "Dura todo el día de trabajo sin que tengas que cargarlo a cada rato.",
    "intro": "Quien necesita batería que dure todo el día y algo liviano para trabajar en movimiento.",
    "ficha": [
      {
        "componente": "Sistema operativo",
        "dato": "Windows 11 Home"
      },
      {
        "componente": "Procesador",
        "dato": "Snapdragon X X1-26-100"
      },
      {
        "componente": "Memoria RAM",
        "dato": "16 GB LPDDR5"
      },
      {
        "componente": "Gráficos",
        "dato": "Qualcomm Adreno"
      },
      {
        "componente": "IA / NPU",
        "dato": "NPU Qualcomm Hexagon, hasta 45 TOPS"
      },
      {
        "componente": "Pantalla",
        "dato": "14\" WUXGA (1920x1200) 16:10, 60 Hz, 400 nits, OLED"
      },
      {
        "componente": "Almacenamiento",
        "dato": "SSD 1 TB M.2 NVMe PCIe 4.0"
      },
      {
        "componente": "Batería",
        "dato": "Hasta 32 horas de reproducción de video"
      },
      {
        "componente": "Portabilidad",
        "dato": "Aprox. 0.978 kg, 1.5 cm de grosor"
      },
      {
        "componente": "Garantía",
        "dato": "1 año",
        "verificar": true
      }
    ],
    "procesador": {
      "marca": "Qualcomm",
      "modelo": "Snapdragon X X1-26-100",
      "serie": "Snapdragon X",
      "nucleos": 8,
      "hilos": 8,
      "frecuenciaMax": "3.4 GHz (hasta 4.0 GHz boost)",
      "npuTops": 45,
      "queSignifica": "Chip ARM con NPU dedicada que habilita Copilot+ PC con muy bajo consumo.",
      "comoDecirlo": "Es rápido para el día a día y gasta muy poca batería; trae el chip de IA que mejora videollamadas y tareas de Windows.",
      "paraQueAlcanza": [
        "Trabajo de oficina con batería larga",
        "Videollamadas con mejoras de IA",
        "Multitarea liviana"
      ]
    },
    "memoria": {
      "ram": "16 GB",
      "tipoRam": "LPDDR5",
      "almacenamiento": "1 TB SSD",
      "caso": "soldada",
      "comoDecirlo": "16GB le da mucha fluidez para tener varias apps abiertas a la vez; la memoria viene soldada, sin ranura para subirla."
    },
    "pantallaDetalle": {
      "pulgadas": 14,
      "resolucion": "1920x1200 (WUXGA)",
      "tipo": "OLED",
      "hz": 60,
      "nits": 400,
      "comoDecirlo": "Pantalla OLED de 14 pulgadas con colores muy vivos, ideal para ver series, fotos y trabajar cómodo."
    },
    "clienteIdeal": "Quien necesita batería que dure todo el día y algo liviano para trabajar en movimiento.",
    "leAlcanzaPara": [
      "Trabajo de oficina con batería larga",
      "Videollamadas con mejoras de IA",
      "Multitarea liviana"
    ],
    "noEsPara": [
      "Juegos exigentes o de última generación",
      "Edición de video pesada en 4K con GPU dedicada",
      "Quien busca el precio más bajo del catálogo"
    ],
    "ganchos": [
      {
        "cliente": "Necesita batería que dure toda la jornada",
        "frase": "Dura todo el día de trabajo sin que tengas que cargarlo a cada rato."
      },
      {
        "cliente": "Pregunta por IA integrada",
        "frase": "Tiene un chip de IA que mejora tus videollamadas y hace tu equipo más inteligente, sin gastar batería."
      },
      {
        "cliente": "Quiere algo liviano para cargar todos los días",
        "frase": "Es liviano y delgado: perfecto para llevarlo a todas partes."
      }
    ],
    "objeciones": [
      {
        "dice": "¿Corre todos mis programas?",
        "responde": "La mayoría de apps de uso diario sí; para programas muy específicos de Windows antiguo, se revisa antes."
      },
      {
        "dice": "¿Por qué es tan liviano, no se sentirá frágil?",
        "responde": "El chasis está pensado para ser liviano sin sacrificar resistencia; aun así se recomienda cargarlo en una funda."
      }
    ],
    "compararCon": {
      "abajo": null,
      "arriba": {
        "id": "zenbook-a16",
        "diferencias": [
          "Más potencia y pantalla más grande (16\" vs. 14\")",
          "Un poco menos de batería"
        ]
      }
    },
    "quiz": [
      {
        "pregunta": "¿Qué hace especial a un Copilot+ PC como el Zenbook A14?",
        "opciones": [
          "Trae un chip de IA (NPU) integrado",
          "Es más barato que los demás portátiles",
          "No necesita cargador",
          "Viene sin Windows instalado"
        ],
        "correcta": 0,
        "explicacion": "Los Copilot+ PC tienen un NPU dedicado para tareas de inteligencia artificial."
      },
      {
        "pregunta": "¿Para qué le sirve al cliente el NPU de hasta 45 TOPS?",
        "opciones": [
          "Para jugar videojuegos en 4K",
          "Para mejorar videollamadas y tareas de Windows sin gastar batería extra",
          "Para cargar el equipo más rápido",
          "Para aumentar el almacenamiento"
        ],
        "correcta": 1,
        "explicacion": "El NPU acelera tareas de IA como las videollamadas, sin consumir batería de más."
      },
      {
        "pregunta": "Un cliente universitario quiere algo liviano que le dure toda la jornada sin cargador. ¿Qué le destacas del Zenbook A14?",
        "opciones": [
          "Su batería de larga duración y que es muy liviano y delgado",
          "Que tiene tarjeta de video dedicada para videojuegos",
          "Que pesa más de 2 kg pero rinde mucho",
          "Que no trae SSD, solo disco duro"
        ],
        "correcta": 0,
        "explicacion": "El procesador Snapdragon X cuida mucho la batería, y el diseño del A14 es liviano y delgado: justo lo que necesita alguien que lo carga todo el día."
      },
      {
        "pregunta": "¿Qué le dices al cliente sobre la pantalla OLED de 400 nits?",
        "opciones": [
          "Que es una pantalla táctil",
          "Que los colores se ven más vivos y con mejor contraste",
          "Que es una pantalla 4K",
          "Que no se puede ver bien al sol"
        ],
        "correcta": 1,
        "explicacion": "El panel OLED mejora el color y el contraste frente a una pantalla LCD normal."
      },
      {
        "pregunta": "Un cliente trabaja con muchos archivos y programas, y le preocupa que el equipo se ponga lento. ¿Qué le dices?",
        "opciones": [
          "Que trae un SSD de 1 TB, con espacio de sobra y mucha velocidad",
          "Que debe borrar archivos cada semana para que no se ponga lento",
          "Que el equipo no tiene almacenamiento interno",
          "Que necesita comprar un disco duro aparte"
        ],
        "correcta": 0,
        "explicacion": "El SSD de 1 TB da espacio de sobra y velocidades de carga mucho más altas que un disco duro tradicional, así que el equipo se mantiene rápido."
      },
      {
        "pregunta": "El cliente pregunta si le puede subir la memoria RAM más adelante. ¿Qué le respondes?",
        "opciones": [
          "No, la memoria viene soldada a la placa y no se puede ampliar en este equipo.",
          "Sí, pero hay que cambiar el módulo que ya tiene por uno más grande, porque solo tiene una ranura.",
          "Sí, se le puede sumar un módulo adicional sin tocar el que ya tiene, porque le queda una ranura libre.",
          "Sí, pero solo se puede subir llevándolo a un centro de servicio autorizado, nunca en la tienda."
        ],
        "correcta": 0,
        "explicacion": "16GB le da mucha fluidez para tener varias apps abiertas a la vez; la memoria viene soldada, sin ranura para subirla."
      },
      {
        "pregunta": "¿Cuánto almacenamiento SSD trae este equipo?",
        "opciones": [
          "512 GB",
          "1 TB",
          "2 TB",
          "256 GB"
        ],
        "correcta": 1,
        "explicacion": "Trae 1 TB SSD: suficiente para guardar fotos, documentos, juegos o programas sin quedarse corto."
      }
    ],
    "duracionMin": 5,
    "dificultad": "básico",
    "imagen": "/products/zenbook-a14.svg"
  },
  {
    "slug": "zenbook-a16",
    "linea": "zenbook",
    "nombre": "ASUS Zenbook A16 (UX3607)",
    "codigo": "UX3607OA-SQ013W",
    "tagline": "Más potencia que el A14, pero con batería que dura todo el día.",
    "intro": "Quien necesita más potencia que el A14 y pantalla grande para crear contenido, sin perder batería.",
    "ficha": [
      {
        "componente": "Sistema operativo",
        "dato": "Windows 11 Home"
      },
      {
        "componente": "Procesador",
        "dato": "Snapdragon X2 Elite Extreme X2E94100"
      },
      {
        "componente": "Memoria RAM",
        "dato": "32 GB LPDDR5"
      },
      {
        "componente": "Gráficos",
        "dato": "Qualcomm Adreno"
      },
      {
        "componente": "Pantalla",
        "dato": "16\" 3K (2880x1800) 16:10, 120 Hz, 500 nits, OLED"
      },
      {
        "componente": "Almacenamiento",
        "dato": "SSD 1 TB M.2 NVMe PCIe 4.0"
      },
      {
        "componente": "IA / NPU",
        "dato": "NPU Qualcomm Hexagon integrada (Copilot+ PC)"
      },
      {
        "componente": "Batería",
        "dato": "Hasta 12 horas de uso típico (estimado, sin confirmar)"
      },
      {
        "componente": "Portabilidad",
        "dato": "Aprox. 1.5 kg, 1.7 cm de grosor (estimado, sin confirmar)"
      },
      {
        "componente": "Garantía",
        "dato": "1 año",
        "verificar": true
      }
    ],
    "procesador": {
      "marca": "Qualcomm",
      "modelo": "Snapdragon X2 Elite Extreme X2E94100",
      "serie": "Snapdragon X2 Elite",
      "nucleos": 18,
      "hilos": 18,
      "frecuenciaMax": "5.0 GHz",
      "npuTops": 80,
      "queSignifica": "Chip ARM de gama alta con NPU muy por encima del mínimo de Copilot+ PC .",
      "comoDecirlo": "Mucha más potencia que el modelo A14, pero sigue cuidando la batería; también es Copilot+ PC.",
      "paraQueAlcanza": [
        "Multitarea pesada con batería larga",
        "Edición liviana de fotos y video",
        "Funciones de IA de Windows (Copilot+)"
      ]
    },
    "memoria": {
      "ram": "32 GB",
      "tipoRam": "LPDDR5",
      "almacenamiento": "1 TB SSD",
      "caso": "soldada",
      "comoDecirlo": "32GB le da mucha fluidez incluso con programas pesados abiertos a la vez; la memoria viene soldada, sin ranura para subirla."
    },
    "pantallaDetalle": {
      "pulgadas": 16,
      "resolucion": "2880x1800 (3K)",
      "tipo": "OLED",
      "hz": 120,
      "nits": 500,
      "comoDecirlo": "Pantalla grande en alta definición, con colores de cine y movimiento muy fluido."
    },
    "clienteIdeal": "Quien necesita más potencia que el A14 y pantalla grande para crear contenido, sin perder batería.",
    "leAlcanzaPara": [
      "Multitarea pesada con batería larga",
      "Edición liviana de fotos y video",
      "Funciones de IA de Windows (Copilot+)"
    ],
    "noEsPara": [
      "Juegos exigentes o de última generación",
      "Edición de video pesada en 4K con GPU dedicada",
      "Quien busca el precio más bajo del catálogo"
    ],
    "ganchos": [
      {
        "cliente": "Necesita más potencia que el A14",
        "frase": "Más potencia que el A14, pero con batería que dura todo el día."
      },
      {
        "cliente": "Busca pantalla grande para crear contenido",
        "frase": "Pantalla grande en 3K con colores de cine, ideal para ver y crear contenido."
      },
      {
        "cliente": "Pregunta por lo último en IA de Windows",
        "frase": "Es un Copilot+ PC: trae IA integrada para que tu cliente trabaje más rápido."
      }
    ],
    "objeciones": [
      {
        "dice": "¿Por qué pesa un poco más que el A14?",
        "responde": "Por la pantalla más grande, de 16\" en 3K; a cambio rinde más y se ve mejor."
      },
      {
        "dice": "¿Vale la pena el salto de precio frente al A14?",
        "responde": "Si el cliente necesita más potencia y pantalla más grande para crear contenido, sí vale la pena."
      }
    ],
    "compararCon": {
      "abajo": {
        "id": "zenbook-a14",
        "diferencias": [
          "Pantalla más chica (14\")",
          "Un poco más de batería"
        ]
      },
      "arriba": {
        "id": "zenbook-duo",
        "diferencias": [
          "Cambia a doble pantalla OLED táctil y procesador Intel",
          "Menos batería por tener dos pantallas activas"
        ]
      }
    },
    "quiz": [
      {
        "pregunta": "¿Qué procesador trae el Zenbook A16?",
        "opciones": [
          "Snapdragon X2 Elite Extreme X2E94100",
          "Snapdragon X X1-26-100",
          "Intel Core Ultra X7 358H",
          "AMD Ryzen 9"
        ],
        "correcta": 0,
        "explicacion": "Trae un Snapdragon X2 Elite Extreme, más potente que el del A14."
      },
      {
        "pregunta": "¿Es el Zenbook A16 un Copilot+ PC?",
        "opciones": [
          "Sí, su NPU supera los 40 TOPS exigidos",
          "No, no tiene NPU",
          "Solo si se compra con teclado aparte",
          "No, esa función es solo de escritorio"
        ],
        "correcta": 0,
        "explicacion": "La familia Snapdragon X2 Elite trae NPU que supera el mínimo de 40 TOPS para Copilot+ PC."
      },
      {
        "pregunta": "¿Qué pantalla trae el A16?",
        "opciones": [
          "16\" 3K OLED a 120Hz",
          "14\" Full HD a 60Hz",
          "18\" Mini-LED a 240Hz",
          "13\" HD a 60Hz"
        ],
        "correcta": 0,
        "explicacion": "Pantalla de 16 pulgadas en 3K OLED a 120Hz."
      },
      {
        "pregunta": "¿Por qué pesa un poco más que el A14?",
        "opciones": [
          "Por la pantalla más grande, de 16\" en 3K",
          "Porque trae una batería del doble de tamaño",
          "Porque tiene tarjeta de video dedicada",
          "Porque viene con dos SSD"
        ],
        "correcta": 0,
        "explicacion": "La pantalla más grande añade algo de peso frente al A14."
      },
      {
        "pregunta": "¿Para qué cliente es ideal el Zenbook A16?",
        "opciones": [
          "Quien necesita más potencia que el A14 y pantalla grande para crear contenido",
          "Un cliente que solo navega ocasionalmente",
          "Un gamer competitivo",
          "Alguien que busca el equipo más económico"
        ],
        "correcta": 0,
        "explicacion": "El A16 suma potencia y pantalla más grande frente al A14, ideal para crear contenido."
      },
      {
        "pregunta": "El cliente pregunta si le puede subir la memoria RAM más adelante. ¿Qué le respondes?",
        "opciones": [
          "No, la memoria viene soldada a la placa y no se puede ampliar en este equipo.",
          "Sí, pero hay que cambiar el módulo que ya tiene por uno más grande, porque solo tiene una ranura.",
          "Sí, se le puede sumar un módulo adicional sin tocar el que ya tiene, porque le queda una ranura libre.",
          "Sí, pero solo se puede subir llevándolo a un centro de servicio autorizado, nunca en la tienda."
        ],
        "correcta": 0,
        "explicacion": "32GB le da mucha fluidez incluso con programas pesados abiertos a la vez; la memoria viene soldada, sin ranura para subirla."
      },
      {
        "pregunta": "¿Cuánto almacenamiento SSD trae este equipo?",
        "opciones": [
          "512 GB",
          "1 TB",
          "2 TB",
          "256 GB"
        ],
        "correcta": 1,
        "explicacion": "Trae 1 TB SSD: suficiente para guardar fotos, documentos, juegos o programas sin quedarse corto."
      }
    ],
    "duracionMin": 5,
    "dificultad": "intermedio",
    "imagen": "/products/zenbook-a16.svg"
  },
  {
    "slug": "zenbook-duo",
    "linea": "zenbook",
    "nombre": "ASUS Zenbook DUO (UX8407)",
    "codigo": "UX8407AA-SN434W",
    "tagline": "Trae dos pantallas OLED: una para ver, otra para trabajar al mismo tiempo.",
    "intro": "Creador de contenido o profesional que necesita multitarea real con dos pantallas.",
    "ficha": [
      {
        "componente": "Sistema operativo",
        "dato": "Windows 11 Home"
      },
      {
        "componente": "Procesador",
        "dato": "Intel Core Ultra X7 358H"
      },
      {
        "componente": "Memoria RAM",
        "dato": "32 GB LPDDR5X"
      },
      {
        "componente": "Gráficos",
        "dato": "Intel Arc"
      },
      {
        "componente": "Pantalla",
        "dato": "Doble pantalla 14\" 3K (2880x1800) 16:10, 144 Hz, 500 nits, OLED táctil"
      },
      {
        "componente": "Almacenamiento",
        "dato": "SSD 1 TB M.2 NVMe PCIe 4.0"
      },
      {
        "componente": "IA / NPU",
        "dato": "NPU Intel AI Boost integrada (Copilot+ PC)"
      },
      {
        "componente": "Batería",
        "dato": "Hasta 8 horas de uso típico con las dos pantallas activas (estimado, sin confirmar)"
      },
      {
        "componente": "Portabilidad",
        "dato": "Aprox. 1.65 kg, 1.9 cm de grosor (estimado, sin confirmar)"
      },
      {
        "componente": "Garantía",
        "dato": "1 año",
        "verificar": true
      }
    ],
    "procesador": {
      "marca": "Intel",
      "modelo": "Core Ultra X7 358H",
      "serie": "Intel Core Ultra (Series 2)",
      "nucleos": 16,
      "hilos": 22,
      "frecuenciaMax": "5.0 GHz",
      "npuTops": 13,
      "queSignifica": "Trae NPU Intel AI Boost integrada que habilita Copilot+ PC .",
      "comoDecirlo": "Procesador potente, pensado para manejar dos pantallas y varias tareas a la vez; también es Copilot+ PC.",
      "paraQueAlcanza": [
        "Multitarea real con dos pantallas",
        "Edición de fotos y video",
        "Funciones de IA de Windows (Copilot+)"
      ]
    },
    "memoria": {
      "ram": "32 GB",
      "tipoRam": "LPDDR5X",
      "almacenamiento": "1 TB SSD",
      "caso": "soldada",
      "comoDecirlo": "32GB para manejar dos pantallas y multitarea real a la vez; la memoria viene soldada, sin ranura para subirla."
    },
    "pantallaDetalle": {
      "pulgadas": 14,
      "resolucion": "2880x1800 (3K)",
      "tipo": "OLED táctil (doble pantalla)",
      "hz": 144,
      "nits": 500,
      "comoDecirlo": "Trae dos pantallas OLED táctiles de 14\": una para ver, otra para trabajar al mismo tiempo."
    },
    "clienteIdeal": "Creador de contenido o profesional que necesita multitarea real con dos pantallas.",
    "leAlcanzaPara": [
      "Multitarea real con dos pantallas",
      "Edición de fotos y video",
      "Funciones de IA de Windows (Copilot+)"
    ],
    "noEsPara": [
      "Juegos exigentes o de última generación",
      "Edición de video pesada en 4K con GPU dedicada",
      "Quien busca el precio más bajo del catálogo"
    ],
    "ganchos": [
      {
        "cliente": "Necesita multitarea real con dos pantallas",
        "frase": "Trae dos pantallas OLED: una para ver, otra para trabajar al mismo tiempo."
      },
      {
        "cliente": "Quiere anotar o dibujar directo en pantalla",
        "frase": "Las dos pantallas son táctiles: puedes dibujar, anotar o tocar directo sobre ellas."
      },
      {
        "cliente": "Es creador de contenido o necesita multitarea",
        "frase": "Es ideal para el cliente creador de contenido o que necesita multitarea de verdad."
      }
    ],
    "objeciones": [
      {
        "dice": "¿Para quién es este equipo?",
        "responde": "Para el cliente creador de contenido o que necesita multitarea real: dos pantallas táctiles en un solo equipo."
      },
      {
        "dice": "¿No es muy pesado por las dos pantallas?",
        "responde": "Pesa un poco más que un Zenbook de una sola pantalla, pero sigue siendo fácil de cargar."
      }
    ],
    "compararCon": {
      "abajo": {
        "id": "zenbook-a16",
        "diferencias": [
          "Una sola pantalla",
          "Más sencillo y con más batería"
        ]
      },
      "arriba": null
    },
    "quiz": [
      {
        "pregunta": "¿Qué hace único al Zenbook DUO?",
        "opciones": [
          "Trae dos pantallas OLED táctiles",
          "Es el único con tarjeta de video dedicada",
          "No tiene teclado físico",
          "Viene sin Windows instalado"
        ],
        "correcta": 0,
        "explicacion": "El DUO trae dos pantallas OLED táctiles de 14 pulgadas."
      },
      {
        "pregunta": "¿Es el Zenbook DUO un Copilot+ PC?",
        "opciones": [
          "Sí, trae NPU Intel AI Boost integrada",
          "No, no tiene NPU",
          "Solo si se usa con una sola pantalla",
          "No, esa función es solo para ARM"
        ],
        "correcta": 0,
        "explicacion": "El Core Ultra X7 358H trae NPU Intel AI Boost, lo que lo hace Copilot+ PC."
      },
      {
        "pregunta": "¿Para qué cliente es ideal el Zenbook DUO?",
        "opciones": [
          "Creador de contenido o profesional que necesita multitarea real",
          "Un estudiante que solo navega en internet",
          "Un gamer competitivo",
          "Alguien que busca el equipo más económico"
        ],
        "correcta": 0,
        "explicacion": "Las dos pantallas táctiles están pensadas para multitarea real y creación de contenido."
      },
      {
        "pregunta": "¿Por qué tiene menos batería que el A14 y el A16?",
        "opciones": [
          "Porque mantiene dos pantallas activas a la vez",
          "Porque no tiene batería interna",
          "Porque el procesador gasta el doble siempre",
          "Porque la pantalla es más pequeña"
        ],
        "correcta": 0,
        "explicacion": "Tener dos pantallas OLED activas consume más batería que una sola pantalla."
      },
      {
        "pregunta": "¿Qué pueden hacer las dos pantallas del DUO?",
        "opciones": [
          "Dibujar, anotar o tocar directo sobre ellas, porque son táctiles",
          "Solo mostrar la misma imagen duplicada",
          "Solo funcionan si el equipo está conectado a un monitor externo",
          "Solo una de las dos enciende a la vez"
        ],
        "correcta": 0,
        "explicacion": "Ambas pantallas son OLED táctiles e independientes."
      },
      {
        "pregunta": "El cliente pregunta si le puede subir la memoria RAM más adelante. ¿Qué le respondes?",
        "opciones": [
          "Sí, pero hay que cambiar el módulo que ya tiene por uno más grande, porque solo tiene una ranura.",
          "No, la memoria viene soldada a la placa y no se puede ampliar en este equipo.",
          "Sí, se le puede sumar un módulo adicional sin tocar el que ya tiene, porque le queda una ranura libre.",
          "Sí, pero solo se puede subir llevándolo a un centro de servicio autorizado, nunca en la tienda."
        ],
        "correcta": 1,
        "explicacion": "32GB para manejar dos pantallas y multitarea real a la vez; la memoria viene soldada, sin ranura para subirla."
      },
      {
        "pregunta": "¿Cuánto almacenamiento SSD trae este equipo?",
        "opciones": [
          "512 GB",
          "2 TB",
          "1 TB",
          "256 GB"
        ],
        "correcta": 2,
        "explicacion": "Trae 1 TB SSD: suficiente para guardar fotos, documentos, juegos o programas sin quedarse corto."
      }
    ],
    "duracionMin": 5,
    "dificultad": "avanzado",
    "imagen": "/products/zenbook-duo.svg"
  },
  {
    "slug": "zenbook-14-oled-ux3405ca",
    "linea": "zenbook",
    "nombre": "ASUS Zenbook 14 OLED (UX3405CA)",
    "codigo": "UX3405CA",
    "tagline": "Se vende con la pantalla encendida: negro real, color de cine y 70% menos luz azul.",
    "intro": "Quien edita fotos, ve series o pasa muchas horas frente a la pantalla y quiere colores reales sin cansar la vista.",
    "ficha": [
      {
        "componente": "Sistema operativo",
        "dato": "Windows 11 Home"
      },
      {
        "componente": "Procesador",
        "dato": "Intel Core Ultra 7 255H"
      },
      {
        "componente": "Memoria RAM",
        "dato": "16 GB LPDDR5X"
      },
      {
        "componente": "Gráficos",
        "dato": "Intel Arc 140T integrados"
      },
      {
        "componente": "IA / NPU",
        "dato": "NPU Intel AI Boost + Arc 140T: hasta 96 TOPS en total (NPU 13 + GPU 74 + CPU)"
      },
      {
        "componente": "Pantalla",
        "dato": "14\" WUXGA (1920x1200) 16:10, OLED táctil, 60 Hz, 400 nits, 100% DCI-P3, 0,2 ms"
      },
      {
        "componente": "Almacenamiento",
        "dato": "SSD 512 GB M.2 NVMe PCIe 4.0"
      },
      {
        "componente": "Batería",
        "dato": "75 Wh, carga por USB-C (adaptador 65 W)"
      },
      {
        "componente": "Portabilidad",
        "dato": "1,2 kg, 14,9 mm de grosor, norma militar MIL-STD-810H"
      },
      {
        "componente": "Garantía",
        "dato": "1 año",
        "verificar": true
      }
    ],
    "procesador": {
      "marca": "Intel",
      "modelo": "Core Ultra 7 255H",
      "serie": "Core Ultra 200H",
      "nucleos": 16,
      "hilos": 16,
      "frecuenciaMax": "5,1 GHz",
      "npuTops": 13,
      "queSignifica": "Procesador de 16 núcleos con gráficos Intel Arc 140T integrados y NPU Intel AI Boost; sumando CPU, GPU y NPU la plataforma llega hasta 96 TOPS de IA.",
      "comoDecirlo": "Es rápido para edición, multitarea y las funciones de IA de Windows (Copilot); le va a durar varios años.",
      "paraQueAlcanza": [
        "Edición de fotos y video liviano",
        "Multitarea exigente",
        "Funciones de IA en Windows (Copilot)",
        "Trabajo y estudio todos los días"
      ]
    },
    "memoria": {
      "ram": "16 GB",
      "tipoRam": "LPDDR5X",
      "almacenamiento": "512 GB SSD",
      "comoDecirlo": "16 GB en doble canal, integrados a la placa: más rápidos y eficientes que módulos sueltos, listos para multitarea.",
      "caso": "soldada"
    },
    "pantallaDetalle": {
      "pulgadas": 14,
      "resolucion": "1920x1200 (WUXGA)",
      "tipo": "OLED táctil",
      "hz": 60,
      "nits": 400,
      "comoDecirlo": "Pantalla OLED de 14 pulgadas, táctil, con negro real y 100% del color de cine (DCI-P3): ideal para fotos, video y series."
    },
    "clienteIdeal": "Quien edita fotos, ve series o pasa muchas horas frente a la pantalla y quiere colores reales y buen cuidado visual, sin cansar la vista.",
    "leAlcanzaPara": [
      "Editar fotos y video con color real",
      "Ver series y películas con negro real",
      "Trabajar muchas horas seguidas sin cansar la vista",
      "Presentar, firmar y hacer zoom con la pantalla táctil",
      "Conectar un monitor 4K y cargar con un solo cable (Thunderbolt 4)"
    ],
    "noEsPara": [
      "Juegos competitivos que necesiten 120 Hz o más (ahí recomienda TUF o ROG)",
      "Quien necesita ampliar la RAM más adelante (viene soldada)"
    ],
    "ganchos": [
      {
        "cliente": "Pregunta si vale la pena el OLED",
        "frase": "En esta pantalla cada punto tiene su propia luz. Cuando la imagen es negra, el punto se apaga. Por eso el negro se ve negro de verdad."
      },
      {
        "cliente": "Quiere ver la diferencia con una pantalla normal",
        "frase": "Le voy a poner un video oscuro. ¿Ve que el negro no se ve gris? Eso es OLED. En una pantalla normal esa parte brillaría."
      },
      {
        "cliente": "Edita fotos o ve series",
        "frase": "Si edita fotos o ve series, aquí ve el color como es. Cubre el 100% del estándar de cine, 1.070 millones de colores."
      },
      {
        "cliente": "Pasa muchas horas frente al computador",
        "frase": "Si pasa muchas horas frente al computador, esta pantalla emite 70% menos luz azul dañina, certificada por TÜV Rheinland, y sin volver la imagen amarilla."
      },
      {
        "cliente": "Quiere algo liviano y resistente",
        "frase": "Pesa 1,2 kilos y pasó pruebas de resistencia con norma militar. Es para llevarlo a todas partes sin miedo."
      }
    ],
    "objeciones": [
      {
        "dice": "¿El OLED no se quema con el tiempo?",
        "responde": "ASUS incluye ASUS OLED Care en MyASUS: mueve los píxeles levemente, oculta la barra de tareas y activa un protector de pantalla en negro. Con uso normal, no es un problema."
      },
      {
        "dice": "¿Por qué 60 Hz si otros tienen 120 Hz?",
        "responde": "Esta referencia es WUXGA a 60 Hz, ideal para estudio, oficina y series. Con 0,2 ms de respuesta el movimiento se ve limpio. Si el cliente juega competitivo, llévalo a la línea TUF o ROG."
      },
      {
        "dice": "¿Para qué quiero pantalla táctil?",
        "responde": "Para hacer zoom en fotos, firmar documentos, desplazarse rápido y presentar: es un plus que el cliente usa más de lo que cree."
      },
      {
        "dice": "La RAM no se puede ampliar.",
        "responde": "Son 16 GB LPDDR5X en doble canal, integrados: más rápidos y eficientes que módulos sueltos, y suficientes para oficina, estudio y edición ligera durante años."
      },
      {
        "dice": "Está más caro que un Vivobook.",
        "responde": "Paga por pantalla OLED de cine, 1,2 kg, norma militar, 2 Thunderbolt 4, Wi-Fi 7 y batería de 75 Wh: un equipo premium para muchos años."
      },
      {
        "dice": "¿Se ve bien con luz fuerte?",
        "responde": "Tiene 400 nits y acabado brillante: en interiores y oficinas se ve excelente. Al sol directo, como cualquier portátil, conviene buscar sombra."
      }
    ],
    "compararCon": {
      "abajo": {
        "id": "zenbook-a14",
        "diferencias": [
          "Procesador Snapdragon X (ARM) en vez de Intel Core Ultra",
          "Pantalla OLED pero sin función táctil",
          "Más económico"
        ]
      },
      "arriba": {
        "id": "zenbook-duo",
        "diferencias": [
          "Trae una segunda pantalla OLED para multitarea real",
          "Más caro y más pesado",
          "Pensado para creadores que necesitan dos pantallas"
        ]
      }
    },
    "quiz": [
      {
        "pregunta": "¿Por qué una pantalla OLED muestra negro real?",
        "opciones": [
          "Porque tiene una lámpara más oscura",
          "Porque cada píxel produce su propia luz y se apaga por completo",
          "Porque usa un filtro negro encima",
          "Porque baja el brillo general de la pantalla"
        ],
        "correcta": 1,
        "explicacion": "En OLED no hay retroiluminación: el píxel negro está apagado."
      },
      {
        "pregunta": "¿Qué cobertura de color tiene la pantalla del Zenbook 14 OLED?",
        "opciones": [
          "72% NTSC",
          "100% sRGB",
          "100% DCI-P3",
          "90% Adobe RGB"
        ],
        "correcta": 2,
        "explicacion": "DCI-P3 es el estándar de la industria del cine, más amplio que sRGB."
      },
      {
        "pregunta": "¿Cuántos colores puede mostrar?",
        "opciones": [
          "16,7 millones",
          "1.070 millones",
          "256 mil",
          "500 millones"
        ],
        "correcta": 1,
        "explicacion": "Son 1.070 millones de colores (10 bits), contra 16,7 millones de una pantalla de 8 bits."
      },
      {
        "pregunta": "¿Cuál es la relación de contraste de la pantalla?",
        "opciones": [
          "1.000:1",
          "100.000:1",
          "1.000.000:1",
          "10.000:1"
        ],
        "correcta": 2,
        "explicacion": "Al apagar el píxel por completo, el contraste llega a 1.000.000:1."
      },
      {
        "pregunta": "¿Cuánto tiempo de respuesta tiene?",
        "opciones": [
          "0,2 ms",
          "5 ms",
          "16 ms",
          "1 ms"
        ],
        "correcta": 0,
        "explicacion": "0,2 ms: el movimiento se ve nítido, sin estelas."
      },
      {
        "pregunta": "¿Cuánto reduce la luz azul perjudicial y cómo?",
        "opciones": [
          "30%, con un filtro amarillo",
          "70%, desde el hardware y sin alterar el color",
          "100%, apagando el azul",
          "50%, con una app de terceros"
        ],
        "correcta": 1,
        "explicacion": "ASUS OLED reduce un 70% la luz azul dañina, certificado por TÜV Rheinland, sin teñir la imagen."
      },
      {
        "pregunta": "¿Qué procesador tiene esta referencia?",
        "opciones": [
          "Intel Core Ultra 7 255H, 16 núcleos, hasta 5,1 GHz",
          "Intel Core i5 de 12.ª generación",
          "AMD Ryzen 7",
          "Snapdragon X Elite"
        ],
        "correcta": 0,
        "explicacion": "Core Ultra 7 255H: 16 núcleos, 16 hilos y 24 MB de caché."
      },
      {
        "pregunta": "¿Cuánta capacidad total de IA ofrece la plataforma?",
        "opciones": [
          "Hasta 13 TOPS",
          "Hasta 40 TOPS",
          "Hasta 96 TOPS",
          "Hasta 45 TOPS"
        ],
        "correcta": 2,
        "explicacion": "NPU (13) + GPU Arc 140T (74) + CPU suman hasta 96 TOPS."
      },
      {
        "pregunta": "El cliente quiere conectar un monitor 4K y cargar con un solo cable. ¿Qué puerto le muestras?",
        "opciones": [
          "USB-A 3.2",
          "Thunderbolt 4 (USB-C)",
          "Audio 3,5 mm",
          "HDMI 2.1"
        ],
        "correcta": 1,
        "explicacion": "Tiene 2 Thunderbolt 4 de 40 Gbps con video y carga."
      },
      {
        "pregunta": "¿Qué pantalla tiene esta referencia de retail?",
        "opciones": [
          "14\" WUXGA 1920×1200 OLED táctil, 16:10",
          "15,6\" FHD IPS",
          "14\" 4K LCD",
          "13\" QHD OLED, 3:2"
        ],
        "correcta": 0,
        "explicacion": "WUXGA OLED táctil en formato 16:10: más alto que 16:9 para documentos."
      }
    ],
    "duracionMin": 12,
    "dificultad": "intermedio"
  },
  {
    "slug": "tuf-gaming-16-fx610jh-rtx5050",
    "linea": "tuf",
    "nombre": "ASUS TUF Gaming 16 — RTX 5050",
    "codigo": "FX610JH",
    "tagline": "Entra al mundo gamer de ASUS sin pagar por una tarjeta que no vas a aprovechar todavía.",
    "intro": "Quien quiere entrar al gaming con un equipo ASUS confiable, jugando en 1080p, sin pagar de más por potencia que no va a usar.",
    "ficha": [
      {
        "componente": "Sistema operativo",
        "dato": "Windows 11 Home"
      },
      {
        "componente": "Procesador",
        "dato": "Intel Core i7 (14ª/15ª Gen)",
        "verificar": true
      },
      {
        "componente": "Memoria RAM",
        "dato": "16 GB DDR5"
      },
      {
        "componente": "Tarjeta de video",
        "dato": "NVIDIA GeForce RTX 5050, 8GB GDDR7, hasta 85W TGP"
      },
      {
        "componente": "Pantalla",
        "dato": "16\" WUXGA (1920x1200), 144 Hz, 300 nits"
      },
      {
        "componente": "Almacenamiento",
        "dato": "SSD 512 GB M.2 NVMe PCIe 4.0"
      },
      {
        "componente": "Batería",
        "dato": "Autonomía variable según uso (estimado, sin confirmar)"
      },
      {
        "componente": "Portabilidad",
        "dato": "Aprox. 2.2 kg (confirmado por prensa regional)"
      },
      {
        "componente": "Garantía",
        "dato": "1 año",
        "verificar": true
      }
    ],
    "procesador": {
      "marca": "Intel",
      "modelo": "Core i7 (14ª/15ª Gen)",
      "serie": "Intel Core HX",
      "nucleos": 14,
      "hilos": 20,
      "frecuenciaMax": "5.0 GHz",
      "npuTops": null,
      "queSignifica": "Procesador de gama alta para gaming; no trae NPU dedicada de IA.",
      "comoDecirlo": "Rápido para jugar y hacer varias cosas a la vez; la IA la mueve la tarjeta de video, no un chip aparte.",
      "paraQueAlcanza": [
        "Gaming en 1080p",
        "Streaming mientras juega",
        "Multitarea pesada"
      ]
    },
    "memoria": {
      "ram": "16 GB",
      "tipoRam": "DDR5",
      "almacenamiento": "512 GB SSD",
      "caso": "se-suma",
      "comoDecirlo": "Trae 16GB de memoria en dos ranuras; si el cliente necesita más, se le puede sumar otro módulo sin quitar el actual."
    },
    "pantallaDetalle": {
      "pulgadas": 16,
      "resolucion": "1920x1200 (WUXGA)",
      "tipo": "IPS",
      "hz": 144,
      "nits": 300,
      "comoDecirlo": "Pantalla de 16 pulgadas a 144Hz: se ve fluida en juegos y contenido de acción."
    },
    "clienteIdeal": "Quien quiere entrar al gaming con un equipo ASUS confiable, jugando en 1080p, sin pagar de más por potencia que no va a usar.",
    "leAlcanzaPara": [
      "Gaming en 1080p",
      "Streaming mientras juega",
      "Multitarea pesada"
    ],
    "noEsPara": [
      "Jugar en 1440p o 4K a máximos gráficos",
      "Quien busca pantalla Mini-LED o chasis premium (eso es ROG)"
    ],
    "ganchos": [
      {
        "cliente": "Quiere entrar al gaming sin gastar de más",
        "frase": "Entra al mundo gamer de ASUS sin pagar por una tarjeta que no vas a aprovechar todavía."
      },
      {
        "cliente": "Pregunta si le alcanza para los juegos del momento",
        "frase": "Para 1080p con buenos gráficos sí corre bien la mayoría de juegos actuales."
      },
      {
        "cliente": "Duda entre TUF y ROG de entrada",
        "frase": "Mismo chasis y pantalla que los demás TUF 16: solo cambia la potencia de la GPU, así que puedes subir de gama después."
      }
    ],
    "objeciones": [
      {
        "dice": "¿Le alcanza para los juegos del momento?",
        "responde": "Para 1080p con buenos gráficos sí corre bien la mayoría de juegos actuales; para 1440p o 4K hay que subir de GPU."
      },
      {
        "dice": "¿Por qué no llevar directo el 5060?",
        "responde": "Si el presupuesto es ajustado, el 5050 ya corre bien en 1080p; el salto a 5060 se siente más en juegos exigentes o 1440p."
      }
    ],
    "compararCon": {
      "abajo": null,
      "arriba": {
        "id": "tuf-gaming-16-fx610jm-rtx5060",
        "diferencias": [
          "Mismo chasis y pantalla",
          "GPU más potente para 1080p a tope o empezar en 1440p"
        ]
      }
    },
    "quiz": [
      {
        "pregunta": "¿Qué GPU trae este TUF Gaming 16?",
        "opciones": [
          "NVIDIA GeForce RTX 5050",
          "NVIDIA GeForce RTX 5070",
          "NVIDIA GeForce RTX 5090",
          "No trae GPU dedicada"
        ],
        "correcta": 0,
        "explicacion": "Es la entrada de la escala: RTX 5050 con 8GB GDDR7."
      },
      {
        "pregunta": "¿Es este equipo un Copilot+ PC?",
        "opciones": [
          "No, no trae NPU dedicada; usa la GPU para tareas de IA",
          "Sí, es Copilot+ PC",
          "Solo si se conecta a internet",
          "Sí, pero solo en modo avión"
        ],
        "correcta": 0,
        "explicacion": "Los TUF Gaming de esta familia no traen NPU dedicada; la IA la mueve la GPU."
      },
      {
        "pregunta": "¿Le alcanza a este equipo para los juegos actuales?",
        "opciones": [
          "Sí, para 1080p con buenos gráficos corre bien la mayoría",
          "No corre ningún juego actual",
          "Solo corre juegos en 4K",
          "Solo sirve para juegos de hace 10 años"
        ],
        "correcta": 0,
        "explicacion": "La RTX 5050 rinde bien en 1080p con ajustes altos."
      },
      {
        "pregunta": "¿Cuánta RAM trae de fábrica?",
        "opciones": [
          "16 GB en dos ranuras",
          "8 GB soldados",
          "32 GB soldados",
          "4 GB"
        ],
        "correcta": 0,
        "explicacion": "Trae 16GB; si hay ranura libre se puede sumar más memoria."
      },
      {
        "pregunta": "¿Para qué cliente es ideal este TUF?",
        "opciones": [
          "Quien quiere entrar al gaming sin pagar de más por potencia que no va a usar",
          "Un cliente que solo navega en internet",
          "Un creador de contenido profesional",
          "Alguien que necesita la pantalla más grande del catálogo"
        ],
        "correcta": 0,
        "explicacion": "Es el punto de entrada del segmento gamer, pensado para 1080p."
      },
      {
        "pregunta": "El cliente pregunta si le puede subir la memoria RAM más adelante. ¿Qué le respondes?",
        "opciones": [
          "No, la memoria viene soldada a la placa y no se puede ampliar en este equipo.",
          "Sí, pero hay que cambiar el módulo que ya tiene por uno más grande, porque solo tiene una ranura.",
          "Sí, se le puede sumar un módulo adicional sin tocar el que ya tiene, porque le queda una ranura libre.",
          "Sí, pero solo se puede subir llevándolo a un centro de servicio autorizado, nunca en la tienda."
        ],
        "correcta": 2,
        "explicacion": "Trae 16GB de memoria en dos ranuras; si el cliente necesita más, se le puede sumar otro módulo sin quitar el actual."
      },
      {
        "pregunta": "¿Cuánto almacenamiento SSD trae este equipo?",
        "opciones": [
          "256 GB",
          "1 TB",
          "128 GB",
          "512 GB"
        ],
        "correcta": 3,
        "explicacion": "Trae 512 GB SSD: suficiente para guardar fotos, documentos, juegos o programas sin quedarse corto."
      }
    ],
    "duracionMin": 5,
    "dificultad": "básico",
    "imagen": "/products/tuf-gaming-16-rtx5050.svg"
  },
  {
    "slug": "tuf-gaming-16-fx610jm-rtx5060",
    "linea": "tuf",
    "nombre": "ASUS TUF Gaming 16 — RTX 5060",
    "codigo": "FX610JM",
    "tagline": "El punto medio del gaming TUF: corre casi todo en 1080p a tope y empieza a moverse bien en 1440p.",
    "intro": "Quien juega en serio y quiere buen rendimiento en 1080p (empezando en 1440p) sin pasarse a gama alta.",
    "ficha": [
      {
        "componente": "Sistema operativo",
        "dato": "Windows 11 Home"
      },
      {
        "componente": "Procesador",
        "dato": "Intel Core i7 (14ª/15ª Gen)",
        "verificar": true
      },
      {
        "componente": "Memoria RAM",
        "dato": "16 GB DDR5"
      },
      {
        "componente": "Tarjeta de video",
        "dato": "NVIDIA GeForce RTX 5060, 8GB GDDR7, hasta 85W TGP"
      },
      {
        "componente": "Pantalla",
        "dato": "16\" WUXGA (1920x1200), 144 Hz, 300 nits"
      },
      {
        "componente": "Almacenamiento",
        "dato": "SSD 512 GB o 1 TB M.2 NVMe PCIe 4.0",
        "verificar": true
      },
      {
        "componente": "Batería",
        "dato": "Autonomía variable según uso (estimado, sin confirmar)"
      },
      {
        "componente": "Portabilidad",
        "dato": "Aprox. 2.2 kg (confirmado por prensa regional)"
      },
      {
        "componente": "Garantía",
        "dato": "1 año",
        "verificar": true
      }
    ],
    "procesador": {
      "marca": "Intel",
      "modelo": "Core i7 (14ª/15ª Gen)",
      "serie": "Intel Core HX",
      "nucleos": 14,
      "hilos": 20,
      "frecuenciaMax": "5.0 GHz",
      "npuTops": null,
      "queSignifica": "Procesador de gama alta para gaming; no trae NPU dedicada de IA.",
      "comoDecirlo": "Rápido para jugar y hacer varias cosas a la vez; la IA la mueve la tarjeta de video, no un chip aparte.",
      "paraQueAlcanza": [
        "Gaming en 1080p a tope",
        "Empezar a jugar en 1440p",
        "Streaming mientras juega"
      ]
    },
    "memoria": {
      "ram": "16 GB",
      "tipoRam": "DDR5",
      "almacenamiento": "512 GB SSD",
      "caso": "se-suma",
      "comoDecirlo": "Trae 16GB de memoria en dos ranuras; si el cliente necesita más, se le puede sumar otro módulo sin quitar el actual."
    },
    "pantallaDetalle": {
      "pulgadas": 16,
      "resolucion": "1920x1200 (WUXGA)",
      "tipo": "IPS",
      "hz": 144,
      "nits": 300,
      "comoDecirlo": "Pantalla de 16 pulgadas a 144Hz: se ve fluida en juegos y contenido de acción."
    },
    "clienteIdeal": "Quien juega en serio y quiere buen rendimiento en 1080p (empezando en 1440p) sin pasarse a gama alta.",
    "leAlcanzaPara": [
      "Gaming en 1080p a tope",
      "Empezar a jugar en 1440p",
      "Streaming mientras juega"
    ],
    "noEsPara": [
      "4K a máximos gráficos de forma sostenida",
      "Quien busca pantalla Mini-LED o chasis premium (eso es ROG)"
    ],
    "ganchos": [
      {
        "cliente": "Busca el punto medio entre precio y potencia gamer",
        "frase": "El punto medio del gaming TUF: corre casi todo en 1080p a tope y empieza a moverse bien en 1440p."
      },
      {
        "cliente": "Duda entre el 5050 y el 5060",
        "frase": "Más FPS en los mismos juegos; el resto del equipo (pantalla, chasis, batería) es igual."
      },
      {
        "cliente": "Quiere jugar en serio sin pasarse a gama alta",
        "frase": "Buen balance entre precio y rendimiento para jugar en serio sin pasarse a gama alta."
      }
    ],
    "objeciones": [
      {
        "dice": "¿En qué se nota la diferencia con el 5050?",
        "responde": "Más FPS en los mismos juegos y mejor margen para 1440p; el resto del equipo es igual."
      },
      {
        "dice": "¿Por qué no llevar directo el 5070?",
        "responde": "Si el presupuesto es ajustado, el 5060 ya rinde muy bien; el 5070 se nota más en juegos muy exigentes en 1440p."
      }
    ],
    "compararCon": {
      "abajo": {
        "id": "tuf-gaming-16-fx610jh-rtx5050",
        "diferencias": [
          "Mismo chasis",
          "GPU de entrada"
        ]
      },
      "arriba": {
        "id": "tuf-gaming-16-fx610jp-rtx5070",
        "diferencias": [
          "Mismo chasis",
          "GPU tope de este segmento",
          "Lista para 1440p sin bajar muchos ajustes"
        ]
      }
    },
    "quiz": [
      {
        "pregunta": "¿Qué GPU trae este TUF Gaming 16?",
        "opciones": [
          "NVIDIA GeForce RTX 5060",
          "NVIDIA GeForce RTX 5050",
          "NVIDIA GeForce RTX 5080",
          "No trae GPU dedicada"
        ],
        "correcta": 0,
        "explicacion": "Es el escalón medio: RTX 5060 con 8GB GDDR7."
      },
      {
        "pregunta": "¿En qué se diferencia del modelo con RTX 5050?",
        "opciones": [
          "Más FPS en los mismos juegos; el resto del equipo es igual",
          "Tiene una pantalla distinta",
          "Pesa la mitad",
          "Trae el doble de batería"
        ],
        "correcta": 0,
        "explicacion": "Solo cambia la GPU; chasis, pantalla y batería son iguales."
      },
      {
        "pregunta": "¿Puede este equipo jugar en 1440p?",
        "opciones": [
          "Empieza a moverse bien en 1440p",
          "No puede jugar en 1440p bajo ninguna circunstancia",
          "Solo juega en 4K",
          "Solo juega en modo ventana"
        ],
        "correcta": 0,
        "explicacion": "El RTX 5060 corre 1080p a tope y se defiende en 1440p."
      },
      {
        "pregunta": "¿Es Copilot+ PC este equipo?",
        "opciones": [
          "No, usa la GPU para tareas de IA en vez de una NPU dedicada",
          "Sí, es Copilot+ PC",
          "Solo con el cargador conectado",
          "Sí, en todas sus configuraciones"
        ],
        "correcta": 0,
        "explicacion": "No trae NPU dedicada; la IA la mueve la GPU."
      },
      {
        "pregunta": "¿Por qué no llevar directo el modelo con RTX 5070?",
        "opciones": [
          "Si el presupuesto es ajustado, el 5060 ya rinde muy bien",
          "Porque el 5070 no existe en este catálogo",
          "Porque el 5070 es más lento",
          "Porque el 5070 no trae pantalla"
        ],
        "correcta": 0,
        "explicacion": "El 5060 es un buen punto medio si el presupuesto es ajustado."
      },
      {
        "pregunta": "El cliente pregunta si le puede subir la memoria RAM más adelante. ¿Qué le respondes?",
        "opciones": [
          "No, la memoria viene soldada a la placa y no se puede ampliar en este equipo.",
          "Sí, pero hay que cambiar el módulo que ya tiene por uno más grande, porque solo tiene una ranura.",
          "Sí, pero solo se puede subir llevándolo a un centro de servicio autorizado, nunca en la tienda.",
          "Sí, se le puede sumar un módulo adicional sin tocar el que ya tiene, porque le queda una ranura libre."
        ],
        "correcta": 3,
        "explicacion": "Trae 16GB de memoria en dos ranuras; si el cliente necesita más, se le puede sumar otro módulo sin quitar el actual."
      },
      {
        "pregunta": "¿Cuánto almacenamiento SSD trae este equipo?",
        "opciones": [
          "512 GB",
          "256 GB",
          "1 TB",
          "128 GB"
        ],
        "correcta": 0,
        "explicacion": "Trae 512 GB SSD: suficiente para guardar fotos, documentos, juegos o programas sin quedarse corto."
      }
    ],
    "duracionMin": 5,
    "dificultad": "intermedio",
    "imagen": "/products/tuf-gaming-16-rtx5060.svg"
  },
  {
    "slug": "tuf-gaming-16-fx610jp-rtx5070",
    "linea": "tuf",
    "nombre": "ASUS TUF Gaming 16 — RTX 5070",
    "codigo": "FX610JP",
    "tagline": "Lo más potente de la línea TUF, antes de pasar a ROG.",
    "intro": "Quien quiere el máximo rendimiento gamer dentro de TUF, listo para 1440p, sin pasarse al precio de un ROG.",
    "ficha": [
      {
        "componente": "Sistema operativo",
        "dato": "Windows 11 Home"
      },
      {
        "componente": "Procesador",
        "dato": "Intel Core i7 (14ª/15ª Gen)",
        "verificar": true
      },
      {
        "componente": "Memoria RAM",
        "dato": "16 GB DDR5"
      },
      {
        "componente": "Tarjeta de video",
        "dato": "NVIDIA GeForce RTX 5070, 8GB GDDR7, hasta 85W TGP"
      },
      {
        "componente": "Pantalla",
        "dato": "16\" WUXGA (1920x1200), 144 Hz, 300 nits"
      },
      {
        "componente": "Almacenamiento",
        "dato": "SSD 1 TB M.2 NVMe PCIe 4.0",
        "verificar": true
      },
      {
        "componente": "Batería",
        "dato": "Autonomía variable según uso (estimado, sin confirmar)"
      },
      {
        "componente": "Portabilidad",
        "dato": "Aprox. 2.2 kg (confirmado por prensa regional)"
      },
      {
        "componente": "Garantía",
        "dato": "1 año",
        "verificar": true
      }
    ],
    "procesador": {
      "marca": "Intel",
      "modelo": "Core i7 (14ª/15ª Gen)",
      "serie": "Intel Core HX",
      "nucleos": 14,
      "hilos": 20,
      "frecuenciaMax": "5.0 GHz",
      "npuTops": null,
      "queSignifica": "Procesador de gama alta para gaming; no trae NPU dedicada de IA.",
      "comoDecirlo": "Rápido para jugar y hacer varias cosas a la vez; la IA la mueve la tarjeta de video, no un chip aparte.",
      "paraQueAlcanza": [
        "Gaming en 1440p",
        "Streaming mientras juega",
        "Multitarea muy pesada"
      ]
    },
    "memoria": {
      "ram": "16 GB",
      "tipoRam": "DDR5",
      "almacenamiento": "512 GB SSD",
      "caso": "se-suma",
      "comoDecirlo": "Trae 16GB de memoria en dos ranuras; si el cliente necesita más, se le puede sumar otro módulo sin quitar el actual."
    },
    "pantallaDetalle": {
      "pulgadas": 16,
      "resolucion": "1920x1200 (WUXGA)",
      "tipo": "IPS",
      "hz": 144,
      "nits": 300,
      "comoDecirlo": "Pantalla de 16 pulgadas a 144Hz: se ve fluida en juegos y contenido de acción."
    },
    "clienteIdeal": "Quien quiere el máximo rendimiento gamer dentro de TUF, listo para 1440p, sin pasarse al precio de un ROG.",
    "leAlcanzaPara": [
      "Gaming en 1440p",
      "Streaming mientras juega",
      "Multitarea muy pesada"
    ],
    "noEsPara": [
      "4K a máximos gráficos de forma sostenida",
      "Quien ya decidió que necesita pantalla Mini-LED (eso es ROG)"
    ],
    "ganchos": [
      {
        "cliente": "Quiere lo más potente de TUF antes de pasar a ROG",
        "frase": "Lo más potente de la línea TUF, antes de pasar a ROG."
      },
      {
        "cliente": "Quiere rendimiento en 1440p sin pagar precio de ROG",
        "frase": "Rinde muy bien en 1440p, con el mismo chasis resistente de toda la línea TUF."
      },
      {
        "cliente": "Duda entre este y un ROG de entrada",
        "frase": "Si el presupuesto es ajustado, este 5070 ya rinde muy bien en 1440p."
      }
    ],
    "objeciones": [
      {
        "dice": "¿Por qué no llevar directamente un ROG?",
        "responde": "Si el presupuesto es ajustado, este 5070 ya rinde muy bien en 1440p; ROG suma pantalla y refrigeración todavía mejores, pero a otro precio."
      },
      {
        "dice": "¿Para qué me sirve tener 1TB en este modelo?",
        "responde": "Para instalar muchos juegos pesados sin tener que desinstalar uno para meter otro."
      }
    ],
    "compararCon": {
      "abajo": {
        "id": "tuf-gaming-16-fx610jm-rtx5060",
        "diferencias": [
          "Menos FPS",
          "Mismo chasis"
        ]
      },
      "arriba": {
        "id": "rog-strix-g16-rtx5070ti",
        "diferencias": [
          "Sube de GPU (RTX 5070 Ti)",
          "Sube de calidad de pantalla y chasis",
          "Mejor refrigeración"
        ]
      }
    },
    "quiz": [
      {
        "pregunta": "¿Cuál es la GPU tope dentro del segmento TUF?",
        "opciones": [
          "RTX 5070",
          "RTX 5050",
          "RTX 5080",
          "RTX 5090"
        ],
        "correcta": 0,
        "explicacion": "El RTX 5070 es el tope de gama dentro de la línea TUF; arriba de eso ya es ROG."
      },
      {
        "pregunta": "¿Para qué resolución rinde bien este equipo?",
        "opciones": [
          "1440p",
          "Solo 720p",
          "Solo 480p",
          "Ninguna, es solo para oficina"
        ],
        "correcta": 0,
        "explicacion": "El RTX 5070 rinde muy bien en 1440p."
      },
      {
        "pregunta": "¿Por qué no llevar directamente un ROG?",
        "opciones": [
          "Si el presupuesto es ajustado, este 5070 ya rinde muy bien en 1440p",
          "Porque ROG no tiene GPU dedicada",
          "Porque ROG no existe todavía",
          "Porque TUF siempre es más potente que ROG"
        ],
        "correcta": 0,
        "explicacion": "ROG suma pantalla y refrigeración mejores, pero a mayor precio."
      },
      {
        "pregunta": "¿Cuánto almacenamiento trae este modelo?",
        "opciones": [
          "SSD de 1 TB",
          "SSD de 128 GB",
          "Disco duro de 2 TB",
          "No trae almacenamiento interno"
        ],
        "correcta": 0,
        "explicacion": "Trae 1TB de SSD NVMe."
      },
      {
        "pregunta": "¿Para qué me sirve tener 1TB en este modelo?",
        "opciones": [
          "Para instalar muchos juegos pesados sin desinstalar uno para meter otro",
          "Para que la batería dure más",
          "Para que la pantalla se vea mejor",
          "Para que el equipo pese menos"
        ],
        "correcta": 0,
        "explicacion": "1TB da espacio de sobra para una librería grande de juegos."
      },
      {
        "pregunta": "El cliente pregunta si le puede subir la memoria RAM más adelante. ¿Qué le respondes?",
        "opciones": [
          "Sí, se le puede sumar un módulo adicional sin tocar el que ya tiene, porque le queda una ranura libre.",
          "No, la memoria viene soldada a la placa y no se puede ampliar en este equipo.",
          "Sí, pero hay que cambiar el módulo que ya tiene por uno más grande, porque solo tiene una ranura.",
          "Sí, pero solo se puede subir llevándolo a un centro de servicio autorizado, nunca en la tienda."
        ],
        "correcta": 0,
        "explicacion": "Trae 16GB de memoria en dos ranuras; si el cliente necesita más, se le puede sumar otro módulo sin quitar el actual."
      },
      {
        "pregunta": "¿Cuánto almacenamiento SSD trae este equipo?",
        "opciones": [
          "256 GB",
          "512 GB",
          "1 TB",
          "128 GB"
        ],
        "correcta": 1,
        "explicacion": "Trae 512 GB SSD: suficiente para guardar fotos, documentos, juegos o programas sin quedarse corto."
      }
    ],
    "duracionMin": 5,
    "dificultad": "avanzado",
    "imagen": "/products/tuf-gaming-16-rtx5070.svg"
  },
  {
    "slug": "tuf-gaming-f16-fx607vjb-rtx3050",
    "linea": "tuf",
    "nombre": "ASUS TUF Gaming F16 — RTX 3050",
    "codigo": "FX607VJB",
    "tagline": "La entrada al gaming de ASUS: chasis de grado militar, sin pagar por una gráfica que no vas a aprovechar todavía.",
    "intro": "Quien entra al PC gaming sin gastar de más, viniendo de consola o de un portátil de oficina.",
    "ficha": [
      {
        "componente": "Sistema operativo",
        "dato": "Windows 11 Home",
        "verificar": true
      },
      {
        "componente": "Procesador",
        "dato": "Intel Core 5 210H · 8 núcleos / 12 hilos · hasta 4,8 GHz"
      },
      {
        "componente": "Memoria RAM",
        "dato": "8 o 16 GB DDR5, 2 ranuras, ampliable (varía según la tienda)",
        "verificar": true
      },
      {
        "componente": "Tarjeta de video",
        "dato": "NVIDIA GeForce RTX 3050, 6 GB GDDR6"
      },
      {
        "componente": "Pantalla",
        "dato": "16\" FHD+ (1920x1200) 16:10, 144 Hz, IPS"
      },
      {
        "componente": "Almacenamiento",
        "dato": "SSD 512 GB M.2 NVMe PCIe 4.0",
        "verificar": true
      },
      {
        "componente": "Batería",
        "dato": "56 Wh"
      },
      {
        "componente": "Portabilidad",
        "dato": "Aprox. 2.2 kg"
      },
      {
        "componente": "Garantía",
        "dato": "1 año",
        "verificar": true
      }
    ],
    "procesador": {
      "marca": "Intel",
      "modelo": "Core 5 210H",
      "serie": "Intel Core 5",
      "nucleos": 8,
      "hilos": 12,
      "frecuenciaMax": "4.8 GHz",
      "npuTops": null,
      "queSignifica": "Procesador de entrada para gaming; no trae NPU dedicada de IA.",
      "comoDecirlo": "Rinde bien para jugar y la multitarea del día a día; la IA la mueve la tarjeta de video, no un chip aparte.",
      "paraQueAlcanza": [
        "Gaming eSports y juegos actuales en calidad media",
        "Streaming mientras juega",
        "Multitarea cotidiana"
      ]
    },
    "memoria": {
      "ram": "8 o 16 GB",
      "tipoRam": "DDR5",
      "almacenamiento": "512 GB SSD",
      "caso": "se-suma",
      "comoDecirlo": "Trae 2 ranuras de RAM ampliable; la cantidad de fábrica cambia según la tienda, confirma en la etiqueta del equipo en exhibición."
    },
    "pantallaDetalle": {
      "pulgadas": 16,
      "resolucion": "1920x1200 (FHD+)",
      "tipo": "IPS",
      "hz": 144,
      "nits": 300,
      "comoDecirlo": "Pantalla de 16 pulgadas en formato 16:10 a 144Hz: más alto para ver más del juego y de los documentos."
    },
    "clienteIdeal": "Quien entra al PC gaming sin gastar de más, viniendo de consola o de un portátil de oficina.",
    "leAlcanzaPara": [
      "Gaming eSports y juegos actuales en calidad media",
      "Streaming mientras juega",
      "Multitarea cotidiana"
    ],
    "noEsPara": [
      "Jugar en calidad alta o 1440p (para eso, el TUF F15 con RTX 4060)",
      "Quien busca el chasis premium de ROG"
    ],
    "ganchos": [
      {
        "cliente": "Su primer PC gamer",
        "frase": "Con el F16 entras con RTX y pantalla de 144 Hz, y el chasis aguanta el trajín del día a día."
      },
      {
        "cliente": "Quiere entrar al gaming sin gastar de más",
        "frase": "La entrada al gaming de ASUS con chasis reforzado, sin pagar por potencia que no vas a usar todavía."
      },
      {
        "cliente": "Duda entre TUF y ROG de entrada",
        "frase": "Mismo grado militar MIL-STD-810H que toda la línea TUF; ROG apunta a más potencia y más precio."
      }
    ],
    "objeciones": [
      {
        "dice": "¿Por qué no un ROG?",
        "responde": "TUF es la entrada al gaming de ASUS con chasis reforzado. ROG apunta a más potencia y más precio; si el cliente quiere jugar bien sin pagar de más, TUF es la opción."
      },
      {
        "dice": "¿Cuánto dura la batería jugando?",
        "responde": "Para jugar, siempre conectado: ningún portátil gamer da su máxima potencia con batería. Los 56 Wh sirven para clases y trabajo."
      },
      {
        "dice": "¿Se puede mejorar después?",
        "responde": "Sí: trae 2 ranuras de RAM, así que la memoria se puede ampliar. Confirma en la ficha el máximo del equipo."
      }
    ],
    "compararCon": {
      "abajo": null,
      "arriba": {
        "id": "tuf-gaming-f15-fx507vv-rtx4060",
        "diferencias": [
          "Más núcleos e hilos (Core i7 vs Core 5)",
          "GPU más potente (RTX 4060 vs RTX 3050), con MUX Switch",
          "Batería más grande (90 Wh vs 56 Wh)"
        ]
      }
    },
    "quiz": [
      {
        "pregunta": "¿Qué GPU trae el TUF Gaming F16?",
        "opciones": [
          "NVIDIA GeForce RTX 3050",
          "NVIDIA GeForce RTX 4060",
          "NVIDIA GeForce RTX 5050",
          "No trae GPU dedicada"
        ],
        "correcta": 0,
        "explicacion": "El F16 (FX607VJB) trae RTX 3050 con 6GB GDDR6; el F15 trae RTX 4060."
      },
      {
        "pregunta": "¿Qué certificación de durabilidad tiene este equipo?",
        "opciones": [
          "MIL-STD-810H, norma de pruebas del Departamento de Defensa de EE. UU.",
          "Certificación IP68 de resistencia al agua",
          "Ninguna, es exclusiva de ROG",
          "Garantía militar de por vida"
        ],
        "correcta": 0,
        "explicacion": "MIL-STD-810H prueba caídas, vibración, humedad y temperatura; hace al equipo más resistente, no indestructible."
      },
      {
        "pregunta": "¿Se puede ampliar la memoria RAM más adelante?",
        "opciones": [
          "No, viene soldada",
          "Sí, tiene 2 ranuras de RAM ampliable",
          "Solo con un adaptador USB externo",
          "Solo en centro de servicio autorizado"
        ],
        "correcta": 1,
        "explicacion": "Trae 2 ranuras; la cantidad de fábrica varía según la tienda, pero siempre se puede ampliar."
      },
      {
        "pregunta": "¿Para qué cliente es ideal este TUF F16?",
        "opciones": [
          "Quien entra al PC gaming sin gastar de más",
          "Un creador de contenido profesional de video 8K",
          "Quien busca el chasis premium de ROG",
          "Alguien que solo navega en internet"
        ],
        "correcta": 0,
        "explicacion": "Es el punto de entrada del segmento gamer TUF, pensado para quien viene de consola o de un portátil de oficina."
      },
      {
        "pregunta": "¿Cuál es la tasa de refresco de su pantalla?",
        "opciones": [
          "60 Hz",
          "90 Hz",
          "144 Hz",
          "240 Hz"
        ],
        "correcta": 2,
        "explicacion": "Pantalla de 16\" FHD+ a 144 Hz: el movimiento se ve más fluido que en una pantalla común de 60 Hz."
      }
    ],
    "duracionMin": 12,
    "dificultad": "básico"
  },
  {
    "slug": "tuf-gaming-f15-fx507vv-rtx4060",
    "linea": "tuf",
    "nombre": "ASUS TUF Gaming F15 — RTX 4060",
    "codigo": "FX507VV",
    "tagline": "El salto de rendimiento dentro de TUF: Core i7, RTX 4060 con MUX Switch y 90 Wh de batería.",
    "intro": "Quien juega en serio y quiere rendimiento real en calidad alta, sin pasarse todavía al precio de un ROG.",
    "ficha": [
      {
        "componente": "Sistema operativo",
        "dato": "Windows 11 Home",
        "verificar": true
      },
      {
        "componente": "Procesador",
        "dato": "Intel Core i7-13620H · 10 núcleos / 16 hilos · hasta 4,9 GHz"
      },
      {
        "componente": "Memoria RAM",
        "dato": "16 GB DDR5-4800, 2 ranuras, ampliable"
      },
      {
        "componente": "Tarjeta de video",
        "dato": "NVIDIA GeForce RTX 4060, 8 GB GDDR6, hasta 140W, con MUX Switch"
      },
      {
        "componente": "Pantalla",
        "dato": "15,6\" FHD (1920x1080), 144 Hz, 100% sRGB, G-SYNC"
      },
      {
        "componente": "Almacenamiento",
        "dato": "SSD 512 GB o 1 TB M.2 NVMe PCIe 4.0 (varía según la tienda)",
        "verificar": true
      },
      {
        "componente": "Batería",
        "dato": "90 Wh"
      },
      {
        "componente": "Portabilidad",
        "dato": "Aprox. 2.2 kg"
      },
      {
        "componente": "Garantía",
        "dato": "1 año",
        "verificar": true
      }
    ],
    "procesador": {
      "marca": "Intel",
      "modelo": "Core i7-13620H",
      "serie": "Intel Core HX",
      "nucleos": 10,
      "hilos": 16,
      "frecuenciaMax": "4.9 GHz",
      "npuTops": null,
      "queSignifica": "Procesador de rendimiento para gaming; no trae NPU dedicada de IA.",
      "comoDecirlo": "Rápido para jugar en calidad alta y hacer varias cosas a la vez; la IA la mueve la tarjeta de video, no un chip aparte.",
      "paraQueAlcanza": [
        "Gaming en calidad alta, empezando en 1440p",
        "Streaming mientras juega",
        "Multitarea pesada"
      ]
    },
    "memoria": {
      "ram": "16 GB",
      "tipoRam": "DDR5-4800",
      "almacenamiento": "512 GB o 1 TB SSD",
      "caso": "se-suma",
      "comoDecirlo": "Trae 16GB en dos ranuras; si el cliente necesita más, se le puede sumar otro módulo sin quitar el actual."
    },
    "pantallaDetalle": {
      "pulgadas": 15.6,
      "resolucion": "1920x1080 (Full HD)",
      "tipo": "IPS, 100% sRGB, G-SYNC",
      "hz": 144,
      "nits": 300,
      "comoDecirlo": "Pantalla de 144Hz con G-SYNC: se ve fluida y sin cortes de imagen en juegos de acción."
    },
    "clienteIdeal": "Quien juega en serio y quiere rendimiento real en calidad alta, sin pasarse todavía al precio de un ROG.",
    "leAlcanzaPara": [
      "Gaming en calidad alta, empezando en 1440p",
      "Streaming mientras juega",
      "Multitarea pesada"
    ],
    "noEsPara": [
      "Pantalla Mini-LED o chasis premium (eso es ROG)",
      "Quien no necesita tanta potencia gráfica (ahí rinde mejor el F16)"
    ],
    "ganchos": [
      {
        "cliente": "Juega en serio y quiere buen rendimiento",
        "frase": "RTX 4060 con MUX Switch: la gráfica le manda la imagen directo a la pantalla, sin pasar por el procesador, para más FPS."
      },
      {
        "cliente": "Pregunta si le alcanza para los juegos del momento",
        "frase": "Para juegos actuales en calidad alta, con DLSS 3 y generación de cuadros, sí corre bien."
      },
      {
        "cliente": "Duda entre TUF F15 y un ROG",
        "frase": "Mismo grado militar MIL-STD-810H; el salto a ROG es más potencia y más precio, no más resistencia."
      }
    ],
    "objeciones": [
      {
        "dice": "¿Por qué no un ROG?",
        "responde": "TUF es la entrada al gaming de ASUS con chasis reforzado. ROG apunta a más potencia y más precio; si el cliente quiere rendimiento alto sin pagar de más, el F15 es la opción."
      },
      {
        "dice": "¿Cuánto dura la batería jugando?",
        "responde": "Para jugar, siempre conectado: ningún portátil gamer da su máxima potencia con batería. Los 90 Wh sirven para clases y trabajo."
      },
      {
        "dice": "¿Se puede mejorar después?",
        "responde": "Sí: trae 2 ranuras de RAM, así que la memoria se puede ampliar. Confirma en la ficha el máximo del equipo."
      }
    ],
    "compararCon": {
      "abajo": {
        "id": "tuf-gaming-f16-fx607vjb-rtx3050",
        "diferencias": [
          "Menos núcleos e hilos (Core 5 vs Core i7)",
          "GPU de entrada (RTX 3050 vs RTX 4060), sin MUX Switch",
          "Batería más chica (56 Wh vs 90 Wh)"
        ]
      },
      "arriba": null
    },
    "quiz": [
      {
        "pregunta": "¿Qué GPU trae el TUF Gaming F15?",
        "opciones": [
          "NVIDIA GeForce RTX 3050",
          "NVIDIA GeForce RTX 4060",
          "NVIDIA GeForce RTX 5070",
          "No trae GPU dedicada"
        ],
        "correcta": 1,
        "explicacion": "El F15 (FX507VV) trae RTX 4060 con 8GB GDDR6 y hasta 140W; el F16 trae RTX 3050."
      },
      {
        "pregunta": "¿Qué hace el MUX Switch de este equipo?",
        "opciones": [
          "Manda la imagen de la gráfica directo a la pantalla, sin pasar por el procesador, para más FPS",
          "Enfría el teclado",
          "Cambia el color RGB del chasis",
          "Amplía la memoria RAM"
        ],
        "correcta": 0,
        "explicacion": "El MUX Switch evita que la imagen pase por el procesador integrado: se traduce en más FPS en los juegos."
      },
      {
        "pregunta": "¿Cuánto dura la batería jugando?",
        "opciones": [
          "Todo el día jugando, sin cable",
          "Para jugar, siempre conectado; la batería es para clases y trabajo",
          "No tiene batería",
          "Solo 30 minutos"
        ],
        "correcta": 1,
        "explicacion": "Ningún portátil gamer da su máxima potencia con batería; los 90 Wh rinden para uso cotidiano, no para jugar desconectado."
      },
      {
        "pregunta": "¿Qué certificación de durabilidad comparte con el resto de la línea TUF?",
        "opciones": [
          "MIL-STD-810H",
          "IP68",
          "Ninguna, es exclusiva de ROG",
          "ISO 9001"
        ],
        "correcta": 0,
        "explicacion": "Toda la línea TUF, incluido el F15, se prueba bajo la norma de durabilidad MIL-STD-810H."
      },
      {
        "pregunta": "¿Para qué cliente es ideal este TUF F15?",
        "opciones": [
          "Quien juega en serio y quiere rendimiento alto sin pasarse al precio de un ROG",
          "Alguien que solo navega en internet",
          "Un cliente que busca el equipo más barato del catálogo",
          "Quien necesita la pantalla más grande posible"
        ],
        "correcta": 0,
        "explicacion": "Es el nivel de rendimiento dentro de TUF, un escalón arriba del F16, sin llegar al precio de ROG."
      }
    ],
    "duracionMin": 12,
    "dificultad": "intermedio"
  },
  {
    "slug": "rog-strix-g16-rtx5070ti",
    "linea": "rog",
    "nombre": "ASUS ROG Strix G16 — RTX 5070 Ti",
    "codigo": "G615",
    "tagline": "El salto de TUF a ROG: mejor pantalla, mejor refrigeración y una GPU más arriba en la escala.",
    "intro": "Gamer o creador que quiere dar el salto de TUF a ROG: mejor pantalla y refrigeración, sin llegar todavía al tope de gama.",
    "ficha": [
      {
        "componente": "Sistema operativo",
        "dato": "Windows 11 Home"
      },
      {
        "componente": "Procesador",
        "dato": "Intel Core Ultra 9 HX (familia Arrow Lake-HX)",
        "verificar": true
      },
      {
        "componente": "Memoria RAM",
        "dato": "32 GB DDR5-5600"
      },
      {
        "componente": "Tarjeta de video",
        "dato": "NVIDIA GeForce RTX 5070 Ti para portátil",
        "verificar": true
      },
      {
        "componente": "IA / NPU",
        "dato": "NPU integrada en el procesador, no llega a 40 TOPS",
        "verificar": true
      },
      {
        "componente": "Pantalla",
        "dato": "16\" Mini-LED 240Hz, 2560x1600 (2.5K)",
        "verificar": true
      },
      {
        "componente": "Almacenamiento",
        "dato": "SSD 1 TB M.2 NVMe PCIe 4.0",
        "verificar": true
      },
      {
        "componente": "Batería",
        "dato": "Autonomía variable según uso (estimado, sin confirmar)"
      },
      {
        "componente": "Portabilidad",
        "dato": "Aprox. 2.5 kg (estimado, sin confirmar)"
      },
      {
        "componente": "Garantía",
        "dato": "1 año",
        "verificar": true
      }
    ],
    "procesador": {
      "marca": "Intel",
      "modelo": "Core Ultra 9 HX",
      "serie": "Intel Core Ultra (Arrow Lake-HX)",
      "nucleos": 24,
      "hilos": 24,
      "frecuenciaMax": "5.4 GHz",
      "npuTops": 13,
      "queSignifica": "Trae NPU integrada, pero no llega a los 40 TOPS que exige Copilot+ PC; para IA pesada el equipo usa la GPU.",
      "comoDecirlo": "Procesador de gama muy alta para gaming exigente; la IA pesada la mueve la tarjeta de video, no la NPU.",
      "paraQueAlcanza": [
        "Gaming en 1440p/4K liviano",
        "Streaming y edición de video",
        "Multitarea extrema"
      ]
    },
    "memoria": {
      "ram": "32 GB",
      "tipoRam": "DDR5-5600",
      "almacenamiento": "1 TB SSD",
      "caso": "se-suma",
      "comoDecirlo": "Trae 32GB en dos módulos; si hay ranura libre se puede sumar más memoria sin reemplazar la actual."
    },
    "pantallaDetalle": {
      "pulgadas": 16,
      "resolucion": "2560x1600 (2.5K)",
      "tipo": "Mini-LED",
      "hz": 240,
      "nits": 500,
      "comoDecirlo": "Pantalla Mini-LED de alta gama: colores muy vivos, negros profundos y movimiento súper fluido."
    },
    "clienteIdeal": "Gamer o creador que quiere dar el salto de TUF a ROG: mejor pantalla y refrigeración, sin llegar todavía al tope de gama.",
    "leAlcanzaPara": [
      "Gaming en 1440p/4K liviano",
      "Streaming y edición de video",
      "Multitarea extrema"
    ],
    "noEsPara": [
      "Quien tiene presupuesto ajustado (para eso está TUF)",
      "Quien prioriza equipo liviano sobre potencia"
    ],
    "ganchos": [
      {
        "cliente": "Quiere el salto de TUF a ROG",
        "frase": "El salto de TUF a ROG: mejor pantalla, mejor refrigeración y una GPU más arriba en la escala."
      },
      {
        "cliente": "Le importa mucho la calidad de imagen",
        "frase": "Pantalla Mini-LED mucho más vistosa que la línea TUF."
      },
      {
        "cliente": "Juega sesiones largas y le preocupa el calor",
        "frase": "Rendimiento sostenido en sesiones largas gracias a la refrigeración ROG."
      }
    ],
    "objeciones": [
      {
        "dice": "¿Por qué pagar más que el TUF 5070 si la GPU no es tan distinta?",
        "responde": "No es solo la GPU: la pantalla Mini-LED, el chasis y la refrigeración de ROG dan más rendimiento sostenido en sesiones largas."
      },
      {
        "dice": "¿Es Copilot+ PC por tener tanta potencia?",
        "responde": "No. Su NPU no llega a los 40 TOPS que exige Microsoft; la IA pesada la mueve la tarjeta de video, no la NPU."
      }
    ],
    "compararCon": {
      "abajo": {
        "id": "tuf-gaming-16-fx610jp-rtx5070",
        "diferencias": [
          "Mismo nivel de GPU",
          "Chasis y pantalla TUF, más económico"
        ]
      },
      "arriba": {
        "id": "rog-strix-scar18-rtx5080",
        "diferencias": [
          "Sube a pantalla de 18\"",
          "Más RAM",
          "GPU notablemente más potente"
        ]
      }
    },
    "quiz": [
      {
        "pregunta": "¿Qué GPU trae el ROG Strix G16 de entrada?",
        "opciones": [
          "RTX 5070 Ti",
          "RTX 5070",
          "RTX 5090",
          "RTX 5050"
        ],
        "correcta": 0,
        "explicacion": "Es el escalón justo arriba del TUF RTX 5070."
      },
      {
        "pregunta": "¿Qué gana el cliente al pasar del TUF 5070 al ROG Strix G16?",
        "opciones": [
          "Pantalla Mini-LED, mejor refrigeración y una GPU más potente",
          "Nada, son exactamente el mismo equipo",
          "Pierde la GPU dedicada",
          "Pierde la pantalla"
        ],
        "correcta": 0,
        "explicacion": "ROG suma pantalla, chasis y refrigeración mejores sobre la misma base de potencia."
      },
      {
        "pregunta": "¿Es Copilot+ PC este equipo, siendo tan potente?",
        "opciones": [
          "No, su NPU no llega a los 40 TOPS que exige Microsoft",
          "Sí, por ser tan potente es automáticamente Copilot+",
          "Sí, todos los Intel Core Ultra son Copilot+",
          "No tiene ningún tipo de IA"
        ],
        "correcta": 0,
        "explicacion": "La potencia de la GPU no define Copilot+ PC; eso depende de los TOPS de la NPU."
      },
      {
        "pregunta": "¿Qué tipo de pantalla trae?",
        "opciones": [
          "16\" Mini-LED 240Hz",
          "14\" OLED 60Hz",
          "18\" IPS 60Hz",
          "13\" HD 60Hz"
        ],
        "correcta": 0,
        "explicacion": "Trae pantalla Mini-LED de 16 pulgadas a 240Hz."
      },
      {
        "pregunta": "¿Por qué pagar más que el TUF 5070 si la GPU no es tan distinta?",
        "opciones": [
          "La pantalla, el chasis y la refrigeración dan más rendimiento sostenido",
          "No hay ninguna diferencia real",
          "El TUF no trae pantalla",
          "El ROG no trae teclado"
        ],
        "correcta": 0,
        "explicacion": "El plus de ROG está en la experiencia completa, no solo en la GPU."
      },
      {
        "pregunta": "El cliente pregunta si le puede subir la memoria RAM más adelante. ¿Qué le respondes?",
        "opciones": [
          "No, la memoria viene soldada a la placa y no se puede ampliar en este equipo.",
          "Sí, se le puede sumar un módulo adicional sin tocar el que ya tiene, porque le queda una ranura libre.",
          "Sí, pero hay que cambiar el módulo que ya tiene por uno más grande, porque solo tiene una ranura.",
          "Sí, pero solo se puede subir llevándolo a un centro de servicio autorizado, nunca en la tienda."
        ],
        "correcta": 1,
        "explicacion": "Trae 32GB en dos módulos; si hay ranura libre se puede sumar más memoria sin reemplazar la actual."
      },
      {
        "pregunta": "¿Cuánto almacenamiento SSD trae este equipo?",
        "opciones": [
          "512 GB",
          "2 TB",
          "1 TB",
          "256 GB"
        ],
        "correcta": 2,
        "explicacion": "Trae 1 TB SSD: suficiente para guardar fotos, documentos, juegos o programas sin quedarse corto."
      }
    ],
    "duracionMin": 5,
    "dificultad": "básico",
    "imagen": "/products/rog-strix-g16-rtx5070ti.svg"
  },
  {
    "slug": "rog-strix-scar18-rtx5080",
    "linea": "rog",
    "nombre": "ASUS ROG Strix SCAR 18 — RTX 5080",
    "codigo": "G835LX",
    "tagline": "Pantalla Mini-LED de 18 pulgadas y una GPU que mueve casi cualquier juego al máximo.",
    "intro": "Gamer o creador que quiere pantalla grande e inmersiva con rendimiento de gama muy alta, sin llegar todavía al tope absoluto.",
    "ficha": [
      {
        "componente": "Sistema operativo",
        "dato": "Windows 11 Home"
      },
      {
        "componente": "Procesador",
        "dato": "Intel Core Ultra 9 275HX"
      },
      {
        "componente": "Memoria RAM",
        "dato": "32 GB DDR5-5600"
      },
      {
        "componente": "Tarjeta de video",
        "dato": "NVIDIA GeForce RTX 5080 para portátil"
      },
      {
        "componente": "IA / NPU",
        "dato": "NPU integrada, no llega a 40 TOPS"
      },
      {
        "componente": "Pantalla",
        "dato": "18\" Mini-LED 240Hz, 2560x1600 (2.5K)"
      },
      {
        "componente": "Almacenamiento",
        "dato": "SSD 2 TB M.2 NVMe PCIe 4.0",
        "verificar": true
      },
      {
        "componente": "Conectividad",
        "dato": "Wi-Fi 7, Thunderbolt 5",
        "verificar": true
      },
      {
        "componente": "Portabilidad",
        "dato": "Aprox. 3 kg (estimado, sin confirmar)"
      },
      {
        "componente": "Garantía",
        "dato": "1 año",
        "verificar": true
      }
    ],
    "procesador": {
      "marca": "Intel",
      "modelo": "Core Ultra 9 275HX",
      "serie": "Intel Core Ultra (Arrow Lake-HX)",
      "nucleos": 24,
      "hilos": 24,
      "frecuenciaMax": "5.4 GHz",
      "npuTops": 13,
      "queSignifica": "Trae NPU integrada, pero no llega a los 40 TOPS que exige Copilot+ PC; para IA pesada el equipo usa la GPU.",
      "comoDecirlo": "Es de los procesadores más potentes para gaming del catálogo; la IA pesada la mueve la GPU, no la NPU.",
      "paraQueAlcanza": [
        "Gaming en 1440p/4K a tope",
        "Streaming y edición de video pesada",
        "Multitarea extrema"
      ]
    },
    "memoria": {
      "ram": "32 GB",
      "tipoRam": "DDR5-5600",
      "almacenamiento": "2 TB SSD",
      "caso": "se-suma",
      "comoDecirlo": "Trae 32GB de fábrica; si no viene al tope de RAM soportada, se puede sumar más memoria sin reemplazar la actual."
    },
    "pantallaDetalle": {
      "pulgadas": 18,
      "resolucion": "2560x1600 (2.5K)",
      "tipo": "Mini-LED",
      "hz": 240,
      "nits": 600,
      "comoDecirlo": "Pantalla Mini-LED de 18 pulgadas: máxima inmersión, colores muy vivos y movimiento súper fluido."
    },
    "clienteIdeal": "Gamer o creador que quiere pantalla grande e inmersiva con rendimiento de gama muy alta, sin llegar todavía al tope absoluto.",
    "leAlcanzaPara": [
      "Gaming en 1440p/4K a tope",
      "Streaming y edición de video pesada",
      "Multitarea extrema"
    ],
    "noEsPara": [
      "Quien tiene presupuesto ajustado (para eso está TUF)",
      "Quien necesita un equipo liviano de 14-15\""
    ],
    "ganchos": [
      {
        "cliente": "Quiere la pantalla más grande e inmersiva",
        "frase": "Pantalla Mini-LED de 18 pulgadas y una GPU que mueve casi cualquier juego al máximo."
      },
      {
        "cliente": "Juega sesiones muy largas",
        "frase": "Refrigeración de gama muy alta para sesiones largas sin perder rendimiento."
      },
      {
        "cliente": "Quiere algo confirmado y real, no un rumor",
        "frase": "Es de las configuraciones más potentes que vende ASUS, confirmada para su lanzamiento 2025."
      }
    ],
    "objeciones": [
      {
        "dice": "¿Vale la pena el salto de 16\" a 18\"?",
        "responde": "Para quien juega sentado en un mismo lugar, sí: más inmersión y mejor disipación de calor por el chasis más grande."
      },
      {
        "dice": "¿Es Copilot+ PC por ser tan potente?",
        "responde": "No. Su NPU no llega a los 40 TOPS que exige Microsoft, aunque la GPU sea mucho más potente que la de un Copilot+ PC típico."
      }
    ],
    "compararCon": {
      "abajo": {
        "id": "rog-strix-g16-rtx5070ti",
        "diferencias": [
          "Pantalla más chica (16\")",
          "GPU un escalón más abajo"
        ]
      },
      "arriba": {
        "id": "rog-strix-scar18-rtx5090",
        "diferencias": [
          "Mismo chasis y pantalla",
          "La GPU más potente que vende ASUS"
        ]
      }
    },
    "quiz": [
      {
        "pregunta": "¿Qué GPU trae el ROG Strix SCAR 18 en esta configuración?",
        "opciones": [
          "RTX 5080",
          "RTX 5070 Ti",
          "RTX 5090",
          "RTX 5060"
        ],
        "correcta": 0,
        "explicacion": "Esta configuración trae RTX 5080 para portátil."
      },
      {
        "pregunta": "¿Qué tamaño de pantalla trae el SCAR 18?",
        "opciones": [
          "18\" Mini-LED 240Hz",
          "16\" IPS 144Hz",
          "14\" OLED 60Hz",
          "13\" HD 60Hz"
        ],
        "correcta": 0,
        "explicacion": "El SCAR 18 trae pantalla Mini-LED de 18 pulgadas a 240Hz."
      },
      {
        "pregunta": "¿Vale la pena el salto de 16\" a 18\"?",
        "opciones": [
          "Para quien juega sentado en un mismo lugar, sí: más inmersión y mejor disipación",
          "Nunca vale la pena, es solo más pesado",
          "Solo si el cliente va a viajar con el equipo a diario",
          "No cambia nada en el rendimiento"
        ],
        "correcta": 0,
        "explicacion": "El chasis más grande ayuda a disipar calor y da más inmersión."
      },
      {
        "pregunta": "¿Es Copilot+ PC a pesar de ser tan potente?",
        "opciones": [
          "No, su NPU no llega a los 40 TOPS exigidos",
          "Sí, siempre que tenga GPU RTX",
          "Sí, por tener Intel Core Ultra",
          "No tiene ningún tipo de IA integrada"
        ],
        "correcta": 0,
        "explicacion": "Ni la potencia de la GPU ni traer Core Ultra garantizan la certificación Copilot+."
      },
      {
        "pregunta": "¿Qué procesador trae este equipo?",
        "opciones": [
          "Intel Core Ultra 9 275HX",
          "Intel Core i3",
          "AMD Ryzen 3",
          "Snapdragon X X1"
        ],
        "correcta": 0,
        "explicacion": "Confirmado en el lanzamiento 2025 del ROG Strix SCAR 18."
      },
      {
        "pregunta": "El cliente pregunta si le puede subir la memoria RAM más adelante. ¿Qué le respondes?",
        "opciones": [
          "No, la memoria viene soldada a la placa y no se puede ampliar en este equipo.",
          "Sí, pero hay que cambiar el módulo que ya tiene por uno más grande, porque solo tiene una ranura.",
          "Sí, se le puede sumar un módulo adicional sin tocar el que ya tiene, porque le queda una ranura libre.",
          "Sí, pero solo se puede subir llevándolo a un centro de servicio autorizado, nunca en la tienda."
        ],
        "correcta": 2,
        "explicacion": "Trae 32GB de fábrica; si no viene al tope de RAM soportada, se puede sumar más memoria sin reemplazar la actual."
      },
      {
        "pregunta": "¿Cuánto almacenamiento SSD trae este equipo?",
        "opciones": [
          "1 TB",
          "4 TB",
          "512 GB",
          "2 TB"
        ],
        "correcta": 3,
        "explicacion": "Trae 2 TB SSD: suficiente para guardar fotos, documentos, juegos o programas sin quedarse corto."
      }
    ],
    "duracionMin": 5,
    "dificultad": "intermedio",
    "imagen": "/products/rog-strix-scar18-rtx5080.svg"
  },
  {
    "slug": "rog-strix-scar18-rtx5090",
    "linea": "rog",
    "nombre": "ASUS ROG Strix SCAR 18 — RTX 5090",
    "codigo": "G835LX-SA009W",
    "tagline": "El equipo más potente de todo el catálogo: para el cliente que no quiere ceder nada.",
    "intro": "Gamer o creador que exige el máximo rendimiento posible, sin que el precio sea el criterio principal.",
    "ficha": [
      {
        "componente": "Sistema operativo",
        "dato": "Windows 11 Home"
      },
      {
        "componente": "Procesador",
        "dato": "Intel Core Ultra 9 275HX",
        "verificar": true
      },
      {
        "componente": "Memoria RAM",
        "dato": "64 GB DDR5-6400"
      },
      {
        "componente": "Tarjeta de video",
        "dato": "NVIDIA GeForce RTX 5090 para portátil, hasta 175W TGP"
      },
      {
        "componente": "IA / NPU",
        "dato": "NPU integrada, no llega a 40 TOPS"
      },
      {
        "componente": "Pantalla",
        "dato": "18\" Mini-LED 240Hz, 2560x1600 (2.5K)"
      },
      {
        "componente": "Almacenamiento",
        "dato": "SSD 2 TB M.2 NVMe PCIe 4.0"
      },
      {
        "componente": "Conectividad",
        "dato": "Wi-Fi 7, Thunderbolt 5"
      },
      {
        "componente": "Portabilidad",
        "dato": "Aprox. 3 kg (estimado, sin confirmar)"
      },
      {
        "componente": "Garantía",
        "dato": "1 año",
        "verificar": true
      }
    ],
    "procesador": {
      "marca": "Intel",
      "modelo": "Core Ultra 9 275HX",
      "serie": "Intel Core Ultra (Arrow Lake-HX)",
      "nucleos": 24,
      "hilos": 24,
      "frecuenciaMax": "5.4 GHz",
      "npuTops": 13,
      "queSignifica": "Trae NPU integrada, pero no llega a los 40 TOPS que exige Copilot+ PC; para IA pesada el equipo usa la GPU más potente del catálogo.",
      "comoDecirlo": "Es el procesador más potente del catálogo para gaming; la IA pesada la mueve la GPU, no la NPU.",
      "paraQueAlcanza": [
        "Gaming en 4K a tope",
        "Streaming y edición de video profesional",
        "Renders y multitarea extrema"
      ]
    },
    "memoria": {
      "ram": "64 GB",
      "tipoRam": "DDR5-6400",
      "almacenamiento": "2 TB SSD",
      "caso": "se-suma",
      "comoDecirlo": "Trae hasta 64GB de fábrica en esta configuración; si no viene al tope soportado, se puede sumar más memoria sin reemplazar la actual."
    },
    "pantallaDetalle": {
      "pulgadas": 18,
      "resolucion": "2560x1600 (2.5K)",
      "tipo": "Mini-LED",
      "hz": 240,
      "nits": 600,
      "comoDecirlo": "Pantalla Mini-LED de 18 pulgadas: la mejor experiencia visual del catálogo."
    },
    "clienteIdeal": "Gamer o creador que exige el máximo rendimiento posible, sin que el precio sea el criterio principal.",
    "leAlcanzaPara": [
      "Gaming en 4K a tope",
      "Streaming y edición de video profesional",
      "Renders y multitarea extrema"
    ],
    "noEsPara": [
      "Quien tiene presupuesto ajustado",
      "Quien necesita un equipo liviano para cargar todos los días"
    ],
    "ganchos": [
      {
        "cliente": "No quiere ceder nada en rendimiento",
        "frase": "El equipo más potente de todo el catálogo: para el cliente que no quiere ceder nada."
      },
      {
        "cliente": "Pregunta por la GPU más potente disponible",
        "frase": "GPU RTX 5090: la más potente que vende ASUS en portátil."
      },
      {
        "cliente": "Hace sesiones muy largas de juego o trabajo",
        "frase": "Pantalla Mini-LED de 18 pulgadas y refrigeración pensada para sesiones muy largas."
      }
    ],
    "objeciones": [
      {
        "dice": "¿Para quién es justificable este equipo?",
        "responde": "Para gamers o creadores que exigen el máximo rendimiento posible y para quienes el precio no es el criterio principal."
      },
      {
        "dice": "¿Es Copilot+ PC?",
        "responde": "No, aunque es muy potente, su NPU no llega a los 40 TOPS que exige Microsoft para esa certificación."
      }
    ],
    "compararCon": {
      "abajo": {
        "id": "rog-strix-scar18-rtx5080",
        "diferencias": [
          "Misma pantalla y chasis",
          "Un escalón menos de GPU",
          "Mejor relación precio/rendimiento"
        ]
      },
      "arriba": null
    },
    "quiz": [
      {
        "pregunta": "¿Cuál es la GPU más potente de todo el catálogo ASUS en esta escalera?",
        "opciones": [
          "RTX 5090 (ROG Strix SCAR 18)",
          "RTX 5080",
          "RTX 5070 Ti",
          "RTX 5070"
        ],
        "correcta": 0,
        "explicacion": "Es el tope absoluto de la escala 5050→5090 del catálogo."
      },
      {
        "pregunta": "Un cliente pregunta si este equipo es Copilot+ PC. ¿Qué le respondes?",
        "opciones": [
          "No, aunque es muy potente, su NPU no llega a los 40 TOPS que exige Microsoft",
          "Sí, es el más Copilot+ de todos",
          "Sí, pero solo en modo avión",
          "No tiene ningún chip de IA"
        ],
        "correcta": 0,
        "explicacion": "Trae NPU integrada, pero no cumple el mínimo de 40 TOPS de Copilot+ PC."
      },
      {
        "pregunta": "¿Para quién es justificable este equipo?",
        "opciones": [
          "Gamers o creadores que exigen el máximo rendimiento, sin que el precio sea el criterio principal",
          "Alguien que solo navega en internet",
          "Un estudiante con presupuesto ajustado",
          "Una oficina que solo usa Office"
        ],
        "correcta": 0,
        "explicacion": "Es el tope de gama del catálogo, pensado para quien no quiere ceder nada."
      },
      {
        "pregunta": "¿En qué se diferencia del ROG Strix SCAR 18 con RTX 5080?",
        "opciones": [
          "Misma pantalla y chasis, GPU más potente",
          "Pantalla más chica",
          "Menos RAM",
          "No tiene Wi-Fi"
        ],
        "correcta": 0,
        "explicacion": "Comparten pantalla y chasis; la diferencia está en la GPU."
      },
      {
        "pregunta": "¿Qué tipo de refrigeración y pantalla trae?",
        "opciones": [
          "Refrigeración avanzada y pantalla Mini-LED de 18\"",
          "Sin ventiladores, pantalla básica",
          "Refrigeración líquida externa obligatoria",
          "Pantalla de 13\" HD"
        ],
        "correcta": 0,
        "explicacion": "Pensado para sesiones muy largas sin perder rendimiento."
      },
      {
        "pregunta": "El cliente pregunta si le puede subir la memoria RAM más adelante. ¿Qué le respondes?",
        "opciones": [
          "No, la memoria viene soldada a la placa y no se puede ampliar en este equipo.",
          "Sí, pero hay que cambiar el módulo que ya tiene por uno más grande, porque solo tiene una ranura.",
          "Sí, pero solo se puede subir llevándolo a un centro de servicio autorizado, nunca en la tienda.",
          "Sí, se le puede sumar un módulo adicional sin tocar el que ya tiene, porque le queda una ranura libre."
        ],
        "correcta": 3,
        "explicacion": "Trae hasta 64GB de fábrica en esta configuración; si no viene al tope soportado, se puede sumar más memoria sin reemplazar la actual."
      },
      {
        "pregunta": "¿Cuánto almacenamiento SSD trae este equipo?",
        "opciones": [
          "2 TB",
          "1 TB",
          "4 TB",
          "512 GB"
        ],
        "correcta": 0,
        "explicacion": "Trae 2 TB SSD: suficiente para guardar fotos, documentos, juegos o programas sin quedarse corto."
      }
    ],
    "duracionMin": 5,
    "dificultad": "avanzado",
    "imagen": "/products/rog-strix-scar18-rtx5090.svg"
  }
];

export function getReferencia(slug: string): Referencia | undefined {
  return referencias.find((r) => r.slug === slug);
}
