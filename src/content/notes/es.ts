import type { NoteTranslations } from "./types";

export const es: NoteTranslations = {
  "one-sign-in-many-apps": {
    title: "Un inicio de sesión para muchas apps",
    summary:
      "Cómo los productos de The Circular Net pasaron a un único servicio de inicio de sesión con OAuth 2.0, y las reglas que lo mantienen seguro.",
    blocks: [
      {
        type: "p",
        text: "En The Circular Net, cada producto tenía su propio inicio de sesión. Con una sola app funciona. Con una app web, una app móvil, un producto de eventos y un sitio corporativo, son cuatro lugares donde arreglar cada fallo de autenticación, y gente haciendo malabares con varias contraseñas para una misma empresa.",
      },
      { type: "h", text: "La forma" },
      {
        type: "p",
        text: "El inicio de sesión pasó a ser una app propia, en su propio dominio. Los productos ya no muestran un formulario de acceso. Envían a la gente al servicio SSO con su ID de cliente y una URL de redirección; el servicio inicia la sesión y la devuelve con un código de corta duración, que el producto cambia por tokens.",
      },
      { type: "diagram", id: "sso", caption: "Todos los productos inician sesión en un solo servicio." },
      { type: "h", text: "Las reglas que importan" },
      {
        type: "list",
        items: [
          "Validar el cliente y la URL de redirección contra un registro, siempre. Una página de acceso que redirige a cualquier sitio es un kit de phishing con tu logo.",
          "Enviar un valor de estado y comprobarlo cuando la persona vuelve. Así una respuesta falsificada no puede iniciar sesión por nadie.",
          "Mantener los proveedores sociales detrás del SSO. Los productos nunca hablan directamente con Google o Apple, así que añadir un proveedor es un solo cambio.",
          "Hacer visible la transición. Una página breve de «te llevamos de vuelta» es mejor que una redirección en blanco cuando algo va lento.",
        ],
      },
      { type: "h", text: "Las contrapartidas" },
      {
        type: "p",
        text: "Un servicio aparte es una cosa más que desplegar y vigilar, y todos los productos dependen de él. A cambio, los arreglos de autenticación se hacen una vez, las revisiones de seguridad tienen un único objetivo y un producto nuevo obtiene el inicio de sesión registrando un cliente en lugar de construir un formulario.",
      },
      { type: "p", text: "Si lo hiciera de nuevo, introduciría el SSO con el segundo producto, no con el cuarto." },
    ],
  },
  "share-logic-not-screens": {
    title: "Compartir lógica, no pantallas",
    summary:
      "Qué entró en el paquete compartido entre las apps de Next.js y Expo de Circular Ticket, qué se quedó fuera y por qué.",
    blocks: [
      {
        type: "p",
        text: "Circular Ticket empezó como una app web. Cuando llegó la app móvil, lo más rápido era copiar las llamadas a la API y las reglas. En pocas semanas, las dos apps discrepaban en cosas pequeñas pero importantes: cómo formatear una cantidad en nairas, qué estados de pedido cuentan como pagados, cuándo puede quien organiza solicitar un pago.",
      },
      { type: "h", text: "Un paquete, tres reglas" },
      {
        type: "p",
        text: "Ambas apps pasaron a un monorepo con npm workspaces y un único paquete compartido. Sigue tres reglas:",
      },
      {
        type: "list",
        items: [
          "Compartir lo que debe coincidir: servicios de API, hooks de consultas, esquemas de validación, formato de moneda, mapeo de estados y reglas de negocio como la elegibilidad de pagos.",
          "No compartir pantallas. La interfaz de cada app sigue siendo nativa de su plataforma, así ninguna parece una adaptación de la otra.",
          "Nada de imports de plataforma en el código compartido. Si un módulo necesita el DOM o una API nativa, no pertenece al paquete.",
        ],
      },
      { type: "diagram", id: "circularTicket", caption: "Dos apps, un paquete compartido." },
      { type: "h", text: "Lo difícil son las dependencias" },
      {
        type: "p",
        text: "El código se movió sin problema. Las versiones, no. React, TanStack Query y la biblioteca de validación deben resolverse a las mismas versiones en ambas apps, y el hoisting de paquetes se comporta distinto en Next.js y en Metro. Las versiones se alinean en un solo lugar, y los cambios del lockfile se revisan.",
      },
      { type: "h", text: "¿Valió la pena?" },
      {
        type: "p",
        text: "Sí. Cambiar cuándo se puede solicitar un pago ahora se hace en un solo archivo, y ambas apps lo reciben. Web y móvil ya no pueden discrepar sobre el dinero, y solo eso justificó el cambio.",
      },
    ],
  },
  "filter-before-you-think": {
    title: "Filtra antes de pensar",
    summary: "El diseño de Stock Bot, un agente LLM programado que lee la bolsa de Nigeria con un presupuesto mínimo.",
    blocks: [
      {
        type: "p",
        text: "Stock Bot es un pequeño agente en construcción. Cada día encuentra las acciones de la bolsa de Nigeria que bajaron, decide qué caídas parecen oportunidades y me envía la lista por Telegram. Lo interesante no es el LLM, sino todo lo que lo rodea.",
      },
      { type: "h", text: "El pipeline" },
      { type: "diagram", id: "stockBot", caption: "Una ejecución diaria, del horario al informe." },
      {
        type: "list",
        items: [
          "Una programación de EventBridge lanza una función Lambda una vez al día.",
          "La función obtiene las mayores caídas del día en lugar de todas las empresas cotizadas.",
          "Para cada una revisa cinco días de precios guardados en DynamoDB, para confirmar una caída real y no un solo día de ruido.",
          "Solo las que pasan el filtro van a Gemini con un prompt estructurado, y las mejores opciones llegan a Telegram.",
        ],
      },
      { type: "h", text: "Por qué filtrar primero" },
      {
        type: "p",
        text: "Las llamadas al LLM son el paso más lento y caro, así que van al final. El código sencillo descarta gratis la mayoría de candidatas, y el modelo solo juzga las pocas que merecen juicio. La idea vale para cualquier agente: deja que pasos baratos y deterministas acoten el problema, y gasta inteligencia donde cambia la respuesta.",
      },
      { type: "h", text: "Paquetes pequeños, menos sorpresas" },
      {
        type: "p",
        text: "Mi primera versión usaba pandas, y el paquete de Lambda quedaba demasiado grande para desplegarlo sin capas extra. Cambiarlo por un parser HTML ligero resolvió el problema. Serverless premia las dependencias aburridas.",
      },
      {
        type: "p",
        text: "Sigue en curso: el pipeline funciona en local y el despliegue se está terminando. Lo siguiente es registrar cada elección y medir los juicios del modelo frente a lo que realmente hizo el mercado.",
      },
    ],
  },
};
