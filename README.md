🚀 AI Resume Builder

A full-stack AI-powered resume creation platform that helps users build professional, ATS-friendly resumes with intelligent content generation.
Users can input experience, skills, education, projects and receive optimized content suggestions, live-preview formatting, and export-ready resumes.

✨ Key Highlights

🔥 AI-Generated Resume Content — Get strong bullet points, summaries & achievements automatically

🧩 Customizable Resume Sections — Edit, reorder & personalize effortlessly

⚡ Live Preview Editor — Resume updates instantly while typing

📄 One-Click PDF Export — Generate clean, printable resumes

🔐 Planned Auth Support — Save multiple profiles securely

📱 Responsive UI — Works smoothly across screens & devices

🛠 Tech Stack
Layer	Technology Used
Frontend	React.js, CSS/Tailwind(optional), Axios
Backend	Node.js, Express.js
AI Integration	OpenAI / LLM-based text generation
Database	MongoDB / or PostgreSQL (optional)
PDF Generation	jsPDF / PDFKit
Tools	npm / yarn, Nodemon
📦 Installation & Setup
Clone Repository
git clone https://github.com/R1sh0bh/AI-Resume-Builder.git
cd AI-Resume-Builder

🔧 Backend Setup
cd server
npm install


Create .env inside /server:

PORT=5000
MONGODB_URI=your_mongodb_connection
OPENAI_API_KEY=your_openai_key


Start backend:

npm run dev

🎨 Frontend Setup
cd ../client
npm install
npm start


If required, update API URL inside config file:

client/src/config.js


The app runs at → http://localhost:3000
The server runs at → http://localhost:5000

Launch both simultaneously for full functionality.

🔥 Usage Flow

Enter details (Experience, Education, Summary, Skills etc.)

Click Generate with AI → Smart resume content auto-fills

Modify & polish through live preview

Export final resume as PDF

Example Input →
“Frontend dev with React experience”
AI Output →
✔ Developed scalable UI components using React
✔ Improved performance by 40% with memoization and code splitting

🧩 API Structure
Method	Endpoint	Purpose
POST	/api/resume/generate	AI-based content creation
POST	/api/resume/export	Generate downloadable PDF
GET	/api/resume/templates	Fetch resume templates
POST	/api/auth/login	User authentication
📁 Project Directory Layout
AI-Resume-Builder/
├── client/                     # React UI
│   ├── src/
│   │   ├── components/         # Form, Preview, Inputs, Buttons
│   │   ├── pages/              # Home, Builder, Login etc.
│   │   ├── services/           # API Services
│   │   └── utils/              # AI handlers, helpers
│   └── package.json
│
├── server/                     # Node + Express backend
│   ├── models/                 # Resume/User schemas
│   ├── routes/                 # API routes
│   ├── controllers/            # Business logic + AI calls
│   ├── middleware/             # Auth, error handling
│   ├── .env
│   └── package.json
│
└── README.md

🛠 Future Enhancements (Roadmap)

 Secure authentication + session resume saving

 Multiple template themes & color modes

 Resume comparison & improvement scoring

 Export to Word / LaTeX formats

 Deploy to Vercel + Render/Heroku backend hosting

 Smart skill-gap suggestions using AI

🤝 Contributing

Fork this repo

Create a feature branch

Submit PR with description

Contributions, bug reports & ideas are welcome!

📜 License

Licensed under MIT — Free to modify, distribute & use.

Made with ❤️ to make resume building super easy 🚀
