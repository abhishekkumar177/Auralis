# Testing Guide for Smart Notes

This guide will help you test all endpoints and features of the Smart Notes application.

## Prerequisites

Before testing, ensure:
- ✅ Appwrite project is set up
- ✅ Database and collection are created
- ✅ Collection permissions are configured (Users role with all permissions)
- ✅ Environment variables are set in `.env.local`
- ✅ Development server is running (`npm run dev`)

## Testing Checklist

### 1. Authentication Endpoints ✅

#### Test Signup
1. Open http://localhost:3000
2. Click "Get Started" or navigate to http://localhost:3000/signup
3. Fill in the form:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `password123` (min 8 characters)
4. Click "Create Account"

**Expected Result:**
- ✅ User is created in Appwrite Auth
- ✅ Automatically logged in
- ✅ Redirected to `/dashboard`
- ✅ No errors in console

**Verify in Appwrite Console:**
- Go to Auth → Users
- You should see the new user

#### Test Login
1. Logout (click Logout button in dashboard)
2. Navigate to http://localhost:3000/login
3. Enter credentials:
   - Email: `test@example.com`
   - Password: `password123`
4. Click "Sign In"

**Expected Result:**
- ✅ User is logged in
- ✅ Redirected to `/dashboard`
- ✅ Welcome message shows user name
- ✅ No errors in console

#### Test Session Management
1. After logging in, refresh the page
2. Check if you remain logged in

**Expected Result:**
- ✅ User stays logged in after refresh
- ✅ Dashboard loads correctly
- ✅ Session is maintained

#### Test Protected Routes
1. Logout from the dashboard
2. Try to manually navigate to http://localhost:3000/dashboard

**Expected Result:**
- ✅ Redirected to `/login`
- ✅ Cannot access dashboard without auth

#### Test Logout
1. Login again
2. Click the "Logout" button in the header

**Expected Result:**
- ✅ User is logged out
- ✅ Redirected to login or home page
- ✅ Session is cleared
- ✅ Cannot access dashboard anymore

---

### 2. Notes CRUD Operations ✅

Login first before testing these endpoints.

