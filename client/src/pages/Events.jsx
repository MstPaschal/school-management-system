import PublicLayout from "../layouts/PublicLayout";

function Events() {

  return (

    <PublicLayout>

      <section className="py-20">

        <div className="max-w-6xl mx-auto px-6">

          <h1 className="text-5xl font-bold text-purple-800 mb-10">

            School Events

          </h1>

          <div className="grid md:grid-cols-3 gap-8">

            {[1,2,3].map((item) => (

              <div
                key={item}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >

                <img
                  src="/event.jpg"
                  alt="event"
                  className="h-60 w-full object-cover"
                />

                <div className="p-6">

                  <h2 className="text-2xl font-bold text-purple-700">

                    Inter-House Sports

                  </h2>

                  <p className="mt-4 text-gray-600">

                    Exciting activities and competitions.

                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

    </PublicLayout>

  );

}

export default Events;