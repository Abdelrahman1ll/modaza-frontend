import { useUsersSignupGoogleMutation } from "../../redux/users/apiUsers";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

interface GoogleSignupProps {
  onClose: () => void;
}

/**
 * GoogleSignup: Handles OAuth2 authentication flow for Google accounts.
 * تسجيل جوجل: معالجة تدفق مصادقة OAuth2 لحسابات جوجل.
 */
export default function GoogleSignup({ onClose }: GoogleSignupProps) {
  const [signupGoogle] = useUsersSignupGoogleMutation();
  const { setUser } = useContext(AuthContext);

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    const idToken = credentialResponse?.credential;
    if (!idToken) return toast.error("Google login failed");

    try {
      const response = await signupGoogle({ token_google: idToken }).unwrap();
      if (response) {
        setUser(response); // Pass full response
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
