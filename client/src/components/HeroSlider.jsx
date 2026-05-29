import {
  useEffect,
  useState
} from "react";

import {
  motion,
  AnimatePresence
} from "framer-motion";

const slides = [

  {
    image: "/School Building.jpg",
    title: "World Class Education",
    subtitle:
      "Preparing children for global excellence."
  },

  {
    image: "/event.jpg",
    title: "Learning Beyond The Classroom",
    subtitle:
      "Sports, creativity and innovation."
  },

  {
    image: "/Smart School.jpg",
    title: "Modern Smart Learning",
    subtitle:
      "Technology-driven education system."
  }

];

function HeroSlider() {

  const [current, setCurrent] =
    useState(0);

  useEffect(() => {

    const interval =
      setInterval(() => {

        setCurrent((prev) =>

          prev === slides.length - 1
            ? 0
            : prev + 1

        );

      }, 5000);

    return () =>
      clearInterval(interval);

  }, []);

  return (

    <section className="relative h-screen overflow-hidden">

      <AnimatePresence mode="wait">

        <motion.div
          key={current}
          initial={{
            opacity: 0,
            scale: 1.1
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          exit={{
            opacity: 0
          }}
          transition={{
            duration: 1.2
          }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              `url(${slides[current].image})`
          }}
        >

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/60" />

          {/* CONTENT */}
          <div className="relative z-10 h-full flex items-center">

            <div className="max-w-7xl mx-auto px-6 text-white">

              <motion.h1
                initial={{
                  y: 40,
                  opacity: 0
                }}
                animate={{
                  y: 0,
                  opacity: 1
                }}
                transition={{
                  delay: 0.3
                }}
                className="text-5xl md:text-7xl font-extrabold max-w-4xl leading-tight"
              >

                {slides[current].title}

              </motion.h1>

              <motion.p
                initial={{
                  y: 40,
                  opacity: 0
                }}
                animate={{
                  y: 0,
                  opacity: 1
                }}
                transition={{
                  delay: 0.6
                }}
                className="mt-8 text-xl text-gray-200 max-w-2xl"
              >

                {slides[current].subtitle}

              </motion.p>

            </div>

          </div>

        </motion.div>

      </AnimatePresence>

    </section>

  );

}

export default HeroSlider;