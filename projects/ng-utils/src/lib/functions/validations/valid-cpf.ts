export function validCpf(cpf: string) {
  cpf = cpf.replace(/\D/g, '') as string;

  const cpfInvalid = [
    ...['00000000000', '11111111111', '22222222222', '33333333333'],
    ...['44444444444', '55555555555', '66666666666', '77777777777'],
    ...['88888888888', '99999999999'],
  ];

  if (cpfInvalid.includes(cpf) || cpf.length !== 11) {
    return false;
  }

  const initPart = cpf.substr(0, 9).split('');
  const firstDigit = Number.parseInt(cpf.charAt(9));
  const firstDigitGenerated = calcDigit(initPart, 10);
  if (firstDigit !== firstDigitGenerated) {
    return false;
  }

  const secondaryPart = cpf.substr(0, 10).split('');
  const secondaryDigit = Number.parseInt(cpf.charAt(10));
  const secondaryDigitGenerated = calcDigit(secondaryPart, 11);
  if (secondaryDigit !== secondaryDigitGenerated) {
    return false;
  }

  return true;
}

function calcDigit(parteCPF: string[], multi: number) {
  let generatedDigit = 0;
  let valueTotal = 0;

  valueTotal = parteCPF.reduce(
    (result: number, currentNumber: string) =>
      result + Number.parseInt(currentNumber) * multi--,
    0
  );

  generatedDigit = 11 - (valueTotal % 11);

  if (generatedDigit > 9) {
    generatedDigit = 0;
  }

  return generatedDigit;
}
