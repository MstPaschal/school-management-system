import PublicLayout from "../layouts/PublicLayout";

function Gallery() {

  return (

    <PublicLayout>

      <section className="py-20 bg-gray-50">

        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl font-bold text-purple-800 text-center mb-14">

            Gallery

          </h1>

          <div className="grid md:grid-cols-3 gap-6">

            {[1,2,3,4,5,6].map((item) => (

              <img
                key={item}
                src="/event.jpg"
                alt="gallery"
                className="rounded-2xl shadow-lg h-72 w-full object-cover"
              />

            ))}

          </div>

        </div>

      </section>

    </PublicLayout>

  );

}

export default Gallery;