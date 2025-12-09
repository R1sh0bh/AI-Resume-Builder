import { Plus, X, Sparkles } from "lucide-react";
import React from "react";

const SkillsForm = ({ data = [], onChange }) => {
  const [newSkill, setNewSkill] = React.useState("");

  const addSkill = () => {
    const skill = newSkill.trim();
    if (skill && !data.includes(skill)) {
      onChange([...data, skill]);
      setNewSkill("");
    }
  };

  const removeSkill = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Skills</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Add your technical and soft skills.</p>
        </div>
      </div>

      {/* Input */}
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Enter a skill (e.g. React, UI/UX, Leadership...)"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleKeyPress}
          className="input-box flex-1 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
        />

        <button
          onClick={addSkill}
          disabled={!newSkill.trim()}
          className={`flex items-center gap-1 text-xs px-3 py-2 rounded-lg ${
            newSkill.trim()
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-zinc-400 dark:bg-zinc-600 text-white cursor-not-allowed"
          } transition`}
        >
          <Plus size={14}/> Add
        </button>
      </div>

      {/* Skills Display */}
      {data.length === 0 ? (
        <div className="text-center py-6 text-zinc-500 dark:text-zinc-400">
          <Sparkles size={24} className="mx-auto mb-1 opacity-70" />
          <p>No skills added yet</p>
          <p>Start adding skills above to showcase your abilities</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {data.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-indigo-600 text-white flex items-center gap-2 rounded-full text-sm"
            >
              {skill}
              <button onClick={() => removeSkill(index)}>
                <X size={14} className="hover:opacity-60 transition"/>
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Auto-inserted TIP line as requested */}
      <div className="text-sm text-zinc-500 dark:text-zinc-400">
        💡 <strong>Tip:</strong> Try to balance technical skills (React, Python, APIs)
        with personal strengths (communication, time management, teamwork)  
        → This shows you’re a developer who can code and collaborate.
      </div>

    </div>
  );
};

export default SkillsForm;
