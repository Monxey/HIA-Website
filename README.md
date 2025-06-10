# Hearts in Action - Non-Profit Website

A comprehensive non-profit website featuring donation processing, AI-powered census data assistant, and organizational information.

## Features

- 🏠 Home page with mission and impact showcase
- 💝 Donation processing with Stripe integration
- 🤖 AI-powered census data assistant
- 📞 Contact form for inquiries
- ℹ️ About page with organizational information
- 📱 Responsive design with dark mode support

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Wouter (routing)
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM (in-memory storage for development)
- **UI Components**: Radix UI, Shadcn/ui
- **Payment Processing**: Stripe
- **AI Integration**: OpenAI API
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/hearts-in-action.git
   cd hearts-in-action
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with:
   ```
   STRIPE_SECRET_KEY=your_stripe_secret_key
   OPENAI_API_KEY=your_openai_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5000`

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utility functions
├── server/                 # Backend Express server
│   ├── routes.ts           # API routes
│   ├── storage.ts          # Data storage interface
│   └── index.ts            # Server entry point
├── shared/                 # Shared types and schemas
│   └── schema.ts           # Database schemas and types
└── package.json            # Dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run preview` - Preview production build

## Deployment

### GitHub Pages (Static Site)

This project includes both frontend and backend, so GitHub Pages alone won't work. Consider these alternatives:

### Recommended Hosting Options

1. **Vercel** - Ideal for full-stack apps
2. **Netlify** - Good for static sites with serverless functions
3. **Railway** - Great for Node.js apps with databases
4. **Heroku** - Traditional platform-as-a-service

### Environment Variables for Production

Make sure to set these environment variables in your hosting platform:

- `STRIPE_SECRET_KEY` - Your Stripe secret key
- `OPENAI_API_KEY` - Your OpenAI API key
- `NODE_ENV=production`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or support, please contact us through the website's contact form or create an issue in this repository.