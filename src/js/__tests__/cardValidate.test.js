import {
  checkControlSumValidity,
  checkValidity,
  resolveNumber,
} from '../cardValidate';

test.each([
  ['4485279357140056570', 'visa'],
  ['4950897097893466', 'visa'],
  ['5283286879056507', 'mastercard'],
  ['2221008966704522', 'mastercard'],
  ['348715240230643', 'amex'],
  ['379876067757639', 'amex'],
  ['3540521842456978599', 'jcb'],
  ['3538698319232845', 'jcb'],
  ['2200000000000053', 'mir'],
  ['2200000000000020', 'mir'],
  ['1444000000001111', false],
])('Введенный номер карты %s принадлежит платежной системе %s',
  (input, expected) => {
    expect(resolveNumber(input)).toBe(expected);
  });

test.each([
  ['4485279357140056570', true],
  ['5283286879056507', true],
  ['348715240230643', true],
  ['3538698319232845', true],
  ['2200000000000020', true],
  ['2200000000000054', false],
  ['4485365254681643917', false],
  ['378008792229504', false],
])('Введенный номер карты %s %s',
  (input, expected) => {
    expect(checkControlSumValidity(input)).toBe(expected);
  });

test.each([
  ['4485279357140056570', true],
  ['5283286879056507', true],
  ['348715240230643', true],
  ['3538698319232845', true],
  ['2200000000000020', true],
  ['2200000000000054', false],
  ['4485365254681643917', false],
  ['378008792229504', false],
])('Проверка контрольной суммы. Введенный номер карты %s %s',
  (input, expected) => {
    expect(checkControlSumValidity(input)).toBe(expected);
  });

test.each([
  ['2221001757234403', true],
  ['372886758679726', true],
  ['44853652546816439134', false],
  ['2200000000000038', true],
  ['22000000000000045', false],
  ['35290117139729', false],
])('Полная проверка карты. Введенный номер карты %s %s',
  (input, expected) => {
    expect(checkValidity(input)).toBe(expected);
  });
