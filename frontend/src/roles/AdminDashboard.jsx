import CourseList from "../components/CourseList.jsx";
import Button from "../components/button/button.jsx";

export const permissions = { canEnroll: false, canManageCourses: true, canManageUsers: true };
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
    // This block defines the dashboard's visible layout and content.
    return (
    <>
      <div className="welcome-row">
        <div>
          <p className="eyebrow">LEARNING, AT A GLANCE</p>
          <h1>Good to see you, {user.username} <span aria-hidden="true">✳</span></h1>
          <p className="muted">Here is an overview of the learning space.</p>
        </div>
        <Button onClick={onViewCourses}>Explore the library <span aria-hidden="true">↗</span></Button>
      </div>
      <div className="stats-grid">
        <div className="stat-card"><span className="stat-icon mint" aria-hidden="true">▤</span><span className="stat-label">COURSES AVAILABLE</span><strong>{courses.length}</strong><span className="stat-foot">In the course library</span></div>
        <div className="stat-card"><span className="stat-icon peach" aria-hidden="true">✳</span><span className="stat-label">ENROLLMENTS</span><strong>{learnerCount}</strong><span className="stat-foot">Across the course library</span></div>
        <div className="stat-card stat-card-feature"><span className="stat-label">A NOTE TO SELF</span><strong>Curiosity looks<br />good on you.</strong><span className="stat-foot">Keep the community growing.</span><span className="feature-sun" aria-hidden="true">✳</span></div>
      </div>
      <div className="section-heading">
        <div><p className="eyebrow">THE COURSE LIBRARY</p><h2>Recently available courses</h2></div>
        <Button variant="text" onClick={onViewCourses}>View all courses <span aria-hidden="true">→</span></Button>
      </div>
      <CourseList
        courses={courses.slice(0, 3)}
        enrolledIds={enrolledIds}
        canEnroll={false}
        onEnroll={onEnroll}
        onUnenroll={onUnenroll}
        isLoading={isLoading}
      />
    </>
  );
}

export function AdminUsersDashboard({
  users = [],
  onUpdateUserRole,
  isUpdatingUserRole = false,
  isLoading = false,
}) {
  return (
    <div className="admin-tasks">
      <div className="section-heading page-heading">
        <div>
          <p className="eyebrow">ACCOUNT ACCESS</p>
          <h1>Manage users <span className="count-badge">{users.length}</span></h1>
          <p className="muted">View accounts and assign student or teacher access.</p>
        </div>
      </div>
      <div className="user-table-wrap">
        <table className="user-table">
          <thead>
            <tr><th scope="col">Username</th><th scope="col">Email</th><th scope="col">Role</th></tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr><td colSpan="3">{isLoading ? "Loading users…" : "No users found."}</td></tr>
            ) : users.map((account) => (
              <tr key={account.id}>
                <td>{account.username}</td>
                <td>{account.email || "—"}</td>
                <td>
                  {account.role === "admin" ? (
                    <span className="role-label">Administrator</span>
                  ) : (
                    <>
                      <label className="visually-hidden" htmlFor={`user-role-${account.id}`}>
                        Change role for {account.username}
                      </label>
                      <select
                        id={`user-role-${account.id}`}
                        value={account.role}
                        disabled={isUpdatingUserRole}
                        onChange={(event) => onUpdateUserRole(account.id, event.target.value)}
                      >
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                      </select>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}