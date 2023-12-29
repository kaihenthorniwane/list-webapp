export default function DrawerOption({
  icon,
  text = "Drawer Option",
  color = "rgb(var(--Brand-Black))",
  functionToRun = () => {},
}) {
  return (
    <div
      className="flex gap-2.5 items-center brand-button-transition lesser-transform opacity-button-transition"
      style={{ color: color }}
      onClick={functionToRun}
    >
      {icon}
      <span className="mt-1">{text}</span>
    </div>
  );
}
