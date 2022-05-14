import { IProduct, IStep } from 'context/DetailsProvider';
import imgFileTypes from './imgFileTypes';

class Validator {
  private static amountRegexp = /^(10000|[1-9][1-9][0-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9]|[1-9])$/;

  private static productErrorMessages = { name: 'Nazwa musi się składać min z 3 znaków', amount: 'Ilość powinna wynosić od 1 do 10000' };

  private static stepErrorMessages = {
    description: 'Opis musi się składać min z 10 znaków',
    url: 'Link powinien pochodzic z serwisu YouTube',
    photo: 'Format zdjęcia jest niepoprawny',
  };

  private static methods = {
    name: Validator.validateName,
    amount: Validator.validateAmount,
    description: Validator.validateDescription,
    photo: Validator.validateImg,
    url: Validator.validateUrl,
  };

  private static validateName(name: string) {
    return name.length >= 3;
  }

  private static validateAmount(amount: string) {
    return Validator.amountRegexp.test(amount);
  }

  private static validateDescription(description: string) {
    return description.length >= 10;
  }

  private static validateImg(img: File) {
    return !img || imgFileTypes.includes(img.type);
  }

  private static validateUrl(url: string) {
    return !url || url.startsWith('https://www.youtube.com/');
  }

  private static getErrorsArray(entries: [string, string | File][], type: 'productErrorMessages' | 'stepErrorMessages') {
    return entries.reduce((acc, [key, value]) => {
      const isValid: boolean = Validator.methods[key](value);
      if (!isValid) acc.push(Validator[type][key]);
      return acc;
    }, [] as string[]);
  }

  static validateProduct(product: Omit<IProduct, 'unit' | 'id'>) {
    const productEntries = Object.entries(product);

    const productErrors = Validator.getErrorsArray(productEntries, 'productErrorMessages');

    return productErrors.length ? { errors: productErrors } : null;
  }

  static validateStep(step: Omit<IStep, 'id'>) {
    const stepEntries = Object.entries(step);

    const stepErrors = Validator.getErrorsArray(stepEntries, 'stepErrorMessages');

    return stepErrors.length ? { errors: stepErrors } : null;
  }
}

export default Validator;
