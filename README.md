# Smart Notes - AI-Powered Note Taking App

A beautiful, modern note-taking application built with Next.js 15, Appwrite, and Gemini AI. Smart Notes helps you organize your thoughts with AI-powered summaries and intelligent insights.

## Features

- **User Authentication**: Secure signup and login using Appwrite Auth
- **Note Management**: Create, read, update, and delete notes
- **AI Summaries**: Generate concise summaries using Google Gemini AI
- **Smart Tags**: Automatically generate relevant tags for your notes
- **AI Insights**: Discover patterns and categories across all your notes
- **Beautiful UI**: Clean, minimalistic design with smooth animations
- **Responsive**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Backend**: Appwrite (Auth & Database)
- **AI**: Google Gemini API
- **Icons**: Lucide React

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18+ and npm
- An Appwrite account (https://cloud.appwrite.io)
- A Google AI Studio account for Gemini API key (https://aistudio.google.com)

## Setup Instructions

### 1. Clone and Install

```bash
cd smart-notes
npm install
```

### 2. Set Up Appwrite

#### Create a New Project
1. Go to [Appwrite Console](https://cloud.appwrite.io)
2. Click "Create Project"
3. Name it "Smart Notes"
4. Copy your Project ID

#### Set Up Authentication
1. In your project, go to "Auth" in the sidebar
2. Enable "Email/Password" authentication
3. (Optional) Configure email templates and settings

#### Create Database and Collection
1. Go to "Databases" in the sidebar
2. Click "Create Database"
3. Name it "smart-notes-db"
4. Copy the Database ID

5. Inside the database, click "Create Collection"
6. Name it "notes"
7. Copy the Collection ID

8. Configure Collection Attributes:
   - `userId` (String, required, size: 255)
   - `title` (String, required, size: 500)
   - `content` (String, required, size: 10000)
   - `summary` (String, optional, size: 2000, default: "")
   - `tags` (String Array, optional)

9. Configure Collection Permissions:
   - Go to "Settings" tab in the collection
   - Under "Permissions", add:
     - **Create**: `Users` (any authenticated user)
     - **Read**: `User:[USER_ID]` will be handled by queries
     - **Update**: `User:[USER_ID]` will be handled by queries
     - **Delete**: `User:[USER_ID]` will be handled by queries

10. Create Indexes (for better performance):
    - Index on `userId` (Ascending)
    - Index on `$createdAt` (Descending)

#### Configure Platform (for localhost)
1. Go to "Settings" → "Platforms" in your Appwrite project
2. Click "Add Platform" → "Web App"
3. Name: "Smart Notes Web"
4. Hostname: `localhost` (for development)
5. For production, add your deployed domain

### 3. Get Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com)
2. Click "Get API Key"
3. Create a new API key or use an existing one
4. Copy the API key

### 4. Configure Environment Variables

Update the `.env.local` file in the root directory with your actual values:

```env
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id_here
NEXT_PUBLIC_APPWRITE_NOTES_COLLECTION_ID=your_notes_collection_id_here

# Gemini API Configuration
GEMINI_API_KEY=your_gemini_api_key_here
```

Replace the placeholder values with your actual IDs and keys.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage Guide

### Getting Started
1. **Sign Up**: Create a new account on the signup page
2. **Login**: Sign in with your credentials
3. **Create Notes**: Click the "New Note" button to create your first note
4. **AI Summarize**: Click the "Summarize" button on any note to generate an AI summary and tags
5. **View Insights**: Switch to the "AI Insights" tab to see patterns and categories across your notes

### Features Walkthrough

#### Creating Notes
- Click the "New Note" button on the dashboard
- Enter a title and content
- Click "Save Note"

#### AI Summarization
- Click the "Summarize" button on any note card
- The AI will generate a concise summary and relevant tags
- Summaries appear in a blue box on the note card

#### AI Insights
- Switch to the "AI Insights" tab
- View main categories identified across all your notes
- See a list of all notes with AI-generated summaries

#### Managing Notes
- **Edit**: Click the edit icon to modify a note
- **Delete**: Click the delete icon to remove a note
- Notes are automatically sorted by creation date (newest first)

## Project Structure

```
smart-notes/
├── app/
│   ├── api/
│   │   ├── insights/        # AI insights API route
│   │   └── summarize/       # AI summarization API route
│   ├── dashboard/           # Main dashboard page
│   ├── login/               # Login page
│   ├── signup/              # Signup page
│   ├── layout.tsx           # Root layout with AuthProvider
│   └── page.tsx             # Landing page
├── components/
│   └── ProtectedRoute.tsx   # Protected route wrapper
├── context/
│   └── AuthContext.tsx      # Authentication context
├── lib/
│   ├── appwrite.ts          # Appwrite configuration
│   ├── notes.ts             # Notes service functions
│   └── ai.ts                # AI service functions
├── types/
│   └── index.ts             # TypeScript type definitions
└── .env.local               # Environment variables (not in git)
```

## Authentication

This app uses **Appwrite Auth** for all authentication operations:
- User signup with email and password
- User login with session management
- Secure session handling with cookies
- Protected routes requiring authentication
- User logout and session deletion

All authentication is handled through the `AuthContext` which wraps the Appwrite SDK.

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to a GitHub repository
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel project settings
5. Deploy!

### Deploy to Appwrite Sites

1. Build your Next.js app:
   ```bash
   npm run build
   ```

2. Follow [Appwrite Sites documentation](https://appwrite.io/docs/products/functions/deployment) for deployment instructions.

## Troubleshooting

### Common Issues

**Authentication not working**
- Verify your Appwrite project ID in `.env.local`
- Check that Email/Password auth is enabled in Appwrite Console
- Make sure you added `localhost` as a platform in Appwrite

**Notes not saving**
- Verify Database ID and Collection ID in `.env.local`
- Check collection permissions in Appwrite Console
- Ensure all required attributes are created correctly

**AI features not working**
- Verify your Gemini API key is correct
- Check API key has not exceeded quota
- Review server logs for specific error messages

**UI not loading properly**
- Run `npm install` to ensure all dependencies are installed
- Clear browser cache and restart dev server
- Check browser console for JavaScript errors

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_APPWRITE_ENDPOINT` | Appwrite API endpoint | `https://cloud.appwrite.io/v1` |
| `NEXT_PUBLIC_APPWRITE_PROJECT_ID` | Your Appwrite project ID | `65f3a4b2c1d9e7f8a9b0` |
| `NEXT_PUBLIC_APPWRITE_DATABASE_ID` | Your Appwrite database ID | `smart-notes-db` |
| `NEXT_PUBLIC_APPWRITE_NOTES_COLLECTION_ID` | Your notes collection ID | `notes` |
| `GEMINI_API_KEY` | Google Gemini API key | `AIzaSyC...` |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

If you encounter any issues or have questions:
- Check the troubleshooting section above
- Review Appwrite documentation: https://appwrite.io/docs
- Check Next.js documentation: https://nextjs.org/docs

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Backend by [Appwrite](https://appwrite.io/)
- AI powered by [Google Gemini](https://ai.google.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animations by [Framer Motion](https://www.framer.com/motion/)
