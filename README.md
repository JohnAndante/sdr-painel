# SDR Painel - Voice AI Platform

A whitelabel Voice AI automation platform that enables companies to scale customer voice contact through intelligent virtual agents, call scheduling, and conversation analytics.

## 🚀 Features

### Core Voice AI Platform
- **Subject Management**: Manage customer data with bulk import/export
- **Agent Configuration**: Create and customize virtual agents with personalities and voices
- **Call Operations**: Schedule and manage automated calls at scale
- **Analytics Dashboard**: Track conversation metrics and success rates
- **Whitelabel Ready**: Full customization (logo, colors, branding)

### Technical Features
- **Modern Stack**: React 19, TypeScript, Vite
- **Design System**: Material Design 3 with Tailwind CSS
- **Accessible UI**: Radix UI components with WCAG 2.1 AA compliance
- **Real-time**: Live call monitoring and updates
- **Mobile-first**: Responsive design for all devices

## 🛠 Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, Radix UI
- **State Management**: React hooks + Context API
- **Forms**: React Hook Form with Zod validation
- **Tables**: TanStack Table
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Development**: ESLint, Prettier, Hot reload

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sdr-painel
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp env.example .env.local
# Edit .env.local with your configuration
```

4. Start development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # UI components organized by domain
│   ├── auth/           # Authentication components
│   ├── subjects/       # Subject management
│   ├── agents/         # Agent configuration
│   ├── calls/          # Call operations
│   ├── analytics/      # Analytics & reporting
│   ├── whitelabel/     # Branding customization
│   └── ui/             # Reusable UI primitives
├── controllers/        # API integration layer
├── hooks/             # Custom React hooks
├── lib/               # External integrations
├── types/             # TypeScript definitions
├── utils/             # Utility functions
└── styles/            # Global styles and design system
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run type-check` - Check TypeScript types
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## 🎨 Design System

The project uses a custom Material Design 3 implementation with:

- **Color System**: Semantic color tokens with light/dark themes
- **Typography**: Poppins font with MD3 type scale
- **Spacing**: 4px base grid system
- **Elevation**: MD3 shadow system
- **Motion**: Standard and emphasized animations

## 🌐 Environment Variables

See `env.example` for all available environment variables.

Key variables:
- `VITE_API_BASE_URL` - API backend URL
- `VITE_VOICE_SERVICE_URL` - Voice AI service endpoint
- `VITE_ENABLE_WHITELABEL` - Enable/disable whitelabel features

## 🤝 Contributing

1. Follow the established patterns in the codebase
2. Use TypeScript strictly (no `any` types)
3. Follow the component patterns using Radix UI + Tailwind
4. Write tests for critical paths
5. Format code with Prettier before committing

## 📄 License

Private project - all rights reserved.
