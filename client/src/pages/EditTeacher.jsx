import {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import api from "../services/api";


function EditTeacher() {

  const navigate =
    useNavigate();

  const { id } =
    useParams();

  const [loading, setLoading] =
    useState(false);

  const [classes, setClasses] =
    useState([]);

  const [formData, setFormData] =
    useState({

      fullName: "",

      username: "",

      password: "",

      contact: "",

      dob: "",

      address: "",

      nextOfKin: "",

      nokContact: "",

      nokAddress: "",

      assignedClass: ""

    });


  // LOAD TEACHER
  useEffect(() => {

    fetchTeacher();

    fetchClasses();

  }, []);


  // FETCH SINGLE TEACHER
  const fetchTeacher =
    async () => {

      try {

        const res =
          await api.get(
            `/teachers/${id}`
          );

        setFormData({

          fullName:
            res.data.fullName || "",

          username:
            res.data.User?.username || "",

          password: "",

          contact:
            res.data.contact || "",

          dob:
            res.data.dob || "",

          address:
            res.data.address || "",

          nextOfKin:
            res.data.nextOfKin || "",

          nokContact:
            res.data.nokContact || "",

          nokAddress:
            res.data.nokAddress || "",

          assignedClass:
            res.data.assignedClass || ""

        });

      } catch (error) {

        console.log(error);

      }

    };


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


  // HANDLE CHANGE
  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value

      });

    };


  // UPDATE TEACHER
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const res =
          await api.put(

            `/teachers/${id}`,

            formData

          );

        alert(res.data.message);

        navigate("/teachers");

      } catch (error) {

        console.log(error);

        alert(

          error.response?.data?.message ||

          "Update failed"

        );

      } finally {

        setLoading(false);

      }

    };


  return (

    <div className="p-6">

      <div className="bg-white rounded-2xl shadow p-6 max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">

          Edit Teacher

        </h1>


        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >

          {/* FULL NAME */}
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="border rounded-lg px-4 py-3"
          />


          {/* USERNAME */}
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="border rounded-lg px-4 py-3"
          />


          {/* PASSWORD */}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="New Password (optional)"
            className="border rounded-lg px-4 py-3"
          />


          {/* CONTACT */}
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Contact"
            className="border rounded-lg px-4 py-3"
          />


          {/* DOB */}
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="border rounded-lg px-4 py-3"
          />


          {/* NEXT OF KIN */}
          <input
            type="text"
            name="nextOfKin"
            value={formData.nextOfKin}
            onChange={handleChange}
            placeholder="Next Of Kin"
            className="border rounded-lg px-4 py-3"
          />


          {/* NOK CONTACT */}
          <input
            type="text"
            name="nokContact"
            value={formData.nokContact}
            onChange={handleChange}
            placeholder="NOK Contact"
            className="border rounded-lg px-4 py-3"
          />


          {/* NOK ADDRESS */}
          <input
            type="text"
            name="nokAddress"
            value={formData.nokAddress}
            onChange={handleChange}
            placeholder="NOK Address"
            className="border rounded-lg px-4 py-3"
          />


          {/* ADDRESS */}
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="border rounded-lg px-4 py-3 md:col-span-2"
          />


          {/* ASSIGNED CLASS */}
          <div className="md:col-span-2">

            <label className="block mb-1 font-medium">

              Assigned Class

            </label>

            <select
              name="assignedClass"
              value={formData.assignedClass}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
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

          </div>


          {/* BUTTON */}
          <div className="md:col-span-2">

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >

              {
                loading
                  ? "Updating..."
                  : "Update Teacher"
              }

            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default EditTeacher;