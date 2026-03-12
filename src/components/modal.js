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
    popup.classList.remove('popup_is-opened');
    document.body.removeEventListener('keydown', allPopupClose);
    document.body.removeEventListener('click', allPopupClose);
}