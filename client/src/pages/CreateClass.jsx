import {
  useEffect,
  useState
} from "react";

import api from "../services/api";
import { useNotification } from "../context/NotificationContext";

function CreateClass() {
  const { notify, confirmAction } = useNotification();

  const [className, setClassName] = useState("");
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // FETCH CLASSES
  const fetchClasses = async () => {
    try {
      const res = await api.get("/classes");

      setClasses(res.data);
    } catch (error) {
      console.log(error);

      notify(
        error.response?.data?.message ||
          "Failed to load classes.",
        "error"
      );
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  // CREATE CLASS
  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedClassName =
      className.trim();

    if (!trimmedClassName) {
      notify(
        "Please enter a class name.",
        "warning"
      );

      return;
    }

    try {
      setLoading(true);

      const res = await api.post(
        "/classes",
        {
          className: trimmedClassName
        }
      );

      notify(
        res.data.message ||
          "Class created successfully.",
        "success"
      );

      setClassName("");

      fetchClasses();
    } catch (error) {
      console.log(error);

      notify(
        error.response?.data?.message ||
          "Failed to create class.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // DELETE CLASS
  const handleDelete = async (id) => {
    const confirmDelete =
      await confirmAction(
        "This class will be permanently deleted. This action cannot be undone.",
        {
          title: "Delete Class?",
          confirmText: "Delete",
          cancelText: "Cancel"
        }
      );

    if (!confirmDelete) return;

    try {
      setDeletingId(id);

      const res = await api.delete(
        `/classes/${id}`
      );

      notify(
        res.data.message ||
          "Class deleted successfully.",
        "success"
      );

      fetchClasses();
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

        {/* HEADER */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">
          Create Class
        </h1>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 mb-8"
        >
          <input
            type="text"
            placeholder="Enter class name"
            value={className}
            onChange={(e) =>
              setClassName(
                e.target.value
              )
            }
            className="flex-1 min-w-0 border border-slate-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
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

        {/* EMPTY STATE */}
        {classes.length === 0 ? (
          <div className="py-8 text-center text-slate-500">
            No classes found.
          </div>
        ) : (
          /* TABLE */
          <div className="w-full overflow-hidden">
            <table className="w-full border-collapse table-fixed">

              <thead>
                <tr className="bg-gray-100 text-left">

                  <th className="p-3 w-[65%]">
                    Class Name
                  </th>

                  <th className="p-3 w-[35%]">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody>

                {classes.map((cls) => (
                  <tr
                    key={cls.id}
                    className="border-b"
                  >

                    <td className="p-3 break-words">
                      {cls.className}
                    </td>

                    <td className="p-3">

                      <button
                        onClick={() =>
                          handleDelete(
                            cls.id
                          )
                        }
                        disabled={
                          deletingId ===
                          cls.id
                        }
                        className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed text-white px-3 sm:px-4 py-2 rounded-lg transition whitespace-nowrap"
                      >
                        {deletingId ===
                        cls.id
                          ? "Deleting..."
                          : "Delete"}
                      </button>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>
          </div>
        )}

      </div>

    </div>
  );
}

export default CreateClass;