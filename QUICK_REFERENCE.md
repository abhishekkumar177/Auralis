# Smart Notes - Quick Reference Card

## Application URLs

| Page | URL | Description |
|------|-----|-------------|
| Landing | http://localhost:3000 | Home page |
| Signup | http://localhost:3000/signup | Create account |
| Login | http://localhost:3000/login | Sign in |
| Dashboard | http://localhost:3000/dashboard | Main app (protected) |

## API Endpoints

| Endpoint | Method | Purpose | Auth Required |
|----------|--------|---------|---------------|
| `/api/summarize` | POST | Generate AI summary and tags | No |
| `/api/insights` | POST | Generate AI category insights | No |

## Appwrite Services Used

| Service | Purpose | Collections/Features |
|---------|---------|---------------------|
| **Auth** | User authentication | Email/Password, Sessions |
| **Database** | Data storage | `notes` collection |

## Database Schema

### Notes Collection

```typescript
{
  $id: string              // Auto-generated
  $createdAt: string       // Auto-generated
  $updatedAt: string       // Auto-generated
  userId: string           // User ID (required)
  title: string            // Note title (required)
  content: string          // Note content (required)
  summary?: string         // AI summary (optional)
  tags?: string[]          // AI tags (optional)
}
```

## Environment Variables

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
NEXT_PUBLIC_APPWRITE_NOTES_COLLECTION_ID=your_collection_id
GEMINI_API_KEY=your_gemini_api_key
```

## Common Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Key Features

### ✅ Authentication
- Email/password signup
- Login with session management
- Protected routes
- Auto-redirect

### ✅ Notes Management
- Create notes
- Edit notes
- Delete notes
- View all notes (sorted by date)

### ✅ AI Features
- **Summarize**: Generate concise summary
- **Tags**: Auto-generate relevant tags
- **Insights**: Discover patterns across notes

## User Flow

```
1. Land on home page
2. Sign up → Auto login → Dashboard
3. Create notes
4. Click "Summarize" → AI generates summary + tags
5. Switch to "AI Insights" → See categories
```

## Appwrite Setup Steps

1. **Create Project** → Copy Project ID
2. **Create Database** → Copy Database ID
3. **Create Collection** (`notes`) → Copy Collection ID
4. **Add Attributes**:
   - userId (String, 255, required)
   - title (String, 500, required)
   - content (String, 10000, required)
   - summary (String, 2000, optional)
   - tags (String Array, optional)
5. **Set Permissions**: Role "Users", all permissions
6. **Add Platform**: Hostname `localhost`

## File Structure Overview

```
app/
├── api/                  # API routes
│   ├── insights/        # AI insights endpoint
│   └── summarize/       # AI summarization endpoint
├── dashboard/           # Main app (protected)
├── login/               # Login page
├── signup/              # Signup page
└── page.tsx            # Landing page

components/
└── ProtectedRoute.tsx   # Auth guard

context/
└── AuthContext.tsx      # Auth state

lib/
├── appwrite.ts         # Appwrite config
├── notes.ts            # CRUD operations
└── ai.ts               # AI integration

types/
└── index.ts            # TypeScript types
```

## Troubleshooting Quick Fixes

| Issue | Solution |
|-------|----------|
| Can't create notes | Check collection permissions in Appwrite |
| Login fails | Verify Project ID in `.env.local` |
| AI not working | Check Gemini API key |
| Port in use | Kill process or use different port |
| Build fails | Check all env vars are set |

## Testing Checklist

- [ ] Signup works
- [ ] Login works
- [ ] Create note works
- [ ] Edit note works
- [ ] Delete note works
- [ ] Summarize works
- [ ] AI Insights works
- [ ] Logout works
- [ ] Protected routes work
- [ ] Responsive design works

## Deployment Platforms

| Platform | Difficulty | Best For |
|----------|-----------|----------|
| **Vercel** | ⭐ Easy | Next.js apps (recommended) |
| **Netlify** | ⭐⭐ Medium | Static sites + serverless |
| **Self-hosted** | ⭐⭐⭐ Hard | Full control |

## Tech Stack at a Glance

```
Frontend:  Next.js 15 + TypeScript + Tailwind CSS
Backend:   Appwrite (Auth + Database)
AI:        Google Gemini API
Styling:   Tailwind CSS + Framer Motion
Icons:     Lucide React
```

## Important Notes

- ⚠️ Never commit `.env.local` to Git
- ⚠️ Use separate Appwrite projects for dev/prod
- ⚠️ Gemini free tier has rate limits
- ⚠️ Always enable HTTPS in production
- ⚠️ Test thoroughly before deploying

## Quick Links

- [Appwrite Console](https://cloud.appwrite.io)
- [Gemini AI Studio](https://aistudio.google.com)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## Support

- **Setup Help**: See `QUICKSTART.md`
- **Appwrite Config**: See `APPWRITE_SETUP.md`
- **Testing**: See `TESTING_GUIDE.md`
- **Deployment**: See `DEPLOYMENT.md`
- **Full Docs**: See `README.md`

---

**Need help?** Check the detailed documentation files!
