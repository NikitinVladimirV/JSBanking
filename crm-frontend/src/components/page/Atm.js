import { getData } from "../../tools/api";
import { createElement, createHeaderPage, createMap } from "../../tools/createElement";

const sectionData = { tag: "section", classes: ["atm"] };
const containerData = { tag: "div", classes: [`atm__container`, "container"] };
//
const headerPageData = { parentBlockClass: "atm", title: "Карта банкоматов" };
//
const atmMapData = { id: "map", map: { center: [55.76, 37.64], zoom: 7 } };

export class Atm {
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

  async getContent() {
    await this.getData("banks");
    if (typeof this.data === "string") window.location.hash = "#/error";

    const pageHeader = createHeaderPage(headerPageData);
    this.container.appendChild(pageHeader);

    atmMapData.map.points = this.data;

    const pageBody = createMap(atmMapData);
    this.container.appendChild(pageBody);
  }

  async getData(url = "accounts") {
    const response = await getData(url);

    return (this.data = response.error || response.payload);
  }
}
