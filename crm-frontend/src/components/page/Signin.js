import { createElement, createForm } from "../../tools/createElement";
import { clickSigninBtn } from "../../tools/handlers";

const sectionData = { tag: "section", classes: ["signin"] };
const containerData = { tag: "div", classes: [`signin__container`, "container"] };
//
const titleData = { tag: "h2", classes: [`form-signin__title`, "title"], content: "Вход в аккаунт" };
const labelsData = [
  {
    tag: "label",
    classes: [`form-signin__label`, "label"],
    content: "Логин",
  },
  {
    tag: "label",
    classes: [`form-signin__label`, "label"],
    content: "Пароль",
  },
];
const inputsData = [
  {
    tag: "input",
    classes: [`form-signin__input`, "input"],
    placeholder: "Placeholder",
    errorMessage: "No space, min 6 characters!",
    type: "text",
    name: "login",
  },
  {
    tag: "input",
    classes: [`form-signin__input`, "input"],
    placeholder: "Placeholder",
    errorMessage: "No space, min 6 characters!",
    type: "password",
    name: "password",
  },
];
const signinFormData = {
  parentBlockClass: "signin",
  method: "post",
  titleData,
  labelsData,
  inputsData,
  button: {
    content: "Войти",
    classes: [`form-signin__btn`, "btn"],
    type: "submit",
    value: "submit",
    path: "accounts",
    click: clickSigninBtn,
  },
};

export class Signin {
  constructor() {
    this.init();
  }

  init() {
    this.parentClassName = this.constructor.name.toLocaleLowerCase();
    console.log("!", this.parentClassName.toLocaleUpperCase());

    this.element = createElement(sectionData);
    this.container = createElement(containerData);
    this.element.appendChild(this.container);
  }

  render() {
    this.container.innerHTML = "";
    this.getContent();
  }

  getContent() {
    const pageBody = createForm(signinFormData);
    this.container.appendChild(pageBody);
  }
}
