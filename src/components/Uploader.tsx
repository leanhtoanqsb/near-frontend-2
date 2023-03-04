import { ReactNode } from "react";
import styled from "styled-components";
import { CloseCircle, GalleryAdd } from "iconsax-react";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { Button } from "./Buttons";
import { Loading } from "./Loading";
import { colors } from "../utils/colors";

export default function Uploader({
  label,
  onChange,
  hasError,
  maxSize,
  holder,
}: UploaderProps) {
  const [file, setFile] = useState<FileProps | null>(null);
  const [loading, setLoading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/png": [".png"], "image/jpeg": [".jpeg", ".jpg"] },
    multiple: false,
    onDrop: (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) return;
      const file = {
        file: acceptedFiles[0],
        preview: URL.createObjectURL(acceptedFiles[0]),
      };
      if (acceptedFiles[0].size >= (maxSize ?? 10 * 1024 * 1024)) {
        toast.error("Tải ảnh không thành công do sai định dạnh ảnh!");
        return;
      }
      setFile(file);
      if (onChange) onChange(file);
      setLoading(true);
    },
    onDropRejected: () => {
      toast.error("Tải ảnh không thành công do sai định dạnh ảnh!");
    },
  });

  useEffect(
    () => () => {
      if (file) URL.revokeObjectURL(file.preview);
    },
    [file]
  );

  const clearFile = useCallback(() => {
    if (!file) return;
    URL.revokeObjectURL(file.preview);
    setFile(null);
    if (onChange) onChange(null);
  }, [file, onChange]);
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Label>{label}</Label>

      <LoaderContainer>
        {file ? (
          <ImageContainer style={{ position: "relative" }}>
            <div
              onClick={clearFile}
              style={{ flexShrink: 0, position: "absolute", top: 0, right: 0 }}
            >
              <CloseCircle size={24} />
            </div>

            <div style={{ display: loading ? "block" : "none", flex: 1 }}>
              <Loading />
            </div>
            <div style={{ display: loading ? "none" : "block", flex: 1 }}>
              {/* <div style={{ width: "100%", height: "100%" }}> */}
              <img
                src={file.preview}
                alt="preview-image"
                width="100%"
                style={{
                  objectFit: "contain",
                  objectPosition: "center",
                }}
                onLoad={() => setLoading(false)}
              />
              {/* </div> */}
            </div>
          </ImageContainer>
        ) : (
          <div
            role="button"
            {...getRootProps()}
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <input {...getInputProps()} />
            <div style={{ color: colors.primary1 }}>
              <GalleryAdd size={40} />
            </div>
            <p>{holder ? holder : "JPG, PNG..."}</p>
          </div>
        )}
      </LoaderContainer>
    </div>
  );
}

const Label = styled.p`
  font-weight: 600;
  font-size: 16px;
  line-height: 34px;
  margin-bottom: 16px;

  span {
    color: #a9a9a9;
    font-size: 14px;
  }
`;
const LoaderContainer = styled.div`
  overflow: hidden;
  flex: 1;
  background: #252629;
  border: 1px dashed #52df9b;
`;
const ImageContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

interface FileProps {
  file: File;
  preview: string;
}
export type UploaderProps = {
  label: ReactNode;
  onChange: (file: FileProps | null) => void;
  hasError?: boolean;
  maxSize?: number;
  holder?: React.ReactNode;
};
