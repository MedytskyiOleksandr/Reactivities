import { AxiosError } from "axios";
import { Message } from "semantic-ui-react";

interface Props {
  errors: AxiosError | any;
}

function ValidationErrors({ errors }: Props) {
  return (
    <Message error>
      {errors.isAxiosError ? (
        <Message.List>
          {errors.response.data.map(
            (error: { code: string; description: string }, index: number) => (
              <>
                <Message.Item key={index}>{error.description}</Message.Item>
              </>
            )
          )}
        </Message.List>
      ) : errors}
    </Message>
  );
}

export default ValidationErrors;
