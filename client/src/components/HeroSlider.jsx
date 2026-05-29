import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

const slides = [
  {
    image: "/school-building.jpg",
    title: "World Class Education",
    subtitle: "Preparing children for global excellence."
  },
  {
    image: "/pupils-line-up.jpg",
    title: "Learning Beyond The Classroom",
    subtitle: "Sports, creativity and innovation."
  },
  {
    image: "/smart-school.jpg",
    title: "Modern Smart Learning",
    subtitle: "Technology-driven education system."
  },
  {
    image: "/reading-pose.png",
    title: "Sound Reading Culture",
    subtitle: "We make reading and learning a culture."
  }
];

function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const x = useMotionValue(0);
  const parallax = useTransform(x, [-100, 100], [-20, 20]);

  const startX = useRef(0);
  const currentX = useRef(0);

  // AUTO SLIDE
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [paused]);

  const next = () =>
    setCurrent((prev) => (prev + 1) % slides.length);

  const prev = () =>
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );

  // 🧠 FIXED SWIPE LOGIC
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    currentX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = startX.current - currentX.current;

    if (diff > 60) next();
    if (diff < -60) prev();
  };

  return (
    <section
      className="relative h-screen overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url("${slides[current].image}")`,
            y: parallax // 🔥 REAL PARALLAX SHIFT
          }}
        >
          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/60" />

          {/* CONTENT */}
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-6 text-white">

              <motion.h1
                key={slides[current].title}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-extrabold max-w-4xl leading-tight"
              >
                {slides[current].title}
              </motion.h1>

              <motion.p
                key={slides[current].subtitle}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-8 text-xl text-gray-200 max-w-2xl"
              >
                {slides[current].subtitle}
              </motion.p>

            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* DOTS */}
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