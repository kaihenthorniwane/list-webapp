export default function EditableDiv({ content, setContent, placeholderText }) {
  const handleInput = (e) => {
    setContent(e.target.innerText);
  };

  return (
    <div
      contentEditable
      suppressContentEditableWarning
      onInput={handleInput}
      style={{ minHeight: "20px", border: "1px solid gray", padding: "5px" }}
    >
      {content === "" ? (
        <span style={{ color: "gray" }}>{placeholderText}.</span>
      ) : (
        content
      )}
    </div>
  );
}
