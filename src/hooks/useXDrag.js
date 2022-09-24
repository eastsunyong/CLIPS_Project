import { useRef, useState } from "react";

const useXDrag = () => {
  const container = useRef(null);
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState();

  const dragStart = (e) => {
    setIsDrag(true);
    setStartX(e.pageX + container.current.scrollLeft);
  };

  const dragEnd = () => {
    setIsDrag(false);
  };

  const dragMoving = (e) => {
    if (isDrag) {
      container.current.scrollLeft = startX - e.pageX;
    }
  };

  return [container, dragStart, dragEnd, dragMoving];
};

export default useXDrag;
