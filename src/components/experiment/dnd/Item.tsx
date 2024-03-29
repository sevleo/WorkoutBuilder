import { forwardRef } from "react";

export const Item = forwardRef(({ id, ...props }, ref) => {
  return (
    <div {...props} ref={ref} className="text-black">
      {id}
    </div>
  );
});
