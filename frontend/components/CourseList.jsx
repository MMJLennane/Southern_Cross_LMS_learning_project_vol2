function CourseCard({ course, isEnrolled, canEnroll, onEnroll, onUmenroll }) {
    return (
        <article className="course-card">
            <div>
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
                    
                </div>
            </div>
        </article>
    )
}