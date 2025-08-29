oad  h# Next.js Authentication Project

A modern authentication system built with Next.js, featuring user signup, signin, and a chat interface.

## Features

- 🔐 User authentication (signup/signin)
- 💬 Real-time chat functionality
- 🌙 Dark/Light theme switching
- 📱 Responsive design
- ⚡ Built with Next.js 14

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Custom API routes
- **State Management**: React Context

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd authentication
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── api/auth/          # Authentication API routes
│   ├── Component/         # Reusable components
│   ├── Context/           # React context providers
│   ├── chatbox/           # Chat interface
│   └── types/             # TypeScript type definitions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).
