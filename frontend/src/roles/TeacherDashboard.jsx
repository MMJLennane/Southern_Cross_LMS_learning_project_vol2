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
    const ownCourses = courses.filter(course => course.instructorId === user.id);
    const learnerCount = ownCourses.reduce((count, course) => count + course.enrolledCount, 0);

    return ( // This return block renders the teacher dashboard UI, primary action button, "Explore the library".
        <>
            <div className="welcome-row">
                <div>
                    <p className="eyebrow">Your Teaching, at a glance</p>
                    <h1>Good to see you. {user.username} <span aria-hidden="true">*</span></h1>
                    <p className="muted">Your impact grows with every student you inspire.</p>
                </div>
                <button className="button button-primary" onClick={onViewCourses}>Explore the library <span aria-hidden="true">↗</span></button>
            </div>
            <div className="stats-grid">
                <div className="stat-card"><span className="stat-icon mint" aria-hidden="true">▤</span><span className="stat-label">COURSES YOU TEACH</span><strong>{ownCourses.length}</strong><span className="stat-foot">Your teaching journey</span></div>
                <div className="stat-card"><span className="stat-icon peach" aria-hidden="true">✳</span><span className="stat-label">LEARNERS IMPACTED</span><strong>{learnerCount}</strong><span className="stat-foot">Your influence in action</span></div>
                <div className="stat-card stat-card-feature"><span className="stat-label">A NOTE TO SELF</span><strong>Knowledge<br />when shared.</strong><span className="stat-foot">Keep inspiring learners.</span><span className="feature-sun" aria-hidden="true">✳</span></div>
            </div>
            <div className="section-heading">
                <div><p className="eyebrow">A Place to begin</p><h2>Your courses</h2></div>
                <button className="text-button" onClick={onViewCourses}>View all courses<span aria-hidden="true">→</span></button>
            </div>
            <CourseList
                courses={ownCourses.slice(0, 3)}
                enrolledIds={enrolledIds}
                canEnroll={false}
                onEnroll={onEnroll}
                onUnenroll={onUnenroll}
                isLoading={isLoading}
            />
        </>
    );
}