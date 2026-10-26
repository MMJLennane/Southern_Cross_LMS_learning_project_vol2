function CourseCard({ course, isEnrolled, canEnroll, onEnroll, onUmenroll }) {
    return (
        <article className="course-card">
            <div>
                <span>{course.title.slice(0,1).toUpperCase()}</span>
            </div>
        </article>
    )
}