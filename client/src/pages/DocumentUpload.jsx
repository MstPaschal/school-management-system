import {
  useEffect,
  useState
} from "react";

import api from "../services/api";

import { SERVER_BASE_URL } from "../config/apiConfig";

import { useNotification } from "../context/NotificationContext";


function DocumentUpload() {

  const {
    notify,
    confirmAction
  } = useNotification();


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

  const [deletingId, setDeletingId] =
    useState(null);


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
          await api.get(
            "/classes"
          );

        setClasses(res.data);

      } catch (error) {

        console.log(error);

        notify(
          error.response?.data?.message ||
          "Failed to load classes.",
          "error"
        );

      }

    };


  // FETCH SESSIONS
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
        e.target.files[0] || null
      );

    };


  // LOAD DOCUMENTS
  const loadDocuments =
    async () => {

      if (!formData.classId) {

        notify(
          "Please select a class.",
          "warning"
        );

        return;

      }


      if (!formData.sessionId) {

        notify(
          "Please select a session.",
          "warning"
        );

        return;

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


        setDocuments(
          res.data
        );

      } catch (error) {

        console.log(error);

        notify(
          error.response?.data?.message ||
          "Failed to load documents.",
          "error"
        );

      } finally {

        setLoading(false);

      }

    };


  // DELETE DOCUMENT
  const handleDeleteDocument =
    async (id) => {

      const confirmDelete =
        await confirmAction(

          "Are you sure you want to delete this document? This action cannot be undone.",

          {
            title: "Delete Document?",
            confirmText: "Delete",
            cancelText: "Cancel"
          }

        );


      if (!confirmDelete) return;


      try {

        setDeletingId(id);


        const res =
          await api.delete(
            `/documents/${id}`
          );


        notify(
          res.data.message ||
          "Document deleted successfully.",
          "success"
        );


        // REFRESH DOCUMENTS
        loadDocuments();

      } catch (error) {

        console.log(error);

        notify(
          error.response?.data?.message ||
          "Failed to delete document.",
          "error"
        );

      } finally {

        setDeletingId(null);

      }

    };


  // UPLOAD DOCUMENT
  const handleUpload =
    async (e) => {

      e.preventDefault();


      if (!formData.classId) {

        notify(
          "Please select a class before uploading.",
          "warning"
        );

        return;

      }


      if (!formData.sessionId) {

        notify(
          "Please select a session before uploading.",
          "warning"
        );

        return;

      }


      if (!formData.term) {

        notify(
          "Please select a term before uploading.",
          "warning"
        );

        return;

      }


      if (!selectedFile) {

        notify(
          "Please select a document to upload.",
          "warning"
        );

        return;

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


        notify(
          res.data.message ||
          "Document uploaded successfully.",
          "success"
        );


        setSelectedFile(null);


        const fileInput =
          document.getElementById(
            "document-file"
          );


        if (fileInput) {

          fileInput.value = "";

        }


        loadDocuments();

      } catch (error) {

        console.log(error);

        notify(
          error.response?.data?.message ||
          "Failed to upload document.",
          "error"
        );

      } finally {

        setUploading(false);

      }

    };


  return (

    <div className="p-4 sm:p-6">

      <div className="bg-white rounded-2xl shadow p-4 sm:p-6">


        <h1 className="text-2xl sm:text-3xl font-bold mb-6">

          Document Upload

        </h1>


        {/* FILTERS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">


          {/* CLASS */}
          <div>

            <label className="block mb-1.5 text-sm font-medium text-slate-700">

              Class

            </label>

            <select
              name="classId"
              value={formData.classId}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
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


          {/* SESSION */}
          <div>

            <label className="block mb-1.5 text-sm font-medium text-slate-700">

              Session

            </label>

            <select
              name="sessionId"
              value={formData.sessionId}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
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

          </div>


          {/* TERM */}
          <div>

            <label className="block mb-1.5 text-sm font-medium text-slate-700">

              Term

            </label>

            <select
              name="term"
              value={formData.term}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            >

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

          </div>


          {/* LOAD */}
          <div className="flex items-end">

            <button
              type="button"
              onClick={loadDocuments}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white rounded-lg px-4 py-3 font-medium transition"
            >

              {
                loading
                  ? "Loading..."
                  : "Load Documents"
              }

            </button>

          </div>

        </div>


        {/* UPLOAD FORM */}
        <form
          onSubmit={handleUpload}
          className="border border-slate-200 rounded-xl p-4 sm:p-5 mb-8"
        >

          <h2 className="text-lg sm:text-xl font-semibold text-slate-800 mb-4">

            Upload Document

          </h2>


          <div className="flex flex-col sm:flex-row gap-4 sm:items-end">

            <div className="flex-1">

              <label className="block mb-1.5 text-sm font-medium text-slate-700">

                Document

              </label>

              <input
                id="document-file"
                type="file"
                onChange={handleFileChange}
                className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm"
              />

              {
                selectedFile && (

                  <p className="mt-2 text-sm text-slate-500 break-words">

                    Selected: {selectedFile.name}

                  </p>

                )
              }

            </div>


            <button
              type="submit"
              disabled={uploading}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 disabled:bg-green-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition whitespace-nowrap"
            >

              {
                uploading
                  ? "Uploading..."
                  : "Upload Document"
              }

            </button>

          </div>

        </form>


        {/* DOCUMENTS */}
        <div className="mt-4">

          <div className="mb-4">

            <h2 className="text-xl sm:text-2xl font-bold text-slate-800">

              Documents

            </h2>

            <p className="text-sm text-slate-500 mt-1">

              View or delete uploaded school documents.

            </p>

          </div>


          <div className="w-full overflow-hidden">

            <table className="w-full border-collapse">

              <thead>

                <tr className="bg-gray-100">

                  <th className="p-3 text-left text-sm sm:text-base">

                    File Name

                  </th>

                  <th className="p-3 text-left text-sm sm:text-base">

                    Buttons

                  </th>

                </tr>

              </thead>


              <tbody>

                {
                  documents.length === 0 ? (

                    <tr>

                      <td
                        colSpan="2"
                        className="p-8 text-center text-slate-500"
                      >

                        No documents found.

                      </td>

                    </tr>

                  ) : (

                    documents.map((doc) => (

                      <tr
                        key={doc.id}
                        className="border-b"
                      >

                        {/* FILE NAME */}
                        <td className="p-3">

                          <div className="font-medium break-words">

                            {doc.originalName}

                          </div>

                        </td>


                        {/* BUTTONS */}
                        <td className="p-3">

                          <div className="flex flex-col sm:flex-row gap-2">


                            {/* VIEW */}
                            <a
                              href={`${SERVER_BASE_URL}/uploads/${doc.fileName}`}
                              target="_blank"
                              rel="noreferrer"
                              className="w-full sm:w-auto text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition whitespace-nowrap"
                            >

                              View

                            </a>


                            {/* DELETE */}
                            <button
                              type="button"
                              onClick={() =>
                                handleDeleteDocument(doc.id)
                              }
                              disabled={
                                deletingId === doc.id
                              }
                              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition whitespace-nowrap"
                            >

                              {
                                deletingId === doc.id
                                  ? "Deleting..."
                                  : "Delete"
                              }

                            </button>

                          </div>

                        </td>

                      </tr>

                    ))

                  )
                }

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>

  );

}

export default DocumentUpload;