import PublicLayout from "../layouts/PublicLayout";

import { motion } from "framer-motion";

function About() {

  return (

    <PublicLayout>

      <section className="py-10 bg-amber-50">

        <div className="max-w-6xl mx-auto px-6">

            <motion.img
              initial={{
                opacity: 0,
                x: -50
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              transition={{
                duration: 1
              }}
              src="/school-building.jpg"
              alt="School"
              className="rounded-3xl shadow-2xl w-full mb-10"
            />

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

          <div className="grid md:grid-cols-4 gap-5">

            <div className="bg-amber-50 p-8 rounded-2xl shadow-lg">

              <h3 className="text-3xl font-bold mb-4 text-purple-700">

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

            <div className="bg-amber-50 p-8 rounded-2xl shadow-lg">

              <h3 className="text-3xl font-bold mb-4 text-purple-700">

                Overview

              </h3>

              <p className="text-gray-600">

                The school curriculum at Grisfield Schools is frequently updated 
                to include new and modern teaching methodologies while retaining 
                those that have proved valuable. 
                Our teachers are encouraged to exercise their judgement and 
                imagination in order to provide a stimulating classroom atmosphere. 
                Our academic programme gives particular considerations to each child's 
                capabilities and limitations. We aim for our pupils to love learning 
                as they cultivate good reading habits.

              </p>

            </div>

            <div className="bg-amber-50 p-8 rounded-2xl shadow-lg">

              <h3 className="text-3xl font-bold mb-4 text-purple-700">

                Our Vision

              </h3>

              <p className="text-gray-600">

                To provide comprehensive educational programs that 
                challenge the pupils to perform at their highest 
                potential

              </p>

            </div>

            <div className="bg-amber-50 p-8 rounded-2xl shadow-lg">

              <h3 className="text-3xl font-bold mb-4 text-purple-700">

                Our Mission

              </h3>

              <p className="text-gray-600">

                To teach and prepare each child for success by 
                engaging them in rigorous and relevant learning 
                activities that promote academic, physical and 
                emotional growth.

              </p>

            </div>

          </div>

        </div>

      </section>

    </PublicLayout>

  );

}

export default About;