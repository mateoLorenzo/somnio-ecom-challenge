import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "./index";

const mockRouter = {
  push: jest.fn(),
};

jest.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
}));

jest.mock("@/store/useStore", () => ({
  useStore: () => ({
    cart: [
      {
        id: 1,
        product: {
          id: 1,
          title: "Test Product",
          price: 99.99,
        },
        quantity: 2,
      },
    ],
  }),
}));

describe("Header", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders logo and cart icon", () => {
    render(<Header />);

    expect(screen.getByAltText("Somnio Logo")).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Somnio Logo" })
    ).toBeInTheDocument();
  });

  it("shows search input when showSearch is true", () => {
    render(<Header showSearch={true} />);

    expect(
      screen.getByPlaceholderText(/Search Products.../i)
    ).toBeInTheDocument();
  });

  it("hides search input when showSearch is false", () => {
    render(<Header showSearch={false} />);

    expect(
      screen.queryByPlaceholderText(/Search Products.../i)
    ).not.toBeInTheDocument();
  });

  it("displays cart count", () => {
    render(<Header />);

    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("navigates to cart page when cart icon is clicked", () => {
    render(<Header />);

    const cartIcon = screen.getByTestId("cart-icon");
    fireEvent.click(cartIcon);

    expect(mockRouter.push).toHaveBeenCalledWith("/cart");
  });

  it("calls onSearchChange when search input changes", () => {
    const mockOnSearchChange = jest.fn();
    render(<Header showSearch={true} onSearchChange={mockOnSearchChange} />);

    const searchInput = screen.getByPlaceholderText(/Search Products.../i);
    fireEvent.change(searchInput, { target: { value: "test" } });

    expect(mockOnSearchChange).toHaveBeenCalledWith("test");
  });
});
