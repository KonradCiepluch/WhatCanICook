import * as React from 'react';

import IField from 'interfaces/Form';
import FormTextField from './FormTextField/FormTextField';
import FormSelectField, { ISelectProps } from './FormSelectField/FormSelectField';
import FormCheckboxField from './FormCheckboxField/FormCheckboxField';
import FormFileField from './FormFileField/FormFileField';

export default {
  text: (props: IField) => <FormTextField {...props} key={props.name} />,
  password: (props: IField) => <FormTextField {...props} key={props.name} />,
  select: (props: ISelectProps) => <FormSelectField {...props} key={props.name} />,
  checkbox: (props: IField) => <FormCheckboxField {...props} key={props.name} />,
  file: (props: IField) => <FormFileField {...props} key={props.name} />,
};
