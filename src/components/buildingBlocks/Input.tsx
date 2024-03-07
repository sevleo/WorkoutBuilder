import { useState } from "react";

interface InputProps {
  id: string;
  type: string;
  label: string;
  defaultValue: number;
  onChange: (newLength: number) => void;
}

export default function Input({
  id,
  type,
  label,
  defaultValue,
  onChange,
  setDragAllowed,
}: InputProps) {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "" || event.target.value.startsWith("0")) {
      setValue(Number(1));
      onChange(Number(1));
    } else {
      setValue(Number(event.target.value));
      onChange(Number(event.target.value));
    }
  };

  const handlePlusFiveSeconds = (event) => {
    if (value === 1) {
      setValue(value + 4);
      onChange(value + 4);
    } else {
      setValue(value + 5);
      onChange(value + 5);
    }
  };

  const handleMinusFiveSeconds = (event) => {
    const newValue = value - 5;
    if (newValue < 1) {
      setValue(1);
      onChange(1);
    } else {
      setValue(newValue);
      onChange(newValue);
    }
  };

  const disableDrag = (event) => {
    setDragAllowed(false);
  };

  const enableDrag = (event) => {
    setDragAllowed(true);
  };

  return (
    <div className="group relative flex flex-row items-center rounded-md bg-slate-100 outline outline-[1px] outline-gray-300 focus-within:outline-slate-400 ">
      <label htmlFor={id} className=" ">
        {label}
      </label>
      <div
        onClick={handleMinusFiveSeconds}
        className="mr-auto select-none rounded-l-md border-r border-gray-300 pb-[2px] pl-[5px] pr-[5px] pt-[2px] text-xs font-normal hover:cursor-pointer hover:bg-slate-200 active:bg-slate-300"
        onMouseEnter={disableDrag}
        onMouseLeave={enableDrag}
      >
        -5s
      </div>
      <input
        type="text"
        id={id}
        value={value}
        className=" w-full bg-transparent p-[2px] text-center text-xs font-normal outline-none focus-within:bg-slate-200 hover:bg-slate-200"
        onChange={handleChange}
        inputMode="numeric"
        pattern="[1-9]*"
        onMouseEnter={disableDrag}
        onMouseLeave={enableDrag}
        onKeyDown={(e) => {
          if (
            !/^\d$/.test(e.key) &&
            e.key !== "Delete" &&
            e.key !== "Backspace" &&
            e.key !== "ArrowLeft" &&
            e.key !== "ArrowRight"
          ) {
            e.preventDefault();
          }
        }}
      />
      <div
        onClick={handlePlusFiveSeconds}
        className="ml-auto select-none rounded-r-md border-l border-gray-300 pb-[2px] pl-[5px] pr-[5px] pt-[2px] text-xs font-normal hover:cursor-pointer hover:bg-slate-200 active:bg-slate-300"
        onMouseEnter={disableDrag}
        onMouseLeave={enableDrag}
      >
        +5s
      </div>
    </div>
  );
}
