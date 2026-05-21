import {
  useEffect,
  useState
} from "react";

import api from "../services/api";


function CreateSubject() {

  const [subjectName, setSubjectName] =
    useState("");

  const [subjects, setSubjects] =
    useState([]);

  const [loading, setLoading] =
    useState(false);


  // FETCH SUBJECTS
  const fetchSubjects =
    async () => {

      try {

        const res =
          await api.get(
            "/subjects"
          );

        setSubjects(res.data);

      } catch (error) {

        console.log(error);

      }

    };


  useEffect(() => {

    fetchSubjects();

  }, []);


  // CREATE SUBJECT
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const res =
          await api.post(
            "/subjects",
            { subjectName }
          );

        alert(res.data.message);

        setSubjectName("");

        fetchSubjects();

      } catch (error) {

        console.log(error);

        alert(

          error.response?.data?.message ||

          "Failed to create subject"

        );

      } finally {

        setLoading(false);

      }

    };


  // DELETE SUBJECT
  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this subject?"
        );

      if (!confirmDelete) return;

      try {

        const res =
          await api.delete(
            `/subjects/${id}`
          );

        alert(res.data.message);

        fetchSubjects();

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

          Create Subject

        </h1>


        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="flex gap-3 mb-8"
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
                  Subject Name
                </th>

                <th className="p-3">
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {
                subjects.map((subject) => (

                  <tr
                    key={subject.id}
                    className="border-b"
                  >

                    <td className="p-3">

                      {subject.subjectName}

                    </td>


                    <td className="p-3">

                      <button
                        onClick={() =>
                          handleDelete(subject.id)
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

export default CreateSubject;