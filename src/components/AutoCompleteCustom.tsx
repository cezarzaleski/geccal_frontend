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
    values = multiple ? [] : [null], // Set default value based on multiple
    options = [],
    isLoading,
    isDisabled,
    handleChange,
    error = false,
    helperText = '',
  }: Props) => {
  const renderOptions = (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: any
  ) => (
    <li {...props} key={option.id}>
      {option.name}
    </li>
  );

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



  const handleOnChange = (
    _e: React.ChangeEvent<{}>,
    newValue: Option | Option[]
  ) => {
    if (multiple) {
      handleChange({target: {name, value: (newValue as Option[]).map((option: Option) => option.id)}} as any);
    } else {
      handleChange({target: {name, value: newValue ? (newValue as Option).id : ''}} as any);
    }
  };

  const renderInput = (params: AutocompleteRenderInputParams) => (
    <TextField {...params} label={label} data-testid={`${name}-input`} error={error} helperText={helperText}/>
  );

  return (
    <Autocomplete
      multiple={multiple}
      noOptionsText={'Nenhuma opção encontrada'}
      value={values} // Use values directly
      options={options || []}
      loading={isLoading}
      onChange={handleOnChange}
      renderInput={renderInput}
      data-testid={`${name}-sear ch`}
      renderOption={renderOptions}
      isOptionEqualToValue={isEqualId}
      disabled={isDisabled || !options}
      getOptionLabel={(option) => Array.isArray(option) && option.length > 0 ? option[0] : ''}
    />
  );
};