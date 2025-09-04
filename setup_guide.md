# IgaLive Complete Setup Guide

## 🚀 Quick Start Instructions

### 1. Flutter Mobile App Setup

**Step 1: Install Dependencies**
```bash
cd igalive
flutter pub get
```

**Step 2: Configure Gemini AI (Optional)**
Edit `lib/services/gemini_service.dart` and replace `YOUR_GEMINI_API_KEY` with your actual Gemini API key.

**Step 3: Run the App**
```bash
flutter run
```

### 2. Web Dashboard Setup

**Step 1: Install Dependencies**
```bash
cd igalive-dashboard
npm install
```

**Step 2: Start Development Server**
```bash
npm run dev
```

**Step 3: Open Dashboard**
Navigate to `http://localhost:3000` in your browser.

## 📱 Mobile App Features

### Authentication System
- Email/password login and registration
- Firebase Authentication integration
- User profile management

### Home Screen
- ✅ Linear gradient background (emerald to white)
- ✅ Custom app bar with rotating welcome messages (Welcome, Murakaza Neza, Karibu)
- ✅ Avatar circle with user initial
- ✅ Search bar for courses
- ✅ Featured courses section with circle avatars
- ✅ Lessons list with enrollment functionality

### Bottom Navigation
- ✅ **Home**: Main dashboard with courses and lessons
- ✅ **Courses**: Organized by educational pathways
- ✅ **Tutor**: Gemini AI-powered chatbot assistant
- ✅ **Calendar**: Lesson scheduling and progress tracking

### Course Categories
- ✅ Nursery Education
- ✅ Mathematics & Sciences Pathway
- ✅ Arts & Humanities Pathway
- ✅ Languages Pathway

## 🖥️ Web Dashboard Features

### Admin Panel
- ✅ Secure admin authentication
- ✅ Professional dashboard interface
- ✅ Course management system
- ✅ Student monitoring
- ✅ Analytics and insights

### Course Management
- ✅ Create courses with title, description, and category
- ✅ PDF upload for course content
- ✅ Automatic lesson generation from PDF content
- ✅ Image upload for course thumbnails
- ✅ Course editing and deletion

### Student Management
- ✅ View all registered students
- ✅ Monitor enrollment statistics
- ✅ Track student progress

## 🔥 Firebase Structure

All collections use the `iga_` prefix as requested:

- `iga_users`: Student accounts and enrollment data
- `iga_admins`: Administrator accounts
- `iga_courses`: Course content, lessons, and metadata

## 🎯 Educational Pathways

### Mathematics and Sciences Pathway
**Target Careers:** Medicine, Engineering, Agriculture, Technology, Data Science
**Core Subjects:** Advanced Mathematics, Physics, Chemistry, Biology, Computer Science

### Arts and Humanities Pathway  
**Target Careers:** Education, Law, Governance, Social Sciences, Journalism
**Core Subjects:** Literature, History, Philosophy, Political Science, Psychology

### Languages Pathway
**Target Careers:** Translation, Diplomacy, Tourism, Journalism
**Languages:** English, French, Kinyarwanda, Kiswahili

## ✅ Implemented Features Checklist

### Mobile App ✅
- [x] Linear gradient background (emerald to white)
- [x] App bar with slideshow of welcome texts
- [x] Avatar circle with user initial
- [x] Search bar functionality
- [x] Featured courses with circle avatars
- [x] Lessons list with enrollment system
- [x] Bottom navigation (Home, Courses, Tutor, Calendar)
- [x] Firebase integration with `iga_` prefix
- [x] Course categories and pathways
- [x] Gemini AI chatbot tutor
- [x] Calendar for lesson scheduling

### Web Dashboard ✅
- [x] Professional admin interface
- [x] Course creation and management
- [x] PDF upload with content extraction
- [x] Student management system
- [x] Analytics dashboard
- [x] Firebase integration
- [x] Authentication system

## 🔧 Technical Stack

### Mobile (Flutter)
- **Framework**: Flutter 3.8.1+
- **State Management**: Provider
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **AI**: Google Generative AI (Gemini)
- **UI**: Material Design 3, Google Fonts

### Web (Next.js)
- **Framework**: Next.js 15.5.2
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Icons**: Lucide React

## 🚦 Running Instructions

1. **Mobile App**: `cd igalive && flutter run`
2. **Web Dashboard**: `cd igalive-dashboard && npm run dev`

Both applications will connect to the same Firebase backend and share data seamlessly.

## 📞 Support

For technical support or questions about the implementation, refer to the comprehensive code documentation within each file.

---

**Status**: ✅ Complete implementation ready for production use
