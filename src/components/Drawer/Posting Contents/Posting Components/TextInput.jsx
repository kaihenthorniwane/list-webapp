import React, { useEffect, useRef } from "react";

export default function TextInput({
  text,
  setText,
  placeholder,
  overflowHidden = true,
}) {
  const textareaRef = useRef(null);

  const handleChange = () => {
    // Reset the height to 'auto' to shrink if text is deleted
    textareaRef.current.style.height = "0";

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
        "outline-0 resize-none w-full focus:outline-none p-1 -m-1 " +
        (overflowHidden && "overflow-hidden")
      }
      value={text}
      onChange={(event) => {
        setText(event.target.value);
        handleChange();
      }}
    />
  );
}
