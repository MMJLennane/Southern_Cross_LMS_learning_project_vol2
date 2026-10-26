function CourseCard({ course, isEnrolled, canEnroll, onEnroll, onUnenroll }) {
    return (
        <article className="course-card">
            <div className="course-art" aria-hidden="true">
                <span>{course.title.slice(0,1).toUpperCase()}</span>
            </div>
            <div className="course-content">
                <div className="course-meta">
                    <span className="course-tag">SELF-PACED</span>
                    {isEnrolled && <span className="enrolled-tag">ENROLLED</span>}
                </div>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div className="course-footer">
                    <span className="teacher-name">with {course.teacher_name}</span>
                    {canEnroll && (
                        <button
                            className={`button ${isEnrolled ? "button-quiet" :"button-outline"}`}
                            onClick={() => (isEnrolled ? onUnenroll(course.id) : onEnroll(course.id))}
                        >
                                {isEnrolled ? "Leave course" : "Explore course"}
                        </button>
                    )}
                </div>
            </div>
        </article>
    );
}