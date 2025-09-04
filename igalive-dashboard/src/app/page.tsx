'use client';

import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { BarChart3, Book, Users, TrendingUp } from 'lucide-react';

interface DashboardStats {
  totalCourses: number;
  totalStudents: number;
  totalLessons: number;
  enrollments: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalCourses: 0,
    totalStudents: 0,
    totalLessons: 0,
    enrollments: 0,
  });
  const [recentCourses, setRecentCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get courses
        const coursesSnapshot = await getDocs(collection(db, 'iga_courses'));
        const courses = coursesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any[];
        
        // Get students
        const studentsSnapshot = await getDocs(collection(db, 'iga_users'));
        const students = studentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any[];

        // Calculate stats
        const totalLessons = courses.reduce((acc, course) => acc + (course.lessons?.length || 0), 0);
        const enrollments = students.reduce((acc, student) => acc + (student.enrolledCourses?.length || 0), 0);

        setStats({
          totalCourses: courses.length,
          totalStudents: students.length,
          totalLessons,
          enrollments,
        });

        setRecentCourses(courses.slice(0, 5));
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statCards = [
    {
      title: 'Total Courses',
      value: stats.totalCourses,
      icon: Book,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Students',
      value: stats.totalStudents,
      icon: Users,
      color: 'bg-emerald-500',
      bgColor: 'bg-emerald-50',
    },
    {
      title: 'Total Lessons',
      value: stats.totalLessons,
      icon: BarChart3,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Enrollments',
      value: stats.enrollments,
      icon: TrendingUp,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
            Dashboard Overview
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Welcome to your IgaLive admin dashboard
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <div key={stat.title} className={`${stat.bgColor} p-6 rounded-lg`}>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className={`${stat.color} p-3 rounded-md`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {stat.title}
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    {stat.value}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Courses */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Courses</h3>
        </div>
        <div className="px-6 py-4">
          {recentCourses.length === 0 ? (
            <div className="text-center py-12">
              <Book className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No courses yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating your first course.
              </p>
              <div className="mt-6">
                <a
                  href="/courses"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700"
                >
                  <Book className="-ml-1 mr-2 h-5 w-5" />
                  Add Course
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {recentCourses.map((course) => (
                <div key={course.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Book className="h-6 w-6 text-emerald-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {course.title}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {course.category} • {course.lessons?.length || 0} lessons
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <a
                      href={`/courses/${course.id}`}
                      className="text-emerald-600 hover:text-emerald-900 text-sm font-medium"
                    >
                      View
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
