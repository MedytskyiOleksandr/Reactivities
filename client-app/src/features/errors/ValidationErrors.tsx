import React from "react";
import { Message } from "semantic-ui-react";

interface Props {
  errors: string[] | null;
}

function ValidationErrors({ errors }: Props) {
  return (
    <Message error>
      {errors && (
        <Message.List>
          {errors.map((error: any, i) => (
            <Message.Item key={i}>{error}</Message.Item>
          ))}
        </Message.List>
      )}
    </Message>
  );
}

export default ValidationErrors;
