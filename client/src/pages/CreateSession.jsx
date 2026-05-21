import {
  useEffect,
  useState
} from "react";

import api from "../services/api";


function CreateSession() {

  const [sessionName,
    setSessionName] =
    useState("");

  const [sessions,
    setSessions] =
    useState([]);

  const [loading,
    setLoading] =
    useState(false);


  // LOAD SESSIONS
  useEffect(() => {

    fetchSessions();

  }, []);


  // FETCH SESSIONS
  const fetchSessions =
    async () => {

      try {

        const res =
          await api.get(
            "/sessions"
          );

        setSessions(res.data);

      } catch (error) {

        console.log(error);

      }

    };


  // CREATE SESSION
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const res =
          await api.post(
            "/sessions",
            {
              sessionName
            }
          );

        alert(res.data.message);

        setSessionName("");

        fetchSessions();

      } catch (error) {

        console.log(error);

        alert(

          error.response?.data?.message ||

          "Something went wrong"

        );

      } finally {

        setLoading(false);

      }

    };


  // DELETE SESSION
  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this session?"
        );

      if (!confirmDelete) return;


      try {

        const res =
          await api.delete(
            `/sessions/${id}`
          );

        alert(res.data.message);

        fetchSessions();

      } catch (error) {

        console.log(error);

      }

    };


  return (

    <div className="p-6">

      <div className="bg-white rounded-2xl shadow p-6">

        <h1 className="text-3xl font-bold mb-6">

          Academic Sessions

        </h1>


        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >

          <input
            type="text"
            placeholder="e.g. 2025/2026"
            value={sessionName}
            onChange={(e) =>
              setSessionName(
                e.target.value
              )
            }
            required
            className="border rounded-lg px-4 py-3 w-full"
          />


          <button
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >

            {
              loading
                ? "Saving..."
                : "Create Session"
            }

          </button>

        </form>


        {/* SESSION TABLE */}
        <div className="overflow-x-auto">

          <table className="w-full border-collapse">

            <thead>

              <tr className="bg-gray-100">

                <th className="p-3 text-left">
                  Session
                </th>

                <th className="p-3 text-left">
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {
                sessions.map(
                  (session) => (

                    <tr
                      key={session.id}
                      className="border-b"
                    >

                      <td className="p-3 font-medium">

                        {session.sessionName}

                      </td>


                      <td className="p-3">

                        <button
                          onClick={() =>
                            handleDelete(
                              session.id
                            )
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                        >

                          Delete

                        </button>

                      </td>

                    </tr>

                  )
                )
              }

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

export default CreateSession;