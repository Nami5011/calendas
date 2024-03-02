import { useFormContext } from "react-hook-form";
import { EmailPattern, findInputError, isFormInvalid } from "../utils/validations";

type InputProps = {
	label: string;
	name: string
	type?: 'email' | 'text' | 'tel' | 'url';
	id?: string;
	placeholder?: string;
	maxLength?: number;
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
function Input({ label, name, type, id, placeholder, maxLength, validation }: InputProps) {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	if (type === 'email') {
		// Register email pattern
		let pattern = {
			value: EmailPattern,
			message: 'Invalid email format',
		};
		validation = { pattern, ...validation };
	}

	const inputError = findInputError(errors, name);
	const isInvalid = isFormInvalid(inputError);
	return (
		<>
			<label className="mx-2" htmlFor={id}>{label}<span className="text-red-700">*</span></label>
			<div className="my-2">
				<input className="p-3 w-full border border-gray-500 text-black font-medium rounded-lg"
					type={type}
					id={id}
					placeholder={placeholder}
					maxLength={maxLength}
					{...register(name, validation)}
					aria-invalid={isInvalid ? "true" : "false"}
				/>
				{isInvalid &&
					<p className="mx-2 text-red-700 dark:text-red-400">{inputError.error.message}</p>
				}
			</div>
		</>
	);
}
export default Input;
