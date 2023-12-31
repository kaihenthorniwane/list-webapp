export default function UserProfile({
  firstname,
  name,
  image,
  email,
  variant,
}) {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <img src={image} className="h-8 rounded-3xl" />
    </div>
  );
}
