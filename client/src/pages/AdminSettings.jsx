import {
  useEffect,
  useState
} from "react";

import api from "../services/api";

import {
  useAuth
} from "../context/AuthContext";


function AdminSettings() {

  const { user } = useAuth();

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

      try {

        if (

          !filters.classId ||

          !filters.sessionId ||

          !filters.term

        ) {

          return alert(
            "Select class, session and term"
          );

        }


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

        alert(
          "Failed to load settings"
        );

      } finally {

        setLoading(false);

      }

    };


  // SAVE SETTINGS
  const handleSubmit =
    async (e) => {

      e.preventDefault();

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


        alert(res.data.message);

      } catch (error) {

        console.log(error);

        alert(

          error.response?.data?.message ||

          "Save failed"

        );

      } finally {

        setLoading(false);

      }

    };


  return (

    <div className="p-6">

      <div className="bg-white rounded-2xl shadow p-6">

        <h1 className="text-3xl font-bold mb-6">

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

              border rounded-lg px-4 py-3

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
            className="border rounded-lg px-4 py-3"
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
            className="border rounded-lg px-4 py-3"
          >

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
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-3"
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
              className="grid grid-cols-1 md:grid-cols-3 gap-5"
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
                  className="w-full border rounded-lg px-4 py-3"
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
                  className="w-full border rounded-lg px-4 py-3"
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
                  className="w-full border rounded-lg px-4 py-3"
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
                  className="w-full border rounded-lg px-4 py-3"
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
                  className="w-full border rounded-lg px-4 py-3"
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
                  className="w-full border rounded-lg px-4 py-3"
                />

              </div>


              {/* BUTTON */}
              <div className="md:col-span-3">

                <button
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
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