import FolderTitle from "@/components/Navigation/FolderTitle";

export default function Folder() {
  return (
    <div className="px-5 py-5">
      <FolderTitle
        crumbNameAndLinkArray={[
          {
            link: "/folders",
            name: "Folders",
          },
          {
            link: "/folders/my-workspace",
            name: "My Workspace",
          },
        ]}
        headerText={"My Workspace"}
      />
      <p>Hello world!</p>
    </div>
  );
}
