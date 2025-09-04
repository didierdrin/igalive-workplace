# IgaLive - Educational Learning Platform

A comprehensive educational platform consisting of a Flutter mobile app and a Next.js web dashboard for managing courses and content.

## 📱 Mobile App Features

- **Authentication**: Secure login/signup with Firebase Authentication
- **Home Screen**: 
  - Rotating welcome messages (English, Kinyarwanda, Kiswahili)
  - User avatar with email initial
  - Search functionality
  - Featured courses carousel
  - Lessons list with enrollment system
- **Courses Page**: Organized by educational pathways
  - Nursery education
  - Mathematics & Sciences pathway
  - Arts & Humanities pathway  
  - Languages pathway
- **AI Tutor**: Gemini-powered chatbot for educational assistance
- **Calendar**: Schedule and track learning progress

## 🖥️ Web Dashboard Features

- **Admin Authentication**: Secure admin panel access
- **Course Management**: 
  - Create, edit, delete courses
  - PDF upload with content extraction
  - Image uploads for course thumbnails
- **Student Management**: View registered users and enrollment data
- **Analytics**: Track platform usage and course popularity
- **Settings**: Account management and configuration

## 🏗️ Project Structure

```
IgaLive - Workplace/
├── igalive/                    # Flutter mobile app
│   ├── lib/
│   │   ├── models/            # Data models
│   │   ├── services/          # Firebase and API services
│   │   ├── providers/         # State management
│   │   ├── screens/           # UI screens
│   │   └── main.dart         # App entry point
│   └── pubspec.yaml          # Flutter dependencies
└── igalive-dashboard/         # Next.js web dashboard
    ├── src/
    │   ├── app/              # Next.js app router pages
    │   ├── components/       # Reusable components
    │   └── lib/              # Utilities and Firebase config
    └── package.json          # Node.js dependencies
```

## 🔥 Firebase Collections

All collections use the `iga_` prefix:

- `iga_users`: Student accounts and enrollment data
- `iga_admins`: Administrator accounts  
- `iga_courses`: Course content and lessons

## 🚀 Getting Started

### Mobile App Setup

1. Navigate to the Flutter project:
   ```bash
   cd igalive
   ```

2. Install dependencies:
   ```bash
   flutter pub get
   ```

3. Run the app:
   ```bash
   flutter run
   ```

### Web Dashboard Setup

1. Navigate to the Next.js project:
   ```bash
   cd igalive-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## ⚙️ Configuration

### Firebase Setup
Both applications are pre-configured with Firebase credentials. The configuration is in:
- Mobile: `lib/firebase_options.dart`
- Web: `src/lib/firebase.js`

### AI Tutor Setup
To enable the AI tutor functionality, add your Gemini API key to `lib/services/gemini_service.dart`:
```dart
_model = GenerativeModel(
  model: 'gemini-pro',
  apiKey: 'YOUR_GEMINI_API_KEY', // Replace with your actual API key
);
```

## 🎓 Educational Pathways

### Upper Secondary Education Tracks:

1. **Mathematics and Sciences Pathway**
   - Target careers: Medicine, Engineering, Agriculture, Technology, Data Science
   - Subjects: Advanced Mathematics, Physics, Chemistry, Biology, Computer Science

2. **Arts and Humanities Pathway**
   - Target careers: Education, Law, Governance, Social Sciences, Journalism
   - Subjects: Literature, History, Philosophy, Political Science, Psychology

3. **Languages Pathway**
   - Target careers: Translation, Diplomacy, Tourism, Journalism
   - Languages: English, French, Kinyarwanda, Kiswahili

## 🛠️ Technologies Used

### Mobile App
- **Flutter**: Cross-platform mobile development
- **Firebase**: Backend services (Auth, Firestore, Storage)
- **Provider**: State management
- **Google Fonts**: Typography
- **Gemini AI**: AI-powered tutoring

### Web Dashboard
- **Next.js**: React framework for web development
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Firebase**: Backend services
- **Lucide React**: Icon library

## 📝 Features Overview

### Student Experience (Mobile)
- Browse courses by educational pathway
- Enroll in courses and track progress
- Access AI tutor for personalized help
- Schedule study sessions with calendar
- Clean, intuitive interface with emerald green branding

### Admin Experience (Web)
- Upload course content via PDF files
- Automatic lesson generation from PDF content
- Monitor student enrollments and progress
- View platform analytics and insights
- Manage course categories and content

## 🔒 Security
- Firebase Authentication for secure access
- Role-based access control (students vs admins)
- Secure file upload with Firebase Storage
- Data validation and sanitization

## 📱 Platform Support
- **Mobile**: Android and iOS via Flutter
- **Web**: Modern browsers via Next.js
- **Responsive**: Adaptive design for all screen sizes

## 🚀 Deployment
- **Mobile**: Build APK/IPA for distribution
- **Web**: Deploy to Vercel, Netlify, or any hosting platform
- **Database**: Firebase Firestore (cloud-hosted)

---

Built with ❤️ for Rwanda's educational future
