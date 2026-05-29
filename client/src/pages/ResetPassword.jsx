import {
  useState
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import api from "../services/api";

function ResetPassword() {

  const { token } =
    useParams();

  const navigate =
    useNavigate();

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (
        password !== confirmPassword
      ) {

        return setMessage(
          "Passwords do not match"
        );

      }

      try {

        setLoading(true);

        const res =
          await api.post(

            `/auth/reset-password/${token}`,

            { password }

          );

        setMessage(res.data.message);

        setTimeout(() => {

          navigate("/portal");

        }, 2000);

      } catch (error) {

        setMessage(

          error.response?.data?.message ||

          "Reset failed"

        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">

          Reset Password

        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            required
            className="w-full border rounded-lg px-4 py-3"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg py-3"
          >

            {
              loading
                ? "Resetting..."
                : "Reset Password"
            }

          </button>

        </form>

        {
          message && (

            <p className="mt-4 text-center text-sm">

              {message}

            </p>

          )
        }

      </div>

    </div>

  );

}

export default ResetPassword;