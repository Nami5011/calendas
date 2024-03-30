import { useFormContext } from "react-hook-form";
import { findInputError, isFormInvalid } from "../utils/validations";

interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	validation?: {
		required?: {
			value: boolean;
			message: string;
		}
		pattern?: {
			value: RegExp;
			message: string;
		}
		minLength?: {
			value: number;
			message: string;
		}
		maxLength?: {
			value: number;
			message: string;
		}
	}
}
Input.defaultProps = {
	type: 'text',
}
function Input({ label, name, id, validation, ...restProps }: InputProps) {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	const inputError = findInputError(errors, name || '');
	const isInvalid = isFormInvalid(inputError);
	return (
		<>
			<label className="mx-2" htmlFor={id}>{label}<span className="text-red-700">*</span></label>
			<div className="my-2">
				<input className="p-3 w-full border border-gray-500 text-black font-medium rounded-lg"
					id={id}
					{...register(name || '', validation)}
					aria-invalid={isInvalid ? "true" : "false"}
					{...restProps}
				/>
				{isInvalid &&
					<p className="mx-2 text-red-700 dark:text-red-400">{inputError.error.message}</p>
				}
			</div>
		</>
	);
}
export default Input;
