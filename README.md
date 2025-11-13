# Configuration Files for Your SecureFood Folder

These files need to be copied to your `Downloads/SecureFood` folder.

## 📋 Files in This Folder

1. **.gitignore** - Git ignore rules (prevents committing node_modules, etc.)
2. **tsconfig.json** - TypeScript configuration
3. **tsconfig.node.json** - TypeScript config for Vite
4. **tailwind.config.js** - Tailwind CSS configuration
5. **postcss.config.js** - PostCSS configuration  
6. **vercel.json** - Vercel deployment settings
7. **deploy.sh** - Automated deployment script

## 🚀 Quick Setup (3 Steps)

### Step 1: Copy Configuration Files

**Windows (File Explorer):**
1. Select all 7 files from this folder
2. Copy them (Ctrl+C)
3. Navigate to your `Downloads\SecureFood` folder
4. Paste (Ctrl+V)

**Windows (Command Prompt):**
```cmd
cd Downloads\SecureFood
copy ..\config-files\* .
```

**Mac/Linux:**
```bash
cd ~/Downloads/SecureFood
cp ../config-files/* .
# Make deploy script executable
chmod +x deploy.sh
```

### Step 2: Install Dependencies

```bash
cd Downloads/SecureFood
npm install
```

### Step 3: Deploy

**Option A: Use Automated Script (Easiest)**
```bash
./deploy.sh
```

**Option B: Manual Commands**
```bash
git init
git add .
git commit -m "Deploy: SecureFood Dashboard"
git remote add origin https://github.com/Diggers33/SecureFood.git
git branch -M main
git push -u origin main --force
```

## ✅ Verify Setup

After copying files, your `Downloads/SecureFood` folder should have:

```
SecureFood/
├── .gitignore          ← NEW
├── deploy.sh           ← NEW
├── index.html          ← EXISTING
├── package.json        ← EXISTING
├── postcss.config.js   ← NEW
├── README.md           ← EXISTING
├── src/                ← EXISTING
├── tailwind.config.js  ← NEW
├── tsconfig.json       ← NEW
├── tsconfig.node.json  ← NEW
├── vercel.json         ← NEW
└── vite.config.ts      ← EXISTING
```

## 🔧 What Each File Does

- **.gitignore**: Prevents Git from tracking unnecessary files (node_modules, build files)
- **tsconfig.json**: Tells TypeScript how to compile your code
- **tsconfig.node.json**: TypeScript settings for Vite build tool
- **tailwind.config.js**: Configures Tailwind CSS styling
- **postcss.config.js**: Enables Tailwind CSS processing
- **vercel.json**: Tells Vercel how to build and deploy your site
- **deploy.sh**: Automates the git push process

## 🎯 After Deployment

1. **Verify GitHub**: https://github.com/Diggers33/SecureFood
2. **Deploy to Vercel**:
   - Go to https://vercel.com
   - Click "Add New Project"
   - Import "Diggers33/SecureFood"
   - Click "Deploy"

Your site will be live in ~2 minutes! 🎉

## 💡 Troubleshooting

**"File already exists"**
- It's okay to overwrite existing config files
- Your source code (src/) won't be affected

**"Permission denied" on deploy.sh**
```bash
chmod +x deploy.sh
```

**"command not found: git"**
- Install Git: https://git-scm.com/downloads

**Build fails on Vercel**
- Make sure you ran `npm install` locally first
- Check package.json has all dependencies listed
