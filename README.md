# GrowthAI - Business Growth Platform

A modern, AI-powered platform that helps businesses grow through personalized recommendations and strategies.

## Features

- **Beautiful Landing Page** - Modern, visually appealing design with smooth animations
- **Service Selection** - Choose from multiple business services:
  - Professional Email Setup
  - Lead Generation Strategy
  - Marketing Campaign Planning
- **Interactive Quiz** - 10-12 question questionnaire for each service
- **AI-Powered Recommendations** - Get personalized insights using Google's Gemini AI
- **Modern UI/UX** - Built with React, Next.js, Tailwind CSS, and Framer Motion

## Color Theme

The application uses a custom color palette:
- Primary Blue: `#1E40AF`
- Primary Purple: `#753AED`
- Primary Orange: `#F5900B`

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
business-ai/
├── app/
│   ├── components/
│   │   ├── LandingPage.tsx      # Main landing page
│   │   ├── ProductsSection.tsx  # Service selection page
│   │   └── QuizInterface.tsx    # Quiz and AI response page
│   ├── utils/
│   │   └── gemini.ts            # Google Gemini AI integration
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Main app component
├── public/                      # Static assets
└── package.json                 # Dependencies
```

## Technologies Used

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Google Generative AI** - AI-powered recommendations

## How It Works

1. **Landing Page** - Users are greeted with a modern landing page
2. **Get Started** - Click the "Get Started" button to view services
3. **Select Service** - Choose from Professional Email, Lead Generation, or Marketing Campaign Planner
4. **Complete Quiz** - Answer 10-12 questions about your business
5. **Get AI Recommendations** - Receive personalized, AI-generated recommendations based on your answers

## License

MIT
