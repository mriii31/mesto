export const validationConfig = {
    formSelector: '.form__popup',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'button__popup_invalid',
    inputErrorClass: 'popup__input_state_invalid',
};

export const config = {
    baseUrl: "https://nomoreparties.co/v1/apf-cohort-202",
    headers: {
        "Content-type": 'application/json',
        authorization: '7798c060-51e7-4966-8721-777c91ef32da'
    }
};

export const popupImage = document.querySelector('.popup__type-image');
export const popupProfile = document.querySelector('.popup-profile');
export const saveButton = document.querySelector('.button__edit-save');
export const editButton = document.querySelector('.button__edit');
export const nameInput = document.querySelector('.name__input');
export const jobInput = document.querySelector('.job__input');
export const popupAvatar = document.querySelector('.popup__avatar');
export const profileAvatarOverlay = document.querySelector('.profile__avatar-overlay');
export const popupNewImage = document.querySelector('.popup-image');
export const addButton = document.querySelector('.button__add');
export const formEdit = document.querySelector('.form__edit');
export const formImage = document.querySelector('.form__image');
export const formAvatar = document.querySelector('.form__avatar');
export const buttonAddSave = document.querySelector('.button__add-save');
export const buttonAvatarSave = document.querySelector('.button__avatar-save');
export const cardContainer = document.querySelector('.elements__list');