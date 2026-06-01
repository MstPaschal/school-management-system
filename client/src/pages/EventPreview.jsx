import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import api from "../services/api";

function EventPreview() {

  const { id } =
    useParams();

  const [event, setEvent] =
    useState(null);

  useEffect(() => {

    loadEvent();

  }, []);

  const loadEvent =
    async () => {

      try {

        const res =
          await api.get(
            `/events/${id}`
          );

        setEvent(res.data);

      } catch (error) {

        console.log(error);

      }

    };

  if (!event) {

    return (
      <PublicLayout>

        <div className="p-10">

          Loading...

        </div>

      </PublicLayout>
    );

  }

  return (

    <PublicLayout>

      <section className="py-20">

        <div className="max-w-5xl mx-auto px-6">

          <h1 className="text-5xl font-bold text-purple-800 mb-6">

            {event.title}

          </h1>

          <p className="text-gray-500 mb-8">

            Posted on{" "}
            {
              new Date(
                event.createdAt
              ).toLocaleDateString()
            }

          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-10">

            {
              event.images?.map(
                (image, index) => (

                  <img
                    key={index}
                    src={image}
                    alt=""
                    className="rounded-2xl shadow-lg"
                  />

                )
              )
            }

          </div>

          <div className="prose max-w-none">

            <p className="text-lg leading-9">

              {event.content}

            </p>

          </div>

        </div>

      </section>

    </PublicLayout>

  );

}

export default EventPreview;