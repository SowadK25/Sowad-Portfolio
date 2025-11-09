
## Local Development

### Run frontend + backend (serverless functions):
vercel dev

### Run only the React UI:
npm run dev

### Create a production build:
npm run build

### Preview production build locally:
npm run preview


## Git Workflow (Save Code to GitHub)

### Check changed files:
git status

### Stage all changes:
git add .

### Commit changes with message:
git commit -m "Describe your changes"

### Push to GitHub:
git push


## Deployment

### Your project is connected to Vercel
Pushing to GitHub automatically deploys.

### Manual deploy (optional):
vercel --prod


## Environment Variables

Set your secrets in Vercel:
Vercel Dashboard → Project → Settings → Environment Variables

Example:
GEMINI_API_KEY = your_api_key_here

Then redeploy:
vercel --prod


## Folder Structure Reminder

your-project/
├─ src/
├─ api/
│  └─ chatbot.js   # Vercel serverless function
├─ package.json
└─ vite.config.js
