import { GraduationCap, Plus, Trash } from "lucide-react";
import React from "react";

const EducationForm = ({ data, onChange }) => {

  const addEducation = () => {
    const newEducation = {
      institution: "",
      degree: "",
      field: "",
      graduation_date: "",
      gpa: ""
    };
    onChange([...data, newEducation]);
  };

  const removeEducation = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateEducation = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Education</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Add your academic background.</p>
        </div>

        <button
          onClick={addEducation}
          className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          <Plus size={14} /> Add Education
        </button>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="text-center py-6 text-zinc-500 dark:text-zinc-400">
          <GraduationCap size={28} className="mx-auto mb-2 opacity-70" />
          <p>No Education added yet.</p>
          <p>Click <span className="text-indigo-500 font-semibold">Add Education</span> to begin.</p>
        </div>
      ) : (

        <div className="space-y-6">
          {data.map((education, index) => (
            <div key={index} className="border border-zinc-300 dark:border-zinc-700 rounded-xl p-5 space-y-5 bg-white dark:bg-zinc-900">

              {/* Title */}
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-zinc-800 dark:text-white">Education #{index + 1}</h4>

                <button
                  onClick={() => removeEducation(index)}
                  className="text-red-500 hover:text-red-600 transition"
                >
                  <Trash size={16} />
                </button>
              </div>

              {/* Inputs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                <input
                  type="text"
                  placeholder="Institution Name"
                  value={education.institution || ""}
                  onChange={(e) => updateEducation(index, "institution", e.target.value)}
                  className="input-box text-black dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500"

                />

                <input
                  type="text"
                  placeholder="Degree (e.g. B.Tech, BSc)"
                  value={education.degree || ""}
                  onChange={(e) => updateEducation(index, "degree", e.target.value)}
                  className="input-box text-black dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500"

                />

                <input
                  type="text"
                  placeholder="Field of Study"
                  value={education.field || ""}
                  onChange={(e) => updateEducation(index, "field", e.target.value)}
                  className="input-box text-black dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500"

                />

                <input
                  type="month"
                  value={education.graduation_date || ""}
                  onChange={(e) => updateEducation(index, "graduation_date", e.target.value)}
                  className="input-box text-black dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500"

                />
              </div>

              {/* GPA */}
              <input
                type="text"
                placeholder="GPA / Percentage (optional)"
                value={education.gpa || ""}
                onChange={(e) => updateEducation(index, "gpa", e.target.value)}
                className="input-box text-black dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500"

              />

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationForm;
