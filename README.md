# Shipra Mobile - Future of Air Mobility

Welcome to the Shipra Mobile application repository. This project is a comprehensive air mobility booking platform built with React Native (Expo) and a Node.js/Express backend.

## About

Shipra is designed to revolutionize urban air mobility by providing a seamless booking experience for users. The application integrates advanced mapping, secure authentication, and real-time booking capabilities.

**Key Features:**
- **Smart Booking System:** Easy-to-use interface for scheduling and managing trips.
- **Interactive Maps:** Real-time route visualization using Google Maps integration.
- **Secure Authentication:** Support for Google Sign-In and OTP-based authentication.
- **Payment Integration:** Secure payment processing via Razorpay.
- **User Profiles:** manage personal information and booking history.

## Project Structure

The project is organized as follows:
- `app/`: Frontend application code (Expo Router).
- `backend/`: Node.js Express server, API routes, and database models.
- `components/`: Reusable React Native components.
- `assets/`: Images, fonts, and other static resources.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [Expo Go](https://expo.dev/client) app on your mobile device (Android/iOS) or an emulator.

## Getting Started

Follow these steps to set up and run the application locally.

### 1. Installation

Clone the repository and install dependencies for both the frontend and backend.

**Frontend:**
```bash
# Install root dependencies
npm install
```

**Backend:**
```bash
# Navigate to backend and install server dependencies
cd backend
npm install
cd ..
```

### 2. Environment Configuration

Ensure you have the necessary environment variables set up.
- **Frontend:** Check `.env` in the root directory for API keys (e.g., Google Maps API Key).
- **Backend:** Check `backend/.env` for server configurations (e.g., MongoDB URI, Payment Keys).

### 3. Running the Application

To fully run the application, you need to start both the backend server and the frontend Expo environment.

**Step 1: Start the Backend Server**
Open a terminal and run:
```bash
cd backend
npm run dev
```
*This starts the server in watch mode.*

**Step 2: Start the Expo App**
Open a second terminal window (keep the first one running) and run:
```bash
npx expo start
```
*This will display a QR code. Scan it with the Expo Go app on your phone, or press 'a' for Android emulator / 'i' for iOS simulator.*

## Tech Stack

- **Frontend:** React Native, Expo, Expo Router
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Services:** Google Maps API, Google Auth, Razorpay, Twilio

## Troubleshooting

- **Map not visible?** Ensure your Google Maps API key is correctly set in your `.env` and `app.json`.
- **Server connection issues?** Make sure your device/emulator is on the same network as your computer, and update the API base URL to your machine's local IP address if necessary.

