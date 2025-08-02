# 🚀 Velocity AI - Intelligent Search & Discovery Platform

<div align="center">
  <img src="public/title_logo.svg" alt="Velocity AI Logo" width="320"> <br/>  <br/>  
  
  **A Perplexity clone - AI-powered search and discovery platform with real-time insights and comprehensive analysis**
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.4.5-000000.svg)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue.svg)](https://typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4.svg)](https://tailwindcss.com/)
  [![Supabase](https://img.shields.io/badge/Supabase-2.53.0-3ECF8E.svg)](https://supabase.com/)
  [![Inngest](https://img.shields.io/badge/Inngest-3.40.1-5B21B6.svg)](https://inngest.com/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
</div>

---

## ✨ Key Features

-   **🤖 AI-Powered Search** - Perplexity-style search with Google Gemini AI providing intelligent analysis and summaries
-   **🔍 Multi-Source Discovery** - Integration with Brave Search API for comprehensive web results
-   **📊 Real-time Processing** - Asynchronous task processing with Inngest for scalable operations
-   **🎯 Smart Categorization** - Organized discovery sections (Tech & Science, Finance, Art & Culture, etc.)
-   **🔐 Secure Authentication** - Clerk-based authentication system with user management
-   **💾 Data Persistence** - Supabase integration for storing search history and user preferences
-   **⚡ Fast Performance** - Next.js App Router with optimized server-side rendering
-   **🎨 Modern Interface** - Clean design with Lucide React icons and intuitive navigation
-   **📄 Rich Content Display** - Markdown rendering for formatted AI responses

## 🏗️ Architecture

```
velocity-ai/
├── 📁 app/
│   ├── layout.js                # 🏠 Root layout with providers
│   ├── page.js                  # 🔍 Main search interface
│   ├── Provider.jsx             # 🔄 Context providers wrapper
│   ├── globals.css              # 🎨 Global styles
│   │
│   ├── 📁 _components/          # 🧩 Shared UI components
│   │   ├── AppSideBar.jsx       # 📋 Navigation sidebar
│   │   └── ChatBoxInput.jsx     # 💬 Search input interface
│   │
│   ├── 📁 (auth)/               # 🔐 Authentication routes
│   │   ├── sign-in/
│   │   └── sign-up/
│   │
│   ├── 📁 (routes)/             # 📄 Main application routes
│   │   ├── discovery/           # 🔭 Content discovery page
│   │   ├── library/             # 📚 Saved content library
│   │   └── search/[libid]/      # 🔍 Search results display
│   │
│   └── 📁 api/                  # 🔌 API endpoints
│       ├── brave-search-api/    # 🦁 Brave Search integration
│       ├── llm-model/           # 🤖 AI model API
│       └── inngest/             # ⚡ Background job processing
│
├── 📁 components/               # 🎯 Reusable UI components
│   ├── MobileWarning.jsx        # 📱 Mobile compatibility alert
│   └── ui/                      # 🎨 Base UI components (Radix)
│
├── 📁 context/                  # 🔄 React context providers
├── 📁 hooks/                    # 🪝 Custom React hooks
├── 📁 inngest/                  # ⚡ Background job functions
├── 📁 lib/                      # 🛠️ Utility functions
├── 📁 services/                 # 🔌 External service integrations
└── 📁 public/                   # 📂 Static assets
```

## 🚀 Quick Start

### Prerequisites

-   **Node.js** 18+
-   **npm/yarn/pnpm**

### 1. Clone & Setup

```bash
# Clone the repository
git clone https://github.com/mohitooo28/VelocityAI.git
cd VelocityAI

# Install dependencies
npm install

# Install Inngest CLI globally for local development
npm install -g inngest-cli
```

### 2. Environment Configuration

Copy the example environment file and configure with your API keys:

```bash
# Copy the example environment file
cp .env.example .env.local

# Edit the .env.local file with your actual API keys
```

### 3. Start Development Servers

You need to run both the Next.js application and Inngest development server:

```bash
# Terminal 1: Start the Next.js development server
npm run dev

# Terminal 2: Start Inngest development server (in a new terminal)
npx inngest-cli@latest dev
```

### 4. Access the Application

-   **Frontend**: [http://localhost:3000](http://localhost:3000)
-   **Inngest Dashboard**: [http://localhost:8288](http://localhost:8288)

### 5. Verify Setup

1. **Test Authentication**: Try signing up/signing in through Clerk
2. **Test Search**: Perform a search query to verify Brave API integration
3. **Check Inngest**: Visit the Inngest dashboard to see function registrations
4. **Database Connection**: Verify Supabase connection in the browser console

## 📖 How to Use

### 🔍 Smart Search

1. **Open Velocity AI** and use the main search interface
2. **Enter Your Query** - Type any topic you want to explore
3. **AI Processing** - The system processes your query with multiple sources
4. **Get Results** - Receive comprehensive AI-generated summaries and insights
5. **Save to Library** - Store interesting results for future reference

### 🔭 Discovery Mode

1. **Navigate to Discovery** - Explore trending topics by category
2. **Choose Category** - Select from Tech & Science, Finance, Art & Culture, etc.
3. **Browse Content** - View curated content cards with summaries

### 📚 Library Management

1. **Access Your Library** - View all your previous searches
2. **Re-explore** - Revisit previous searches and analyses

## 💻 VelocityAI Usage Walkthrough

https://github.com/user-attachments/assets/027e8cbd-4a13-4b59-abc9-15f093b30197

## 🛠️ Tech Stack

-   🚀 **Next.js 15** - Full-stack React framework with App Router
-   ⚡ **Inngest** - Background job processing and workflow management
-   🔐 **Clerk** - Authentication and user management
-   💾 **Supabase** - PostgreSQL database with real-time features
-   ⚛️ **React 18** - UI framework with hooks and context
-   🎨 **Tailwind CSS 4** - Utility-first CSS framework
-   📝 **React Markdown** - Markdown rendering for AI responses
-   🧠 **Google Gemini AI** - Advanced language model integration
-   🦁 **Brave Search API** - Privacy-focused web search
-   📊 **Axios** - HTTP client for API requests

## 🔑 Required API Keys

1. **🧠 Google Gemini AI API Key**

    - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
    - Create a new API key for Gemini 1.5 Flash model
    - [Documentation](https://ai.google.dev/docs)

2. **🦁 Brave Search API Key**

    - Sign up at [Brave Search API](https://api.search.brave.com/)
    - Get your subscription token
    - [Documentation](https://api.search.brave.com/app/documentation)

3. **💾 Supabase Setup**

    - Create project at [Supabase](https://supabase.com/)
    - Get your project URL and anon key
    - [Documentation](https://supabase.com/docs)

4. **🔐 Clerk Authentication**

    - Create application at [Clerk](https://clerk.com/)
    - Configure sign-in/sign-up flows
    - [Documentation](https://clerk.com/docs)

5. **⚡ Inngest Configuration**
    - Set up account at [Inngest](https://www.inngest.com/)
    - Get your event and signing keys
    - [Documentation](https://www.inngest.com/docs)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ for intelligent search and discovery**

[🌟 Star this repo](../../stargazers) • [🐛 Report Bug](../../issues) • [💡 Request Feature](../../issues)

</div>
