import { useEffect, useState } from "react";

function ResultView() {

  const [data, setData] =
    useState(null);

  useEffect(() => {


    const savedData =
      localStorage.getItem(
        "checkedResult"
      );

    if (savedData) {

      setData(
        JSON.parse(savedData)
      );

    }

  }, []);

  // PRINT FUNCTION
  const printSection = (sectionId) => {

    const allSections =
      document.querySelectorAll(
        ".printable-section"
      );

    // HIDE ALL SECTIONS
    allSections.forEach((section) => {

      section.dataset.originalDisplay =
        window.getComputedStyle(section).display;

      section.style.display = "none";

    });

    // FIND TARGET SECTION
    const target =
      document.getElementById(sectionId);

    if (target) {

      // SHOW THE ENTIRE PRINTABLE SECTION
      const printableParent =
        target.closest(".printable-section");

      if (printableParent) {

        printableParent.style.display =
          "block";

      }

    }

    // PRINT
    window.print();

    // RESTORE ALL SECTIONS
    allSections.forEach((section) => {

      section.style.display =
        section.dataset.originalDisplay || "block";

    });

  };

  useEffect(() => {
    const style =
      document.createElement("style");
    
    style.innerHTML = `
      @media print {
        .no-print {
          display: none !important;
        }

        body {
          background: white !important;
        }

        .printable-section {
          box-shadow: none !important;
          margin: 0 !important;
          padding: 0 !important;
        }

      }
    `;

    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };

  }, []);

  if (!data) {

    return (

      <div className="p-10 text-center">

        No Result Found

      </div>

    );

  }

  const paymentTotal =

    Number(
      data.payment?.tuitionFee || 0
    ) +

    Number(
      data.payment?.saturdayLesson || 0
    ) +

    Number(
      data.payment?.scratchCard || 0
    ) +

    Number(
      data.payment?.termlyActivities || 0
    ) +

    Number(
      data.payment?.books || 0
    ) +

    Number(
      data.payment?.schoolBus || 0
    ) +

    Number(
      data.payment?.outstanding || 0
    ) +

    Number(
      data.payment?.graduation || 0
    ) +

    Number(
      data.payment?.excursion || 0
    ) +

    Number(
      data.payment?.practicals || 0
    );

  return (

    <div className="min-h-screen bg-gray-100 p-4">

      <div className="max-w-7xl mx-auto space-y-10">

        {/* RESULT SECTION */}
        <div
          id="result-section"
          className="printable-section bg-white border-2 border-black p-4 relative"
        >

          {/* WATERMARK */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">

            <img
              src="/Logo.png"
              alt="Watermark"
              className="w-[500px]"
            />

          </div>

          {/* HEADER */}
          <div className="border-b-2 border-black pb-4 mb-4">

            <div className="flex justify-between items-center">

              {/* LOGO */}
              <img
                src="/Logo.png"
                alt="Logo"
                className="w-24 h-24"
              />

              {/* SCHOOL INFO */}
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
                    data.student.passport ||
                    "/avatar.png"
                  }
                  alt="Passport"
                  className="w-full h-full object-cover"
                />

              </div>

            </div>

          </div>

          {/* STUDENT INFO */}
          <div className="grid grid-cols-2 md:grid-cols-4 border border-black mb-4 text-sm">

            <div className="border-r border-b p-2">

              <b>Name:</b><br />

              {data.student.fullName}

            </div>

            <div className="border-r border-b p-2">

              <b>Reg No:</b><br />

              {data.student.regNumber}

            </div>

            <div className="border-r border-b p-2">

              <b>Class:</b><br />

              {
                data.student.currentClassName
              }

            </div>

            <div className="border-b p-2">

              <b>Term:</b><br />

              {data.term}

            </div>

            <div className="border-r p-2">

              <b>Session:</b><br />

              {data.sessionName}

            </div>

            <div className="border-r p-2">

              <b>Position:</b><br />

              {data.result.position}

            </div>

            <div className="border-r p-2">

              <b>Average:</b><br />

              {data.result.average}

            </div>

            <div className="p-2">

              <b>Grade:</b><br />

              {data.result.mainGrade}

            </div>

          </div>

          {/* MAIN CONTENT */}
          <div className="grid grid-cols-12 gap-3">

            {/* RESULT TABLE */}
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
                      Class Highest
                    </th>

                    <th className="border p-2">
                      Class Lowest
                    </th>

                    <th className="border p-2">
                      Subject Avg
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

                  {
                    data.result.subjects.map(
                      (
                        subject,
                        index
                      ) => (

                        <tr key={index}>

                          <td className="border p-2">

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

                            {subject.classHighest}

                          </td>

                          <td className="border p-2 text-center">

                            {subject.classLowest}

                          </td>

                          <td className="border p-2 text-center font-bold">

                            {subject.subjectAverage}

                          </td>

                          <td className="border p-2 text-center">

                            {subject.grade}

                          </td>

                          <td className="border p-2 text-center">

                            {subject.remark}

                          </td>

                        </tr>

                      )
                    )
                  }

                </tbody>

              </table>

            </div>

            {/* SIDE PANEL */}
            <div className="col-span-12 lg:col-span-3 space-y-4">

              {/* GRADING */}
              <div className="border border-black">

                <div className="bg-gray-200 border-b p-2 font-bold">

                  GRADING SYSTEM

                </div>

                <div className="p-2 text-sm space-y-1">

                  <p>A = 70 - 100</p>
                  <p>B = 60 - 69</p>
                  <p>C = 50 - 59</p>
                  <p>D = 45 - 49</p>
                  <p>F = 0 - 44</p>

                </div>

              </div>

              {/* COMMENTS */}
              <div className="border border-black p-2 text-sm">

                <p className="font-bold mb-2">

                  Teacher's Comment

                </p>

                <p>

                  {
                    data.result.teacherComment ||
                    "No Comment"
                  }

                </p>

              </div>

              <div className="border border-black p-2 text-sm">

                <p className="font-bold mb-2">

                  Proprietor's Comment

                </p>

                <p>

                  {
                    data.result.proprietorComment ||
                    "No Comment"
                  }

                </p>

              </div>

            </div>

          </div>

          {/* CUMULATIVE RESULT */}
          {
            data.result.cumulativeResult && (

              <div className="mt-6 border border-black p-4">

                <h2 className="font-bold text-lg mb-4">

                  Cumulative Result

                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">

                  <div>

                    <b>1st Term Avg:</b><br />

                    {
                      data.result
                        .cumulativeResult
                        .firstTermAverage
                    }

                  </div>

                  <div>

                    <b>2nd Term Avg:</b><br />

                    {
                      data.result
                        .cumulativeResult
                        .secondTermAverage
                    }

                  </div>

                  <div>

                    <b>3rd Term Avg:</b><br />

                    {
                      data.result
                        .cumulativeResult
                        .thirdTermAverage
                    }

                  </div>

                  <div>

                    <b>Cumulative Avg:</b><br />

                    {
                      data.result
                        .cumulativeResult
                        .cumulativeAverage
                    }

                  </div>

                  <div>

                    <b>Cumulative Grade:</b><br />

                    {
                      data.result
                        .cumulativeResult
                        .cumulativeGrade
                    }

                  </div>

                  <div>

                    <b>Promotion:</b><br />

                    {
                      data.result
                        .cumulativeResult
                        .promotionStatus
                    }

                  </div>

                </div>

              </div>

            )
          }

          {/* FOOTER */}
          <div className="flex justify-between items-end mt-10">

            <div className="text-center">

              <img
                src="/Signature.png"
                alt="Signature"
                className="w-28 mx-auto"
              />

              <p className="border-t border-black mt-2 pt-1">

                Principal's Signature

              </p>

            </div>

            <div className="text-center">

              <img
                src="/Stamp.png"
                alt="Stamp"
                className="w-28 mx-auto"
              />

              <p className="mt-1">

                School Stamp

              </p>

            </div>

          </div>

          {/* PRINT BUTTON */}
          <div className="text-center mt-8 no-print">

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

          </div>

        </div>


        {/* ================= PAYMENT SECTION ================= */}

        <div className="bg-white rounded-2xl shadow-2xl p-8 printable-section">

          <div id="payment-section">

            <h2 className="text-3xl font-bold mb-8">

              Payment Schedule

            </h2>


            <div className="overflow-x-auto">

              <table className="w-full border-collapse border">

                <thead>

                  <tr className="bg-gray-100">

                    <th className="border p-3">
                      Fee Type
                    </th>

                    <th className="border p-3">
                      Amount
                    </th>

                  </tr>

                </thead>


                <tbody>

                  <tr>
                    <td className="border p-3">
                      Tuition Fee
                    </td>

                    <td className="border p-3">
                      ₦{Number(
                        data.payment?.tuitionFee || 0
                      ).toLocaleString()}
                    </td>
                  </tr>


                  <tr>
                    <td className="border p-3">
                      Saturday Lesson
                    </td>

                    <td className="border p-3">
                      ₦{Number(
                        data.payment?.saturdayLesson || 0
                      ).toLocaleString()}
                    </td>
                  </tr>


                  <tr>
                    <td className="border p-3">
                      Scratch Card
                    </td>

                    <td className="border p-3">
                      ₦{Number(
                        data.payment?.scratchCard || 0
                      ).toLocaleString()}
                    </td>
                  </tr>


                  <tr>
                    <td className="border p-3">
                      Termly Activities
                    </td>

                    <td className="border p-3">
                      ₦{Number(
                        data.payment?.termlyActivities || 0
                      ).toLocaleString()}
                    </td>
                  </tr>


                  <tr>
                    <td className="border p-3">
                      Books
                    </td>

                    <td className="border p-3">
                      ₦{Number(
                        data.payment?.books || 0
                      ).toLocaleString()}
                    </td>
                  </tr>


                  <tr>
                    <td className="border p-3">
                      School Bus
                    </td>

                    <td className="border p-3">
                      ₦{Number(
                        data.payment?.schoolBus || 0
                      ).toLocaleString()}
                    </td>
                  </tr>


                  <tr>
                    <td className="border p-3">
                      Outstanding
                    </td>

                    <td className="border p-3">
                      ₦{Number(
                        data.payment?.outstanding || 0
                      ).toLocaleString()}
                    </td>
                  </tr>


                  <tr>
                    <td className="border p-3">
                      Graduation
                    </td>

                    <td className="border p-3">
                      ₦{Number(
                        data.payment?.graduation || 0
                      ).toLocaleString()}
                    </td>
                  </tr>


                  <tr>
                    <td className="border p-3">
                      Excursion
                    </td>

                    <td className="border p-3">
                      ₦{Number(
                        data.payment?.excursion || 0
                      ).toLocaleString()}
                    </td>
                  </tr>


                  <tr>
                    <td className="border p-3">
                      Practicals
                    </td>

                    <td className="border p-3">
                      ₦{Number(
                        data.payment?.practicals || 0
                      ).toLocaleString()}
                    </td>
                  </tr>


                  <tr className="bg-gray-100 font-bold">

                    <td className="border p-3">
                      TOTAL
                    </td>

                    <td className="border p-3">

                      ₦
                      {paymentTotal.toLocaleString()}

                    </td>

                  </tr>

                </tbody>

              </table>

            </div>

            <h3 className="text-2xl font-bold mb-2">

              School Account Details

            </h3>
            <p>
              <b>Account Number:</b> 2264148849
            </p>
            <p>
              <b>Bank:</b> Union Bank
            </p>
            <p>
              <b>Account Name:</b> Grisfield Schools
            </p>

          </div>


          {/* PRINT PAYMENT */}
          <div className="text-center mt-10">

            <button
              onClick={() =>
                printSection("payment-section")
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
            >

              Print Payment Schedule

            </button>

          </div>

        </div>


        {/* ================= DOCUMENTS ================= */}

        <div className="bg-white rounded-2xl shadow-2xl p-8 printable-section">

          <h2 className="text-3xl font-bold mb-8">

            Uploaded Documents
          
          </h2>
          <h3>Please ensure to download <b>'NEWSLETTER'</b> and your <b>HOLIDAY PROJECT/ASSIGNMENT</b></h3>


          {
            data.documents?.length > 0 ? (

              <div className="space-y-4">

                {
                  data.documents.map(
                    (doc) => (

                      <div
                        key={doc.id}
                        className="border rounded-lg p-4 flex justify-between items-center"
                      >

                        <p>
                          {doc.originalName}
                        </p>

                        <a
                          href={`https://portal-grisfield-schools.onrender.com/uploads/${doc.fileName}`}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                        >

                          Download

                        </a>

                      </div>

                    )
                  )
                }

              </div>

            ) : (

              <p>
                No documents uploaded
              </p>

            )
          }

        </div>

      </div>

    </div>

  );

}

export default ResultView;