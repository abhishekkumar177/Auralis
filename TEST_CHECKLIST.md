# Smart Notes - Test Checklist

Use this checklist to verify all features are working correctly.

## Pre-Testing Setup ✓

- [ ] Appwrite project created
- [ ] Database and collection configured
- [ ] Collection has all 5 attributes (userId, title, content, summary, tags)
- [ ] Collection permissions set (Users role with all permissions)
- [ ] Platform `localhost` added in Appwrite
- [ ] Environment variables set in `.env.local`
- [ ] Gemini API key is valid
- [ ] `npm install` completed
- [ ] Dev server running (`npm run dev`)

---

## 1. Authentication Tests 🔐

### Signup Flow
- [ ] Navigate to http://localhost:3000/signup
- [ ] Page loads without errors
- [ ] Enter name, email, password (min 8 chars)
- [ ] Click "Create Account"
- [ ] User is created (check Appwrite Console → Auth → Users)
- [ ] Automatically logged in
- [ ] Redirected to `/dashboard`
- [ ] Welcome message shows correct name

### Login Flow
- [ ] Logout from dashboard
- [ ] Navigate to http://localhost:3000/login
- [ ] Enter valid credentials
- [ ] Click "Sign In"
- [ ] Successfully logged in
- [ ] Redirected to `/dashboard`

### Login Error Handling
- [ ] Try login with wrong password
- [ ] Error message displays
- [ ] Try login with non-existent email
- [ ] Error message displays

### Session Persistence
- [ ] Login to dashboard
- [ ] Refresh the page (F5)
- [ ] Still logged in (not redirected to login)
- [ ] User data still shows

### Protected Routes
- [ ] Logout
- [ ] Try to visit http://localhost:3000/dashboard directly
- [ ] Redirected to login page
- [ ] Cannot access dashboard without auth

### Logout
- [ ] Login again
- [ ] Click "Logout" button
- [ ] Successfully logged out
- [ ] Redirected away from dashboard
- [ ] Cannot access dashboard anymore

---

## 2. Notes CRUD Tests 📝

### Create Note
- [ ] Login to dashboard
- [ ] Click "New Note" button
- [ ] Modal opens
- [ ] Enter title: "Test Note 1"
- [ ] Enter content: "This is my first test note."
- [ ] Click "Save Note"
- [ ] Modal closes
- [ ] Note appears in grid
- [ ] Note shows correct title and content
- [ ] Note appears at top (newest first)
- [ ] Check Appwrite Console → Documents (note is there)

### Create Multiple Notes
- [ ] Create 2nd note with different content
- [ ] Create 3rd note with different content
- [ ] All 3 notes visible in grid
- [ ] Notes sorted by creation date (newest first)

### Read Notes
- [ ] All created notes are visible
- [ ] Each shows title
- [ ] Each shows content preview (truncated if long)
- [ ] No notes from other users visible

### Update Note
- [ ] Click edit icon (pencil) on a note
- [ ] Modal opens with existing title and content
- [ ] Modify the title
- [ ] Modify the content
- [ ] Click "Save Note"
- [ ] Modal closes
- [ ] Note card shows updated content
- [ ] Check Appwrite Console (content updated)
- [ ] `$updatedAt` timestamp is recent

### Delete Note
- [ ] Click delete icon (trash) on a note
- [ ] Note disappears from grid
- [ ] Other notes remain visible
- [ ] Check Appwrite Console (note is deleted)
- [ ] No errors in console

### Empty State
- [ ] Delete all notes
- [ ] Grid is empty (or shows empty state)
- [ ] No errors

---

## 3. AI Features Tests 🤖

### AI Summarization
- [ ] Create a note with substantial content (4-5 sentences minimum):
  ```
  Title: "Project Planning"
  Content: "We need to plan the new project carefully. First, we will gather requirements from stakeholders. Then, we'll create a detailed timeline. Finally, we'll assign tasks to team members and track progress weekly."
  ```
