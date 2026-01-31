# JAMStack Blog with Eleventy

A fast and secure blog built with Eleventy, featuring a headless CMS (Decap) for content management and deployed on Netlify.

This project was originally built following a tutorial by [Kevin Powell](https://www.kevinpowell.co/) from [DevProjects](https://www.codementor.io/projects/web/create-a-fast-and-secure-blog-using-jamstack-c93coupnxb).

## Tech Stack

- **Static Site Generator**: [Eleventy](https://www.11ty.dev/) (v3.0.0)
- **Templating**: Nunjucks
- **CMS**: [Decap CMS](https://decapcms.org/) (formerly Netlify CMS)
- **Hosting**: Netlify
- **Authentication**: Netlify Identity (for CMS access)

## Live Demo

[View the live site on Netlify](https://eleventyjamstackproject.netlify.app/)

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- npm (comes with Node.js)
- A [Netlify](https://www.netlify.com/) account (for deployment and CMS)

## Local Development

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd EleventyJAMStackCMS
```

2. Install dependencies:
```bash
npm install
```

### Running the Development Server

Start the local development server with live reload:
```bash
npm start
```

The site will be available at `http://localhost:8080` (or another port if 8080 is in use).

### Building for Production

To build the site for production:
```bash
npm run build
```

This generates static files in the `public/` directory.

## Project Structure

```
├── src/                  # Source files
│   ├── _includes/        # Nunjucks templates and partials
│   ├── admin/            # Decap CMS configuration
│   ├── assets/           # Static assets (copied to output)
│   ├── blog/             # Blog post markdown files
│   ├── index.njk         # Homepage
│   ├── blog.njk          # Blog listing page
│   └── style.css         # Global styles
├── public/               # Generated output (do not edit)
│   └── assets/blog/      # Uploaded images from CMS
├── .eleventy.js          # Eleventy configuration
└── package.json          # Dependencies and scripts
```

## Deploying to Netlify

### Option 1: Connect via Netlify Dashboard (Recommended)

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Log in to [Netlify](https://app.netlify.com/)
3. Click "Add new site" → "Import an existing project"
4. Connect your Git provider and select your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `public`
6. Click "Deploy site"

### Option 2: Deploy via Netlify CLI

1. Install Netlify CLI globally:
```bash
npm install -g netlify-cli
```

2. Build and deploy:
```bash
npm run build
netlify deploy --prod
```

## Setting Up the CMS

After deploying to Netlify, enable the CMS:

### Enable Netlify Identity

1. In your Netlify site dashboard, go to **Settings** → **Identity**
2. Click "Enable Identity"
3. Under **Registration preferences**, select "Invite only" (recommended)
4. Under **External providers** (optional), enable GitHub, Google, etc.
5. Under **Services** → **Git Gateway**, click "Enable Git Gateway"

### Invite Users

1. Go to **Identity** tab in your Netlify dashboard
2. Click "Invite users"
3. Enter email addresses for users who should have CMS access
4. Users will receive an invite email to set up their account

### Access the CMS

Navigate to `https://your-site.netlify.app/admin/` and log in with your Netlify Identity credentials. From there, you can create, edit, and manage blog posts with a user-friendly interface.

## Content Management

### Adding Blog Posts

**Via CMS (Recommended):**
1. Navigate to `/admin/`
2. Log in with Netlify Identity
3. Click "New Blog" to create a post
4. Fill in the fields and upload a featured image
5. Click "Publish" to save

**Manually:**
Create a new markdown file in `src/blog/` with this frontmatter:
```yaml
---
title: Your Post Title
author: Your Name
date: 2025-01-31
tags: ["post", "featured"]
image: /assets/blog/your-image.jpg
imageAlt: Image description
description: Brief post description
---

Your post content here...
```

### Managing Images

Images uploaded through the CMS are stored in `public/assets/blog/`. You can also manually add images to this directory and reference them in your posts.

## License

[MIT](https://choosealicense.com/licenses/mit/)
