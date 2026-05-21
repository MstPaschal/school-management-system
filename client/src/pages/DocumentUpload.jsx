import {
  useEffect,
  useState
} from "react";

import api from "../services/api";


function DocumentUpload() {

  const [classes, setClasses] =
    useState([]);

  const [sessions, setSessions] =
    useState([]);

  const [documents, setDocuments] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [uploading, setUploading] =
    useState(false);

  const [formData, setFormData] =
    useState({

      classId: "",

      sessionId: "",

      term: "1st Term"

    });

  const [selectedFile, setSelectedFile] =
    useState(null);


  // LOAD INITIAL DATA
  useEffect(() => {

    fetchClasses();

    fetchSessions();

  }, []);


  // FETCH CLASSES
  const fetchClasses =
    async () => {

      try {

        const res =
          await api.get("/classes");

        setClasses(res.data);

      } catch (error) {

        console.log(error);

      }

    };


  // FETCH SESSIONS
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


  // HANDLE CHANGE
  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value

      });

    };


  // HANDLE FILE
  const handleFileChange =
    (e) => {

      setSelectedFile(
        e.target.files[0]
      );

    };


  // LOAD DOCUMENTS
  const loadDocuments =
    async () => {

      if (
        !formData.classId ||
        !formData.sessionId
      ) {

        return alert(
          "Select class and session"
        );

      }

      try {

        setLoading(true);

        const res =
          await api.get(
            "/documents",
            {
              params: formData
            }
          );

        setDocuments(res.data);

      } catch (error) {

        console.log(error);

        alert(
          "Failed to load documents"
        );

      } finally {

        setLoading(false);

      }

    };


  // UPLOAD DOCUMENT
  const handleUpload =
    async (e) => {

      e.preventDefault();

      if (!selectedFile) {

        return alert(
          "Select a document"
        );

      }

      try {

        setUploading(true);

        const data =
          new FormData();

        data.append(
          "classId",
          formData.classId
        );

        data.append(
          "sessionId",
          formData.sessionId
        );

        data.append(
          "term",
          formData.term
        );

        // IMPORTANT
        data.append(
          "document",
          selectedFile
        );

        const res =
          await api.post(
            "/documents",
            data,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data"
              }
            }
          );

        alert(res.data.message);

        setSelectedFile(null);

        loadDocuments();

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data?.message ||
          "Failed to upload document"
        );

      } finally {

        setUploading(false);

      }

    };


  return (

    <div className="p-6">

      <div className="bg-white rounded-2xl shadow p-6">

        <h1 className="text-3xl font-bold mb-6">

          Document Upload

        </h1>


        {/* FILTERS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

          {/* CLASS */}
          <select
            name="classId"
            value={formData.classId}
            onChange={handleChange}
            className="border rounded-lg px-4 py-3"
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


          {/* LOAD */}
          <button
            onClick={loadDocuments}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-3"
          >

            {
              loading
                ? "Loading..."
                : "Load Documents"
            }

          </button>

        </div>


        {/* UPLOAD FORM */}
        <form
          onSubmit={handleUpload}
          className="border rounded-xl p-5 mb-8"
        >

          <input
            type="file"
            onChange={handleFileChange}
            className="mb-4"
          />

          <br />

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
          >

            {
              uploading
                ? "Uploading..."
                : "Upload Document"
            }

          </button>

        </form>


        {/* DOCUMENTS */}
        <div className="overflow-x-auto">

          <table className="w-full border-collapse">

            <thead>

              <tr className="bg-gray-100">

                <th className="p-3 text-left">
                  File Name
                </th>

                <th className="p-3 text-left">
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {
                documents.map((doc) => (

                  <tr
                    key={doc.id}
                    className="border-b"
                  >

                    <td className="p-3">

                      {doc.originalName}

                    </td>

                    <td className="p-3">

                      <a
                        href={`http://localhost:5000/uploads/${doc.fileName}`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                      >

                        View

                      </a>

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

export default DocumentUpload;