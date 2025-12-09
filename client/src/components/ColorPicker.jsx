import { Check, Palette } from "lucide-react";
import React from "react";

const ColorPicker = ({ selectedColor, onChange }) => {
  const colors = [
    { name: "Indigo", hex: "#4F46E5" },
    { name: "Emerald", hex: "#10B981" },
    { name: "Rose", hex: "#F43F5E" },
    { name: "Amber", hex: "#F59E0B" },
    { name: "Violet", hex: "#8B5CF6" },
    { name: "Sky", hex: "#0EA5E9" },
  ];

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 hover:bg-zinc-700 transition"
      >
        <Palette size={16} />
        <span className="max-sm:hidden">Accent</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute mt-2 w-48 bg-zinc-900 text-white border border-zinc-700 rounded-xl shadow-xl p-3 z-50">

          {colors.map((color) => (
            <div
              key={color.hex}
              onClick={() => { onChange(color.hex); setIsOpen(false); }}
              className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition 
                  ${selectedColor === color.hex 
                    ? "bg-zinc-800 border border-indigo-500" 
                    : "hover:bg-zinc-800 border border-transparent hover:border-indigo-500"
                  }`}
            >
              {/* Color Box */}
              <div
                className="w-6 h-6 rounded-full border border-zinc-600"
                style={{ backgroundColor: color.hex }}
              />

              {/* Color Label */}
              <p className="text-sm ml-2 flex-1">{color.name}</p>

              {selectedColor === color.hex && (
                <Check size={16} className="text-indigo-400" />
              )}
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default ColorPicker;
