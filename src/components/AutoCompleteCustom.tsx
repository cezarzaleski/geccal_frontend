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
    values,
    options = [],
    isLoading,
    isDisabled,
    handleChange,
    multiple = false,
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

    return option.id === value.id;
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
      value={multiple ? values : values[0]}
      options={options || []}
      loading={isLoading}
      onChange={handleOnChange}
      renderInput={renderInput}
      data-testid={`${name}-search`}
      renderOption={renderOptions}
      isOptionEqualToValue={isEqualId}
      disabled={isDisabled || !options}
      getOptionLabel={(option) => option.name}
    />
  );
};