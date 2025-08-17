# AnimeFinder - Intelligent Anime Recommendations

A modern, responsive web application that helps users discover anime based on their preferences using intelligent search algorithms.

## 🚀 Features

- **Intelligent Search**: Advanced NLP-based search algorithm that understands natural language queries
- **Dark/Light Theme**: Toggle between dark and light themes
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Studio Information**: Complete anime details including production studios
- **Smart Filtering**: Minimum match threshold to ensure quality results
- **Image Fallbacks**: Graceful handling of missing anime images

## 📁 Project Structure

```
html-site-project/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # All CSS styles and responsive design
├── js/
│   ├── anime-data.js       # Demo anime database
│   └── script.js           # Main JavaScript functionality
├── images/                 # Future image assets
└── README.md              # This file
```

## 🛠️ Modular Architecture

### Benefits of Modularization:
- **Better Performance**: CSS and JS files can be cached separately
- **Easier Maintenance**: Update specific components without affecting others
- **Better Organization**: Clear separation of concerns
- **Production Ready**: Standard web development practices

### File Breakdown:
- **`index.html`** (50 lines): Clean HTML structure with external references
- **`css/styles.css`** (400 lines): Complete styling with CSS variables and responsive design
- **`js/anime-data.js`** (200 lines): Demo database with 20 anime entries
- **`js/script.js`** (320 lines): Search algorithm, UI functions, and event handlers

## 🎯 Search Algorithm

The search uses a sophisticated scoring system:
- **Genre Matching** (6 points): Highest priority for genre matches
- **Tag Matching** (3 points): High priority for specific tags
- **Title Matching** (5 points): Exact title matches
- **Word Matching** (1-2 points): Partial matches in titles and descriptions
- **Rating Bonus** (0.5 points): Bonus for high-rated anime

## 🎨 Styling Features

- **CSS Variables**: Easy theme customization
- **Smooth Animations**: Hover effects and transitions
- **Responsive Design**: Mobile-first approach
- **Modern UI**: Clean, professional design
- **Accessibility**: Proper contrast and keyboard navigation

## 🔧 Development

### Local Development:
1. Clone or download the project
2. Open `index.html` in a web browser
3. Start searching for anime!

### Adding New Anime:
1. Edit `js/anime-data.js`
2. Add new entries to the `DEMO_ANIME_DATABASE` array
3. Include all required fields: `id`, `title`, `titleSecondary`, `genres`, `tags`, `description`, `image`, `score`, `episodes`, `status`, `year`, `type`, `studio`

### Customizing Styles:
1. Edit `css/styles.css`
2. Modify CSS variables for easy theme changes
3. Add new responsive breakpoints as needed

## 🚀 Production Deployment

### Recommended Hosting:
- **GitHub Pages**: Free static hosting
- **Netlify**: Easy deployment with custom domain
- **Vercel**: Fast global CDN
- **AWS S3**: Scalable cloud hosting

### Performance Optimizations:
- Minify CSS and JS files
- Optimize images
- Enable gzip compression
- Use CDN for external resources

## 🔮 Future Enhancements

- **Real API Integration**: Replace demo data with live anime database
- **User Accounts**: Save favorites and search history
- **Advanced Filters**: Filter by year, rating, studio, etc.
- **Recommendations**: AI-powered personalized suggestions
- **Social Features**: Share and rate anime

## 📝 License

This project is open source and available under the MIT License.

## ☕ Support

If you find this project helpful, consider buying me a coffee:
[Buy Me a Coffee](https://buymeacoffee.com/rexcci)

---

**Built with ❤️ for the anime community**
