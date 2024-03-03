import {AutocompleteChangeDetails} from '@mui/base/AutocompleteUnstyled/useAutocomplete';
import {Autocomplete, TextField,} from "@mui/material";
import React from 'react';

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
	values: string | Option | (string | Option)[];
	options?: Option[];
	error?: boolean;
	helperText?: string;

	handleChange: (name: string, value: string | Array<string>) => void;
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


	const handleOnChange = (
		event: React.SyntheticEvent<Element, Event>,
		newValue: string | Option | (string | Option)[] | null,
		reason: string,
		details?: AutocompleteChangeDetails<string | Option> | undefined
	) => {
		if (typeof newValue === "string") {
			// A new value has been entered
			handleChange(name, newValue);
		} else if (Array.isArray(newValue)) {
			// handleChange(newValue.map((option: Option) => option.id));
		} else if (newValue) {
			handleChange(name, newValue.id);
		} else {
			handleChange(name,"");
		}
	};

	const isEqualId = (option: string | Option, value: string | Option) => {
		const optionId = typeof option === "string" ? option : option.id;
		if (Array.isArray(value) && option instanceof Option) {
			if (value.length) return false;
			return value.length > 0 ?optionId === value[0].id : false;
		}
			return optionId === value;
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
			value={values || ''}
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
			renderOption={(props, option: string | Option) => (
				<li {...props} key={typeof option === 'string' ? option : option.id}>
					{typeof option === 'string' ? option : option.name}
				</li>
			)}
			isOptionEqualToValue={isEqualId}
			disabled={isDisabled || !options}
			getOptionLabel={getOptionLabel}
		/>
	);
};
