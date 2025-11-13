#!/bin/bash

# SecureFood - Git Setup & Deploy Script
# Run this from your Downloads/SecureFood folder

echo "🚀 SecureFood Dashboard - Deploy to GitHub"
echo "=========================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "src" ]; then
    echo "❌ Error: Please run this script from your SecureFood folder"
    echo "   (the folder containing package.json and src/)"
    exit 1
fi

echo "✅ Found SecureFood project files"
echo ""

# Check for required config files
missing_files=()

if [ ! -f ".gitignore" ]; then missing_files+=(".gitignore"); fi
if [ ! -f "tsconfig.json" ]; then missing_files+=("tsconfig.json"); fi
if [ ! -f "tsconfig.node.json" ]; then missing_files+=("tsconfig.node.json"); fi
if [ ! -f "tailwind.config.js" ]; then missing_files+=("tailwind.config.js"); fi
if [ ! -f "postcss.config.js" ]; then missing_files+=("postcss.config.js"); fi
if [ ! -f "vercel.json" ]; then missing_files+=("vercel.json"); fi

if [ ${#missing_files[@]} -gt 0 ]; then
    echo "⚠️  Missing configuration files:"
    for file in "${missing_files[@]}"; do
        echo "   - $file"
    done
    echo ""
    echo "Please copy these files to your SecureFood folder first."
    echo "Files are available in: config-files/"
    echo ""
    exit 1
fi

echo "✅ All configuration files present"
echo ""

# Initialize git if needed
if [ ! -d .git ]; then
    echo "📦 Initializing git repository..."
    git init
    echo ""
fi

# Add all files
echo "📝 Adding files to git..."
git add .
echo ""

# Create commit
echo "💾 Creating commit..."
git commit -m "Deploy: SecureFood Dashboard

- React 18 + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- Ready for Vercel deployment" || echo "Nothing new to commit"
echo ""

# Set up remote
echo "🔗 Connecting to GitHub repository..."
git remote remove origin 2>/dev/null
git remote add origin https://github.com/Diggers33/SecureFood.git
git branch -M main
echo ""

# Push
echo "🚀 Pushing to GitHub..."
echo ""
echo "⚠️  This will REPLACE all content in Diggers33/SecureFood"
echo ""
read -p "Continue? (yes/no): " -r
echo ""

if [[ $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
    git push -u origin main --force
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "📍 Repository: https://github.com/Diggers33/SecureFood"
    echo ""
    echo "🎯 Next Step: Deploy to Vercel"
    echo "   1. Visit https://vercel.com"
    echo "   2. Click 'Add New Project'"
    echo "   3. Import 'Diggers33/SecureFood'"
    echo "   4. Click 'Deploy'"
    echo ""
    echo "Your site will be live in ~2 minutes! 🎉"
else
    echo "Cancelled."
    echo ""
    echo "To push manually:"
    echo "  git push -u origin main --force"
fi
