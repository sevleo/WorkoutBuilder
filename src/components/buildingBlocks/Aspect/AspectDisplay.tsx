// React
import { CSSProperties, forwardRef, HTMLAttributes } from "react";
import svgProvider from "../../../assets/svgProvider";

// Types & interfaces
import { AspectType } from "./AspectController";

svgProvider("boatstraightlegs");

type Props = {
  aspect: AspectType;
  isOpacityEnabled?: boolean;
  isDragging?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const Aspect = forwardRef<HTMLDivElement, Props>(
  ({ aspect, isOpacityEnabled, isDragging, style, ...props }, ref) => {
    const styles: CSSProperties = {
      opacity: isOpacityEnabled ? "0.4" : "1",
      cursor: isDragging ? "grabbing" : "grab",
      //   lineHeight: "0.5",
      // transform: isDragging ? "scale(1.05)" : "scale(1)",
      color: "black",
      maxWidth: "100px",
      ...style,
    };
    // console.log(aspect);

    const svg = svgProvider(aspect.url_svg_alt_local);

    return (
      <div
        ref={ref}
        style={{
          ...styles,
          borderRadius: "8px",
          boxShadow: isDragging
            ? "none"
            : "rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px",
          maxWidth: "100%",
          objectFit: "cover",
        }}
        {...props}
        key={aspect.english_name}
        className=" flex h-20 flex-row items-center justify-center rounded-md bg-white"
      >
        <img className="h-full" src={svg} alt="" />
        <p>{aspect.english_name}</p>
        <p>{aspect.sanskrit_name_adapted}</p>
      </div>
    );
  }
);

export default Aspect;
