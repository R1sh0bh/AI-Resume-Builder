import { Loader2, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";

const ProfessionalSummaryform = ({ data, onChange, setResumeData }) => {

  const { token } = useSelector(state => state.auth)
  const[isGenerating, setIsGenerating] = useState(false)

  const generateSummary = async () => {
    try {
      setIsGenerating(true)
      const prompt = `enhance my professinal summary "${data}"`
      const response = await api.post('/api/ai/enhance-pro-sum', {userContent: prompt}, {headers: {Authorization: token}})
      setResumeData(prev => ({...prev, professional_summary: response.data.enhancedContent}))
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
    finally{
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-4">

      {/* Title Row — same layout as your other forms */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Professional Summary</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Add a short summary to highlight your profile.
          </p>
        </div>

        <button 
        disabled={isGenerating}
        onClick={generateSummary}
        className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">
          {isGenerating ? (<Loader2 className="size-4 animate-spin"/>):(<Sparkles size={14} />)}
          {isGenerating ? "Enhancing...":"AI Enhance"}
          
        </button>
      </div>

      {/* Text Input Area */}
      <div className="mt-4">
        <textarea
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={7}
          placeholder="Write a compelling & concise professional summary..."
          className="w-full p-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm dark:text-white focus:border-indigo-500 outline-none transition"
        />

        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">💡 Keep it short, crisp & impact-oriented.</p>
      </div>
    </div>
  );
};

export default ProfessionalSummaryform;
