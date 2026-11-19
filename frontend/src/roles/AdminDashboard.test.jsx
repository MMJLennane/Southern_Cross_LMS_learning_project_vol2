import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { AdminUsersDashboard } from "./AdminDashboard.jsx";

describe("AdminUsersDashboard", () => {
  it("renders the user count while the user list is not yet provided", () => {
    render(
      <AdminUsersDashboard onUpdateUserRole={vi.fn()} />,
    );

    expect(screen.getByRole("heading", { name: /Manage users 0/ })).toBeInTheDocument();
    expect(screen.getByText("No users found.")).toBeInTheDocument();
  });
});
