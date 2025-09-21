# BitMind GAS Dashboard

A real-time leaderboard dashboard for BitMind AI Detection system, displaying discriminator and generator performance metrics.

## Features

- 🏆 **Real-time Leaderboards**: Live discriminator and generator rankings
- 📊 **Interactive Filtering**: Filter by modality, attempts, and display limits
- 🎯 **Performance Metrics**: Detailed scoring and performance analytics
- 💰 **Incentive Tracking**: Coming soon - reward mechanism details
- 💳 **Payout History**: Coming soon - transparent payment tracking
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: Custom CSS with dark theme
- **API**: Axios for HTTP requests
- **Icons**: Lucide React
- **Deployment**: Vercel

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

1. Clone the repository

```bash
git clone <your-repo-url>
cd gas-dashboard
```

2. Install dependencies

```bash
npm install
```

3. Start development server

```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
```

## Deployment

This project is configured for easy deployment on Vercel:

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel will automatically detect it's a React app and deploy it
4. The `vercel.json` configuration ensures proper routing and caching

### Environment Variables

No environment variables are required for basic functionality. The app connects to the BitMind API at `https://gas.bitmind.ai`.

## API Integration

The dashboard connects to the BitMind GAS API endpoints:

- `/api/v1/analytics/leaderboard` - Discriminator leaderboard
- `/api/v1/analytics/generator-leaderboard` - Generator leaderboard
- `/api/v1/analytics/system-stats` - System statistics
- `/api/v1/analytics/discriminator/{id}/detailed-stats` - Detailed discriminator stats

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is private and proprietary to BitMind.
