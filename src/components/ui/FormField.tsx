import {
  type FormHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import clsx from "clsx";

const controlBase =
  "w-full rounded-md bg-background border border-border text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const inputClass = `${controlBase} h-11 px-3`;
const textareaClass = `${controlBase} px-3 py-2 resize-none`;

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  placeholder?: boolean;
  children: ReactNode;
}

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
}

interface ModalFormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}

export const ModalForm = ({ children, className, ...props }: ModalFormProps) => (
  <form className={clsx("space-y-4", className)} {...props}>
    {children}
  </form>
);

export const Field = ({ id, label, className, ...props }: FieldProps) => (
  <>
    <label htmlFor={id} className="sr-only">
      {label}
    </label>
    <input id={id} className={clsx(inputClass, className)} {...props} />
  </>
);

export const SelectField = ({
  id,
  label,
  placeholder,
  className,
  children,
  ...props
}: SelectFieldProps) => (
  <>
    <label htmlFor={id} className="sr-only">
      {label}
    </label>
    <select
      id={id}
      className={clsx(inputClass, placeholder && "text-muted-foreground", className)}
      {...props}
    >
      {children}
    </select>
  </>
);

export const TextareaField = ({
  id,
  label,
  className,
  ...props
}: TextareaFieldProps) => (
  <>
    <label htmlFor={id} className="sr-only">
      {label}
    </label>
    <textarea id={id} className={clsx(textareaClass, className)} {...props} />
  </>
);
