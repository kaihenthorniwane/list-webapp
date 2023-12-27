export default function DrawerOption({
  iconSrc,
  text = "Drawer Option",
  color = "rgb(var(--Brand-Black))",
}) {
  return (
    <div
      className="flex gap-2.5 items-center brand-button-transition lesser-transform opacity-button-transition"
      style={{ color: color }}
    >
      <img src={iconSrc} />
      <span className="mt-1">{text}</span>
    </div>
  );
}
