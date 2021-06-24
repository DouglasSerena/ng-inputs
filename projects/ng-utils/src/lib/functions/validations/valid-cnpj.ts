export function validCnpj(cnpj: string) {
  cnpj = cnpj.replace(/\D/g, '') as string;

  const cpfInvalid = [
    ...['00000000000000', '11111111111111', '22222222222222', '33333333333333'],
    ...['44444444444444', '55555555555555', '66666666666666', '77777777777777'],
    ...['88888888888888', '99999999999999'],
  ];

  if (cpfInvalid.includes(cnpj) || cnpj.length !== 14) {
    return false;
  }

  const initPart = cnpj.substr(0, 12).split('');
  const firstDigit = Number.parseInt(cnpj.charAt(12));
  const firstDigitGenerated = calcDigit(initPart, 5);

  if (firstDigit !== firstDigitGenerated) {
    return false;
  }

  const secondaryPart = cnpj.substr(0, 13).split('');
  const secondaryDigit = Number.parseInt(cnpj.charAt(13));
  const secondaryDigitGenerated = calcDigit(secondaryPart, 6);
  if (secondaryDigit !== secondaryDigitGenerated) {
    return false;
  }

  return true;
}

function calcDigit(parteCNPJ: string[], multi: number) {
  let generatedDigit = 0;
  let valueTotal = 0;

  valueTotal = parteCNPJ.reduce((result: number, currentNumber: string) => {
    result += Number.parseInt(currentNumber) * multi--;
    if (multi < 2) {
      multi = 9;
    }
    return result;
  }, 0);

  if (valueTotal % 11 < 2) {
    generatedDigit = 0;
  } else {
    generatedDigit = 11 - (valueTotal % 11);
  }

  return generatedDigit;
}
