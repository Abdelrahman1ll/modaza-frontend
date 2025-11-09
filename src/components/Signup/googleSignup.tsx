import { useUsersSignupGoogleMutation } from "../../redux/users/apiUsers";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { toast } from "react-toastify";

interface GoogleSignupProps {
  onClose: () => void;
}

export default function GoogleSignup({ onClose }: GoogleSignupProps) {
  const [signupGoogle] = useUsersSignupGoogleMutation();

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    const idToken = credentialResponse?.credential;
    if (!idToken) return toast.error("Google login failed");

    try {
      const response = await signupGoogle({ token_google: idToken }).unwrap();
      if (response) {
        const secretKey = import.meta.env.VITE_SECRET_KEY;
        const encryptedUser = CryptoJS.AES.encrypt(
          JSON.stringify(response),
          secretKey
        ).toString();

        Cookies.set("user", encryptedUser, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90),
          secure: import.meta.env.VITE_NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
        });

        onClose();
        toast.success("Logged in successfully with Google!");
      }
    } catch {
      toast.error("Failed to login with Google");
    }
  };

  const handleError = () => {
    toast.error("Google login failed");
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
      text="signup_with"
      shape="rectangular"
      width="100%"
      logo_alignment="center"
    />
  );
}
