const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-9',
  headers: {
    authorization: '2819a494-090d-4234-b0dd-7e1c5f7ea63a',
    'Content-Type':'application/json'
  }
}

export { patchProfile, getCards, getProfileInfo, postNewCard, deleteCardFromServer, likeCardForServer, removeLike, updateAvatar }

//Patch Редактирование профиля

const patchProfile = (formData)=>{
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name:formData.personalName,
      about:formData.qualification
    })
  })
  .then(handleResponse)
}

//GET начальных карточек

const getCards = ()=>{
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
  .then(handleResponse)
}

// GET профиля
//
const getProfileInfo = ()=>{
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
  .then(handleResponse)
}

//POST новых карточек

const postNewCard = (cardName, cardLink)=>{
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  })
  .then(handleResponse)
}

// Удаление своих карточек с сервера

const deleteCardFromServer = (cardId)=>{
  return fetch(`${config.baseUrl}/cards/${cardId}`,{
    method: 'DELETE',
    headers: config.headers
  })
  .then(handleResponse)
}

//Лайк карточки

const likeCardForServer = (cardId)=>{
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`,{
    method: 'PUT',
    headers: config.headers
  })
  .then(handleResponse)
}

//Убрать лайк с карточки

const removeLike = (cardId)=>{
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`,{
    method: 'DELETE',
    headers: config.headers
  })
  .then(handleResponse)
}

//Обновление аватара

const updateAvatar = (link)=>{
  return fetch(`${config.baseUrl}/users/me/avatar`,{
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
    })
  })
  .then(handleResponse)
}

//Обработка ответов

function handleResponse(response) {
  if(response.ok){
    return response.json()
  } else {
    return Promise.reject(`Ошибка: ${response.status}`);
  }
}