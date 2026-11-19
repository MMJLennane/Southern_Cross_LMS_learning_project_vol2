import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Button from "./button.jsx";

describe("Button", () => {
  it("forwards click callbacks and applies the requested variant", () => {
    const onClick = vi.fn();

    render(<Button variant="outline" onClick={onClick}>Explore</Button>);
    fireEvent.click(screen.getByRole("button", { name: "Explore" }));

    expect(onClick).toHaveBeenCalledOnce();
    expect(screen.getByRole("button", { name: "Explore" })).toHaveClass("button-outline");
  });
});
