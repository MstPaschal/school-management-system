import {
  useState
} from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";

import {
  useAuth
} from "../context/AuthContext";

function Login() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const result =
        await login(
          username,
          password
        );

      if (result.success) {

        if (
          result.user.role === "admin" ||
          result.user.role === "superadmin"
        ) {

          navigate("/dashboard");

        } else if (
          result.user.role === "teacher"
        ) {

          navigate("/teacher-dashboard");

        }

      } else {

        alert(result.message);

      }

    } catch (error) {

      console.log(error);

      alert("Login failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100 p-6">

      <div className="w-full max-w-6xl bg-amber-50 rounded-[40px] shadow-2xl overflow-hidden">

        <div className="grid md:grid-cols-2">

          {/* LEFT SIDE */}

          <div className="p-10 md:p-14">

            <div className="mb-10">

              <img
                src="/Logo.png"
                alt="School Logo"
                className="w-20 mx-auto mb-6"
              />

              <h1 className="text-4xl font-bold text-gray-800 text-center">

                Hello!

              </h1>

              <p className="text-gray-500 mt-2 text-center">

                Sign in to your account

              </p>

            </div>

            <form
              onSubmit={handleLogin}
              className="space-y-6"
            >

              {/* USERNAME */}

              <div className="relative">

                <FaUser
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-600"
                />

                <input
                  type="text"
                  value={username}
                  onChange={(e) =>
                    setUsername(
                      e.target.value
                    )
                  }
                  placeholder="Username"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-full bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

              </div>

              {/* PASSWORD */}

              <div className="relative">

                <FaLock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-600"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  placeholder="Password"
                  required
                  className="w-full pl-12 pr-12 py-4 rounded-full bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-600"
                >

                  {
                    showPassword
                      ? <FaEyeSlash />
                      : <FaEye />
                  }

                </button>

              </div>

              <div className="flex justify-between text-sm">

                <label className="flex items-center gap-2">

                  <input type="checkbox" />

                  Remember me

                </label>

                <Link
                  to="/forgot-password"
                  className="text-purple-600 hover:underline"
                >

                  Forgot Password?

                </Link>

              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:scale-105 transition"
              >

                {
                  loading
                    ? "Logging in..."
                    : "SIGN IN"
                }

              </button>

            </form>

          </div>

          {/* RIGHT SIDE */}

          <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-700 text-white p-12 relative overflow-hidden">

            <div className="absolute w-72 h-72 bg-white/10 rounded-full -top-20 -right-20"></div>

            <div className="absolute w-56 h-56 bg-white/10 rounded-full -bottom-10 -left-10"></div>

            <div className="relative z-10 text-center">

              <h2 className="text-5xl font-bold mb-6">

                Welcome Back!

              </h2>

              <p className="text-lg leading-8 text-purple-100">

                Welcome to GRISFIELD SCHOOLS
                Management Portal.

                <br />
                Sign in to continue managing
                students, teachers and records.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Login;