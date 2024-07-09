import { Main } from "../components/page/Main";

export class MainController {
  constructor(root) {
    this.rootElement = root;
    this.init();
  }

  init() {
    this.parentClassName = this.constructor.name;
    console.log("!", this.parentClassName.toLocaleUpperCase());

    this.main = new Main();
  }

  render() {
    if (!this.rootElement.contains(this.main.element)) {
      this.rootElement.appendChild(this.main.element);
    }

    this.main.render(this.rootElement);
  }
}
