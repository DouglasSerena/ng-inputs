export function validRgSp(rg: string) {
  rg = rg.replace(/\D/g, '') as string;

  const partRg = rg.substr(0, 8).split('');
  const digitRg = Number(rg.charAt(8));
  const digitGenerated = calcDigit(partRg);

  return digitRg === digitGenerated;
}

function calcDigit(parteCPF: string[], multi: number = 9) {
  let generatedDigit = 0;
  let valueTotal = 0;

  valueTotal = parteCPF.reduce(
    (result: number, currentNumber: string) =>
      result + Number.parseInt(currentNumber) * multi--,
    0
  );

  generatedDigit = valueTotal % 11;

  if (generatedDigit > 9) {
    generatedDigit = 0;
  }

  return generatedDigit;
}
