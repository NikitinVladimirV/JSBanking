import { HeaderController } from "./components/header/HeaderController";
import { MainController } from "./controllers/MainController";

export class Router {
  routes = ["#/login", "#/atm", "#/accounts", "#/account", "#/details", "#/currency", "#/error"];

  constructor(options) {
    this.rootElement = document.querySelector(options.rootElement);
    this.init();
  }

  init() {
    this.parentClassName = this.constructor.name;
    console.log("!", this.parentClassName.toLocaleUpperCase());

    this.headerController = new HeaderController(this.rootElement);
    this.mainController = new MainController(this.rootElement);

    window.addEventListener("load", this.dispatch.bind(this));
    window.addEventListener("hashchange", () => {
      this.dispatch();
    });
  }

  dispatch() {
    let location = (window.location.hash = window.location.hash || "#/accounts");

    if (!localStorage.getItem("token")) window.location.hash = "#/login";
    if (!this.routes.includes(location.split("?")[0])) location = window.location.hash = "#/error";

    this.headerController.render();
    this.mainController.render();
  }
}
