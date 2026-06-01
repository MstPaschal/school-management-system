import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import api from "../services/api";

function Events() {

  const [events, setEvents] =
    useState([]);

  const [sortOrder, setSortOrder] =
    useState("newest");

  useEffect(() => {

    loadEvents();

  }, []);

  const loadEvents =
    async () => {

      try {

        const res =
          await api.get("/events");

        setEvents(res.data);

      } catch (error) {

        console.log(error);

      }

    };

  const sortedEvents =
    [...events].sort((a, b) => {

      if (sortOrder === "newest") {

        return (
          new Date(b.createdAt) -
          new Date(a.createdAt)
        );

      }

      return (
        new Date(a.createdAt) -
        new Date(b.createdAt)
      );

    });

  return (

    <PublicLayout>

      <section className="py-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="flex justify-between items-center mb-10">

            <h1 className="text-5xl font-bold text-purple-800">

              School Events

            </h1>

            <select
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(
                  e.target.value
                )
              }
              className="border rounded-lg px-4 py-2"
            >

              <option value="newest">

                Newest First

              </option>

              <option value="oldest">

                Oldest First

              </option>

            </select>

          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {
              sortedEvents.map(
                (event) => (

                  <Link
                    key={event.id}
                    to={`/events/${event.id}`}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
                  >

                    <img
                      src={
                        event.images?.length
                          ? event.images[0]
                          : "/event.jpg"
                      }
                      alt={event.title}
                      className="h-60 w-full object-cover"
                    />

                    <div className="p-6">

                      <h2 className="text-2xl font-bold text-purple-700">

                        {event.title}

                      </h2>

                      <p className="mt-4 text-gray-600">

                        {
                          event.description?.slice(
                            0,
                            100
                          )
                        }...

                      </p>

                    </div>

                  </Link>

                )
              )
            }

          </div>

        </div>

      </section>

    </PublicLayout>

  );

}

export default Events;