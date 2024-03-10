import { CSSProperties, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { AdvancedFile } from "../../models/common";
import { Header, Icon } from "semantic-ui-react";

interface Props {
  setFiles: (files: AdvancedFile[]) => void;
}

const dropzoneStyle: CSSProperties = {
  border: "dashed 3px #eee",
  borderColor: "#eee",
  borderRadius: "5px",
  paddingTop: "30px",
  textAlign: "center",
  height: 200,
};

const dropzoneActiveStyle: CSSProperties = {
  borderColor: "green",
};

export default function PhotoWidgetDropzone({ setFiles }: Props) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );
    },
    [setFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={
        isDragActive
          ? { ...dropzoneStyle, ...dropzoneActiveStyle }
          : dropzoneStyle
      }
    >
      <input {...getInputProps()} />
      <Icon name="upload" size="huge" />
      <Header content={"Drop image here"} />
    </div>
  );
}
