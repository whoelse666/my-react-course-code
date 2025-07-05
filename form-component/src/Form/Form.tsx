import React, { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import FormContext, { FormContestProps } from "./FormContext";

interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
  initialValues?: Record<string, any>;
  onFinish?: (values: any) => void;
  onFinishFailed?: (errors: any) => void;
}
export default function Form(props: FormProps) {
  const { children, onFinish, onFinishFailed, initialValues, ...others } = props;
  console.log("others :>> ", others);
  const [values, setValues] = useState(initialValues || {});
  const errors = useRef<Record<string, any>>({});
  const validatorMap = useRef(new Map<string, Function>());
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("handleSubmit-values :>> ", values);
    onFinish?.(values);
  };

  const onValueChange = (key: string, value: any) => {};

  const handleValidateRegister = (name: string, cb: Function) => {
    validatorMap.current.set(name, cb);
  };
  return (
    <FormContext.Provider
      value={{
        values,
        setValues,
        onValueChange,
        validateRegister: handleValidateRegister
      }}
    >
      <form {...others} onSubmit={handleSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  );
}
