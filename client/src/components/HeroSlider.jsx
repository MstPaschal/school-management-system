import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

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
  const parallax = useTransform(x, [-150, 150], [-25, 25]);

  const startX = useRef(0);
  const moveX = useRef(0);

  // AUTO SLIDE
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6500);

    return () => clearInterval(interval);
  }, [paused]);

  const next = () =>
    setCurrent((prev) => (prev + 1) % slides.length);

  const prev = () =>
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );

  // FIXED SWIPE (Instagram-style)
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    moveX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = startX.current - moveX.current;

    if (diff > 60) next();
    if (diff < -60) prev();
  };

  return (
    <section
      className="relative h-screen overflow-hidden bg-black"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >

      {/* 🔥 STACKED SLIDES (NO BLANK SCREEN) */}
      {slides.map((slide, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url("${slide.image}")`,
            zIndex: index === current ? 2 : 1,
            opacity: index === current ? 1 : 0,
            scale: index === current ? 1 : 1.1,
            y: index === current ? parallax : 0,
            transition: "all 1.2s ease"
          }}
        >
          {/* SOFT DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

          {/* CONTENT */}
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-6 text-white">

              <motion.h1
                key={slide.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: index === current ? 1 : 0, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-extrabold max-w-4xl leading-tight"
              >
                {slide.title}
              </motion.h1>

              <motion.p
                key={slide.subtitle}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: index === current ? 1 : 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-8 text-xl text-gray-200 max-w-2xl"
              >
                {slide.subtitle}
              </motion.p>

            </div>
          </div>
        </motion.div>
      ))}

      {/* 🔥 PROGRESS INDICATOR (SaaS feel) */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
        <motion.div
          key={current}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6.5, ease: "linear" }}
          className="h-full bg-white/70"
        />
      </div>

      {/* DOT NAVIGATION */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current
                ? "bg-white scale-125"
                : "bg-white/30"
            }`}
          />
        ))}
      </div>

    </section>
  );
}

export default HeroSlider;