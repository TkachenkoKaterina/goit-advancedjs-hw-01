import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
};
const LSKey = 'feedback-form-state';

const inputObj = {
  email: '',
  message: '',
};

refs.form.addEventListener('input', handlerInput);
refs.form.addEventListener('submit', handlerSubmit);

const storedData = localStorage.getItem(LSKey);
if (storedData) {
  const parsedData = JSON.parse(storedData);
  inputObj.email = parsedData.email;
  inputObj.message = parsedData.message;
  refs.form.elements.email.value = inputObj.email;
  refs.form.elements.message.value = inputObj.message;
}

const setItemToLS = throttle(() => {
  localStorage.setItem(LSKey, JSON.stringify(inputObj));
}, 500);

function handlerInput(evt) {
  inputObj.email = evt.currentTarget.elements.email.value;
  inputObj.message = evt.currentTarget.elements.message.value;
  setItemToLS(inputObj);
}

function handlerSubmit(evt) {
  evt.preventDefault();
  console.log('data', inputObj);
  evt.currentTarget.reset();
  localStorage.removeItem(LSKey);
}
