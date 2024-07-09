import { ButtonComponent } from "./ButtonComponent";

describe("CLASS BUTTON", () => {
  it("Without params, should create empty HTMLButtonElement button", () => {
    // Arrange
    const expectedText = "<button></button>";
    // Act
    const btn = new ButtonComponent().element;
    // Assert
    expect(btn).toBeInstanceOf(HTMLButtonElement);
    expect(btn.outerHTML).toBe(expectedText);
  });

  it("With standart params, should create standart HTMLButtonElement button", () => {
    // Arrange
    const data = { content: "Button" };
    const expectedText = '<button class="btn" type="button">Button</button>';
    // Act
    const btn = new ButtonComponent(data).element;
    // Assert
    expect(btn).toBeInstanceOf(HTMLButtonElement);
    expect(btn.outerHTML).toBe(expectedText);
  });

  it("With params, should create definite HTMLButtonElement button", () => {
    // Arrange
    const data = { content: "Test Button", classes: ["page__btn"], type: "submit", value: "test", path: "url" };
    const expectedText = '<button class="page__btn btn" type="submit" value="test" data-path="url">Test Button</button>';
    // Act
    const btn = new ButtonComponent(data).element;
    // Assert
    expect(btn).toBeInstanceOf(HTMLButtonElement);
    expect(btn.outerHTML).toBe(expectedText);
  });
});
