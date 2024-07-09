import { getData } from "../tools/api";
import { createElement } from "../tools/createElement";

export class PageComponent {
  constructor() {
    this.init();
  }

  init() {
    this.parentClassName = this.constructor.name.toLocaleLowerCase();
    console.log(this.parentClassName.toLocaleUpperCase());

    this.element = this.getElement();
  }

  getElement() {
    this.element = createElement({ tag: "section", classes: [this.parentClassName] });

    return this.element;
  }

  async getData(url = "accounts") {
    const response = await getData(url);

    return (this.data = response.error || response.payload);
  }

  async changeContent() {
    this.element.innerHTML = "";
    this.container = createElement({ tag: "div", classes: [`${this.parentClassName}__container`, "container"] });
    this.element.appendChild(this.container);
  }
}
