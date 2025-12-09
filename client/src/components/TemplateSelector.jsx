import { Check, Layout } from 'lucide-react';
import React from 'react';

const TemplateSelector = ({ selectedTemplate, onChange }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const templates = [
        { id: 'classic', name: 'Classic', preview: "A clean and traditional resume layout with clear sections." },
        { id: 'modern', name: 'Modern', preview: "A contemporary design with bold headings and ample white space." },
        { id: 'minimal', name: 'Minimal', preview: "A simple and elegant template focusing on content." },
        { id: 'minimal-image', name: 'Minimal with Image', preview: "A minimal design that includes a profile image." }
    ];

    return (
        <div className="relative">

            {/* Main Toggle Button */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 hover:bg-zinc-700 transition"
            >
                <Layout size={16} />
                <span className="max-sm:hidden">Template</span>
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute mt-2 w-72 bg-zinc-900 text-white shadow-xl border border-zinc-700 rounded-xl p-3 z-50">

                    {templates.map(template => (
                        <div 
                            key={template.id}
                            onClick={() => { onChange(template.id); setIsOpen(false); }}
                            
                            className={`p-3 rounded-lg cursor-pointer transition border 
                                ${selectedTemplate === template.id 
                                    ? "border-indigo-500 bg-zinc-800" 
                                    : "border-transparent hover:border-indigo-500 hover:bg-zinc-800/60"
                                }`
                            }
                        >
                            {/* Checkmark icon */}
                            {selectedTemplate === template.id && (
                                <div className="absolute right-5 mt-1 text-indigo-400">
                                    <Check size={18} />
                                </div>
                            )}

                            {/* Template Name + Text */}
                            <h4 className="font-semibold text-sm">{template.name}</h4>
                            <p className="text-xs text-zinc-400">{template.preview}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TemplateSelector;
