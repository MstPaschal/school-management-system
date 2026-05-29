import PublicLayout from "../layouts/PublicLayout";

function About() {

  return (

    <PublicLayout>

      <section className="py-20 bg-white">

        <div className="max-w-6xl mx-auto px-6">

          <h1 className="text-5xl font-bold text-purple-800 mb-8">

            About Grisfield Schools

          </h1>

          <p className="text-lg text-gray-700 leading-9">

            Grisfield Schools is committed to raising
            academically excellent and morally upright
            children prepared for the future.

          </p>

        </div>

      </section>

    </PublicLayout>

  );

}

export default About;