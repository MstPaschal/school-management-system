import {
  useEffect,
  useState
} from "react";

import api from "../services/api";
import { useNotification } from "../context/NotificationContext";

function CreateAdmin() {

  const { notify, confirmAction } =
    useNotification();


  const [admins, setAdmins] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      username: "",
      email: "",
      password: "",
      role: "admin"
    });


  const [editingAdmin, setEditingAdmin] =
    useState(null);

  const [showEditModal, setShowEditModal] =
    useState(false);


  const [viewingAdmin, setViewingAdmin] =
    useState(null);

  const [showViewModal, setShowViewModal] =
    useState(false);


  const [editForm, setEditForm] =
    useState({
      username: "",
      email: "",
      password: ""
    });


  const [updating, setUpdating] =
    useState(false);

  const [deletingId, setDeletingId] =
    useState(null);


  // LOAD ADMINS
  useEffect(() => {

    fetchAdmins();

  }, []);


  // FETCH ADMINS
  const fetchAdmins =
    async () => {

      try {

        const res =
          await api.get(
            "/auth/admins"
          );

        setAdmins(res.data);

      } catch (error) {

        console.log(error);

        notify(
          error.response?.data?.message ||
          "Failed to load administrators.",
          "error"
        );

      }

    };


  // FORM CHANGE
  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value

      });

    };


  // CREATE ADMIN
  const handleSubmit =
    async (e) => {

      e.preventDefault();


      const username =
        formData.username.trim();

      const email =
        formData.email.trim();

      const password =
        formData.password.trim();

      const role =
        formData.role.trim();


      if (!username) {

        notify(
          "Please enter a username.",
          "warning"
        );

        return;

      }


      if (!email) {

        notify(
          "Please enter an email address.",
          "warning"
        );

        return;

      }


      if (!password) {

        notify(
          "Please enter a password.",
          "warning"
        );

        return;

      }


      if (!role) {

        notify(
          "Please select an administrator role.",
          "warning"
        );

        return;

      }


      try {

        setLoading(true);


        const res =
          await api.post(
            "/auth/register-admin",
            {
              username,
              email,
              password,
              role
            }
          );


        notify(
          res.data.message ||
          "Administrator created successfully.",
          "success"
        );


        setFormData({

          username: "",

          email: "",

          password: "",

          role: "admin"

        });


        fetchAdmins();

      } catch (error) {

        console.log(error);

        notify(
          error.response?.data?.message ||
          "Failed to create admin.",
          "error"
        );

      } finally {

        setLoading(false);

      }

    };


  // EDIT CHANGE
  const handleEditChange =
    (e) => {

      setEditForm({

        ...editForm,

        [e.target.name]:
          e.target.value

      });

    };


  // OPEN VIEW MODAL
  const handleView =
    (admin) => {

      setViewingAdmin(admin);

      setShowViewModal(true);

    };


  // CLOSE VIEW MODAL
  const closeViewModal =
    () => {

      setShowViewModal(false);

      setViewingAdmin(null);

    };


  // OPEN EDIT MODAL
  const handleEdit =
    (admin) => {

      setEditingAdmin(admin);


      setEditForm({

        username:
          admin.username,

        email:
          admin.email,

        password: ""

      });


      setShowEditModal(true);

    };


  // CLOSE EDIT MODAL
  const closeEditModal =
    () => {

      setShowEditModal(false);

      setEditingAdmin(null);


      setEditForm({

        username: "",

        email: "",

        password: ""

      });

    };


  // UPDATE ADMIN
  const updateAdmin =
    async () => {

      if (!editingAdmin) return;


      const username =
        editForm.username.trim();

      const email =
        editForm.email.trim();

      const password =
        editForm.password.trim();


      if (!username) {

        notify(
          "Please enter a username.",
          "warning"
        );

        return;

      }


      if (!email) {

        notify(
          "Please enter an email address.",
          "warning"
        );

        return;

      }


      try {

        setUpdating(true);


        const res =
          await api.put(

            `/auth/admin/${editingAdmin.id}`,

            {
              username,
              email,
              password
            }

          );


        notify(
          res.data.message ||
          "Administrator updated successfully.",
          "success"
        );


        closeEditModal();

        fetchAdmins();

      } catch (error) {

        console.log(error);

        notify(
          error.response?.data?.message ||
          "Update failed.",
          "error"
        );

      } finally {

        setUpdating(false);

      }

    };


  // DELETE ADMIN
  const handleDelete =
    async (id) => {

      const confirmDelete =
        await confirmAction(

          "This administrator will be permanently deleted. This action cannot be undone.",

          {
            title: "Delete Administrator?",
            confirmText: "Delete",
            cancelText: "Cancel"
          }

        );


      if (!confirmDelete) return;


      try {

        setDeletingId(id);


        const res =
          await api.delete(
            `/auth/admins/${id}`
          );


        notify(
          res.data.message ||
          "Administrator deleted successfully.",
          "success"
        );


        fetchAdmins();

      } catch (error) {

        console.log(error);

        notify(
          error.response?.data?.message ||
          "Delete failed.",
          "error"
        );

      } finally {

        setDeletingId(null);

      }

    };


  return (

    <div className="p-4 sm:p-6">

      <div className="bg-white rounded-2xl shadow p-4 sm:p-6">

        <h1 className="text-2xl sm:text-3xl font-bold mb-6">

          Create Admin

        </h1>


        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10"
        >

          {/* USERNAME */}
          <div>

            <label className="block mb-1.5 text-sm font-medium text-slate-700">

              Username

            </label>

            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />

          </div>


          {/* EMAIL */}
          <div>

            <label className="block mb-1.5 text-sm font-medium text-slate-700">

              Email

            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />

          </div>


          {/* PASSWORD */}
          <div>

            <label className="block mb-1.5 text-sm font-medium text-slate-700">

              Password

            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />

          </div>


          {/* ROLE */}
          <div>

            <label className="block mb-1.5 text-sm font-medium text-slate-700">

              Role

            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            >

              <option value="admin">
                Admin
              </option>

              <option value="superadmin">
                Super Admin
              </option>

            </select>

          </div>


          {/* CREATE BUTTON */}
          <div className="md:col-span-2">

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition"
            >

              {loading
                ? "Creating..."
                : "Create Admin"}

            </button>

          </div>

        </form>


        {/* ADMIN TABLE */}
        <div className="mt-4">

          <div className="mb-4">

            <h2 className="text-xl sm:text-2xl font-bold text-slate-800">

              Administrators

            </h2>

            <p className="text-sm text-slate-500 mt-1">

              Manage administrators and view their account details.

            </p>

          </div>


          <div className="w-full overflow-hidden">

            <table className="w-full border-collapse">

              <thead>

                <tr className="bg-gray-100 text-left">

                  <th className="p-3 text-sm sm:text-base">

                    Username

                  </th>

                  <th className="p-3 text-sm sm:text-base">

                    Role

                  </th>

                  <th className="p-3 text-sm sm:text-base">

                    Buttons

                  </th>

                </tr>

              </thead>


              <tbody>

                {admins.length === 0 ? (

                  <tr>

                    <td
                      colSpan="3"
                      className="p-8 text-center text-slate-500"
                    >

                      No administrators found.

                    </td>

                  </tr>

                ) : (

                  admins.map((admin) => (

                    <tr
                      key={admin.id}
                      className="border-b"
                    >

                      {/* USERNAME */}
                      <td className="p-3 font-medium break-words">

                        {admin.username}

                      </td>


                      {/* ROLE */}
                      <td className="p-3">

                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                            admin.role === "superadmin"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >

                          {admin.role === "superadmin"
                            ? "Super Admin"
                            : "Admin"}

                        </span>

                      </td>


                      {/* BUTTONS */}
                      <td className="p-3">

                        <div className="flex flex-col sm:flex-row gap-2">

                          {/* VIEW */}
                          <button
                            onClick={() =>
                              handleView(admin)
                            }
                            className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap"
                          >

                            View

                          </button>


                          {/* EDIT */}
                          <button
                            onClick={() =>
                              handleEdit(admin)
                            }
                            className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap"
                          >

                            Edit

                          </button>


                          {/* DELETE */}
                          <button
                            onClick={() =>
                              handleDelete(admin.id)
                            }
                            disabled={
                              deletingId === admin.id
                            }
                            className="w-full sm:w-auto bg-red-500 hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap"
                          >

                            {deletingId === admin.id
                              ? "Deleting..."
                              : "Delete"}

                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>


        </div>

      </div>


      {/* VIEW ADMIN MODAL */}
      {showViewModal && viewingAdmin && (

        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">

          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">

            {/* HEADER */}
            <div className="bg-green-600 text-white px-5 sm:px-6 py-6 text-center">

              <div className="w-16 h-16 mx-auto rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">

                {viewingAdmin.username
                  ?.charAt(0)
                  ?.toUpperCase() || "A"}

              </div>

              <h2 className="text-xl sm:text-2xl font-bold mt-3">

                Administrator Profile

              </h2>

            </div>


            {/* DETAILS */}
            <div className="p-5 sm:p-6 space-y-5">

              {/* USERNAME */}
              <div>

                <p className="text-sm font-medium text-slate-400">

                  Username

                </p>

                <p className="mt-1 text-base sm:text-lg font-semibold text-slate-800 break-words">

                  {viewingAdmin.username}

                </p>

              </div>


              {/* EMAIL */}
              <div>

                <p className="text-sm font-medium text-slate-400">

                  Email

                </p>

                <p className="mt-1 text-base sm:text-lg font-semibold text-slate-800 break-all">

                  {viewingAdmin.email}

                </p>

              </div>


              {/* ROLE */}
              <div>

                <p className="text-sm font-medium text-slate-400">

                  Role

                </p>

                <div className="mt-1">

                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${
                      viewingAdmin.role === "superadmin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >

                    {viewingAdmin.role === "superadmin"
                      ? "Super Admin"
                      : "Admin"}

                  </span>

                </div>

              </div>


              {/* CLOSE */}
              <div className="pt-2">

                <button
                  onClick={closeViewModal}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-lg font-semibold transition"
                >

                  Close

                </button>

              </div>

            </div>

          </div>

        </div>

      )}


      {/* EDIT MODAL */}
      {showEditModal && (

        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">

          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-5 sm:p-6 max-h-[90vh] overflow-y-auto">

            <h2 className="text-xl sm:text-2xl font-bold mb-6">

              Edit Admin

            </h2>


            {/* USERNAME */}
            <div className="mb-4">

              <label className="block mb-1.5 font-medium text-slate-700">

                Username

              </label>

              <input
                type="text"
                name="username"
                value={editForm.username}
                onChange={handleEditChange}
                className="w-full border border-slate-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              />

            </div>


            {/* EMAIL */}
            <div className="mb-4">

              <label className="block mb-1.5 font-medium text-slate-700">

                Email

              </label>

              <input
                type="email"
                name="email"
                value={editForm.email}
                onChange={handleEditChange}
                className="w-full border border-slate-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              />

            </div>


            {/* PASSWORD */}
            <div className="mb-6">

              <label className="block mb-1.5 font-medium text-slate-700">

                New Password

              </label>

              <input
                type="password"
                name="password"
                value={editForm.password}
                onChange={handleEditChange}
                placeholder="Leave empty to keep old password"
                className="w-full border border-slate-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              />

              <p className="mt-1.5 text-xs text-slate-400">

                Leave this field empty if you do not want to change the password.

              </p>

            </div>


            {/* BUTTONS */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">

              <button
                onClick={closeEditModal}
                disabled={updating}
                className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 disabled:opacity-60 text-slate-700 px-6 py-3 rounded-lg font-medium transition"
              >

                Cancel

              </button>


              <button
                onClick={updateAdmin}
                disabled={updating}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition"
              >

                {updating
                  ? "Updating..."
                  : "Update"}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}

export default CreateAdmin;