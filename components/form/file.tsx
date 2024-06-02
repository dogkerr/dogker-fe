"use client";
import { cn } from "@/lib/utils";
import { CloudUpload } from "lucide-react";
import Dropzone from "react-dropzone";
import { useFormContext } from "react-hook-form";

type FormFileProps = {
  label: string;
  name: string;
};

const FormFile = ({ label, name }: FormFileProps) => {
  const form = useFormContext();

  const onDrop = (acceptedFiles: File[]) => {
    form.setValue(name, acceptedFiles);
    form.trigger(name);
  };

  return (
    <Dropzone onDrop={onDrop}>
      {({ getRootProps, getInputProps, isDragActive, acceptedFiles }) => (
        <div className="space-y-2">
          <label
            className={cn(
              "text-sm font-medium",
              form.getFieldState(name).error && "text-red-500"
            )}
            htmlFor="dropzone"
          >
            {label}
          </label>
          <div
            className={cn(
              "border-2 flex items-center justify-center text-center border-dashed px-3 py-5 rounded-md",
              form.getFieldState(name).error && "border-red-500",
              isDragActive && "border-primary"
            )}
          >
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <>
                <CloudUpload strokeWidth={1} className="w-20 mx-auto h-20" />
                <p className="text-xs">
                  Drag n drop some files here, or click to select files
                </p>
              </>
              <ul className="mt-3">
                {acceptedFiles.map((file, index) => (
                  <li
                    key={file.name}
                    className="text-xs flex items-center justify-center"
                  >
                    Uploaded file:
                    <span className="max-w-40 mx-1 inline-block truncate">
                      {" "}
                      {file.name}{" "}
                    </span>
                    - {file.size} bytes
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {form.getFieldState(name).error && (
            <p className="text-sm font-medium text-red-500">
              {form.getFieldState(name).error?.message as string}
            </p>
          )}
        </div>
      )}
    </Dropzone>
  );
};
export default FormFile;
