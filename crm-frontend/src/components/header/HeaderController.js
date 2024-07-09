import { Header } from "./Header";

export class HeaderController {
  constructor(root) {
    this.rootElement = root;
    this.init();
  }

  init() {
    this.parentClassName = this.constructor.name;
    console.log("!", this.parentClassName.toLocaleUpperCase());

    this.header = new Header();
  }

  render() {
    if (!this.rootElement.contains(this.header.element)) {
      this.rootElement.appendChild(this.header.element);
    }

    const logged = window.location.hash !== "#/login";
    this.header.render(logged);
  }
}
