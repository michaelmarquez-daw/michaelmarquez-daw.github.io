# Portfolio de Michael Márquez Calvo

Mi web personal con los proyectos que he hecho en el ciclo de DAW.

Se puede ver en https://michaelmarquez-daw.github.io

## Tecnologías

HTML, CSS y JavaScript. Publicada con GitHub Pages.

## Estructura

```
index.html          Inicio
sobre-mi.html       Formación y experiencia
proyectos.html      Proyectos del ciclo
contacto.html       Formulario de contacto (abre el programa de correo con mailto)
css/styles.css      Una sola hoja de estilos, pensada primero para móvil
js/main.js          Menú en móvil, año del pie y validación del formulario
assets/             Fuentes en WOFF2, imágenes y el CV en PDF
```

## Verla en local

Al ser una web estática basta con abrir `index.html`, aunque es mejor servirla para que las rutas funcionen igual que en GitHub Pages:

```
py -m http.server 5500
```

y entrar en http://127.0.0.1:5500
