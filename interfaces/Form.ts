import * as yup from 'yup';
import { ObjectShape, Assign, AnyObject } from 'yup/lib/object';
import { RequiredStringSchema } from 'yup/lib/string';

interface IField {
  name: string;
  type: string;
  placeholder?: string;
  id?: string;
  label?: string;
  disabled?: boolean;
}

export type SchemaType = yup.ObjectSchema<
  Assign<
    ObjectShape,
    {
      email?: RequiredStringSchema<string, AnyObject>;
      firstname?: RequiredStringSchema<string, AnyObject>;
      surname?: RequiredStringSchema<string, AnyObject>;
      password?: RequiredStringSchema<string, AnyObject>;
      image?: RequiredStringSchema<string, AnyObject>;
    }
  >
>;

export default IField;