- [ ] Click "Summarize" button on the note
- [ ] Button shows "Summarizing..." (loading state)
- [ ] Wait 5-10 seconds
- [ ] Blue "AI Summary" box appears on card
- [ ] Summary is concise (2-3 sentences)
- [ ] Summary is relevant to content
- [ ] Tags appear below summary
- [ ] Tags are relevant (e.g., "planning", "project")
- [ ] Check browser console - no errors
- [ ] Check Network tab - POST to `/api/summarize` succeeded
- [ ] Check Appwrite Console - note has summary and tags saved

### AI Summarization - Multiple Notes
- [ ] Create another note with different topic:
  ```
  Title: "Fitness Goals"
  Content: "I want to improve my fitness this year. My goals include running 5km without stopping, doing 50 push-ups in a row, and attending yoga classes twice a week."
  ```
- [ ] Summarize this note
- [ ] Summary and tags are relevant to fitness
- [ ] Different tags than the first note

### AI Insights Tab
- [ ] Ensure you have 3-5 notes on different topics
- [ ] At least 2-3 notes should have summaries
- [ ] Switch to "AI Insights" tab
- [ ] Wait for loading (10-20 seconds)
- [ ] "Main Categories" section appears
- [ ] 3-5 categories displayed (e.g., "Health", "Work", "Personal")
- [ ] Categories are relevant to your notes
- [ ] "Summarized Notes" section shows notes with summaries
- [ ] Each summarized note shows:
  - Title
  - Summary
  - Tags
- [ ] Check Network tab - POST to `/api/insights` succeeded

### AI Error Handling
- [ ] Create a note with very short content (e.g., "Test")
- [ ] Try to summarize it
- [ ] Either works or shows appropriate error
- [ ] App doesn't crash

---

## 4. UI/UX Tests 🎨

### Landing Page
- [ ] Logout and visit http://localhost:3000
- [ ] Page loads correctly
- [ ] Gradient background visible
- [ ] Brain icon and "Smart Notes" title show
- [ ] "Get Started" button visible
- [ ] "Sign In" button visible
- [ ] 3 feature cards show (AI Summaries, Smart Insights, Secure)
- [ ] "How It Works" section shows 3 steps
- [ ] Call-to-action section at bottom
- [ ] Animations are smooth
- [ ] Hover effects work on buttons

### Dashboard Layout
- [ ] Login to dashboard
- [ ] Header shows "Smart Notes" title
- [ ] Welcome message shows user name
- [ ] "Logout" button in header
- [ ] Two tabs: "All Notes" and "AI Insights"
- [ ] "New Note" button visible (when on All Notes tab)
- [ ] Layout is clean and organized

### Tab Switching
- [ ] Click "All Notes" tab
- [ ] Notes grid shows
- [ ] Click "AI Insights" tab
- [ ] Insights content shows
- [ ] Switch back and forth multiple times
- [ ] Smooth transitions
- [ ] Active tab is highlighted

### Note Cards
- [ ] Each note card shows:
  - Title
  - Content preview
  - Summary (if available)
  - Tags (if available)
  - Summarize button
  - Edit button
  - Delete button
- [ ] Hover over card - subtle shadow effect
- [ ] Cards are responsive

### Modals
- [ ] Open "New Note" modal
- [ ] Modal centers on screen
- [ ] Background dims
- [ ] Click outside modal - doesn't close (good UX)
- [ ] Click X button - closes modal
- [ ] Click Cancel - closes modal
- [ ] Modal has smooth open/close animation

### Loading States
- [ ] When summarizing, button shows "Summarizing..."
- [ ] Button is disabled during summarization
- [ ] When loading insights, loading indicator shows

### Responsive Design - Mobile (375px)
- [ ] Open DevTools (F12)
- [ ] Toggle device toolbar
- [ ] Set to iPhone SE or similar (375px)
- [ ] Landing page looks good
- [ ] Login/Signup forms fit screen
- [ ] Dashboard is usable
- [ ] Notes stack in 1 column
- [ ] Buttons are tap-friendly
- [ ] No horizontal scrolling
- [ ] Modal fits screen

### Responsive Design - Tablet (768px)
- [ ] Set viewport to iPad or similar (768px)
- [ ] Notes display in 2 columns
- [ ] Everything fits well
- [ ] Readable and usable

### Responsive Design - Desktop (1440px)
- [ ] Set viewport to desktop (1440px)
- [ ] Notes display in 3 columns
- [ ] Layout is spacious
- [ ] Everything looks professional

