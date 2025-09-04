'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { BarChart3, TrendingUp, Users, Book } from 'lucide-react';

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState({
    categoryDistribution: {},
    enrollmentTrends: {},
    popularCourses: [],
    studentGrowth: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Get courses
        const coursesSnapshot = await getDocs(collection(db, 'iga_courses'));
        const courses = coursesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Get students
        const studentsSnapshot = await getDocs(collection(db, 'iga_users'));
        const students = studentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Calculate category distribution
        const categoryDist = courses.reduce((acc: any, course) => {
          acc[course.category] = (acc[course.category] || 0) + 1;
          return acc;
        }, {});

        // Calculate popular courses
        const courseEnrollments = courses.map(course => {
          const enrollmentCount = students.filter(student => 
            student.enrolledCourses?.includes(course.id)
          ).length;
          return { ...course, enrollments: enrollmentCount };
        }).sort((a, b) => b.enrollments - a.enrollments);

        setAnalytics({
          categoryDistribution: categoryDist,
          enrollmentTrends: {},
          popularCourses: courseEnrollments.slice(0, 5),
          studentGrowth: students.length,
        });
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

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
            Analytics
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Insights and performance metrics for your platform
          </p>
        </div>
      </div>

      {/* Category Distribution */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Course Distribution by Category</h3>
        <div className="space-y-4">
          {Object.entries(analytics.categoryDistribution).map(([category, count]) => (
            <div key={category} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 capitalize">
                {category.replace(/([A-Z])/g, ' $1').toLowerCase()}
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-emerald-500 h-2 rounded-full" 
                    style={{ width: `${((count as number) / Object.values(analytics.categoryDistribution).reduce((a: number, b: any) => a + b, 0)) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-500">{count as number}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Courses */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Most Popular Courses</h3>
        <div className="space-y-4">
          {analytics.popularCourses.map((course: any, index) => (
            <div key={course.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-emerald-600">#{index + 1}</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {course.title}
                </p>
                <p className="text-sm text-gray-500">
                  {course.category} • {course.lessons?.length || 0} lessons
                </p>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Users className="h-4 w-4" />
                <span>{course.enrollments} enrolled</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
