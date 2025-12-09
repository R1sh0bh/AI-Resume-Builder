import React, { useEffect, useRef } from "react";

const testimonials = [
  {
    name: "Aarav Mishra",
    role: "Software Engineer Intern",
    quote:
      "The AI Resume Builder improved my resume and helped me land interviews much faster.",
  },
  {
    name: "Priya Sharma",
    role: "Full-Stack Developer",
    quote:
      "The job-description matching feature is incredibly accurate and useful.",
  },
  {
    name: "Karan Patel",
    role: "CS Student",
    quote:
      "Simple UI, great guidance, and fast results. Saved me hours.",
  },
  {
    name: "Neha Verma",
    role: "Data Analyst",
    quote:
      "Keyword extraction helped tailor my resume perfectly for every job.",
  },
];

const Testimonials = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    let index = 0;

    const interval = setInterval(() => {
      if (!slider) return;

      index++;
      if (index >= testimonials.length) {
        index = 0;
      }

      slider.scrollTo({
        left: index * 360, // width of card (min-w-[350px] + gap)
        behavior: "smooth",
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="testomonials" className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold text-indigo-400">
            Don’t just take our word for it
          </h2>

          <p className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Loved by developers, students & job seekers
          </p>

          <p className="mt-6 text-lg text-gray-300">
            Real feedback from people who used our AI Resume Builder to boost their careers.
          </p>
        </div>

        {/* Auto Sliding Horizontal Scroll */}
        <div className="mt-16 overflow-x-auto scrollbar-hide" ref={sliderRef}>
          <div className="flex gap-6 px-2 pb-4">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="
                  min-w-[350px] bg-gray-800 p-8 rounded-2xl shadow-md 
                  hover:bg-gray-700 transition-all duration-300
                "
              >
                <p className="text-gray-300 italic">“{t.quote}”</p>

                <div className="mt-6">
                  <p className="text-white font-semibold">{t.name}</p>
                  <p className="text-indigo-400 text-sm">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Testimonials;
