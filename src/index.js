import { closeModal, openModal } from "./components/modal.js";
import {createCard} from "./components/card.js";
import {likeFunc} from "./components/card.js";
import {deleteFunc} from "./components/card.js";
import { initialCards } from "./cards.js";
import './index.css';

const template = document.querySelector('#card-template').content;
const card = template.cloneNode(true);
const formNewPlace = document.forms['new-place'];
const formEditProfile = document.forms['edit-profile'];
const cardsContainer = document.querySelector('.places__list');
const popUpEdit = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const popUpInputName = document.querySelector('.popup__input_type_name');
const popUpInputDescription = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const cardAddInputName = document.querySelector('.popup__input_type_card-name');
const cardAddInputUrl = document.querySelector('.popup__input_type_url');
const popUpTypeImg = document.querySelector('.popup_type_image');
const popUpImage = popUpTypeImg.querySelector('.popup__image');
const cardAddButton = document.querySelector('.profile__add-button');
const popUpAddCard = document.querySelector('.popup_type_new-card');
const imgPopupCaption = document.querySelector('.popup__caption');
export function allPopupClose(evt) {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (evt.key === 'Escape') {
        closeModal(openedPopup);
    }
    if (evt.target.closest('.popup__close')) {
        closeModal(openedPopup);
    }
    if (evt.target === openedPopup) {
        closeModal(openedPopup);
    }
}
profileEditButton.addEventListener('click', () => {
    popUpInputName.value = profileTitle.textContent;
    popUpInputDescription.value = profileDescription.textContent;
    openModal(popUpEdit);
});
cardAddButton.addEventListener('click', () => {
    openModal(popUpAddCard);
});

cardsContainer.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('card__image')) {
        popUpImage.src = evt.target.closest('.card__image').src;
        imgPopupCaption.textContent = evt.target.closest('.card').querySelector('.card__title').textContent;
        openModal(popUpTypeImg);
    }
});

initialCards.forEach(item => {
    cardsContainer.append(createCard(item, template));
});

formNewPlace.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const card = template.cloneNode(true);
    const img = card.querySelector('.card__image');
    const title = card.querySelector('.card__title');

    img.src = cardAddInputUrl.value;
    title.textContent = cardAddInputName.value;
    cardAddInputUrl.value = '';
    cardAddInputName.value = '';

    cardsContainer.prepend(card);
    closeModal(popUpAddCard);
})
formEditProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();

    profileTitle.textContent = popUpInputName.value;
    profileDescription.textContent = popUpInputDescription.value;

    closeModal(popUpEdit);
});
cardsContainer.addEventListener('click', (evt) => {
    likeFunc(evt);
    deleteFunc(evt);
})
document.body.addEventListener('keydown', allPopupClose);
document.body.addEventListener('click', allPopupClose);






