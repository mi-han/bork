
const onWidthChange = () => {
  if (window.innerWidth < 1300) {
    document.querySelector('body').style.backgroundPosition = 'top center';
    return document.querySelector('body').style.backgroundSize = 'auto ' + window.innerHeight + 'px';
  }
  document.querySelector('body').style.backgroundPosition = 'center -150px';
  return document.querySelector('body').style.backgroundSize = 'cover';
};
onWidthChange();
window.addEventListener('resize', () => onWidthChange());

const submitButton = document.querySelector('.form__button');
submitButton.classList.add('form__button--disabled');

const phoneField = document.querySelector('#phone-field');
phoneField.focus();
phoneField.addEventListener('input', (event) => {
  const phone = event.target.value;
  if (!phone.match(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/g)) {
    phoneField.classList.remove('form__field--success');
    return phoneField.classList.add('form__field--error');
  }
  phoneField.classList.add('form__field--success');
  return phoneField.classList.remove('form__field--error');
});
phoneField.addEventListener('invalid', () => {
  if (phoneField.validity.patternMismatch) {
    phoneField.setCustomValidity('Введите телефон от 7 до 10 цифр.');
  } else {
    phoneField.setCustomValidity('');
  }
});

const passwordField = document.querySelector('#password-field');
passwordField.addEventListener('input', (event) => {
  const password = event.target.value;
  if (!password.match(/.{5,}/g)) {
    passwordField.classList.remove('form__field--success');
    return passwordField.classList.add('form__field--error');
  }
  passwordField.classList.add('form__field--success');
  return passwordField.classList.remove('form__field--error');
});
passwordField.addEventListener('invalid', () => {
  if (passwordField.validity.patternMismatch) {
    passwordField.setCustomValidity('Введите от 5 символов.');
  } else {
    passwordField.setCustomValidity('');
  }
});

document.querySelectorAll('.form__field').forEach((item) => {
  item.addEventListener('input', () => {
  if (!!phoneField.value.length
    && !!passwordField.value.length
    && !phoneField.classList.contains('form__field--error')
    && !passwordField.classList.contains('form__field--error')) {
      return submitButton.classList.remove('form__button--disabled');
  }
  return submitButton.classList.add('form__button--disabled');
})});