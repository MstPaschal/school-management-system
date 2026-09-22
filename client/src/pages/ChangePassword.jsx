import {
  useState
} from "react";

import api from "../services/api";

import {
  useNotification
} from "../context/NotificationContext";


function ChangePassword() {

  const { notify } = useNotification();


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


      // =========================
      // REQUIRED FIELD VALIDATION
      // =========================

      if (
        !formData.oldPassword ||
        !formData.newPassword ||
        !formData.confirmPassword
      ) {

        notify(
          "Please fill in all password fields.",
          "warning"
        );

        return;

      }


      // =========================
      // PASSWORD MATCH
      // =========================

      if (
        formData.newPassword !==
        formData.confirmPassword
      ) {

        notify(
          "New password and confirmation password do not match.",
          "warning"
        );

        return;

      }


      // =========================
      // PREVENT SAME PASSWORD
      // =========================

      if (
        formData.oldPassword ===
        formData.newPassword
      ) {

        notify(
          "Your new password must be different from your old password.",
          "warning"
        );

        return;

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


        notify(

          res.data.message ||

          "Password changed successfully.",

          "success"

        );


        setFormData({

          oldPassword: "",

          newPassword: "",

          confirmPassword: ""

        });


      } catch (error) {

        console.log(error);

        notify(

          error.response?.data?.message ||

          "Failed to change password.",

          "error"

        );

      } finally {

        setLoading(false);

      }

    };


  return (

    <div className="p-4 sm:p-6">

      <div
        className="
          bg-white
          rounded-2xl
          shadow
          p-5
          sm:p-6
          max-w-xl
          w-full
        "
      >

        <h1
          className="
            text-2xl
            sm:text-3xl
            font-bold
            mb-6
          "
        >

          Change Password

        </h1>


        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* OLD PASSWORD */}
          <div>

            <label
              htmlFor="oldPassword"
              className="
                block
                mb-1.5
                text-sm
                font-medium
                text-gray-700
              "
            >

              Old Password

            </label>

            <input

              id="oldPassword"

              type="password"

              name="oldPassword"

              placeholder="Enter your old password"

              value={formData.oldPassword}

              onChange={handleChange}

              autoComplete="current-password"

              className="
                w-full
                border
                rounded-lg
                px-4
                py-3
                text-sm
                sm:text-base
                outline-none
                focus:ring-2
                focus:ring-blue-200
                focus:border-blue-500
                transition
              "

            />

          </div>


          {/* NEW PASSWORD */}
          <div>

            <label
              htmlFor="newPassword"
              className="
                block
                mb-1.5
                text-sm
                font-medium
                text-gray-700
              "
            >

              New Password

            </label>

            <input

              id="newPassword"

              type="password"

              name="newPassword"

              placeholder="Enter your new password"

              value={formData.newPassword}

              onChange={handleChange}

              autoComplete="new-password"

              className="
                w-full
                border
                rounded-lg
                px-4
                py-3
                text-sm
                sm:text-base
                outline-none
                focus:ring-2
                focus:ring-blue-200
                focus:border-blue-500
                transition
              "

            />

          </div>


          {/* CONFIRM PASSWORD */}
          <div>

            <label
              htmlFor="confirmPassword"
              className="
                block
                mb-1.5
                text-sm
                font-medium
                text-gray-700
              "
            >

              Confirm New Password

            </label>

            <input

              id="confirmPassword"

              type="password"

              name="confirmPassword"

              placeholder="Confirm your new password"

              value={formData.confirmPassword}

              onChange={handleChange}

              autoComplete="new-password"

              className="
                w-full
                border
                rounded-lg
                px-4
                py-3
                text-sm
                sm:text-base
                outline-none
                focus:ring-2
                focus:ring-blue-200
                focus:border-blue-500
                transition
              "

            />

          </div>


          {/* BUTTON */}
          <div className="pt-2">

            <button

              type="submit"

              disabled={loading}

              className="
                w-full
                sm:w-auto
                bg-blue-600
                hover:bg-blue-700
                disabled:bg-blue-400
                disabled:cursor-not-allowed
                text-white
                px-6
                py-3
                rounded-lg
                font-medium
                transition
              "

            >

              {

                loading

                  ? "Updating..."

                  : "Change Password"

              }

            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default ChangePassword;