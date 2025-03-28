import './index.css'; 

import { Section } from '../components/Section';
import { Api } from '../components/Api';
import { UserInfo } from '../components/UserInfo';
import { Card } from '../components/Сard';
import { PopupWithImage } from '../components/PopupWithImage';
import { PopupWithForm } from '../components/PopupWithForm';
import { FormValidator } from '../components/FormValidator';
import { changeLoading } from '../utils/utils';
import { popupImage, popupProfile, saveButton, editButton, nameInput, jobInput, popupAvatar, profileAvatarOverlay, popupNewImage,
    addButton, formEdit, formImage, formAvatar, buttonAddSave, buttonAvatarSave, 
    cardContainer, validationConfig, config } from '../utils/constants';

export const api = new Api(config);

//попап большой картинки
const popupBigImage = new PopupWithImage(popupImage);
popupBigImage.setEventListeners(); //подключаем к попапу закрытие крестиком и оверлай

/**--------------------отрисовка карточек и информации------------------ */
//функция отрисовки карточки
function createCard(data) {
    const card = new Card(data, userId, '#card-template', 
    {handleCardClick: () => {
        popupBigImage.open(data); //открытие большой картинки
    }},
    {
        handleToggleLike: function (action, data) {
          if (action === 'PUT') {
            return api.setLike(data._id);
          } else {
            return api.remLike(data._id);
          }
        },
    },
    {removeCard: function (cardElement, cardData) {
        api.removeCard(cardData._id)
        .then(() => cardElement.remove())
        .catch((err) => console.log(err));
    }}
    );
    return card;
}


//создание карточки - дабавление в DOM
const cardList = new Section({
    renderer: (item) => {
        const cardElement = createCard(item).generateCardElement();
        cardList.addItem(cardElement)
    }
}, cardContainer);

//данные для отображения инфо пользователя
const profileInfo = new UserInfo({
    profileName: document.querySelector('.profile__title'),
    profileDescription: document.querySelector('.profile__subtitle'),
    profileAvatar: document.querySelector('.profile__avatar'),
});

//отображение карточек и инфо пользователя
let userId = null 
api.getAllUnfo()
.then(([items, user]) => {
    items = items.reverse(); 
    profileInfo.setUserInfo(user);
    userId = user._id;
    cardList.renderItems(items);
}) 
.catch((err)=> console.log(err));

/**---------------------------------------------------------------------------------- */

/**------------попап редактирования профиля------------------------------------------- */
//форма редактирования профиля
const profileFormPopup = new PopupWithForm(popupProfile, { 
    handleSubmitForm: (user) => {
        changeLoading(true, saveButton); //изменение 'Сохранить' на 'Сохранение...'
        api.editInfoUser(user.username, user.profession)
        .then((res) => {
            profileInfo.setUserInfo(res)
            profileFormPopup.close()
        })
        .catch((err)=> console.log(err))
        .finally(()=>changeLoading(false, saveButton)); 
    } 
});

//открытие попапа редактирования профиля
const openProfileFormPopup = () => {
    const userInfoEdit = profileInfo.getInfoUser();
    nameInput.value = userInfoEdit.name; //при открытие получаем данные с сервера в полях ввода
    jobInput.value = userInfoEdit.about;
    validProfile.clearError(formEdit); //отчищаем при открытие ошибки валидации
    profileFormPopup.open();
}
//подключаем кнопку сохранить попапа редактирование инфо пользователя
editButton.addEventListener('click', () => openProfileFormPopup());

/**----------------------------------------------------------------------------------- */

/**---------------попап аватар--------------------------------------------------------- */
const openAvatarChange = new PopupWithForm(popupAvatar, {
    handleSubmitForm: (user) => {
        changeLoading(true, buttonAvatarSave); //изменение 'Сохранить' на 'Сохранение...'
        api.patchAvatar(user.linkAvatar)
        .then((res) => {
            profileInfo.setUserInfo(res)  
            openAvatarChange.close();
        })
       .catch((err)=> console.log(err))
       .finally(()=>changeLoading(false, buttonAvatarSave));
    }
})

//открытие попап аватар
const openUserAvatar = () => {
    validNewAvatar.clearError(); //блокировка/разблокировка кнопки валидацией
    openAvatarChange.open();
}
//подключаем кнопку сохранить попапа аватар
profileAvatarOverlay.addEventListener('click', () => openUserAvatar())
/**---------------------------------------------------------------------------------- */

/**-----------------добавление картинки---------------------------------------------- */
const openFormPicture = new PopupWithForm(popupNewImage, {
    handleSubmitForm: (user) => {
        changeLoading(true, buttonAddSave); //изменение 'Сохранить' на 'Сохранение...'
        api.addNewCard(user.imgname, user.link)
        .then((res) => {
            const cardElement = createCard(res).generateCardElement(); 
            cardList.addItem(cardElement); 
            openFormPicture.close();
        })
        .catch((err)=> console.log(err))
        .finally(()=>changeLoading(false, buttonAddSave));
        
    }
});

//открытие попап добавления картинки
const openFormCard = () => {
    
    validNewImage.clearError(); //очищаем при открытие ошибки валидации
    openFormPicture.open();
}

addButton.addEventListener('click', () => openFormCard());
/**---------------------------------------------------------------------------------- */

/**---------------------------валидация форм___________________________________________ */
const validProfile = new FormValidator(validationConfig, formEdit);
validProfile.enableValidation();

const validNewImage = new FormValidator(validationConfig, formImage);
validNewImage.enableValidation();

const validNewAvatar = new FormValidator(validationConfig, formAvatar);
validNewAvatar.enableValidation();

openAvatarChange.setEventListeners(); // добавил с FormValidator
profileFormPopup.setEventListeners();
openFormPicture.setEventListeners();
