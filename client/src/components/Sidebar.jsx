import {
  FaHome,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaComment,
  FaMoneyBill,
  FaClipboardList,
  FaSchool,
  FaBookOpen,
  FaTasks,
  FaSignOutAlt,
  FaRegCommentDots,
  FaUserCheck,
  FaArrowUp,
  FaFileUpload,
  FaBars,
  FaTimes,
  FaAddressBook
} from "react-icons/fa";

import {
  Link,
  useNavigate,
  useLocation
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useState } from "react";

/* =========================
   BADGE COMPONENT
========================= */
function Badge({ count }) {
  if (!count) return null;

  return (
    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
      {count}
    </span>
  );
}

function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  // submenu states
  const [adminOpen, setAdminOpen] = useState(true);
  const [superOpen, setSuperOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/portal");
  };

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* MOBILE BUTTON */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-[60] bg-blue-900 text-white p-3 rounded-lg shadow-lg"
        >
          <FaBars size={20} />
        </button>
      )}

      {/* OVERLAY */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50
          w-64 h-screen
          bg-blue-900 text-white p-5
          flex flex-col justify-between
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          overflow-y-auto
        `}
      >
        {/* HEADER */}
        <div className="p-5 border-b border-blue-800">
          <div className="flex items-center justify-between lg:hidden">
            <h1 className="text-xl font-bold">Menu</h1>
            <button onClick={closeSidebar}>
              <FaTimes size={22} />
            </button>
          </div>

          <div className="mt-2">
            <h1 className="text-2xl font-bold">Grisfield Schools</h1>
            <p className="text-sm text-blue-200 mt-1 capitalize">
              {user?.role}
            </p>
          </div>
        </div>

        {/* MENU */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-2">

          {/* DASHBOARD */}
          <SidebarLink
            to={
              user?.role === "teacher"
                ? "/teacher-dashboard"
                : "/dashboard"
            }
            icon={<FaHome />}
            label="Dashboard"
            location={location}
            closeSidebar={closeSidebar}
          />

          {/* ================= SUPERADMIN SECTION ================= */}
          {user?.role === "superadmin" && (
            <div>
              <button
                onClick={() => setSuperOpen(!superOpen)}
                className="w-full flex items-center text-left px-4 py-2 font-semibold text-blue-200 hover:text-white"
              >
                Super Admin
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  superOpen ? "max-h-60" : "max-h-0"
                }`}
              >
                <SidebarLink
                  to="/create-admin"
                  icon={<FaUserCheck />}
                  label="Create Admin"
                  location={location}
                  closeSidebar={closeSidebar}
                />

                <SidebarLink
                  to="/result-pins"
                  icon={<FaClipboardList />}
                  label="Result Pins"
                  location={location}
                  closeSidebar={closeSidebar}
                />
              </div>
            </div>
          )}

          {/* ================= ADMIN SECTION ================= */}
          {(user?.role === "admin" ||
            user?.role === "superadmin") && (
            <div>
              <button
                onClick={() => setAdminOpen(!adminOpen)}
                className="w-full flex items-center text-left px-4 py-2 font-semibold text-blue-200 hover:text-white"
              >
                Admin Tools
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  adminOpen ? "max-h-[1000px]" : "max-h-0"
                }`}
              >
                <SidebarLink
                  to="/students/create"
                  icon={<FaUserGraduate />}
                  label="Create Student"
                  location={location}
                  closeSidebar={closeSidebar}
                />

                <SidebarLink
                  to="/students/view"
                  icon={<FaUserGraduate />}
                  label="View Students"
                  location={location}
                  closeSidebar={closeSidebar}
                  badge={340}
                />

                <SidebarLink
                  to="/admission-requests"
                  icon={<FaAddressBook />}
                  label="Admissions"
                  location={location}
                  closeSidebar={closeSidebar}
                  badge={12}
                />

                <SidebarLink
                  to="/student-status"
                  icon={<FaUserCheck />}
                  label="Student Status"
                  location={location}
                  closeSidebar={closeSidebar}
                />

                <SidebarLink
                  to="/student-promotion"
                  icon={<FaArrowUp />}
                  label="Student Promotion"
                  location={location}
                  closeSidebar={closeSidebar}
                />

                <SidebarLink
                  to="/sessions"
                  icon={<FaClipboardList />}
                  label="Sessions"
                  location={location}
                  closeSidebar={closeSidebar}
                />

                <SidebarLink
                  to="/teachers"
                  icon={<FaChalkboardTeacher />}
                  label="Teachers"
                  location={location}
                  closeSidebar={closeSidebar}
                />

                <SidebarLink
                  to="/classes"
                  icon={<FaSchool />}
                  label="Classes"
                  location={location}
                  closeSidebar={closeSidebar}
                />

                <SidebarLink
                  to="/subjects"
                  icon={<FaBookOpen />}
                  label="Subjects"
                  location={location}
                  closeSidebar={closeSidebar}
                />

                <SidebarLink
                  to="/assign-subject"
                  icon={<FaTasks />}
                  label="Assign Subjects"
                  location={location}
                  closeSidebar={closeSidebar}
                />

                <SidebarLink
                  to="/documents"
                  icon={<FaFileUpload />}
                  label="Documents"
                  location={location}
                  closeSidebar={closeSidebar}
                />
              </div>
            </div>
          )}

          {/* COMMON */}
          <SidebarLink
            to="/score-entry"
            icon={<FaBook />}
            label="Score Entry"
            location={location}
            closeSidebar={closeSidebar}
          />

          <SidebarLink
            to="/make-comments"
            icon={<FaRegCommentDots />}
            label="Make Comments"
            location={location}
            closeSidebar={closeSidebar}
          />

          <SidebarLink
            to="/payments/set"
            icon={<FaMoneyBill />}
            label="Payments"
            location={location}
            closeSidebar={closeSidebar}
          />

          <SidebarLink
            to="/results"
            icon={<FaClipboardList />}
            label="Reports"
            location={location}
            closeSidebar={closeSidebar}
          />
        </div>

        {/* FOOTER */}
        <div className="p-5 border-t border-blue-800 space-y-3">
          <SidebarLink
            to="/change-password"
            icon={<FaUserCheck />}
            label="Change Password"
            location={location}
            closeSidebar={closeSidebar}
          />

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 bg-red-600 hover:bg-red-700 px-4 py-3 rounded-lg transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

/* =========================
   SIDEBAR LINK
========================= */
function SidebarLink({
  to,
  icon,
  label,
  location,
  closeSidebar,
  badge
}) {
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={closeSidebar}
      className={`
        flex items-center gap-3 px-4 py-3 rounded-lg transition
        ${isActive ? "bg-blue-700" : "hover:bg-blue-800"}
      `}
    >
      {icon}
      <span>{label}</span>

      <Badge count={badge} />
    </Link>
  );
}

export default Sidebar;