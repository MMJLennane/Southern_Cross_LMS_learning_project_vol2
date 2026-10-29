// This is the student focused dasboard component for the frontend.
import CourseList from "../components/CourseList.jsx";

export const permissions = { canEnroll: true, conManangeCourses: false };

export default function StudentDashboard({
    user,
    courses,
    enrollments,
    enrolledIds,
    onViewCourses,
    onEnroll,
    onUnenroll,
    isLoading,
}) {
    // This return block renders the student dashboard UI, Welcome --> Personalized --> Encouraging.
    return (
        <>
            <div className="welcome-row">
                <div>
                    <p className="eyebrow">Your Learning, at a glance</p>
                    <h1>Good to see you. {user.username} <span aria-hidden="true">*</span></h1>
                    <p className="muted">A little progress each day adds up tp big results.</p>
                </div>
                <button className="button button-primary" onClick={onViewCourses}>Find a course <span aria-hidden="true">↗</span></button>
            </div>
        </>
    )
}