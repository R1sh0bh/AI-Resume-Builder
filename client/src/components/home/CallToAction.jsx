import { Link, User } from 'lucide-react'
import React from 'react'

const CallToAction = () => {
  return (
    <div id="cta" className="bg-gray-900 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        
        {/* Heading */}
        <h2 className="text-base font-semibold text-indigo-400">
          AI Powered
        </h2>

        <p className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          AI Resume Builder
        </p>

        <p className="mt-6 text-lg text-gray-300">
          Build your perfect resume faster with AI-driven suggestions, keyword optimization, and job-matching features designed to help you land interviews quickly.
        </p>

      </div>
      
    </div>
  )
}

export default CallToAction
