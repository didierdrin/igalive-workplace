import 'package:flutter/foundation.dart';
import 'package:firebase_auth/firebase_auth.dart';
import '../models/user.dart';
import '../models/course.dart';
import '../services/auth_service.dart';
import '../services/course_service.dart';

class AppProvider extends ChangeNotifier {
  final AuthService _authService = AuthService();
  final CourseService _courseService = CourseService();

  AppUser? _currentUser;
  List<Course> _courses = [];
  List<Course> _featuredCourses = [];
  bool _isLoading = false;
  int _currentBottomNavIndex = 0;

  AppUser? get currentUser => _currentUser;
  List<Course> get courses => _courses;
  List<Course> get featuredCourses => _featuredCourses;
  bool get isLoading => _isLoading;
  int get currentBottomNavIndex => _currentBottomNavIndex;

  AppProvider() {
    _init();
  }

  Future<void> _init() async {
    // Listen to auth changes
    _authService.authStateChanges.listen((User? user) async {
      if (user != null) {
        _currentUser = await _authService.getCurrentUserData();
        notifyListeners();
      } else {
        _currentUser = null;
        notifyListeners();
      }
    });

    // Listen to courses
    _courseService.getCourses().listen((courses) {
      _courses = courses;
      notifyListeners();
    });

    // Listen to featured courses
    _courseService.getFeaturedCourses().listen((courses) {
      _featuredCourses = courses;
      notifyListeners();
    });
  }

  void setBottomNavIndex(int index) {
    _currentBottomNavIndex = index;
    notifyListeners();
  }

  Future<bool> signIn(String email, String password) async {
    _isLoading = true;
    notifyListeners();

    final result = await _authService.signInWithEmailAndPassword(
      email,
      password,
    );

    _isLoading = false;
    notifyListeners();

    return result != null;
  }

  Future<bool> signUp(String email, String password, String name) async {
    _isLoading = true;
    notifyListeners();

    final result = await _authService.signUpWithEmailAndPassword(
      email,
      password,
      name,
    );

    _isLoading = false;
    notifyListeners();

    return result != null;
  }

  Future<void> signOut() async {
    await _authService.signOut();
  }

  Future<void> enrollInCourse(String courseId) async {
    await _authService.enrollInCourse(courseId);
    _currentUser = await _authService.getCurrentUserData();
    notifyListeners();
  }

  bool isEnrolledInCourse(String courseId) {
    return _currentUser?.enrolledCourses.contains(courseId) ?? false;
  }

  List<Course> getCoursesByCategory(CourseCategory category) {
    return _courses.where((course) => course.category == category).toList();
  }
}
