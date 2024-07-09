import { createButton, createElement, createNavBar } from "../../tools/createElement";
import { clickNavBarBtn } from "../../tools/handlers";

const headerData = { tag: "header", classes: ["header"] };
const containerData = { tag: "div", classes: [`header__container`, "container"] };
//
const logoData = { tag: "div", classes: ["header__logo", "logo"], content: "Coin." };
const headerBtnData = [
  { classes: ["header__btn", "outline", "btn"], value: "atm", path: "atm", content: "Банкоматы", click: clickNavBarBtn },
  { classes: ["header__btn", "outline", "btn"], value: "accounts", path: "accounts", content: "Счета", click: clickNavBarBtn },
  { classes: ["header__btn", "outline", "btn"], value: "currency", path: "currency", content: "Валюта", click: clickNavBarBtn },
  { classes: ["header__btn", "outline", "btn"], value: "exit", path: "login", content: "Выйти", click: clickNavBarBtn },
];
const headeNavBarData = {
  parentBlockClass: "header",
  ul: {
    parentBlockClass: "nav",
    li: {
      createItem: createButton,
    },
    items: headerBtnData,
  },
};

export class Header {
  constructor() {
    this.init();
  }

  init() {
    this.parentClassName = this.constructor.name.toLocaleLowerCase();
    console.log("!", this.parentClassName.toLocaleUpperCase());

    this.element = createElement(headerData);
    this.container = createElement(containerData);
    this.element.appendChild(this.container);
  }

  render(logged) {
    this.getContent(logged);
  }

  getContent(logged) {
    if (!this.logo) {
      this.logo = createElement(logoData);
      this.container.appendChild(this.logo);
    }
    if (!this.navBar) this.navBar = createNavBar(headeNavBarData);

    if (logged) {
      this.container.appendChild(this.navBar);
    } else {
      this.navBar.remove();
    }
  }
}
