import { createDetailsBody, createElement, createHeaderPage } from "../../tools/createElement";
import { getData } from "../../tools/api";
import { clickBackBtn } from "../../tools/handlers";

const sectionData = { tag: "section", classes: ["details"] };
const containerData = { tag: "div", classes: [`details__container`, "container"] };
//
const backBtnData = {
  styles: ["account-more__back-btn"],
  value: "back",
  path: "account",
  content: "Вернуться назад",
  click: clickBackBtn,
};
const headerPageData = {
  parentBlockClass: "details",
  title: "Просмотр счёта",
  button: backBtnData,
  data: {},
};
//
const dynamicTitleData = { tag: "h3", classes: ["dynamic__title"], content: "Динамика баланса" };
const dynamicChartData = {
  data: {},
  count: 12,
  ratio: 7,
  stacked: false,
  dataset: 1,
};
const dynamicBlockData = {
  parentBlockClass: "details",
  blockClass: "dynamic",
  title: dynamicTitleData,
  wrapper: { classes: ["dynamic__wrapper"] },
  canvas: { tag: "canvas", id: "myChart" },
  dynamicChartData,
};
//
const differentTitleData = { tag: "h3", classes: ["different__title"], content: "Соотношение входящих исходящих транзакций" };
const differentChartData = {
  data: {},
  count: 12,
  ratio: 7,
  stacked: true,
  dataset: 2,
};
const differentBlockData = {
  parentBlockClass: "details",
  blockClass: "different",
  title: differentTitleData,
  wrapper: { classes: ["different__wrapper"] },
  canvas: { tag: "canvas", id: "myChart" },
  differentChartData,
};
//
const historyTitleData = { tag: "h3", classes: ["history__title", "subtitle"], content: "История переводов" };
const historyTableData = {
  parentBlockClass: "history",
  data: {},
  tableHeaderData: ["Счёт отправителя", "Счёт получателя", "Сумма", "Дата"],
  slice: -25,
};
const historyBlockData = {
  parentBlockClass: "account",
  blockClass: "history",
  title: historyTitleData,
  historyTableData,
};
//
const bodyPageData = {
  dynamicBlockData,
  differentBlockData,
  historyBlockData,
};

export class Details {
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
    const accountNumber = window.location.hash.split("?")[1]; //
    await this.getData(`account/${accountNumber}`);
    if (typeof this.data === "string") window.location.hash = "#/error";

    backBtnData.path = `account?${this.data.account}`; //

    const pageHeader = createHeaderPage({ ...headerPageData, data: this.data });
    this.container.appendChild(pageHeader);

    bodyPageData.dynamicBlockData.dynamicChartData.data = this.data;
    bodyPageData.differentBlockData.differentChartData.data = this.data;
    bodyPageData.historyBlockData.historyTableData.data = this.data;
    const bodyPage = createDetailsBody(bodyPageData);
    this.container.appendChild(bodyPage);
  }

  async getData(url = "accounts") {
    const response = await getData(url);

    return (this.data = response.error || response.payload);
  }
}
