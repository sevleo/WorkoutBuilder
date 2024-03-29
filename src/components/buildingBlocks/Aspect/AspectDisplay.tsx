// React
import { MouseEventHandler } from "react";
import svgProvider from "../../../assets/svgProvider";
import { useState } from "react";

// Types & interfaces
import { AspectType } from "./AspectController";

svgProvider("boatstraightlegs");

type Props = {
  aspect: AspectType;
  count: number;
  handleClick: MouseEventHandler<HTMLDivElement>;
};

function Aspect({ aspect, count, handleClick }: Props) {
  const svg = svgProvider(aspect.url_svg_alt_local);

  const [isActive, setActive] = useState(false);

  return (
    <div
      style={{
        maxWidth: "100%",
        objectFit: "cover",
      }}
      key={aspect.english_name}
      className={` fancy-wrapper relative bg-[#7D6A3E] shadow-md transition-all hover:cursor-pointer ${isActive ? "active" : ""}`}
      onClick={(e) => {
        setActive(true);
        setTimeout(() => {
          setActive(false);
        }, 100);
        handleClick(e);
      }}
    >
      <div className=" fancy-content flex select-none flex-col items-center justify-between p-2  ">
        <div className="h-full w-full rounded-[50%] border border-[#ffffff45] ">
          <img className="  p-3" src={svg} alt="" draggable="false" />
        </div>
        <p className="mt-2 w-full text-start text-xs">{aspect.english_name}</p>
        {count > 0 && (
          <span className=" absolute right-[3px] top-[3px] flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-red-600 p-0.5 text-xs text-white">
            {count}
          </span>
        )}
      </div>
    </div>
  );
}

export default Aspect;
