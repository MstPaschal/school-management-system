import {
  useEffect,
  useState
} from "react";

import api from "../services/api";


function CommentManager() {

  const [templates, setTemplates] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [comment, setComment] =
    useState("");


  // LOAD TEMPLATES
  useEffect(() => {

    fetchTemplates();

  }, []);


  // FETCH TEMPLATES
  const fetchTemplates =
    async () => {

      try {

        const res =
          await api.get(
            "/comments/template"
          );

        setTemplates(res.data);

      } catch (error) {

        console.log(error);

      }

    };


  // ADD TEMPLATE
  const handleAddTemplate =
    async () => {

      if (!comment) {

        return alert(
          "Please enter comment"
        );

      }

      try {

        setLoading(true);

        const res =
          await api.post(

            "/comments/template",

            { comment }

          );

        alert(res.data.message);

        setComment("");

        fetchTemplates();

      } catch (error) {

        console.log(error);

        alert(

          error.response?.data?.message ||

          "Failed to add template"

        );

      } finally {

        setLoading(false);

      }

    };


  return (

    <div className="p-6">

      <div className="bg-white rounded-2xl shadow p-6">

        <h1 className="text-3xl font-bold mb-6">

          Comment Manager

        </h1>


        {/* ADD TEMPLATE */}
        <div className="mb-8">

          <label className="block mb-2 font-medium">

            Create Comment Template

          </label>


          <div className="flex gap-3">

            <input
              type="text"
              value={comment}
              onChange={(e) =>
                setComment(
                  e.target.value
                )
              }
              placeholder="Enter reusable comment..."
              className="w-full border rounded-lg px-4 py-3"
            />


            <button
              onClick={handleAddTemplate}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg"
            >

              {
                loading
                  ? "Adding..."
                  : "Add"
              }

            </button>

          </div>

        </div>


        {/* TEMPLATE LIST */}
        <div>

          <h2 className="text-2xl font-bold mb-4">

            Available Templates

          </h2>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {
              templates.map((item) => (

                <div
                  key={item.id}
                  className="border rounded-xl p-4 bg-gray-50"
                >

                  {item.comment}

                </div>

              ))
            }

          </div>

        </div>

      </div>

    </div>

  );

}

export default CommentManager;