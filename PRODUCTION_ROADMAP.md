# Production Roadmap & Gap Analysis

## 🚨 Current Status: "Prototype / Demo Mode"
The application is currently configured for rapid development and demonstration (simulations). It is **NOT** ready for the App Store/Play Store yet.

---

## 🛑 Critical Issues to Resolve for Production

### 1. 🗺️ Maps Integration (Currently Mocked)
*   **Current State**: We are using a "Mock Map" (Grey Box) to prevent crashes in Expo Go.
*   **Production Requirement**: Real Google Maps.
*   **Required Changes**:
    1.  Uncomment `import MapView...` in `HomeScreen.js` and `BookingScreen.js`.
    2.  **Critical**: You cannot use "Standard Expo Go" from the Play Store for this. You **MUST** create a "Development Build".
    3.  Command: `npx expo prebuild` and `npx expo run:android`.

### 2. 💳 Payment Gateway (Currently Simulated)
*   **Current State**: The app shows an Alert "Razorpay Order Created" and simulates success on click.
*   **Production Requirement**: Real Payment Processing.
*   **Required Changes**:
    1.  Install `react-native-razorpay` (Native Module).
    2.  Update `BookingScreen.js` to prompt the actual Razorpay SDK checkout.
    3.  **Backend**: Add a webhook to verify payment signature (HMAC-SHA256) before confirming booking. Currently, we confirm it blindly.

### 3. 🔐 Authentication & Security
*   **Current State**:
    *   Universal OTP `123456` is enabled.
    *   API accepts `userId` in the request body (Insecure - anyone can book for anyone).
*   **Production Requirement**:
    1.  Set `USE_MOCK_AUTH=false` in `.env`.
    2.  Backend: Implement **JWT Middleware**. The `createBooking` endpoint should read `req.user.id` from the token, not `req.body.userId`.
    3.  Twilio: Ensure funds are added for real SMS.

### 4. ⚙️ Backend Robustness
*   **Current State**: Simple "Happy Path" logic.
*   **Production Requirement**:
    1.  **Validation**: Add `express-validator` to check inputs (e.g. prevent negative costs, invalid lat/lng).
    2.  **Rate Limiting**: Prevent API spam.
    3.  **Logging**: Use `winston` or `morgan` for file-based logging, not just console.

---

## 📅 Step-by-Step Transition Plan

### Phase 1: Native Build Setup (The "EAS" Shift)
You must stop using "Expo Go" and switch to "Development Builds".
1.  `npm install -g eas-cli`
2.  `eas login`
3.  `eas build --profile development --platform android`
4.  This creates a custom "Shipra App" on your emulator that supports Maps and Payments natively.

### Phase 2: Code Cleanup
1.  Edit `components/shipra/HomeScreen.js`: Remove Mock Map view, restore `react-native-maps`.
2.  Edit `components/shipra/BookingScreen.js`: Remove Mock Map, restore `react-native-maps`.
3.  Edit `booking logic`: Replace `Alert` with `RazorpayCheckout.open(options)`.

### Phase 3: Backend Hardening
1.  Middleware: Create `middleware/auth.js` to verify JWT.
2.  Apply `auth` middleware to `/api/bookings`.

