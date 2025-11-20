import { useContext } from "react";
import { SignupContext } from "./SignupContext";
import Signup from "./signup";

export default function GlobalSignup() {
  const { showSignup, closeSignup } = useContext(SignupContext);

  if (!showSignup) return null;

  return <Signup onClose={closeSignup} />;
}
