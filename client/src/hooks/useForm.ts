import { useState, ChangeEventHandler, FormEventHandler } from "react";

const useForm = <TFormShape extends { [k: string]: unknown }>(
  initialValues: TFormShape
) => {
  const [formState, setFormState] = useState(initialValues);

  const setFieldValue = (name: keyof TFormShape, value: unknown) => {
    setFormState((state) => ({ ...state, [name]: value }));
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.persist();
    const { name, value } = e.currentTarget;
    setFieldValue(name, value);
  };

  const handleSubmit: (
    submitHandler: (formValues: TFormShape) => unknown
  ) => FormEventHandler<HTMLFormElement> = (submitHandler) => (e) => {
    e.preventDefault();
    console.log({ e }, "handlesSubmit");

    submitHandler(formState);
  };

  return {
    state: formState,
    setFieldValue,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
