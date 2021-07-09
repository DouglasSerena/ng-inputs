export const INPUT_TYPE_TEXT = [
  'email',
  'number',
  'password',
  'search',
  'tel',
  'text',
  'url',
];
export const INPUT_TYPE_DATE = [
  'date',
  'datetime',
  'datetime-local',
  'month',
  'time',
  'week',
];
export const INPUT_TYPE_OTHER = [
  'button',
  'checkbox',
  'color',
  'file',
  'hidden',
  'image',
  'radio',
  'range',
  'submit',
];
export const INPUT_TYPE = [
  ...INPUT_TYPE_DATE,
  ...INPUT_TYPE_TEXT,
  ...INPUT_TYPE_OTHER,
];
