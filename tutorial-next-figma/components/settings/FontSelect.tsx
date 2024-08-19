import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface FontSelectProps {
  config: {
    property: string;
    placeholder: string;
    options: { label: string; value: string }[];
  };
  fontSize: string;
  fontWeight: string;
  fontFamily: string;
  handleInputChange: (property: string, value: string) => void;
}

function FontSelect({
  config,
  fontSize,
  fontWeight,
  fontFamily,
  handleInputChange,
}: FontSelectProps) {
  return (
    <Select
      key={config.property}
      onValueChange={(value) => handleInputChange(config.property, value)}
      value={
        config.property === "fontFamily"
          ? fontFamily
          : config.property === "fontSize"
            ? fontSize
            : fontWeight
      }
    >
      <SelectTrigger className="no-ring w-full rounded-sm border border-primary-grey-200">
        <SelectValue
          placeholder={
            config.property === "fontFamily"
              ? "Choose a font"
              : config.property === "fontSize"
                ? "30"
                : "Semibold"
          }
        />
      </SelectTrigger>
      <SelectContent className="border-primary-grey-200 bg-primary-black text-primary-grey-300">
        {config.options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="hover:bg-primary-green hover:text-primary-black"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default FontSelect;
