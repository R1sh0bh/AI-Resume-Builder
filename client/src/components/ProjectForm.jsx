import { FolderGit2, Plus, Trash, Sparkles } from "lucide-react";
import React from "react";

const ProjectForm = ({ data, onChange }) => {

  const addProject = () => {
    const newProject = {
      name: "",
      description: ""
    };
    onChange([...data, newProject]);
  };

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Projects</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Add the projects you’ve worked on.</p>
        </div>

        <button
          onClick={addProject}
          className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          <Plus size={14} /> Add Project
        </button>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="text-center py-6 text-zinc-500 dark:text-zinc-400">
          <FolderGit2 size={28} className="mx-auto mb-2 opacity-70" />
          <p>No projects added yet.</p>
          <p>Click <span className="text-indigo-500 font-semibold">Add Project</span> to begin.</p>
        </div>
      ) : (

        <div className="space-y-6">
          {data.map((project, index) => (
            <div key={index} className="border border-zinc-300 dark:border-zinc-700 rounded-xl p-5 space-y-5 bg-white dark:bg-zinc-900">

              {/* Title + Delete */}
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-zinc-800 dark:text-white">Project #{index + 1}</h4>

                <button
                  onClick={() => removeProject(index)}
                  className="text-red-500 hover:text-red-600 transition"
                >
                  <Trash size={16} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                <input
                  type="text"
                  placeholder="Project Name"
                  value={project.name || ""}
                  onChange={(e) => updateProject(index, "name", e.target.value)}
                  className="input-box text-black dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="input-box text-black dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500">Project Description</label>
                </div>

                <textarea
                  rows={4}
                  placeholder="Explain what the project does, your role & contributions..."
                  value={project.description || ""}
                  onChange={(e) => updateProject(index, "description", e.target.value)}
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

export default ProjectForm;
