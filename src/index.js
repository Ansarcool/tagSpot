import {initialCards} from "./cards.js";
import './index.css';


// @todo: Темплейт карточки
const template = document.querySelector('#card-template').content;
const card = template.cloneNode(true);
const cardsContainer = document.querySelector('.places__list');
// @todo: Функция создания карточки
// @todo: Функция удаления карточки
cardsContainer.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('card__delete-button')) {
        const item = evt.target.closest('.card');
        item.remove()
    }
})
// @todo: Вывести карточки на страницу
initialCards.forEach(item => {
    const card = template.cloneNode(true);
    const img = card.querySelector('.card__image');
    const title = card.querySelector('.card__title');



    img.src = item['link'];
    title.textContent = item['name'];
    cardsContainer.append(card);
})

const popUpEdit = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const popUpInputName = document.querySelector('.popup__input_type_name');
const popUpInputDescription = document.querySelector('.popup__input_type_description');
const submitButton = document.querySelector('.popup__button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const cardAddInputName = document.querySelector('.popup__input_type_card-name');
const cardAddInputUrl = document.querySelector('.popup__input_type_url');
const popUpTypeImg = document.querySelector('.popup_type_image');
const cardImg = card.querySelector('.card__image');
const popUpImage = popUpTypeImg.querySelector('.popup__image');
const cardAddButton = document.querySelector('.profile__add-button');
const popUpAddCard = document.querySelector('.popup_type_new-card');
profileEditButton.addEventListener('click', (evt) => {
    popUpEdit.classList.add('popup_is-opened');
    popUpInputName.value = profileTitle.textContent;
    popUpInputDescription.value = profileDescription.textContent;
    popUpEdit.classList.add('popup_is-animated');
});
// type edit okak

submitButton.addEventListener('click', (evt) => {
    evt.preventDefault()
    const card = template.cloneNode(true);
    const img = card.querySelector('.card__image');
    const title = card.querySelector('.card__title');

    img.src = cardAddInputUrl.value;
    title.textContent = cardAddInputName.value;

    cardsContainer.append(card);
});
document.body.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            openedPopup.classList.remove('popup_is-opened');
        }
    }
});

document.body.addEventListener('click', (evt) => {
    const popup = evt.target.closest('.popup');
    if (evt.target === popup) {
        popup.classList.remove('popup_is-opened');
    }
})
document.body.addEventListener('click', (evt) => {
    const popup = evt.target.closest('.popup')
    if (evt.target === evt.target.closest('.popup__close')) {
        popup.classList.remove('popup_is-opened');
    }
});

cardAddButton.addEventListener('click', (evt) => {
    popUpAddCard.classList.add('popup_is-opened');
    popUpAddCard.classList.add('popup_is-animated');
})

// cards
cardsContainer.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('card__like-button')) {
        evt.target.classList.toggle('card__like-button_is-active');
    }
});
cardsContainer.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('card__image')) {
        popUpImage.src = evt.target.closest('.card__image').src;
        popUpTypeImg.classList.add('popup_is-opened');
        popUpTypeImg.classList.add('popup_is-animated');
    }
});







