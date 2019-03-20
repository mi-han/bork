const onWidthChange = () => {
  if (window.innerWidth < 1300) {
    return document.querySelector('body').style.backgroundSize = 'auto ' + window.innerHeight + 'px';
  }
  return document.querySelector('body').style.backgroundSize = 'cover';
};
onWidthChange();
window.addEventListener('resize', () => onWidthChange());

const submitButton = document.querySelector('.form__button');
submitButton.classList.add('form__button--disabled');