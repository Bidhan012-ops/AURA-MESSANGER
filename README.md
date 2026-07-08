# Aura Messenger

Aura Messenger is an industrial-grade secure anonymous messaging platform designed for clarity and absolute privacy. With a stunning glassmorphism aesthetic and robust backend architecture, Aura allows users to generate unique links to receive feedback securely.

## 🚀 Features

- **Anonymous Feedback:** Receive messages from anyone while preserving total anonymity for the sender.
- **Glassmorphism UI:** A sleek, premium dark-themed UI built meticulously with Tailwind CSS.
- **Secure Authentication:** NextAuth v5 integration with email-based OTP (One-Time Password) verification.
- **Session Control:** Secure JWT sessions configured for Vercel's Edge runtime.
- **Message Management:** Toggle message acceptance and view incoming transmissions from a centralized Dashboard.
- **Responsive Design:** Fully responsive layout with mobile-optimized navigation.

## 🛠️ How to Use It

### 1. Setup & Installation
Clone the repository and install the dependencies:
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory and configure the following keys:
```env
MONGODB_URI=your_mongodb_connection_string
RESEND_API_KEY=your_resend_api_key
AUTH_SECRET=your_nextauth_secret
```

### 3. Run the Development Server
Start the Next.js development server:
```bash
npm run dev
```
Navigate to `http://localhost:3000` to access the application.

### 4. Application Flow
1. **Generate Link:** Sign up, verify your email using the OTP sent via Resend, and access the Dashboard.
2. **Share Network:** Copy your unique transmission link (`/u/[username]`) from the Dashboard and share it with your audience.
3. **Receive Feedback:** Anonymous users can visit your public link and submit messages to you.
4. **Manage Transmissions:** Read, manage, and toggle your messaging status securely from your Dashboard.

---

## 🏗️ System Architecture

The following diagram illustrates the complete data flow, authentication procedures, and messaging mechanics of the Aura Messenger platform:

```mermaid
sequenceDiagram
    actor AU as Anonymous User
    actor U as Registered User
    participant C as Next.js Client
    participant M as NextAuth (Middleware)
    participant A as API Routes
    participant DB as MongoDB
    participant R as Resend (Email Service)

    %% Authentication Flow
    rect rgb(20, 25, 30)
    note right of U: 1. Registration & Verification Flow
    U->>C: Submits Signup Form (Username, Email, Password)
    C->>A: POST /api/sign-up
    A->>DB: Create Unverified User Document
    A->>R: Trigger Verification Email (OTP)
    R-->>U: Receives Verification Code via Email
    U->>C: Enters Verification Code
    C->>A: POST /api/verifycode
    A->>DB: Mark User as Verified
    end

    %% Session & Dashboard
    rect rgb(20, 30, 25)
    note right of U: 2. Secure Session Flow
    U->>C: Login (Credentials)
    C->>M: NextAuth JWT Authentication
    M->>DB: Validate Credentials (bcrypt)
    M-->>C: Issue __Secure-authjs Session Cookie
    U->>C: Visits /dashboard
    C->>A: Fetch Messages
    A->>DB: Query User Messages
    DB-->>C: Return Message Array
    end

    %% Anonymous Messaging Flow
    rect rgb(30, 20, 25)
    note right of AU: 3. Anonymous Feedback Flow
    AU->>C: Visits /u/[username]
    C->>A: Check if user accepts messages
    A->>DB: Query User Status
    DB-->>C: Returns Status
    AU->>C: Submits Message
    C->>A: POST /api/send-message
    A->>DB: Save Message to User Document
    end
```

## 💻 Tech Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS + Radix UI + Lucide Icons
- **Database:** MongoDB (via Mongoose)
- **Authentication:** NextAuth v5 (Auth.js)
- **Email Service:** Resend + React Email
- **Validation:** Zod + React Hook Form
