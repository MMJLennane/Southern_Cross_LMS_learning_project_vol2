import { useCallback, useEffect, useMemo, useState } from "react";

import { api } from "./api.js";
import AuthForm from "./components/AuthForm.jsx";
import CourseList from "./components/CourseList.jsx";
import AdminDashboard, { permissions as adminPermissions } from "./roles/AdminDashboard.jsx";
import StudentDashboard, { permissions as studentPermissions } from "./roles/StudentDashboard.jsx";
import TeacherDashboard, { permissions as teacherPermissions } from "./roles/TeacherDashboard.jsx";

// Human-readable role labels are shared by the dashboard's profile and summary cards.
const roleNames = {
  student: "Student",
  teacher: "Teacher",
  admin: "Administrator",
};

const roleModules = {
  student: { component: StudentDashboard, permissions: studentPermissions },
  teacher: { component: TeacherDashboard, permissions: teacherPermissions },
  admin: { component: AdminDashboard, permissions: adminPermissions },
};

function Dashboard({ user, token, onLogout }) { // Dashboard state is refreshed from the API, role flags control which actions and views are shown.
     const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [activeView, setActiveView] = useState("overview");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const roleModule = roleModules[user.role];
  const RoleDashboard = roleModule?.component;
  const enrolledIds = useMemo(
    () => new Set(enrollments.map((enrollment) => enrollment.course.id)),
    [enrollments],
  );
  const canManageCourses = roleModule?.permissions.canManageCourses ?? false;
  const canEnroll = roleModule?.permissions.canEnroll ?? false;

  const loadDashboard = useCallback(async () => { // Catalog data is public, while only students need their private enrollment list.
    setIsLoading(true);
    setError("");
    try {
      const courseList = await api.listCourses();
      setCourses(courseList);
      if (canEnroll) {
        setEnrollments(await api.listEnrollments(token));
      }
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  }, [canEnroll, token]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

}