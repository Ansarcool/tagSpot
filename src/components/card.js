export function createCard(item, template) {
    const card = template.cloneNode(true);

    const img = card.querySelector('.card__image');
    const title = card.querySelector('.card__title');

    img.src = item.link;
    img.alt = item.name;
    title.textContent = item.name;


    return card;
}
export function likeFunc(evt) {
    if (evt.target.classList.contains('card__like-button')) {
        evt.target.classList.toggle('card__like-button_is-active');
    }
}


// удалить карточку
export function deleteFunc(evt) {
    if (evt.target.classList.contains('card__delete-button')) {
        const item = evt.target.closest('.card');
        item.remove();
    }
}