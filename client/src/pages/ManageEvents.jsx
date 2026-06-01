import { useState, useEffect } from "react";
import api from "../services/api";

function ManageEvents() {

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [content, setContent] =
    useState("");

  const [eventDate, setEventDate] =
    useState("");

  const [images, setImages] =
    useState([]);

  const [previewImages, setPreviewImages] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [events, setEvents] =
  useState([]);

const [loadingEvents, setLoadingEvents] =
  useState(false);

  const handleImageChange =
    (e) => {

      const files =
        Array.from(
          e.target.files
        );

      setImages(files);

      const previews =
        files.map(
          (file) =>
            URL.createObjectURL(
              file
            )
        );

      setPreviewImages(
        previews
      );

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          "title",
          title
        );

        formData.append(
          "description",
          description
        );

        formData.append(
          "content",
          content
        );

        formData.append(
          "eventDate",
          eventDate
        );

        images.forEach(
          (image) => {

            formData.append(
              "images",
              image
            );

          }
        );

        const res =
          await api.post(
            "/events",
            formData,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data"
              }
            }
          );

        alert(
          res.data.message
        );

        setTitle("");
        setDescription("");
        setContent("");
        setEventDate("");
        setImages([]);
        setPreviewImages([]);
        loadEvents();

      } catch (error) {

        console.log(error);

        alert(
          "Failed to create event"
        );

      } finally {

        setLoading(false);

      }

    };

    
    const handleDelete =
      async (id) => {

        const confirmDelete =
          window.confirm(
            "Delete this event?"
          );

        if (!confirmDelete)
          return;

        try {

          await api.delete(
            `/events/${id}`
          );

          alert(
            "Event deleted"
          );

          loadEvents();

        } catch (error) {

          console.log(error);

          alert(
            "Failed to delete event"
          );

        }

      };

    useEffect(() => {

      loadEvents();

    }, []);

    const loadEvents =
      async () => {

        try {

          setLoadingEvents(true);

          const res =
            await api.get(
              "/events"
            );

          setEvents(
            res.data
          );

        } catch (error) {

          console.log(error);

        } finally {

          setLoadingEvents(false);

        }

      };

  return (

    <div className="min-h-screen bg-gray-100 p-4 md:p-8">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}

        <div className="bg-gradient-to-r from-purple-700 to-purple-900 text-white p-6 rounded-3xl shadow-xl mb-8">

          <h1 className="text-3xl md:text-4xl font-bold">

            Create School Event

          </h1>

          <p className="mt-2 text-purple-100">

            Publish school activities,
            announcements, celebrations
            and upcoming programmes.

          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >

          {/* EVENT DETAILS */}

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <h2 className="text-xl font-bold mb-6 text-purple-800">

              Event Information

            </h2>

            <div className="space-y-5">

              <input
                type="text"
                placeholder="Event Title"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />

              <div>

                <textarea
                  placeholder="Short Description"
                  value={description}
                  onChange={(e) =>
                    setDescription(
                      e.target.value
                    )
                  }
                  rows="3"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />

                <p className="text-right text-sm text-gray-500 mt-1">

                  {description.length}/250

                </p>

              </div>

              <textarea
                placeholder="Full Event Content..."
                value={content}
                onChange={(e) =>
                  setContent(
                    e.target.value
                  )
                }
                rows="12"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />

              <input
                type="date"
                value={eventDate}
                onChange={(e) =>
                  setEventDate(
                    e.target.value
                  )
                }
                className="border border-gray-300 rounded-xl px-4 py-3"
                required
              />

            </div>

          </div>

          {/* IMAGE UPLOAD */}

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <h2 className="text-xl font-bold mb-6 text-purple-800">

              Event Images

            </h2>

            <label className="border-2 border-dashed border-purple-300 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-purple-50 transition">

              <span className="text-purple-700 font-semibold">

                Click to Upload Images

              </span>

              <span className="text-gray-500 text-sm mt-2">

                Multiple images supported

              </span>

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

            </label>

            {/* IMAGE PREVIEWS */}

            {
              previewImages.length > 0 && (

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

                  {
                    previewImages.map(
                      (
                        image,
                        index
                      ) => (

                        <img
                          key={index}
                          src={image}
                          alt=""
                          className="h-32 w-full object-cover rounded-xl shadow"
                        />

                      )
                    )
                  }

                </div>

              )
            }

          </div>

          {/* LIVE PREVIEW */}

          <div className="bg-white rounded-3xl shadow-lg p-6">

            <h2 className="text-xl font-bold mb-6 text-purple-800">

              Preview

            </h2>

            <div className="border rounded-2xl overflow-hidden">

              {
                previewImages[0] && (

                  <img
                    src={previewImages[0]}
                    alt=""
                    className="w-full h-72 object-cover"
                  />

                )
              }

              <div className="p-6">

                <h3 className="text-3xl font-bold text-purple-800">

                  {
                    title ||
                    "Event Title"
                  }

                </h3>

                <p className="text-gray-500 mt-2">

                  {eventDate}

                </p>

                <p className="mt-4 text-gray-700">

                  {
                    description ||
                    "Short description appears here..."
                  }

                </p>

              </div>

            </div>

          </div>

          {/* SUBMIT */}

          <div className="flex justify-end">

            <button
              type="submit"
              disabled={loading}
              className="bg-purple-700 hover:bg-purple-800 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg transition"
            >

              {
                loading
                  ? "Publishing..."
                  : "Publish Event"
              }

            </button>

          </div>

        </form>

      </div>

      <div className="mt-12 bg-white rounded-3xl shadow-lg p-6">

        <h2 className="text-2xl font-bold text-purple-800 mb-6">

          Existing Events

        </h2>

        {
          loadingEvents ? (

            <p>Loading events...</p>

          ) : events.length === 0 ? (

            <p className="text-gray-500">

              No events created yet.

            </p>

          ) : (

            <div className="space-y-4">

              {
                events.map(
                  (event) => (

                    <div
                      key={event.id}
                      className="border rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                    >

                      <div>

                        <h3 className="font-bold text-xl text-purple-800">

                          {event.title}

                        </h3>

                        <p className="text-gray-500">

                          {event.eventDate}

                        </p>

                        <p className="text-sm text-gray-600 mt-1">

                          Images:
                          {" "}
                          {
                            event.images?.length ||
                            0
                          }

                        </p>

                      </div>

                      <div className="flex gap-3">

                        <button
                          className="bg-blue-600 text-white px-4 py-2 rounded-xl"
                        >

                          Edit

                        </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              event.id
                            )
                          }
                          className="bg-red-600 text-white px-4 py-2 rounded-xl"
                        >

                          Delete

                        </button>

                      </div>

                    </div>

                  )
                )
              }

            </div>

          )
        }

      </div>

    </div>

  );

}

export default ManageEvents;