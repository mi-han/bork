const setBackgroundSize = (value) => {
  console.log(value);
  document.querySelector('html').style.backgroundSize = value;
  document.querySelector('body').style.backgroundSize = value;
};
const onWindowSizeChange = function() {
  if ((window.innerWidth / window.innerHeight) < 1.425) {
    return setBackgroundSize('auto ' + window.innerHeight + 'px');
  }
  return setBackgroundSize('cover');
}();
window.addEventListener('resize', () => onWindowSizeChange);

const submitButton = document.querySelector('.form__button');
submitButton.classList.add('form__button--disabled');

const validateField = (field, regEx, customHelp) => {
  field.addEventListener('input', (event) => {
    const fieldValue = event.target.value;
    if (!fieldValue.match(regEx)) {
      field.classList.remove('form__field--success');
      field.classList.add('form__field--error');
      return;
    }
    field.classList.add('form__field--success');
    field.classList.remove('form__field--error');
  });
  field.addEventListener('invalid', () => {
    if (field.validity.patternMismatch) {
      field.setCustomValidity(customHelp);
    } else {
      field.setCustomValidity('');
    }
  });
};

const phoneField = document.querySelector('#phone-field');
phoneField.focus();
validateField(
  phoneField,
  /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/g,
  'Введите телефон от 7 до 10 цифр.'
);

const passwordField = document.querySelector('#password-field');
validateField(
  passwordField,
  /.{5,}/g,
  'Введите от 5 символов.'
);

document.querySelectorAll('.form__field').forEach((field) => {
  field.addEventListener('input', () => {
    if (!!phoneField.value.length
      && !!passwordField.value.length
      && !phoneField.classList.contains('form__field--error')
      && !passwordField.classList.contains('form__field--error')) {
        return submitButton.classList.remove('form__button--disabled');
    }
    return submitButton.classList.add('form__button--disabled');
  })
});