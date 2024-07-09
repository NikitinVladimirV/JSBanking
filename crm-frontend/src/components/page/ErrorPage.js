import { createElement, createErrorMessageBlock } from "../../tools/createElement";

const sectionData = { tag: "section", classes: ["error"] };
const containerData = { tag: "div", classes: [`error__container`, "container"] };

export class ErrorPage {
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
    const bodyPage = createErrorMessageBlock("Error!");
    this.container.appendChild(bodyPage);
  }
}