### Animations
- [ ] Create note - modal slides in smoothly
- [ ] Delete note - note fades out smoothly
- [ ] Tab switch - content transitions smoothly
- [ ] Button hover - subtle scale effect
- [ ] No janky or stuttering animations

---

## 5. Browser Tests 🌐

### Chrome/Chromium
- [ ] All features work in Chrome
- [ ] No console errors
- [ ] UI renders correctly

### Firefox
- [ ] All features work in Firefox
- [ ] No console errors
- [ ] UI renders correctly

### Safari (if on Mac)
- [ ] All features work in Safari
- [ ] No console errors
- [ ] UI renders correctly

---

## 6. Performance Tests ⚡

### Page Load Speed
- [ ] Landing page loads quickly (< 2 seconds)
- [ ] Dashboard loads quickly (< 3 seconds)
- [ ] No layout shifts during load

### Interaction Responsiveness
- [ ] Buttons respond immediately to clicks
- [ ] Modals open/close without delay
- [ ] Tab switching is instant

### Data Operations
- [ ] Creating note is fast (< 1 second)
- [ ] Updating note is fast (< 1 second)
- [ ] Deleting note is fast (< 1 second)
- [ ] AI summarization completes in reasonable time (< 30 seconds)

---

## 7. Console & Network Tests 🔧

### Browser Console
- [ ] Open DevTools → Console
- [ ] No errors during normal usage
- [ ] No warnings (or only expected ones)

### Network Tab
- [ ] Open DevTools → Network
- [ ] Create a note - see POST to Appwrite
- [ ] Summarize note - see POST to `/api/summarize`
- [ ] View insights - see POST to `/api/insights`
- [ ] All requests return 200 OK (or appropriate status)
- [ ] No failed requests

### Appwrite Console
- [ ] Auth → Users shows created users
- [ ] Databases → Documents shows created notes
- [ ] Each note has correct userId
- [ ] Summaries and tags are saved correctly
- [ ] Deleted notes are gone

---

## 8. Edge Cases & Error Handling 🔍

### Empty Inputs
- [ ] Try to create note with empty title - validation prevents or shows error
- [ ] Try to create note with empty content - validation prevents or shows error

### Very Long Content
- [ ] Create note with 5000+ characters
- [ ] Note saves successfully
- [ ] Content is not truncated in database
- [ ] Content preview is truncated in UI

### Network Offline
- [ ] Turn off WiFi
- [ ] Try to create a note
- [ ] Error is handled gracefully
- [ ] App doesn't crash
- [ ] Turn WiFi back on - app recovers

### Invalid Credentials
- [ ] Login with wrong password
- [ ] Clear error message shows
- [ ] User can try again

### Concurrent Operations
- [ ] Start summarizing a note
- [ ] Immediately try to edit it
- [ ] Both operations complete or one is prevented gracefully

---

## 9. Security Tests 🔒

### Authentication Required
- [ ] Cannot access `/dashboard` without login
- [ ] Cannot access other users' notes
- [ ] Session expires appropriately (test after long period)

### Data Isolation
- [ ] Login as User A, create notes
- [ ] Logout, login as User B
- [ ] User B cannot see User A's notes
- [ ] Each user only sees their own data

### Environment Variables
- [ ] Verify `.env.local` is in `.gitignore`
- [ ] API keys are not exposed in browser
- [ ] Check browser sources - no keys visible

---

## Final Verification ✅

- [ ] All authentication tests passed
- [ ] All CRUD operations work
- [ ] AI features work correctly
- [ ] UI/UX is smooth and professional
- [ ] Responsive on all screen sizes
- [ ] No console errors
- [ ] No network errors
- [ ] Data persists correctly in Appwrite
- [ ] App is ready for deployment

---

## Test Summary

**Total Tests:** ~120+

**Date Tested:** _______________

**Tested By:** _______________

**Result:** ☐ All Passed  ☐ Some Issues  ☐ Failed

**Notes:**
________________________________
________________________________
________________________________

---

**If all tests pass, you're ready to deploy! 🚀**

See `DEPLOYMENT.md` for next steps.
