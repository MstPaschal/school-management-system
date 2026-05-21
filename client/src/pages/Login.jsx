import {

  useState

} from "react";

import {

  useNavigate,

  Link

} from "react-router-dom";

import {

  useAuth

} from "../context/AuthContext";


function Login() {

  const navigate =
    useNavigate();

  const { login } =
    useAuth();


  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  const handleLogin =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const result =
          await login(
            username,
            password
          );


        console.log(result);


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

          alert(
            result.message
          );

        }

      } catch (error) {

        console.log(error);

        alert("Login failed");

      } finally {

        setLoading(false);

      }

    };


  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >

      <div>
        <h1 className="text-3xl font-bold text-center mb-4">

          GRISFIELD SCHOOLS

        </h1>
        <p className="text-2xl font-bold text-center mb-2">

          LOGIN PAGE

        </p>
      </div>


        {/* USERNAME */}
        <div className="mb-4">

          <label
            htmlFor="username"
            className="block mb-2 font-semibold"
          >

            Username

          </label>

          <input
            id="username"
            type="text"
            autoComplete="username"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
            className="w-full border px-4 py-3 rounded-lg"
            required
          />

        </div>


        {/* PASSWORD */}
        <div className="mb-6">

          <label
            htmlFor="password"
            className="block mb-2 font-semibold"
          >

            Password

          </label>

          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full border px-4 py-3 rounded-lg"
            required
          />

        </div>


        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        >

          {
            loading
              ? "Logging in..."
              : "Login"
          }

        </button>

        <Link
          to="/forgot-password"
          className="text-blue-600 hover:underline text-sm"
        >

          Forgot Password?

        </Link>

      </form>

    </div>

  );

}

export default Login;