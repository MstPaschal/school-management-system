import {
  useState
} from "react";

import api from "../services/api";

function ChangePassword() {

  const [formData, setFormData] =
    useState({

      oldPassword: "",

      newPassword: "",

      confirmPassword: ""

    });

  const [loading, setLoading] =
    useState(false);

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value

      });

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (

        formData.newPassword !==

        formData.confirmPassword

      ) {

        return alert(
          "Passwords do not match"
        );

      }

      try {

        setLoading(true);

        const res =
          await api.post(

            "/auth/change-password",

            {

              oldPassword:
                formData.oldPassword,

              newPassword:
                formData.newPassword

            }

          );

        alert(res.data.message);

        setFormData({

          oldPassword: "",

          newPassword: "",

          confirmPassword: ""

        });

      } catch (error) {

        alert(

          error.response?.data?.message ||

          "Failed"

        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="p-6">

      <div className="bg-white rounded-2xl shadow p-6 max-w-xl">

        <h1 className="text-3xl font-bold mb-6">

          Change Password

        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            value={formData.oldPassword}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >

            {
              loading
                ? "Updating..."
                : "Change Password"
            }

          </button>

        </form>

      </div>

    </div>

  );

}

export default ChangePassword;