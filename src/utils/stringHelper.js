import { Platform } from 'react-native';

if (Platform.OS === 'android') {
  // only android needs polyfill
  require('intl'); // import intl object
  require('intl/locale-data/jsonp/pt-BR'); // load the required locale details
}

export const containsString = (originalString, expectedString) => {
  if (
    expectedString
    && String(originalString)
      .toLowerCase()
      .indexOf(String(expectedString).toLowerCase()) >= 0
  ) {
    return true;
  }

  return false;
};

export const toOnlyNumbers = (string) => {
  if (!string) return '';
  return string.replace(/\D/g, '');
};

export const toString = (number) => (number ? number.toString() : '');

export const toCPFMask = (string) => {
  if (!string) return '';

  const positionMask = {
    3: '.',
    6: '.',
    9: '-',
  };

  const justNumbers = toOnlyNumbers(string);
  if (justNumbers.length < 11) return string;

  let CPF = '';
  justNumbers.split('').forEach((value, position) => {
    if (position > 10) return;

    if (positionMask[position]) {
      CPF += `${positionMask[position]}${value}`;
    } else CPF += value;
  });

  return CPF;
};

export const toCPFMaskOnFly = (string) => {
  if (!string) return '';

  const positionMask = {
    3: '.',
    6: '.',
    9: '-',
  };

  const justNumbers = toOnlyNumbers(string);
  if (justNumbers.length < 3) return string;

  let CPF = '';
  justNumbers.split('').forEach((value, position) => {
    if (position > 10) return;

    if (positionMask[position]) {
      CPF += `${positionMask[position]}${value}`;
    } else CPF += value;
  });

  return CPF;
};

export const toCNPJMask = (string) => {
  if (!string) return '';

  const positionMask = {
    2: '.',
    5: '.',
    8: '/',
    12: '-',
  };

  const justNumbers = toOnlyNumbers(string);
  if (justNumbers.length < 14) return string;

  let CNPJ = '';
  justNumbers.split('').forEach((value, position) => {
    if (position > 13) return;

    if (positionMask[position]) {
      CNPJ += `${positionMask[position]}${value}`;
    } else CNPJ += value;
  });

  return CNPJ;
};

export const toMoneyMask = (string) => {
  const toNumber = Number(string).toFixed(2);
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });
  return formatter.format(toNumber);
};

export const removeWhiteSpaces = (string) => {
  if (!string) return '';

  return string.replace(/\s/g, '');
};

export const highlightCPF = (text, search) => {
  const searchTerm = toOnlyNumbers(search);
  const regexp = new RegExp(searchTerm, 'g');
  const matches = [];
  let formatedText = text;

  let match = regexp.exec(text);
  while (match !== null) {
    matches.push(match.index);
    match = regexp.exec(text);
  }

  let counter = 0;
  matches.forEach((index) => {
    formatedText = `${formatedText.slice(
      0,
      counter > 0 ? index + 7 : index,
    )}<b>${searchTerm}</b>${formatedText.slice(
      searchTerm.length + (counter > 0 ? index + 7 : index),
      formatedText.length,
    )}`;

    counter += 1;
  });

  counter = 1;
  let highlightedText = '';
  for (let charIndex = 0; charIndex < formatedText.length; charIndex += 1) {
    let cpfSeparator = '';
    if (!Number.isNaN(parseInt(formatedText[charIndex], 10))) {
      if (counter && counter % 9 === 0) {
        cpfSeparator = '-';
      } else if (counter && counter % 3 === 0) {
        cpfSeparator = '.';
      }

      counter += 1;
    }

    highlightedText = highlightedText
      .concat(formatedText[charIndex])
      .concat(cpfSeparator);
  }

  return highlightedText;
};
