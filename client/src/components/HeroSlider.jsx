import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    image: "/school-building.jpg",
    title: "World Class Education",
    subtitle: "Preparing children for global excellence."
  },
  {
    image: "/event.jpg",
    title: "Learning Beyond The Classroom",
    subtitle: "Sports, creativity and innovation."
  },
  {
    image: "/smart-school.jpg",
    title: "Modern Smart Learning",
    subtitle: "Technology-driven education system."
  }
];

function HeroSlider() {
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // Preload images (prevents flicker)
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  return (
    <section className="relative h-screen overflow-hidden bg-black">

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url("${slides[current].image}")`
          }}
        >
          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/60" />

          {/* TEXT CONTENT */}
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-6 text-white">

              <motion.h1
                key={slides[current].title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-extrabold max-w-4xl leading-tight"
              >
                {slides[current].title}
              </motion.h1>

              <motion.p
                key={slides[current].subtitle}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-8 text-xl text-gray-200 max-w-2xl"
              >
                {slides[current].subtitle}
              </motion.p>

            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* DOT INDICATORS */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current
                ? "bg-white scale-125"
                : "bg-white/40"
            }`}
          />
        ))}
      </div>

    </section>
  );
}

export default HeroSlider;