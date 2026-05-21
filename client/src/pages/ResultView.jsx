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


  // PRINT SECTION
  const printSection =
    (sectionId, title) => {

      const content =
        document.getElementById(
          sectionId
        ).innerHTML;

      const win =
        window.open(
          "",
          "",
          "width=1200,height=900"
        );

      win.document.write(`

        <html>

          <head>

            <title>${title}</title>

            <style>

              body{
                font-family: Arial, sans-serif;
                padding:20px;
                color:#000;
              }

              table{
                width:100%;
                border-collapse: collapse;
                margin-top:20px;
              }

              th, td{
                border:1px solid #000;
                padding:8px;
                text-align:left;
              }

              h1,h2,h3,h4{
                margin:0;
              }

              .text-center{
                text-align:center;
              }

              .grid{
                display:grid;
                grid-template-columns:
                repeat(2,1fr);
                gap:20px;
              }

              img{
                max-width:120px;
              }

            </style>

          </head>

          <body>

            ${content}

          </body>

        </html>

      `);

      win.document.close();

      win.print();

    };


  if (!data) {

    return (

      <div className="p-10 text-center">

        No Result Found

      </div>

    );

  }


  // PAYMENT TOTAL
  const paymentTotal =

    Number(data.payment?.tuitionFee || 0) +

    Number(data.payment?.saturdayLesson || 0) +

    Number(data.payment?.scratchCard || 0) +

    Number(data.payment?.termlyActivities || 0) +

    Number(data.payment?.books || 0) +

    Number(data.payment?.schoolBus || 0) +

    Number(data.payment?.outstanding || 0) +

    Number(data.payment?.graduation || 0) +

    Number(data.payment?.excursion || 0) +

    Number(data.payment?.practicals || 0);


  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto space-y-10">


        {/* ================= RESULT SECTION ================= */}

        <div className="bg-white rounded-2xl shadow-2xl p-8">

          <div
            id="result-section"
            className="relative"
          >

            {/* WATERMARK */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">

              <img
                src="/Logo.png"
                alt="Watermark"
                className="w-[900px]"
              />

            </div>


            {/* HEADER */}
            <div className="relative text-center mb-8">

              <img
                src="/Logo.png"
                alt="Logo"
                className="w-24 h-24 mx-auto mb-3"
              />

              <h1 className="text-4xl font-bold text-blue-900">

                {
                  data.result.schoolName ||
                  "GRISFIELD SCHOOLS"
                }

              </h1>

               <p className="mt-1">

                {data.result.schoolAddress}

              </p>

               <p>

                {data.result.schoolPhone}

              </p>

              <h2 className="text-2xl font-semibold mt-2">

                ACADEMIC REPORT CARD

              </h2>

            </div>


            {/* STUDENT INFO */}
            <div className="relative grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">

              <div>

                <p className="font-bold">
                  Student Name
                </p>

                <p>
                  {data.student.fullName}
                </p>

              </div>


              <div>

                <p className="font-bold">
                  Reg Number
                </p>

                <p>
                  {data.student.regNumber}
                </p>

              </div>


              <div>

                <p className="font-bold">
                  Class
                </p>

                <p>
                  {data.student.currentClassName || "N/A"}
                </p>

              </div>


              <div>

                <p className="font-bold">
                  Session
                </p>

                <p>
                  {data.sessionName || "N/A"}
                </p>

              </div>


              <div>

                <p className="font-bold">
                  Term
                </p>

                <p>
                  {data.term}
                </p>

              </div>

            </div>


            {/* RESULT TABLE */}
            <div className="overflow-x-auto mb-8 relative">

              <table className="w-full border-collapse border">

                <thead>

                  <tr className="bg-gray-100">

                    <th className="border p-3">
                      Subject
                    </th>

                    <th className="border p-3">
                      1st CA
                    </th>

                    <th className="border p-3">
                      2nd CA
                    </th>

                    <th className="border p-3">
                      Project
                    </th>

                    <th className="border p-3">
                      Exam
                    </th>

                    <th className="border p-3">
                      Total
                    </th>

                    <th className="border p-3">
                      Grade
                    </th>

                    <th className="border p-3">
                      Remark
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {
                    data.result.subjects.map(
                      (subject, index) => (

                        <tr key={index}>

                          <td className="border p-3">

                            {subject.subject}

                          </td>

                          <td className="border p-3">

                            {subject.firstCA}

                          </td>

                          <td className="border p-3">

                            {subject.secondCA}

                          </td>

                          <td className="border p-3">

                            {subject.project}

                          </td>

                          <td className="border p-3">

                            {subject.exam}

                          </td>

                          <td className="border p-3 font-bold">

                            {subject.total}

                          </td>

                          <td className="border p-3">

                            {subject.grade}

                          </td>

                          <td className="border p-3">

                            {subject.remark}

                          </td>

                        </tr>

                      )
                    )
                  }

                </tbody>

              </table>

            </div>


            {/* SUMMARY */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

              <div>

                <p className="font-bold">
                  Grand Total
                </p>

                <p>
                  {data.result.total}
                </p>

              </div>


              <div>

                <p className="font-bold">
                  Average
                </p>

                <p>
                  {data.result.average}
                </p>

              </div>


              <div>

                <p className="font-bold">
                  Grade
                </p>

                <p>
                  {data.result.mainGrade}
                </p>

              </div>


              <div>

                <p className="font-bold">
                  Position
                </p>

                <p>
                  {data.result.position}
                </p>

              </div>

            </div>


            {/* COMMENTS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

              <div>

                <p className="font-bold mb-2">

                  Teacher's Comment

                </p>

                <div className="border rounded-lg p-4 min-h-[80px]">

                  {
                    data.result.teacherComment ||
                    "No comment"
                  }

                </div>

              </div>


              <div>

                <p className="font-bold mb-2">

                  Proprietor's Comment

                </p>

                <div className="border rounded-lg p-4 min-h-[80px]">

                  {
                    data.result.proprietorComment ||
                    "No comment"
                  }

                </div>

              </div>

            </div>


            {/* NEXT TERM */}
            <div className="mb-8">

              <p className="font-bold text-lg">

                Next Term Resumption Date

              </p>

              <p className="text-lg">

                {
                  data.result
                    .nextTermResumptionDate

                    ? new Date(
                        data.result
                        .nextTermResumptionDate
                      ).toLocaleDateString()

                    : "Not Set"
                }

              </p>

            </div>


            {/* CUMULATIVE */}
            {
              data.result.cumulativeResult && (

                <div className="border rounded-xl p-5 bg-gray-50 mb-8">

                  <h2 className="text-2xl font-bold mb-4">

                    Cumulative Result

                  </h2>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

                    <div>

                      <p className="font-bold">

                        1st Term Average

                      </p>

                      <p>

                        {
                          data.result
                          .cumulativeResult
                          .firstTermAverage
                        }

                      </p>

                    </div>

                    <div>

                      <p className="font-bold">

                        2nd Term Average

                      </p>

                      <p>

                        {
                          data.result
                          .cumulativeResult
                          .secondTermAverage
                        }

                      </p>

                    </div>

                    <div>

                      <p className="font-bold">

                        3rd Term Average

                      </p>

                      <p>

                        {
                          data.result
                          .cumulativeResult
                          .thirdTermAverage
                        }

                      </p>

                    </div>

                    <div>

                      <p className="font-bold">

                        Cumulative Average

                      </p>

                      <p>

                        {
                          data.result
                          .cumulativeResult
                          .cumulativeAverage
                        }

                      </p>

                    </div>

                    <div>

                      <p className="font-bold">

                        Cumulative Grade

                      </p>

                      <p>

                        {
                          data.result
                          .cumulativeResult
                          .cumulativeGrade
                        }

                      </p>

                    </div>

                    <div>

                      <p className="font-bold">

                        Promotion Status

                      </p>

                      <p>

                        {
                          data.result
                          .cumulativeResult
                          .promotionStatus
                        }

                      </p>

                    </div>

                  </div>

                </div>

              )
            }


            {/* FOOTER */}
            <div className="flex justify-between items-end mt-16">

              <div className="text-center">

                <img
                  src="/Signature.png"
                  alt="Signature"
                  className="w-32 mx-auto"
                />

                <p className="border-t pt-2 mt-2">

                  Principal's Signature

                </p>

              </div>


              <div className="text-center">

                <img
                  src="/Stamp.png"
                  alt="Stamp"
                  className="w-32 mx-auto"
                />

                <p className="mt-2">

                  School Stamp

                </p>

              </div>

            </div>

          </div>


          {/* PRINT RESULT */}
          <div className="text-center mt-10">

            <button
              onClick={() =>
                printSection(
                  "result-section",
                  "Result Sheet"
                )
              }
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg"
            >

              Print Result

            </button>

          </div>

        </div>


        {/* ================= PAYMENT SECTION ================= */}

        <div className="bg-white rounded-2xl shadow-2xl p-8">

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
                printSection(
                  "payment-section",
                  "Payment Schedule"
                )
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
            >

              Print Payment Schedule

            </button>

          </div>

        </div>


        {/* ================= DOCUMENTS ================= */}

        <div className="bg-white rounded-2xl shadow-2xl p-8">

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