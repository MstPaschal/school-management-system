import PublicLayout from "../layouts/PublicLayout";

function About() {

  return (

    <PublicLayout>

      <section className="py-12 bg-white">

        <div className="max-w-6xl mx-auto px-6">

          <h1 className="text-5xl font-bold text-purple-800 mb-8">

            About Grisfield Schools

          </h1>

          <h2 className="text-3xl font-bold text-purple-500 mb-5">

            Welcome to our School

          </h2>

          <p className="text-lg text-gray-700 leading-9">

            Grisfield Schools is committed to raising
            academically excellent and morally upright
            children prepared for the future.
            We welcome parents and guardians involvement 
            in the many activities of our school as we 
            believe that the best education comes when 
            there is close partnership between the school 
            and the home.

          </p>

        </div>

      </section>

      <section className="py-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white p-8 rounded-2xl shadow-lg">

              <h3 className="text-2xl font-bold mb-4 text-purple-700">

                Our History

              </h3>

              <p className="text-gray-600">

                Grisfield school was founded in the year 2021 with 
                the full approval of the Anambra state government. 
                The school has gone on to be outstanding in providing 
                the pupils with innovative and practical academic 
                experience in addition to a wide range of extracurricular 
                activities. 
                Our continuous growth and acceptance within and 
                around the environment is attributed to our well 
                structured programme as well as our crop of dedicated 
                staff who are constantly trained to be the second parents 
                to our pupils 
                The learning environment of Grisfield Schools seeks to 
                provide quality teaching and learning experience, enabling 
                all the pupils to develop skills and attitudes necessary to 
                be relevant in an ever changing global context. 

                Why not give your children the best learning experience with 
                us at Grisfield schools

              </p>

            </div>

            </div>

            </div>

            </section>

    </PublicLayout>

  );

}

export default About;