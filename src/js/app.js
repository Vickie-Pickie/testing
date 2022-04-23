import Validator from './Validator';

const input = document.getElementById('card-number');
const validator = new Validator(input);
validator.start();
