import { Atm } from "./Atm";
import { Currency } from "./Currency";
import { ErrorPage } from "./ErrorPage";
import { Account } from "./Account";
import { Details } from "./Details";
import { Accounts } from "./Accounts";
import { Signin } from "./Signin";
import { createElement } from "../../tools/createElement";

const mainData = { tag: "main", classes: ["main"] };

export class Main {
  constructor() {
    this.init();
  }

  init() {
    this.parentClassName = this.constructor.name.toLocaleLowerCase();
    console.log("!", this.parentClassName.toLocaleUpperCase());

    this.element = createElement(mainData);
  }

  render() {
    this.element.innerHTML = "";
    const url = window.location.hash.split("?")[0];
    let page;

    if (url === "#/login") {
      page = new Signin();
    }
    if (url === "#/atm") {
      page = new Atm();
    }
    if (url === "#/accounts") {
      page = new Accounts();
    }
    if (url === "#/account") {
      page = new Account();
    }
    if (url === "#/details") {
      page = new Details();
    }
    if (url === "#/currency") {
      page = new Currency();
    }
    if (url === "#/error") {
      page = new ErrorPage();
    }

    this.element.appendChild(page.element);
    page.render();
  }
}
