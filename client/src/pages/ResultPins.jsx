import {
  useEffect,
  useState,
} from "react";

import jsPDF from "jspdf";

import api from "../services/api";

import {
  useNotification,
} from "../context/NotificationContext";

function ResultPins() {
  const {
    notify,
    confirmAction,
  } = useNotification();

  const [sessions, setSessions] =
    useState([]);

  const [pins, setPins] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [loadingPins, setLoadingPins] =
    useState(false);

  const [downloading, setDownloading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      sessionId: "",
      term: "",
      quantity: 10,
    });

  // ======================================
  // LOAD SESSIONS
  // ======================================

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

        notify(
          error.response?.data?.message ||
            "Failed to load sessions.",
          "error"
        );
      }
    };

  // ======================================
  // HANDLE INPUT CHANGE
  // ======================================

  const handleChange =
    (e) => {
      const {
        name,
        value,
      } = e.target;

      setFormData(
        (prev) => ({
          ...prev,
          [name]: value,
        })
      );

      // Clear previously loaded pins
      if (
        name === "sessionId" ||
        name === "term"
      ) {
        setPins([]);
      }
    };

  // ======================================
  // DOWNLOAD PDF
  // ======================================

  const downloadPDF =
    () => {
      if (!formData.sessionId) {
        notify(
          "Please select a session before downloading the PINs.",
          "warning"
        );
        return;
      }

      if (!formData.term) {
        notify(
          "Please select a term before downloading the PINs.",
          "warning"
        );
        return;
      }

      if (!pins.length) {
        notify(
          "No PINs are available to download.",
          "warning"
        );
        return;
      }

      try {
        setDownloading(true);

        const pdf =
          new jsPDF(
            "p",
            "mm",
            "a4"
          );

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
            pins.length /
              cardsPerPage
          );

        // SESSION NAME
        const sessionName =
          sessions.find(
            (s) =>
              s.id ==
              formData.sessionId
          )?.sessionName ||
          "";

        pins.forEach(
          (pin, index) => {
            const pageIndex =
              Math.floor(
                index /
                  cardsPerPage
              );

            const positionInPage =
              index %
              cardsPerPage;

            const row =
              Math.floor(
                positionInPage /
                  cols
              );

            const col =
              positionInPage %
              cols;

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
                  cardWidth +
                  gapX
                );

            const y =
              marginY +
              row *
                (
                  cardHeight +
                  gapY
                );

            // BORDER
            pdf.setDrawColor(
              150
            );

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
              y + 4
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
              y + 7
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
              y + 12
            );

            // SESSION + TERM
            pdf.setFontSize(6);

            pdf.text(
              `SESSION: ${sessionName}`,
              x + 3,
              y + 16
            );

            pdf.text(
              `TERM: ${formData.term}`,
              x + 43,
              y + 16
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
              y + 21
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
              y + 28
            );

            // INSTRUCTIONS
            pdf.setFontSize(4);

            pdf.setTextColor(80);

            pdf.text(
              "Use this PIN to check result online.",
              x + 4,
              y + 34
            );

            pdf.text(
              "Maximum usage: 5 times only.",
              x + 10,
              y + 37
            );

            // WATERMARK
            pdf.setFontSize(14);

            pdf.setTextColor(240);

            pdf.text(
              "GRISFIELD",
              x + 8,
              y + 25,
              {
                angle: 45,
              }
            );

            // PAGE NUMBER
            pdf.setFontSize(5);

            pdf.setTextColor(
              120
            );

            pdf.text(
              `Page ${
                pageIndex + 1
              } of ${totalPages}`,
              170,
              290
            );
          }
        );

        pdf.save(
          "grisfield-result-pins.pdf"
        );

        notify(
          "PIN PDF downloaded successfully.",
          "success"
        );
      } catch (error) {
        console.log(error);

        notify(
          "Failed to create the PIN PDF.",
          "error"
        );
      } finally {
        setDownloading(false);
      }
    };

  // ======================================
  // GENERATE PINS
  // ======================================

  const generatePins =
    async () => {
      if (!formData.sessionId) {
        notify(
          "Please select a session first.",
          "warning"
        );
        return;
      }

      if (!formData.term) {
        notify(
          "Please select a term.",
          "warning"
        );
        return;
      }

      const quantity =
        Number(
          formData.quantity
        );

      if (
        !Number.isInteger(
          quantity
        ) ||
        quantity < 1
      ) {
        notify(
          "Quantity must be a whole number of at least 1.",
          "warning"
        );
        return;
      }

      const confirmed =
        await confirmAction(
          `Generate ${quantity} new result PIN${
            quantity === 1
              ? ""
              : "s"
          } for ${
            formData.term
          }?`,
          {
            title:
              "Generate Result PINs",
            confirmText:
              "Generate",
            cancelText:
              "Cancel",
          }
        );

      if (!confirmed) {
        return;
      }

      try {
        setLoading(true);

        await api.post(
          "/result-checker/generate",
          {
            ...formData,
            quantity,
          }
        );

        notify(
          "PINs generated successfully.",
          "success"
        );

        await loadPins();
      } catch (error) {
        console.log(error);

        notify(
          error.response?.data?.message ||
            "Failed to generate PINs.",
          "error"
        );
      } finally {
        setLoading(false);
      }
    };

  // ======================================
  // LOAD PINS
  // ======================================

  const loadPins =
    async () => {
      if (!formData.sessionId) {
        notify(
          "Please select a session before loading PINs.",
          "warning"
        );
        return;
      }

      if (!formData.term) {
        notify(
          "Please select a term before loading PINs.",
          "warning"
        );
        return;
      }

      try {
        setLoadingPins(true);

        const res =
          await api.get(
            "/result-checker/pins",
            {
              params: {
                sessionId:
                  formData.sessionId,

                term:
                  formData.term,
              },
            }
          );

        setPins(res.data);

        if (
          res.data.length === 0
        ) {
          notify(
            "No PINs were found for the selected session and term.",
            "warning"
          );
        } else {
          notify(
            `${res.data.length} PIN${
              res.data.length === 1
                ? ""
                : "s"
            } loaded successfully.`,
            "success"
          );
        }
      } catch (error) {
        console.log(error);

        notify(
          error.response?.data?.message ||
            "Failed to load PINs.",
          "error"
        );
      } finally {
        setLoadingPins(false);
      }
    };

  return (
    <div className="p-4 sm:p-6">
      <div className="bg-white rounded-2xl shadow p-4 sm:p-6">

        {/* HEADER */}

        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Result Checker Pins
          </h1>

          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Generate, load and download
            result checker PINs for each
            session and term.
          </p>
        </div>

        {/* CONTROLS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">

          {/* SESSION */}

          <select
            name="sessionId"
            value={
              formData.sessionId
            }
            onChange={
              handleChange
            }
            disabled={loading}
            className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          >
            <option value="">
              Select Session
            </option>

            {sessions.map(
              (session) => (
                <option
                  key={
                    session.id
                  }
                  value={
                    session.id
                  }
                >
                  {
                    session.sessionName
                  }
                </option>
              )
            )}
          </select>

          {/* TERM */}

          <select
            name="term"
            value={
              formData.term
            }
            onChange={
              handleChange
            }
            disabled={loading}
            className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          >
            <option value="">
              Select Term
            </option>

            <option value="1st Term">
              1st Term
            </option>

            <option value="2nd Term">
              2nd Term
            </option>

            <option value="3rd Term">
              3rd Term
            </option>
          </select>

          {/* QUANTITY */}

          <input
            type="number"
            name="quantity"
            value={
              formData.quantity
            }
            onChange={
              handleChange
            }
            min="1"
            step="1"
            placeholder="Quantity"
            disabled={loading}
            className="border rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />

          {/* GENERATE */}

          <button
            onClick={
              generatePins
            }
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-3 font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading
              ? "Generating..."
              : "Generate Pins"}
          </button>
        </div>

        {/* ACTION BUTTONS */}

        <div className="flex flex-col sm:flex-row gap-3 mb-6">

          <button
            onClick={
              loadPins
            }
            disabled={
              loadingPins
            }
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loadingPins
              ? "Loading..."
              : "Load Pins"}
          </button>

          <button
            onClick={
              downloadPDF
            }
            disabled={
              downloading
            }
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {downloading
              ? "Preparing PDF..."
              : "Download PDF"}
          </button>
        </div>

        {/* PINS TABLE */}

        {pins.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">

              <thead>
                <tr className="bg-gray-100">

                  <th className="border p-3 text-left">
                    PIN
                  </th>

                  <th className="border p-3 text-left">
                    Usage
                  </th>

                  <th className="border p-3 text-left">
                    Remaining
                  </th>

                </tr>
              </thead>

              <tbody>
                {pins.map(
                  (pin) => (
                    <tr
                      key={pin.id}
                      className="hover:bg-gray-50"
                    >

                      <td className="border p-3 font-bold">
                        {pin.pin}
                      </td>

                      <td className="border p-3">
                        {
                          pin.usageCount
                        }
                      </td>

                      <td className="border p-3">
                        {
                          5 -
                          pin.usageCount
                        }
                      </td>

                    </tr>
                  )
                )}
              </tbody>

            </table>
          </div>
        ) : (
          <div className="border border-dashed rounded-xl py-10 text-center text-gray-500">
            Select a session and term,
            then load PINs to view them
            here.
          </div>
        )}

      </div>
    </div>
  );
}

export default ResultPins;