export type NgFormItem = {
  content?: string | NgForm;
  attribute?: {
    [key: string]: any;
  };
};
export type NgForm = {
  [key: string]: NgFormItem;
};
