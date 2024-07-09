import { createElement } from "../../tools/createElement";
import { arrayClassesToString } from "../../tools/helper";

// Как чистый компонент, должен возвращать только разметку, а не вставлять его в дом.
export class ButtonComponent {
  element = createElement({ tag: "button" });

  constructor(data) {
    this.init(data);
  }

  init(data) {
    this.parentClassName = this.constructor.name.toLocaleLowerCase();
    console.log("!", this.parentClassName.toLocaleUpperCase());

    this.data = data;
    this.render();
  }

  render() {
    if (!this.data) return;

    const { content, classes, type, value, path, click } = this.data;
    this.element.textContent = content || "Button";
    if (classes) this.element.classList = arrayClassesToString(classes);
    this.element.classList.add("btn");
    this.element.type = type || "button";
    if (value) this.element.value = value;
    if (path) this.element.dataset.path = path;

    path && location.hash.split("/")[1] === path ? this.element.classList.add("active") : this.element.classList.remove("active");

    window.addEventListener("hashchange", () => {
      this.element.classList.remove("active");
      location.hash.split("/")[1] === this.element.dataset.path ? this.element.classList.add("active") : this.element.classList.remove("active");
    });

    this.element.addEventListener("click", (e) => {
      console.log("CLICK!", e.target.textContent + " - " + e.target.value);

      click ? click(e) : this.click();
    });
  }

  click() {
    console.log(33);
    alert("Button click not support!");
  }
}
