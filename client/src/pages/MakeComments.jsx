import {
  useEffect,
  useState
} from "react";

import api from "../services/api";

import {
  useAuth
} from "../context/AuthContext";


function MakeComments() {

  const { user } = useAuth();

  const [classes, setClasses] =
    useState([]);

  const [sessions, setSessions] =
    useState([]);

  const [templates, setTemplates] =
    useState([]);

  const [students, setStudents] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [filters, setFilters] =
    useState({

      classId: "",

      sessionId: "",

      term: "1st Term"

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

        classId: user.assignedClass

      }));

    }

  }, [user]);


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


  // FETCH SESSIONS
  const fetchSessions =
    async () => {

      try {

        const res =
          await api.get(
            "/sessions"
          );

        setSessions(res.data);

      } catch (error) {

        console.log(error);

      }

    };


  // FETCH COMMENT TEMPLATES
  const fetchTemplates =
    async () => {

      try {

        const res =
          await api.get(
            "/comments/template"
          );

        setTemplates(res.data);

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


  // LOAD STUDENTS
  const loadStudents =
    async () => {

      try {

        setLoading(true);

        const res =
          await api.get(

            "/comments/load",

            {

              params: filters

            }

          );


        const updated =
          res.data.map((item) => ({

            ...item,

            comment: {

              teacherComment:
                item.comment?.teacherComment || "",

              proprietorComment:
                item.comment?.proprietorComment || ""

            }

          }));


        setStudents(updated);

      } catch (error) {

        console.log(error);

        alert(

          error.response?.data?.message ||

          "Failed to load students"

        );

      } finally {

        setLoading(false);

      }

    };


  // HANDLE COMMENT CHANGE
  const handleCommentChange =
    (index, field, value) => {

      const updated =
        [...students];

      updated[index].comment[field] =
        value;

      setStudents(updated);

    };


  // SAVE COMMENT
  const saveComment =
    async (item) => {

      try {

        setSaving(true);

        const payload = {

          studentId:
            item.student.id,

          classId:
            filters.classId,

          sessionId:
            filters.sessionId,

          term:
            filters.term,

          teacherComment:
            item.comment.teacherComment,

          proprietorComment:
            item.comment.proprietorComment

        };


        const res =
          await api.post(

            "/comments/student",

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

        setSaving(false);

      }

    };


  return (

    <div className="p-6">

      <div className="bg-white rounded-2xl shadow p-6">

        <h1 className="text-3xl font-bold mb-6">

          Make Comments

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


          {/* LOAD BUTTON */}
          <button
            onClick={loadStudents}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-3"
          >

            {
              loading
                ? "Loading..."
                : "Load Students"
            }

          </button>

        </div>


        {/* STUDENTS TABLE */}
        <div className="overflow-x-auto">

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

              {
                students.map((item, index) => (

                  <tr
                    key={item.student.id}
                    className="border-b align-top"
                  >

                    {/* NAME */}
                    <td className="p-3">

                      {
                        item.student.fullName
                      }

                    </td>


                    {/* AVERAGE */}
                    <td className="p-3 font-bold">

                      {
                        item.average
                      }

                    </td>


                    {/* TEACHER COMMENT */}
                    <td className="p-3">

                      {/* DROPDOWN */}
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

                        {
                          templates.map((template) => (

                            <option
                              key={template.id}
                              value={template.comment}
                            >

                              {template.comment}

                            </option>

                          ))
                        }

                      </select>


                      {/* CUSTOM COMMENT */}
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
                        className="border rounded-lg px-3 py-2 w-full"
                      />

                    </td>


                    {/* PROPRIETOR COMMENT */}
                    <td className="p-3">

                      {/* DROPDOWN */}
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

                        {
                          templates.map((template) => (

                            <option
                              key={template.id}
                              value={template.comment}
                            >

                              {template.comment}

                            </option>

                          ))
                        }

                      </select>


                      {/* CUSTOM COMMENT */}
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
                        className="border rounded-lg px-3 py-2 w-full"
                      />

                    </td>


                    {/* SAVE */}
                    <td className="p-3">

                      <button
                        onClick={() =>
                          saveComment(item)
                        }
                        disabled={saving}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                      >

                        {
                          saving
                            ? "Saving..."
                            : "Save"
                        }

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

export default MakeComments;