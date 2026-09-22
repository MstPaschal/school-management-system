import {
  useEffect,
  useState
} from "react";

import api from "../services/api";
import { useNotification } from "../context/NotificationContext";

function CreateSession() {
  const { notify, confirmAction } = useNotification();

  const [sessionName, setSessionName] =
    useState("");

  const [sessions, setSessions] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [deletingId, setDeletingId] =
    useState(null);

  // LOAD SESSIONS
  useEffect(() => {
    fetchSessions();
  }, []);

  // FETCH SESSIONS
  const fetchSessions = async () => {
    try {
      const res = await api.get(
        "/sessions"
      );

      setSessions(res.data);
    } catch (error) {
      console.log(error);

      notify(
        error.response?.data?.message ||
          "Failed to load academic sessions.",
        "error"
      );
    }
  };

  // CREATE SESSION
  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedSessionName =
      sessionName.trim();

    if (!trimmedSessionName) {
      notify(
        "Please enter an academic session.",
        "warning"
      );

      return;
    }

    try {
      setLoading(true);

      const res = await api.post(
        "/sessions",
        {
          sessionName:
            trimmedSessionName
        }
      );

      notify(
        res.data.message ||
          "Academic session created successfully.",
        "success"
      );

      setSessionName("");

      fetchSessions();
    } catch (error) {
      console.log(error);

      notify(
        error.response?.data?.message ||
          "Something went wrong.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // DELETE SESSION
  const handleDelete = async (id) => {
    const confirmDelete =
      await confirmAction(
        "This session will be permanently deleted. This action cannot be undone.",
        {
          title: "Delete Session?",
          confirmText: "Delete",
          cancelText: "Cancel"
        }
      );

    if (!confirmDelete) return;

    try {
      setDeletingId(id);

      const res = await api.delete(
        `/sessions/${id}`
      );

      notify(
        res.data.message ||
          "Academic session deleted successfully.",
        "success"
      );

      fetchSessions();
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
            className="border rounded-lg px-4 py-3 w-full"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg"
          >
            {loading
              ? "Saving..."
              : "Create Session"}
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

              {sessions.length === 0 ? (
                <tr>
                  <td
                    colSpan="2"
                    className="p-6 text-center text-gray-500"
                  >
                    No academic sessions found.
                  </td>
                </tr>
              ) : (
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
                          disabled={
                            deletingId ===
                            session.id
                          }
                          className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg"
                        >
                          {deletingId ===
                          session.id
                            ? "Deleting..."
                            : "Delete"}
                        </button>

                      </td>

                    </tr>
                  )
                )
              )}

            </tbody>

          </table>
        </div>

      </div>

    </div>
  );
}

export default CreateSession;