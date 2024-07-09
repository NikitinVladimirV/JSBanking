import { getData } from "../../tools/api";
import { createElement, createHeaderPage, createCoursesItem, createCurrencyBody, createYourCurrencyItem } from "../../tools/createElement";
import { clickExchangeBtn } from "../../tools/handlers";
import { objectToArray } from "../../tools/helper";

const sectionData = { tag: "section", classes: ["currency"] };
const containerData = { tag: "div", classes: [`currency__container`, "container"] };
//
const headerPageData = { parentBlockClass: "currency", title: "Валютный обмен" };
//
const yourCurrencyListData = {
  parentBlockClass: "your-currency",
  li: {
    createItem: createYourCurrencyItem,
  },
  // items: "",
};
const yourCurrencyBlockData = {
  parentBlockClass: "currency",
  blockClass: "your-currency",
  title: "Ваши валюты",
  ul: yourCurrencyListData,
};
//
const exchangeCurrencyBtnData = { classes: ["exchange__btn"], value: "", path: "", content: "Обменять", click: clickExchangeBtn };
const exchangeBlockData = {
  parentBlockClass: "currency",
  blockClass: "exchange",
  title: "Обмен валюты",
  // currency: "",
  button: exchangeCurrencyBtnData,
};
//
const coursesListData = {
  parentBlockClass: "courses",
  li: {
    createItem: createCoursesItem,
  },
  // items: "",
  webSocket: true,
};
const coursesBlockData = {
  parentBlockClass: "currency",
  blockClass: "courses",
  title: "Изменение курсов в реальном времени",
  ul: coursesListData,
};
//
const bodyPageData = { yourCurrencyBlockData, exchangeBlockData, coursesBlockData };

export class Currency {
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
    await this.getData();
    if (typeof this.data === "string") window.location.hash = "#/error";
    await this.getDataCurrencies();
    if (typeof this.currencies === "string") window.location.hash = "#/error";

    const pageHeader = createHeaderPage(headerPageData);
    this.container.appendChild(pageHeader);

    bodyPageData.exchangeBlockData.currency = this.data;

    const yourCurrencyArr = objectToArray(this.data, this.currencies);
    bodyPageData.yourCurrencyBlockData.ul.items = yourCurrencyArr;

    const pageBody = createCurrencyBody(bodyPageData);
    this.container.appendChild(pageBody);
  }

  async getData(url = "all-currencies") {
    const response = await getData(url);

    return (this.data = response.error || response.payload);
  }

  async getDataCurrencies(url = "currencies") {
    const response = await getData(url);

    return (this.currencies = response.error || response.payload);
  }
}
