import { createElement, createHeaderPage, createAccountBody } from "../../tools/createElement";
import { getData } from "../../tools/api";
import { clickBackBtn, clickAccountElement, clickSendMoneyBtn, inputHandlerAutocomplete } from "../../tools/handlers";

const sectionData = { tag: "section", classes: ["account"] };
const containerData = { tag: "div", classes: [`account__container`, "container"] };
//
const backBtnData = {
  classes: ["account__back-btn"],
  content: "Вернуться назад",
  // type: '',
  value: "back",
  path: "accounts",
  click: clickBackBtn,
};
const headerPageData = {
  parentBlockClass: "account",
  title: "Просмотр счёта",
  button: backBtnData,
  // data: {},
};
//
const accountFormTitleData = { tag: "h3", classes: [`form-account__title`, "subtitle"], content: "Новый перевод" };
const accountFormLabelsData = [
  {
    tag: "label",
    classes: [`form-account__label`, "label"],
    content: "Номер счёта получателя",
  },
  {
    tag: "label",
    classes: [`form-account__label`, "label"],
    content: "Сумма перевода",
  },
];
const accountFormInputsData = [
  {
    tag: "input",
    classes: [`form-account__input`, "input"],
    placeholder: "Placeholder",
    type: "text",
    name: "number",
    handler: {
      name: "input",
      function: inputHandlerAutocomplete,
    },
  },
  {
    tag: "input",
    classes: [`form-account__input`, "input"],
    placeholder: "Placeholder",
    type: "text",
    name: "sum",
  },
];
const accountFormBtnData = {
  content: "Отправить",
  classes: ["form-account__btn"],
  type: "submit",
  value: "transfer",
  // path: "",
  click: clickSendMoneyBtn,
};
const accountFormBlockData = {
  parentBlockClass: "account",
  method: "post",
  titleData: accountFormTitleData,
  labelsData: accountFormLabelsData,
  inputsData: accountFormInputsData,
  button: accountFormBtnData,
};
//
const dynamicTitleData = { tag: "h3", classes: ["dynamic__title"], content: "Динамика баланса" };
const dynamicChartData = {
  data: {},
  count: 6,
  ratio: 3,
  stacked: false,
  dataset: 1,
};
const dynamicBlockData = {
  parentBlockClass: "account",
  blockClass: "dynamic",
  title: dynamicTitleData,
  wrapper: { classes: ["dynamic__wrapper"] },
  canvas: { tag: "canvas", id: "myChart" },
  dynamicChartData,
  handler: {
    name: "click",
    function: clickAccountElement,
    // functionParams: "",
  },
};
//
const historyTitleData = { tag: "h3", classes: ["history__title", "subtitle"], content: "История переводов" };
const historyTableData = {
  parentBlockClass: "history",
  data: {},
  tableHeaderData: ["Счёт отправителя", "Счёт получателя", "Сумма", "Дата"],
  slice: -10,
};
const historyBlockData = {
  parentBlockClass: "account",
  blockClass: "history",
  title: historyTitleData,
  historyTableData,
  handler: {
    name: "click",
    function: clickAccountElement,
    // functionParams: "",
  },
};
//
const bodyPageData = {
  accountFormBlockData,
  dynamicBlockData,
  historyBlockData,
};

export class Account {
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

    const pageHeader = createHeaderPage({ ...headerPageData, data: this.data });
    this.container.appendChild(pageHeader);

    bodyPageData.accountFormBlockData.button.path = this.data.account;
    bodyPageData.dynamicBlockData.dynamicChartData.data = this.data;
    bodyPageData.historyBlockData.historyTableData.data = this.data;

    const bodyPage = createAccountBody(bodyPageData);
    this.container.appendChild(bodyPage);
  }

  async getData(url = "accounts") {
    const response = await getData(url);

    return (this.data = response.error || response.payload);
  }
}
