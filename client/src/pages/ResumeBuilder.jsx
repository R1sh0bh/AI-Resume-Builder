import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { dummyResumeData } from '../../assets/assets'
import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  EyeIcon,
  EyeOffIcon,
  FileText,
  FolderIcon,
  GraduationCap,
  Share2Icon,
  Sparkles,
  User
} from 'lucide-react'
import Personalinfoform from '../components/Personalinfoform'
import Resumepreview from '../components/Resumepreview'
import TemplateSelector from '../components/TemplateSelector'
import ColorPicker from '../components/ColorPicker'
import ProfessionalSummaryform from '../components/ProfessionalSummaryform'
import ExperienceForm from '../components/ExperienceForm'
import EducationForm from '../components/EducationForm'
import ProjectForm from '../components/ProjectForm'
import SkillsForm from '../components/SkillsForm'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import api from '../configs/api'  // <-- add this near other imports


const ResumeBuilder = () => {
  const { resumeId } = useParams()
  const { token } = useSelector(state => state.auth)

  // ---------------- STATE ---------------- //
  const [resumeData, setResumeData] = useState({
    _id: '',
    title: '',
    personal_info: {},
    professional_summary: '',
    experience: [],
    education: [],
    skills: [],
    project: [],
    template: "classic",
    accentColor: "#4F46E5",
    public: false
  })

  const [activeSection, setActiveSection] = useState(0)
  const [removeBackground, setRemoveBackground] = useState(false);


  // ---------------- SECTIONS ---------------- //
  const sections = [
    { id: 'personal_info', title: 'Personal Information', icon: User },
    { id: 'professional_summary', title: 'Professional Summary', icon: FileText },
    { id: 'experience', title: 'Work Experience', icon: Briefcase },
    { id: 'education', title: 'Education', icon: GraduationCap },
    { id: 'project', title: 'project', icon: FolderIcon },
    { id: 'skills', title: 'Skills', icon: Sparkles }
  ]

  const currentSection = sections[activeSection]

  // ---------------- LOAD EXISTING RESUME ---------------- //
  const loadexistingResume = async () => {

    try {
      const { data } = await api.get('/api/resumes/get/' + resumeId, { headers: { Authorization: token } })
      if (data.resume) {
        setResumeData(data.resume)
        document.title = data.resume.title;
      }
    } catch (error) {
      console.log(error.message)
    }

    // const resume = dummyResumeData.find(r => r._id === resumeId)
    // if (resume) {
    //   setResumeData(resume)
    //   document.title = resume.title
    // }
  }

  useEffect(() => {
    loadexistingResume()
  }, [])

  // ---------------- PROGRESS BAR WIDTH ---------------- //
  const progressPercentage = (activeSection / (sections.length - 1)) * 100

  // ---------------- NEXT BUTTON FADE LOGIC ---------------- //
  const fadeOpacity = 1 - (activeSection / (sections.length - 1)) * 0.6
  // fade from opacity 1 → 0.4 at last section

  const changeResumevisibility = async () => {
    try {
      const formData = new FormData()
      formData.append("resumeId", resumeId)
      formData.append("resumeData", JSON.stringify({ public: !resumeData.public }))
      const { data } = await api.put('/api/resumes/update', formData, { headers: { Authorization: token } })
      setResumeData({ ...resumeData, public: !resumeData.public })
      toast.success(data.message)
    } catch (error) {
      console.error(error, "error saving")
    }
    // setResumeData({ ...resumeData, public: !resumeData.public })
  }

  const handleshare = () => {
    const frontendurl = window.location.href.split('/app/')[0];
    const resumeurl = `${frontendurl}/view/${resumeData._id}`;

    if (navigator.share) {
      navigator.share({ url: resumeurl })
    } else {
      alert('share not supported')
    }
  }

  const downloadResume = () => {
    window.print();
  }

  const saveResume = async () => {
    try {
      let updataedResumeData = structuredClone(resumeData)

      if (typeof resumeData.personal_info.image === 'object') {
        delete updataedResumeData.personal_info.image
      }
      const formData = new FormData();
      formData.append("resumeId", resumeId)
      formData.append("resumeData", JSON.stringify(updataedResumeData))
      removeBackground && formData.append("removeBackground", "yes");
      typeof resumeData.personal_info.image === 'object' && formData.append("image", resumeData.personal_info.image)

      const { data } = await api.put('/api/resumes/update', formData, { headers: { Authorization: token } })

      setResumeData(data.resume)
      toast.success(data.message)
    } catch (error) {
      console.error("error saving", error)
    }
  }


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 px-4 py-10">

      {/* Top Back Button */}
      <div className="max-w-5xl mx-auto mb-8">
        <Link
          to="/app"
          className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          <ArrowLeftIcon size={20} />
          Back to Dashboard
        </Link>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 max-w-5xl mx-auto">

        {/* ---------------- LEFT PANEL ---------------- */}
        <div className="lg:col-span-5 min-w-[380px] shrink-0 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow border border-zinc-300/40 dark:border-zinc-700">

          {/* Section Title */}
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
            {currentSection.title}
          </h2>

          {/* Progress bar */}
          <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full mb-6 overflow-hidden">
            <div
              className="h-full bg-indigo-600 dark:bg-indigo-500 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div>
            <TemplateSelector selectedTemplate={resumeData.template} onChange={(template) => setResumeData(prev => ({ ...prev, template }))} />
            <ColorPicker selectedColor={resumeData.accentColor} onChange={(color) => setResumeData(prev => ({ ...prev, accentColor: color }))} />
          </div>
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">

            {/* Previous */}
            <button
              onClick={() => setActiveSection(prev => Math.max(prev - 1, 0))}
              disabled={activeSection === 0}
              className={`
    flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium transition-all

    ${activeSection === 0
                  ? "bg-zinc-300 text-white dark:bg-zinc-700 opacity-70 cursor-not-allowed"  // disabled is dull but visible
                  : "bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 shadow-sm"} // active clearly pops
  `}
            >
              <ChevronLeft size={18} /> Previous
            </button>


            {/* Next with opacity fade */}
            <button
              onClick={() =>
                setActiveSection(prev => Math.min(prev + 1, sections.length - 1))
              }
              disabled={activeSection === sections.length - 1}
              style={{ opacity: fadeOpacity }}
              className={`flex items-center gap-1 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm transition-all
                ${activeSection === sections.length - 1
                  ? "cursor-not-allowed"
                  : "hover:bg-indigo-700"}
              `}
            >
              Next <ChevronRight size={18} />
            </button>



          </div>
          <div className="space-y-6">
            {currentSection.id === 'personal_info' && (
              <Personalinfoform
                data={resumeData.personal_info}
                onchange={(data) =>
                  setResumeData(prev => ({ ...prev, personal_info: data }))
                }
                removeBackground={removeBackground}
                setRemoveBackground={setRemoveBackground}
              />
            )}
            {currentSection.id === 'professional_summary' && (
              <ProfessionalSummaryform data={resumeData.professional_summary} onChange={(data) => setResumeData(prev => ({ ...prev, professional_summary: data }))} setResumeData={setResumeData} />
            )

            }

            {currentSection.id === 'experience' && (
              <ExperienceForm data={resumeData.experience} onChange={(data) => setResumeData(prev => ({ ...prev, experience: data }))} setResumeData={setResumeData} />
            )}

            {currentSection.id === 'education' && (
              <EducationForm data={resumeData.education} onChange={(data) => setResumeData(prev => ({ ...prev, education: data }))} setResumeData={setResumeData} />
            )}

            {currentSection.id === 'project' && (
              <ProjectForm
                data={resumeData.project}
                onChange={(project) => setResumeData(prev => ({ ...prev, project }))}
              />
            )}


            {currentSection.id === 'skills' && (
              <SkillsForm data={resumeData.skills} onChange={(data) => setResumeData(prev => ({ ...prev, skills: data }))} setResumeData={setResumeData} />
            )}


          </div>
          <button
            onClick={() => {
              toast.promise(
                saveResume(), // <-- CALL the function to get the promise
                {
                  loading: 'Saving...',
                  success: 'Saved!',
                  error: 'Save failed'
                }
              );
            }}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 text-white ..."
          >
            Save changes
          </button>

        </div>

        {/* ---------------- RIGHT PANEL ---------------- */}
        <div className="lg:col-span-7 max-lg:mt-6 relative">

          <div className="absolute right-4 top-4 z-20 flex gap-2">

            {resumeData.public && (
              <button
                onClick={handleshare}
                className="px-3 py-1.5 flex items-center gap-1 text-xs font-medium
      bg-indigo-600 text-white rounded-lg
      hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600
      shadow-sm hover:shadow-md transition-all"
              >
                <Share2Icon size={14} /> Share
              </button>
            )}

            <button
              onClick={changeResumevisibility}
              className="px-3 py-1.5 flex items-center gap-1 text-xs font-medium
      bg-zinc-900 dark:bg-zinc-700 text-white rounded-lg
      hover:bg-zinc-800 dark:hover:bg-zinc-600
      shadow-sm hover:shadow-md transition-all"
            >
              {resumeData.public ? <EyeIcon size={14} /> : <EyeOffIcon size={14} />}
              {resumeData.public ? "Public" : "Private"}
            </button>

            <button
              onClick={downloadResume}
              className="px-3 py-1.5 flex items-center gap-1 text-xs font-medium
      bg-green-600 text-white rounded-lg
      hover:bg-green-700 dark:hover:bg-green-500
      shadow-sm hover:shadow-md transition-all"
            >
              <DownloadIcon size={14} /> Download
            </button>

          </div>

          <Resumepreview data={resumeData} template={resumeData.template} accentColor={resumeData.accentColor} />
        </div>

      </div>

      {/* </div> */}
    </div >
  )
}

export default ResumeBuilder
