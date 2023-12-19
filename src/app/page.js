import Breadcrumbs from "@/components/Breadcrumbs";

export default function Home() {
  return (
    <main className="py-4 px-5">
      <Breadcrumbs crumbNameAndLinkArray={[["Folders", "/folders"]]} />
      <h1 className="font-header text-24">Hello world!</h1>
      <p>Hello world!</p>
    </main>
  );
}
