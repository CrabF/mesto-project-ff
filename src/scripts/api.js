const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-9',
  headers: {
    authorization: '2819a494-090d-4234-b0dd-7e1c5f7ea63a',
    'Content-Type':'application/json'
  }
}

//Patch Редактирование профиля

export const patchProfile = (formData)=>{
  return fetch(`${config.baseUrl}/users/me  `, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name:formData.personalName,
      about:formData.qualification
    })
  })
  .then(response => {
    if(response.ok){
      return response.json()
    } else {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
  })
}

//GET начальных карточек

export const getCards = ()=>{
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
  .then(response => {
    if(response.ok){
      return response.json()
    } else {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
  })
  .then((result) => {
    return result
  })
}

// GET профиля
//
export const getProfileInfo = ()=>{
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then(response => {
      if(response.ok){
        return response.json()
      } else {
        return Promise.reject(`Ошибка: ${response.status}`)
      }
    })
    .then((result) => {
      return result
    });
}

//POST новых карточек

export const postNewCard = (cardName, cardLink)=>{
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  })
  .then(response => {
    if(response.ok){
      return response.json()
    } else {
      return Promise.reject(`Ошибка: ${response.status}`)
    }
  })
}

// Удаление своих карточек с сервера

export const deleteCardFromServer = (cardId)=>{
  return fetch(`${config.baseUrl}/cards/${cardId}`,{
    method: 'DELETE',
    headers: config.headers
  })
  .then(response => {
    if(response.ok){
      return response.json()
    } else {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
  })
}

//Лайк карточки

export const likeCard = (cardId)=>{
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`,{
    method: 'PUT',
    headers: config.headers
  })
  .then(response => {
    if(response.ok){
      return response.json()
    } else {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
  })
}

//Убрать лайк с карточки

export const removeLike = (cardId)=>{
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`,{
    method: 'DELETE',
    headers: config.headers
  })
  .then(response => {
    if(response.ok){
      return response.json()
    } else {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
  })
}