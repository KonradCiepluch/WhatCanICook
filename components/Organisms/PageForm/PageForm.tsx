import React from 'react';
import { useForm, FormProvider, FieldValues, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import useRequestState, { StatusType } from 'hooks/useRequestState';
import { Button, Message, FormField } from 'components/Atoms';
import IField, { SchemaType } from 'interfaces/Form';
import styles from './PageForm.module.scss';

type Props = {
  content: { heading: string; submitLabel: string; successMessage?: string };
  inputsArray: IField[];
  schema: SchemaType;
  submitHandler: (data: FieldValues) => Promise<void>;
  children?: (requestHandler: (type: StatusType, msg?: string) => void, isLoadingState: boolean, isSuccessState?: boolean) => React.ReactChild;
  isBeforeSubmit?: boolean;
};

const PageForm = ({ content: { heading, successMessage, submitLabel }, inputsArray, schema, submitHandler, children, isBeforeSubmit }: Props) => {
  const [{ isErrorState, isLoadingState, isSuccessState, errMsg }, handleRequest] = useRequestState();

  const methods = useForm({ resolver: yupResolver(schema) });

  const handleSubmitForm: SubmitHandler<FieldValues> = async (data) => {
    try {
      handleRequest('pending');
      await submitHandler(data);
      handleRequest('success');
      methods.reset();
    } catch (e) {
      handleRequest('error', e.message);
    }
  };

  const fields = inputsArray.map((input) => FormField[input.type](input));

  return (
    <FormProvider {...methods}>
      {isSuccessState && successMessage ? <Message message={successMessage} /> : null}
      <form onSubmit={methods.handleSubmit(handleSubmitForm)} className={styles.form}>
        <h1 className={styles.form__heading}>{heading}</h1>
        {fields}
        {isBeforeSubmit ? children(handleRequest, isLoadingState, isSuccessState) : null}
        <Button label={submitLabel} isLoading={isLoadingState} disabled={isLoadingState} />
        {isErrorState ? <span className={styles.form__error}>{errMsg}</span> : null}
        {children && !isBeforeSubmit ? children(handleRequest, isLoadingState) : null}
      </form>
    </FormProvider>
  );
};

export default PageForm;
