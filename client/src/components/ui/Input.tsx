import { HTMLAttributes, forwardRef } from "react";
import Skeleton from "react-loading-skeleton";
import { cn } from "../../lib/utils";

type InputProps = {
  label?: string;
  placeholder: string;
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
  required?: boolean;
  value?: string;
  type?: string;
  isLoading?: boolean;
  errorMessage?: string;
};

const Input = forwardRef<
  HTMLInputElement,
  InputProps & HTMLAttributes<HTMLInputElement>
>(function (
  {
    label,
    disabled,
    required = true,
    isLoading,
    placeholder,
    type = "text",
    className,
    errorMessage,
    inputClassName,
    onBlur,
    ...props
  },
  ref
) {
  return (
    <div className={className}>
      <div className="flex justify-between">
        {label && (
          <label className="pb-1 text-blacky font-medium">
            {label}
            {required && <span className="text-red-500">*</span>}
          </label>
        )}
      </div>
      {!isLoading ? (
        <input
          {...props}
          ref={ref}
          placeholder={placeholder}
          onBlur={onBlur}
          disabled={disabled}
          type={type}
          className={cn(
            "border-[1px] border-border bg-primary text-blacky rounded-sm w-full disabled:text-slate-500 focus:border-primary outline-none transition placeholder:text-gray",
            errorMessage && "border-red-400 ",
            inputClassName
          )}
        />
      ) : (
        <Skeleton height={"2.75rem"} className="mt-2" />
      )}
      {errorMessage && (
        <div className="mt-1 ml-0 text-red-500 text-[14px]">
          <i className="bx bx-error text-red-500 pb-5 mr-1 "></i>
          {errorMessage}
        </div>
      )}
    </div>
  );
});

export default Input;
