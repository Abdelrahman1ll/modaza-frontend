import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { usePatchUsersByIdMutation } from "../../redux/users/apiUsers";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { usePostValidateDiscountCodeMutation } from "../../redux/DiscountCodes/apiDiscountCodes";
export default function useProfile() {
  const [userData, setUserData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthday: "",
    PROFILE: false,
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    birthday: "",
  });
  const [validateDiscountCode] = usePostValidateDiscountCodeMutation();

  const [progress, setProgress] = useState(20);
  const [rewardVisible, setRewardVisible] = useState(false);
  const [reward, setReward] = useState({
    code: "",
    discount: 0,
  });

  const secretKey = import.meta.env.VITE_SECRET_KEY;

  useEffect(() => {
    const encryptedUser = Cookies.get("user");
    if (encryptedUser) {
      const decryptedUser = CryptoJS.AES.decrypt(
        encryptedUser,
        secretKey
      ).toString(CryptoJS.enc.Utf8);
      const user = JSON.parse(decryptedUser);
      setUserData({
        id: user.user.id || "",
        firstName: user.user.firstName || "",
        lastName: user.user.lastName || "",
        email: user.user.email || "",
        phone: user.user.phone || "",
        birthday: user.user.birthday || "",
        PROFILE: user.user.PROFILE || false,
      });
    }
  }, []);

  useEffect(() => {
    // حساب نسبة إكمال البروفايل
    const fields = ["firstName", "lastName", "phone", "birthday"] as const;
    const filledCount = fields.reduce(
      (count, field) => (userData[field] ? count + 1 : count),
      0
    );
    const completion = 20 + filledCount * 20;
    setProgress(completion);

    // تحقق من المكافأة إذا البروفايل مكتمل
    const checkReward = async () => {
      const isProfileComplete =
        userData.firstName &&
        userData.lastName &&
        userData.phone &&
        userData.birthday &&
        userData.PROFILE === true;

      if (!isProfileComplete) {
        setRewardVisible(false);
        return;
      }

      try {
        const response = await validateDiscountCode({
          code: "PROFILE",
        }).unwrap();

        if (response?.discountCode) {
          setReward({
            code: response.discountCode.code,
            discount: response.discountCode.discount,
          });
          setRewardVisible(true);
          setProgress(100);
        }
      } catch (err) {
        setRewardVisible(false);
        console.error("Failed to fetch reward:", err);
      }
    };

    checkReward();
  }, [userData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const [patchUsers, { isLoading }] = usePatchUsersByIdMutation();
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { firstName: "", lastName: "", phone: "", birthday: "" };
    let isValid = true;

    // ✅ تحقق فقط من الحقول اللي فيها بيانات (مش كلها)
    if (
      userData.firstName &&
      (userData.firstName.length < 2 || userData.firstName.length > 50)
    ) {
      newErrors.firstName = "First name must be between 2 and 50 characters";
      isValid = false;
    }

    if (
      userData.lastName &&
      (userData.lastName.length < 2 || userData.lastName.length > 50)
    ) {
      newErrors.lastName = "Last name must be between 2 and 50 characters";
      isValid = false;
    }

    if (userData.phone && userData.phone.trim().length !== 11) {
      newErrors.phone = "Phone number must be 11 digits";
      isValid = false;
    }

    if (userData.birthday) {
      const birthday = new Date(userData.birthday);
      const today = new Date();

      // رفض التواريخ المستقبلية
      if (birthday >= today) {
        newErrors.birthday = "Birthday must be a valid past date";
        isValid = false;
      } else {
        // حساب العمر
        let age = today.getFullYear() - birthday.getFullYear();
        const monthDiff = today.getMonth() - birthday.getMonth();
        const dayDiff = today.getDate() - birthday.getDate();

        // لو لسه عيد ميلاده السنة دي ما جهش
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
          age--;
        }

        if (age < 10) {
          newErrors.birthday = "Birthday indicates an age below the allowed minimum";
          isValid = false;
        }
      }
    }

    setErrors(newErrors);
    if (!isValid) return;

    const id = Number(userData.id);
    try {
      await patchUsers({
        id,
        data: {
          firstName: userData.firstName || null,
          lastName: userData.lastName || null,
          phone: userData.phone || null,
          birthday: userData.birthday || null,
        },
      }).unwrap();
      toast.success("Profile saved successfully");

      const existingUser = Cookies.get("user");

      if (existingUser) {
        const decryptedUser = CryptoJS.AES.decrypt(
          existingUser,
          secretKey
        ).toString(CryptoJS.enc.Utf8);
        const parsedUser = JSON.parse(decryptedUser);

        const updatedUser = {
          ...parsedUser,
          user: {
            ...parsedUser.user,
            firstName: userData.firstName,
            lastName: userData.lastName,
            phone: userData.phone,
            birthday: userData.birthday,
          },
        };
        const encryptedUser = CryptoJS.AES.encrypt(
          JSON.stringify(updatedUser),
          secretKey
        ).toString();
        Cookies.set("user", encryptedUser, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90),
          secure: import.meta.env.NODE_ENV === "production" ? true : false,
          sameSite: "strict",
          path: "/",
        });
      }
    } catch (error: any) {
      toast.error(error?.data.message || "Error saving profile");
    }
  };

  return {
    userData,
    handleChange,
    handleSave,
    progress,
    errors,
    isLoading,
    rewardVisible,
    reward,
  };
}
