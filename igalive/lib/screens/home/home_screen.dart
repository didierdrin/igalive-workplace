import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'package:cached_network_image/cached_network_image.dart';
import '../../providers/app_provider.dart';
import '../../models/course.dart';
import '../../constants/colors.dart';
import '../course_detail/course_detail_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final TextEditingController _searchController = TextEditingController();
  final List<String> _welcomeTexts = ['Welcome', 'Murakaza Neza', 'Karibu'];
  int _currentWelcomeIndex = 0;

  @override
  void initState() {
    super.initState();
    _startWelcomeTextRotation();
  }

  void _startWelcomeTextRotation() {
    Future.delayed(const Duration(seconds: 3), () {
      if (mounted) {
        setState(() {
          _currentWelcomeIndex =
              (_currentWelcomeIndex + 1) % _welcomeTexts.length;
        });
        _startWelcomeTextRotation();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<AppProvider>(
      builder: (context, provider, _) {
        final user = provider.currentUser;

        return SafeArea(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Custom App Bar
                _buildCustomAppBar(user),
                const SizedBox(height: 24),

                // Search Bar
                _buildSearchBar(),
                const SizedBox(height: 24),

                // Featured Courses
                _buildSectionTitle('Featured Courses'),
                const SizedBox(height: 16),
                _buildFeaturedCourses(provider.featuredCourses),
                const SizedBox(height: 32),

                // Lessons
                _buildSectionTitle('Lessons'),
                const SizedBox(height: 16),
                Expanded(child: _buildLessonsList(provider.courses, provider)),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildCustomAppBar(user) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        // Welcome text with animation
        AnimatedSwitcher(
          duration: const Duration(milliseconds: 500),
          child: Text(
            _welcomeTexts[_currentWelcomeIndex],
            key: ValueKey(_currentWelcomeIndex),
            style: GoogleFonts.poppins(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
        ),

        // Avatar
        CircleAvatar(
          radius: 25,
          backgroundColor: Colors.white,
          child: user?.profileImageUrl != null
              ? ClipOval(
                  child: CachedNetworkImage(
                    imageUrl: user!.profileImageUrl!,
                    width: 50,
                    height: 50,
                    fit: BoxFit.cover,
                    placeholder: (context, url) =>
                        const CircularProgressIndicator(),
                    errorWidget: (context, url, error) =>
                        _buildAvatarWithInitial(user.email),
                  ),
                )
              : _buildAvatarWithInitial(user?.email ?? 'User'),
        ),
      ],
    );
  }

  Widget _buildAvatarWithInitial(String email) {
    final initial = email.isNotEmpty ? email[0].toUpperCase() : 'U';
    return Text(
      initial,
      style: GoogleFonts.poppins(
        fontSize: 20,
        fontWeight: FontWeight.bold,
        color: AppColors.emerald,
      ),
    );
  }

  Widget _buildSearchBar() {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.9),
        borderRadius: BorderRadius.circular(25),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: 10,
            offset: const Offset(0, 3),
          ),
        ],
      ),
      child: TextField(
        controller: _searchController,
        decoration: const InputDecoration(
          hintText: 'Search for courses...',
          prefixIcon: Icon(Icons.search, color: AppColors.emerald),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.all(Radius.circular(25)),
            borderSide: BorderSide.none,
          ),
          filled: true,
          fillColor: Colors.transparent,
          contentPadding: EdgeInsets.symmetric(horizontal: 20, vertical: 16),
        ),
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Text(
      title,
      style: GoogleFonts.poppins(
        fontSize: 20,
        fontWeight: FontWeight.bold,
        color: Colors.white,
      ),
    );
  }

  Widget _buildFeaturedCourses(List<Course> courses) {
    if (courses.isEmpty) {
      return const SizedBox(
        height: 120,
        child: Center(child: CircularProgressIndicator(color: Colors.white)),
      );
    }

    return SizedBox(
      height: 120,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        itemCount: courses.length,
        itemBuilder: (context, index) {
          final course = courses[index];
          return Container(
            width: 100,
            margin: const EdgeInsets.only(right: 16),
            child: GestureDetector(
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => CourseDetailScreen(course: course),
                  ),
                );
              },
              child: Column(
                children: [
                  CircleAvatar(
                    radius: 35,
                    backgroundColor: Colors.white,
                    child: course.imageUrl.isNotEmpty
                        ? ClipOval(
                            child: CachedNetworkImage(
                              imageUrl: course.imageUrl,
                              width: 70,
                              height: 70,
                              fit: BoxFit.cover,
                              placeholder: (context, url) =>
                                  const CircularProgressIndicator(),
                              errorWidget: (context, url, error) => Icon(
                                _getCategoryIcon(course.category),
                                size: 35,
                                color: AppColors.emerald,
                              ),
                            ),
                          )
                        : Icon(
                            _getCategoryIcon(course.category),
                            size: 35,
                            color: AppColors.emerald,
                          ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    course.title,
                    style: GoogleFonts.poppins(
                      fontSize: 12,
                      fontWeight: FontWeight.w600,
                      color: Colors.white,
                    ),
                    textAlign: TextAlign.center,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildLessonsList(List<Course> courses, AppProvider provider) {
    final lessons = courses
        .expand(
          (course) => course.lessons.map(
            (lesson) => {'lesson': lesson, 'course': course},
          ),
        )
        .toList();

    if (lessons.isEmpty) {
      return Center(
        child: Container(
          padding: const EdgeInsets.all(32),
          decoration: BoxDecoration(
            color: Colors.white.withOpacity(0.9),
            borderRadius: BorderRadius.circular(20),
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Icon(
                Icons.school_outlined,
                size: 64,
                color: AppColors.emerald,
              ),
              const SizedBox(height: 16),
              Text(
                'No lessons available yet',
                style: GoogleFonts.poppins(
                  color: AppColors.emerald,
                  fontSize: 16,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
        ),
      );
    }

    return Container(
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.9),
        borderRadius: BorderRadius.circular(20),
      ),
      child: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: lessons.length,
        itemBuilder: (context, index) {
          final lessonData = lessons[index];
          final lesson = lessonData['lesson'] as Lesson;
          final course = lessonData['course'] as Course;

          return Card(
            margin: const EdgeInsets.only(bottom: 12),
            elevation: 2,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
            child: ListTile(
              leading: CircleAvatar(
                backgroundColor: AppColors.emerald.withOpacity(0.1),
                child: Icon(
                  _getCategoryIcon(course.category),
                  color: AppColors.emerald,
                ),
              ),
              title: Text(
                lesson.title,
                style: GoogleFonts.poppins(
                  fontWeight: FontWeight.w600,
                  fontSize: 14,
                ),
              ),
              subtitle: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    course.title,
                    style: GoogleFonts.poppins(
                      fontSize: 12,
                      color: Colors.grey[600],
                    ),
                  ),
                  Text(
                    '${lesson.duration} min',
                    style: GoogleFonts.poppins(
                      fontSize: 11,
                      color: Colors.grey[500],
                    ),
                  ),
                ],
              ),
              trailing: ElevatedButton(
                onPressed: () async {
                  final isEnrolled = provider.isEnrolledInCourse(course.id);
                  if (!isEnrolled) {
                    await provider.enrollInCourse(course.id);
                    if (context.mounted) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text('Enrolled in ${course.title}'),
                          backgroundColor: AppColors.emerald,
                        ),
                      );
                    }
                  } else {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) =>
                            CourseDetailScreen(course: course),
                      ),
                    );
                  }
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: provider.isEnrolledInCourse(course.id)
                      ? AppColors.emerald
                      : Colors.grey[300],
                  foregroundColor: provider.isEnrolledInCourse(course.id)
                      ? Colors.white
                      : Colors.grey[600],
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                  padding: const EdgeInsets.symmetric(
                    horizontal: 16,
                    vertical: 8,
                  ),
                ),
                child: Text(
                  provider.isEnrolledInCourse(course.id)
                      ? 'Continue'
                      : 'Enroll',
                  style: GoogleFonts.poppins(
                    fontSize: 12,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => CourseDetailScreen(course: course),
                  ),
                );
              },
            ),
          );
        },
      ),
    );
  }

  IconData _getCategoryIcon(CourseCategory category) {
    switch (category) {
      case CourseCategory.nursery:
        return Icons.child_care;
      case CourseCategory.mathSciences:
        return Icons.calculate;
      case CourseCategory.artsHumanities:
        return Icons.palette;
      case CourseCategory.languages:
        return Icons.language;
    }
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }
}
