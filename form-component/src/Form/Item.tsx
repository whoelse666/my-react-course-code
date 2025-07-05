import React, { useContext, useEffect, useState, type ChangeEvent, type CSSProperties, type ReactElement, type ReactNode } from "react";
import FormContext from "./FormContext";
import classNames from "classnames";
import Schema from "async-validator";
export interface ItemProps {
  className?: string;
  style?: CSSProperties;
  label?: ReactNode;
  name?: string;
  valuePropName?: string;
  rules?: Array<Record<string, any>>;
  children?: ReactElement;
}

export default function Item(props: ItemProps) {
  const { className, label, children, style, name, valuePropName, rules } = props;

  if (!name) {
    return children;
  }
  const [value, setValue] = useState<string | number | boolean>();
  const [error, setError] = useState("");
  const { onValueChange, values, setValues, validateRegister } = useContext(FormContext);
  const propsName: Record<string, any> = {};

  if (valuePropName) {
    propsName[valuePropName] = value;
  } else {
    propsName.value = value;
  }

  const getValueFromEvent = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    console.log("target :>> ", target);
    if (target.type === "checkbox") {
      return target.checked;
    }
    return target.value;
  };
  useEffect(() => {
    if (value !== values?.[name]) {
      setValue(values?.[name]);
    }
  }, [values, values?.[name]]);

  const handleValidate = (value: any) => {
    let errorMsg = null;
    if (Array.isArray(rules) && rules.length) {
      const validator = new Schema({
        [name]: rules.map(rule => {
          return {
            type: "string",
            ...rule
          };
        })
      });

      validator.validate({ [name]: value }, errors => {
        if (errors) {
          if (errors?.length) {
            setError(errors[0].message!);
            errorMsg = errors[0].message;
          }
        } else {
          setError("");
          errorMsg = null;
        }
      });
    }

    return errorMsg;
  };

  useEffect(() => {
    console.log("111 :>> ", validateRegister);
    validateRegister?.(name, () => handleValidate(value));
  }, [value]);
  const childEle =
    React.Children.toArray(children).length > 1
      ? children
      : React.cloneElement(children!, {
          ...propsName,
          onChange: (e: ChangeEvent<HTMLInputElement>) => {
            const value = getValueFromEvent(e);
            setValue(value);
            onValueChange?.(name, value);
            handleValidate(value);
          }
        });

  const cls = classNames("ant-form-item", className);
  return (
    <div style={style} className={cls}>
      <div>{label && <label>{label}</label>}</div>
      <div>
        {childEle}
        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
    </div>
  );
}
