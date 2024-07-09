import {
  createElement,
  createHeaderPage,
  createSelect,
  createUl,
  createNavBar,
  createButton,
  createMap,
  createForm,
  createTable,
  createErrorMessageBlock,
  createAutocompleteBlock,
} from "./createElement";

describe("CREATE_ELEMENTS", () => {
  describe("CreateElement", () => {
    it("Without params, should creates empty HTMLDivElement", () => {
      // Arrange
      const expectedText = "<div></div>";
      // Act
      const el = createElement();
      // Assert
      expect(el).toBeInstanceOf(HTMLDivElement);
      expect(el.outerHTML).toBe(expectedText);
    });

    it("With basic params, should creates definite HTMLHeadingElement", () => {
      // Arrange
      const params = { tag: "h1", classes: ["page__title", "title"], content: "text" };
      const expectedText = '<h1 class="page__title title">text</h1>';
      // Act
      const el = createElement(params);
      // Assert
      expect(el).toBeInstanceOf(HTMLHeadingElement);
      expect(el.outerHTML).toBe(expectedText);
    });

    it("With 'id', should creates HTMLDivElement with 'id'", () => {
      // Arrange
      const params = { id: 1 };
      const expectedText = '<div id="1"></div>';
      // Act
      const el = createElement(params);
      // Assert
      expect(el).toBeInstanceOf(HTMLDivElement);
      expect(el.outerHTML).toBe(expectedText);
    });

    it("With 'type', should creates HTMLInputElement with 'type'", () => {
      // Arrange
      const params = { tag: "input", type: "submit" };
      const expectedText = '<input type="submit">';
      // Act
      const el = createElement(params);
      // Assert
      expect(el).toBeInstanceOf(HTMLInputElement);
      expect(el.outerHTML).toBe(expectedText);
    });

    it("With 'name', should creates HTMLInputElement with 'name'", () => {
      // Arrange
      const params = { tag: "input", name: "fullname" };
      const expectedText = '<input name="fullname">';
      // Act
      const el = createElement(params);
      // Assert
      expect(el).toBeInstanceOf(HTMLInputElement);
      expect(el.outerHTML).toBe(expectedText);
    });

    it("With 'value', should creates HTMLButtonElement with 'value'", () => {
      // Arrange
      const params = { tag: "button", value: "fullName" };
      const expectedText = '<button value="fullName"></button>';
      // Act
      const el = createElement(params);
      // Assert
      expect(el).toBeInstanceOf(HTMLButtonElement);
      expect(el.outerHTML).toBe(expectedText);
    });

    it("With 'hidden', should creates HTMLInputElement with 'hidden'", () => {
      // Arrange
      const params = { tag: "input", hidden: true };
      const expectedText = '<input hidden="true">';
      // Act
      const el = createElement(params);
      // Assert
      expect(el).toBeInstanceOf(HTMLInputElement);
      expect(el.outerHTML).toBe(expectedText);
    });

    it("With 'placeholder', should creates HTMLInputElement with 'placeholder'", () => {
      // Arrange
      const params = { tag: "input", placeholder: "placeholder" };
      const expectedText = '<input placeholder="placeholder">';
      // Act
      const el = createElement(params);
      // Assert
      expect(el).toBeInstanceOf(HTMLInputElement);
      expect(el.outerHTML).toBe(expectedText);
    });
  });

  describe("CreateNavBar", () => {
    it("Without params, should creates simple HTMLElement nav", () => {
      // Arrange
      const expectedText = '<nav class="page__nav nav"><ul class="page__list list-reset"><li class="page__item"></li></ul></nav>';
      // Act
      const el = createNavBar();
      // Assert
      expect(el).toBeInstanceOf(HTMLElement);
      expect(el.outerHTML).toBe(expectedText);
    });
    it("With params, should creates definite HTMLElement nav", () => {
      // Arrange
      const params = { parentBlockClass: "homepage", ul: { parentBlockClass: "nav", li: [], items: ["test1"] } };
      const expectedText = '<nav class="homepage__nav nav"><ul class="nav__list list-reset"><li class="nav__item">test1</li></ul></nav>';
      // Act
      const el = createNavBar(params);
      // Assert
      expect(el).toBeInstanceOf(HTMLElement);
      expect(el.outerHTML).toBe(expectedText);
    });
  });

  describe("CreateHeaderPage", () => {
    it("Without params should creates simple template HTMLDivElement", () => {
      // Arrange
      const expectedText = '<div class="page__header header-page"><div class="header-page__left"></div><div class="header-page__right"></div></div>';
      // Act
      const el = createHeaderPage();
      // Assert
      expect(el).toBeInstanceOf(HTMLDivElement);
      expect(el.outerHTML).toBe(expectedText);
    });

    it("With basic params should creates simple template HTMLDivElement", () => {
      // Arrange
      const params = { parentBlockClass: "page" };
      const expectedText = '<div class="page__header header-page"><div class="header-page__left"></div><div class="header-page__right"></div></div>';
      // Act
      const el = createHeaderPage(params);
      // Assert
      expect(el).toBeInstanceOf(HTMLDivElement);
      expect(el.outerHTML).toBe(expectedText);
    });
  });

  describe("CreateForm", () => {
    it("Without params, should create standart HTMLFormElement", () => {
      // Arrange
      const expectedText = '<form class="page__form form-page form"></form>';
      // Act
      const el = createForm();
      // Assert
      expect(el).toBeInstanceOf(HTMLFormElement);
      expect(el.outerHTML).toBe(expectedText);
    });

    it("With params, should create definite HTMLFormElement", () => {
      // Arrange
      const params = {
        parentBlockClass: "homepage",
        method: "post",
        titleData: { tag: "h2", content: "Homepage Form" },
        labelsData: [{ tag: "label" }],
        inputsData: [{ tag: "input" }],
        button: {},
      };
      const expectedText =
        '<form class="homepage__form form-homepage form" method="post"><h2>Homepage Form</h2><label><input></label><button class="btn" type="button">Button</button></form>';
      // Act
      const el = createForm(params);
      // Assert
      expect(el).toBeInstanceOf(HTMLFormElement);
      expect(el.outerHTML).toBe(expectedText);
    });
  });

  describe("CreateSelect", () => {
    it("Without params should creates simple template HTMLSelectElement", () => {
      // Arrange
      const expectedText = '<select class="page__select select"><option class="page__option option"></option></select>';
      // Act
      const el = createSelect();
      // Assert
      expect(el).toBeInstanceOf(HTMLSelectElement);
      expect(el.outerHTML).toBe(expectedText);
    });

    it("With params should creates definite template HTMLSelectElement", () => {
      // Arrange
      const params = { parentBlockClass: "pages", name: "sort", options: [{}] };
      const expectedText = '<select class="pages__select select" name="sort"><option class="pages__option option"></option></select>';
      // Act
      const el = createSelect(params);
      // Assert
      expect(el).toBeInstanceOf(HTMLSelectElement);
      expect(el.outerHTML).toBe(expectedText);
    });
  });

  describe("CreateUl", () => {
    it("Without params, should creates simple template HTMLUListElement with one li", () => {
      // Arrange
      const expectedText = '<ul class="page__list list-reset"><li class="page__item"></li></ul>';
      // Act
      const el = createUl();
      // Assert
      expect(el).toBeInstanceOf(HTMLUListElement);
      expect(el.outerHTML).toBe(expectedText);
    });

    it("With params should creates definite HTMLUListElement", () => {
      // Arrange
      const params = { parentBlockClass: "nav", li: {}, items: ["1"] };
      const expectedText = '<ul class="nav__list list-reset"><li class="nav__item">1</li></ul>';
      // Act
      const el = createUl(params);
      // Assert
      expect(el).toBeInstanceOf(HTMLUListElement);
      expect(el.outerHTML).toBe(expectedText);
    });
  });

  describe("CreateButton", () => {
    it("Without params, should create empty HTMLButtonElement", () => {
      // Arrange
      const expectedText = "<button></button>";
      // Act
      const el = createButton();
      // Assert
      expect(el).toBeInstanceOf(HTMLButtonElement);
      expect(el.outerHTML).toBe(expectedText);
    });

    it("With standart params, should create standart HTMLButtonElement", () => {
      // Arrange
      const params = { content: "Button" };
      const expectedText = '<button class="btn" type="button">Button</button>';
      // Act
      const el = createButton(params);
      // Assert
      expect(el).toBeInstanceOf(HTMLButtonElement);
      expect(el.outerHTML).toBe(expectedText);
    });

    it("With params, should create definite HTMLButtonElement", () => {
      // Arrange
      const params = { content: "Test Button", classes: ["page__btn"], type: "submit", value: "test", path: "url" };
      const expectedText = '<button class="page__btn btn" type="submit" value="test" data-path="url">Test Button</button>';
      // Act
      const el = createButton(params);
      // Assert
      expect(el).toBeInstanceOf(HTMLButtonElement);
      expect(el.outerHTML).toBe(expectedText);
    });
  });

  describe("CreateButton", () => {
    it("Without params, should create standart HTMLDivElement error", () => {
      // Arrange
      const expectedText =
        '<div class="error" style="display: flex; align-items: center; justify-content: center; height: 100%; font-size: 40px; font-weight: bold;">Error</div>';
      // Act
      const el = createErrorMessageBlock();
      // Assert
      expect(el).toBeInstanceOf(HTMLDivElement);
      expect(el.outerHTML).toBe(expectedText);
    });

    it("With params, should create definite HTMLDivElement", () => {
      // Arrange
      const params = "404";
      const expectedText =
        '<div class="error" style="display: flex; align-items: center; justify-content: center; height: 100%; font-size: 40px; font-weight: bold;">404</div>';
      // Act
      const el = createErrorMessageBlock(params);
      // Assert
      expect(el).toBeInstanceOf(HTMLDivElement);
      expect(el.outerHTML).toBe(expectedText);
    });
  });
  // Not checked
  describe("CreateMap", () => {
    it("Without params, should create map", () => {
      // Arrange
      // Act
      // Assert
    });

    it("With params, should create map", () => {
      // Arrange
      // Act
      // Assert
    });
  }); //

  describe("CreateTable", () => {
    it("Without params, should create standart HTMLTableElement", () => {
      // Arrange
      const expectedText = '<table class="page__table table-page"></table>';
      // Act
      const el = createTable();
      // Assert
      expect(el).toBeInstanceOf(HTMLTableElement);
      expect(el.outerHTML).toBe(expectedText);
    });

    it("With params, should create definite HTMLTableElement", () => {
      // Arrange
      const data = { transactions: [{ from: 111, to: 222, amount: 999, date: "2024-06-29" }] };
      const params = { parentBlockClass: "homepage", data, tableHeaderData: ["1", "2", "3", "4"], slice: -5 };
      const expectedText =
        '<table class="homepage__table table-homepage"><thead class="table-homepage__header"><tr class="table-homepage__header-string"><th class="table-homepage__header-cell">1</th><th class="table-homepage__header-cell">2</th><th class="table-homepage__header-cell">3</th><th class="table-homepage__header-cell">4</th></tr></thead><tbody class="table-homepage__body"><tr class="table-homepage__body-string"><td class="table-homepage__body-cell">111</td><td class="table-homepage__body-cell">222</td><td class="table-homepage__body-cell table-homepage__body-cell--green">999</td><td class="table-homepage__body-cell">29.06.2024</td></tr></tbody></table>';
      // Act
      const el = createTable(params);
      // Assert
      expect(el).toBeInstanceOf(HTMLTableElement);
      expect(el.outerHTML).toBe(expectedText);
    });
  });

  describe("CreateAutocompleteBlock", () => {
    it("Without params, should return HTMLUListElement", () => {
      // Arrange
      const expectedText = '<ul class="autocomplete"></ul>';
      // Act
      const el = createAutocompleteBlock();
      // Assert
      expect(el).toBeInstanceOf(HTMLUListElement);
      expect(el.outerHTML).toBe(expectedText);
    });

    it("With params, should return HTMLUListElement", () => {
      // Arrange
      const params = { value: "a", accounts: ["London", "Tula", "Moscow", "Paris"] };
      const expectedText = '<ul class="autocomplete active"><li class="autocomplete__item">Tula</li><li class="autocomplete__item">Paris</li></ul>';
      // Act
      const el = createAutocompleteBlock(params);
      // Assert
      expect(el).toBeInstanceOf(HTMLUListElement);
      expect(el.outerHTML).toBe(expectedText);
    });
  });
});
