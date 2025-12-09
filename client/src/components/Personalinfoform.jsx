import { Briefcase, Globe, Linkedin, Mail, MapPin, Phone, User } from 'lucide-react'
import React from 'react'

const Personalinfoform = ({
    data,
    onchange,
    removeBackground,
    setRemoveBackground
}) => {

    const handlechange = (field, value) => {
        onchange({
            ...data,
            [field]: value
        })
    }

    const fields = [
        { key: 'full_name', label: 'Full Name', icon: User, type: 'text', requires: true },
        { key: 'email', label: 'Email', icon: Mail, type: 'email', requires: true },
        { key: 'phone', label: 'Phone', icon: Phone, type: 'tel', requires: false },
        { key: 'location', label: 'Location', icon: MapPin, type: 'text', requires: false },
        { key: 'professional_title', label: 'Professional Title', icon: Briefcase, type: 'text', requires: false },
        { key: 'linkedin', label: 'LinkedIn', icon: Linkedin, type: 'url', requires: false },
        { key: 'website', label: 'Website', icon: Globe, type: 'url', requires: false }
    ]

    return (
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow border border-zinc-300/40 dark:border-zinc-700">

            {/* Title */}
            <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-1">
                Personal Information
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
                Fill in your basic personal details.
            </p>

            {/* Image Upload Section */}
            <div className="flex items-center gap-4">

                <label className="cursor-pointer">
                    {/* Image Preview */}
                    {data.image ? (
                        <img
                            src={
                                typeof data.image === "string"
                                    ? data.image
                                    : URL.createObjectURL(data.image)
                            }
                            alt="Profile"
                            className="w-16 h-16 rounded-full object-cover border border-zinc-300 dark:border-zinc-700 shadow"
                        />
                    ) : (
                        <div className="w-16 h-16 rounded-full border border-zinc-300 dark:border-zinc-600 flex flex-col items-center justify-center text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
                            <User className="size-8" />
                            <span className="text-[10px]">Upload</span>
                        </div>
                    )}

                    {/* Hidden Input */}
                    <input
                        type="file"
                        accept="image/jpeg, image/png"
                        className="hidden"
                        onChange={(e) => handlechange("image", e.target.files[0])}
                    />
                </label>

                {/* Background Removal Toggle */}
                {typeof data.image === "object" && (
                    <div>
                        <p className="text-sm mb-1 text-zinc-700 dark:text-zinc-300">
                            Remove Background
                        </p>

                        <label className="flex items-center gap-2 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                onChange={() => setRemoveBackground(prev => !prev)}
                                checked={removeBackground}
                            />

                            {/* Toggle Switch */}
                            <div className="w-10 h-5 bg-zinc-300 dark:bg-zinc-700 rounded-full peer-checked:bg-indigo-600 relative transition">
                                <div className="absolute top-0.5 left-0.5 size-4 bg-white dark:bg-zinc-900 rounded-full shadow transition-all peer-checked:translate-x-5" />
                            </div>

                            <span className="text-sm text-zinc-600 dark:text-zinc-400">
                                {removeBackground ? "Enabled" : "Disabled"}
                            </span>
                        </label>
                    </div>
                )}

                {/* Form Fields */}
                <div className="mt-6 grid gap-4">
                    {fields.map((field) => {
                        const Icon = field.icon
                        return (
                            <div key={field.key} className="flex flex-col gap-1">

                                {/* Label + Icon */}
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                                    <Icon className="size-4" />
                                    {field.label}
                                    {field.requires && <span className="text-red-500">*</span>}
                                </label>

                                {/* Input */}
                                <input
                                    type={field.type}
                                    value={data[field.key] || ""}
                                    onChange={(e) => handlechange(field.key, e.target.value)}
                                    required={field.requires}
                                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                                    className="px-3 py-2 text-sm rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700
                     text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 
                     focus:border-transparent transition"
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>


    )
}

export default Personalinfoform
