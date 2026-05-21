import {
  useState
} from "react";

import api from "../services/api";

function ForgotPassword() {

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const res =
          await api.post(

            "/auth/forgot-password",

            { email }

          );

        setMessage(res.data.message);

      } catch (error) {

        setMessage(

          error.response?.data?.message ||

          "Something went wrong"

        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">

          Forgot Password

        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
            className="w-full border rounded-lg px-4 py-3"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3"
          >

            {
              loading
                ? "Sending..."
                : "Send Reset Link"
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

export default ForgotPassword;