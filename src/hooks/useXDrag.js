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
      const { scrollWidth, clientWidth, scrollLeft } = container.current;

      container.current.scrollLeft = startX - e.pageX;

      if (scrollLeft === 0) {
        setStartX(e.pageX);
      } else if (scrollWidth <= clientWidth + scrollLeft) {
        setStartX(e.pageX + scrollLeft);
      }
    }
  };

  return [container, dragStart, dragEnd, dragMoving, isDrag];
};

export default useXDrag;
