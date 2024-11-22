import { UseFormRegister } from "react-hook-form";
import { TaskFormInputs } from "../types";

type InputFieldName = keyof TaskFormInputs;
interface InputProps {
  id: InputFieldName;
  label: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<TaskFormInputs>;
  validation?: object;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type = "text",
  placeholder,
  register,
  validation,
  error,
}) => (
  <div className="mb-4 ">
    <label className="block dark:text-white  text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      {...register(id, validation)}
      type={type}
      placeholder={placeholder}
      className={`mt-1 block w-full p-2 border dark:bg-gray-700 dark:text-white text-black border-gray-300 rounded-md ${
        error ? "border-red-500" : ""
      }`}
    />
    {error && <p className="text-red-500 text-[12px] mt-1">{error}</p>}
  </div>
);

export default Input;
