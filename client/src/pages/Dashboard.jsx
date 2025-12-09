import { FilePenIcon, LoaderCircleIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloudIcon, XIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { dummyResumeData } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import api from '../configs/api.js'
import pdfToText from 'react-pdftotext'

const Dashboard = () => {

  const {user, token} = useSelector(state => state.auth)
  const [isLoading, setIsLoading] = useState(false)

  // State
  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setitle] = useState('');
  const [resume, setresume] = useState(null);
  const [editResumeId, setResumeId] = useState('');
  const navigate = useNavigate();


  const createResume = async (event) => {
    try {
      event.preventDefault()
      const { data } = await api.post('/api/resumes/create', { title }, {headers:{Authorization: token}})
      setAllResumes([...allResumes, data.resume])
      setitle('')
      setShowCreateResume(false)
      navigate(`/app/builder/${data.resume._id}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const uploadResume = async (event) => {
    event.preventDefault();
    setIsLoading(true)
    try {
      const resumeText = await pdfToText(resume)
      const { data } = await api.post('/api/ai/upload-resume', { title, resumeText }, {headers:{Authorization: token}})
      setAllResumes([...allResumes, data.resume])
      setitle('')
      setresume(null)
      setShowUploadResume(false)
      navigate(`/app/builder/${data.resumeId}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
    setIsLoading(false)
  }

  const editTitle = async (event) => {
    try {
      event.preventDefault();
      const { data } = await api.put(`/api/resumes/update/`, {resumeId: editResumeId, resumeData: {title}},{headers:{Authorization: token}}) 
      setAllResumes(allResumes.map(resume => resume._id === editResumeId? {...resume, title} : resume))
      setitle('')
      setResumeId('')
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
    // setResumeId('');
  }

  const deteleResume = async (resumeId) => {
    // setAllResumes(prev => prev.filter(resume => resume._id !== resumeId))
    try {
      const confirm = window.confirm("Are you sure you want to delete this resume?");
      if (confirm) {
        const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, {headers:{Authorization: token}}) 
        setAllResumes(allResumes.filter(resume => resume._id !== resumeId))
        toast.success(data.message)
        
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  // Colors for cycling background colors (you forgot this)
  const colors = ["#EEF2FF", "#E0E7FF", "#C7D2FE", "#6366F1"];

  // Load dummy data
// Load resumes from API
const loadAllResumes = async () => {
  if (!api) {
    console.error('API instance is not available. Check your import.');
    toast.error('API configuration error – please refresh the page.');
    return;
  }
  try {
    const { data } = await api.get('/api/users/resumes', { headers: { Authorization: token } });
    setAllResumes(data.resumes || []);
  } catch (error) {
    console.error('Error loading resumes:', error);
    toast.error(error?.response?.data?.message || 'Failed to load resumes');
    setAllResumes([]); // Fallback to empty array on error
  }
};

// Fetch resumes on component mount
useEffect(() => {
  if (token) {
    loadAllResumes();
  }
}, [token]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex flex-col items-center px-4 py-10">

      {/* Welcome */}
      <div className="w-full max-w-2xl text-left mb-8">
        <h1 className="text-3xl font-semibold text-zinc-900 dark:text-white">
          Welcome, Rishabh 👋
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mt-1">
          Manage your resumes easily.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">

        {/* Create Resume */}
        <button onClick={() => setShowCreateResume(true)} className="flex items-center gap-3 p-6 rounded-2xl 
            bg-white dark:bg-zinc-900 border border-zinc-300/50 dark:border-zinc-700 
            shadow-sm hover:shadow-md transition-all hover:scale-[1.02]">

          <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-500/20">
            <PlusIcon className="text-indigo-600 dark:text-indigo-400" size={22} />
          </div>

          <div className="text-left">
            <p className="text-lg font-medium text-zinc-900 dark:text-white">
              Create Resume
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Build a new professional resume
            </p>
          </div>
        </button>

        {/* Upload Existing */}
        <button onClick={() => setShowUploadResume(true)} disabled={isLoading} className="flex items-center gap-3 p-6 rounded-2xl 
            bg-white dark:bg-zinc-900 border border-zinc-300/50 dark:border-zinc-700 
            shadow-sm hover:shadow-md transition-all hover:scale-[1.02]">

          <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-500/20">
            <UploadCloudIcon className="text-indigo-600 dark:text-indigo-400" size={22} />
          </div>

          <div className="text-left">
            <p className="text-lg font-medium text-zinc-900 dark:text-white">
              {isLoading && <LoaderCircleIcon className='animate-spin size-4 text-white'/>}
              {isLoading ? 'uploading...' : 'upload resume'}
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Import your current resume file
            </p>
          </div>
        </button>

      </div>

      {/* Divider */}
      <hr className="w-full max-w-2xl my-10 border-zinc-300/40 dark:border-zinc-700" />

      {/* Resume List */}
      <div className="w-full max-w-2xl space-y-4">
        {allResumes.map((resume, index) => {
          const basecolor = colors[index % colors.length];
          return (
            <button
              key={index}
              onClick={()=>navigate(`/app/builder/${resume._id}`)}
              className="flex justify-between items-center w-full p-5 rounded-xl 
              bg-white dark:bg-zinc-900 border border-zinc-300/50 dark:border-zinc-700 
              hover:shadow-md transition-all"
            >
              {/* Left Section */}
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full" style={{ background: basecolor }}>
                  <FilePenIcon className="text-indigo-600 dark:text-indigo-400" size={20} />
                </div>
                <div className="text-left">
                  <p className="text-lg font-medium text-zinc-900 dark:text-white">{resume.title}</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Icons */}
              <div onClick={e=> e.stopPropagation()} className="flex items-center gap-4">
                <TrashIcon onClick={()=> deteleResume(resume._id)} className="text-red-500 cursor-pointer" size={18} />
                <PencilIcon onClick={()=> {setResumeId(resume._id);setitle(resume.title)}} className="text-indigo-500 cursor-pointer" size={18} />
              </div>
            </button>
          )
        })}

        <div>
          {showCreateResume && (
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={() => setShowCreateResume(false)} // clicking background closes modal
            >
              <form
                onSubmit={createResume}
                onClick={(e) => e.stopPropagation()} // STOP CLICK FROM CLOSING POPUP
                className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-lg w-[90%] max-w-md border border-zinc-300/50 dark:border-zinc-700"
              >
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">Create a Resume</h2>

                <input
                  type="text"
                  placeholder="Enter Resume Title"
                  value={title}
                  onChange={(e) => setitle(e.target.value)}
                  className="w-full p-3 border border-zinc-300 dark:border-zinc-700 rounded-xl mb-4 bg-transparent text-zinc-900 dark:text-white"
                  required
                />

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition"
                >
                  Create Resume
                </button>

                <XIcon
                  className="absolute top-4 right-4 text-zinc-500 cursor-pointer hover:text-zinc-700"
                  onClick={() => setShowCreateResume(false)}
                />
              </form>
            </div>
          )}

          
            { showUploadResume && (
              <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
                onClick={() => setShowUploadResume(false)}
              >
                <form
                  onSubmit={uploadResume}
                  onClick={(e) => e.stopPropagation()}
                  className="relative bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-lg w-[90%] max-w-md 
                border border-zinc-300/50 dark:border-zinc-700"
                >
                  <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">Upload Resume</h2>

                  <input
                    type="text"
                    placeholder="Enter Resume Title"
                    value={title}
                    onChange={(e) => setitle(e.target.value)}
                    className="w-full p-3 border border-zinc-300 dark:border-zinc-700 rounded-xl mb-4 bg-transparent text-zinc-900 dark:text-white"
                    required
                  />

                  {/* File Upload Box */}
                  <label
                    htmlFor="resume-input"
                    className="flex flex-col items-center justify-center gap-2 p-6 rounded-xl border 
                   border-dashed border-zinc-400 dark:border-zinc-600 cursor-pointer hover:bg-zinc-100/50 
                   dark:hover:bg-zinc-800 transition mb-4"
                  >
                    <UploadCloudIcon size={28} className="text-indigo-500" />
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {resume ? resume.name : "Upload Resume"}
                    </p>
                  </label>

                  <input
                    type="file"
                    id="resume-input"
                    className="hidden"
                    accept='.pdf'
                    onChange={(e) => setresume(e.target.files[0])}
                  />

                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition"
                  >
                    Upload Resume
                  </button>

                  <XIcon
                    className="absolute top-4 right-4 text-zinc-500 cursor-pointer hover:text-zinc-700"
                    onClick={() => setShowUploadResume(false)}
                  />
                </form>
              </div>
            )
          }

          {editResumeId && (
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={() => setResumeId(false)} // clicking background closes modal
            >
              <form
                onSubmit={editTitle}
                onClick={(e) => e.stopPropagation()} // STOP CLICK FROM CLOSING POPUP
                className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-lg w-[90%] max-w-md border border-zinc-300/50 dark:border-zinc-700"
              >
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">Edit Resume title</h2>

                <input
                  type="text"
                  placeholder="Enter Resume Title"
                  value={title}
                  onChange={(e) => setitle(e.target.value)}
                  className="w-full p-3 border border-zinc-300 dark:border-zinc-700 rounded-xl mb-4 bg-transparent text-zinc-900 dark:text-white"
                  required
                />

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition"
                >
                  Update
                </button>

                <XIcon
                  className="absolute top-4 right-4 text-zinc-500 cursor-pointer hover:text-zinc-700"
                  onClick={() => setResumeId('')}
                />
              </form>
            </div>
          )}


        </div>
      </div>

    </div>
  )
}

export default Dashboard
