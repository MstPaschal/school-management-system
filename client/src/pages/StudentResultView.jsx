import html2pdf from "html2pdf.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { SERVER_BASE_URL } from "../config/apiConfig";

function StudentResultView() {
  const { accessId } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==============================
  // LOAD RELEASED RESULT
  // ==============================
  useEffect(() => {
    const fetchResult = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await api.get(
          `/students/my-results/${accessId}`
        );

        setData(res.data);
      } catch (err) {
        console.error(
          "STUDENT RESULT VIEW ERROR:",
          err
        );

        setError(
          err.response?.data?.message ||
            "Failed to load result"
        );
      } finally {
        setLoading(false);
      }
    };

    if (accessId) {
      fetchResult();
    }
  }, [accessId]);

  // ==============================
  // PRINT
  // ==============================
  const printSection = (sectionId) => {
    const section =
      document.getElementById(sectionId);

    if (!section) return;

    document
      .querySelectorAll(".print-section")
      .forEach((el) => {
        el.style.display = "none";
      });

    section.style.display = "block";

    window.print();

    setTimeout(() => {
      document
        .querySelectorAll(".print-section")
        .forEach((el) => {
          el.style.display = "block";
        });
    }, 1000);
  };

  // ==============================
  // DOWNLOAD PDF
  // ==============================
  const downloadResultPDF = async () => {
    const originalElement =
      document.getElementById(
        "result-section"
      );

    if (!originalElement) return;

    const clonedElement =
      originalElement.cloneNode(true);

    const tempContainer =
      document.createElement("div");

    tempContainer.style.background =
      "#ffffff";

    tempContainer.style.padding = "20px";

    tempContainer.style.position =
      "fixed";

    tempContainer.style.left =
      "-99999px";

    tempContainer.appendChild(
      clonedElement
    );

    document.body.appendChild(
      tempContainer
    );

    // Remove Tailwind colors from PDF
    clonedElement
      .querySelectorAll("*")
      .forEach((el) => {
        el.style.color = "#000000";
        el.style.backgroundColor =
          "#ffffff";
        el.style.borderColor =
          "#000000";
      });

    const studentName =
      data.student.fullName
        ?.replace(/\s+/g, "_")
        ?.toUpperCase();

    const options = {
      margin: 0.3,

      filename:
        `${studentName}_RESULT.pdf`,

      image: {
        type: "jpeg",
        quality: 1
      },

      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor:
          "#ffffff"
      },

      jsPDF: {
        unit: "in",
        format: "a4",
        orientation: "portrait"
      }
    };

    try {
      await html2pdf()
        .set(options)
        .from(clonedElement)
        .save();
    } catch (error) {
      console.error(
        "PDF Download Error:",
        error
      );

      alert(
        "Failed to download result"
      );
    }

    document.body.removeChild(
      tempContainer
    );
  };

  // ==============================
  // LOADING
  // ==============================
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>

          <p className="text-gray-700 font-medium">
            Loading your result...
          </p>
        </div>
      </div>
    );
  }

  // ==============================
  // ERROR
  // ==============================
  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-3">
            Unable to Load Result
          </h2>

          <p className="text-gray-600">
            {error}
          </p>
        </div>
      </div>
    );
  }

  // ==============================
  // NO RESULT
  // ==============================
  if (!data) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          No Result Found
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">

      <div className="max-w-7xl mx-auto space-y-10">

        {/* =========================================
            RESULT SECTION
        ========================================== */}
        <div
          id="result-section"
          className="print-section bg-white border-2 border-black p-4 relative"
        >

          {/* =========================================
              WATERMARK
          ========================================== */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">

            <img
              src={`${window.location.origin}/Logo.png`}
              alt="Watermark"
              className="w-[500px]"
            />

          </div>


          {/* =========================================
              HEADER
          ========================================== */}
          <div className="border-b-2 border-black pb-4 mb-4">

            <div className="flex justify-between items-center">

              {/* LOGO */}
              <img
                src={`${window.location.origin}/Logo.png`}
                alt="Logo"
                className="w-24 h-24 object-contain"
              />


              {/* SCHOOL INFORMATION */}
              <div className="text-center flex-1">

                <h1 className="text-2xl font-bold uppercase">

                  {
                    data.result.schoolName ||
                    "GRISFIELD SCHOOLS"
                  }

                </h1>

                <p>
                  {data.result.schoolAddress}
                </p>

                <p>
                  {data.result.schoolPhone}
                </p>

                <h2 className="font-bold mt-2 text-lg">

                  STUDENT'S ACADEMIC REPORT CARD

                </h2>

              </div>


              {/* PASSPORT */}
              <div className="w-24 h-24 border border-black overflow-hidden">

                <img
                  src={
                    data.student.passport
                      ? `${SERVER_BASE_URL}/uploads/${data.student.passport}`
                      : "/avatar.png"
                  }
                  alt="Passport"
                  className="w-full h-full object-cover"
                />

              </div>

            </div>

          </div>


          {/* =========================================
              STUDENT INFORMATION
          ========================================== */}
          <div className="grid grid-cols-2 md:grid-cols-4 border border-black mb-4 text-sm">

            <div className="border-r border-b p-2">
              <b>Name:</b>
              <br />
              {data.student.fullName}
            </div>

            <div className="border-r border-b p-2">
              <b>Reg No:</b>
              <br />
              {data.student.regNumber}
            </div>

            <div className="border-r border-b p-2">
              <b>Admission No:</b>
              <br />
              {data.student.admissionNumber}
            </div>

            <div className="border-r border-b p-2">
              <b>Class:</b>
              <br />
              {data.student.currentClassName}
            </div>

            <div className="border-b p-2">
              <b>Term:</b>
              <br />
              {data.term}
            </div>

            <div className="border-r p-2">
              <b>Session:</b>
              <br />
              {data.sessionName}
            </div>

            <div className="border-r p-2">
              <b>Position:</b>
              <br />
              {data.result.position}
            </div>

            <div className="border-r p-2">
              <b>Number in class:</b>
              <br />
              {data.result.totalStudentsInClass}
            </div>

            <div className="border-r p-2">
              <b>Average:</b>
              <br />
              {data.result.average}
            </div>

            <div className="p-2">
              <b>Grade:</b>
              <br />
              {data.result.mainGrade}
            </div>

          </div>


          {/* =========================================
              MAIN CONTENT
          ========================================== */}
          <div className="grid grid-cols-12 gap-3">


            {/* =======================================
                RESULT TABLE
            ======================================== */}
            <div className="col-span-12 lg:col-span-9 overflow-x-auto">

              <table className="w-full border-collapse border border-black text-sm">

                <thead>

                  <tr className="bg-gray-200">

                    <th className="border p-2">
                      Subject
                    </th>

                    <th className="border p-2">
                      1st CA
                    </th>

                    <th className="border p-2">
                      2nd CA
                    </th>

                    <th className="border p-2">
                      Project
                    </th>

                    <th className="border p-2">
                      Exam
                    </th>

                    <th className="border p-2">
                      Total
                    </th>

                    <th className="border p-2">
                      Subject Avg
                    </th>

                    <th className="border p-2">
                      Subject Position
                    </th>

                    <th className="border p-2">
                      Grade
                    </th>

                    <th className="border p-2">
                      Remark
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {data.result.subjects?.map(
                    (subject, index) => (

                      <tr key={index}>

                        <td className="border p-2 font-medium">
                          {subject.subject}
                        </td>

                        <td className="border p-2 text-center">
                          {subject.firstCA}
                        </td>

                        <td className="border p-2 text-center">
                          {subject.secondCA}
                        </td>

                        <td className="border p-2 text-center">
                          {subject.project}
                        </td>

                        <td className="border p-2 text-center">
                          {subject.exam}
                        </td>

                        <td className="border p-2 text-center font-bold">
                          {subject.total}
                        </td>

                        <td className="border p-2 text-center">
                          {subject.subjectAverage}
                        </td>

                        <td className="border p-2 text-center">
                          {subject.subjectPosition}
                        </td>

                        <td className="border p-2 text-center font-bold">
                          {subject.grade}
                        </td>

                        <td className="border p-2">
                          {subject.remark}
                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>


            {/* =======================================
                SIDE PANEL
            ======================================== */}
            <div className="col-span-12 lg:col-span-3">

              <div className="border border-black">

                {/* GRADING SYSTEM */}
                <div className="p-3">

                  <h3 className="font-bold text-center mb-3">
                    GRADING SYSTEM
                  </h3>

                  <div className="space-y-1 text-sm">

                    <div className="flex justify-between border-b pb-1">
                      <span>A+</span>
                      <span>90 - 100</span>
                    </div>

                    <div className="flex justify-between border-b pb-1">
                      <span>A</span>
                      <span>80 - 89</span>
                    </div>

                    <div className="flex justify-between border-b pb-1">
                      <span>B</span>
                      <span>60 - 79</span>
                    </div>

                    <div className="flex justify-between border-b pb-1">
                      <span>C</span>
                      <span>50 - 59</span>
                    </div>

                    <div className="flex justify-between border-b pb-1">
                      <span>D</span>
                      <span>40 - 49</span>
                    </div>

                    <div className="flex justify-between">
                      <span>F</span>
                      <span>0 - 39</span>
                    </div>

                  </div>

                </div>


                {/* TEACHER COMMENT */}
                <div className="border-t border-black p-3">

                  <h3 className="font-bold">
                    Teacher's Comment
                  </h3>

                  <p className="mt-2 text-sm">
                    {
                      data.result.teacherComment ||
                      "No comment"
                    }
                  </p>

                </div>


                {/* HEADTEACHER COMMENT */}
                <div className="border-t border-black p-3">

                  <h3 className="font-bold">
                    HeadTeacher's Comment
                  </h3>

                  <p className="mt-2 text-sm">
                    {
                      data.result.proprietorComment ||
                      "No comment"
                    }
                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* =========================================
              CUMULATIVE RESULT
          ========================================== */}
          {data.result.cumulativeResult && (

            <div className="border border-black mt-6 p-4">

              <h3 className="font-bold text-center mb-4">
                CUMULATIVE RESULT
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">

                <div>
                  <b>1st Term Avg:</b>
                  <br />
                  {
                    data.result.cumulativeResult
                      .firstTermAverage
                  }
                </div>

                <div>
                  <b>2nd Term Avg:</b>
                  <br />
                  {
                    data.result.cumulativeResult
                      .secondTermAverage
                  }
                </div>

                <div>
                  <b>3rd Term Avg:</b>
                  <br />
                  {
                    data.result.cumulativeResult
                      .thirdTermAverage
                  }
                </div>

                <div>
                  <b>Cumulative Avg:</b>
                  <br />
                  {
                    data.result.cumulativeResult
                      .cumulativeAverage
                  }
                </div>

                <div>
                  <b>Cumulative Grade:</b>
                  <br />
                  {
                    data.result.cumulativeResult
                      .cumulativeGrade
                  }
                </div>

                <div>
                  <b>Promotion:</b>
                  <br />
                  {
                    data.result.cumulativeResult
                      .promotionStatus
                  }
                </div>

              </div>

            </div>

          )}


          {/* =========================================
              FOOTER
          ========================================== */}
          <div className="flex justify-between items-end mt-10">

            <div className="text-center">

              <img
                src={`${window.location.origin}/Signature.png`}
                alt="Signature"
                className="w-28 mx-auto"
              />

              <p className="border-t border-black mt-2 pt-1">
                Principal's Signature
              </p>

            </div>


            <div className="text-center">

              <img
                src={`${window.location.origin}/Stamp.png`}
                alt="Stamp"
                className="w-28 mx-auto"
              />

              <p className="mt-1">
                School Stamp
              </p>

            </div>

          </div>


          {/* =========================================
              ACTION BUTTONS
          ========================================== */}
          <div className="flex flex-wrap justify-center gap-4 mt-8 no-print">

            <button
              onClick={() =>
                printSection(
                  "result-section"
                )
              }
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
            >
              Print Result
            </button>


            <button
              onClick={downloadResultPDF}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              Download Result
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default StudentResultView;