import {
  useEffect,
  useState
} from "react";

import {
  FaUserGraduate,
  FaChartBar,
  FaMoneyBillWave,
  FaCalendarCheck,
  FaClock,
  FaFileAlt,
  FaBullhorn,
  FaSignOutAlt,
  FaLock,
  FaChevronRight
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import api from "../services/api";

import { SERVER_BASE_URL } from "../config/apiConfig";


function StudentPortal() {

  const navigate = useNavigate();

  const {
    user,
    logout
  } = useAuth();

  const [student, setStudent] =
    useState(null);

  const [loadingStudent, setLoadingStudent] =
    useState(true);


    // ==========================================
    // LOAD AUTHENTICATED STUDENT PROFILE
    // ==========================================

    useEffect(() => {

    const fetchStudentProfile =
        async () => {

        try {

            const res =
            await api.get(
                "/students/me"
            );

            setStudent(
            res.data
            );

        } catch (error) {

            console.log(
            "STUDENT PROFILE ERROR:",
            error
            );

        } finally {

            setLoadingStudent(false);

        }

        };


    fetchStudentProfile();

    }, []);


  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {

    logout();

    navigate("/portal");

  };


  // ==========================================
  // PORTAL FEATURES
  // ==========================================

  const features = [

    {
      title: "My Results",
      description:
        "View your released academic results and report cards.",
      icon: <FaChartBar />,
      color: "bg-blue-100 text-blue-700",
      locked: false
    },

    {
      title: "Fees & Payments",
      description:
        "View school fees, payment records and outstanding balances.",
      icon: <FaMoneyBillWave />,
      color: "bg-green-100 text-green-700",
      locked: true
    },

    {
      title: "Attendance",
      description:
        "Check your attendance records and school participation.",
      icon: <FaCalendarCheck />,
      color: "bg-purple-100 text-purple-700",
      locked: true
    },

    {
      title: "Timetable",
      description:
        "View your current class timetable and daily schedule.",
      icon: <FaClock />,
      color: "bg-orange-100 text-orange-700",
      locked: true
    },

    {
      title: "Documents",
      description:
        "Access newsletters, holiday projects and school documents.",
      icon: <FaFileAlt />,
      color: "bg-cyan-100 text-cyan-700",
      locked: true
    },

    {
      title: "Announcements",
      description:
        "Stay updated with important school announcements.",
      icon: <FaBullhorn />,
      color: "bg-pink-100 text-pink-700",
      locked: true
    }

  ];


  // ==========================================
  // OPEN FEATURE
  // ==========================================

  const handleFeatureClick = (feature) => {

    if (feature.title === "My Results") {

      navigate("/student-results");

      return;

    }

    alert(
      `${feature.title} will be available here soon.`
    );

  };


  return (

    <div className="min-h-screen bg-gray-100">

      {/* ========================================
          TOP NAVIGATION
      ======================================== */}

      <header className="bg-blue-900 text-white shadow-lg">

        <div className="max-w-7xl mx-auto px-5 py-4">

          <div className="flex items-center justify-between gap-4">

            {/* SCHOOL BRAND */}

            <div className="flex items-center gap-3">

              <img
                src="/Logo.png"
                alt="Grisfield Schools"
                className="w-12 h-12 rounded-full bg-white p-1 object-cover"
              />

              <div>

                <h1 className="text-lg md:text-xl font-bold">

                  GRISFIELD SCHOOLS

                </h1>

                <p className="text-xs md:text-sm text-blue-200">

                  Student Portal

                </p>

              </div>

            </div>


            {/* LOGOUT */}

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
            >

              <FaSignOutAlt />

              <span className="hidden sm:inline">

                Logout

              </span>

            </button>

          </div>

        </div>

      </header>


      {/* ========================================
          MAIN CONTENT
      ======================================== */}

      <main className="max-w-7xl mx-auto px-5 py-8">

        {/* ======================================
            WELCOME CARD
        ====================================== */}

        <section className="bg-white rounded-2xl shadow p-6 md:p-8 mb-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div className="flex items-center gap-5">

              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center shrink-0 border-4 border-blue-100">

                {
                    student?.passport
                    ? (

                        <img
                        src={`${SERVER_BASE_URL}/uploads/${student.passport}`}
                        alt={student.fullName || "Student"}
                        className="w-full h-full object-cover"
                        />

                    )
                    : (

                        <FaUserGraduate
                        size={32}
                        className="text-blue-700"
                        />

                    )
                }

                </div>

              <div>

                <p className="text-gray-500 text-sm">

                  Welcome back,

                </p>

                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">

                    {loadingStudent
                        ? "Loading..."
                        : student?.fullName || "Student"
                    }

                </h2>

                {
                    student?.regNumber && (

                        <p className="text-gray-500 mt-1">

                        {student.regNumber}

                        </p>

                    )
                }

                <p className="text-gray-500 mt-1">

                  Student Portal

                </p>

              </div>

            </div>


            <div className="bg-blue-50 rounded-xl px-5 py-4">

              <p className="text-xs uppercase tracking-wide text-blue-600 font-semibold">

                Account Status

              </p>

              <div className="flex items-center gap-2 mt-1">

                <span className="w-2.5 h-2.5 bg-green-500 rounded-full" />

                <span className="font-semibold text-green-700">

                  Active

                </span>

              </div>

            </div>

          </div>

        </section>


        {/* ======================================
            QUICK INTRO
        ====================================== */}

        <section className="mb-6">

          <h2 className="text-2xl font-bold text-gray-800">

            My School Portal

          </h2>

          <p className="text-gray-500 mt-1">

            Access your academic information and school services.

          </p>

        </section>


        {/* ======================================
            FEATURE CARDS
        ====================================== */}

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {
            features.map(
              (feature) => (

                <button
                  key={feature.title}
                  onClick={() =>
                    handleFeatureClick(
                      feature
                    )
                  }
                  className="bg-white rounded-2xl shadow hover:shadow-xl transition text-left p-6 group"
                >

                  {/* ICON */}

                  <div className="flex items-start justify-between">

                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center text-xl ${feature.color}`}
                    >

                      {feature.icon}

                    </div>


                    {
                      feature.locked && (

                        <div className="text-gray-400">

                          <FaLock />

                        </div>

                      )
                    }

                  </div>


                  {/* TEXT */}

                  <div className="mt-5">

                    <h3 className="text-xl font-bold text-gray-800">

                      {feature.title}

                    </h3>

                    <p className="text-gray-500 mt-2 leading-6">

                      {feature.description}

                    </p>

                  </div>


                  {/* ACTION */}

                  <div className="mt-5 flex items-center gap-2 text-blue-600 font-semibold">

                    {
                      feature.locked
                        ? "Coming Soon"
                        : "Open"
                    }

                    <FaChevronRight
                      className="group-hover:translate-x-1 transition"
                    />

                  </div>

                </button>

              )
            )
          }

        </section>


        {/* ======================================
            RESULTS SECURITY NOTICE
        ====================================== */}

        <section className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-6">

          <div className="flex gap-4">

            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">

              <FaLock />

            </div>

            <div>

              <h3 className="font-bold text-blue-900 text-lg">

                Results Security

              </h3>

              <p className="text-blue-800 mt-1 leading-6">

                Your academic results are only available after
                the result has been officially released through
                the school's result verification system.

              </p>

            </div>

          </div>

        </section>

      </main>

    </div>

  );

}


export default StudentPortal;