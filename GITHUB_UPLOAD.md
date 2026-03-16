# Uploading to GitHub

This guide explains how to push your SCW Portfolio Marketplace code to a GitHub repository.

## 1. Create a New Repository on GitHub
1. Log in to your [GitHub account](https://github.com/).
2. Click the **"+"** icon in the top right and select **"New repository"**.
3. Name it (e.g., `scw-marketplace`).
4. Keep it **Public** or **Private** as per your preference.
5. **Do NOT** initialize with a README, license, or gitignore (we already have these).
6. Click **"Create repository"**.

## 2. Initialize Git Locally
Open your terminal in the project root folder and run:

```bash
# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Premium Marketplace with Admin Console"
```

## 3. Connect and Push to GitHub
Copy the commands from your new GitHub repository page (under "...or push an existing repository from the command line"):

```bash
# Replace <your-username> and <repo-name> with your actual details
git remote add origin https://github.com/<your-username>/<repo-name>.git
git branch -M main
git push -u origin main
```

## 4. Next Steps: Firebase App Hosting (Optional)
If you want to host your site for free with SSL:
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Select **App Hosting** from the sidebar.
3. Connect your newly created GitHub repository.
4. Follow the setup wizard. Your site will automatically redeploy whenever you push to GitHub!

---
© 2024 SCW Portfolio. All rights reserved.
