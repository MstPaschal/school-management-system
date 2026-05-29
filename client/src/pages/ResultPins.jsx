import {
  useEffect,
  useState
} from "react";

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

      const pdf =
        new jsPDF("p", "mm", "a4");

      // GRID SETTINGS
      const cols = 3;
      const rows = 7;

      const cardWidth = 63;
      const cardHeight = 38;

      const marginX = 8;
      const marginY = 10;

      const gapX = 4;
      const gapY = 2;

      const cardsPerPage =
        cols * rows;

      const totalPages =
        Math.ceil(
          pins.length / cardsPerPage
        );

      // SESSION NAME
      const sessionName =
        sessions.find(
          (s) =>
            s.id ==
            formData.sessionId
        )?.sessionName || "";

      pins.forEach((pin, index) => {

        const pageIndex =
          Math.floor(
            index / cardsPerPage
          );

        const positionInPage =
          index % cardsPerPage;

        const row =
          Math.floor(
            positionInPage / cols
          );

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
          col *
            (
              cardWidth + gapX
            );

        const y =
          marginY +
          row *
            (
              cardHeight + gapY
            );

        // BORDER
        pdf.setDrawColor(150);

        pdf.roundedRect(
          x,
          y,
          cardWidth,
          cardHeight,
          2,
          2
        );

        // SCHOOL NAME
        pdf.setFont(
          "helvetica",
          "bold"
        );

        pdf.setFontSize(12);

        pdf.setTextColor(
          75,
          0,
          130
        );

        pdf.text(
          "GRISFIELD SCHOOLS",
          x + 8,
          y + 7
        );

        // TAGLINE
        pdf.setFontSize(5);

        pdf.setTextColor(
          255,
          120,
          0
        );

        pdf.text(
          "Taking the child beyond limit",
          x + 13,
          y + 11
        );

        // TITLE
        pdf.setFontSize(7);

        pdf.setTextColor(
          0,
          0,
          0
        );

        pdf.text(
          "RESULT PIN CARD",
          x + 16,
          y + 16
        );

        // SESSION + TERM
        pdf.setFontSize(6);

        pdf.text(
          `SESSION: ${sessionName}`,
          x + 3,
          y + 21
        );

        pdf.text(
          `TERM: ${formData.term}`,
          x + 43,
          y + 21
        );

        // PIN TITLE
        pdf.setFontSize(10);

        pdf.setTextColor(
          90,
          0,
          120
        );

        pdf.text(
          "PIN",
          x + 25,
          y + 27
        );

        // PIN VALUE
        pdf.setFontSize(15);

        pdf.setTextColor(
          0,
          0,
          0
        );

        pdf.text(
          pin.pin,
          x + 9,
          y + 34
        );

        // INSTRUCTIONS
        pdf.setFontSize(4);

        pdf.setTextColor(80);

        pdf.text(
          "Use this PIN to check result online.",
          x + 4,
          y + 40
        );

        pdf.text(
          "Maximum usage: 5 times only.",
          x + 10,
          y + 43
        );

        // WATERMARK
        pdf.setFontSize(14);

        pdf.setTextColor(240);

        pdf.text(
          "GRISFIELD",
          x + 8,
          y + 30,
          {
            angle: 30
          }
        );

        // PAGE NUMBER
        pdf.setFontSize(5);

        pdf.setTextColor(120);

        pdf.text(
          `Page ${pageIndex + 1} of ${totalPages}`,
          170,
          290
        );

      });

      pdf.save(
        "grisfield-result-pins.pdf"
      );

    };

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

      // VALIDATION
      if (!formData.sessionId) {

        alert("Please select a session first");

        setLoading(false);

        return;

      }

      if (!formData.term) {

        alert("Please select a term");

        setLoading(false);

        return;

      }

      if (!formData.quantity || formData.quantity < 1) {

        alert("Quantity must be at least 1");

        setLoading(false);

        return;

      }

      await api.post(
        "/result-checker/generate",
        formData
      );

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

    </div>

  );

}

export default ResultPins;