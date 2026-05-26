import { useEffect, useState } from "react";
import api from "../services/api";

function ResultChecker() {

  const [sessions, setSessions] = useState([]);

  const [loading, setLoading] = useState(false);

  const [studentName,
    setStudentName] =
    useState("");

  const [checkingStudent,
    setCheckingStudent] =
    useState(false);

  const [resultData, setResultData] = useState(null);

  const [formData, setFormData] = useState({
    regNumber: "",
    pin: "",
    sessionId: "",
    term: "1st Term"
  });


  // ======================================
  // LOAD SESSIONS
  // ======================================
  useEffect(() => {

    fetchSessions();

  }, []);


  const fetchSessions = async () => {

    try {

      const res = await api.get("/sessions");

      setSessions(res.data);

    } catch (error) {

      console.log(error);

    }

  };


  // ======================================
  // HANDLE INPUT CHANGE
  // ======================================
  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;

    setFormData({

      ...formData,

      [name]: value

    });

    // AUTO FETCH STUDENT
    if (name === "regNumber") {

      fetchStudentName(value);

    }

  };


  // GET STUDENT BY REG NUMBER
  const fetchStudentName =
    async (regNumber) => {

      if (!regNumber) {

        setStudentName("");

        return;

      }

      try {

        setCheckingStudent(true);

        const res =
          await api.get(

            `/result-checker/student-by-reg/${regNumber}`

          );

        setStudentName(
          res.data.fullName
        );

      } catch (error) {

        setStudentName("");

      } finally {

        setCheckingStudent(false);

      }

    };


  // ======================================
  // CHECK RESULT
  // ======================================
  const handleCheckResult = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await api.post(
        "/result-checker",
        formData
      );

      setResultData(res.data);

      // SAVE RESULT
      localStorage.setItem(
        "checkedResult",
        JSON.stringify(res.data)
      );

      // OPEN RESULT PAGE
      window.open(
        "/result-view",
        "_blank"
      );

    } catch (error) {

      console.log(error);

      alert(

        error.response?.data?.message ||

        "Failed to check result"

      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-6xl mx-auto">


        {/* ======================================
            HEADER
        ====================================== */}
        <div className="bg-blue-900 text-white rounded-2xl p-8 mb-8 text-center shadow-lg">

          <h1 className="text-4xl font-bold mb-2">

            GRISFIELD SCHOOLS

          </h1>

          <p className="text-lg">

            Public Result Checker Portal

          </p>

        </div>


        {/* ======================================
            FORM SECTION
        ====================================== */}
        <div className="bg-white rounded-2xl shadow p-8 mb-10">

          <h2 className="text-2xl font-bold mb-6">

            Check Result

          </h2>


          <form
            onSubmit={handleCheckResult}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >


            {/* REG NUMBER */}
            <div>

              <label className="block font-semibold mb-2">

                Registration Number

              </label>

              <input
                type="text"
                name="regNumber"
                value={formData.regNumber}
                onChange={handleChange}
                placeholder="Enter Registration Number"
                className="w-full border rounded-lg px-4 py-3"
                required
              />

            </div>


            {/* STUDENT NAME DISPLAY */}
            <div className="md:col-span-2">

              <div className="bg-gray-100 border rounded-lg px-4 py-3">

                <p className="font-semibold text-sm text-gray-600 mb-1">

                  Student Name

                </p>

                <p className="text-lg font-bold text-blue-700">

                  {
                    checkingStudent
                      ? "Checking..."
                      : studentName || "No student found"
                  }

                </p>

              </div>

            </div>


            {/* PIN */}
            <div>

              <label className="block font-semibold mb-2">

                Result Checker Pin

              </label>

              <input
                type="text"
                name="pin"
                value={formData.pin}
                onChange={handleChange}
                placeholder="Enter Result Checker Pin"
                className="w-full border rounded-lg px-4 py-3"
                required
              />

            </div>


            {/* SESSION */}
            <div>

              <label className="block font-semibold mb-2">

                Session

              </label>

              <select
                name="sessionId"
                value={formData.sessionId}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
                required
              >

                <option value="">
                  Select Session
                </option>

                {sessions.map((session) => (

                  <option
                    key={session.id}
                    value={session.id}
                  >

                    {session.sessionName}

                  </option>

                ))}

              </select>

            </div>


            {/* TERM */}
            <div>

              <label className="block font-semibold mb-2">

                Term

              </label>

              <select
                name="term"
                value={formData.term}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
              >

                <option value="1st Term">
                  1st Term
                </option>

                <option value="2nd Term">
                  2nd Term
                </option>

                <option value="3rd Term">
                  3rd Term
                </option>

              </select>

            </div>


            {/* BUTTON */}
            <div className="md:col-span-2">

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-xl font-bold text-lg"
              >

                {loading
                  ? "Checking..."
                  : "Check Result"}

              </button>

            </div>

          </form>

        </div>


        {/* ======================================
            RESULT PREVIEW
        ====================================== */}
        {resultData && (

          <div className="bg-white rounded-2xl shadow p-8">

            <h2 className="text-2xl font-bold mb-6">

              Result Preview

            </h2>


            <div className="grid grid-cols-2 md:grid-cols-5 gap-5">


              {/* STUDENT */}
              <div>

                <p className="font-bold">

                  Student

                </p>

                <p>

                  {resultData.student?.fullName}

                </p>

              </div>


              {/* CLASS */}
              <div>

                <p className="font-bold">

                  Class

                </p>

                <p>

                  {
                    resultData.student
                      ?.currentClassName || "N/A"
                  }

                </p>

              </div>


              {/* SESSION */}
              <div>

                <p className="font-bold">

                  Session

                </p>

                <p>

                  {
                    resultData.sessionName || "N/A"
                  }

                </p>

              </div>


              {/* AVERAGE */}
              <div>

                <p className="font-bold">

                  Average

                </p>

                <p>

                  {
                    resultData.result?.average
                  }

                </p>

              </div>


              {/* POSITION */}
              <div>

                <p className="font-bold">

                  Position

                </p>

                <p>

                  {
                    resultData.result?.position
                  }

                </p>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>

  );

}

export default ResultChecker;