import { checkValidity, resolveNumber } from './cardValidate';

class Validator {
  constructor(input) {
    this.input = input;
    this.wrapper = document.getElementById('cards');
  }

  start() {
    this.input.addEventListener('input', (e) => this.onNumberChange(e.target.value));
    this.input.closest('form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.onFormSubmit();
    });
  }

  onFormSubmit() {
    const number = this.input.value;
    const isValid = checkValidity(number);
    const resultEl = document.getElementById('validation-result');
    if (isValid) {
      resultEl.classList.remove('error');
      resultEl.classList.add('success');
      resultEl.textContent = 'Номер карты валидный';
    } else {
      resultEl.classList.remove('success');
      resultEl.classList.add('error');
      resultEl.textContent = 'Номер карты невалидный';
    }
  }

  onNumberChange(number) {
    const ps = resolveNumber(number);
    const activeEl = this.wrapper.querySelector('.active');
    if (activeEl) {
      activeEl.classList.remove('active');
    }

    if (ps) {
      this.wrapper.querySelector(`.${ps}`).classList.add('active');
    }
  }
}

export default Validator;
