import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_provider.dart';
import '../constants/colors.dart';
import 'home/home_screen.dart';
import 'courses/courses_screen.dart';
import 'tutor/tutor_screen.dart';
import 'calendar/calendar_screen.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  final List<Widget> _screens = [
    const HomeScreen(),
    const CoursesScreen(),
    const TutorScreen(),
    const CalendarScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Consumer<AppProvider>(
      builder: (context, provider, _) {
        return Scaffold(
          body: Container(
            decoration: const BoxDecoration(gradient: AppColors.homeGradient),
            child: Column(
              children: [
                Expanded(child: _screens[provider.currentBottomNavIndex]),
                Container(
                  margin: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(25),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.1),
                        blurRadius: 10,
                        offset: const Offset(0, 5),
                      ),
                    ],
                  ),
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(25),
                    child: BottomNavigationBar(
                      currentIndex: provider.currentBottomNavIndex,
                      onTap: provider.setBottomNavIndex,
                      type: BottomNavigationBarType.fixed,
                      backgroundColor: Colors.white,
                      selectedItemColor: AppColors.emerald,
                      unselectedItemColor: Colors.grey,
                      elevation: 0,
                      items: const [
                        BottomNavigationBarItem(
                          icon: Icon(Icons.home_outlined),
                          activeIcon: Icon(Icons.home),
                          label: 'Home',
                        ),
                        BottomNavigationBarItem(
                          icon: Icon(Icons.book_outlined),
                          activeIcon: Icon(Icons.book),
                          label: 'Courses',
                        ),
                        BottomNavigationBarItem(
                          icon: Icon(Icons.psychology_outlined),
                          activeIcon: Icon(Icons.psychology),
                          label: 'Tutor',
                        ),
                        BottomNavigationBarItem(
                          icon: Icon(Icons.calendar_today_outlined),
                          activeIcon: Icon(Icons.calendar_today),
                          label: 'Calendar',
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
