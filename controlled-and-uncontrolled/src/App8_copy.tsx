import { useEffect, useRef, useState } from "react";

function useMergeState<T>(
  defaultStateValue: T,
  props?: {
    defaultValue?: T;
    value?: T;
  }
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const { defaultValue, value: propsValue } = props || {};

  const isFirstRender = useRef(true);

  const [stateValue, setStateValue] = useState<T>(() => {
    if (propsValue !== undefined) {
      return propsValue;
    } else if (defaultValue !== undefined) {
      return defaultValue;
    } else {
      return defaultStateValue;
    }
  });
  useEffect(() => {
    if (propsValue === undefined && !isFirstRender.current) {
      setStateValue(propsValue!);
    }
    isFirstRender.current = false;
  }, [propsValue]);
  const mergedValue = propsValue === undefined ? stateValue : propsValue;
  return [mergedValue, setStateValue];
}

interface CalendarProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
}

function Calendar(props: CalendarProps) {
  const { value: propsValue, defaultValue, onChange } = props;

  const [mergedValue, setValue] = useMergeState(new Date(), {
    value: propsValue,
    defaultValue
  });
  // const [mergedValue, setValue] = useMergeState(propsValue || defaultValue);

  function changeValue(date: Date) {
    if (propsValue === undefined) {
      setValue(date);
    }
    onChange?.(date);
  }

  return (
    <div>
      {mergedValue?.toLocaleDateString()}
      <button
        onClick={() => {
          changeValue(new Date("2024-5-1"));
        }}
      >
        2023-5-1
      </button>
      <button
        onClick={() => {
          changeValue(new Date("2024-5-2"));
        }}
      >
        2023-5-2
      </button>
      <button
        onClick={() => {
          changeValue(new Date("2024-5-3"));
        }}
      >
        2023-5-3
      </button>
    </div>
  );
}

function App() {
  const [value, setValue] = useState<Date | undefined>(new Date("2024-5-1"));

  return (
    <>
      <button onClick={() => setValue(undefined)}>切换到非受控模式</button>
      <Calendar
        defaultValue={value}
        onChange={date => {
            console.log(date.toLocaleDateString());
        }}
      />
    </>
  );
}

export default App;
