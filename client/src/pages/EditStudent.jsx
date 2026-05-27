import {

  useEffect,

  useState

} from "react";

import {

  useNavigate,

  useParams

} from "react-router-dom";

import api from "../services/api";


function EditStudent() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();


  const [classes, setClasses] =
    useState([]);

  const [passport, setPassport] =
    useState(null);

  const [loading, setLoading] =
    useState(false);


  const [formData, setFormData] =
    useState({

      fullName: "",

      admissionNumber: "",

      dob: "",

      gender: "",

      address: "",

      contact1: "",

      contact2: "",

      currentClass: ""

    });


  useEffect(() => {

    fetchStudent();

    fetchClasses();

  }, []);


  // FETCH STUDENT
  const fetchStudent =
    async () => {

      try {

        const res =
          await api.get(
            `/students/${id}`
          );

        setFormData({

          fullName:
            res.data.fullName || "",

          admissionNumber:
            res.data.admissionNumber || "",

          dob:
            res.data.dob || "",

          gender:
            res.data.gender || "",

          address:
            res.data.address || "",

          contact1:
            res.data.contact1 || "",

          contact2:
            res.data.contact2 || "",

          currentClass:
            res.data.currentClass || ""

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


  // CHANGE
  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value

      });

    };


  // FILE
  const handleFileChange =
    (e) => {

      setPassport(
        e.target.files[0]
      );

    };


  // SUBMIT
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const data =
          new FormData();


        Object.keys(formData)
          .forEach((key) => {

            data.append(
              key,
              formData[key]
            );

          });


        if (passport) {

          data.append(
            "passport",
            passport
          );

        }


        const res =
          await api.put(

            `/students/${id}`,

            data,

            {

              headers: {

                "Content-Type":
                  "multipart/form-data"

              }

            }

          );


        alert(
          res.data.message
        );

        navigate(
          "/students/view"
        );

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

      <div className="bg-white rounded-2xl shadow p-6 max-w-4xl">

        <h1 className="text-3xl font-bold mb-6">

          Edit Student

        </h1>


        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >

          {/* FULL NAME */}
          <div>

            <label className="block mb-1 font-medium">

              Full Name

            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3"
            />

          </div>


          {/* ADMISSION NUMBER */}
          <div>

            <label className="block mb-1 font-medium">

              Admission Number

            </label>

            <input
              type="text"
              name="admissionNumber"
              value={formData.admissionNumber}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3"
            />

          </div>


          {/* DOB */}
          <div>

            <label className="block mb-1 font-medium">

              Date of Birth

            </label>

            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            />

          </div>


          {/* GENDER */}
          <div>

            <label className="block mb-1 font-medium">

              Gender

            </label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            >

              <option value="">
                Select Gender
              </option>

              <option value="Male">
                Male
              </option>

              <option value="Female">
                Female
              </option>

            </select>

          </div>


          {/* CONTACT 1 */}
          <div>

            <label className="block mb-1 font-medium">

              Contact 1

            </label>

            <input
              type="text"
              name="contact1"
              value={formData.contact1}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            />

          </div>


          {/* CONTACT 2 */}
          <div>

            <label className="block mb-1 font-medium">

              Contact 2

            </label>

            <input
              type="text"
              name="contact2"
              value={formData.contact2}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            />

          </div>


          {/* CLASS */}
          <div>

            <label className="block mb-1 font-medium">

              Class

            </label>

            <select
              name="currentClass"
              value={formData.currentClass}
              onChange={handleChange}
              required
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


          {/* ADDRESS */}
          <div className="md:col-span-2">

            <label className="block mb-1 font-medium">

              Address

            </label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            />

          </div>


          {/* PASSPORT */}
          <div className="md:col-span-2">

            <label className="block mb-1 font-medium">

              Passport

            </label>

            <input
              type="file"
              onChange={handleFileChange}
              className="w-full border rounded-lg px-4 py-3"
            />

          </div>


          {/* BUTTON */}
          <div className="md:col-span-2">

            <button
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
            >

              {
                loading
                  ? "Updating..."
                  : "Update Student"
              }

            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default EditStudent;