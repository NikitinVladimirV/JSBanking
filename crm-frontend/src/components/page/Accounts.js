import { createElement, createHeaderPage, createUl, createAccountsItem } from "../../tools/createElement";
import { getData } from "../../tools/api";
import { sortAccounts } from "../../tools/helper";
import { clickNewAccountBtn, inputSortSelect } from "../../tools/handlers";

const sectionData = { tag: "section", classes: ["accounts"] };
const containerData = { tag: "div", classes: [`accounts__container`, "container"] };
//
const createNewAccountBtnData = {
  classes: ["accounts__new-btn"],
  content: "Создать новый счёт",
  // type: "",
  value: "createAccount",
  // path: "",
  click: clickNewAccountBtn,
};
const headerPageData = {
  parentBlockClass: "accounts",
  title: "Ваши счета",
  select: {
    name: "sort",
    inputHandler: inputSortSelect,
    label: { classes: ["accounts__label"] },
    options: [
      { content: "Сортировка", hidden: true },
      { content: "По номеру", value: "account" },
      { content: "По балансу", value: "balance" },
      { content: "По последней транзакции", value: "transaction" },
    ],
  },
  button: createNewAccountBtnData,
};
//
const bodyPageData = {
  parentBlockClass: "accounts",
  li: {
    createItem: createAccountsItem,
  },
  items: [],
};

export class Accounts {
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

    const sortFlag = window.location.search.split("?sort=")[1];
    this.data = sortAccounts(this.data, sortFlag, true);

    const pageHeader = createHeaderPage(headerPageData);
    this.container.appendChild(pageHeader);

    const bodyPage = createUl({ ...bodyPageData, items: this.data });
    this.container.appendChild(bodyPage);
  }

  async getData(url = "accounts") {
    const response = await getData(url);

    return (this.data = response.error || response.payload);
  }
}
