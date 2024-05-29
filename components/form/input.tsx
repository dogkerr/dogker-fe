import { ReactNode, forwardRef } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useFormContext } from "react-hook-form";

type FormInputProps = {
  label: string;
  placeholder?: string;
  type?: string;
  description?: string | ReactNode;
  name: string;
  readonly?: boolean;
};

const FormInput = forwardRef(
  (
    {
      label,
      placeholder = "",
      type = "text",
      description = "",
      name,
      readonly,
    }: FormInputProps,
    // eslint-disable-next-line
    ref
  ) => {
    const form = useFormContext();

    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormDescription>{description}</FormDescription>
            <FormControl>
              <Input
                readOnly={readonly}
                placeholder={placeholder}
                type={type}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
