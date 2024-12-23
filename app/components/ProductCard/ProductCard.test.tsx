import { render, screen, fireEvent } from "@testing-library/react";
import { ProductCard } from "./ProductCard";
import { Category } from "@/types/api";

const mockProduct = {
  id: 1,
  title: "Test Product",
  price: 99.99,
  description: "Test Description",
  category: Category.Electronics,
  image: "test-image.jpg",
  rating: {
    rate: 4.5,
    count: 100,
  },
};

const mockRouter = {
  push: jest.fn(),
};

jest.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
}));

jest.mock("@/store/useStore", () => ({
  useStore: () => ({
    buttonStates: {},
    setButtonStates: jest.fn(),
    addToCart: jest.fn(),
  }),
}));

describe("ProductCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders product information correctly", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(
      screen.getByText(`USD ${mockProduct.price.toFixed(2)}`)
    ).toBeInTheDocument();
  });

  it("navigates to product detail when clicked", () => {
    render(<ProductCard product={mockProduct} />);

    const card = screen.getByText(mockProduct.title).closest("div");
    fireEvent.click(card!);

    expect(mockRouter.push).toHaveBeenCalledWith(`/product/${mockProduct.id}`);
  });

  it("shows add to cart button", () => {
    render(<ProductCard product={mockProduct} />);

    const addButton = screen.getByRole("button");
    expect(addButton).toBeInTheDocument();
  });
});
