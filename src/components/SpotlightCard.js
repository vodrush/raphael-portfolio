import React, { useRef } from "react";
import "./SpotlightCard.css";

const SpotlightCard = ({ children, className = "", spotlightColor = "rgba(255, 255, 255, 0.25)" }) => {
  const divRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current.style.setProperty("--mouse-x", `${x}px`);
    divRef.current.style.setProperty("--mouse-y", `${y}px`);
    divRef.current.style.setProperty("--spotlight-color", spotlightColor);
  };

  // Clone the child to add styles directly to it, ensuring it's on top
  const child = React.Children.only(children);
  const childWithAppliedStyle = React.cloneElement(child, {
    style: {
      ...child.props.style, // Preserve existing styles
      position: 'relative', // Needed for z-index to work
      zIndex: 2             // Place content above the spotlight pseudo-element
    }
  });

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`card-spotlight ${className}`}
    >
      {childWithAppliedStyle}
    </div>
  );
};

export default SpotlightCard;
