import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";

interface Props {
  placeholder: string;
  name: string;
  label?: string;
  rows?: number;
  type?: string;
}

function TextInput(props: Props) {
  const [field, meta] = useField(props.name);

  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      {props.rows ? (
        <textarea
          style={{ resize: "none", width: "100%" }}
          {...field}
          {...props}
        />
      ) : (
        <input {...field} {...props} />
      )}
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
}

export default TextInput;
