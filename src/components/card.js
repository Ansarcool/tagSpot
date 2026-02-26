
import {template, profileEditButton, popUpEdit} from "./index.js";
// like card
function like() {
    cardsContainer.addEventListener('click', (evt) => {
        if(evt.target.classList.contains('card__like-button')) {
            evt.target.classList.toggle('card__like-button_is-active');
        }
    });
}
// Delete card
function deleteCard() {
    cardsContainer.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('card__delete-button')) {
            const item = evt.target.closest('.card');
            item.remove()
        }
    });
}

function createCard() {

}