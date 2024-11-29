# Backstage Web Design Cost Calculator

A professional web design cost calculator built with React, TypeScript, and Tailwind CSS. This application helps clients estimate website development costs based on their specific requirements.

## Features

- 🎯 Accurate cost estimation for different website types
- 💼 Support for WordPress, E-commerce, Web Apps, and existing site modifications
- 🛠 Customizable pricing for features and services
- 📊 Admin dashboard for price management
- 🎨 Modern, responsive UI with Tailwind CSS
- 🔒 Secure admin authentication
- 💾 Persistent storage with Zustand

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- React Router DOM
- React Hook Form
- Zod (Form Validation)
- Lucide React (Icons)

## Project Structure

```
src/
├── components/         # React components
│   ├── admin/         # Admin dashboard components
│   ├── Calculator/    # Calculator components
│   └── steps/         # Quote steps components
├── store/             # Zustand stores
│   └── defaults/      # Default store values
├── types/             # TypeScript types
├── utils/             # Utility functions
│   └── pricing/       # Pricing calculation logic
└── features/          # Feature definitions
```

## Key Features

### Quote Calculator
- Step-by-step quote generation
- Dynamic pricing based on requirements
- Real-time cost updates
- Support for multiple website types

### Admin Dashboard
- Secure login system
- Base pricing configuration
- Flat fee services management
- Agency profile management
- Hourly rates configuration

### Pricing System
- Base price calculation
- Additional pages pricing
- Feature-based pricing
- Content creation costs
- Post-launch services

## Development

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Admin Access

Default credentials:
- Username: admin
- Password: admin

## License

MIT License - See LICENSE file for details

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request