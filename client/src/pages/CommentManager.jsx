import {
  useEffect,
  useState
} from "react";

import api from "../services/api";

import {
  useNotification
} from "../context/NotificationContext";


function CommentManager() {

  const {
    notify
  } = useNotification();


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

        notify(
          error.response?.data?.message ||
          "Failed to load comment templates",
          "error"
        );

      }

    };


  // ADD TEMPLATE
  const handleAddTemplate =
    async () => {

      // Remove accidental spaces
      const trimmedComment =
        comment.trim();


      if (!trimmedComment) {

        notify(
          "Please enter a comment before adding a template.",
          "warning"
        );

        return;

      }


      try {

        setLoading(true);


        const res =
          await api.post(

            "/comments/template",

            {
              comment: trimmedComment
            }

          );


        notify(

          res.data.message ||

          "Comment template added successfully.",

          "success"

        );


        setComment("");


        await fetchTemplates();


      } catch (error) {

        console.log(error);

        notify(

          error.response?.data?.message ||

          "Failed to add template",

          "error"

        );

      } finally {

        setLoading(false);

      }

    };


  return (

    <div className="p-4 sm:p-6">

      <div
        className="
          bg-white
          rounded-2xl
          shadow
          p-5
          sm:p-6
        "
      >

        <h1
          className="
            text-2xl
            sm:text-3xl
            font-bold
            mb-6
          "
        >

          Comment Manager

        </h1>


        {/* ADD TEMPLATE */}
        <div className="mb-8">

          <label
            className="
              block
              mb-2
              font-medium
              text-sm
              sm:text-base
            "
          >

            Create Comment Template

          </label>


          <div
            className="
              flex
              flex-col
              sm:flex-row
              gap-3
            "
          >

            <input

              type="text"

              value={comment}

              onChange={(e) =>
                setComment(
                  e.target.value
                )
              }

              onKeyDown={(e) => {

                if (
                  e.key === "Enter" &&
                  !loading
                ) {

                  handleAddTemplate();

                }

              }}

              placeholder="Enter reusable comment..."

              className="
                w-full
                border
                rounded-lg
                px-4
                py-3
                text-sm
                sm:text-base
                outline-none
                focus:ring-2
                focus:ring-blue-200
                focus:border-blue-500
                transition
              "

            />


            <button

              type="button"

              onClick={handleAddTemplate}

              disabled={loading}

              className="
                w-full
                sm:w-auto
                sm:min-w-[100px]
                bg-blue-600
                hover:bg-blue-700
                disabled:bg-blue-400
                disabled:cursor-not-allowed
                text-white
                px-6
                py-3
                rounded-lg
                font-medium
                transition
              "

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

          <h2
            className="
              text-xl
              sm:text-2xl
              font-bold
              mb-4
            "
          >

            Available Templates

          </h2>


          {

            templates.length === 0

              ? (

                <div
                  className="
                    border
                    border-dashed
                    rounded-xl
                    p-6
                    text-center
                    text-gray-500
                    bg-gray-50
                  "
                >

                  No comment templates available yet.

                </div>

              )

              : (

                <div
                  className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-4
                  "
                >

                  {

                    templates.map((item) => (

                      <div

                        key={item.id}

                        className="
                          border
                          rounded-xl
                          p-4
                          bg-gray-50
                          text-sm
                          sm:text-base
                          leading-6
                          break-words
                        "

                      >

                        {item.comment}

                      </div>

                    ))

                  }

                </div>

              )

          }

        </div>

      </div>

    </div>

  );

}

export default CommentManager;