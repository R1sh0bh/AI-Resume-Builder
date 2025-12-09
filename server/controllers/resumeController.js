// for creating a new resume
// post /api/resumes/create

import imagekit from "../configs/imagekit.js";
import Resume from "../models/Resume.js";
import fs from "fs";

export const createResumes = async (req, res) => {
    try {
        const userId = req.userId;
        const { title } = req.body;
        //create new resume
        const newResume = await Resume.create({ userId, title })
        // return 
        return res.status(201).json({ message: 'resume created successfully', resume: newResume })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

// deleteig a resume 
// Delete /api/resume/delete


export const deleteResumes = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;
        await Resume.findOneAndDelete({ userId, _id: resumeId })
        return res.status(201).json({ message: 'resume deleted successfully' })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}


//get user resume by id
// /api/resumes/get

export const getResumeById = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;

        const resume = await Resume.findOne({ userId, _id: resumeId })

        if (!resume) {
            return res.status(404).json({ message: 'resume not found' })
        }

        resume.__v = undefined;
        resume.createdAt = undefined;
        resume.updatedAt = undefined;

        return res.status(200).json({ resume })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}


// get /api/resumes/public


export const getPublicResumebyId = async (req, res) => {
    try {
        const { resumeId } = req.params;

        const resume = await Resume.findOne({ public: true, _id: resumeId })

        if (!resume) {
            return res.status(404).json({ message: 'resume not found' })
        }

        return res.status(200).json({ resume })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}





export const updateResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.body;
        // resumeData may be JSON string or object
        const rawResumeData = req.body.resumeData;

        // Parse resumeData safely
        let resumeDataCopy = {};
        if (rawResumeData) {
            if (typeof rawResumeData === "string") {
                resumeDataCopy = JSON.parse(rawResumeData);
            } else {
                // fallback if structuredClone not available
                resumeDataCopy = JSON.parse(JSON.stringify(rawResumeData));
            }
        }

        // Normalize a few common keys (optional)
        if (resumeDataCopy.accentColor !== undefined) {
            resumeDataCopy.accentColor = resumeDataCopy.accentColor;
            delete resumeDataCopy.accentColor;
        }
        if (resumeDataCopy.professionalSummary !== undefined) {  // CamelCase check → Won't match your snake_case, so skips delete
            resumeDataCopy.professional_summary = resumeDataCopy.professionalSummary;  // Rename if camel exists
            delete resumeDataCopy.professionalSummary;  // Delete old camel
        }
        // Your existing professional_summary (snake) stays untouched!
        // add more normalizations here if needed

        // Handle image upload (multer provided file)
        // Handle image upload (multer provided file) - supports memoryStorage (buffer) or diskStorage (path)
        const image = req.file;
        const removeBackground = req.body.removeBackground === "yes" || req.body.removeBackground === true;
        if (image) {
            // ImageKit upload options
            const uploadOptions = {
                fileName: `resume-${Date.now()}.png`,
                folder: "user-resumes",
                transformation: {
                    pre: "w-300,h-300,fo-face,z-0.75" + (removeBackground ? ",e-bgremove" : "")
                }
            };

            // Handle memoryStorage (buffer) - use toFile helper
            if (image.buffer) {
                const { toFile } = await import('@imagekit/nodejs');  // Dynamic import for toFile (Node.js ESM)
                uploadOptions.file = await toFile(image.buffer, image.originalname || 'image.png');
                console.log('Uploading from memory buffer');
            }
            // Fallback to diskStorage (path/stream)
            else if (image.path) {
                uploadOptions.file = fs.createReadStream(image.path);
                console.log('Uploading from disk path');
            }
            else {
                throw new Error('Invalid image file: No buffer or path available');
            }

            const response = await imagekit.files.upload(uploadOptions);

            resumeDataCopy.personal_info = resumeDataCopy.personal_info || {};
            resumeDataCopy.personal_info.image = response.url;

            // Cleanup: Only for disk paths (memory buffers auto-managed)
            if (image.path) {
                try {
                    fs.unlinkSync(image.path);
                    console.log('Cleaned up temp file:', image.path);
                } catch (err) {
                    console.warn('Cleanup failed (ignore if file already gone):', err.message);
                }
            }
        }
        // Log for debugging (remove or lower severity in production)
        console.log("updateResume: userId=", userId, "resumeId=", resumeId);
        // console.log("resumeDataCopy=", resumeDataCopy);

        // Update: ensure we only update records owned by user
        const updatedResume = await Resume.findOneAndUpdate(
            { _id: resumeId, userId },
            { $set: resumeDataCopy },
            { new: true, runValidators: true }
        );

        if (!updatedResume) {
            return res.status(404).json({ message: "Resume not found or you are not authorized." });
        }

        return res.status(200).json({ message: "saved successfully", resume: updatedResume });
    } catch (error) {
        console.error("updateResume error:", error);
        return res.status(400).json({ message: error.message || "Update failed" });
    }
};
