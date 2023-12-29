import React, { useState, useRef } from "react";

export default function TextInput({ text, setText, placeholder }) {
  const textareaRef = useRef(null);

  const handleChange = (event) => {
    setText(event.target.value);

    // Reset the height to 'auto' to shrink if text is deleted
    textareaRef.current.style.height = "auto";

    // Set the height to scrollHeight to expand as needed
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };
  return (
    <textarea
      rows="1"
      ref={textareaRef}
      placeholder={placeholder}
      className="outline-0 resize-none w-full overflow-hidden p-1 -m-1"
      value={text}
      onChange={handleChange}
    />
  );
}
