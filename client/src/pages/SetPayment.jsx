import {
  useEffect,
  useState,
} from "react";

import api from "../services/api";

import {
  useAuth,
} from "../context/AuthContext";

import {
  useNotification,
} from "../context/NotificationContext";

function SetPayment() {
  const { user } = useAuth();

  const {
    notify,
  } = useNotification();

  const [classes, setClasses] =
    useState([]);

  const [sessions, setSessions] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [students, setStudents] =
    useState([]);

  const [savingId, setSavingId] =
    useState(null);

  const [filters, setFilters] =
    useState({
      classId: "",
      sessionId: "",
      term: "",
    });

  // ======================================
  // LOCK TEACHER CLASS
  // ======================================

  useEffect(() => {
    if (
      user?.role === "teacher" &&
      user?.assignedClass
    ) {
      setFilters((prev) => ({
        ...prev,
        classId:
          user.assignedClass,
      }));
    }
  }, [user]);

  // ======================================
  // LOAD CLASSES
  // ======================================

  useEffect(() => {
    fetchClasses();
  }, []);

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

        notify(
          error.response?.data?.message ||
            "Failed to load classes.",
          "error"
        );
      }
    };

  // ======================================
  // LOAD SESSIONS
  // ======================================

  useEffect(() => {
    fetchSessions();
  }, []);

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

        notify(
          error.response?.data?.message ||
            "Failed to load sessions.",
          "error"
        );
      }
    };

  // ======================================
  // CHANGE FILTER
  // ======================================

  const handleFilterChange =
    (e) => {
      const {
        name,
        value,
      } = e.target;

      setFilters(
        (prev) => ({
          ...prev,
          [name]: value,
        })
      );

      if (
        name === "classId" ||
        name === "sessionId" ||
        name === "term"
      ) {
        setStudents([]);
      }
    };

  // ======================================
  // VALIDATE FILTERS
  // ======================================

  const validateFilters =
    () => {
      if (!filters.classId) {
        notify(
          "Please select a class.",
          "warning"
        );
        return false;
      }

      if (!filters.sessionId) {
        notify(
          "Please select a session.",
          "warning"
        );
        return false;
      }

      if (!filters.term) {
        notify(
          "Please select a term.",
          "warning"
        );
        return false;
      }

      return true;
    };

  // ======================================
  // LOAD PAYMENT PAGE
  // ======================================

  const loadPayments =
    async () => {
      if (!validateFilters()) {
        return;
      }

      try {
        setLoading(true);

        const res =
          await api.get(
            "/payments/load",
            {
              params: filters,
            }
          );

        setStudents(res.data);

        if (
          res.data.length === 0
        ) {
          notify(
            "No students were found for the selected class.",
            "warning"
          );
        } else {
          notify(
            `${res.data.length} student${
              res.data.length === 1
                ? ""
                : "s"
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

  // ======================================
  // UPDATE PAYMENT FIELD
  // ======================================

  const handlePaymentChange =
    (
      index,
      field,
      value
    ) => {
      if (
        value !== "" &&
        Number(value) < 0
      ) {
        notify(
          "Payment amount cannot be negative.",
          "warning"
        );
        return;
      }

      const updated =
        [...students];

      updated[index] = {
        ...updated[index],
        payment: {
          ...updated[index]
            .payment,
          [field]: value,
        },
      };

      setStudents(updated);
    };

  // ======================================
  // SAVE PAYMENT
  // ======================================

  const savePayment =
    async (studentData) => {
      if (!validateFilters()) {
        return;
      }

      if (!studentData?.student?.id) {
        notify(
          "Student information is missing.",
          "error"
        );
        return;
      }

      try {
        setSavingId(
          studentData.student.id
        );

        const payment =
          studentData.payment ||
          {};

        const admin =
          studentData.adminSetting ||
          {};

        const student =
          studentData.student;

        const payload = {
          studentId:
            student.id,

          classId:
            filters.classId,

          sessionId:
            filters.sessionId,

          term:
            filters.term,

          tuitionFee:
            admin.tuitionFee || 0,

          saturdayLesson:
            admin.saturdayLesson ||
            0,

          scratchCard:
            admin.scratchCard || 0,

          termlyActivities:
            admin.termlyActivities ||
            0,

          books:
            admin.books || 0,

          schoolBus:
            payment.schoolBus || 0,

          outstanding:
            payment.outstanding || 0,

          graduation:
            payment.graduation || 0,

          excursion:
            payment.excursion || 0,

          practicals:
            payment.practicals || 0,
        };

        const res =
          await api.post(
            "/payments/student",
            payload
          );

        notify(
          res.data.message ||
            `Payment saved successfully for ${student.fullName}.`,
          "success"
        );
      } catch (error) {
        console.log(error);

        notify(
          error.response?.data?.message ||
            "Failed to save payment.",
          "error"
        );
      } finally {
        setSavingId(null);
      }
    };

  // ======================================
  // CALCULATE TOTAL
  // ======================================

  const calculateTotal =
    (item) => {
      const admin =
        item.adminSetting ||
        {};

      const payment =
        item.payment || {};

      return (
        Number(
          admin.tuitionFee || 0
        ) +
        Number(
          admin.saturdayLesson ||
            0
        ) +
        Number(
          admin.scratchCard || 0
        ) +
        Number(
          admin.termlyActivities ||
            0
        ) +
        Number(
          admin.books || 0
        ) +
        Number(
          payment.schoolBus || 0
        ) +
        Number(
          payment.outstanding || 0
        ) +
        Number(
          payment.graduation || 0
        ) +
        Number(
          payment.excursion || 0
        ) +
        Number(
          payment.practicals || 0
        )
      );
    };

  return (
    <div className="p-4 sm:p-6">
      <div className="bg-white rounded-2xl shadow p-4 sm:p-6">

        {/* HEADER */}

        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Set Student Payments
          </h1>

          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Select a class, session and
            term to manage student
            payments.
          </p>
        </div>

        {/* FILTERS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">

          {/* CLASS */}

          <select
            name="classId"
            value={
              filters.classId
            }
            onChange={
              handleFilterChange
            }
            disabled={
              user?.role ===
                "teacher" ||
              loading
            }
            className={`border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              user?.role ===
              "teacher"
                ? "bg-gray-100 cursor-not-allowed"
                : ""
            }`}
          >
            <option value="">
              Select Class
            </option>

            {classes.map(
              (cls) => (
                <option
                  key={cls.id}
                  value={cls.id}
                >
                  {
                    cls.className
                  }
                </option>
              )
            )}
          </select>

          {/* SESSION */}

          <select
            name="sessionId"
            value={
              filters.sessionId
            }
            onChange={
              handleFilterChange
            }
            disabled={loading}
            className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          >
            <option value="">
              Select Session
            </option>

            {sessions.map(
              (session) => (
                <option
                  key={session.id}
                  value={
                    session.id
                  }
                >
                  {
                    session.sessionName
                  }
                </option>
              )
            )}
          </select>

          {/* TERM */}

          <select
            name="term"
            value={
              filters.term
            }
            onChange={
              handleFilterChange
            }
            disabled={loading}
            className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
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

          {/* LOAD */}

          <button
            onClick={
              loadPayments
            }
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-3 font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading
              ? "Loading..."
              : "Load Students"}
          </button>
        </div>

        {/* DESKTOP TABLE */}

        <div className="hidden md:block overflow-x-auto">

          <table className="w-full border-collapse text-sm">

            <thead>
              <tr className="bg-gray-100 text-left">

                <th className="p-3">
                  Student
                </th>

                <th className="p-3">
                  Tuition
                </th>

                <th className="p-3">
                  Saturday
                </th>

                <th className="p-3">
                  Scratch
                </th>

                <th className="p-3">
                  Activities
                </th>

                <th className="p-3">
                  Books
                </th>

                <th className="p-3">
                  Bus
                </th>

                <th className="p-3">
                  Outstanding
                </th>

                <th className="p-3">
                  Graduation
                </th>

                <th className="p-3">
                  Excursion
                </th>

                <th className="p-3">
                  Practicals
                </th>

                <th className="p-3">
                  Total
                </th>

                <th className="p-3">
                  Action
                </th>

              </tr>
            </thead>

            <tbody>
              {students.map(
                (item, index) => {
                  const admin =
                    item.adminSetting ||
                    {};

                  const payment =
                    item.payment ||
                    {};

                  const total =
                    calculateTotal(
                      item
                    );

                  return (
                    <tr
                      key={
                        item.student.id
                      }
                      className="border-b"
                    >

                      {/* STUDENT */}

                      <td className="p-3 font-medium whitespace-nowrap">
                        {
                          item.student
                            .fullName
                        }
                      </td>

                      {/* TUITION */}

                      <td className="p-3 whitespace-nowrap">
                        ₦
                        {Number(
                          admin.tuitionFee ||
                            0
                        ).toLocaleString()}
                      </td>

                      {/* SATURDAY */}

                      <td className="p-3 whitespace-nowrap">
                        ₦
                        {Number(
                          admin.saturdayLesson ||
                            0
                        ).toLocaleString()}
                      </td>

                      {/* SCRATCH */}

                      <td className="p-3 whitespace-nowrap">
                        ₦
                        {Number(
                          admin.scratchCard ||
                            0
                        ).toLocaleString()}
                      </td>

                      {/* ACTIVITIES */}

                      <td className="p-3 whitespace-nowrap">
                        ₦
                        {Number(
                          admin.termlyActivities ||
                            0
                        ).toLocaleString()}
                      </td>

                      {/* BOOKS */}

                      <td className="p-3 whitespace-nowrap">
                        ₦
                        {Number(
                          admin.books ||
                            0
                        ).toLocaleString()}
                      </td>

                      {/* BUS */}

                      <td className="p-3">
                        <input
                          type="number"
                          min="0"
                          value={
                            payment.schoolBus ||
                            ""
                          }
                          onChange={(e) =>
                            handlePaymentChange(
                              index,
                              "schoolBus",
                              e.target
                                .value
                            )
                          }
                          className="border rounded px-2 py-1 w-24"
                        />
                      </td>

                      {/* OUTSTANDING */}

                      <td className="p-3">
                        <input
                          type="number"
                          min="0"
                          value={
                            payment.outstanding ||
                            ""
                          }
                          onChange={(e) =>
                            handlePaymentChange(
                              index,
                              "outstanding",
                              e.target
                                .value
                            )
                          }
                          className="border rounded px-2 py-1 w-24"
                        />
                      </td>

                      {/* GRADUATION */}

                      <td className="p-3">
                        <input
                          type="number"
                          min="0"
                          value={
                            payment.graduation ||
                            ""
                          }
                          onChange={(e) =>
                            handlePaymentChange(
                              index,
                              "graduation",
                              e.target
                                .value
                            )
                          }
                          className="border rounded px-2 py-1 w-24"
                        />
                      </td>

                      {/* EXCURSION */}

                      <td className="p-3">
                        <input
                          type="number"
                          min="0"
                          value={
                            payment.excursion ||
                            ""
                          }
                          onChange={(e) =>
                            handlePaymentChange(
                              index,
                              "excursion",
                              e.target
                                .value
                            )
                          }
                          className="border rounded px-2 py-1 w-24"
                        />
                      </td>

                      {/* PRACTICALS */}

                      <td className="p-3">
                        <input
                          type="number"
                          min="0"
                          value={
                            payment.practicals ||
                            ""
                          }
                          onChange={(e) =>
                            handlePaymentChange(
                              index,
                              "practicals",
                              e.target
                                .value
                            )
                          }
                          className="border rounded px-2 py-1 w-24"
                        />
                      </td>

                      {/* TOTAL */}

                      <td className="p-3 font-bold whitespace-nowrap">
                        ₦
                        {total.toLocaleString()}
                      </td>

                      {/* SAVE */}

                      <td className="p-3">
                        <button
                          onClick={() =>
                            savePayment(
                              item
                            )
                          }
                          disabled={
                            savingId ===
                            item.student.id
                          }
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {savingId ===
                          item.student.id
                            ? "Saving..."
                            : "Save"}
                        </button>
                      </td>

                    </tr>
                  );
                }
              )}
            </tbody>

          </table>
        </div>

        {/* MOBILE CARDS */}

        <div className="md:hidden space-y-4">

          {students.map(
            (item, index) => {
              const admin =
                item.adminSetting ||
                {};

              const payment =
                item.payment ||
                {};

              const total =
                calculateTotal(
                  item
                );

              return (
                <div
                  key={
                    item.student.id
                  }
                  className="bg-white border rounded-xl p-4 shadow-sm"
                >

                  <h3 className="font-bold text-lg mb-4">
                    {
                      item.student
                        .fullName
                    }
                  </h3>

                  {/* FIXED FEES */}

                  <div className="space-y-2 mb-4 text-sm">

                    <div className="flex justify-between gap-4">
                      <span>
                        Tuition
                      </span>

                      <span className="font-medium">
                        ₦
                        {Number(
                          admin.tuitionFee ||
                            0
                        ).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span>
                        Saturday
                      </span>

                      <span className="font-medium">
                        ₦
                        {Number(
                          admin.saturdayLesson ||
                            0
                        ).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span>
                        Scratch Card
                      </span>

                      <span className="font-medium">
                        ₦
                        {Number(
                          admin.scratchCard ||
                            0
                        ).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span>
                        Activities
                      </span>

                      <span className="font-medium">
                        ₦
                        {Number(
                          admin.termlyActivities ||
                            0
                        ).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4">
                      <span>
                        Books
                      </span>

                      <span className="font-medium">
                        ₦
                        {Number(
                          admin.books ||
                            0
                        ).toLocaleString()}
                      </span>
                    </div>

                  </div>

                  {/* EXTRA PAYMENTS */}

                  <div className="grid grid-cols-2 gap-3">

                    <div>
                      <label className="text-sm block mb-1">
                        Bus
                      </label>

                      <input
                        type="number"
                        min="0"
                        value={
                          payment.schoolBus ||
                          ""
                        }
                        onChange={(e) =>
                          handlePaymentChange(
                            index,
                            "schoolBus",
                            e.target
                              .value
                          )
                        }
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>

                    <div>
                      <label className="text-sm block mb-1">
                        Outstanding
                      </label>

                      <input
                        type="number"
                        min="0"
                        value={
                          payment.outstanding ||
                          ""
                        }
                        onChange={(e) =>
                          handlePaymentChange(
                            index,
                            "outstanding",
                            e.target
                              .value
                          )
                        }
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>

                    <div>
                      <label className="text-sm block mb-1">
                        Graduation
                      </label>

                      <input
                        type="number"
                        min="0"
                        value={
                          payment.graduation ||
                          ""
                        }
                        onChange={(e) =>
                          handlePaymentChange(
                            index,
                            "graduation",
                            e.target
                              .value
                          )
                        }
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>

                    <div>
                      <label className="text-sm block mb-1">
                        Excursion
                      </label>

                      <input
                        type="number"
                        min="0"
                        value={
                          payment.excursion ||
                          ""
                        }
                        onChange={(e) =>
                          handlePaymentChange(
                            index,
                            "excursion",
                            e.target
                              .value
                          )
                        }
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="text-sm block mb-1">
                        Practicals
                      </label>

                      <input
                        type="number"
                        min="0"
                        value={
                          payment.practicals ||
                          ""
                        }
                        onChange={(e) =>
                          handlePaymentChange(
                            index,
                            "practicals",
                            e.target
                              .value
                          )
                        }
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>

                  </div>

                  {/* TOTAL */}

                  <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3 flex justify-between gap-4">

                    <span className="font-medium">
                      Total
                    </span>

                    <span className="font-bold text-green-700">
                      ₦
                      {total.toLocaleString()}
                    </span>

                  </div>

                  {/* SAVE */}

                  <button
                    onClick={() =>
                      savePayment(
                        item
                      )
                    }
                    disabled={
                      savingId ===
                      item.student.id
                    }
                    className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {savingId ===
                    item.student.id
                      ? "Saving..."
                      : "Save Payment"}
                  </button>

                </div>
              );
            }
          )}

        </div>

        {/* EMPTY STATE */}

        {students.length === 0 && (
          <div className="border border-dashed rounded-xl py-10 text-center text-gray-500 mt-2">
            Select a class, session and
            term, then load students to
            manage their payments.
          </div>
        )}

      </div>
    </div>
  );
}

export default SetPayment;