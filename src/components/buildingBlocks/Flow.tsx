import { SetStateAction } from "react";
import Unit from "./Unit";
import { UnitProps } from "./Unit";
import { Dispatch } from "react";
import { ItemTypes } from "../DND/ItemTypes";
import { useDrop } from "react-dnd";

interface FlowProps {
  flow: {
    flowName: string;
    units: UnitProps[];
  };
  setFlow: Dispatch<
    SetStateAction<{
      flowName: string;
      units: UnitProps[];
    }>
  >;
  isDragging: boolean;
}

function Flow({ flow, setFlow, isDragging }: FlowProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.ASPECT,
    drop: () => handleButtonClick(),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  function handleButtonClick() {
    const newUnit = {
      name: "new unit",
      sanskritName: "sanskrit name of unit 1",
      duration: 5,
      announcement: "fancy announcement",
    };
    console.log(newUnit);
    setFlow((prevFlow) => {
      return {
        ...prevFlow,
        units: [...prevFlow.units, newUnit],
      };
    });
  }

  return (
    <div
      className={`h-auto p-5 ${isOver ? "bg-black" : ""} ${isDragging ? "border-4" : ""}`}
    >
      <div className="h-full border" ref={drop}>
        <div>{flow.flowName}</div>
        <div>
          <button onClick={handleButtonClick}>Create new unit</button>
        </div>
        <div className=" flex flex-col gap-5 bg-slate-400">
          {flow.units.map((unit) => (
            <Unit key={unit.name} {...unit}></Unit>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Flow;
