/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable react/forbid-dom-props */
import { FieldValues, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { Ui } from '@databrainhq/plugin';
import useAccessControl from 'hooks/useAccessControl';

export type ChartPalette = {
  name: string;
  colors: string[];
};

type Props = React.PropsWithChildren & {
  palette: ChartPalette;
  setValue: UseFormSetValue<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  defaultChecked?: boolean;
};

const ChartPaletteRadioOption: React.FC<Props> = ({
  palette,
  setValue,
  watch,
  children,
}) => {
  const { getIsCanAccess } = useAccessControl();
  return (
    <>
      <Ui.RadioButton
        type="radio"
        name="chartPalette"
        label={palette.name}
        id={`chartPalette-${palette.name}`}
        value={palette.name}
        checked={watch().chartPalette === palette.name}
        onChange={({ target: { checked } }) => {
          if (checked) {
            setValue('chartPalette', palette.name);
            // setValue('chartPalettes', palette);
          }
        }}
        isDisabled={!getIsCanAccess('uiTheming', 'Edit')}
        rightIcon={
          <div className="dbn-flex dbn-gap-2 dbn-justify-between dbn-items-center dbn-relative">
            {palette.colors?.map((color) => (
              <span
                key={color}
                className="dbn-w-5 dbn-h-5 dbn-border dbn-border-secondary dbn-rounded"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
            {children}
          </div>
        }
      />
    </>
  );
};

export default ChartPaletteRadioOption;
