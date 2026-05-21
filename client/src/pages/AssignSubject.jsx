import {
  useEffect,
  useState
} from "react";

import api from "../services/api";

function AssignSubjects() {

  const [classes, setClasses] =
    useState([]);

  const [subjects, setSubjects] =
    useState([]);

  const [assignedSubjects, setAssignedSubjects] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({

      classId: "",

      subjectId: ""

    });


  // LOAD DATA
  useEffect(() => {

    fetchClasses();

    fetchSubjects();

  }, []);


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


  // FETCH ASSIGNED SUBJECTS
  const fetchAssignedSubjects =
    async (classId) => {

      if (!classId) return;

      try {

        const res =
          await api.get(
            `/class-subjects/${classId}`
          );

        setAssignedSubjects(res.data);

      } catch (error) {

        console.log(error);

      }

    };


  // HANDLE CHANGE
  const handleChange =
  (e) => {

    const {
      name,
      value
    } = e.target;

    setFormData({

      ...formData,

      [name]: value

    });

  };


  // ASSIGN SUBJECT
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const res =
          await api.post(

            "/class-subjects/assign",

            formData

          );

        alert(
          res.data.message
        );

        fetchAssignedSubjects(
          formData.classId
        );

      } catch (error) {

        console.log(error);

        alert(

          error.response?.data?.message ||

          "Assignment failed"

        );

      } finally {

        setLoading(false);

      }

    };


  // DELETE ASSIGNED SUBJECT
  const handleDelete =
  async (classId, subjectId) => {

    const confirmDelete =
      window.confirm(
        "Remove this subject?"
      );

    if (!confirmDelete) return;

    try {

      const res =
        await api.delete(

          `/class-subjects/${classId}/${subjectId}`

        );

      alert(
        res.data.message
      );

      fetchAssignedSubjects(
        formData.classId
      );

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

      <div className="bg-white rounded-2xl shadow p-6">

        <h1 className="text-3xl font-bold mb-6">

          Assign Subjects To Class

        </h1>


        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8"
        >

          {/* CLASS */}
          <div>

            <label className="block mb-1 font-medium">

              Select Class

            </label>

            <select
              name="classId"
              value={formData.classId}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3"
            >

              <option value="">
                Select Class
              </option>

              {
                classes.map((cls) => (

                  <option
                    key={cls.id}
                    value={cls.id}
                  >

                    {cls.className}

                  </option>

                ))
              }

            </select>

            {/* LOAD SUBJECTS BUTTON */}
            <button
              type="button"
              onClick={() =>
                fetchAssignedSubjects(
                  formData.classId
                )
              }
              className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg w-full"
            >

              Load Subjects

            </button>

          </div>


          {/* SUBJECT */}
          <div>

            <label className="block mb-1 font-medium">

              Select Subject

            </label>

            <select
              name="subjectId"
              value={formData.subjectId}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3"
            >

              <option value="">
                Select Subject
              </option>

              {
                subjects.map((subject) => (

                  <option
                    key={subject.id}
                    value={subject.id}
                  >

                    {subject.subjectName}

                  </option>

                ))
              }

            </select>

          </div>


          {/* BUTTON */}
          <div className="flex items-end">

            <button
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full"
            >

              {
                loading
                  ? "Assigning..."
                  : "Assign Subject"
              }

            </button>

          </div>

        </form>


        {/* ASSIGNED SUBJECTS */}
        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-4">

            Assigned Subjects

          </h2>

          <div className="overflow-x-auto">

            <table className="w-full border-collapse">

              <thead>

                <tr className="bg-gray-100">

                  <th className="p-3 text-left">

                    Subject Name

                  </th>

                  <th className="p-3 text-left">

                    Action

                  </th>

                </tr>

              </thead>

              <tbody>

                {
                  assignedSubjects.length > 0
                  ? (

                    assignedSubjects.map((item) => (

                      <tr
                        key={item.id}
                        className="border-b"
                      >

                        <td className="p-3">

                          {
                            item.Subject?.subjectName
                          }

                        </td>

                        <td className="p-3">

                          <button
                            onClick={() =>
                              handleDelete(

                                item.classId,

                                item.subjectId

                              )
                            }
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                          >

                            Remove

                          </button>

                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td
                        colSpan="2"
                        className="p-4 text-center text-gray-500"
                      >

                        No subject assigned

                      </td>

                    </tr>

                  )
                }

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>

  );

}

export default AssignSubjects;