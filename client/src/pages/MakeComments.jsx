import { useEffect, useState } from "react";

import api from "../services/api";

import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";

function MakeComments() {
  const { user } = useAuth();
  const { notify } = useNotification();

  const [classes, setClasses] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState(null);

  const [filters, setFilters] = useState({
    classId: "",
    sessionId: "",
    term: "1st Term",
  });

  // LOAD DATA
  useEffect(() => {
    fetchClasses();
    fetchSessions();
    fetchTemplates();
  }, []);

  // LOCK CLASSES
  useEffect(() => {
    if (
      user?.role === "teacher" &&
      user?.assignedClass
    ) {
      setFilters((prev) => ({
        ...prev,
        classId: user.assignedClass,
      }));
    }
  }, [user]);

  // FETCH CLASSES
  const fetchClasses = async () => {
    try {
      const res = await api.get("/classes");
      setClasses(res.data);
    } catch (error) {
      console.log(error);

      notify(
        error.response?.data?.message ||
          "Failed to load classes.",
        "error"
      );
    }
  };

  // FETCH SESSIONS
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

  // FETCH COMMENT TEMPLATES
  const fetchTemplates = async () => {
    try {
      const res = await api.get("/comments/template");
      setTemplates(res.data);
    } catch (error) {
      console.log(error);

      notify(
        error.response?.data?.message ||
          "Failed to load comment templates.",
        "error"
      );
    }
  };

  // HANDLE FILTER CHANGE
  const handleFilterChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    // Clear previously loaded students
    setStudents([]);
  };

  // LOAD STUDENTS
  const loadStudents = async () => {
    if (!filters.classId) {
      notify("Please select a class.", "warning");
      return;
    }

    if (!filters.sessionId) {
      notify("Please select a session.", "warning");
      return;
    }

    if (!filters.term) {
      notify("Please select a term.", "warning");
      return;
    }

    try {
      setLoading(true);

      const res = await api.get("/comments/load", {
        params: filters,
      });

      const updated = res.data.map((item) => ({
        ...item,
        comment: {
          teacherComment:
            item.comment?.teacherComment || "",

          proprietorComment:
            item.comment?.proprietorComment || "",
        },
      }));

      setStudents(updated);

      if (updated.length === 0) {
        notify(
          "No students were found for the selected class, session and term.",
          "warning"
        );
      } else {
        notify(
          `${updated.length} student${
            updated.length === 1 ? "" : "s"
          } loaded successfully.`,
          "success"
        );
      }
    } catch (error) {
      console.log(error);

      notify(
        error.response?.data?.message ||
          "Failed to load students.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // HANDLE COMMENT CHANGE
  const handleCommentChange = (index, field, value) => {
    const updated = [...students];

    updated[index] = {
      ...updated[index],
      comment: {
        ...updated[index].comment,
        [field]: value,
      },
    };

    setStudents(updated);
  };

  // SAVE COMMENT
  const saveComment = async (item) => {
    if (!filters.classId) {
      notify("Please select a class.", "warning");
      return;
    }

    if (!filters.sessionId) {
      notify("Please select a session.", "warning");
      return;
    }

    if (!filters.term) {
      notify("Please select a term.", "warning");
      return;
    }

    if (!item?.student?.id) {
      notify(
        "Student information is missing. Please reload the students.",
        "error"
      );
      return;
    }

    const teacherComment =
      item.comment?.teacherComment?.trim() || "";

    const proprietorComment =
      item.comment?.proprietorComment?.trim() || "";

    if (!teacherComment && !proprietorComment) {
      notify(
        "Please enter at least one comment before saving.",
        "warning"
      );
      return;
    }

    try {
      setSavingId(item.student.id);

      const payload = {
        studentId: item.student.id,
        classId: filters.classId,
        sessionId: filters.sessionId,
        term: filters.term,
        teacherComment,
        proprietorComment,
      };

      const res = await api.post(
        "/comments/student",
        payload
      );

      notify(
        res.data.message ||
          "Comment saved successfully.",
        "success"
      );
    } catch (error) {
      console.log(error);

      notify(
        error.response?.data?.message ||
          "Save failed.",
        "error"
      );
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="bg-white rounded-2xl shadow p-4 sm:p-6">

        {/* PAGE TITLE */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">
          Make Comments
        </h1>

        {/* FILTERS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">

          {/* CLASS */}
          <select
            name="classId"
            value={filters.classId}
            onChange={handleFilterChange}
            disabled={user?.role === "teacher"}
            className={`border rounded-lg px-4 py-3 w-full ${
              user?.role === "teacher"
                ? "bg-gray-100 cursor-not-allowed"
                : ""
            }`}
          >
            <option value="">
              Select Class
            </option>

            {classes.map((cls) => (
              <option
                key={cls.id}
                value={cls.id}
              >
                {cls.className}
              </option>
            ))}
          </select>

          {/* SESSION */}
          <select
            name="sessionId"
            value={filters.sessionId}
            onChange={handleFilterChange}
            className="border rounded-lg px-4 py-3 w-full"
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

          {/* TERM */}
          <select
            name="term"
            value={filters.term}
            onChange={handleFilterChange}
            className="border rounded-lg px-4 py-3 w-full"
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

          {/* LOAD BUTTON */}
          <button
            onClick={loadStudents}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-3 w-full font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading
              ? "Loading..."
              : "Load Students"}
          </button>
        </div>

        {/* ================================================= */}
        {/* DESKTOP TABLE */}
        {/* ================================================= */}

        {students.length > 0 && (
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse">

              <thead>
                <tr className="bg-gray-100">

                  <th className="p-3 text-left">
                    Student Name
                  </th>

                  <th className="p-3 text-left">
                    Average
                  </th>

                  <th className="p-3 text-left">
                    Teacher Comment
                  </th>

                  <th className="p-3 text-left">
                    Proprietor Comment
                  </th>

                  <th className="p-3 text-left">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody>
                {students.map((item, index) => (
                  <tr
                    key={item.student.id}
                    className="border-b align-top"
                  >

                    {/* NAME */}
                    <td className="p-3 font-medium">
                      {item.student.fullName}
                    </td>

                    {/* AVERAGE */}
                    <td className="p-3 font-bold">
                      {item.average}
                    </td>

                    {/* TEACHER COMMENT */}
                    <td className="p-3 min-w-[240px]">

                      <select
                        value={
                          item.comment.teacherComment
                        }
                        onChange={(e) =>
                          handleCommentChange(
                            index,
                            "teacherComment",
                            e.target.value
                          )
                        }
                        className="border rounded-lg px-3 py-2 w-full mb-2"
                      >
                        <option value="">
                          Select Comment
                        </option>

                        {templates.map((template) => (
                          <option
                            key={template.id}
                            value={template.comment}
                          >
                            {template.comment}
                          </option>
                        ))}
                      </select>

                      <textarea
                        value={
                          item.comment.teacherComment
                        }
                        onChange={(e) =>
                          handleCommentChange(
                            index,
                            "teacherComment",
                            e.target.value
                          )
                        }
                        placeholder="Or type custom comment"
                        rows="3"
                        className="border rounded-lg px-3 py-2 w-full resize-y"
                      />
                    </td>

                    {/* PROPRIETOR COMMENT */}
                    <td className="p-3 min-w-[240px]">

                      <select
                        value={
                          item.comment.proprietorComment
                        }
                        onChange={(e) =>
                          handleCommentChange(
                            index,
                            "proprietorComment",
                            e.target.value
                          )
                        }
                        className="border rounded-lg px-3 py-2 w-full mb-2"
                      >
                        <option value="">
                          Select Comment
                        </option>

                        {templates.map((template) => (
                          <option
                            key={template.id}
                            value={template.comment}
                          >
                            {template.comment}
                          </option>
                        ))}
                      </select>

                      <textarea
                        value={
                          item.comment.proprietorComment
                        }
                        onChange={(e) =>
                          handleCommentChange(
                            index,
                            "proprietorComment",
                            e.target.value
                          )
                        }
                        placeholder="Or type custom comment"
                        rows="3"
                        className="border rounded-lg px-3 py-2 w-full resize-y"
                      />
                    </td>

                    {/* SAVE */}
                    <td className="p-3">
                      <button
                        onClick={() =>
                          saveComment(item)
                        }
                        disabled={
                          savingId === item.student.id
                        }
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
                      >
                        {savingId === item.student.id
                          ? "Saving..."
                          : "Save"}
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}

        {/* ================================================= */}
        {/* MOBILE STUDENT CARDS */}
        {/* ================================================= */}

        {students.length > 0 && (
          <div className="md:hidden space-y-5">

            {students.map((item, index) => (
              <div
                key={item.student.id}
                className="border border-slate-200 rounded-2xl bg-slate-50 shadow-sm overflow-hidden"
              >

                {/* CARD HEADER */}
                <div className="bg-gradient-to-r from-purple-700 to-indigo-600 text-white px-4 py-4">
                  <div className="flex items-center justify-between gap-3">

                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wider text-purple-200 font-medium">
                        Student
                      </p>

                      <h2 className="text-lg font-bold break-words">
                        {item.student.fullName}
                      </h2>
                    </div>

                    <div className="flex-shrink-0 text-right">
                      <p className="text-xs text-purple-200">
                        Average
                      </p>

                      <p className="text-2xl font-bold">
                        {item.average}
                      </p>
                    </div>

                  </div>
                </div>

                {/* CARD CONTENT */}
                <div className="p-4 space-y-5">

                  {/* TEACHER COMMENT */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Teacher's Comment
                    </label>

                    <select
                      value={
                        item.comment.teacherComment
                      }
                      onChange={(e) =>
                        handleCommentChange(
                          index,
                          "teacherComment",
                          e.target.value
                        )
                      }
                      className="border border-slate-200 rounded-xl px-3 py-3 w-full bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">
                        Select Comment
                      </option>

                      {templates.map((template) => (
                        <option
                          key={template.id}
                          value={template.comment}
                        >
                          {template.comment}
                        </option>
                      ))}
                    </select>

                    <textarea
                      value={
                        item.comment.teacherComment
                      }
                      onChange={(e) =>
                        handleCommentChange(
                          index,
                          "teacherComment",
                          e.target.value
                        )
                      }
                      placeholder="Or type a custom teacher comment..."
                      rows="4"
                      className="mt-2 border border-slate-200 rounded-xl px-3 py-3 w-full bg-white resize-y focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  {/* PROPRIETOR COMMENT */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Proprietor's Comment
                    </label>

                    <select
                      value={
                        item.comment.proprietorComment
                      }
                      onChange={(e) =>
                        handleCommentChange(
                          index,
                          "proprietorComment",
                          e.target.value
                        )
                      }
                      className="border border-slate-200 rounded-xl px-3 py-3 w-full bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">
                        Select Comment
                      </option>

                      {templates.map((template) => (
                        <option
                          key={template.id}
                          value={template.comment}
                        >
                          {template.comment}
                        </option>
                      ))}
                    </select>

                    <textarea
                      value={
                        item.comment.proprietorComment
                      }
                      onChange={(e) =>
                        handleCommentChange(
                          index,
                          "proprietorComment",
                          e.target.value
                        )
                      }
                      placeholder="Or type a custom proprietor comment..."
                      rows="4"
                      className="mt-2 border border-slate-200 rounded-xl px-3 py-3 w-full bg-white resize-y focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  {/* SAVE BUTTON */}
                  <button
                    onClick={() =>
                      saveComment(item)
                    }
                    disabled={
                      savingId === item.student.id
                    }
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-xl font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {savingId === item.student.id
                      ? "Saving Comment..."
                      : "Save Comment"}
                  </button>

                </div>
              </div>
            ))}

          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && students.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            Select a class, session and term, then click{" "}
            <span className="font-semibold">
              Load Students
            </span>{" "}
            to begin entering comments.
          </div>
        )}

      </div>
    </div>
  );
}

export default MakeComments;