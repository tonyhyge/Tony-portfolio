import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn()", () => {
  it("merges class strings", () => {
    expect(cn("px-2", "py-1")).toBe("px-2 py-1");
  });

  it("resolves conflicting Tailwind classes via tailwind-merge", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("handles conditional classes via clsx", () => {
    expect(cn("base", false && "hidden", "visible")).toBe("base visible");
  });

  it("handles empty input", () => {
    expect(cn()).toBe("");
  });

  it("removes falsy values", () => {
    expect(cn("a", undefined, "b", null, "c")).toBe("a b c");
  });
});
