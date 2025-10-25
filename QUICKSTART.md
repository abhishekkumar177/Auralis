# Quick Start Guide

Get Smart Notes up and running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- Appwrite account (free at https://cloud.appwrite.io)
- Gemini API key (free at https://aistudio.google.com)

## Step-by-Step Setup

### 1. Install Dependencies (1 minute)

```bash
cd smart-notes
npm install
```

### 2. Set Up Appwrite (2 minutes)

1. **Create Project**
   - Go to https://cloud.appwrite.io
   - Click "Create Project" → Name: "Smart Notes"
   - Copy your **Project ID**

2. **Create Database**
   - Click "Databases" → "Create Database"
   - Name: "smart-notes-db"
   - Copy your **Database ID**

3. **Create Collection**
   - Click "Create Collection" → Name: "notes"
   - Copy your **Collection ID**
   - Add these attributes:
     - `userId` (String, 255, required)
     - `title` (String, 500, required)
     - `content` (String, 10000, required)
     - `summary` (String, 2000, optional)
     - `tags` (String Array, optional)

4. **Set Permissions**
   - In collection Settings → Permissions
   - Add: Role "Users", all permissions (Create, Read, Update, Delete)

5. **Add Platform**
   - Settings → Platforms → Add Platform → Web App
   - Hostname: `localhost`

### 3. Get Gemini API Key (1 minute)

1. Go to https://aistudio.google.com
2. Click "Get API Key"
3. Copy your **API Key**

### 4. Configure Environment Variables (1 minute)

Update `.env.local` with your credentials:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id_here
NEXT_PUBLIC_APPWRITE_NOTES_COLLECTION_ID=your_collection_id_here
GEMINI_API_KEY=your_gemini_api_key_here
```

### 5. Start the App (30 seconds)

```bash
npm run dev
```

Open http://localhost:3000

## First Steps

1. **Sign Up** - Create your account
2. **Create a Note** - Click "New Note"
3. **Try AI** - Click "Summarize" on your note
4. **View Insights** - Switch to "AI Insights" tab

## Need Help?

- **Detailed Setup**: See [README.md](README.md)
- **Appwrite Issues**: See [APPWRITE_SETUP.md](APPWRITE_SETUP.md)
- **Troubleshooting**: Check the README troubleshooting section

## What's Next?

- Create more notes to see better AI insights
- Customize the UI in the component files
- Deploy to Vercel or Appwrite Sites
- Add your own features!

---

**Stuck?** Make sure:
- ✅ All environment variables are set correctly
- ✅ Appwrite collection has all required attributes
- ✅ Platform `localhost` is added in Appwrite
- ✅ Email/Password auth is enabled in Appwrite
