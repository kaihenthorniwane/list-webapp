import React, { useEffect, useRef } from "react";

export default function TextInput({
  text,
  setText,
  placeholder,
  overflowHidden = true,
  minimumHeight = "0",
  wideTracking = false,
  textCenter = false,
  autoFocus = false,
}) {
  const textareaRef = useRef(null);

  const handleChange = () => {
    // Reset the height to 'auto' to shrink if text is deleted
    textareaRef.current.style.height = minimumHeight;

    // Set the height to scrollHeight to expand as needed
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  // Run handleChange once after the component mounts
  useEffect(() => {
    handleChange();
  }, []);
  return (
    <textarea
      ref={textareaRef}
      placeholder={placeholder}
      className={
        "outline-0 bg-Brand-White resize-none w-full focus:outline-none p-1 -m-1 " +
        (wideTracking ? "tracking-wide " : "") +
        (overflowHidden ? "overflow-hidden " : "") +
        (textCenter ? "text-center" : "")
      }
      value={text}
      onChange={(event) => {
        setText(event.target.value);
        handleChange();
      }}
      autoFocus={autoFocus}
      onFocus={
        autoFocus
          ? function (e) {
              var val = e.target.value;
              e.target.value = "";
              e.target.value = val;
            }
          : () => {}
      }
    />
  );
}
