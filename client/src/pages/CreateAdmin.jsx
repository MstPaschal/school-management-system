import {
  useEffect,
  useState
} from "react";

import api from "../services/api";

function CreateAdmin() {

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

  const [editForm, setEditForm] =
    useState({

      username: "",

      email: "",

      password: ""

    });


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

      try {

        setLoading(true);

        const res =
          await api.post(
            "/auth/register-admin",
            formData
          );

        alert(res.data.message);

        setFormData({

          username: "",

          email: "",

          password: "",

          role: "admin"

        });

        fetchAdmins();

      } catch (error) {

        alert(

          error.response?.data?.message ||

          "Failed to create admin"

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


  // UPDATE ADMIN
  const updateAdmin =
    async () => {

      try {

        const res =
          await api.put(

            `/auth/admin/${editingAdmin.id}`,

            editForm

          );

        alert(res.data.message);

        setShowEditModal(false);

        fetchAdmins();

      } catch (error) {

        console.log(error);

        alert(

          error.response?.data?.message ||

          "Update failed"

        );

      }

    };


  // DELETE ADMIN
  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this admin?"
        );

      if (!confirmDelete) return;

      try {

        const res =
          await api.delete(
            `/auth/admins/${id}`
          );

        alert(res.data.message);

        fetchAdmins();

      } catch (error) {

        alert(

          error.response?.data?.message ||

          "Delete failed"

        );

      }

    };


  return (

    <div className="p-6">

      <div className="bg-white rounded-2xl shadow p-6">

        <h1 className="text-3xl font-bold mb-6">

          Create Admin

        </h1>


        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10"
        >

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="border rounded-lg px-4 py-3"
          />


          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border rounded-lg px-4 py-3"
          />


          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="border rounded-lg px-4 py-3"
          />


          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border rounded-lg px-4 py-3"
          >

            <option value="admin">
              Admin
            </option>

            <option value="superadmin">
              Super Admin
            </option>

          </select>


          <div className="md:col-span-2">

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >

              {
                loading
                  ? "Creating..."
                  : "Create Admin"
              }

            </button>

          </div>

        </form>


        {/* TABLE */}
        <div className="overflow-x-auto">

          <table className="w-full border-collapse">

            <thead>

              <tr className="bg-gray-100">

                <th className="p-3 text-left">
                  Username
                </th>

                <th className="p-3 text-left">
                  Email
                </th>

                <th className="p-3 text-left">
                  Role
                </th>

                <th className="p-3 text-left">
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {
                admins.map((admin) => (

                  <tr
                    key={admin.id}
                    className="border-b"
                  >

                    <td className="p-3">

                      {admin.username}

                    </td>

                    <td className="p-3">

                      {admin.email}

                    </td>

                    <td className="p-3">

                      {admin.role}

                    </td>

                    <td className="p-3 flex gap-2">

                      {/* EDIT */}
                      <button
                        onClick={() => {

                          setEditingAdmin(admin);

                          setEditForm({

                            username: admin.username,

                            email: admin.email,

                            password: ""

                          });

                          setShowEditModal(true);

                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                      >

                        Edit

                      </button>


                      {/* DELETE */}
                      <button
                        onClick={() =>
                          handleDelete(admin.id)
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                      >

                        Delete

                      </button>

                    </td>

                  </tr>

                ))
              }

            </tbody>

          </table>

        </div>

      </div>


      {/* EDIT MODAL */}
      {
        showEditModal && (

          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">

            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">

              <h2 className="text-2xl font-bold mb-6">

                Edit Admin

              </h2>


              {/* USERNAME */}
              <div className="mb-4">

                <label className="block mb-1 font-medium">

                  Username

                </label>

                <input
                  type="text"
                  name="username"
                  value={editForm.username}
                  onChange={handleEditChange}
                  className="w-full border rounded-lg px-4 py-3"
                />

              </div>


              {/* EMAIL */}
              <div className="mb-4">

                <label className="block mb-1 font-medium">

                  Email

                </label>

                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleEditChange}
                  className="w-full border rounded-lg px-4 py-3"
                />

              </div>


              {/* PASSWORD */}
              <div className="mb-6">

                <label className="block mb-1 font-medium">

                  New Password

                </label>

                <input
                  type="password"
                  name="password"
                  value={editForm.password}
                  onChange={handleEditChange}
                  placeholder="Leave empty to keep old password"
                  className="w-full border rounded-lg px-4 py-3"
                />

              </div>


              {/* BUTTONS */}
              <div className="flex gap-4">

                <button
                  onClick={updateAdmin}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                >

                  Update

                </button>


                <button
                  onClick={() =>
                    setShowEditModal(false)
                  }
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg"
                >

                  Cancel

                </button>

              </div>

            </div>

          </div>

        )
      }

    </div>

  );

}

export default CreateAdmin;