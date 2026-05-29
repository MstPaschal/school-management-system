import {
  useEffect,
  useState
} from "react";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import api from "../services/api";

function ResultPins() {

  const [sessions, setSessions] =
    useState([]);

  const [pins, setPins] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({

      sessionId: "",

      term: "1st Term",

      quantity: 10

    });

    const downloadPDF = () => {

      if (!pins.length) {
        alert("No pins available");
        return;
      }

      const pdf = new jsPDF("p", "mm", "a4");

      // A4 DIMENSIONS
      const pageWidth = 210;
      const pageHeight = 297;

      // CARD SETTINGS
      const cols = 3;
      const rows = 7;

      const cardWidth = 63;
      const cardHeight = 38;

      const marginX = 8;
      const marginY = 10;

      const gapX = 4;
      const gapY = 2;

      const cardsPerPage = cols * rows;

      // TOTAL PAGES
      const totalPages =
        Math.ceil(pins.length / cardsPerPage);

      pins.forEach((pin, index) => {

        const pageIndex =
          Math.floor(index / cardsPerPage);

        const positionInPage =
          index % cardsPerPage;

        const row =
          Math.floor(positionInPage / cols);

        const col =
          positionInPage % cols;

        // NEW PAGE
        if (
          index > 0 &&
          positionInPage === 0
        ) {
          pdf.addPage();
        }

        // CARD POSITION
        const x =
          marginX +
          col * (cardWidth + gapX);

        const y =
          marginY +
          row * (cardHeight + gapY);

        // CARD BORDER
        pdf.setDrawColor(120);
        pdf.rect(
          x,
          y,
          cardWidth,
          cardHeight
        );

        // SCHOOL NAME
        pdf.setFontSize(12);
        pdf.setTextColor(90, 0, 120);

        pdf.text(
          "GRISFIELD SCHOOLS",
          x + 7,
          y + 7
        );

        // SUBTITLE
        pdf.setFontSize(6);

        pdf.setTextColor(255, 120, 0);

        pdf.text(
          "Taking the child beyond limit",
          x + 12,
          y + 11
        );

        // RESULT PIN CARD
        pdf.setFontSize(10);

        pdf.setTextColor(0, 0, 0);

        pdf.text(
          "RESULT PIN CARD",
          x + 13,
          y + 16
        );

        // SESSION
        const sessionName =
          sessions.find(
            (s) =>
              s.id ==
              formData.sessionId
          )?.sessionName || "";

        pdf.setFontSize(7);

        pdf.text(
          `SESSION: ${sessionName}`,
          x + 3,
          y + 21
        );

        // TERM
        pdf.text(
          `TERM: ${formData.term}`,
          x + 43,
          y + 21
        );

        // PIN TITLE
        pdf.setFontSize(16);

        pdf.setTextColor(90, 0, 120);

        pdf.text(
          "PIN",
          x + 25,
          y + 28
        );

        // PIN VALUE
        pdf.setFontSize(18);

        pdf.setTextColor(0, 0, 0);

        pdf.text(
          pin.pin,
          x + 9,
          y + 35
        );

        // INSTRUCTIONS
        pdf.setFontSize(5);

        pdf.setTextColor(60);

        pdf.text(
          "Use this pin to check result online.",
          x + 4,
          y + 41
        );

        pdf.text(
          "Maximum usage: 5 times only.",
          x + 9,
          y + 44
        );

        // SECURITY WATERMARK
        pdf.setFontSize(20);

        pdf.setTextColor(230);

        pdf.text(
          "GRISFIELD",
          x + 7,
          y + 30,
          {
            angle: 45
          }
        );

        // PAGE NUMBER
        pdf.setFontSize(7);

        pdf.setTextColor(100);

        pdf.text(
          `Page ${pageIndex + 1} of ${totalPages}`,
          170,
          290
        );

      });

      pdf.save("grisfield-result-pins.pdf");

    };

  const [printMode, setPrintMode] = 
    useState(false);


  useEffect(() => {

    fetchSessions();

  }, []);


  const fetchSessions =
    async () => {

      try {

        const res =
          await api.get("/sessions");

        setSessions(res.data);

      } catch (error) {

        console.log(error);

      }

    };


  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value

      });

    };


  const generatePins = async () => {
    try {
      setLoading(true);

      // ✅ VALIDATION RULE (ADD THIS HERE)
      if (!formData.sessionId) {
        alert("Please select a session first");
        return;
      }

      if (!formData.term) {
        alert("Please select a term");
        return;
      }

      if (!formData.quantity || formData.quantity < 1) {
        alert("Quantity must be at least 1");
        return;
      }

      await api.post("/result-checker/generate", formData);

      alert("Pins generated successfully");

      loadPins();

    } catch (error) {
      console.log(error);
      alert("Failed to generate pins");
    } finally {
      setLoading(false);
    }
  };

  const loadPins =
    async () => {

      try {

        const res =
          await api.get(
            "/result-checker/pins",
            {
              params: {

                sessionId:
                  formData.sessionId,

                term:
                  formData.term

              }
            }
          );

        setPins(res.data);

      } catch (error) {

        console.log(error);

        alert(
          "Failed to load pins"
        );

      }

    };


  return (

    <div className="p-6">

      <div className="bg-white rounded-2xl shadow p-6">

        <h1 className="text-3xl font-bold mb-6">

          Result Checker Pins

        </h1>


        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

          {/* SESSION */}
          <select
            name="sessionId"
            value={formData.sessionId}
            onChange={handleChange}
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
            value={formData.term}
            onChange={handleChange}
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


          {/* QUANTITY */}
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            className="border rounded-lg px-4 py-3"
          />


          {/* GENERATE */}
          <button
            onClick={generatePins}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-3"
          >

            {
              loading
                ? "Generating..."
                : "Generate Pins"
            }

          </button>

        </div>


        {/* LOAD BUTTON */}
        <button
          onClick={loadPins}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg mb-6"
        >

          Load Pins

        </button>

        <button
          onClick={() => setPrintMode(true)}
          className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-lg mb-6"
        >
          Print Pins
          
        </button>

        <button
          onClick={downloadPDF}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg mb-6"
        >
          Download PDF
        </button>


        {/* PINS TABLE */}
        <div className="overflow-x-auto">

          <table className="w-full border-collapse">

            <thead>

              <tr className="bg-gray-100">

                <th className="border p-3">
                  PIN
                </th>

                <th className="border p-3">
                  Usage
                </th>

                <th className="border p-3">
                  Remaining
                </th>

              </tr>

            </thead>

            <tbody>

              {
                pins.map((pin) => (

                  <tr key={pin.id}>

                    <td className="border p-3 font-bold">

                      {pin.pin}

                    </td>

                    <td className="border p-3">

                      {pin.usageCount}

                    </td>

                    <td className="border p-3">

                      {5 - pin.usageCount}

                    </td>

                  </tr>

                ))
              }

            </tbody>

          </table>

        </div>

      </div>

      {printMode && (
        <div className="print-area">
          
          {/* PRINT HEADER BUTTON */}
          <div className="no-print flex gap-3 mb-6">
            <button
              onClick={() => window.print()}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Print Now
            </button>

            <button
              onClick={() => setPrintMode(false)}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>

          {/* GRID CONTAINER */}
          <div id="pins-print">
          <div className="grid grid-cols-3 gap-3">
            {pins.map((pin) => (
              <div
                key={pin.id}
                className="border p-3 text-center rounded shadow-md h-[140px] flex flex-col justify-center"
              >
                <h2 className="font-bold text-purple-800 text-sm">
                  GRISFIELD SCHOOLS
                </h2>

                <p className="text-xs mt-1">
                  RESULT PIN CARD
                </p>

                <p className="text-xs mt-1">
                  SESSION: {formData.sessionId} | TERM: {formData.term}
                </p>

                <div className="text-xl font-bold mt-2 tracking-widest">
                  {pin.pin}
                </div>

                <p className="text-[10px] mt-2 text-gray-600">
                  Scratch carefully to reveal PIN
                </p>
              </div>
            ))}
          </div>
          </div>
        </div>
      )}

    </div>

  );

}

export default ResultPins;