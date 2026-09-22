import { useEffect, useState } from "react";
import api from "../services/api";

import { useNotification } from "../context/NotificationContext";

function ManageEvents() {
  const { notify, confirmAction } = useNotification();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [eventDate, setEventDate] = useState("");

  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const [loading, setLoading] = useState(false);

  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(false);

  const [editingEvent, setEditingEvent] = useState(null);

  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editDate, setEditDate] = useState("");

  const [editLoading, setEditLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // LOAD EVENTS
  useEffect(() => {
    loadEvents();
  }, []);

  // CLEAN UP IMAGE PREVIEWS
  useEffect(() => {
    return () => {
      previewImages.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [previewImages]);

  // HANDLE IMAGE CHANGE
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) {
      setImages([]);
      setPreviewImages([]);
      return;
    }

    const invalidFile = files.find(
      (file) => !file.type.startsWith("image/")
    );

    if (invalidFile) {
      notify(
        "Please select image files only.",
        "warning"
      );

      e.target.value = "";
      return;
    }

    setImages(files);

    const previews = files.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviewImages(previews);
  };

  // CREATE EVENT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle) {
      notify("Please enter the event title.", "warning");
      return;
    }

    if (!trimmedDescription) {
      notify(
        "Please enter a short description.",
        "warning"
      );
      return;
    }

    if (trimmedDescription.length > 250) {
      notify(
        "The short description cannot exceed 250 characters.",
        "warning"
      );
      return;
    }

    if (!trimmedContent) {
      notify(
        "Please enter the full event content.",
        "warning"
      );
      return;
    }

    if (!eventDate) {
      notify(
        "Please select the event date.",
        "warning"
      );
      return;
    }

    if (images.length === 0) {
      notify(
        "Please select at least one event image.",
        "warning"
      );
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append(
        "title",
        trimmedTitle
      );

      formData.append(
        "description",
        trimmedDescription
      );

      formData.append(
        "content",
        trimmedContent
      );

      formData.append(
        "eventDate",
        eventDate
      );

      images.forEach((image) => {
        formData.append("images", image);
      });

      const res = await api.post(
        "/events",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      notify(
        res.data.message ||
          "Event published successfully.",
        "success"
      );

      setTitle("");
      setDescription("");
      setContent("");
      setEventDate("");
      setImages([]);
      setPreviewImages([]);

      // Reset file input
      const fileInput =
        document.getElementById(
          "event-images"
        );

      if (fileInput) {
        fileInput.value = "";
      }

      loadEvents();
    } catch (error) {
      console.log(error);

      notify(
        error.response?.data?.message ||
          "Failed to create event.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // DELETE EVENT
  const handleDelete = async (id) => {
    const confirmed = await confirmAction(
      "Delete this event? This action cannot be undone.",
      {
        title: "Delete Event",
        confirmText: "Delete",
        cancelText: "Cancel",
      }
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      await api.delete(`/events/${id}`);

      notify(
        "Event deleted successfully.",
        "success"
      );

      loadEvents();
    } catch (error) {
      console.log(error);

      notify(
        error.response?.data?.message ||
          "Failed to delete event.",
        "error"
      );
    } finally {
      setDeletingId(null);
    }
  };

  // LOAD EVENTS
  const loadEvents = async () => {
    try {
      setLoadingEvents(true);

      const res = await api.get("/events");

      setEvents(res.data);
    } catch (error) {
      console.log(error);

      notify(
        error.response?.data?.message ||
          "Failed to load events.",
        "error"
      );
    } finally {
      setLoadingEvents(false);
    }
  };

  // OPEN EDIT MODAL
  const openEditModal = (event) => {
    setEditingEvent(event);

    setEditTitle(event.title || "");
    setEditDescription(
      event.description || ""
    );
    setEditContent(event.content || "");
    setEditDate(event.eventDate || "");
  };

  // UPDATE EVENT
  const handleUpdateEvent = async () => {
    if (!editingEvent?.id) {
      notify(
        "No event selected for editing.",
        "error"
      );
      return;
    }

    const trimmedTitle = editTitle.trim();
    const trimmedDescription =
      editDescription.trim();
    const trimmedContent = editContent.trim();

    if (!trimmedTitle) {
      notify(
        "Please enter the event title.",
        "warning"
      );
      return;
    }

    if (!trimmedDescription) {
      notify(
        "Please enter a short description.",
        "warning"
      );
      return;
    }

    if (trimmedDescription.length > 250) {
      notify(
        "The short description cannot exceed 250 characters.",
        "warning"
      );
      return;
    }

    if (!trimmedContent) {
      notify(
        "Please enter the full event content.",
        "warning"
      );
      return;
    }

    if (!editDate) {
      notify(
        "Please select the event date.",
        "warning"
      );
      return;
    }

    try {
      setEditLoading(true);

      await api.put(
        `/events/${editingEvent.id}`,
        {
          title: trimmedTitle,
          description: trimmedDescription,
          content: trimmedContent,
          eventDate: editDate,
        }
      );

      notify(
        "Event updated successfully.",
        "success"
      );

      setEditingEvent(null);

      loadEvents();
    } catch (error) {
      console.log(error);

      notify(
        error.response?.data?.message ||
          "Failed to update event.",
        "error"
      );
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-purple-700 to-purple-900 text-white p-5 sm:p-6 rounded-3xl shadow-xl mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Create School Event
          </h1>

          <p className="mt-2 text-purple-100 text-sm sm:text-base leading-6">
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
          <div className="bg-white rounded-3xl shadow-lg p-4 sm:p-6">
            <h2 className="text-xl font-bold mb-6 text-purple-800">
              Event Information
            </h2>

            <div className="space-y-5">

              <input
                type="text"
                placeholder="Event Title"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                  maxLength={250}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-y"
                />

                <p className="text-right text-sm text-gray-500 mt-1">
                  {description.length}/250
                </p>
              </div>

              <textarea
                placeholder="Full Event Content..."
                value={content}
                onChange={(e) =>
                  setContent(e.target.value)
                }
                rows="12"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-y"
              />

              <input
                type="date"
                value={eventDate}
                onChange={(e) =>
                  setEventDate(e.target.value)
                }
                className="w-full sm:w-auto border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

            </div>
          </div>

          {/* IMAGE UPLOAD */}
          <div className="bg-white rounded-3xl shadow-lg p-4 sm:p-6">
            <h2 className="text-xl font-bold mb-6 text-purple-800">
              Event Images
            </h2>

            <label
              htmlFor="event-images"
              className="border-2 border-dashed border-purple-300 rounded-2xl p-8 sm:p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-purple-50 transition text-center"
            >
              <span className="text-purple-700 font-semibold">
                Click to Upload Images
              </span>

              <span className="text-gray-500 text-sm mt-2">
                Multiple images supported
              </span>

              <input
                id="event-images"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {/* IMAGE PREVIEWS */}
            {previewImages.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
                {previewImages.map(
                  (image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Event preview ${index + 1}`}
                      className="h-28 sm:h-32 w-full object-cover rounded-xl shadow"
                    />
                  )
                )}
              </div>
            )}
          </div>

          {/* LIVE PREVIEW */}
          <div className="bg-white rounded-3xl shadow-lg p-4 sm:p-6">
            <h2 className="text-xl font-bold mb-6 text-purple-800">
              Preview
            </h2>

            <div className="border rounded-2xl overflow-hidden">

              {previewImages[0] && (
                <img
                  src={previewImages[0]}
                  alt="Event preview"
                  className="w-full h-48 sm:h-64 md:h-72 object-cover"
                />
              )}

              <div className="p-4 sm:p-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-purple-800 break-words">
                  {title || "Event Title"}
                </h3>

                <p className="text-gray-500 mt-2">
                  {eventDate || "Event date"}
                </p>

                <p className="mt-4 text-gray-700 leading-7 whitespace-pre-line">
                  {description ||
                    "Short description appears here..."}
                </p>
              </div>

            </div>
          </div>

          {/* SUBMIT */}
          <div className="flex justify-stretch sm:justify-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-purple-700 hover:bg-purple-800 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading
                ? "Publishing..."
                : "Publish Event"}
            </button>
          </div>
        </form>
      </div>

      {/* EXISTING EVENTS */}
      <div className="max-w-5xl mx-auto mt-12 bg-white rounded-3xl shadow-lg p-4 sm:p-6">
        <h2 className="text-2xl font-bold text-purple-800 mb-6">
          Existing Events
        </h2>

        {loadingEvents ? (
          <div className="text-center py-8 text-gray-500">
            Loading events...
          </div>
        ) : events.length === 0 ? (
          <p className="text-gray-500 py-4">
            No events created yet.
          </p>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="border rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div className="min-w-0">
                  <h3 className="font-bold text-lg sm:text-xl text-purple-800 break-words">
                    {event.title}
                  </h3>

                  <p className="text-gray-500 mt-1">
                    {event.eventDate}
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    Images:{" "}
                    {event.images?.length || 0}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <button
                    onClick={() =>
                      openEditModal(event)
                    }
                    disabled={
                      deletingId === event.id
                    }
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl transition disabled:opacity-60"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(event.id)
                    }
                    disabled={
                      deletingId === event.id
                    }
                    className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-xl transition disabled:opacity-60"
                  >
                    {deletingId === event.id
                      ? "Deleting..."
                      : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* EDIT MODAL */}
      {editingEvent && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl p-4 sm:p-6 max-h-[92vh] overflow-y-auto">

            <div className="flex items-start justify-between gap-4 mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-purple-800">
                Edit Event
              </h2>

              <button
                type="button"
                onClick={() =>
                  setEditingEvent(null)
                }
                className="text-gray-400 hover:text-gray-700 text-2xl leading-none"
                aria-label="Close edit modal"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">

              <input
                type="text"
                value={editTitle}
                onChange={(e) =>
                  setEditTitle(
                    e.target.value
                  )
                }
                placeholder="Event Title"
                className="w-full border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <div>
                <textarea
                  rows="3"
                  maxLength={250}
                  value={editDescription}
                  onChange={(e) =>
                    setEditDescription(
                      e.target.value
                    )
                  }
                  placeholder="Short Description"
                  className="w-full border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-y"
                />

                <p className="text-right text-sm text-gray-500 mt-1">
                  {editDescription.length}/250
                </p>
              </div>

              <textarea
                rows="8"
                value={editContent}
                onChange={(e) =>
                  setEditContent(
                    e.target.value
                  )
                }
                placeholder="Full Event Content"
                className="w-full border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-y"
              />

              <input
                type="date"
                value={editDate}
                onChange={(e) =>
                  setEditDate(
                    e.target.value
                  )
                }
                className="w-full sm:w-auto border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-6">

              <button
                type="button"
                onClick={() =>
                  setEditingEvent(null)
                }
                disabled={editLoading}
                className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 px-5 py-3 rounded-xl disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleUpdateEvent}
                disabled={editLoading}
                className="w-full sm:w-auto bg-purple-700 hover:bg-purple-800 text-white px-5 py-3 rounded-xl disabled:opacity-60"
              >
                {editLoading
                  ? "Saving..."
                  : "Save Changes"}
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageEvents;