import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { dummyResumeData } from '../../assets/assets'
import Resumepreview from '../components/Resumepreview'
import Loader from '../components/Loader'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import api from '../configs/api'

const Preview = () => {
  const { resumeId } = useParams()

  const [isLoading, setIsLoading] = React.useState(true)
  const [resumeData, setResumeData] = React.useState(null)

  const loadResume = async () => {
    try {
      const {data} = await api.get('/api/resume/public/' + resumeId)
      setResumeData(data.resume)
    } catch (error) {
      console.log(error.message)
    }finally{
      setIsLoading(false)
    }
    // setResumeData(dummyResumeData.find(resume => resume._id === resumeId) || null)
    // setIsLoading(false)
  }

  useEffect(() => {
    loadResume()
  }, [])

  return resumeData ? (
    /* =============== RESUME FOUND =============== */
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-950 flex justify-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md">

        <Link to="/app" className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline mb-5">
          <ArrowLeft size={20}/> Back
        </Link>

        <Resumepreview 
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accentColor}
        />
      </div>
    </div>
  ) : (
    /* =============== LOADING OR NOT FOUND =============== */
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-950 flex justify-center items-center">

      {isLoading ? (
        <Loader />
      ) : (
        <div className="text-center text-zinc-700 dark:text-zinc-300">
          <p className="text-xl font-semibold">Resume not found</p>
          <p className="text-sm opacity-70 mb-6">The resume you are looking for does not exist.</p>

          <Link
            to="/app"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg
            hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition shadow-sm"
          >
            <ArrowLeft size={18}/> Back to Home
          </Link>
        </div>
      )}

    </div>
  )
}

export default Preview
