import React from "react";
import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "AI-Powered Resume Optimization",
    description:
      "Automatically analyze your resume and improve wording, formatting, and impact using advanced language models.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Instant Job Description Matching",
    description:
      "Upload any job description and instantly see match score, skill gaps, and tailored suggestions to boost ATS ranking.",
    icon: LockClosedIcon,
  },
  {
    name: "Smart Keyword Extraction",
    description:
      "AI detects missing technical and soft skills from the JD and recommends keywords to make your resume stand out.",
    icon: ArrowPathIcon,
  },
  {
    name: "Privacy-Focused Document Handling",
    description:
      "Your resume stays secure with on-device processing and encrypted uploads — no data stored or shared.",
    icon: FingerPrintIcon,
  },
];

const Features = () => {
  return (
    <div id="features" className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-indigo-400">
            Powered by AI
          </h2>

          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl lg:text-balance">
            Smarter ways to build your perfect resume
          </p>

          <p className="mt-6 text-lg/8 text-gray-300">
            Enhance your resume instantly with AI suggestions, job–matching,
            keyword extraction, and more — all designed to help you land your
            next interview faster.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-white">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-500">
                    <feature.icon
                      aria-hidden="true"
                      className="size-6 text-white"
                    />
                  </div>
                  {feature.name}
                </dt>

                <dd className="mt-2 text-base/7 text-gray-400">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features;
