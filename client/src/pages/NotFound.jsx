import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-5xl">

        <div className="relative overflow-hidden rounded-[2rem] bg-white border border-slate-200 shadow-xl">

          {/* Decorative background */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-blue-100/70 blur-2xl" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-orange-100/70 blur-2xl" />

          <div className="relative z-10 grid md:grid-cols-2 items-center gap-8 md:gap-12 p-7 sm:p-10 md:p-14">

            {/* ========================= */}
            {/* ILLUSTRATION */}
            {/* ========================= */}

            <div className="flex justify-center order-1">

              <div className="relative w-64 h-64 sm:w-72 sm:h-72">

                {/* Sky */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-50 to-blue-100" />

                {/* Ground */}
                <div className="absolute bottom-7 left-5 right-5 h-20 rounded-[50%] bg-slate-100" />

                {/* Sign post */}
                <div className="absolute bottom-14 left-12 w-3 h-36 bg-amber-700 rounded-full" />

                {/* HOME sign */}
                <div className="absolute top-14 left-3 rotate-[-7deg] bg-amber-500 text-white font-bold px-5 py-3 rounded-lg shadow-md">
                  HOME
                </div>

                {/* BACK sign */}
                <div className="absolute top-28 left-10 rotate-[5deg] bg-orange-500 text-white font-bold px-5 py-3 rounded-lg shadow-md">
                  BACK
                </div>

                {/* Question marks */}
                <span className="absolute top-5 right-10 text-3xl font-black text-blue-500">
                  ?
                </span>

                <span className="absolute top-16 right-3 text-xl font-black text-blue-400">
                  ?
                </span>

                {/* ========================= */}
                {/* LITTLE LOST CHARACTER */}
                {/* ========================= */}

                <div className="absolute bottom-12 right-10">

                  {/* Body */}
                  <div className="relative w-28 h-36 bg-slate-800 rounded-[48%_48%_42%_42%] shadow-lg">

                    {/* Belly */}
                    <div className="absolute bottom-3 left-4 right-4 h-24 bg-white rounded-[45%]" />

                    {/* Face */}
                    <div className="absolute top-6 left-4 right-4 h-16 bg-white rounded-full" />

                    {/* Eyes */}
                    <div className="absolute top-11 left-10 w-3 h-3 bg-slate-800 rounded-full" />
                    <div className="absolute top-11 right-10 w-3 h-3 bg-slate-800 rounded-full" />

                    {/* Beak */}
                    <div className="absolute top-16 left-1/2 -translate-x-1/2 w-7 h-4 bg-orange-400 rounded-full" />

                    {/* Wing */}
                    <div className="absolute top-16 -right-7 w-12 h-20 bg-slate-800 rounded-full rotate-[-25deg]" />
                  </div>

                  {/* Feet */}
                  <div className="absolute -bottom-2 left-3 w-9 h-5 bg-orange-400 rounded-full" />
                  <div className="absolute -bottom-2 right-3 w-9 h-5 bg-orange-400 rounded-full" />

                </div>

                {/* Rocks */}
                <div className="absolute bottom-8 left-4 w-8 h-5 bg-slate-300 rounded-full rotate-[-15deg]" />
                <div className="absolute bottom-7 right-4 w-10 h-6 bg-slate-300 rounded-full rotate-[10deg]" />

              </div>
            </div>


            {/* ========================= */}
            {/* CONTENT */}
            {/* ========================= */}

            <div className="text-center md:text-left order-2">

              {/* 404 */}
              <div className="text-[5rem] sm:text-[7rem] md:text-[8rem] leading-none font-black tracking-tight text-slate-900">
                404
              </div>

              {/* Ouch */}
              <div className="mt-2 text-4xl sm:text-5xl font-black text-orange-500">
                Ouch!
              </div>

              {/* Heading */}
              <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-slate-800">
                You just hit a dead end.
              </h1>

              {/* Description */}
              <p className="mt-4 max-w-md mx-auto md:mx-0 text-base sm:text-lg leading-7 text-slate-500">
                The page you're looking for doesn't exist, may have been
                moved, or the link you followed is no longer available.
              </p>


              {/* ========================= */}
              {/* BUTTONS */}
              {/* ========================= */}

              <div className="mt-8 flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 justify-center md:justify-start">

                {/* HOME */}
                <button
                  onClick={() => navigate("/")}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-slate-900
                    px-6
                    py-3.5
                    text-sm
                    font-bold
                    text-white
                    shadow-lg
                    transition
                    hover:bg-slate-800
                    hover:-translate-y-0.5
                    active:translate-y-0
                  "
                >
                  <span>⌂</span>
                  Go to Homepage
                </button>


                {/* BACK */}
                <button
                  onClick={() => navigate(-1)}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-slate-300
                    bg-white
                    px-6
                    py-3.5
                    text-sm
                    font-bold
                    text-slate-700
                    transition
                    hover:bg-slate-50
                    hover:-translate-y-0.5
                    active:translate-y-0
                  "
                >
                  <span>←</span>
                  Go Back
                </button>

              </div>


              {/* Hint */}
              <div className="mt-7 flex items-center justify-center md:justify-start gap-2 text-sm text-slate-400">
                <span>✦</span>
                <span>
                  Try using the navigation menu to find what you need.
                </span>
              </div>

            </div>

          </div>
        </div>


        {/* Footer */}
        <p className="mt-6 text-center text-sm text-slate-400">
          Grisfield Schools
        </p>

      </div>
    </div>
  );
}

export default NotFound;