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
            // this block creates the three-card summery the is present at the top of the dashboard.  it uses the stats-grid container to arrange the cards in a compact layout.  starting with Courses in progress.
            <div className="stats-grid">
                <div className="stat-card"><span className="stat-icon mint" aria-hidden="true">▤</span><span className="stat-label">COURSES IN PROGRESS</span><strong>{enrollments.length}</strong><span className="stat-foot">Your learning journey</span></div>
                <div className="stat-card"><span className="stat-icon peach" aria-hidden="true">✳</span><span className="stat-label">YOUR ROLE</span><strong className="role-stat">Student</strong><span className="stat-foot">Your workspace is ready</span></div>
                <div className="stat-card stat-card-feature"><span className="stat-label">A NOTE TO SELF</span><strong>Curiosity looks<br />good on you.</strong><span className="stat-foot">Keep showing up.</span><span className="feature-sun" aria-hidden="true">✳</span></div>
            </div>
        </>
    )
}