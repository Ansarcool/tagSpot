export function allPopupClose(evt) {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (evt.key === 'Escape') {
        closeModal(openedPopup);
    }

    if (evt.target.classList.contains('popup__close')) {
        closeModal(openedPopup);
    }

    if (evt.target === openedPopup) {
        closeModal(openedPopup);
    }
}
export function openModal(popup) {
    popup.classList.add('popup_is-opened');
    popup.classList.add('popup_is-animated');
    document.body.addEventListener('keydown', allPopupClose);
    document.body.addEventListener('click', allPopupClose);
}

export function closeModal(popup) {
    const cardAddInputName = document.querySelector('.popup__input_type_card-name');
    const cardAddInputUrl = document.querySelector('.popup__input_type_url');
    cardAddInputName.value = '';
    cardAddInputUrl.value = '';
    const popUpAvatarInput = document.querySelector('#avatar-input');
    popUpAvatarInput.value = '';
    popup.classList.remove('popup_is-opened');
    document.body.removeEventListener('keydown', allPopupClose);
    document.body.removeEventListener('click', allPopupClose);
}