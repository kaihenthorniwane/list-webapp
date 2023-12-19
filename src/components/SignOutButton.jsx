import { signOut } from "next-auth/react";

const SignOutButton = () => {
  const handleSignOut = async () => {
    // This will remove the session cookie and redirect the user to the home page
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
};

export default SignOutButton;
