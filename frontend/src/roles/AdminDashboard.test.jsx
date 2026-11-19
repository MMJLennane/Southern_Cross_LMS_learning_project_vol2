import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import AdminDashboard from "./AdminDashboard.jsx";

describe("AdminDashboard", () => {
  it("renders the user count while the user list is not yet provided", () => {
    render(
      <AdminDashboard
        user={{ username: "admin" }}
        courses={[]}
        enrolledIds={new Set()}
        onViewCourses={vi.fn()}
        onEnroll={vi.fn()}
        onUnenroll={vi.fn()}
        isLoading={false}
      />,
    );

    expect(screen.getByRole("heading", { name: /Manage users 0/ })).toBeInTheDocument();
  });
});
