#!/bin/bash

# Smart Git Commit Script for Landmark Technologies DevOps Training Site
# This script analyzes each file and creates appropriate git commits

echo "🚀 Starting smart git commits for Landmark Technologies site..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Function to commit a file with appropriate message
commit_file() {
    local file_path="$1"
    local commit_type="$2"
    local message="$3"
    
    echo "📁 Processing: $file_path"
    git add "$file_path"
    git commit -m "$commit_type: $message"
    echo "✅ Committed: $commit_type: $message"
    echo "---"
}

# Function to commit a directory with appropriate message
commit_directory() {
    local dir_path="$1"
    local commit_type="$2"
    local message="$3"
    
    echo "📂 Processing directory: $dir_path"
    git add "$dir_path"
    git commit -m "$commit_type: $message"
    echo "✅ Committed: $commit_type: $message"
    echo "---"
}

# Core configuration files
echo "🔧 Committing core configuration files..."
commit_file ".gitignore" "chore" "add gitignore for Next.js project with node_modules and build exclusions"
commit_file "package.json" "feat" "add Next.js 15 project with DevOps training site dependencies and Radix UI components"
commit_file "package-lock.json" "chore" "add package-lock.json for dependency version locking"
commit_file "pnpm-lock.yaml" "chore" "add pnpm lockfile for consistent dependency management"
commit_file "next.config.mjs" "feat" "configure Next.js with TypeScript and ESLint build optimizations"
commit_file "tsconfig.json" "feat" "setup TypeScript configuration with path aliases and Next.js integration"
commit_file "postcss.config.mjs" "feat" "configure PostCSS with Tailwind CSS processing"
commit_file "components.json" "feat" "configure shadcn/ui component library with New York style and Lucide icons"

# Styling
echo "🎨 Committing styles..."
commit_directory "styles/" "feat" "add global CSS styles with Tailwind CSS configuration and custom animations"

# App directory (Next.js 13+ App Router)
echo "📱 Committing Next.js App Router pages..."
commit_file "app/layout.tsx" "feat" "create root layout with theme provider, fonts, and SEO metadata for DevOps training site"
commit_file "app/globals.css" "feat" "add global styles with Tailwind CSS, custom gradients, and animation utilities"
commit_file "app/page.tsx" "feat" "create landing page with hero, stats, features, and testimonials sections"

# Individual page routes
commit_file "app/about/page.tsx" "feat" "add about page showcasing company history, mission, values, and team since 2005"
commit_file "app/contact/page.tsx" "feat" "create contact page with inquiry form and consultation booking for DevOps training"
commit_file "app/courses/page.tsx" "feat" "add comprehensive courses page with 14-module DevOps curriculum and pricing details"
commit_file "app/services/page.tsx" "feat" "create services page highlighting DevOps training, corporate programs, and consulting"
commit_file "app/testimonials/page.tsx" "feat" "add testimonials page with video testimonials and success stories from DevOps graduates"
commit_file "app/faq/page.tsx" "feat" "create FAQ page addressing common questions about DevOps training program and enrollment"
commit_file "app/faq/loading.tsx" "feat" "add loading component for FAQ page with skeleton UI"
commit_file "app/register/page.tsx" "feat" "create registration page for DevOps training enrollment with comprehensive form"

# Management dashboard
commit_directory "app/mgt/" "feat" "add management dashboard for student enrollment tracking and cohort management"

# React components
echo "⚛️  Committing React components..."
commit_file "components/navigation.tsx" "feat" "create responsive navigation header with theme toggle and mobile menu"
commit_file "components/footer.tsx" "feat" "add footer component with contact info, social links, and company details"
commit_file "components/theme-provider.tsx" "feat" "add theme provider for dark/light mode switching functionality"
commit_file "components/theme-toggle.tsx" "feat" "create theme toggle button component for dark/light mode switching"

# Home page components
commit_directory "components/home/" "feat" "add home page components: hero section, stats, features, course overview, testimonials, and CTA"

# UI component library (shadcn/ui)
echo "🧩 Committing UI component library..."
commit_directory "components/ui/" "feat" "add comprehensive shadcn/ui component library with 40+ reusable components"

# Utility functions and hooks
echo "🔧 Committing utilities and hooks..."
commit_directory "hooks/" "feat" "add custom React hooks for mobile detection and toast notifications"
commit_directory "lib/" "feat" "add utility functions and mock data for student management and application state"

# Static assets
echo "🖼️  Committing static assets..."
commit_directory "public/" "feat" "add static assets including placeholder images, logos, and professional photos"

echo ""
echo "🎉 All files have been committed successfully!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Summary: Landmark Technologies DevOps Training Site"
echo "   • Next.js 15 with App Router"
echo "   • TypeScript + Tailwind CSS"
echo "   • shadcn/ui component library"
echo "   • Comprehensive DevOps training curriculum"
echo "   • Student management dashboard"
echo "   • Responsive design with dark/light themes"
echo "   • 14 training modules covering Linux to Kubernetes"
echo "   • Professional testimonials and success stories"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
