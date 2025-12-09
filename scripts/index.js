// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
const cardElement = cardTemplate.cloneNode(true);
// @todo: DOM узлы
const deleteCardButton = cardTemplate.querySelector('.card__delete-button');
const addCardButton = cardTemplate.querySelector('.profile__add-button');
const img = cardTemplate.querySelector('.card__image');
const card = cardTemplate.querySelector('.card');
const cardDescription = cardTemplate.querySelector('.card__description');
const cardTitle = cardTemplate.querySelector('.card__title');
// @todo: Функция создания карточки
initialCards.forEach((item) => {
    img.textContent = item['link'];
    cardTitle.textContent = item['name'];
})
// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
addCardButton.addEventListener('click', () => {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.card__image').textContent = item['link'];
    cardElement.querySelector('.card__title').textContent = item['name'];


})