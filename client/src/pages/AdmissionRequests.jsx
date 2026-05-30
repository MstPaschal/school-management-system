import { useEffect, useState } from "react";
import api from "../services/api";

function AdmissionRequests() {
  const [applications, setApplications] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showSchedule, setShowSchedule] = useState(false);
  const [examDate, setExamDate] = useState("");
  const [examTime, setExamTime] = useState("");

  // =========================
  // FILTER STATE (NEW)
  // =========================
  const [activeTab, setActiveTab] = useState("PENDING");

  // =========================
  // LOAD APPLICATIONS
  // =========================
  const loadApplications = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admissions");
      setApplications(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  // =========================
  // TAB COUNTS
  // =========================
  const counts = {
    ALL: applications.length,
    PENDING: applications.filter((a) => a.status === "PENDING").length,
    ACCEPTED: applications.filter((a) => a.status === "ACCEPTED").length,
    REJECTED: applications.filter((a) => a.status === "REJECTED").length,
  };

  // =========================
  // FILTERED DATA
  // =========================
  const filteredApplications =
    activeTab === "ALL"
      ? applications
      : applications.filter((app) => app.status === activeTab);

  // =========================
  // PENDING ONLY (FOR BULK)
  // =========================
  const pendingApps = applications.filter(
    (app) => app.status === "PENDING"
  );

  const isAllSelected =
    pendingApps.length > 0 &&
    selectedIds.length === pendingApps.length;

  // =========================
  // SELECT SINGLE
  // =========================
  const toggleSelect = (id, status) => {
    if (status !== "PENDING") return;

    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  // =========================
  // SELECT ALL
  // =========================
  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(pendingApps.map((a) => a.id));
    }
  };

  // =========================
  // BULK ACCEPT
  // =========================
  const handleBulkAccept = () => {
    if (selectedIds.length === 0) {
      return alert("Select at least one student");
    }
    setShowSchedule(true);
  };

  // =========================
  // SEND INVITATION
  // =========================
  const handleSendInvitation = async () => {
    if (!examDate || !examTime) {
      return alert("Please select date and time");
    }

    try {
      const res = await api.put("/admissions/bulk-accept", {
        ids: selectedIds,
        examDate,
        examTime,
      });

      alert(res.data.message);

      setSelectedIds([]);
      setExamDate("");
      setExamTime("");
      setShowSchedule(false);

      loadApplications();
    } catch (error) {
      console.log(error);
      alert("Failed to send invitations");
    }
  };

  // =========================
  // REJECT SINGLE
  // =========================
  const handleReject = async (id) => {
    const confirmReject = window.confirm("Reject this application?");
    if (!confirmReject) return;

    try {
      const res = await api.put(`/admissions/reject/${id}`);
      alert(res.data.message);
      loadApplications();
    } catch (error) {
      console.log(error);
      alert("Failed to reject application");
    }
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl shadow p-6">
        <h1 className="text-3xl font-bold mb-6">
          Admission Requests
        </h1>

        {/* ================= TABS (NEW GMAIL STYLE) ================= */}
        <div className="flex gap-6 border-b mb-6 relative">
          {["ALL", "PENDING", "ACCEPTED", "REJECTED"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSelectedIds([]);
              }}
              className={`pb-3 relative font-medium transition ${
                activeTab === tab
                  ? "text-blue-600"
                  : "text-gray-500"
              }`}
            >
              {tab} ({counts[tab]})

              {/* Animated underline */}
              {activeTab === tab && (
                <span className="absolute left-0 bottom-0 w-full h-[3px] bg-blue-600 rounded-full transition-all duration-300" />
              )}
            </button>
          ))}
        </div>

        {/* ================= TOP ACTIONS ================= */}
        <div className="flex gap-4 mb-4">
          <button
            onClick={handleBulkAccept}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Accept Students
          </button>
        </div>

        {/* ================= SCHEDULE FORM ================= */}
        {showSchedule && (
          <div className="mb-6 p-4 border rounded-lg bg-gray-50">
            <div className="flex gap-4">
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="border px-3 py-2 rounded-lg"
              />

              <input
                type="time"
                value={examTime}
                onChange={(e) => setExamTime(e.target.value)}
                className="border px-3 py-2 rounded-lg"
              />

              <button
                onClick={handleSendInvitation}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Send Invitations
              </button>
            </div>
          </div>
        )}

        {/* ================= TABLE ================= */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={toggleSelectAll}
                      disabled={activeTab !== "PENDING"}
                    />
                  </th>
                  <th className="p-3 text-left">Student</th>
                  <th className="p-3 text-left">Parent</th>
                  <th className="p-3 text-left">Phone</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Level</th>
                  <th className="p-3 text-left">Class</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredApplications.map((app) => {
                  const disabled = app.status !== "PENDING";

                  return (
                    <tr
                      key={app.id}
                      className={`border-b ${
                        disabled ? "opacity-50 bg-gray-50" : ""
                      }`}
                    >
                      {/* CHECKBOX */}
                      <td className="p-3">
                        <input
                          type="checkbox"
                          disabled={disabled}
                          checked={selectedIds.includes(app.id)}
                          onChange={() =>
                            toggleSelect(app.id, app.status)
                          }
                        />
                      </td>

                      <td className="p-3">{app.studentName}</td>
                      <td className="p-3">{app.parentName}</td>
                      <td className="p-3">{app.phone}</td>
                      <td className="p-3">{app.email}</td>
                      <td className="p-3">{app.level}</td>
                      <td className="p-3">{app.className}</td>

                      {/* STATUS */}
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold
                            ${
                              app.status === "PENDING"
                                ? "bg-yellow-100 text-yellow-700"
                                : app.status === "ACCEPTED"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                        >
                          {app.status}
                        </span>
                      </td>

                      {/* ACTION */}
                      <td className="p-3">
                        {app.status === "PENDING" && (
                          <button
                            onClick={() => handleReject(app.id)}
                            className="bg-red-600 text-white px-3 py-1 rounded-lg"
                          >
                            Reject
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdmissionRequests;