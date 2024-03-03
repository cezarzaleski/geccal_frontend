import {Autocomplete, TextField,} from "@mui/material";
import React from 'react';
import {AutocompleteChangeDetails} from '@mui/base/AutocompleteUnstyled/useAutocomplete';

type Option = {
	id: string;
	name: string;
};

type Props = {
	name: string;
	label: string;
	isLoading: boolean;
	isDisabled: boolean;
	multiple?: boolean;
	freeSolo?: boolean;
	values: string | Array<string>;
	options?: Option[];
	error?: boolean;
	helperText?: string;

	handleChange: (value: string | Array<string>) => void;
};

export const AutoCompleteCustom = ({
	name,
	label,
	multiple = false,
	freeSolo = false,
	values = multiple ? [] : '',
	options = [],
	isLoading,
	isDisabled,
	handleChange,
	error = false,
	helperText = "",
}: Props) => {
	// ...

	const handleOnChange = (
		event: React.SyntheticEvent<Element, Event>,
		newValue: string | Option | (string | Option)[] | null,
		reason: string,
		details?: AutocompleteChangeDetails<Option> | undefined,
	) => {
		if (typeof newValue === "string") {
			// A new value has been entered
			handleChange(newValue);
		} else if (Array.isArray(newValue)) {
			// handleChange(newValue.map((option: Option) => option.id));
		} else if (newValue) {
			handleChange(newValue.id);
		} else {
			handleChange("");
		}
	};

	const isEqualId = (option: Option, value: Option | string) => {
		if (Array.isArray(value)) {
			if (value.length) return false;
			return value.length > 0 ? option.id === value[0].id : false;
		}
			return option.id === value;
	};

	const getOptionLabel = (option: string | Option | Array<Option>) => {
		console.log(option);
		if (typeof option === "string") {
			const matchingOption = options.find((opt) => opt.id === option);
			return matchingOption ? matchingOption.name : option;
		}
		if (Array.isArray(option)) {
			return option.length && option[0]?.name ? option[0]?.name : "";
		} if (option && typeof option === "object") {
			return option.name || "";
		}
			return "";
	};

	// @ts-ignore
	return (
		<Autocomplete
			multiple={multiple}
			freeSolo={freeSolo}
			noOptionsText={"Nenhuma opção encontrada"}
			value={values}
			options={options || []}
			loading={isLoading}
			onChange={handleOnChange}
			renderInput={(params) => (
				<TextField
					{...params}
					label={label}
					data-testid={`${name}-input`}
					error={error}
					helperText={helperText}
				/>
			)}
			data-testid={`${name}-search`}
			renderOption={(props, option: Option) => (
				<li {...props} key={option.id}>
					{option.name}
				</li>
			)}
			isOptionEqualToValue={isEqualId}
			disabled={isDisabled || !options}
			getOptionLabel={getOptionLabel}
		/>
	);
};
