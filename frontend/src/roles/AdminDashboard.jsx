import CourseList from "../components/CourseList.jsx";

export const permissions = { canEnroll: false, canManageCourses: true };
// This section sets up the admin dashboard component and definds its role-based permissions.
export default function AdminDashboard({
    user,
    courses,
    enrolledIds,
    onViewCourses,
    onEnroll,
    onUnenroll,
    isLoading,
}) {
    const learnerCount = courses.reduce((total, course) => total + course.enrollment_count, 0);


}