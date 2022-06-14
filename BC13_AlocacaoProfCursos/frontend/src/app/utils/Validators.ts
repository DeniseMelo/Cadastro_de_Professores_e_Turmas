import { Validators } from "@angular/forms";

export const required = Validators.required;
export const email = Validators.email;
export const minLength = (minLength: number) => Validators.minLength(minLength);
export const maxLength = (maxLength: number) => Validators.maxLength(maxLength);
export const pattern = (regex: string | RegExp) => Validators.pattern(regex);

export const getInputError = (formSubmitted: boolean, control: any, name: string) => {
  if(formSubmitted || control.touched){
    const errors: any = control.errors ? control.errors : {};
    const errorType = Object.keys(errors).length ? Object.keys(errors)[0] : '';    

    if(errorType !== ''){
      const requiredLength = errors[errorType].requiredLength;
      return errorsMessage(name, requiredLength)[errorType];
    }
  }

  return '';
}

const errorsMessage = (fieldName: string, length: Number): any => ({
  required: `O campo ${fieldName} é obrigatório`,
  minlength: `O ${fieldName} deve conter no mínimo ${length} caracteres`,
  maxlength: `O ${fieldName} deve conter no máximo ${length} caracteres`,
  email: `E-mail válido`,
  pattern: 'Domínio @soulcode.com.br é necessário'
});
