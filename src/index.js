import { enableValidation, clearValidation } from './components/validation.js';
import { getUser, getCards, addCard, deleteCard, addLike, removeLike, editProfile, editAvatar } from './components/api.js';
import { closeModal, openModal} from "./components/modal.js";
import './index.css';

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'form__input-error_active'
};

const template = document.querySelector('#card-template').content;
const formNewPlace = document.forms['new-place'];
const formEditProfile = document.forms['edit-profile'];
const cardsContainer = document.querySelector('.places__list');
const popUpEdit = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const popUpProfileImg = document.querySelector('.popup_type_new-avatar');
const popUpInputName = document.querySelector('.popup__input_type_name');
const popUpInputDescription = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileImage = document.querySelector('.profile__image');
const profileDescription = document.querySelector('.profile__description');
const cardAddInputName = document.querySelector('.popup__input_type_card-name');
const cardAddInputUrl = document.querySelector('.popup__input_type_url');
const popUpTypeImg = document.querySelector('.popup_type_image');
const popUpImage = popUpTypeImg.querySelector('.popup__image');
const cardAddButton = document.querySelector('.profile__add-button');
const popUpAddCard = document.querySelector('.popup_type_new-card');
const imgPopupCaption = document.querySelector('.popup__caption');
const formNewAvatar = document.forms['new-avatar'];
const popUpAvatarInput = document.querySelector('#avatar-input');
const templateElement = template.cloneNode(true);
let cardId;

profileEditButton.addEventListener('click', () => {
    popUpInputName.value = profileTitle.textContent;
    popUpInputDescription.value = profileDescription.textContent;
    clearValidation(popUpEdit, validationConfig);
    openModal(popUpEdit);
});

cardAddButton.addEventListener('click', () => {
    clearValidation(popUpAddCard, validationConfig);
    openModal(popUpAddCard);
});


profileImage.addEventListener('click', () => {
    clearValidation(popUpProfileImg, validationConfig);
    openModal(popUpProfileImg);
});

formNewPlace.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const submitButton = formNewPlace.querySelector('button');
    const submitDefaultText = formNewPlace.querySelector('.button').textContent;
    const submitLoaderText = 'Сохранение';
    submitButton.textContent = submitLoaderText;
    const name = cardAddInputName.value;
    const link = cardAddInputUrl.value;


    addCard(name, link)
        .then(cardsData => {
            const templateElement = template.cloneNode(true);
            const cardElement = templateElement.querySelector('.card');

            const img = cardElement.querySelector('.card__image');
            const title = cardElement.querySelector('.card__title');
            const likeCounter = cardElement.querySelector('.card__likes');
            const likeButton = cardElement.querySelector('.card__like-button');
            const deleteButton = cardElement.querySelector('.card__delete-button');

            img.src = cardsData.link;
            title.textContent = cardsData.name;
            likeCounter.textContent = cardsData.likes.length;

            likeButton.id = cardsData.id;
            deleteButton.id = cardsData.id;

            cardsContainer.prepend(cardElement);
            submitButton.textContent = 'Сохранение';
    })
    .catch(error => {
        console.log(error);
    })
        .finally(() => {
            submitButton.textContent = submitDefaultText;
            closeModal(popUpAddCard);
        })
});

formEditProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const newName = popUpInputName.value;
    const newAbout = popUpInputDescription.value;
    const submitButton = formEditProfile.querySelector('button');
    const submitDefaultText = formEditProfile.querySelector('.button').textContent;
    const submitLoaderText = 'Сохранение';
    submitButton.textContent = submitLoaderText;
    editProfile(newName, newAbout)
    .then((data) => {
        profileTitle.textContent = newName;
        profileDescription.textContent = newAbout;
        submitButton.textContent = 'Сохранение';
        closeModal(popUpEdit);
    })
    .catch((error) => {
        console.log(error);
    })
        .finally(() => {
            submitButton.textContent = submitDefaultText;
        })
});

formNewAvatar.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const submitButton = formNewAvatar.querySelector('button');
    const submitDefaultText = formNewAvatar.querySelector('.button').textContent;
    const submitLoaderText = 'Сохранение';
    submitButton.textContent = submitLoaderText;
    const newAvatar = popUpAvatarInput.value;
    editAvatar(newAvatar)
        .then((data) => {
            profileImage.style.backgroundImage = `url(${newAvatar})`;
            closeModal(popUpProfileImg);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            submitButton.textContent = submitDefaultText;
        })
})


Promise.all([getUser(), getCards()])
    .then(([userData, cardsData]) => {
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileImage.style.backgroundImage = `url(${userData.avatar})`;

        cardsData.forEach(card => {
            const templateElement = template.cloneNode(true);
            const img = templateElement.querySelector('.card__image');
            const title = templateElement.querySelector('.card__title');
            const likeCounter = templateElement.querySelector('.card__likes');
            const deleteButton = templateElement.querySelector('.card__delete-button');
            const likeButton = templateElement.querySelector('.card__like-button');


            deleteButton.id = card.id;
            likeButton.id = card.id;

            if (card.owner.id !== userData.id) {
                deleteButton.remove();
            }
            img.src = card.link;
            title.textContent = card.name;
            likeCounter.textContent = card.likes.length;
            cardsContainer.append(templateElement);
        })
    })
    .catch(err => console.error(err));

cardsContainer.addEventListener('click', (evt) => {
    const cardId = evt.target.id;
    const card = evt.target.closest('.card');
    if (card === null || card === undefined) {
        return;
    }
    const likeCounter = card.querySelector('.card__likes');
    if (evt.target.classList.contains('card__delete-button')) {
        deleteCard(cardId)
            .then(() => {
                card.remove();
            })
        .catch(err => console.log(err));
    }
    if (evt.target.classList.contains('card__like-button_is-active')) {
        removeLike(cardId)
            .then((data) => {
                evt.target.classList.remove('card__like-button_is-active');
                likeCounter.textContent = data.likes.length;
            })
        .catch(err => console.log(err));
    } else if (!evt.target.classList.contains('card__like-button_is-active') && evt.target.classList.contains('card__like-button')) {
        addLike(cardId)
            .then((data) => {
                evt.target.classList.add('card__like-button_is-active');
                likeCounter.textContent = data.likes.length;
            })
        .catch(err => console.log(err));
    }
    if (evt.target.classList.contains('card__image')) {
        popUpImage.src = evt.target.closest('.card__image').src;
        imgPopupCaption.textContent = evt.target.closest('.card').querySelector('.card__title').textContent;
        openModal(popUpTypeImg);
    }
});

enableValidation(validationConfig);
