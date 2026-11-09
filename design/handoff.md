# Portfolio de María — traspaso del diseño a Angular

Referencia visual: `design/Main.dc.html` (maqueta en HTML) y `design/chibi-maria.png` (sprite).
Montar desde cero en **Angular (última versión)**. No reutilizar nada del portfolio anterior.

## Decisiones
- **Una sola página**, sin router. Navegación por anclas (`#proyectos`, `#stack`, `#labs`, `#experiencia`, `#contacto`).
- Los proyectos NO viven aquí: cada tarjeta abre el proyecto desplegado en otra pestaña.
- Posicionamiento: desarrolladora full-stack → Application Security (AppSec). 2 años de experiencia, auditorías de accesibilidad, formándose en pentesting.
- Standalone components, signals, control flow `@for` / `@if`. Contenido en `src/app/data/portfolio.data.ts` tipado (proyectos, stack, labs, timeline), no hardcodeado en plantillas.
- Accesibilidad AA desde el principio (es parte del perfil): enlace "saltar al contenido", `<nav>`/`<main>`/`<section aria-labelledby>`, foco visible, `prefers-reduced-motion`, contraste mínimo 4.5:1, `<label for>` en el formulario.

## Tokens
- Fondo `#16161b` · texto `#ececf1` · texto secundario `#a1a1ae` · acento violeta `#a78bfa` (un único acento, variable CSS para poder cambiarlo).
- Superficies: `rgba(255,255,255,0.04)`; bordes `rgba(255,255,255,0.10)`; separadores `rgba(255,255,255,0.08)`; botón outline `rgba(255,255,255,0.22)`.
- Bocadillo terminal: fondo `#101014`. Texto sobre acento: `#16161b`.
- Tipografías (Google Fonts): **Pixelify Sans 700** solo para el nombre (104px), **Inter** 400/500/600 para texto, **JetBrains Mono** 400/500 para etiquetas, rutas, fechas y tags.
- Contenedor `max-width: 1200px`, padding lateral 40px. Radios: tarjetas 12px, botones 8px, píldoras 999px.
- Sin degradados, sin ilustraciones genéricas, sin ventanas falsas de terminal.

## Secciones (en orden)
1. **Nav**: `~/maria_` a la izquierda; `/proyectos /stack /labs /experiencia /contacto` en mono.
2. **Hero**: línea `maria@lopez:~$ whoami` + cursor parpadeante (una vez, sin bucle de escritura), nombre en pixel, "Desarrolladora full-stack" / "→ Application Security" (acento), párrafo, botones **Mi trabajo** (acento) y **Contacto** (outline). A la derecha: sprite de María de pie sobre una línea de suelo, con un bocadillo estilo terminal encima (`$ ./saludar.sh` / `> hola, ¿qué construimos?` + cursor).
3. **01 Proyectos**: cabecera con enlace "más en GitHub ↗". Tarjetas con etiqueta `PROJECT 01`, ↗, título, descripción, tags en píldora y `→ abrir proyecto`. Toda la tarjeta es un enlace externo.
4. **02 Stack**: 3 bloques (Frontend, Backend, Seguridad y a11y) con píldoras.
5. **03 Laboratorios**: tabla tipo log (FECHA / PLATAFORMA / LAB / CATEGORÍA / WRITEUP). Solo writeups de máquinas retiradas.
6. **04 Experiencia y formación**: timeline vertical con etiqueta por entrada (TRABAJO / FORMACIÓN / CERTIFICACIÓN).
7. **05 Contacto**: formulario a la izquierda (nombre, email, mensaje, enviar) y botones pequeños con icono (Email, LinkedIn, GitHub) a la derecha.
8. **Footer**: `© 2026 María`.

## Sprite
`chibi-maria.png`, 28×32 px, fondo transparente con sombra incluida. Mostrar con `image-rendering: pixelated`, ~280px de ancho. La línea de suelo se coloca al 14% desde el borde inferior de la imagen, sobresaliendo 30px por cada lado.

## Contenido real (ya confirmado)
- Nombre: María. Prompt `maria@lopez` (confirmar apellido).
- Experiencia: Desarrolladora frontend junior en Viewnext, proyecto de telecomunicaciones para Orange, desde sep 2024, teletrabajo. Angular, auditorías de accesibilidad.
- Formación: Bootcamp full-stack en Adalab (2024); Angular Junior de certificates.dev (dic 2025); máster de ciberseguridad (en curso).
- Proyectos: Haiku Generator (React, Node.js, Sass, MySQL), Quiz de accesibilidad web (swipe), Localizador de comida vegana.
- Stack: Frontend Angular, React, JavaScript, Sass · Backend Node.js, MySQL · Seguridad y a11y Kali Linux, auditoría a11y.

## Pendiente de María (dejar como `[PLACEHOLDER]` hasta tenerlo)
- Apellido exacto, email, URLs de GitHub y LinkedIn.
- URLs desplegadas de los 3 proyectos; stack del quiz y del localizador; descripción del localizador.
- Un logro concreto de Viewnext.
- Centro del máster. Filas reales de laboratorios.
- Servicio para el formulario (Formspree, EmailJS u otro): por ahora sin envío real.

## Primer prompt para Claude Code
> Lee `design/handoff.md`, `design/Main.dc.html` y mira `design/chibi-maria.png`. Crea un proyecto Angular nuevo con la última versión en esta carpeta y monta la página única respetando el diseño, tokens y accesibilidad descritos. Empieza por la estructura, los estilos globales y el hero; luego el resto de secciones con los datos en `portfolio.data.ts`. Los datos pendientes déjalos como placeholders visibles.