#### Test Create Note
1. Navigate to dashboard (http://localhost:3000/dashboard)
2. Click "New Note" button
3. Fill in the modal:
   - Title: `My First Note`
   - Content: `This is a test note with some content to summarize later.`
4. Click "Save Note"

**Expected Result:**
- ✅ Modal closes
- ✅ New note appears at the top of the grid
- ✅ Note card shows title and content
- ✅ No errors in console

**Verify in Appwrite Console:**
- Go to Databases → smart-notes-db → notes → Documents
- You should see the new document with:
  - userId (your user ID)
  - title: "My First Note"
  - content: "This is a test note..."
  - summary: "" (empty)
  - tags: [] (empty array)

**Browser Console Check:**
- Open Developer Tools (F12)
- Check Console tab - no errors
- Check Network tab - successful POST to Appwrite

#### Test Read Notes (List)
1. Create 2-3 more notes with different titles and content
2. Observe the notes grid

**Expected Result:**
- ✅ All notes are displayed
- ✅ Notes are sorted by creation date (newest first)
- ✅ Each note shows title and content preview
- ✅ No errors in console

**Verify in Appwrite Console:**
- All documents should be visible in the collection
- Each should have the correct userId

#### Test Update Note
1. Click the Edit icon (pencil) on any note card
2. Modal opens with current title and content
3. Modify the title or content
4. Click "Save Note"

**Expected Result:**
- ✅ Modal closes
- ✅ Note card updates with new content
- ✅ Changes are reflected immediately
- ✅ No errors in console

**Verify in Appwrite Console:**
- Refresh the documents view
- The note should show updated content
- Check `$updatedAt` timestamp is recent

#### Test Delete Note
1. Click the Delete icon (trash) on any note card
2. Note is deleted

**Expected Result:**
- ✅ Note disappears from the grid
- ✅ Other notes remain
- ✅ No errors in console

**Verify in Appwrite Console:**
- Refresh the documents view
- The note should be gone

---

### 3. AI Endpoints ✅

Make sure you have a valid Gemini API key set in `.env.local`.

#### Test AI Summarization (`/api/summarize`)
1. Create a note with substantial content (at least 3-4 sentences)
   - Title: `Project Planning`
   - Content: `We need to plan the new project carefully. First, we will gather requirements from stakeholders. Then, we'll create a detailed timeline. Finally, we'll assign tasks to team members and track progress weekly.`
2. Click the "Summarize" button on the note card
3. Wait for processing (5-10 seconds)

**Expected Result:**
- ✅ Button shows "Summarizing..." while processing
- ✅ A blue box appears on the note card with "AI Summary"
- ✅ Summary is concise (2-3 sentences)
- ✅ Tags appear below the summary
- ✅ Tags are relevant (e.g., "project", "planning", "tasks")
- ✅ No errors in console

**Browser Console Check:**
- Network tab shows POST to `/api/summarize`
- Response status: 200
- Response body contains `summary` and `tags`

**Example Response:**
```json
{
  "summary": "The project requires careful planning including gathering requirements, creating a timeline, and assigning tasks with weekly tracking.",
  "tags": ["project planning", "requirements", "timeline", "task management"]
}
```

**Verify in Appwrite Console:**
- The note document should now have:
  - summary: (the AI-generated summary)
  - tags: (array of AI-generated tags)

#### Test AI Summarization Error Handling
1. Temporarily set an invalid Gemini API key in `.env.local`
2. Restart the dev server
3. Try to summarize a note

**Expected Result:**
- ✅ Error is caught
- ✅ User sees an error indication (check console)
- ✅ App doesn't crash

**Don't forget to restore the correct API key!**

#### Test AI Insights (`/api/insights`)
1. Make sure you have at least 3-5 notes on different topics
   - Example topics: work, personal, shopping, learning, fitness
2. Create notes like:
   - "Grocery Shopping" - about buying groceries
   - "Workout Plan" - about exercise
   - "Learn JavaScript" - about programming
   - "Project Deadline" - about work
   - "Book Recommendations" - about reading
3. Switch to the "AI Insights" tab

**Expected Result:**
- ✅ Loading happens (may take 10-20 seconds)
- ✅ "Main Categories" section shows 3-5 categories
- ✅ Categories are relevant (e.g., "Health & Fitness", "Professional", "Education")
- ✅ "Summarized Notes" section shows notes that have summaries
- ✅ Each summarized note displays its summary and tags
- ✅ No errors in console

**Browser Console Check:**
- Network tab shows POST to `/api/insights`
- Request body contains array of notes
- Response status: 200
- Response body contains `categories` array

**Example Response:**
```json
{
  "categories": [
    "Personal Development",
    "Health & Wellness",
    "Professional Work",
    "Daily Tasks",
    "Learning & Education"
  ]
}
```

---

### 4. UI/UX Features ✅

#### Test Landing Page
1. Logout and go to http://localhost:3000
2. Check the landing page

**Expected Result:**
- ✅ Beautiful gradient background
- ✅ "Smart Notes" title with brain icon
- ✅ "Get Started" and "Sign In" buttons
- ✅ Feature cards (AI Summaries, Smart Insights, Secure & Private)
- ✅ "How It Works" section with 3 steps
- ✅ Call-to-action section at bottom
- ✅ Smooth animations on load
- ✅ Buttons have hover effects

#### Test Dashboard Tabs
1. Login and go to dashboard
2. Click "All Notes" tab
3. Click "AI Insights" tab
4. Switch between tabs multiple times

**Expected Result:**
- ✅ Smooth transition between tabs
- ✅ Active tab is highlighted
- ✅ Content changes appropriately
- ✅ No flickering or layout shifts

#### Test Responsive Design
1. Open Developer Tools (F12)
2. Toggle device toolbar (or press Cmd/Ctrl + Shift + M)
3. Test different screen sizes:
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1440px)

