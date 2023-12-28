export default function SimpleDrawer(props) {
  if (props) {
    return <div>Simple Drawer {props.children}</div>;
  } else {
    return <div>No content available for the drawer.</div>;
  }
}
