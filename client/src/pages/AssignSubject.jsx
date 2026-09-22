import {
  useEffect,
  useState
} from "react";

import api from "../services/api";

import {
  useNotification
} from "../context/NotificationContext";


function AssignSubjects() {

  const {
    notify,
    confirmAction
  } = useNotification();


  const [classes, setClasses] =
    useState([]);

  const [subjects, setSubjects] =
    useState([]);

  const [assignedSubjects, setAssignedSubjects] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [loadingSubjects, setLoadingSubjects] =
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

        notify(
          error.response?.data?.message ||
          "Failed to load classes",
          "error"
        );

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

        notify(
          error.response?.data?.message ||
          "Failed to load subjects",
          "error"
        );

      }

    };


  // FETCH ASSIGNED SUBJECTS
  const fetchAssignedSubjects =
    async (classId) => {

      if (!classId) {

        notify(
          "Please select a class before loading subjects.",
          "warning"
        );

        return;

      }


      try {

        setLoadingSubjects(true);

        const res =
          await api.get(
            `/class-subjects/${classId}`
          );

        setAssignedSubjects(res.data);

      } catch (error) {

        console.log(error);

        notify(
          error.response?.data?.message ||
          "Failed to load assigned subjects",
          "error"
        );

      } finally {

        setLoadingSubjects(false);

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


      // When changing class, clear the
      // currently displayed assignments.
      if (name === "classId") {

        setAssignedSubjects([]);

      }

    };


  // ASSIGN SUBJECT
  const handleSubmit =
    async (e) => {

      e.preventDefault();


      // REQUIRED FIELD VALIDATION
      const missingFields = [];


      if (!formData.classId) {

        missingFields.push("Class");

      }


      if (!formData.subjectId) {

        missingFields.push("Subject");

      }


      if (missingFields.length > 0) {

        notify(
          `Please select ${missingFields.join(" and ")} before assigning the subject.`,
          "warning"
        );

        return;

      }


      try {

        setLoading(true);


        const res =
          await api.post(

            "/class-subjects/assign",

            formData

          );


        notify(

          res.data.message ||
          "Subject assigned successfully",

          "success"

        );


        // Refresh assigned subjects
        // for the selected class.
        await fetchAssignedSubjects(
          formData.classId
        );


        // Keep the selected class,
        // but clear the subject so
        // another subject can be assigned.
        setFormData((prev) => ({

          ...prev,

          subjectId: ""

        }));


      } catch (error) {

        console.log(error);

        notify(

          error.response?.data?.message ||

          "Assignment failed",

          "error"

        );

      } finally {

        setLoading(false);

      }

    };


  // DELETE ASSIGNED SUBJECT
  const handleDelete =
    async (classId, subjectId) => {

      const confirmed =
        await confirmAction(

          "Remove this subject from the selected class?",

          {

            title:
              "Remove Subject?",

            confirmText:
              "Remove",

            cancelText:
              "Cancel"

          }

        );


      if (!confirmed) return;


      try {

        const res =
          await api.delete(

            `/class-subjects/${classId}/${subjectId}`

          );


        notify(

          res.data.message ||

          "Subject removed successfully",

          "success"

        );


        await fetchAssignedSubjects(
          classId
        );


      } catch (error) {

        console.log(error);

        notify(

          error.response?.data?.message ||

          "Delete failed",

          "error"

        );

      }

    };


  return (

    <div className="p-4 sm:p-6">

      <div className="bg-white rounded-2xl shadow p-4 sm:p-6">

        <h1
          className="
            text-2xl
            sm:text-3xl
            font-bold
            mb-6
          "
        >

          Assign Subjects To Class

        </h1>


        {/* FORM */}
        <form

          onSubmit={handleSubmit}

          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-5
            mb-8
          "

        >

          {/* CLASS */}
          <div>

            <label
              className="
                block
                mb-1
                font-medium
                text-sm
                sm:text-base
              "
            >

              Select Class

            </label>


            <select

              name="classId"

              value={formData.classId}

              onChange={handleChange}

              required

              className="
                w-full
                border
                rounded-lg
                px-4
                py-3
                text-sm
                sm:text-base
                bg-white
                outline-none
                focus:ring-2
                focus:ring-blue-200
                focus:border-blue-500
              "

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

              disabled={loadingSubjects}

              className="
                mt-3
                bg-green-600
                hover:bg-green-700
                disabled:bg-green-400
                disabled:cursor-not-allowed
                text-white
                px-4
                py-2.5
                rounded-lg
                w-full
                font-medium
                transition
              "

            >

              {

                loadingSubjects

                  ? "Loading..."

                  : "Load Subjects"

              }

            </button>

          </div>


          {/* SUBJECT */}
          <div>

            <label
              className="
                block
                mb-1
                font-medium
                text-sm
                sm:text-base
              "
            >

              Select Subject

            </label>


            <select

              name="subjectId"

              value={formData.subjectId}

              onChange={handleChange}

              required

              className="
                w-full
                border
                rounded-lg
                px-4
                py-3
                text-sm
                sm:text-base
                bg-white
                outline-none
                focus:ring-2
                focus:ring-blue-200
                focus:border-blue-500
              "

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

              type="submit"

              disabled={loading}

              className="
                bg-blue-600
                hover:bg-blue-700
                disabled:bg-blue-400
                disabled:cursor-not-allowed
                text-white
                px-6
                py-3
                rounded-lg
                w-full
                font-medium
                transition
              "

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
        <div className="mt-8 sm:mt-10">

          <h2
            className="
              text-xl
              sm:text-2xl
              font-bold
              mb-4
            "
          >

            Assigned Subjects

          </h2>


          <div
            className="
              overflow-x-auto
              rounded-lg
              border
              border-gray-100
            "
          >

            <table className="w-full border-collapse min-w-[500px]">

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

                          className="border-b last:border-b-0"

                        >

                          <td className="p-3">

                            {

                              item.Subject?.subjectName

                            }

                          </td>


                          <td className="p-3">

                            <button

                              type="button"

                              onClick={() =>
                                handleDelete(
                                  item.classId,
                                  item.subjectId
                                )
                              }

                              className="
                                bg-red-500
                                hover:bg-red-600
                                text-white
                                px-4
                                py-2
                                rounded-lg
                                whitespace-nowrap
                              "

                            >

                              Remove

                            </button>

                          </td>

                        </tr>

                      ))

                    )

                    : (

                      <tr>

                        <td

                          colSpan="2"

                          className="
                            p-4
                            text-center
                            text-gray-500
                          "

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