import { motion } from "framer-motion";
import { User, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetUsersQuery } from "../../redux/users/apiUsers";
/**
 * AllUsers: Administrative interface for viewing and managing the list of registered users.
 * المستخدمين: واجهة إدارية لعرض وإدارة قائمة المستخدمين المسجلين.
 */
export default function AllUsers() {
  const { data: getUsers } = useGetUsersQuery({});

  const users = Array.isArray(getUsers) ? getUsers : getUsers?.users || [];

  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-2 md:px-4">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold mb-8"
        style={{ color: "var(--color-pakistan)" }}
      >
        All Users
      </motion.h1>

      <div className="w-full max-w-3xl space-y-3">
        <div></div>
        {users &&
          users.map((user: any, index: number) => (
            <div key={index}>
              <Link to={`/edit-user-owner/${user?.id}`}>
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-xl shadow-md p-2 md:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between hover:shadow-lg transition"
                  style={{
                    backgroundColor: "var(--color-cornsilk)",
                    border: "1px solid var(--color-earth)",
                  }}
                >
                  {/* الإيميل */}
                  <div className="flex items-center gap-2 mb-2 sm:mb-0">
                    <User
                      size={26}
                      style={{
                        color: "var(--color-tiger)",
                      }}
                    />
                    <p
                      className="font-medium text-sm sm:text-base"
                      style={{ color: "var(--color-pakistan)" }}
                    >
                      {user.email}
                    </p>
                  </div>

                  {/* التاريخ */}
                  <div className="flex items-center gap-2 text-xs sm:text-sm justify-end sm:justify-start">
                    <Calendar
                      size={16}
                      style={{ color: "var(--color-dark)" }}
                    />
                    <span style={{ color: "var(--color-dark)" }}>
                      {user.createdAt ? user.createdAt.split("T")[0] : ""}
                    </span>
                  </div>
                </motion.div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
