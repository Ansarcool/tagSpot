// @todo: Темплейт карточки
const template = document.querySelector('#card-template').content;
const card = template.cloneNode(true);
const deleteButton = card.querySelector('.card__delete-button');
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


