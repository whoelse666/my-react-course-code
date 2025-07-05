import InternalForm from "./Form";
import Item from "./Item";

type InternalFormType = typeof InternalForm;

interface FormInterFace extends InternalFormType {
  Item: typeof Item;
}

const Form = InternalForm as FormInterFace;
Form.Item = Item;
export default Form;
