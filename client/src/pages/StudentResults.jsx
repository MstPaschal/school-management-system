import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaChevronRight,
  FaGraduationCap,
  FaSpinner
} from "react-icons/fa";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const StudentResults = () => {
  const { user } = useAuth();

  const [student, setStudent] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadResults = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await api.get("/students/my-results");

        setStudent(res.data.student);
        setResults(res.data.results || []);
      } catch (err) {
        console.error("STUDENT RESULTS ERROR:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load your released results."
        );
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadResults();
    }
  }, [user]);

  const handleViewResult = (accessId) => {
    window.open(
      `/student-results/${accessId}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase">
                Grisfield Schools
              </p>

              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                My Results
              </h1>
            </div>

            <button
              onClick={() =>
                window.location.href = "/student-portal"
              }
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 transition"
            >
              <FaArrowLeft size={13} />
              <span className="hidden sm:inline">
                Back to Portal
              </span>
              <span className="sm:hidden">
                Back
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* STUDENT INFO */}
        {student && (
          <section className="bg-gradient-to-r from-blue-700 to-indigo-700 rounded-2xl p-6 sm:p-8 text-white shadow-lg mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
                <FaGraduationCap size={27} />
              </div>

              <div>
                <p className="text-blue-100 text-sm">
                  Student
                </p>

                <h2 className="text-xl sm:text-2xl font-bold">
                  {student.fullName}
                </h2>

                <p className="text-blue-100 text-sm mt-1">
                  {student.regNumber}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* TITLE */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Released Results
          </h2>

          <p className="text-slate-500 mt-1">
            Results that have been officially released to
            your student portal will appear here.
          </p>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 flex flex-col items-center justify-center">
            <FaSpinner
              className="animate-spin text-blue-600 mb-4"
              size={28}
            />

            <p className="text-slate-500">
              Loading your results...
            </p>
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
            <p className="text-red-700 font-medium">
              {error}
            </p>
          </div>
        )}

        {/* NO RESULTS */}
        {!loading &&
          !error &&
          results.length === 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                <FaGraduationCap size={28} />
              </div>

              <h3 className="text-lg font-bold text-slate-900">
                No released results yet
              </h3>

              <p className="text-slate-500 mt-2 max-w-md mx-auto">
                Your results will appear here once they
                have been officially released.
              </p>
            </div>
          )}

        {/* RESULTS */}
        {!loading &&
          !error &&
          results.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {results.map((result) => (
                <article
                  key={result.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                        <FaCalendarAlt size={11} />
                        {result.term}
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 mt-4">
                        {result.sessionName}
                      </h3>

                      <p className="text-slate-500 text-sm mt-1">
                        {result.className}
                      </p>
                    </div>

                    <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                      <FaGraduationCap size={19} />
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wide">
                        Release Status
                      </p>

                      <p className="text-sm font-semibold text-emerald-600 mt-1">
                        Released
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        handleViewResult(result.id)
                      }
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
                    >
                      View Result
                      <FaChevronRight size={12} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
      </main>
    </div>
  );
};

export default StudentResults;