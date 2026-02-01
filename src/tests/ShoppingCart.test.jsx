import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import routes from "../routes";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const mockProducts = [
  { title: "Product1", price: 10, image: "image1.png", id: 1 },
  { title: "Product2", price: 20, image: "image2.png", id: 2 },
];

describe("Shop", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockProducts),
        }),
      ),
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("updates cart number when a product is added", async () => {
    const user = userEvent.setup();

    const router = createMemoryRouter(routes, { initialEntries: ["/shop"] });

    render(<RouterProvider router={router} />);

    const addButtons = await screen.findAllByRole("button", { name: /add/i });
    expect(addButtons.length).toEqual(mockProducts.length);

    expect(screen.getByRole("link", { name: /cart 0/i })).toBeInTheDocument();

    await user.click(addButtons[0]);

    expect(screen.getByRole("link", { name: /cart 1/i })).toBeInTheDocument();
  });

  it("adds and removes items from the cart page", async () => {
    const user = userEvent.setup();

    const router = createMemoryRouter(routes, { initialEntries: ["/shop"] });
    render(<RouterProvider router={router} />);

    const addButtons = await screen.findAllByRole("button", { name: /add/i });
    const cartLink = screen.getByRole("link", { name: /cart/i });

    await user.click(addButtons[0]);
    await user.click(cartLink);

    expect(await screen.findByText(/product/i)).toBeInTheDocument();
    const discardButton = screen.getByRole("button", { name: /discard/i });

    await user.click(discardButton);

    expect(await screen.queryByText(/product/i)).not.toBeInTheDocument();
  });
});
