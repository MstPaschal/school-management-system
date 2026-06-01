import { useState } from "react";
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

  const [loading, setLoading] =
    useState(false);

  const handleImageChange =
    (e) => {

      setImages(
        [...e.target.files]
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

      } catch (error) {

        console.log(error);

        alert(
          "Failed to create event"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="p-6">

      <div className="bg-white p-8 rounded-2xl shadow">

        <h1 className="text-3xl font-bold mb-6">

          Create Event

        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            className="w-full border px-4 py-3 rounded-xl"
            required
          />

          <textarea
            placeholder="Short Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            rows="3"
            className="w-full border px-4 py-3 rounded-xl"
            required
          />

          <textarea
            placeholder="Full Event Content"
            value={content}
            onChange={(e) =>
              setContent(
                e.target.value
              )
            }
            rows="8"
            className="w-full border px-4 py-3 rounded-xl"
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
            className="border px-4 py-3 rounded-xl"
            required
          />

          <div>

            <label className="block mb-2 font-semibold">

              Upload Images

            </label>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-purple-700 text-white px-6 py-3 rounded-xl"
          >

            {
              loading
                ? "Saving..."
                : "Create Event"
            }

          </button>

        </form>

      </div>

    </div>

  );

}

export default ManageEvents;