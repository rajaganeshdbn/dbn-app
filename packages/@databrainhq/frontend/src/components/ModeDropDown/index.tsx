/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Ui } from '@databrainhq/plugin';

type ModeDropDownProps = {
  options: string[];
  name: string;
  selectedStreams: any[];
  setSelectedStreams: React.Dispatch<React.SetStateAction<any[]>>;
  changeField: string;
  defaultValue?: string;
  isDisabled?: boolean;
};
const ModeDropDown = ({
  options,
  name,
  selectedStreams,
  setSelectedStreams,
  changeField,
  defaultValue,
  isDisabled = false,
}: ModeDropDownProps) => {
  const [isShowOptions, setShowOptions] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>(
    defaultValue || options[0]
  );
  useEffect(() => {
    if (!selectedStreams.find((s) => s.stream.name === name)) {
      setSelectedOption(options[0]);
    }
  }, [selectedStreams]);

  const changeList = (option: string) => {
    if (selectedStreams.find((s) => s.stream.name === name) && !isDisabled) {
      setSelectedOption(option);
    }
    if (changeField === 'source') {
      const streams = selectedStreams.map((s) =>
        s.stream.name === name
          ? {
              stream: s.stream,
              config: { ...s.config, syncMode: option },
            }
          : s
      );
      setSelectedStreams(streams);
    } else {
      const streams = selectedStreams.map((s) =>
        s.stream.name === name
          ? {
              stream: s.stream,
              config: { ...s.config, destinationSyncMode: option },
            }
          : s
      );
      setSelectedStreams(streams);
    }
  };
  return (
    <Ui.Button
      type="button"
      variant="tertiary"
      onClick={() => setShowOptions(!isShowOptions)}
    >
      <Ui.Text variant="body-text-sm">{selectedOption}</Ui.Text>

      <Ui.Icons name="arrow-down" />

      {isShowOptions && (
        <div className="dbn-absolute dbn-top-[110%] dbn-bg-white dbn-w-full dbn-left-0 dbn-z-10 dbn-rounded-md dbn-border dbn-divide-solid">
          {options.map((option) =>
            option === selectedOption ? (
              <Ui.Button
                type="button"
                variant="secondary"
                onClick={() => {
                  changeList(option);
                }}
              >
                <Ui.Icons name="not-found" />
                {/* check icon */}
                {option}
              </Ui.Button>
            ) : (
              <Ui.Button
                type="button"
                variant="tertiary"
                onClick={() => {
                  changeList(option);
                }}
              >
                {option}
              </Ui.Button>
            )
          )}
        </div>
      )}
    </Ui.Button>
  );
};

export default ModeDropDown;
