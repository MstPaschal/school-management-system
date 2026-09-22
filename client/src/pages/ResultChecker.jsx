import { useEffect, useState } from "react";
import api from "../services/api";

import { useNotification } from "../context/NotificationContext";

function ResultChecker() {
  const { notify } = useNotification();

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [studentName, setStudentName] =
    useState("");

  const [checkingStudent, setCheckingStudent] =
    useState(false);

  const [resultData, setResultData] =
    useState(null);

  const [formData, setFormData] = useState({
    regNumber: "",
    pin: "",
    sessionId: "",
    term: "",
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

      notify(
        error.response?.data?.message ||
          "Failed to load sessions.",
        "error"
      );
    }
  };

  // ======================================
  // HANDLE INPUT CHANGE
  // ======================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // AUTO FETCH STUDENT
    if (name === "regNumber") {
      fetchStudentName(value);
    }

    // Clear previous result when changing
    // the result-checking details
    if (
      name === "regNumber" ||
      name === "pin" ||
      name === "sessionId" ||
      name === "term"
    ) {
      setResultData(null);
    }
  };

  // ======================================
  // GET STUDENT BY REG NUMBER
  // ======================================

  const fetchStudentName = async (regNumber) => {
    const trimmedRegNumber =
      regNumber.trim();

    if (!trimmedRegNumber) {
      setStudentName("");
      return;
    }

    try {
      setCheckingStudent(true);

      const res = await api.get(
        `/result-checker/student-by-reg/${trimmedRegNumber}`
      );

      setStudentName(
        res.data.fullName || ""
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

    const trimmedRegNumber =
      formData.regNumber.trim();

    const trimmedPin =
      formData.pin.trim();

    if (!trimmedRegNumber) {
      notify(
        "Please enter the student's registration number.",
        "warning"
      );
      return;
    }

    if (checkingStudent) {
      notify(
        "Please wait while we verify the student.",
        "warning"
      );
      return;
    }

    if (!studentName) {
      notify(
        "No student was found with that registration number.",
        "warning"
      );
      return;
    }

    if (!trimmedPin) {
      notify(
        "Please enter the result checker PIN.",
        "warning"
      );
      return;
    }

    if (!formData.sessionId) {
      notify(
        "Please select a session.",
        "warning"
      );
      return;
    }

    if (!formData.term) {
      notify(
        "Please select a term.",
        "warning"
      );
      return;
    }

    try {
      setLoading(true);

      const requestData = {
        ...formData,
        regNumber: trimmedRegNumber,
        pin: trimmedPin,
      };

      const res = await api.post(
        "/result-checker",
        requestData
      );

      setResultData(res.data);

      // SAVE RESULT
      localStorage.setItem(
        "checkedResult",
        JSON.stringify(res.data)
      );

      notify(
        "Result verified successfully. Opening result...",
        "success"
      );

      // OPEN RESULT PAGE
      window.open(
        "/result-view",
        "_blank"
      );
    } catch (error) {
      console.log(error);

      notify(
        error.response?.data?.message ||
          "Failed to check result.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 sm:py-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* ======================================
            HEADER
        ====================================== */}

        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8 text-center shadow-lg">

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            GRISFIELD SCHOOLS
          </h1>

          <p className="text-base sm:text-lg text-blue-100">
            Public Result Checker Portal
          </p>

        </div>

        {/* ======================================
            FORM SECTION
        ====================================== */}

        <div className="bg-white rounded-2xl shadow p-5 sm:p-8 mb-8 sm:mb-10">

          <h2 className="text-xl sm:text-2xl font-bold mb-6">
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
                autoComplete="off"
                disabled={loading}
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>

            {/* STUDENT NAME DISPLAY */}

            <div className="md:col-span-2">

              <div className="bg-gray-100 border rounded-lg px-4 py-3">

                <p className="font-semibold text-sm text-gray-600 mb-1">
                  Student Name
                </p>

                <p
                  className={`text-base sm:text-lg font-bold ${
                    studentName
                      ? "text-blue-700"
                      : "text-gray-500"
                  }`}
                >
                  {checkingStudent
                    ? "Checking..."
                    : studentName ||
                      "No student found"}
                </p>

              </div>

            </div>

            {/* PIN */}

            <div>
              <label className="block font-semibold mb-2">
                Result Checker PIN
              </label>

              <input
                type="text"
                name="pin"
                value={formData.pin}
                onChange={handleChange}
                placeholder="Enter Result Checker PIN"
                autoComplete="off"
                disabled={loading}
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
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
                disabled={loading}
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
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
                disabled={loading}
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              >

                <option value="">
                  Select Term
                </option>

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
                className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3.5 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
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
          <div className="bg-white rounded-2xl shadow p-5 sm:p-8">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">

              <h2 className="text-xl sm:text-2xl font-bold">
                Result Preview
              </h2>

              <span className="text-sm text-green-600 font-semibold">
                Result Verified
              </span>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 sm:gap-5">

              {/* STUDENT */}

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="font-bold text-sm text-gray-500 mb-1">
                  Student
                </p>

                <p className="break-words">
                  {resultData.student?.fullName}
                </p>
              </div>

              {/* CLASS */}

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="font-bold text-sm text-gray-500 mb-1">
                  Class
                </p>

                <p className="break-words">
                  {resultData.student
                    ?.currentClassName ||
                    "N/A"}
                </p>
              </div>

              {/* SESSION */}

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="font-bold text-sm text-gray-500 mb-1">
                  Session
                </p>

                <p className="break-words">
                  {resultData.sessionName ||
                    "N/A"}
                </p>
              </div>

              {/* AVERAGE */}

              <div className="bg-blue-50 rounded-xl p-4">
                <p className="font-bold text-sm text-blue-600 mb-1">
                  Average
                </p>

                <p className="text-xl font-bold text-blue-800">
                  {resultData.result?.average}
                </p>
              </div>

              {/* POSITION */}

              <div className="bg-purple-50 rounded-xl p-4">
                <p className="font-bold text-sm text-purple-600 mb-1">
                  Position
                </p>

                <p className="text-xl font-bold text-purple-800">
                  {resultData.result?.position}
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