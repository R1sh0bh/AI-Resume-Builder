import { Briefcase, Loader2, Plus, Sparkles, Trash } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import api from "../configs/api";


const ExperienceForm = ({ data, onChange }) => {

  const { token } = useSelector(state => state.auth)
  const [generatingIndex, setGeneratingIndex] = useState(-1)

  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false
    };
    onChange([...data, newExperience]);
  };

  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const generateDescription = async (index) => {
    setGeneratingIndex(index)
    const experience = data[index]
    const prompt = `Enhance this job description ${experience.description} for the position of ${experience.position} at ${experience.company}`

    try {
      const { data } = await api.post('/api/ai/enhance-job-desc',{userContent: prompt}, {headers: {Authorization: token}})
      updateExperience(index, "description", data.enhancedContent)
    } catch (error) {
      toast.error(error.message)
    }finally{
      setGeneratingIndex(-1)
    }
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Work Experience</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Add your previous job roles & responsibilities.</p>
        </div>

        <button
          onClick={addExperience}
          className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          <Plus size={14} /> Add Experience
        </button>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="text-center py-6 text-zinc-500 dark:text-zinc-400">
          <Briefcase size={28} className="mx-auto mb-2 opacity-70" />
          <p>No experience added yet.</p>
          <p>Click <span className="text-indigo-500 font-semibold">Add Experience</span> to begin.</p>
        </div>
      ) : (

        <div className="space-y-6">
          {data.map((experience, index) => (
            <div key={index} className="border border-zinc-300 dark:border-zinc-700 rounded-xl p-5 space-y-4 bg-white dark:bg-zinc-900">

              {/* Title */}
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-zinc-800 dark:text-white">Experience #{index + 1}</h4>

                <button onClick={() => removeExperience(index)} className="text-red-500 hover:text-red-600 transition">
                  <Trash size={16} />
                </button>
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Company Name"
                  value={experience.company || ""}
                  onChange={(e) => updateExperience(index, "company", e.target.value)}
                  className="input-box text-black dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
                />

                <input
                  type="text"
                  placeholder="Job Title"
                  value={experience.position || ""}
                  onChange={(e) => updateExperience(index, "position", e.target.value)}
                  className="input-box text-black dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
                />

                <input
                  type="month"
                  value={experience.start_date || ""}
                  onChange={(e) => updateExperience(index, "start_date", e.target.value)}
                  className="input-box text-black dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
                />

                <input
                  type="month"
                  disabled={experience.is_current}
                  value={experience.end_date || ""}
                  onChange={(e) => updateExperience(index, "end_date", e.target.value)}
                  className="input-box text-black dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
                />
              </div>

              {/* Checkbox */}
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={experience.is_current || false}
                  onChange={(e) => updateExperience(index, "is_current", e.target.checked)}
                />
                <span className="input-box text-black dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500">Currently working here</span>
              </label>

              {/* Description */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="input-box text-black dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500">Job Description</label>
                  <button onClick={()=> generateDescription(index)} disabled={generatingIndex===index || !experience.position || !experience.company} className="text-xs flex items-center gap-1 text-indigo-500 hover:text-indigo-600">
                    {generatingIndex === index ? ( <Loader2 className="w-3 h-3"/>):(<Sparkles className="w-3 h-3"/>)}
                    <Sparkles size={14} />
                    Enhance with AI
                  </button>
                </div>

                <textarea
                  rows={4}
                  placeholder="Describe key responsibilities, achievements and impact..."
                  value={experience.description || ""}
                  onChange={(e) => updateExperience(index, "description", e.target.value)}
                  className="w-full p-3 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-300 dark:border-zinc-700 
text-black dark:text-white focus:border-indigo-500 outline-none resize-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
                />
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
