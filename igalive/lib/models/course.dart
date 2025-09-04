enum CourseCategory { nursery, mathSciences, artsHumanities, languages }

class Course {
  final String id;
  final String title;
  final String description;
  final String imageUrl;
  final CourseCategory category;
  final List<Lesson> lessons;
  final DateTime createdAt;
  final String instructor;

  Course({
    required this.id,
    required this.title,
    required this.description,
    required this.imageUrl,
    required this.category,
    required this.lessons,
    required this.createdAt,
    required this.instructor,
  });

  factory Course.fromJson(Map<String, dynamic> json) {
    return Course(
      id: json['id'] ?? '',
      title: json['title'] ?? '',
      description: json['description'] ?? '',
      imageUrl: json['imageUrl'] ?? '',
      category: CourseCategory.values.firstWhere(
        (e) => e.name == json['category'],
        orElse: () => CourseCategory.nursery,
      ),
      lessons:
          (json['lessons'] as List<dynamic>?)
              ?.map((lesson) => Lesson.fromJson(lesson))
              .toList() ??
          [],
      createdAt: DateTime.parse(
        json['createdAt'] ?? DateTime.now().toIso8601String(),
      ),
      instructor: json['instructor'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'imageUrl': imageUrl,
      'category': category.name,
      'lessons': lessons.map((lesson) => lesson.toJson()).toList(),
      'createdAt': createdAt.toIso8601String(),
      'instructor': instructor,
    };
  }

  static String getCategoryDisplayName(CourseCategory category) {
    switch (category) {
      case CourseCategory.nursery:
        return 'Nursery';
      case CourseCategory.mathSciences:
        return 'Mathematics & Sciences';
      case CourseCategory.artsHumanities:
        return 'Arts & Humanities';
      case CourseCategory.languages:
        return 'Languages';
    }
  }
}

class Lesson {
  final String id;
  final String title;
  final String content;
  final String? videoUrl;
  final int duration; // in minutes
  final int order;
  final DateTime createdAt;

  Lesson({
    required this.id,
    required this.title,
    required this.content,
    this.videoUrl,
    required this.duration,
    required this.order,
    required this.createdAt,
  });

  factory Lesson.fromJson(Map<String, dynamic> json) {
    return Lesson(
      id: json['id'] ?? '',
      title: json['title'] ?? '',
      content: json['content'] ?? '',
      videoUrl: json['videoUrl'],
      duration: json['duration'] ?? 0,
      order: json['order'] ?? 0,
      createdAt: DateTime.parse(
        json['createdAt'] ?? DateTime.now().toIso8601String(),
      ),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'content': content,
      'videoUrl': videoUrl,
      'duration': duration,
      'order': order,
      'createdAt': createdAt.toIso8601String(),
    };
  }
}
