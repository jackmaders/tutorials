import FONT_FAMILY_OPTIONS from "@/constants/settings/fontFamilyOptions";
import FONT_SIZE_OPTIONS from "@/constants/settings/fontSizeOptions";
import FONT_WEIGHT_OPTIONS from "@/constants/settings/fontWeightOptions";
import FontSelect from "./FontSelect";

const selectConfigs = [
  {
    property: "fontFamily",
    placeholder: "Choose a font",
    options: FONT_FAMILY_OPTIONS,
  },
  { property: "fontSize", placeholder: "30", options: FONT_SIZE_OPTIONS },
  {
    property: "fontWeight",
    placeholder: "Semibold",
    options: FONT_WEIGHT_OPTIONS,
  },
];

interface TextProps {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  handleInputChange: (property: string, value: string) => void;
}

function Text({
  fontFamily,
  fontSize,
  fontWeight,
  handleInputChange,
}: TextProps) {
  return (
    <div className="flex flex-col gap-3 border-b border-primary-grey-200 px-5 py-3">
      <h3 className="text-[10px] uppercase">Text</h3>

      <div className="flex flex-col gap-3">
        <FontSelect
          config={selectConfigs[0]}
          fontSize={fontSize}
          fontWeight={fontWeight}
          fontFamily={fontFamily}
          handleInputChange={handleInputChange}
        />

        <div className="flex gap-2">
          {selectConfigs.slice(1).map((config) => (
            <FontSelect
              key={config.property}
              config={config}
              fontSize={fontSize}
              fontWeight={fontWeight}
              fontFamily={fontFamily}
              handleInputChange={handleInputChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Text;
