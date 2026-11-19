import { afterEach, describe, expect, it, vi } from "vitest";

import { api } from "./api.js";

describe("API client", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("sends an authenticated role update to the Django admin endpoint", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ id: 8, role: "teacher" }),
    });

    await api.updateUserRole(8, "teacher", "access-token");

    expect(fetchMock).toHaveBeenCalledWith(
      "http://127.0.0.1:8000/api/admin/users/8/role/",
      expect.objectContaining({
        method: "PATCH",
        body: JSON.stringify({ role: "teacher" }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer access-token",
        },
      }),
    );
  });
});
