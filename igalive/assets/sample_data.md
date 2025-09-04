# IgaLive Firebase Data Structure

All collections use the prefix `iga_` to avoid conflicts.

## Collections

### iga_users
```json
{
  "id": "user_uid",
  "email": "student@example.com",
  "name": "Student Name",
  "profileImageUrl": "https://...",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "enrolledCourses": ["course_id_1", "course_id_2"]
}
```

### iga_admins
```json
{
  "id": "admin_uid",
  "email": "admin@example.com", 
  "name": "Admin Name",
  "role": "admin",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### iga_courses
```json
{
  "id": "course_id",
  "title": "Introduction to Mathematics",
  "description": "Basic mathematical concepts for beginners",
  "category": "mathSciences", // nursery, mathSciences, artsHumanities, languages
  "instructor": "Teacher Name",
  "imageUrl": "https://...",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "lessons": [
    {
      "id": "lesson_id",
      "title": "Basic Addition",
      "content": "Learn how to add numbers...",
      "duration": 30,
      "order": 1,
      "videoUrl": "https://...",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### iga_enrollments (optional - can be derived from user data)
```json
{
  "id": "enrollment_id",
  "userId": "user_uid",
  "courseId": "course_id", 
  "enrolledAt": "2024-01-01T00:00:00.000Z",
  "progress": 0.5, // 0.0 to 1.0
  "completedLessons": ["lesson_id_1"]
}
```

## Course Categories

1. **nursery** - Early childhood education
2. **mathSciences** - Mathematics and Sciences pathway 
3. **artsHumanities** - Arts and Humanities pathway
4. **languages** - Languages pathway (English, French, Kinyarwanda, Kiswahili)

## Upper Secondary Pathways

### Mathematics and Sciences Pathway
- Careers: medicine, engineering, agriculture, technology, data science
- Subjects: Advanced Math, Physics, Chemistry, Biology, Computer Science

### Arts and Humanities Pathway  
- Careers: education, law, governance, social sciences, journalism
- Subjects: Literature, History, Philosophy, Political Science, Psychology

### Languages Pathway
- Careers: translation, diplomacy, tourism, journalism
- Languages: English, French, Kinyarwanda, Kiswahili
