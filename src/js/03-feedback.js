import throttle from 'lodash.throttle';

const refs = {
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
  form: document.querySelector('.feedback-form'),
};
const LSKey = 'feedback-form-state';

const inputObj = {
  email: '',
  message: '',
};

refs.input.addEventListener('input', handlerInputEmail);
refs.textarea.addEventListener('input', handlerInputMessage);
refs.form.addEventListener('submit', handlerSubmit);

const setItemToLS = throttle(() => {
  localStorage.setItem(LSKey, JSON.stringify(inputObj));
}, 500);

const storedData = localStorage.getItem(LSKey);
if (storedData) {
  const parsedData = JSON.parse(storedData);
  inputObj.email = parsedData.email;
  inputObj.message = parsedData.message;
  refs.input.value = inputObj.email;
  refs.textarea.value = inputObj.message;
}

function handlerInputEmail(evt) {
  let inputEmail = evt.currentTarget.value;
  inputObj.email = inputEmail;
  setItemToLS();
}

function handlerInputMessage(evt) {
  let inputMessage = evt.currentTarget.value;
  inputObj.message = inputMessage;
  setItemToLS();
}

function handlerSubmit(evt) {
  evt.preventDefault();
  console.log('data', inputObj);
  evt.currentTarget.reset();
  localStorage.removeItem(LSKey);
}
