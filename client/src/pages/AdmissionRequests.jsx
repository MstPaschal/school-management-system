import {
  useEffect,
  useState
} from "react";

import api from "../services/api";

function AdmissionRequests() {

  const [applications, setApplications] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [selectedId, setSelectedId] =
    useState(null);

  const [examDate, setExamDate] =
    useState("");

  const [examTime, setExamTime] =
    useState("");


  // LOAD APPLICATIONS
  const loadApplications =
    async () => {

      try {

        setLoading(true);

        const res =
          await api.get(
            "/admissions"
          );

        setApplications(
          res.data
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed to load applications"
        );

      } finally {

        setLoading(false);

      }

    };


  useEffect(() => {

    loadApplications();

  }, []);


  // ACCEPT APPLICATION
  const handleAccept =
    async (id) => {

      if (
        !examDate ||
        !examTime
      ) {

        return alert(
          "Please enter exam date and time"
        );

      }

      try {

        const res =
          await api.put(
            `/admissions/accept/${id}`,
            {
              examDate,
              examTime
            }
          );

        alert(
          res.data.message
        );

        setSelectedId(null);

        setExamDate("");

        setExamTime("");

        loadApplications();

      } catch (error) {

        console.log(error);

        alert(
          "Failed to accept application"
        );

      }

    };


  // REJECT APPLICATION
  const handleReject =
    async (id) => {

      const confirmReject =
        window.confirm(
          "Reject this application?"
        );

      if (!confirmReject) {

        return;

      }

      try {

        const res =
          await api.put(
            `/admissions/reject/${id}`
          );

        alert(
          res.data.message
        );

        loadApplications();

      } catch (error) {

        console.log(error);

        alert(
          "Failed to reject application"
        );

      }

    };


  return (

    <div className="p-6">

      <div className="bg-white rounded-2xl shadow p-6">

        <h1 className="text-3xl font-bold mb-6">

          Admission Requests

        </h1>


        {
          loading ? (

            <p>
              Loading...
            </p>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full border-collapse">

                <thead>

                  <tr className="bg-gray-100">

                    <th className="p-3 text-left">
                      Student
                    </th>

                    <th className="p-3 text-left">
                      Parent
                    </th>

                    <th className="p-3 text-left">
                      Phone
                    </th>

                    <th className="p-3 text-left">
                      Email
                    </th>

                    <th className="p-3 text-left">
                      Level
                    </th>

                    <th className="p-3 text-left">
                      Class
                    </th>

                    <th className="p-3 text-left">
                      Status
                    </th>

                    <th className="p-3 text-left">
                      Action
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {
                    applications.map(
                      (app) => (

                        <tr
                          key={app.id}
                          className="border-b"
                        >

                          <td className="p-3">
                            {app.studentName}
                          </td>

                          <td className="p-3">
                            {app.parentName}
                          </td>

                          <td className="p-3">
                            {app.phone}
                          </td>

                          <td className="p-3">
                            {app.email}
                          </td>

                          <td className="p-3">
                            {app.level}
                          </td>

                          <td className="p-3">
                            {app.className}
                          </td>

                          <td className="p-3">

                            <span
                              className={`px-3 py-1 rounded-full text-sm font-semibold
                              ${
                                app.status ===
                                "PENDING"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : app.status ===
                                    "ACCEPTED"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >

                              {app.status}

                            </span>

                          </td>

                          <td className="p-3">

                            {
                              app.status ===
                                "PENDING" && (

                                <div className="space-y-3">

                                  <button
                                    onClick={() =>
                                      setSelectedId(
                                        app.id
                                      )
                                    }
                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg mr-2"
                                  >

                                    Accept

                                  </button>

                                  <button
                                    onClick={() =>
                                      handleReject(
                                        app.id
                                      )
                                    }
                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                                  >

                                    Reject

                                  </button>


                                  {
                                    selectedId ===
                                      app.id && (

                                      <div className="mt-4 space-y-3">

                                        <input
                                          type="date"
                                          value={examDate}
                                          onChange={(e) =>
                                            setExamDate(
                                              e.target.value
                                            )
                                          }
                                          className="border px-4 py-2 rounded-lg w-full"
                                        />

                                        <input
                                          type="time"
                                          value={examTime}
                                          onChange={(e) =>
                                            setExamTime(
                                              e.target.value
                                            )
                                          }
                                          className="border px-4 py-2 rounded-lg w-full"
                                        />

                                        <button
                                          onClick={() =>
                                            handleAccept(
                                              app.id
                                            )
                                          }
                                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                                        >

                                          Send Invitation

                                        </button>

                                      </div>

                                    )
                                  }

                                </div>

                              )
                            }

                          </td>

                        </tr>

                      )
                    )
                  }

                </tbody>

              </table>

            </div>

          )
        }

      </div>

    </div>

  );

}

export default AdmissionRequests;