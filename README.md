# Hangman Game

A modern, interactive Hangman game built with React, TypeScript, and Framer Motion.

## Features

- Single player and 1v1 modes
- Multiple themes with custom animations
- Responsive keyboard interface
- Word submission system
- Score tracking
- Round-based gameplay

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Framer Motion for animations
- Zustand for state management

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/YOUR_USERNAME/hangman-game.git
   cd hangman-game/project
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```

## Deployment

This project can be deployed to various platforms:

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel will automatically detect the React app and deploy it

### Netlify
1. Push your code to GitHub
2. Connect your GitHub repository to Netlify
3. Set the build command to `npm run build`
4. Set the publish directory to `dist`

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
   ```json
   "homepage": "https://YOUR_USERNAME.github.io/hangman-game",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Run `npm run deploy`

## License

MIT