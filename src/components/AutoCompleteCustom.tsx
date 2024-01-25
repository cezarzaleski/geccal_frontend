import { Autocomplete, AutocompleteRenderInputParams, TextField } from '@mui/material';

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
  values: (any);
  options?: (Option)[];
  error?: boolean;
  helperText?: string;

  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const AutoCompleteCustom = (
  {
    name,
    label,
    multiple = false,
    freeSolo = false,
    values = multiple ? [] : [null],
    options = [],
    isLoading,
    isDisabled,
    handleChange,
    error = false,
    helperText = '',
  }: Props) => {
  // ...

  const handleOnChange = (
    _e: React.ChangeEvent<{}>,
    newValue: Option | Option[] | string
  ) => {
    if (typeof newValue === 'string') {
      // A new value has been entered
      handleChange({target: {name, value: newValue}} as any);
    } else if (multiple) {
      // Multiple existing options have been selected
      handleChange({target: {name, value: (newValue as Option[]).map((option: Option) => option.id)}} as any);
    } else {
      // A single existing option has been selected
      handleChange({target: {name, value: newValue ? (newValue as Option).id : ''}} as any);
    }
  };

  const isEqualId = (
    option: Option,
    value: Option | any
  ) => {
    if (Array.isArray(value)) {
      if (value.length) return false
      return value.length > 0 ? option.id === value[0].id : false;
    } else {
      return option.id === value;
    }
  };

  const getOptionLabel = (option: any) => {
    if (typeof option === 'string') {
      const matchingOption = options.find((opt) => opt.id === option);
      return matchingOption ? matchingOption.name : option;
    } else if (Array.isArray(option)) {
      return option.length && option[0]?.name ? option[0]?.name : '';
    } else if (option && typeof option === 'object') {
      return option.name || '';
    } else {
      return '';
    }
  };

  return (
    <Autocomplete
      multiple={multiple}
      freeSolo={freeSolo}
      noOptionsText={'Nenhuma opção encontrada'}
      value={values}
      options={options || []}
      loading={isLoading}
      onChange={handleOnChange}
      renderInput={(params) => (
        <TextField {...params} label={label} data-testid={`${name}-input`} error={error} helperText={helperText}/>
      )}
      data-testid={`${name}-search`}
      renderOption={(props, option: any) => (
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