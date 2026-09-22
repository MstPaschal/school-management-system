import {
  useEffect,
  useState
} from "react";

import api from "../services/api";
import { useNotification } from "../context/NotificationContext";

function CreateSubject() {
  const { notify, confirmAction } =
    useNotification();

  const [subjectName, setSubjectName] =
    useState("");

  const [subjects, setSubjects] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [deletingId, setDeletingId] =
    useState(null);

  // FETCH SUBJECTS
  const fetchSubjects = async () => {
    try {
      const res = await api.get(
        "/subjects"
      );

      setSubjects(res.data);
    } catch (error) {
      console.log(error);

      notify(
        error.response?.data?.message ||
          "Failed to load subjects.",
        "error"
      );
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  // CREATE SUBJECT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedSubjectName =
      subjectName.trim();

    if (!trimmedSubjectName) {
      notify(
        "Please enter a subject name.",
        "warning"
      );

      return;
    }

    try {
      setLoading(true);

      const res = await api.post(
        "/subjects",
        {
          subjectName:
            trimmedSubjectName
        }
      );

      notify(
        res.data.message ||
          "Subject created successfully.",
        "success"
      );

      setSubjectName("");

      fetchSubjects();
    } catch (error) {
      console.log(error);

      notify(
        error.response?.data?.message ||
          "Failed to create subject.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // DELETE SUBJECT
  const handleDelete = async (id) => {
    const confirmDelete =
      await confirmAction(
        "This subject will be permanently deleted. This action cannot be undone.",
        {
          title: "Delete Subject?",
          confirmText: "Delete",
          cancelText: "Cancel"
        }
      );

    if (!confirmDelete) return;

    try {
      setDeletingId(id);

      const res = await api.delete(
        `/subjects/${id}`
      );

      notify(
        res.data.message ||
          "Subject deleted successfully.",
        "success"
      );

      fetchSubjects();
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

      <div className="bg-white rounded-2xl shadow p-4 sm:p-6 max-w-3xl">

        <h1 className="text-2xl sm:text-3xl font-bold mb-6">
          Create Subject
        </h1>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 mb-8"
        >
          <input
            type="text"
            placeholder="Enter subject name"
            value={subjectName}
            onChange={(e) =>
              setSubjectName(
                e.target.value
              )
            }
            className="flex-1 min-w-0 border rounded-lg px-4 py-3"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition"
          >
            {loading
              ? "Creating..."
              : "Create"}
          </button>
        </form>

        {/* TABLE */}
        <div className="w-full overflow-hidden">
          <table className="w-full border-collapse table-fixed">

            <thead>
              <tr className="bg-gray-100 text-left">

                <th className="p-3 w-[65%]">
                  Subject Name
                </th>

                <th className="p-3 w-[35%]">
                  Action
                </th>

              </tr>
            </thead>

            <tbody>

              {subjects.length === 0 ? (
                <tr>
                  <td
                    colSpan="2"
                    className="p-6 text-center text-gray-500"
                  >
                    No subjects found.
                  </td>
                </tr>
              ) : (
                subjects.map(
                  (subject) => (
                    <tr
                      key={subject.id}
                      className="border-b"
                    >

                      <td className="p-3 break-words">
                        {subject.subjectName}
                      </td>

                      <td className="p-3">

                        <button
                          onClick={() =>
                            handleDelete(
                              subject.id
                            )
                          }
                          disabled={
                            deletingId ===
                            subject.id
                          }
                          className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed text-white px-3 sm:px-4 py-2 rounded-lg transition whitespace-nowrap"
                        >
                          {deletingId ===
                          subject.id
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

export default CreateSubject;