import {
  useEffect,
  useState
} from "react";

import api from "../services/api";


function CreateClass() {

  const [className, setClassName] =
    useState("");

  const [classes, setClasses] =
    useState([]);

  const [loading, setLoading] =
    useState(false);


  // FETCH CLASSES
  const fetchClasses =
    async () => {

      try {

        const res =
          await api.get(
            "/classes"
          );

        setClasses(res.data);

      } catch (error) {

        console.log(error);

      }

    };


  useEffect(() => {

    fetchClasses();

  }, []);


  // CREATE CLASS
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const res =
          await api.post(
            "/classes",
            { className }
          );

        alert(res.data.message);

        setClassName("");

        fetchClasses();

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data?.message ||
          "Failed to create class"
        );

      } finally {

        setLoading(false);

      }

    };


  // DELETE CLASS
  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this class?"
        );

      if (!confirmDelete) return;

      try {

        const res =
          await api.delete(
            `/classes/${id}`
          );

        alert(res.data.message);

        fetchClasses();

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data?.message ||
          "Delete failed"
        );

      }

    };


  return (

    <div className="p-6">

      <div className="bg-white rounded-2xl shadow p-6 max-w-3xl">

        <h1 className="text-3xl font-bold mb-6">

          Create Class

        </h1>


        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="flex gap-3 mb-8"
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
            required
            className="flex-1 border rounded-lg px-4 py-3"
          />


          <button
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >

            {
              loading
                ? "Creating..."
                : "Create"
            }

          </button>

        </form>


        {/* TABLE */}
        <div className="overflow-x-auto">

          <table className="w-full border-collapse">

            <thead>

              <tr className="bg-gray-100 text-left">

                <th className="p-3">
                  Class Name
                </th>

                <th className="p-3">
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {
                classes.map((cls) => (

                  <tr
                    key={cls.id}
                    className="border-b"
                  >

                    <td className="p-3">

                      {cls.className}

                    </td>


                    <td className="p-3">

                      <button
                        onClick={() =>
                          handleDelete(cls.id)
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                      >

                        Delete

                      </button>

                    </td>

                  </tr>

                ))
              }

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

export default CreateClass;