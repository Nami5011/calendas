import { FieldErrors, FieldValues } from "react-hook-form";

export const EmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function findInputError(errors: FieldErrors<FieldValues>, name: string): FieldValues {
	const filtered = Object.keys(errors)
		.filter((key) => key.includes(name))
		.reduce((cur, key) => {
			return Object.assign(cur, { error: errors[key] });
		}, {});
	return filtered;
}

export function isFormInvalid(err: any) {
	if (Object.keys(err).length > 0) return true;
	return false;
}