**Expected Result:**
- ✅ Layout adapts to screen size
- ✅ Notes grid changes columns (1 on mobile, 2 on tablet, 3 on desktop)
- ✅ Buttons and text are readable
- ✅ No horizontal scrolling
- ✅ Modals fit the screen

#### Test Animations
1. Create a new note - watch the modal animation
2. Delete a note - watch it fade out
3. Hover over note cards - watch the hover effect
4. Click buttons - watch the scale animation

**Expected Result:**
- ✅ Smooth, natural animations
- ✅ No janky or stuttering animations
- ✅ Consistent animation timing
- ✅ Animations enhance UX, not distract

---

### 5. Error Handling ✅

#### Test Invalid Login
1. Go to login page
2. Enter wrong email/password
3. Click "Sign In"

**Expected Result:**
- ✅ Error message appears
- ✅ User stays on login page
- ✅ Form is still usable

#### Test Duplicate Signup
1. Try to sign up with an email that already exists
2. Click "Create Account"

**Expected Result:**
- ✅ Error message appears
- ✅ User stays on signup page
- ✅ Form is still usable

#### Test Network Issues
1. Turn off WiFi or disconnect network
2. Try to create a note
3. Try to summarize a note

**Expected Result:**
- ✅ App handles error gracefully
- ✅ User sees error feedback
- ✅ App doesn't crash

---

## Testing Checklist Summary

### Authentication
- [ ] Signup creates user and logs in
- [ ] Login works with correct credentials
- [ ] Login fails with wrong credentials
- [ ] Session persists after refresh
- [ ] Logout works correctly
- [ ] Protected routes redirect to login

### Notes CRUD
- [ ] Create note works and shows in grid
- [ ] Read notes displays all user notes
- [ ] Update note saves changes
- [ ] Delete note removes from grid
- [ ] Notes are sorted by creation date
- [ ] Notes are user-specific (userId filter)

### AI Features
- [ ] Summarize note generates summary
- [ ] Summarize note generates tags
- [ ] Summary appears on note card
- [ ] Tags appear on note card
- [ ] AI Insights generates categories
- [ ] AI Insights shows summarized notes
- [ ] API errors are handled gracefully

### UI/UX
- [ ] Landing page looks good
- [ ] Dashboard tabs work
- [ ] Responsive on mobile
- [ ] Responsive on tablet
- [ ] Responsive on desktop
- [ ] Animations are smooth
- [ ] Loading states show
- [ ] Error messages display

---

## Manual API Testing (Optional)

If you want to test API endpoints directly with curl or Postman:

### Test Summarize Endpoint
```bash
curl -X POST http://localhost:3000/api/summarize \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Note",
    "content": "This is a test note with multiple sentences. It discusses various topics. We want to see if the AI can summarize this effectively."
  }'
```

**Expected Response:**
```json
{
  "summary": "A concise summary...",
  "tags": ["tag1", "tag2", "tag3"]
}
```

### Test Insights Endpoint
```bash
curl -X POST http://localhost:3000/api/insights \
  -H "Content-Type: application/json" \
  -d '{
    "notes": [
      {"title": "Workout", "content": "Did cardio and weights"},
      {"title": "Shopping", "content": "Need to buy groceries"}
    ]
  }'
```

**Expected Response:**
```json
{
  "categories": ["Health & Fitness", "Daily Tasks"]
}
```

---

## Troubleshooting

### If notes don't save:
- Check Appwrite Console → Databases → Collection Permissions
- Verify environment variables are correct
- Check browser console for errors

### If AI features don't work:
- Verify Gemini API key in `.env.local`
- Check API key has not exceeded quota
- Look at server logs in terminal

### If authentication fails:
- Verify Appwrite project ID
- Check platform (localhost) is added in Appwrite
- Confirm Auth is enabled

---

## Automated Testing (Future)

For automated testing, you could add:
- Jest for unit tests
- Cypress or Playwright for E2E tests
- React Testing Library for component tests

---

**All tests passing? You're ready to deploy! 🚀**

See `DEPLOYMENT.md` for deployment instructions.
