// Создай галерею с возможностью клика по ее элементам и просмотра полноразмерного изображения в модальном окне.
// Разбей задание на несколько подзадач:
// --Создание и рендер разметки по массиву данных и предоставленному шаблону.
// --Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// --Открытие модального окна по клику на элементе галереи.
// --Подмена значения атрибута src элемента img.lightbox__image.
// --Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// --Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии
// модального окна, пока грузится изображение, мы не видели предыдущее.

import images from "./gallery-items.js";

const galleryEl = document.querySelector("ul.js-gallery");
const lightboxEl = document.querySelector(".lightbox");
const lightboxImageEl = document.querySelector("img.lightbox__image");
const closeBtnLightboxEl = document.querySelector('button[data-action="close-lightbox"]');
const closeOutsideLightboxEl = document.querySelector(".lightbox__overlay");

const imagesMarkup = images
  .map(
    image =>
      `<li class="gallery__item">
  <a class="gallery__link" href=${image.original}>
  <img class="gallery__image" src=${image.preview} data-source=${image.original} alt=${image.description}>
  </a>
  </li>`
  )
  .join("");

galleryEl.innerHTML = imagesMarkup;

galleryEl.addEventListener("click", openModal);
closeBtnLightboxEl.addEventListener("click", closeModal);
closeOutsideLightboxEl.addEventListener("click", closeModal);

function openModal(e) {
  if (e.target.nodeName !== "IMG") {
    return;
  }
  e.preventDefault();
  window.addEventListener("keydown", onEscKeyPress);
  lightboxImageEl.setAttribute("src", e.target.dataset.source);
  lightboxEl.classList.add("is-open");
}

function closeModal() {
  window.removeEventListener("keydown", onEscKeyPress);
  lightboxImageEl.setAttribute("src", "");
  lightboxEl.classList.remove("is-open");
}

function onEscKeyPress(e) {
  if (e.code === "Escape") {
    closeModal();
  }
}
