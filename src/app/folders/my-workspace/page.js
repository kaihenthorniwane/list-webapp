import Breadcrumbs from "@/components/Navigation/Breadcrumbs";

export default function Folder() {
  return (
    <main className="py-4 px-5">
      <Breadcrumbs
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
      />
      <h1 className="font-header text-24">Hello world!</h1>
      <p>Hello world!</p>
    </main>
  );
}
