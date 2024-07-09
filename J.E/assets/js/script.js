'use strict';

// script.js

document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.btn-action.agregar-carrito');
    const lista = document.querySelector("#lista-carrito tbody");
    const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
    const carrito = document.querySelector("#carrito");
    const heartButton = document.getElementById("heart-button");
    const countDisplay = heartButton.querySelector('.count');

    // Contador de elementos en el carrito
    let cartItemCount = 0;

    function cargarEventListeners() {
        // Asignar el evento de click a cada botón de agregar al carrito
        addToCartButtons.forEach(button => {
            button.addEventListener('click', comprarElemento);
        });

        // Asignar eventos para eliminar elementos y vaciar carrito
        carrito.addEventListener("click", eliminarElemento);
        vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
    }

    function comprarElemento(e) {
        e.preventDefault();
        // Encontrar el contenedor del producto al que pertenece el botón
        const producto = e.target.closest('.showcase');
        leerDatosProducto(producto);
    }

    function leerDatosProducto(producto) {
        const infoProducto = {
            imagen: producto.querySelector(".product-img.default").src,
            titulo: producto.querySelector(".showcase-title").textContent,
            id: producto.dataset.id
        };
        insertarCarrito(infoProducto);
    }

    function insertarCarrito(producto) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <img src="${producto.imagen}" width="100">
            </td>
            <td>
                ${producto.titulo}
            </td>
            <td>
                <a href="#" class="borrar" data-id="${producto.id}">X</a>
            </td>
        `;
        lista.appendChild(row);
        actualizarContador(1);
    }

    function eliminarElemento(e) {
        e.preventDefault();
        if (e.target.classList.contains("borrar")) {
            e.target.closest('tr').remove();
            actualizarContador(-1);
        }
    }

    function vaciarCarrito(e) {
        e.preventDefault();
        while (lista.firstChild) {
            lista.removeChild(lista.firstChild);
        }
        cartItemCount = 0;
        countDisplay.textContent = cartItemCount;
    }

    function actualizarContador(count) {
        cartItemCount += count;
        countDisplay.textContent = cartItemCount;
    }

    // Inicia los event listeners
    cargarEventListeners();
});

// modal variables
const modal = document.querySelector('[data-modal]');
const modalCloseBtn = document.querySelector('[data-modal-close]');
const modalCloseOverlay = document.querySelector('[data-modal-overlay]');

// modal function
const modalCloseFunc = function () { modal.classList.add('closed') }

// modal eventListener
modalCloseOverlay.addEventListener('click', modalCloseFunc);
modalCloseBtn.addEventListener('click', modalCloseFunc);

// notification toast variables
const notificationToast = document.querySelector('[data-toast]');
const toastCloseBtn = document.querySelector('[data-toast-close]');

// notification toast eventListener
toastCloseBtn.addEventListener('click', function () {
  notificationToast.classList.add('closed');
});

// mobile menu variables
const mobileMenuOpenBtn = document.querySelectorAll('[data-mobile-menu-open-btn]');
const mobileMenu = document.querySelectorAll('[data-mobile-menu]');
const mobileMenuCloseBtn = document.querySelectorAll('[data-mobile-menu-close-btn]');
const overlay = document.querySelector('[data-overlay]');

for (let i = 0; i < mobileMenuOpenBtn.length; i++) {

  // mobile menu function
  const mobileMenuCloseFunc = function () {
    mobileMenu[i].classList.remove('active');
    overlay.classList.remove('active');
  }

  mobileMenuOpenBtn[i].addEventListener('click', function () {
    mobileMenu[i].classList.add('active');
    overlay.classList.add('active');
  });

  mobileMenuCloseBtn[i].addEventListener('click', mobileMenuCloseFunc);
  overlay.addEventListener('click', mobileMenuCloseFunc);

}

// accordion variables
const accordionBtn = document.querySelectorAll('[data-accordion-btn]');
const accordion = document.querySelectorAll('[data-accordion]');

for (let i = 0; i < accordionBtn.length; i++) {

  accordionBtn[i].addEventListener('click', function () {

    const clickedBtn = this.nextElementSibling.classList.contains('active');

    for (let i = 0; i < accordion.length; i++) {

      if (clickedBtn) break;

      if (accordion[i].classList.contains('active')) {

        accordion[i].classList.remove('active');
        accordionBtn[i].classList.remove('active');

      }

    }

    this.nextElementSibling.classList.toggle('active');
    this.classList.toggle('active');

  });

}

// Obtener el botón de cerrar para "LOS MÁS VENDIDOS"
const showcaseCloseBtn = document.querySelector('[data-showcase-close-btn]');
const showcaseSection = document.querySelector('.product-showcase');

// Función para cerrar la sección "LOS MÁS VENDIDOS"
const showcaseCloseFunc = function () {
  showcaseSection.classList.add('closed');
};

// Añadir el eventListener al botón de cerrar
showcaseCloseBtn.addEventListener('click', showcaseCloseFunc);
