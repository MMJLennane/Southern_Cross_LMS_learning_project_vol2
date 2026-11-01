import CourseList from "../components/CourseList.jsx";
// This is the teacher focused dasboard component for the frontend.  it is similar to the student dashboard but with a few key differences.  it does not have a course enrollment button, and it has a different set of permissions.
export const permissions = { canEnroll: false, canManageCourses: true };

export default function TeacherDashboard({
    user,
    courses,
    enrolledIds,
    onViewCourses,
    onEnroll,
    onUnenroll,
    isLoading,
}) {
    
}