/* JavaScript del portfolio.
   Se carga en todas las páginas con "defer": cuando se ejecuta, el HTML ya está cargado.
   (La clase "no-js" se quita antes, con un pequeño script en el <head> de cada página.) */

/* ---------- 1. Menú en móvil ---------- */
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");

function cerrarMenu() {
  nav.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.textContent = "Menú";
}

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const abierto = nav.classList.toggle("is-open");
    // aria-expanded le dice a los lectores de pantalla si el menú está abierto
    menuButton.setAttribute("aria-expanded", String(abierto));
    menuButton.textContent = abierto ? "Cerrar" : "Menú";
  });

  // Cerrar el menú con la tecla Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      cerrarMenu();
      menuButton.focus();
    }
  });
}

/* ---------- 2. Año actual en el pie de página ---------- */
const year = document.querySelector("[data-year]");
if (year) {
  year.textContent = new Date().getFullYear();
}

/* ---------- 3. Formulario de contacto ----------
   GitHub Pages solo sirve archivos estáticos: no hay servidor que reciba el formulario.
   Por eso validamos aquí y, si todo está bien, abrimos el programa de correo del
   visitante con el mensaje ya escrito (un enlace "mailto:"). */
const form = document.getElementById("contact-form");

if (form) {
  const MI_EMAIL = "michael.marquez.calvo2@gmail.com";
  const PATRON_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const MAX_MENSAJE = 1200;

  // Cada regla devuelve el texto del error, o "" si el valor es correcto
  const reglas = {
    nombre: (valor) => (valor.length < 2 ? "Escribe tu nombre." : ""),
    email: (valor) => (PATRON_EMAIL.test(valor) ? "" : "Escribe un email válido, por ejemplo nombre@empresa.com."),
    mensaje: (valor) => {
      if (valor.length < 10) return "El mensaje es demasiado corto (mínimo 10 caracteres).";
      if (valor.length > MAX_MENSAJE) return `El mensaje es demasiado largo (máximo ${MAX_MENSAJE} caracteres).`;
      return "";
    },
  };

  // Comprueba un campo y muestra u oculta su mensaje de error. Devuelve true si está bien.
  function validarCampo(input) {
    const error = reglas[input.name](input.value.trim());
    const campo = input.closest(".field");

    campo.classList.toggle("has-error", error !== "");
    input.setAttribute("aria-invalid", String(error !== ""));
    campo.querySelector(".error-msg").textContent = error;
    return error === "";
  }

  const campos = form.querySelectorAll("input, textarea");

  // Validamos cada campo al salir de él, para no molestar mientras se escribe
  for (const input of campos) {
    input.addEventListener("blur", () => validarCampo(input));
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // evitamos el envío normal del formulario

    let primerError = null;
    for (const input of campos) {
      const correcto = validarCampo(input);
      if (!correcto && primerError === null) {
        primerError = input;
      }
    }
    if (primerError) {
      primerError.focus();
      return;
    }

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    const asunto = `Contacto desde el portfolio: ${nombre}`;
    // Los enlaces mailto necesitan los saltos de línea como \r\n
    const cuerpo = `${mensaje}\n\n${nombre}\n${email}`.replace(/\r?\n/g, "\r\n");

    // encodeURIComponent convierte espacios, tildes y saltos de línea a un formato válido en una URL
    window.location.href =
      `mailto:${MI_EMAIL}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;

    // No podemos saber si el programa de correo se ha abierto, así que no lo damos por hecho
    form.querySelector(".form-status").textContent =
      `Debería abrirse tu programa de correo con el mensaje preparado. Si no se abre, escríbeme a ${MI_EMAIL}.`;
  });
}
