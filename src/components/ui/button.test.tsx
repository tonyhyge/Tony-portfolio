import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders children text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("calls onClick when clicked", async () => {
    const handler = vi.fn();
    render(<Button onClick={handler}>Click me</Button>);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button"));
    expect(handler).toHaveBeenCalledOnce();
  });

  it("does not call onClick when disabled", async () => {
    const handler = vi.fn();
    render(<Button disabled onClick={handler}>Click me</Button>);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button"));
    expect(handler).not.toHaveBeenCalled();
  });

  it("applies variant class correctly", () => {
    render(<Button variant="destructive">Delete</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveAttribute("data-slot", "button");
  });
});
