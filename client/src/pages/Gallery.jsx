import PublicLayout from "../layouts/PublicLayout";

function Gallery() {

  return (

    <PublicLayout>

      {/* HERO */}
      <section className="relative h-[400px]">
        <img
          src="/school-building.jpg"
          alt="Grisfield Schools"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h1 className="text-5xl md:text-6xl font-bold">
              Grisfield Schools
            </h1>

            <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
              Raising academically excellent, morally upright
              and globally competitive children.
            </p>
          </div>
        </div>
      </section>

    </PublicLayout>

  );

}

export default Gallery;