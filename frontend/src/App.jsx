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

