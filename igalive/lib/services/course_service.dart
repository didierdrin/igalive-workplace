import 'package:cloud_firestore/cloud_firestore.dart';
import '../models/course.dart';

class CourseService {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  // Get all courses
  Stream<List<Course>> getCourses() {
    return _firestore
        .collection('iga_courses')
        .orderBy('createdAt', descending: true)
        .snapshots()
        .map(
          (snapshot) => snapshot.docs
              .map((doc) => Course.fromJson({...doc.data(), 'id': doc.id}))
              .toList(),
        );
  }

  // Get courses by category
  Stream<List<Course>> getCoursesByCategory(CourseCategory category) {
    return _firestore
        .collection('iga_courses')
        .where('category', isEqualTo: category.name)
        .orderBy('createdAt', descending: true)
        .snapshots()
        .map(
          (snapshot) => snapshot.docs
              .map((doc) => Course.fromJson({...doc.data(), 'id': doc.id}))
              .toList(),
        );
  }

  // Get featured courses (limit to 5)
  Stream<List<Course>> getFeaturedCourses() {
    return _firestore
        .collection('iga_courses')
        .orderBy('createdAt', descending: true)
        .limit(5)
        .snapshots()
        .map(
          (snapshot) => snapshot.docs
              .map((doc) => Course.fromJson({...doc.data(), 'id': doc.id}))
              .toList(),
        );
  }

  // Get course by ID
  Future<Course?> getCourseById(String courseId) async {
    final doc = await _firestore.collection('iga_courses').doc(courseId).get();
    if (doc.exists) {
      return Course.fromJson({...doc.data()!, 'id': doc.id});
    }
    return null;
  }

  // Search courses
  Stream<List<Course>> searchCourses(String query) {
    return _firestore
        .collection('iga_courses')
        .where('title', isGreaterThanOrEqualTo: query)
        .where('title', isLessThanOrEqualTo: '$query\uf8ff')
        .snapshots()
        .map(
          (snapshot) => snapshot.docs
              .map((doc) => Course.fromJson({...doc.data(), 'id': doc.id}))
              .toList(),
        );
  }

  // Add course (admin only)
  Future<void> addCourse(Course course) async {
    await _firestore.collection('iga_courses').add(course.toJson());
  }

  // Update course (admin only)
  Future<void> updateCourse(Course course) async {
    await _firestore
        .collection('iga_courses')
        .doc(course.id)
        .update(course.toJson());
  }

  // Delete course (admin only)
  Future<void> deleteCourse(String courseId) async {
    await _firestore.collection('iga_courses').doc(courseId).delete();
  }
}
