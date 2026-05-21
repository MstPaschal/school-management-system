import {

  useEffect,

  useState

} from "react";

import api from "../services/api";

import {

  FaUserGraduate,

  FaUserCheck,

  FaUserTimes,

  FaGraduationCap,

  FaChalkboardTeacher,

  FaSchool,

  FaBook

} from "react-icons/fa";


function Dashboard() {

  const [stats, setStats] =
    useState({

      totalStudents: 0,

      activeStudents: 0,

      inactiveStudents: 0,

      graduatedStudents: 0,

      totalTeachers: 0,

      totalClasses: 0,

      totalSubjects: 0

    });


  // LOAD STATS
  useEffect(() => {

    fetchStats();

  }, []);


  const fetchStats =
    async () => {

      try {

        const res =
          await api.get(
            "/dashboard/stats"
          );

        setStats(res.data);

      } catch (error) {

        console.log(error);

      }

    };


  const cards = [

    {

      title: "Total Students",

      value:
        stats.totalStudents,

      icon:
        <FaUserGraduate size={40} />,

      color:
        "bg-blue-500"

    },

    {

      title: "Active Students",

      value:
        stats.activeStudents,

      icon:
        <FaUserCheck size={40} />,

      color:
        "bg-green-500"

    },

    {

      title: "Inactive Students",

      value:
        stats.inactiveStudents,

      icon:
        <FaUserTimes size={40} />,

      color:
        "bg-red-500"

    },

    {

      title: "Graduated Students",

      value:
        stats.graduatedStudents,

      icon:
        <FaGraduationCap size={40} />,

      color:
        "bg-purple-500"

    },

    {

      title: "Teachers",

      value:
        stats.totalTeachers,

      icon:
        <FaChalkboardTeacher size={40} />,

      color:
        "bg-yellow-500"

    },

    {

      title: "Classes",

      value:
        stats.totalClasses,

      icon:
        <FaSchool size={40} />,

      color:
        "bg-pink-500"

    },

    {

      title: "Subjects",

      value:
        stats.totalSubjects,

      icon:
        <FaBook size={40} />,

      color:
        "bg-indigo-500"

    }

  ];


  return (

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-8">

        Dashboard

      </h1>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {
          cards.map(
            (card, index) => (

              <div
                key={index}
                className={`${card.color} text-white rounded-2xl shadow-lg p-6 flex justify-between items-center`}
              >

                <div>

                  <h2 className="text-lg font-medium">

                    {card.title}

                  </h2>

                  <p className="text-4xl font-bold mt-2">

                    {card.value}

                  </p>

                </div>


                <div>

                  {card.icon}

                </div>

              </div>

            )
          )
        }

      </div>

    </div>

  );

}

export default Dashboard;