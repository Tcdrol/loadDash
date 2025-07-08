# Loans Dashboard Mobile App

A comprehensive loan management application built with React Native, Expo, and NativeWind.

## Features

- **User Authentication**: Secure login and signup
- **Loan Management**: Track both given and taken loans
- **Payment Tracking**: Monitor upcoming and completed payments
- **Analytics**: Visualize loan data with charts and statistics
- **Dark/Light Mode**: Built-in theme support
- **Offline Support**: Work without an internet connection

## Tech Stack

- **Frontend**: React Native with TypeScript
- **Navigation**: React Navigation
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **State Management**: React Query
- **UI Components**: React Native Paper (optional)
- **Icons**: Expo Vector Icons
- **Form Handling**: React Hook Form
- **Date Handling**: date-fns
- **Charts**: react-native-chart-kit

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (for iOS development) or Android Studio (for Android development)

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/loans-dashboard.git
   cd loans-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Run on your device or emulator**
   - Scan the QR code with the Expo Go app (iOS) or Camera app (Android)
   - Or press `i` for iOS simulator or `a` for Android emulator

## Project Structure

```
src/
├── assets/            # Images, fonts, and other static files
├── components/        # Reusable UI components
├── constants/         # App constants and configurations
├── context/           # React Context providers
├── hooks/             # Custom React hooks
├── navigation/        # Navigation configuration
├── screens/           # App screens
│   ├── auth/          # Authentication related screens
│   └── loans/         # Loan management screens
├── services/          # API services and data fetching
├── types/             # TypeScript type definitions
└── utils/             # Utility functions and helpers
```

## Available Scripts

- `npm start` - Start the development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run in web browser
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
# API Configuration
API_BASE_URL=your_api_url_here

# Auth0 Configuration (if using Auth0)
AUTH0_DOMAIN=your_auth0_domain
AUTH0_CLIENT_ID=your_auth0_client_id
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Expo](https://expo.io/)
- [React Native](https://reactnative.dev/)
- [NativeWind](https://www.nativewind.dev/)
- [React Navigation](https://reactnavigation.org/)
- [React Query](https://tanstack.com/query/v3/)
