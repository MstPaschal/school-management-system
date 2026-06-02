import {

  useEffect,

  useState

} from "react";

import api from "../services/api";

import {
  useAuth
} from "../context/AuthContext";


function SetPayment() {

  const { user } = useAuth();

  const [classes, setClasses] =
    useState([]);

  const [sessions, setSessions] =
  useState([]);

  const [loading, setLoading] =
    useState(false);

  const [students, setStudents] =
    useState([]);


  const [filters, setFilters] =
    useState({

      classId: "",

      sessionId: "",

      term: "1st Term"

    });


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


  // LOAD CLASSES
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

      }

    };

  // LOAD SESSION
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

    }

    };
  // CHANGE FILTER
  const handleFilterChange =
    (e) => {

      setFilters({

        ...filters,

        [e.target.name]:
          e.target.value

      });

    };


  // LOAD PAYMENT PAGE
  const loadPayments =
    async () => {

      try {

        setLoading(true);

        const res =
          await api.get(

            "/payments/load",

            {

              params: filters

            }

          );

        setStudents(res.data);

      } catch (error) {

        console.log(error);

        alert(

          error.response?.data?.message ||

          "Failed to load"

        );

      } finally {

        setLoading(false);

      }

    };


  // UPDATE FIELD
  const handlePaymentChange =
    (index, field, value) => {

      const updated =
        [...students];


      updated[index].payment = {

        ...updated[index].payment,

        [field]: value

      };


      setStudents(updated);

    };


  // SAVE PAYMENT
  const savePayment =
    async (studentData) => {

      try {

        const payment =
          studentData.payment || {};

        const admin =
          studentData.adminSetting || {};

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
            admin.saturdayLesson || 0,

          scratchCard:
            admin.scratchCard || 0,

          termlyActivities:
            admin.termlyActivities || 0,

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
            payment.practicals || 0

        };


        const res =
          await api.post(

            "/payments/student",

            payload

          );

        alert(
          res.data.message
        );

      } catch (error) {

        console.log(error);

        alert(

          error.response?.data?.message ||

          "Save failed"

        );

      }

    };


  return (

    <div className="p-6">

      <div className="bg-white rounded-2xl shadow p-6">

        <h1 className="text-3xl font-bold mb-6">

          Set Student Payments

        </h1>


        {/* FILTERS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

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
            onClick={loadPayments}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-3"
          >

            {
              loading
                ? "Loading..."
                : "Load Students"
            }

          </button>

        </div>


        {/* TABLE DESKTOP */}
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

              {
                students.map((item, index) => {

                  const admin =
                    item.adminSetting || {};

                  const payment =
                    item.payment || {};

                  const total =

                    Number(admin.tuitionFee || 0) +

                    Number(admin.saturdayLesson || 0) +

                    Number(admin.scratchCard || 0) +

                    Number(admin.termlyActivities || 0) +

                    Number(admin.books || 0) +

                    Number(payment.schoolBus || 0) +

                    Number(payment.outstanding || 0) +

                    Number(payment.graduation || 0) +

                    Number(payment.excursion || 0) +

                    Number(payment.practicals || 0);

                  return (

                    <tr
                      key={item.student.id}
                      className="border-b"
                    >

                      {/* STUDENT */}
                      <td className="p-3 font-medium whitespace-nowrap">

                        {item.student.fullName}

                      </td>

                      {/* TUITION */}
                      <td className="p-3 whitespace-nowrap">

                        ₦
                        {
                          Number(
                            admin.tuitionFee || 0
                          ).toLocaleString()
                        }

                      </td>

                      {/* SATURDAY */}
                      <td className="p-3 whitespace-nowrap">

                        ₦
                        {
                          Number(
                            admin.saturdayLesson || 0
                          ).toLocaleString()
                        }

                      </td>

                      {/* SCRATCH */}
                      <td className="p-3 whitespace-nowrap">

                        ₦
                        {
                          Number(
                            admin.scratchCard || 0
                          ).toLocaleString()
                        }

                      </td>

                      {/* ACTIVITIES */}
                      <td className="p-3 whitespace-nowrap">

                        ₦
                        {
                          Number(
                            admin.termlyActivities || 0
                          ).toLocaleString()
                        }

                      </td>

                      {/* BOOKS */}
                      <td className="p-3 whitespace-nowrap">

                        ₦
                        {
                          Number(
                            admin.books || 0
                          ).toLocaleString()
                        }

                      </td>

                      {/* BUS */}
                      <td className="p-3">

                        <input
                          type="number"
                          value={
                            payment.schoolBus || ""
                          }
                          onChange={(e) =>
                            handlePaymentChange(
                              index,
                              "schoolBus",
                              e.target.value
                            )
                          }
                          className="border rounded px-2 py-1 w-24"
                        />

                      </td>

                      {/* OUTSTANDING */}
                      <td className="p-3">

                        <input
                          type="number"
                          value={
                            payment.outstanding || ""
                          }
                          onChange={(e) =>
                            handlePaymentChange(
                              index,
                              "outstanding",
                              e.target.value
                            )
                          }
                          className="border rounded px-2 py-1 w-24"
                        />

                      </td>

                      {/* GRADUATION */}
                      <td className="p-3">

                        <input
                          type="number"
                          value={
                            payment.graduation || ""
                          }
                          onChange={(e) =>
                            handlePaymentChange(
                              index,
                              "graduation",
                              e.target.value
                            )
                          }
                          className="border rounded px-2 py-1 w-24"
                        />

                      </td>

                      {/* EXCURSION */}
                      <td className="p-3">

                        <input
                          type="number"
                          value={
                            payment.excursion || ""
                          }
                          onChange={(e) =>
                            handlePaymentChange(
                              index,
                              "excursion",
                              e.target.value
                            )
                          }
                          className="border rounded px-2 py-1 w-24"
                        />

                      </td>

                      {/* PRACTICALS */}
                      <td className="p-3">

                        <input
                          type="number"
                          value={
                            payment.practicals || ""
                          }
                          onChange={(e) =>
                            handlePaymentChange(
                              index,
                              "practicals",
                              e.target.value
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
                            savePayment(item)
                          }
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                        >

                          Save

                        </button>

                      </td>

                    </tr>

                  );

                })
              }

            </tbody>

          </table>

        </div>


        {/* MOBILE CARDS */}
        <div className="md:hidden space-y-4">

          {
            students.map((item, index) => {

              const admin =
                item.adminSetting || {};

              const payment =
                item.payment || {};

              const total =

                Number(admin.tuitionFee || 0) +

                Number(admin.saturdayLesson || 0) +

                Number(admin.scratchCard || 0) +

                Number(admin.termlyActivities || 0) +

                Number(admin.books || 0) +

                Number(payment.schoolBus || 0) +

                Number(payment.outstanding || 0) +

                Number(payment.graduation || 0) +

                Number(payment.excursion || 0) +

                Number(payment.practicals || 0);

              return (

                <div
                  key={item.student.id}
                  className="bg-white border rounded-xl p-4 shadow-sm"
                >

                  <h3 className="font-bold text-lg mb-4">

                    {item.student.fullName}

                  </h3>

                  {/* FIXED FEES */}
                  <div className="space-y-2 mb-4 text-sm">

                    <div className="flex justify-between">

                      <span>
                        Tuition
                      </span>

                      <span className="font-medium">

                        ₦
                        {Number(
                          admin.tuitionFee || 0
                        ).toLocaleString()}

                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span>
                        Saturday
                      </span>

                      <span className="font-medium">

                        ₦
                        {Number(
                          admin.saturdayLesson || 0
                        ).toLocaleString()}

                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span>
                        Scratch Card
                      </span>

                      <span className="font-medium">

                        ₦
                        {Number(
                          admin.scratchCard || 0
                        ).toLocaleString()}

                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span>
                        Activities
                      </span>

                      <span className="font-medium">

                        ₦
                        {Number(
                          admin.termlyActivities || 0
                        ).toLocaleString()}

                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span>
                        Books
                      </span>

                      <span className="font-medium">

                        ₦
                        {Number(
                          admin.books || 0
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
                        value={
                          payment.schoolBus || ""
                        }
                        onChange={(e) =>
                          handlePaymentChange(
                            index,
                            "schoolBus",
                            e.target.value
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
                        value={
                          payment.outstanding || ""
                        }
                        onChange={(e) =>
                          handlePaymentChange(
                            index,
                            "outstanding",
                            e.target.value
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
                        value={
                          payment.graduation || ""
                        }
                        onChange={(e) =>
                          handlePaymentChange(
                            index,
                            "graduation",
                            e.target.value
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
                        value={
                          payment.excursion || ""
                        }
                        onChange={(e) =>
                          handlePaymentChange(
                            index,
                            "excursion",
                            e.target.value
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
                        value={
                          payment.practicals || ""
                        }
                        onChange={(e) =>
                          handlePaymentChange(
                            index,
                            "practicals",
                            e.target.value
                          )
                        }
                        className="w-full border rounded-lg px-3 py-2"
                      />

                    </div>

                  </div>

                  {/* TOTAL */}
                  <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3 flex justify-between">

                    <span className="font-medium">

                      Total

                    </span>

                    <span className="font-bold text-green-700">

                      ₦
                      {total.toLocaleString()}

                    </span>

                  </div>

                  {/* SAVE BUTTON */}
                  <button
                    onClick={() =>
                      savePayment(item)
                    }
                    className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
                  >

                    Save Payment

                  </button>

                </div>

              );

            })
          }

        </div>

      </div>

    </div>

  );

}

export default SetPayment;