export default function ShareOption({
  text,
  iconSrc,
  functionToRun = () => {},
}) {
  return (
    <div
      className="flex flex-col gap-1.5 items-center text-center tracking-tight flex-shrink-0 brand-button-transition opacity-button-transition"
      onClick={functionToRun}
    >
      <img src={iconSrc} width={70} height={70} />
      <span>{text}</span>
    </div>
  );
}
