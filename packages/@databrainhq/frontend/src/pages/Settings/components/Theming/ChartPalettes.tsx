/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/forbid-dom-props */
import { Ui } from '@databrainhq/plugin';
import { useEffect, useState } from 'react';
import { FieldValues, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import Flex from 'components/Flex';
import ChartPaletteRadioOption, { ChartPalette } from './ChartPaletteOption';
import AccessControl from 'components/AccessControl';

export const CHART_PALETTES: ChartPalette[] = [
  {
    name: 'Default',
    colors: [
      '#5470c6',
      '#91cc75',
      '#fac858',
      '#ee6666',
      '#73c0de',
      '#3ba272',
      '#fc8452',
      '#9a60b4',
      '#ea7ccc',
    ],
  },
  {
    name: 'Dark',
    colors: [
      '#292929',
      '#4c4c4c',
      '#737373',
      '#9b9b9b',
      '#c6c6c6',
      '#919191',
      '#5f5e60',
      '#313033',
      '#010005',
    ],
  },
  {
    name: 'Pastel',
    colors: [
      '#00876c',
      '#5c9d72',
      '#90b280',
      '#bfc796',
      '#e8ddb3',
      '#e2bc87',
      '#e09766',
      '#dc6e53',
      '#d43d51',
    ],
  },
  {
    name: 'Bright',
    colors: [
      '#00876c',
      '#51a676',
      '#88c580',
      '#c2e38c',
      '#ffff9d',
      '#fdd172',
      '#f7a258',
      '#ea714e',
      '#d43d51',
    ],
  },
];

type Props = {
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  palettes?: ChartPalette[];
};

const ChartPalettes: React.FC<Props> = ({ watch, setValue, palettes }) => {
  const [chartPalettes, setChartPalettes] = useState(CHART_PALETTES);
  const [newPalette, setNewPalette] = useState({
    name: '',
    colors: new Map(),
    current: 0,
  });

  useEffect(() => {
    setValue('chartPalettes', chartPalettes);
  }, [chartPalettes]);

  useEffect(() => {
    if (!palettes) setChartPalettes(CHART_PALETTES);
    else setChartPalettes(palettes);
  }, [palettes]);

  return (
    <Ui.PopoverMenu
      buttonContent={
        // <Ui.InputField
        //   type="text"
        //   isDisabled
        //   placeholder="Chart Palette"
        //   value={watch().chartPalette}
        //   onChange={({ target: { value } }) => setValue('chartPalette', value)}
        // />
        <Ui.Button
          variant="tab"
          className="dbn-w-full !dbn-justify-between"
          rightIcon={<Ui.Icons name="caret-down-fill" size="xs" />}
        >
          {watch().chartPalette || 'Select Chart Palette'}
        </Ui.Button>
      }
      tabMenu
      menuWidth="68%"
      position="bottom"
    >
      <Flex className="dbn-gap-x-[10%] dbn-gap-y-5 dbn-flex-wrap  dbn-max-h-[150px] dbn-overflow-y-auto dbn-p-3">
        {chartPalettes.map((palette) => (
          <div key={palette.name} className="dbn-w-[45%]">
            <ChartPaletteRadioOption
              key={palette.name}
              palette={palette}
              setValue={setValue}
              watch={watch}
            >
              <AccessControl feature="uiTheming" permission="Edit">
                {!CHART_PALETTES.find((cp) => cp.name === palette.name) ? (
                  <div className="dbn-absolute -dbn-right-10 dbn-inline-flex dbn-justify-center dbn-items-center dbn-rounded ">
                    <Ui.Button
                      variant="tertiary"
                      type="button"
                      title="Remove"
                      onClick={() => {
                        setChartPalettes((prev) =>
                          prev.filter((cp) => cp.name !== palette.name)
                        );
                      }}
                    >
                      <Ui.Icons name="cross" size="sm" />
                    </Ui.Button>
                  </div>
                ) : null}
              </AccessControl>
            </ChartPaletteRadioOption>
          </div>
        ))}
      </Flex>
      <AccessControl feature="uiTheming" permission="Edit">
        <details className="dbn-w-full dbn-border-t dbn-border-secondary dbn-p-3 dbn-flex dbn-items-center dbn-outline-none">
          <summary className="dbn-cursor-pointer">
            Add a custom chart palette
          </summary>
          <Flex direction="col" className="dbn-pt-2 dbn-relative">
            <Ui.InputField
              type="text"
              name="paletteName"
              placeholder="Enter the color palette name"
              value={newPalette.name}
              onChange={({ target: { value } }) =>
                setNewPalette((prev) => ({ ...prev, name: value }))
              }
            />
            <Ui.Button
              type="button"
              variant="popover"
              className="dbn-absolute -dbn-top-6 dbn-right-0 dbn-text-blue-h4 dbn-h-fit dbn-w-fit dbn-font-semibold"
              onClick={() => {
                if (!newPalette.name || !newPalette.colors.size) return;
                setChartPalettes((prev) => [
                  ...prev,
                  {
                    name: newPalette.name,
                    colors: Array.from(newPalette.colors.values()),
                  },
                ]);
                setNewPalette({
                  name: '',
                  colors: new Map(),
                  current: 0,
                });
              }}
            >
              Save Color Palette
            </Ui.Button>
            <Flex
              alignItems="center"
              justify="between"
              className="dbn-w-full dbn-pt-2"
            >
              <div className="dbn-flex dbn-gap-2">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((colorSpace) => (
                  <span
                    key={colorSpace}
                    className={`dbn-w-5 dbn-h-5 dbn-border dbn-border-secondary dbn-cursor-pointer dbn-rounded ${
                      newPalette.current === colorSpace
                        ? 'dbn-border-blue-h4'
                        : ''
                    }`}
                    title={
                      newPalette.colors.get(colorSpace) || 'Click to set color'
                    }
                    style={{
                      backgroundColor:
                        newPalette.colors.get(colorSpace) || '#E4E4E4',
                    }}
                    onClick={() =>
                      setNewPalette((prev) => {
                        const colors = prev.colors;
                        colors.set(
                          colorSpace,
                          colors.get(colorSpace) || '#000000'
                        );
                        return {
                          ...prev,
                          colors,
                          current: colorSpace,
                        };
                      })
                    }
                  />
                ))}
              </div>
              <div>
                <Ui.ColorField
                  name="newPaletteColorSpace"
                  placeholder="#FFA056"
                  defaultValue="#FFA056"
                  className="dbn-w-32"
                  value={newPalette.colors.get(newPalette.current)}
                  onChange={(value) =>
                    setNewPalette((prev) => {
                      const colors = prev.colors;
                      colors.set(prev.current, value);
                      return { ...prev, colors };
                    })
                  }
                />
              </div>
            </Flex>
          </Flex>
        </details>
      </AccessControl>
    </Ui.PopoverMenu>
  );
};

export default ChartPalettes;
