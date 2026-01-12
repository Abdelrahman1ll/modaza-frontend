import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetUsersQuery,
  usePatchUsersOwnerByIdMutation,
} from "../../redux/users/apiUsers";

/**
 * EditUserOwner: Administrative interface for editing user details from the owner's perspective.
 * تعديل المستخدم (المالك): واجهة إدارية لتعديل بيانات المستخدمين من قِبل مالك الموقع.
 */
export default function EditUserOwner() {
  const { id } = useParams();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthday: "",
    role: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    birthday: "",
    role: "",
  });

  const { data: getUsers } = useGetUsersQuery({});
  const users = Array.isArray(getUsers) ? getUsers : getUsers?.users || [];
  useEffect(() => {
    const user = users.find((user: any) => Number(user.id) === Number(id));
    if (user) {
      setUserData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        birthday: user.birthday || "",
        role: user.role || "",
      });
    }
  }, [users, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const [PatchUsersOwnerById, { isLoading }] = usePatchUsersOwnerByIdMutation();
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      birthday: "",
      role: "",
    };
    let isValid = true;

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

    if (userData.birthday && new Date(userData.birthday) > new Date()) {
      newErrors.birthday = "Birthday must be a valid past date";
      isValid = false;
    }

    if (
      userData.role &&
      userData.role !== "admin" &&
      userData.role !== "owner" &&
      userData.role !== "user"
    ) {
      newErrors.role = "Role must be 'admin' or 'owner' or 'user'";
      isValid = false;
    }

    if (userData.email && !/^\S+@\S+\.\S+$/.test(userData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    setErrors(newErrors);
    if (!isValid) return;

    try {
      await PatchUsersOwnerById({
        id,
        data: {
          email: userData.email || null,
          firstName: userData.firstName || null,
          lastName: userData.lastName || null,
          phone: userData.phone || null,
          birthday: userData.birthday || null,
          role: userData.role || null,
        },
      }).unwrap();
      toast.success("User saved successfully");
    } catch {
      toast.error("Error saving profile");
    }
  };

  return (
    <div className="flex justify-center items-center my-12 p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className=" shadow-lg rounded-2xl p-4 w-full max-w-5xl"
      >
        <h2 className="text-3xl font-bold text-(--color-pakistan) mb-8 text-center">
          Edit User
        </h2>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
            {/* قسم البيانات الشخصية */}
            <div>
              <h3 className="text-lg font-semibold text-(--color-pakistan) mb-3 border-b pb-1">
                Personal Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium text-(--color-pakistan)">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    className="w-full p-2 border rounded-lg border-(--color-earth) focus:outline-none focus:ring-2 focus:ring-(--color-tiger)"
                  />
                  {errors.firstName && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-1 font-medium text-(--color-pakistan)">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    className="w-full p-2 border rounded-lg border-(--color-earth) focus:outline-none focus:ring-2 focus:ring-(--color-tiger)"
                  />
                  {errors.lastName && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-1 font-medium text-(--color-pakistan)">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="birthday"
                    value={
                      userData.birthday ? userData.birthday.split("T")[0] : ""
                    }
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg border-(--color-earth) focus:outline-none focus:ring-2 focus:ring-(--color-tiger)"
                  />
                  {errors.birthday && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.birthday}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-1 font-medium text-(--color-pakistan)">
                    Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={userData.role}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg border-(--color-earth) focus:outline-none focus:ring-2 focus:ring-(--color-tiger)"
                  />
                  {errors.role && (
                    <p className="text-red-600 text-sm mt-1">{errors.role}</p>
                  )}
                </div>
              </div>
            </div>

            {/* قسم بيانات التواصل */}
            <div>
              <h3 className="text-lg font-semibold text-(--color-pakistan) mb-3 border-b pb-1">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block mb-1 font-medium text-(--color-pakistan)">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg border-(--color-earth) focus:outline-none focus:ring-2 focus:ring-(--color-tiger)"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block mb-1 font-medium text-(--color-pakistan)">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={userData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full p-2 border rounded-lg border-(--color-earth) focus:outline-none focus:ring-2 focus:ring-(--color-tiger)"
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* زر الحفظ */}
          <motion.button
            whileHover={!isLoading ? { scale: 1.03 } : {}}
            whileTap={!isLoading ? { scale: 0.95 } : {}}
            disabled={isLoading}
            type="submit"
            className={`w-full flex items-center justify-center gap-2 text-white font-semibold py-2 rounded-lg shadow-md transition
             ${
               isLoading
                 ? "bg-(--color-earth) cursor-not-allowed opacity-90"
                 : "bg-(--color-tiger) hover:bg-(--color-earth) cursor-pointer"
             }`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Save size={18} />
                Save Changes
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
