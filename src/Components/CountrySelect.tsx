import React, {useMemo} from "react";
import Select, {SingleValue} from "react-select";
import countryList from "react-select-country-list";

interface CountryOption {
  label: string;
  value: string;
}

interface CountrySelectorProps {
  value?: string;
  onChange?: (option: SingleValue<CountryOption>) => void;
  [key: string]: any;
}

const CountrySelector = ({
  value,
  onChange,
  ...props
}: CountrySelectorProps) => {
  const options = useMemo<CountryOption[]>(() => countryList().getData(), []);

  const selectedOption =
    options.find((option) => option.label === value) || null;

  const handleChange = (selected: SingleValue<CountryOption>) => {
    onChange?.(selected);
  };

  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      backgroundColor: "white",
      borderColor: state.isFocused ? "#93c5fd" : "#d1d5db",
      borderWidth: "1px",
      borderRadius: "0.375rem",
      paddingLeft: "0.5rem",
      paddingRight: "0.75rem",
      minHeight: "2.5rem",
      boxShadow: state.isFocused ? "0 0 0 1px #93c5fd" : "none",
      "&:hover": {
        borderColor: "#9ca3af",
      },
    }),
    valueContainer: (base: any) => ({
      ...base,
      padding: "0",
    }),
    indicatorsContainer: (base: any) => ({
      ...base,
      padding: "0 4px",
    }),
    input: (base: any) => ({
      ...base,
      margin: 0,
      padding: 0,
    }),
    placeholder: (base: any) => ({
      ...base,
      color: "#9ca3af",
    }),
    menu: (base: any) => ({
      ...base,
      borderRadius: "0.375rem",
      marginTop: "0.25rem",
      zIndex: 50,
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#2563eb"
        : state.isFocused
          ? "#f3f4f6"
          : "white",
      color: state.isSelected ? "white" : "black",
      cursor: "pointer",
    }),
  };

  return (
    <div className="w-full">
      <Select
        options={options}
        value={selectedOption}
        onChange={handleChange}
        styles={customStyles}
        placeholder="Select country..."
        className="w-full"
        {...props}
      />
    </div>
  );
};

export default CountrySelector;
