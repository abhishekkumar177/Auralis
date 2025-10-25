# Appwrite Setup Guide for Smart Notes

This guide will walk you through setting up Appwrite for the Smart Notes application, including Auth and Database configuration.

## Table of Contents
1. [Create Appwrite Project](#create-appwrite-project)
2. [Configure Authentication](#configure-authentication)
3. [Set Up Database](#set-up-database)
4. [Configure Permissions](#configure-permissions)
5. [Add Platform](#add-platform)
6. [Testing](#testing)

## Create Appwrite Project

1. **Sign Up / Login**
   - Go to https://cloud.appwrite.io
   - Sign up for a free account or login

2. **Create a New Project**
   - Click on "Create Project" button
   - Project Name: `Smart Notes`
   - Click "Create"
   - **Important**: Copy your Project ID (you'll need this for `.env.local`)

## Configure Authentication

1. **Navigate to Auth Settings**
   - In your project dashboard, click "Auth" in the left sidebar

2. **Enable Email/Password Authentication**
   - The Email/Password method should be enabled by default
   - If not, enable it under "Auth Methods"

3. **Configure Session Settings (Optional)**
   - Click on "Security" tab
   - Session Length: Default (365 days) or customize
   - Password History: Default (0) or customize
   - Password Dictionary: Enable to prevent common passwords

4. **Email Templates (Optional)**
   - Customize email verification and password recovery templates
   - Add your branding and logo

## Set Up Database

### Create Database

1. **Navigate to Databases**
   - Click "Databases" in the left sidebar
   - Click "Create Database"

2. **Database Configuration**
   - Name: `smart-notes-db`
   - Database ID: Leave as auto-generated or use `smart-notes-db`
   - Click "Create"
   - **Important**: Copy your Database ID for `.env.local`

### Create Notes Collection

1. **Create Collection**
   - Inside your database, click "Create Collection"
   - Name: `notes`
   - Collection ID: Leave as auto-generated or use `notes`
   - Click "Create"
   - **Important**: Copy your Collection ID for `.env.local`

2. **Add Attributes**

Click on "Attributes" tab, then add the following attributes:

**Attribute 1: userId**
- Type: String
- Key: `userId`
- Size: 255
- Required: Yes
- Array: No
- Default Value: (none)

**Attribute 2: title**
- Type: String
- Key: `title`
- Size: 500
- Required: Yes
- Array: No
- Default Value: (none)

**Attribute 3: content**
- Type: String
- Key: `content`
- Size: 10000
- Required: Yes
- Array: No
- Default Value: (none)

**Attribute 4: summary**
- Type: String
- Key: `summary`
- Size: 2000
- Required: No
- Array: No
- Default Value: (empty string)

**Attribute 5: tags**
- Type: String
- Key: `tags`
- Size: 100 (per item)
- Required: No
- Array: Yes (check the array checkbox)
- Min Items: 0
- Max Items: 20
- Default Value: (empty array)

3. **Create Indexes for Performance**

Click on "Indexes" tab, then create:

**Index 1: userId**
- Type: Key
- Index ID: Auto-generated
- Attributes: `userId`
- Order: Ascending

**Index 2: createdAt**
- Type: Key
- Index ID: Auto-generated
- Attributes: `$createdAt`
- Order: Descending

## Configure Permissions

1. **Navigate to Settings Tab**
   - In your collection, click the "Settings" tab
   - Scroll to "Permissions" section

2. **Document Security**
   - Make sure "Document Security" is **enabled** (it should be by default)
   - This allows per-document permissions based on user ID

3. **Collection-Level Permissions**

Add the following permissions:

**Create Documents**
- Role Type: `Users`
- Permission: Any authenticated user can create documents

**Read Documents**
- We'll handle this via queries in the code (filtering by userId)
- You can add: Role Type: `Users`, Permission: Read

**Update Documents**
- We'll handle this via queries in the code (filtering by userId)
- You can add: Role Type: `Users`, Permission: Update

**Delete Documents**
- We'll handle this via queries in the code (filtering by userId)
- You can add: Role Type: `Users`, Permission: Delete

Note: The app uses query-level filtering (`Query.equal('userId', userId)`) to ensure users only access their own notes.

## Add Platform

1. **Navigate to Settings**
   - Click "Settings" at the bottom of the left sidebar
   - Click on "Platforms" tab

2. **Add Web Platform for Development**
   - Click "Add Platform"
   - Select "Web App"
   - Configuration:
     - Name: `Smart Notes - Development`
     - Hostname: `localhost`
     - (Optional) Specify port if not using default: `localhost:3000`
   - Click "Next"

3. **Add Web Platform for Production** (when ready to deploy)
   - Click "Add Platform"
   - Select "Web App"
   - Configuration:
     - Name: `Smart Notes - Production`
     - Hostname: Your production domain (e.g., `smart-notes.vercel.app`)
   - Click "Next"

## Update Environment Variables

After completing the setup, update your `.env.local` file:

```env
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_from_step_1
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id_from_step_3
NEXT_PUBLIC_APPWRITE_NOTES_COLLECTION_ID=your_collection_id_from_step_3

# Gemini API Configuration
GEMINI_API_KEY=your_gemini_api_key_here
```

## Testing

### Test Authentication

1. **Start your development server**
   ```bash
   npm run dev
   ```

2. **Test Signup**
   - Go to http://localhost:3000/signup
   - Create a new account
   - Check Appwrite Console → Auth → Users to see the new user

3. **Test Login**
   - Go to http://localhost:3000/login
   - Login with your credentials
   - You should be redirected to the dashboard

### Test Database Operations

1. **Create a Note**
   - On the dashboard, click "New Note"
   - Enter a title and content
   - Click "Save Note"

2. **Verify in Appwrite Console**
   - Go to Databases → smart-notes-db → notes
   - Click "Documents" tab
   - You should see your note with all attributes

3. **Test Other Operations**
   - Edit a note (click the edit icon)
   - Delete a note (click the delete icon)
   - Verify changes in Appwrite Console

### Test AI Features

1. **Test Summarization**
   - Create a note with substantial content
   - Click the "Summarize" button
   - Wait for AI to generate summary and tags
   - Check that summary appears on the note card

2. **Test AI Insights**
   - Create multiple notes on different topics
   - Switch to "AI Insights" tab
   - Verify categories are generated

## Troubleshooting

### Common Issues

**"Invalid credentials" error**
- Verify your Project ID in `.env.local`
- Check that you're using the correct endpoint
- Ensure the platform hostname is added in Settings

**"Document not found" or permission errors**
- Verify Database ID and Collection ID in `.env.local`
- Check collection permissions in Appwrite Console
- Make sure Document Security is enabled

**Notes not appearing**
- Check browser console for errors
- Verify the `userId` field is being saved correctly
- Check the Appwrite Console → Databases → Documents

**Cannot create notes**
- Verify all required attributes are created
- Check attribute types match the schema
- Review collection-level permissions

## Security Best Practices

1. **Environment Variables**
   - Never commit `.env.local` to version control
   - Use different projects for development and production
   - Rotate API keys periodically

2. **Permissions**
   - Keep Document Security enabled
   - Use query filters to ensure users only access their data
   - Regularly audit user permissions

3. **Authentication**
   - Enable email verification in production
   - Set appropriate session lengths
   - Enable password dictionary to prevent weak passwords

## Next Steps

1. Set up email verification for production
2. Configure custom domain for Appwrite project
3. Set up backup policies for your database
4. Monitor usage and quotas in Appwrite Console
5. Consider upgrading to a paid plan for production use

## Resources

- [Appwrite Documentation](https://appwrite.io/docs)
- [Appwrite Auth Guide](https://appwrite.io/docs/products/auth)
- [Appwrite Database Guide](https://appwrite.io/docs/products/databases)
- [Appwrite SDKs](https://appwrite.io/docs/sdks)
- [Appwrite Community](https://appwrite.io/discord)

## Support

If you encounter issues:
- Check the [Appwrite Status Page](https://status.appwrite.io/)
- Join the [Appwrite Discord](https://appwrite.io/discord)
- Search or ask on [Appwrite Community](https://github.com/appwrite/appwrite/discussions)
- Review [Appwrite GitHub Issues](https://github.com/appwrite/appwrite/issues)
