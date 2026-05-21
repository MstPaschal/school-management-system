import {

  useEffect,

  useState

} from "react";

import {

  useParams

} from "react-router-dom";

import api from "../services/api";


function StudentProfile() {

  const { id } =
    useParams();


  const [student, setStudent] =
    useState(null);


  // FETCH STUDENT
  useEffect(() => {

    fetchStudent();

  }, []);


  const fetchStudent =
    async () => {

      try {

        const res =
          await api.get(

            `/students/${id}`

          );

        setStudent(res.data);

      } catch (error) {

        console.log(error);

      }

    };


  if (!student) {

    return (

      <div className="p-6">

        Loading...

      </div>

    );

  }


  return (

    <div className="p-6">

      <div className="bg-white rounded-2xl shadow p-6">

        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">

          {/* PASSPORT */}
          <div>

            {
              student.passport ? (

                <img
                  src={`https://portal-grisfield-schools.onrender.com/uploads/${student.passport}`}
                  alt="passport"
                  className="w-40 h-40 rounded-2xl object-cover border"
                />

              ) : (

                <div className="w-40 h-40 rounded-2xl bg-gray-300" />

              )
            }

          </div>


          {/* DETAILS */}
          <div className="flex-1">

            <h1 className="text-3xl font-bold mb-2">

              {student.fullName}

            </h1>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">

              <div>

                <p className="text-gray-500">

                  Registration Number

                </p>

                <p className="font-semibold">

                  {student.regNumber}

                </p>

              </div>


              <div>

                <p className="text-gray-500">

                  Gender

                </p>

                <p className="font-semibold">

                  {student.gender}

                </p>

              </div>


              <div>

                <p className="text-gray-500">

                  Date of Birth

                </p>

                <p className="font-semibold">

                  {
                    student.dob
                      ?.split("T")[0]
                  }

                </p>

              </div>


              <div>

                <p className="text-gray-500">

                  Contact 1

                </p>

                <p className="font-semibold">

                  {student.contact1}

                </p>

              </div>


              <div>

                <p className="text-gray-500">

                  Contact 2

                </p>

                <p className="font-semibold">

                  {student.contact2}

                </p>

              </div>


              <div>

                <p className="text-gray-500">

                  Status

                </p>

                <span
                  className={`px-3 py-1 rounded-full text-white text-sm ${
                    student.status === "ACTIVE"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >

                  {student.status}

                </span>

              </div>

            </div>


            {/* ADDRESS */}
            <div className="mt-6">

              <p className="text-gray-500">

                Address

              </p>

              <p className="font-medium">

                {student.address}

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default StudentProfile;