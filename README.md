# Aura Messenger

**Live Demo:** [https://aura-messanger.vercel.app/](https://aura-messanger.vercel.app/)

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
graph TD
    classDef default fill:#111827,stroke:#374151,stroke-width:2px,color:#f3f4f6;
    classDef user fill:#000000,stroke:#f59e0b,stroke-width:2px,color:#f3f4f6;
    classDef process fill:#1f2937,stroke:#374151,stroke-width:1px,color:#f3f4f6;
    classDef external fill:#1e3a8a,stroke:#3b82f6,stroke-width:1px,color:#f3f4f6;
    classDef database fill:#064e3b,stroke:#10b981,stroke-width:2px,color:#f3f4f6;

    subgraph Security ["Security & Access Control (NextAuth)"]
        direction TB
        Auth[Sign In / Sign Up]:::process
        MongoDBUsers[(MongoDB Users)]:::database
        Resend[Resend API - OTP Email]:::external
        
        Auth -->|Triggers Verification| Resend
        Resend -->|Sends Code| Auth
        Auth -->|Authenticates| MongoDBUsers
    end

    User((User)):::user
    User -- Authenticates --> Auth

    subgraph Dashboard ["Workspace & Dashboard"]
        direction TB
        DashPortal[Dashboard Portal]:::process
        Toggle[Toggle Message Status]:::process
        ViewMessages[Fetch Encrypted Messages]:::process
        
        DashPortal --> Toggle
        DashPortal --> ViewMessages
    end

    Auth == Validated Session ==> DashPortal
    Toggle -->|Updates Accept Status| MongoDBUsers
    MongoDBUsers -.->|Returns Data| ViewMessages

    subgraph PublicInterface ["Public Message Interface"]
        direction TB
        PublicURL[Public Profile /u/username]:::process
        SendMsg[POST /api/send-message]:::process
        
        PublicURL -->|Check if user accepts| MongoDBUsers
        PublicURL --> SendMsg
    end

    AnonUser((Anonymous User)):::user
    AnonUser -- Visits Link --> PublicURL
    SendMsg -->|Saves Message| MongoDBUsers
```

## 💻 Tech Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS + Radix UI + Lucide Icons
- **Database:** MongoDB (via Mongoose)
- **Authentication:** NextAuth v5 (Auth.js)
- **Email Service:** Resend + React Email
- **Validation:** Zod + React Hook Form
