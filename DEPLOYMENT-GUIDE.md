# 🚀 NexaDriveMotors Deployment Guide

## Quick Start - Put Your Site Live in 5 Minutes!

### Option 1: Deploy to Netlify (Recommended - FREE & Easy)

**Step 1: Prepare Your Site**
```powershell
# Your site is ready! Just make sure the server is running
cd d:\webside\nexamotors
```

**Step 2: Deploy to Netlify**
1. Go to [netlify.com](https://www.netlify.com/)
2. Click "Sign up" (use GitHub, GitLab, or email)
3. Click "Add new site" → "Deploy manually"
4. Drag and drop these files/folders:
   - `index.html`
   - `inventory.html`
   - `about.html`
   - `contact.html`
   - `admin.html`
   - `css/` folder
   - `js/` folder
   - `images/` folder
   - `server/` folder

5. Your site will be live at: `https://your-site-name.netlify.app`

**Step 3: Set Up Backend (Optional)**
For the full-stack features (inventory API, contact form):
1. In Netlify, go to "Site settings" → "Functions"
2. Or use a separate backend hosting (see below)

---

### Option 2: Deploy to Vercel (FREE - Great for Full-Stack)

**Step 1: Install Vercel CLI**
```powershell
npm install -g vercel
```

**Step 2: Deploy**
```powershell
cd d:\webside\nexamotors
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? (choose your account)
- Link to existing project? **N**
- What's your project name? **nexadrivemotors**
- In which directory is your code? **.**
- Auto-detect settings? **N**
- Build command? (leave empty)
- Output directory? **.**
- Development command? `npm start`

**Your site will be live at:** `https://nexadrivemotors.vercel.app`

---

### Option 3: Deploy to GitHub Pages (FREE - Static Only)

**Step 1: Create GitHub Repository**
1. Go to [github.com](https://github.com)
2. Click "New repository"
3. Name it: `nexadrivemotors`
4. Click "Create repository"

**Step 2: Push Your Code**
```powershell
cd d:\webside\nexamotors
git init
git add .
git commit -m "Initial commit - NexaDriveMotors website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/nexadrivemotors.git
git push -u origin main
```

**Step 3: Enable GitHub Pages**
1. Go to your repo → Settings → Pages
2. Source: Deploy from branch → `main` → `/root`
3. Click Save

**Your site will be live at:** `https://YOUR-USERNAME.github.io/nexadrivemotors/`

---

### Option 4: Deploy Backend (Node.js Server) - For Full Features

#### A. Deploy Backend to Render.com (FREE)

1. Go to [render.com](https://render.com)
2. Sign up / Log in
3. Click "New +" → "Web Service"
4. Connect your GitHub repo (or upload files)
5. Settings:
   - **Name**: nexadrivemotors-api
   - **Environment**: Node
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && node server.js`
   - **Port**: 3000
6. Click "Create Web Service"

**Your API will be live at:** `https://nexadrivemotors-api.onrender.com`

#### B. Update Frontend to Use Live API

Edit `js/script.js` and update the API URL:
```javascript
// Change this line:
const API_URL = '/api';

// To your live API:
const API_URL = 'https://nexadrivemotors-api.onrender.com/api';
```

---

### Option 5: Deploy to Railway.app (FREE - Full-Stack in One)

**Step 1: Install Railway CLI**
```powershell
npm install -g @railway/cli
```

**Step 2: Deploy**
```powershell
cd d:\webside\nexamotors
railway login
railway init
railway up
```

**Your site will be live at:** Railway will provide a URL

---

## Custom Domain (Optional)

### If You Have a Domain Name:

**For Netlify:**
1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Enter your domain (e.g., `nexadrivemotors.com`)
4. Update DNS records at your domain registrar

**For Vercel:**
1. Go to Settings → Domains
2. Add your domain
3. Update DNS records

**DNS Records to Add:**
- Type: `CNAME`
- Name: `www` or `@`
- Value: (provided by hosting platform)

---

## 🎯 Recommended Setup

**For Best Results:**
1. **Frontend**: Deploy to Netlify (free, fast CDN)
2. **Backend**: Deploy to Render.com (free Node.js hosting)
3. **Database**: Already using JSON file (works great!)
4. **Custom Domain**: Optional but professional

---

## Quick Commands

### Start Local Development
```powershell
# Start backend server
cd d:\webside\nexamotors\server
node server.js

# Open in browser
start http://localhost:3000
```

### Production Checklist
- [ ] Update contact email in footer
- [ ] Update phone number
- [ ] Update address
- [ ] Add real social media links
- [ ] Change admin password in `server/server.js`
- [ ] Add real vehicle images
- [ ] Test all forms
- [ ] Test all links

---

## Support

- **Netlify Docs**: https://docs.netlify.com
- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs

---

## 🚀 Fastest Way to Go Live RIGHT NOW:

1. Go to [netlify.com/drop](https://app.netlify.com/drop)
2. Drag and drop your entire `nexamotors` folder
3. Your site is LIVE in 30 seconds!

**Note:** For full backend functionality (vehicle API, contact forms), you'll need to deploy the Node.js server separately using Render or Railway.
