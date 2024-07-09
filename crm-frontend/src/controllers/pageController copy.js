import { Header } from "../components/header/Header";
import { Main } from "../components/page/Main";

// export const headerBtn = [
//   { styles: ["header__btn", "outline"], value: "atm", path: "atm", content: "Банкоматы" },
//   { styles: ["header__btn", "outline"], value: "accounts", path: "accounts", content: "Счета" },
//   { styles: ["header__btn", "outline"], value: "currency", path: "currency", content: "Валюта" },
//   { styles: ["header__btn", "outline"], value: "exit", path: "login", content: "Выйти" },
// ];

export class PageController {
  constructor(root) {
    this.root = document.querySelector(root);

    this.init();
  }

  init() {
    this.parentClassName = this.constructor.name;
    console.log("!", this.parentClassName.toLocaleUpperCase());

    // this.header = new Header();
    // this.header.render(this.root);

    this.main = new Main();
  }

  renderPage(rout) {
    // this.root.appendChild(this.header.element);

    // if (rout !== "#/login") {
    //   this.header.addNavBar(headerBtn, rout.slice(2));
    // } else {
    //   this.header.deleteNavBar();
    // }

    this.root.appendChild(this.getBody(rout));
  }

  // getHeader(rout) {
  //   if (rout === "#/login") {
  //     this.header.addNavBar();
  //   } else {
  //     this.header.addNavBar(headerBtn);
  //   }

  //   return this.header.element;
  // }

  getBody(rout, params = null) {
    this.main.changeContent(rout, params);

    return this.main.element;
  }
}
