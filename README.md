# Deepcomet AI Dev Blog

[![Deploy](https://github.com/Nehal-aditya/devblogs-deepcomet/actions/workflows/jekyll.yml/badge.svg)](https://github.com/Nehal-aditya/devblogs-deepcomet/actions/workflows/jekyll.yml)

The official developer blog for [Deepcomet AI](https://ai.deepcomet.space), built with [Jekyll](https://jekyllrb.com) and the [Mediumish](https://github.com/wowthemesnet/mediumish-theme-jekyll) theme.

**Live Site:** [devblogs.deepcomet.space](https://devblogs.deepcomet.space)

## Overview

This is a Jekyll-based blog that publishes articles about:

- Engineering deep dives into Deepcomet AI technology
- Research updates and paper summaries
- Company announcements and milestones
- Tutorials and developer guides

## Tech Stack

- **Static Site Generator:** [Jekyll](https://jekyllrb.com)
- **Theme:** [Mediumish](https://github.com/wowthemesnet/mediumish-theme-jekyll) (via `remote_theme`)
- **Hosting:** [GitHub Pages](https://pages.github.com)
- **Comments:** [Disqus](https://disqus.com)
- **Analytics:** Google Analytics

## Project Structure

```
devblogs-deepcomet/
├── _config.yml              # Site configuration
├── Gemfile                  # Ruby dependencies
├── CNAME                    # Custom domain (devblogs.deepcomet.space)
├── .gitignore               # Ignore _site, vendor, etc.
├── index.md                 # Homepage
├── about.md                 # About page
├── contact.md               # Contact page
├── _posts/                  # Blog posts (YYYY-MM-DD-title.md)
│   ├── 2026-05-10-welcome-to-deepcomet-ai.md
│   ├── 2026-05-10-designing-aurelia-for-ai-native-systems.md
│   └── 2026-05-10-zenith-kernel-probabilistic-scheduling.md
├── _layouts/                # Page layouts
│   ├── default.html
│   ├── home.html
│   ├── post.html
│   └── page.html
├── _includes/               # Reusable components
│   ├── navigation.html
│   ├── footer.html
│   ├── pagination.html
│   └── disqus.html
├── _data/                   # Data files
│   └── navigation.yml
├── assets/                  # Static assets
│   ├── css/
│   │   └── custom.css       # Deepcomet AI custom styles
│   ├── js/
│   │   └── custom.js        # Custom scripts
│   └── images/              # Blog images
└── .github/workflows/
    └── jekyll.yml           # GitHub Actions deployment
```

## Getting Started

### Local Development

#### Prerequisites

- [Ruby](https://www.ruby-lang.org) 2.7+ with DevKit (Windows) or rbenv/rvm (macOS/Linux)
- [Bundler](https://bundler.io): `gem install bundler`

#### Install & Preview

```bash
# 1. Install Ruby dependencies
bundle install

# 2. Build and serve with live reload
bundle exec jekyll serve --livereload

# 3. Open http://localhost:4000 in your browser
```

Common flags:

| Flag | Description |
|------|-------------|
| `--livereload` | Auto-refresh browser on file changes |
| `--drafts` | Include `_drafts/` posts in preview |
| `--future` | Include posts with future dates |
| `--incremental` | Faster rebuilds during development |

#### Preview Drafts

```bash
# Create a draft
mkdir -p _drafts
touch _drafts/my-draft-post.md

# Preview with drafts enabled
bundle exec jekyll serve --drafts --livereload
```

### Writing a Post

1. Create a new file in `_posts/` with format: `YYYY-MM-DD-title.md`
2. Add frontmatter:
   ```yaml
   ---
   layout: post
   title: "Your Post Title"
   description: "Brief description for SEO and previews"
   author: nehal
   date: 2026-05-10 09:00:00 +0530
   categories: [engineering, category-name]
   tags: [tag1, tag2]
   featured: true  # Optional: marks as featured post
   ---
   ```
3. Write content in Markdown
4. Commit and push — GitHub Actions will deploy automatically

## Deployment

The site automatically deploys to GitHub Pages on every push to `main`.

**Custom Domain:** `devblogs.deepcomet.space`

## Configuration

Key settings in `_config.yml`:

| Setting | Description |
|---------|-------------|
| `name` | Site title |
| `description` | Meta description |
| `url` | Base URL (https://devblogs.deepcomet.space) |
| `author` | Default post author |
| `disqus` | Disqus shortname for comments |
| `analytics` | Google Analytics tracking ID |

## Customization

- **Styles:** Edit `assets/css/custom.css`
- **Scripts:** Edit `assets/js/custom.js`
- **Navigation:** Edit `_data/navigation.yml`
- **Layouts:** Edit files in `_layouts/`

## License

Content is &copy; Deepcomet AI. Code is [MIT](LICENSE).
