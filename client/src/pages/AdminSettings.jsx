import {
  useEffect,
  useState
} from "react";

import api from "../services/api";

import {
  useAuth
} from "../context/AuthContext";

import {
  useNotification
} from "../context/NotificationContext";


function AdminSettings() {

  const { user } = useAuth();

  const { notify } = useNotification();

  const [classes, setClasses] =
    useState([]);

  const [sessions, setSessions] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [loaded, setLoaded] =
    useState(false);


  const [filters, setFilters] =
    useState({

      classId: "",

      sessionId: "",

      term: "1st Term"

    });


  const [formData, setFormData] =
    useState({

      nextTermResumes: "",

      tuitionFee: "",

      saturdayLesson: "",

      scratchCard: "",

      termlyActivities: "",

      books: ""

    });


  // LOAD DATA
  useEffect(() => {

    fetchClasses();

    fetchSessions();

  }, []);


  // LOCK CLASS
  useEffect(() => {

    if (

      user?.role === "teacher" &&

      user?.assignedClass

    ) {

      setFilters((prev) => ({

        ...prev,

        classId: user.assignedClass

      }));

    }

  }, [user]);


  // FETCH CLASSES
  const fetchClasses =
    async () => {

      try {

        const res =
          await api.get("/classes");

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


  // FETCH SESSIONS
  const fetchSessions =
    async () => {

      try {

        const res =
          await api.get("/sessions");

        setSessions(res.data);

      } catch (error) {

        console.log(error);

        notify(
          error.response?.data?.message ||
          "Failed to load sessions",
          "error"
        );

      }

    };


  // HANDLE FILTER CHANGE
  const handleFilterChange =
    (e) => {

      setFilters({

        ...filters,

        [e.target.name]:
          e.target.value

      });

      // If the filter changes, the currently
      // displayed settings no longer represent
      // the new selection.
      setLoaded(false);

    };


  // HANDLE FORM CHANGE
  const handleFormChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value

      });

    };


  // LOAD SETTINGS
  const loadSettings =
    async () => {

      // REQUIRED FIELD VALIDATION
      const missingFields = [];

      if (!filters.classId) {
        missingFields.push("Class");
      }

      if (!filters.sessionId) {
        missingFields.push("Session");
      }

      if (!filters.term) {
        missingFields.push("Term");
      }

      if (missingFields.length > 0) {

        notify(
          `Please select ${missingFields.join(" and ")} before loading settings.`,
          "warning"
        );

        return;

      }


      try {

        setLoading(true);


        const res =
          await api.get(

            "/payments/admin-setting",

            {

              params: filters

            }

          );


        if (res.data) {

          setFormData({

            nextTermResumes:
              res.data.nextTermResumes || "",

            tuitionFee:
              res.data.tuitionFee || "",

            saturdayLesson:
              res.data.saturdayLesson || "",

            scratchCard:
              res.data.scratchCard || "",

            termlyActivities:
              res.data.termlyActivities || "",

            books:
              res.data.books || ""

          });

        } else {

          setFormData({

            nextTermResumes: "",

            tuitionFee: "",

            saturdayLesson: "",

            scratchCard: "",

            termlyActivities: "",

            books: ""

          });

        }


        setLoaded(true);


      } catch (error) {

        console.log(error);

        notify(
          error.response?.data?.message ||
          "Failed to load settings",
          "error"
        );

      } finally {

        setLoading(false);

      }

    };


  // SAVE SETTINGS
  const handleSubmit =
    async (e) => {

      e.preventDefault();


      // SAFETY VALIDATION BEFORE SAVE
      const missingFields = [];

      if (!filters.classId) {
        missingFields.push("Class");
      }

      if (!filters.sessionId) {
        missingFields.push("Session");
      }

      if (!filters.term) {
        missingFields.push("Term");
      }

      if (missingFields.length > 0) {

        notify(
          `Please select ${missingFields.join(" and ")} before saving settings.`,
          "warning"
        );

        return;

      }


      try {

        setLoading(true);

        const payload = {

          ...filters,

          ...formData

        };


        const res =
          await api.post(

            "/payments/admin-setting",

            payload

          );


        notify(
          res.data.message ||
          "Settings saved successfully",
          "success"
        );


      } catch (error) {

        console.log(error);

        notify(

          error.response?.data?.message ||

          "Save failed",

          "error"

        );

      } finally {

        setLoading(false);

      }

    };


  return (

    <div className="p-4 sm:p-6">

      <div className="bg-white rounded-2xl shadow p-4 sm:p-6">

        <h1 className="text-2xl sm:text-3xl font-bold mb-6">

          Admin Settings

        </h1>


        {/* FILTERS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

          {/* CLASS */}
          <select
            name="classId"
            value={filters.classId}
            onChange={handleFilterChange}
            disabled={user?.role === "teacher"}
            className={`

              w-full
              border rounded-lg px-4 py-3
              text-sm sm:text-base

              ${
                user?.role === "teacher"
                  ? "bg-gray-100 cursor-not-allowed"
                  : ""
              }

            `}
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


          {/* SESSION */}
          <select
            name="sessionId"
            value={filters.sessionId}
            onChange={handleFilterChange}
            className="
              w-full
              border rounded-lg px-4 py-3
              text-sm sm:text-base
            "
          >

            <option value="">
              Select Session
            </option>

            {
              sessions.map((session) => (

                <option
                  key={session.id}
                  value={session.id}
                >

                  {session.sessionName}

                </option>

              ))
            }

          </select>


          {/* TERM */}
          <select
            name="term"
            value={filters.term}
            onChange={handleFilterChange}
            className="
              w-full
              border rounded-lg px-4 py-3
              text-sm sm:text-base
            "
          >

            <option value="">
              Select Term
            </option>

            <option>
              1st Term
            </option>

            <option>
              2nd Term
            </option>

            <option>
              3rd Term
            </option>

          </select>


          {/* LOAD */}
          <button
            onClick={loadSettings}
            disabled={loading}
            className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              disabled:opacity-60
              disabled:cursor-not-allowed
              text-white
              rounded-lg
              px-4
              py-3
              font-medium
              transition
            "
          >

            {
              loading
                ? "Loading..."
                : "Load Settings"
            }

          </button>

        </div>


        {/* FORM */}
        {
          loaded && (

            <form
              onSubmit={handleSubmit}
              className="
                grid
                grid-cols-1
                md:grid-cols-3
                gap-5
              "
            >

              {/* NEXT TERM */}
              <div>

                <label className="block mb-1 font-medium">

                  Next Term Resumes

                </label>

                <input
                  type="date"
                  name="nextTermResumes"
                  value={formData.nextTermResumes}
                  onChange={handleFormChange}
                  className="
                    w-full
                    border
                    rounded-lg
                    px-4
                    py-3
                    text-sm sm:text-base
                  "
                />

              </div>


              {/* TUITION */}
              <div>

                <label className="block mb-1 font-medium">

                  Tuition Fee

                </label>

                <input
                  type="number"
                  name="tuitionFee"
                  value={formData.tuitionFee}
                  onChange={handleFormChange}
                  min="0"
                  className="
                    w-full
                    border
                    rounded-lg
                    px-4
                    py-3
                    text-sm sm:text-base
                  "
                />

              </div>


              {/* SATURDAY */}
              <div>

                <label className="block mb-1 font-medium">

                  Saturday Lesson

                </label>

                <input
                  type="number"
                  name="saturdayLesson"
                  value={formData.saturdayLesson}
                  onChange={handleFormChange}
                  min="0"
                  className="
                    w-full
                    border
                    rounded-lg
                    px-4
                    py-3
                    text-sm sm:text-base
                  "
                />

              </div>


              {/* SCRATCH */}
              <div>

                <label className="block mb-1 font-medium">

                  Scratch Card

                </label>

                <input
                  type="number"
                  name="scratchCard"
                  value={formData.scratchCard}
                  onChange={handleFormChange}
                  min="0"
                  className="
                    w-full
                    border
                    rounded-lg
                    px-4
                    py-3
                    text-sm sm:text-base
                  "
                />

              </div>


              {/* ACTIVITIES */}
              <div>

                <label className="block mb-1 font-medium">

                  Termly Activities

                </label>

                <input
                  type="number"
                  name="termlyActivities"
                  value={formData.termlyActivities}
                  onChange={handleFormChange}
                  min="0"
                  className="
                    w-full
                    border
                    rounded-lg
                    px-4
                    py-3
                    text-sm sm:text-base
                  "
                />

              </div>


              {/* BOOKS */}
              <div>

                <label className="block mb-1 font-medium">

                  Books

                </label>

                <input
                  type="number"
                  name="books"
                  value={formData.books}
                  onChange={handleFormChange}
                  min="0"
                  className="
                    w-full
                    border
                    rounded-lg
                    px-4
                    py-3
                    text-sm sm:text-base
                  "
                />

              </div>


              {/* BUTTON */}
              <div className="md:col-span-3">

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    w-full sm:w-auto
                    bg-green-600
                    hover:bg-green-700
                    disabled:opacity-60
                    disabled:cursor-not-allowed
                    text-white
                    px-6
                    py-3
                    rounded-lg
                    font-medium
                    transition
                  "
                >

                  {
                    loading
                      ? "Saving..."
                      : "Save Settings"
                  }

                </button>

              </div>

            </form>

          )
        }

      </div>

    </div>

  );

}

export default AdminSettings;