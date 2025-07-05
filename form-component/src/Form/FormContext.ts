import { createContext } from "react";

export interface FormContestProps {
  values?: Record<string, any>;
  onValueChange?: (key: string, value: any) => void;
  setValues?: (values: Record<string, any>) => void;
  validateRegister?: (name: string, cb: Function) => void;
}

export default createContext<FormContestProps>({});
