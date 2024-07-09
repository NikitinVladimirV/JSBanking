import Chart from "chart.js/auto";
import { responseToTwelveLatestMonth, sortAccountsByDate } from "./helper";
import { ButtonComponent } from "../components/button/ButtonComponent";
import { clickOpenAccountBtn } from "./handlers";
import { webSocket2 } from "./api";

export function createElement({ tag, content, classes, method, id, type, name, value, hidden, placeholder, handler } = {}) {
  const element = document.createElement(tag || "div");

  element.textContent = content || "";
  if (classes) {
    classes.forEach((className) => {
      element.classList.add(className);
    });
  }
  if (method) element.method = method;
  if (id) element.id = id;
  if (type) element.type = type;
  if (name) element.name = name;
  if (value) element.value = value;
  if (hidden) element.setAttribute("hidden", hidden);
  if (placeholder) element.placeholder = placeholder;

  if (handler) {
    element.addEventListener(handler.name, (e) => {
      handler.function(e, handler.functionParams || null);
    });
  }

  return element;
}
export function createNavBar({ parentBlockClass, ul } = {}) {
  const navBar = createElement({ tag: "nav", classes: [`${parentBlockClass || "page"}__nav`, "nav"] });

  const ulElement = createUl(ul);
  navBar.appendChild(ulElement);

  return navBar;
}
export function createHeaderPage({ parentBlockClass, title, select, button, data } = {}) {
  const blockClass = `header-${parentBlockClass || "page"}`;
  const header = createElement({ classes: [`${parentBlockClass || "page"}__header`, blockClass] });

  const headerLeft = createElement({ classes: [`${blockClass}__left`] });
  header.appendChild(headerLeft);

  const headerRight = createElement({ classes: [`${blockClass}__right`] });
  header.appendChild(headerRight);

  if (title) {
    const titleElement = createElement({ tag: "h2", classes: [`${blockClass}__title`, "title"], content: title });
    headerLeft.appendChild(titleElement);
  }

  if (select) headerLeft.appendChild(createSelect({ ...select, parentBlockClass: blockClass }));

  if (data && data.account) {
    const accountElement = createElement({ tag: "span", classes: [`${blockClass}__number`], content: `№ ${data.account}` });
    headerLeft.appendChild(accountElement);
  }

  if (button) headerRight.appendChild(createButton(button));

  if (data && data.balance) {
    const balanceElement = createElement({ classes: [`${blockClass}__balance`], content: "Баланс" });
    headerRight.appendChild(balanceElement);

    const balanceSum = createElement({ tag: "span", content: `${data.balance}₽` });
    balanceElement.appendChild(balanceSum);
  }

  return header;
}
export function createForm({ parentBlockClass, method, titleData, labelsData, inputsData, button } = {}) {
  const blockClass = `form-${parentBlockClass || "page"}`;
  const form = createElement({ tag: "form", classes: [`${parentBlockClass || "page"}__form`, blockClass, "form"], method });

  if (titleData) {
    const formTitle = createElement(titleData);
    form.appendChild(formTitle);
  }

  if (inputsData) {
    inputsData.forEach((input, i) => {
      const label = createElement(labelsData[i]);
      form.appendChild(label);

      const inputElement = createElement(input);
      label.appendChild(inputElement);
    });
  }

  if (button) {
    const buttonElement = createButton(button);
    form.appendChild(buttonElement);
  }

  return form;
}
export function createSelect({ parentBlockClass, name, options, inputHandler } = {}) {
  const select = createElement({ tag: "select", classes: [`${parentBlockClass || "page"}__select`, "select"], name });

  if (!options) options = [{}];

  const sortFlag = window.location.search.split("?sort=")[1];

  options.forEach(({ content, value, hidden }) => {
    const option = createElement({
      tag: "option",
      classes: [`${parentBlockClass || "page"}__option`, "option"],
      content: content || "",
      value: value || "",
    });
    if (hidden) option.setAttribute("hidden", hidden);
    option.selected = sortFlag === value;
    select.appendChild(option);
  });

  select.addEventListener("input", (e) => {
    inputHandler(e);
  });

  return select;
}
export function createUl({ parentBlockClass, li, items, webSocket = false } = {}) {
  const ul = createElement({ tag: "ul", classes: [`${parentBlockClass || "page"}__list`, "list-reset"] });

  const array = [];

  if (webSocket) {
    const socket = webSocket2("currency-feed");

    socket.addEventListener("message", (e) => {
      ul.innerHTML = "";

      const msg = JSON.parse(e.data);
      array.push(msg);

      if (array.length > 25) array.shift();

      array.forEach((child) => {
        const liElement = createElement({ tag: "li", classes: [`${parentBlockClass || "page"}__item`] });
        ul.appendChild(liElement);

        if (li && li.createItem) {
          const item = li.createItem({ parentBlockClass }, child);
          liElement.appendChild(item);
        } else {
          liElement.textContent = child;
        }
      });
    });
  } else {
    if (!items) items = [""];

    items.forEach((child) => {
      const liElement = createElement({ tag: "li", classes: [`${parentBlockClass || "page"}__item`] });
      ul.appendChild(liElement);

      if (li && li.createItem) {
        const item = li.createItem(child);
        liElement.appendChild(item);
      } else {
        liElement.textContent = child;
      }
    });
  }

  return ul;
}
export function createButton(data) {
  return new ButtonComponent(data).element;
}
export function createErrorMessageBlock(message = "Error") {
  const messageElement = createElement({ classes: ["error"], content: message });
  messageElement.style.display = "flex";
  messageElement.style.alignItems = "center";
  messageElement.style.justifyContent = "center";
  messageElement.style.height = "100%";
  messageElement.style.fontSize = "40px";
  messageElement.style.fontWeight = "bold";

  return messageElement;
}
// Not checked
export function createMap({ id, map } = {}) {
  const mapElement = createElement({ id });

  /* eslint "no-undef": "off" */
  ymaps.ready(init);

  function init() {
    const atmMap = new ymaps.Map(id, {
      center: map.center,
      zoom: map.zoom,
    });

    map.points.forEach(({ lat, lon }) => {
      const point = new ymaps.Placemark([lat, lon]);
      atmMap.geoObjects.add(point);
    });

    atmMap.setBounds(atmMap.geoObjects.getBounds());
  }

  return mapElement;
} //
export function createTable({ parentBlockClass, data, tableHeaderData, slice } = {}) {
  const blockClass = `table-${parentBlockClass || "page"}`;
  const histroryTable = createElement({ tag: "table", classes: [`${parentBlockClass || "page"}__table`, blockClass] });

  if (tableHeaderData) {
    const historyHeader = createElement({ tag: "thead", classes: [`${blockClass}__header`] });
    histroryTable.appendChild(historyHeader);

    const historyHeaderString = createElement({ tag: "tr", classes: [`${blockClass}__header-string`] });
    historyHeader.appendChild(historyHeaderString);

    tableHeaderData.forEach((cell) => {
      const historyHeaderCell = createElement({ tag: "th", classes: [`${blockClass}__header-cell`], content: cell });
      historyHeaderString.appendChild(historyHeaderCell);
    });
  }

  if (data) {
    const historyBody = createElement({ tag: "tbody", classes: [`${blockClass}__body`] });
    histroryTable.appendChild(historyBody);

    const historyBodyData = sortAccountsByDate(data.transactions.slice(slice));

    historyBodyData.forEach((string) => {
      const historyBodyString = createElement({ tag: "tr", classes: [`${blockClass}__body-string`] });
      historyBody.appendChild(historyBodyString);

      const historyBodyCellFrom = createElement({ tag: "td", classes: [`${blockClass}__body-cell`], content: string.from });
      historyBodyString.appendChild(historyBodyCellFrom);

      const historyBodyCellTo = createElement({ tag: "td", classes: [`${blockClass}__body-cell`], content: string.to });
      historyBodyString.appendChild(historyBodyCellTo);

      const historyBodyCellSum = createElement({ tag: "td", classes: [`${blockClass}__body-cell`], content: string.amount });

      if (string.from === data.account) {
        historyBodyCellSum.classList.add(`${blockClass}__body-cell--red`);
      } else {
        historyBodyCellSum.classList.add(`${blockClass}__body-cell--green`);
      }
      historyBodyString.appendChild(historyBodyCellSum);

      const historyBodyCellDate = createElement({
        tag: "td",
        classes: [`${blockClass}__body-cell`],
        content: new Date(string.date).toLocaleDateString(),
      });
      historyBodyString.appendChild(historyBodyCellDate);
    });
  }

  return histroryTable;
}
export function createAutocompleteBlock({ value, accounts } = {}) {
  const autocomplete = createElement({ tag: "ul", classes: ["autocomplete"] });

  if (value && accounts) {
    const matches = accounts.filter((item) => item.includes(value));

    if (matches.length > 0) {
      autocomplete.classList.add("active");
      matches.forEach((item) => {
        const itemElement = document.createElement("li");
        itemElement.classList.add("autocomplete__item");
        itemElement.textContent = item;
        autocomplete.appendChild(itemElement);

        itemElement.addEventListener("click", (e) => {
          const currentElement = e.target.textContent;
          autocomplete.previousSibling.value = currentElement;
          autocomplete.classList.remove("active");
        });
      });
    } else {
      autocomplete.classList.remove("active");
    }
  }

  return autocomplete;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
export function createChart({ data, ctx, count, ratio, stacked, dataset } = {}) {
  const twelveLatestObject = responseToTwelveLatestMonth(data.transactions);

  const chartAreaBorder = {
    id: "chartAreaBorder",

    beforeDraw(chart, args, options) {
      const {
        ctx,
        chartArea: { left, top, width, height },
      } = chart;

      ctx.save();
      ctx.strokeStyle = options.borderColor;
      ctx.lineWidth = options.borderWidth;
      ctx.setLineDash(options.borderDash || []);
      ctx.lineDashOffset = options.borderDashOffset;
      ctx.strokeRect(left, top, width, height);
      ctx.restore();
    },
  };

  ///////////////////////////////////////////////////////
  const datasets2 = [
    {
      data: twelveLatestObject.map((item) => item.amount),
      backgroundColor: "#76CA66",
    },
    {
      data: twelveLatestObject.map((item) => item.amount),
      backgroundColor: "#FD4E5D",
    },
  ];
  const datasets1 = [
    {
      // label: "!LaBeL!", // задаем название заголовка
      data: twelveLatestObject.map((item) => item.amount), // передаем динамику показателей
      // borderWidth: 2, // толщина бордера
      // borderColor: "red", // цвет бордера
      backgroundColor: "#116ACC", // цвет заливки графиков
    },
  ];
  ///////////////////////////////////////////////////////

  const chartOptions = {
    type: "bar", // устанавливаем тип
    // подключение плагинов
    plugins: [chartAreaBorder],
    // настройки отображения
    options: {
      animation: false, // отключение анимации
      plugins: {
        legend: {
          display: false, // отключаем загловок
        },
        chartAreaBorder: {
          borderColor: "black",
          borderWidth: 2,
        },
        tooltip: {
          // enabled: false, // отключаем тултипы
        },
      },
      aspectRatio: ratio, // устанавливаем соотношение высоты/ширины - 1/3
      scales: {
        y: {
          stacked: stacked, ///////////////////////////
          ticks: {
            callback: (value) => `${value} P`, // форматируем отображение тиков
            maxTicksLimit: 2,
          },
          position: "right", // позиция оси
          // display: false,
          // offset: true, // чтобы не обрезало данные выходящие за границы
          // border: {
          //   width: 2,
          //   color: "black",
          // },
          grid: {
            color: "transparent",
          },
        },
        x: {
          stacked: stacked, ///////////////////////////////
          max: count - 1,
          // display: false,
          ticks: {
            color: "black",
            maxRotation: 0,
            font: {
              weight: "bold",
            },
          },
          // border: {
          //   width: 2,
          //   color: "black",
          // },
          grid: {
            color: "transparent",
          },
        },
      },
      layout: {
        // padding: 50,
      },
    },
    data: {
      labels: twelveLatestObject.map((item) => item.date), // устанавливаем горизонтальные метки
      // настройки графиков
      datasets: dataset === 1 ? datasets1 : datasets2,
    },
  };

  Chart.defaults.font.size = 20;
  new Chart(ctx, chartOptions);
}
// Accounts
export function createAccountsItem({ account, balance, transactions } = {}) {
  const blockClass = "card-accounts";
  const item = createElement({ classes: [`${"accounts"}__card`, blockClass] });

  const content = createElement({ classes: [`${blockClass}__content`] });
  item.appendChild(content);

  const number = createElement({ tag: "b", classes: [`${blockClass}__number`], content: account });
  content.appendChild(number);

  const price = createElement({ classes: [`${blockClass}__price`], content: balance || "0" });
  content.appendChild(price);

  const lastTransaction = createElement({ classes: [`${blockClass}__transaction`] });
  content.appendChild(lastTransaction);

  const transactionDescription = createElement({ tag: "b", classes: [`${blockClass}__transaction-descr`], content: "Последняя транзакция:" });
  lastTransaction.appendChild(transactionDescription);

  const transactionDate = createElement({
    classes: [`${blockClass}__transaction-date`],
    content: transactions[0] ? new Date(transactions[0].date).toLocaleDateString() : "",
  });
  lastTransaction.appendChild(transactionDate);

  const button = createButton({
    classes: [`${blockClass}__btn`],
    value: "openAccount",
    path: `account?${account}`,
    content: "Открыть",
    click: clickOpenAccountBtn,
  });

  item.appendChild(button);

  return item;
}
// Account
export function createAccountBody({ accountFormBlockData, dynamicBlockData, historyBlockData } = {}) {
  const body = createElement({ classes: ["account__body"] });

  const wrapper = createElement({ classes: ["account__body-wrapper__string"] });
  body.appendChild(wrapper);
  wrapper.appendChild(createForm(accountFormBlockData));
  wrapper.appendChild(createDynamicBlock(dynamicBlockData));
  body.appendChild(createHistoryBlock(historyBlockData));

  return body;
}
// createForm(Account)
export function createDynamicBlock({ parentBlockClass, blockClass, title, wrapper, canvas, dynamicChartData, handler } = {}) {
  if (handler && dynamicChartData?.data?.account) handler.functionParams = dynamicChartData.data.account;
  const dynamicBlock = createElement({ classes: [`${parentBlockClass}__${blockClass}`, blockClass], handler });

  const dynamicTitle = createElement(title);
  dynamicBlock.appendChild(dynamicTitle);

  const canvasWrapper = createElement(wrapper);
  dynamicBlock.appendChild(canvasWrapper);

  const ctx = createElement(canvas);
  canvasWrapper.appendChild(ctx);

  createChart({ ...dynamicChartData, ctx });

  return dynamicBlock;
}
export function createHistoryBlock({ parentBlockClass, blockClass, title, historyTableData, handler } = {}) {
  if (handler && historyTableData?.data?.account) handler.functionParams = historyTableData.data.account;
  const historyBlock = createElement({ classes: [`${parentBlockClass}__${blockClass}`, blockClass], handler });

  const historyTitle = createElement(title);
  historyBlock.appendChild(historyTitle);

  const histroryTable = createTable(historyTableData);
  historyBlock.appendChild(histroryTable);
  // histroryTable.appendChild(historyHeader);

  // const historyHeaderString = createElement({ tag: "tr", classes: ["history__header-string"] });
  // historyHeader.appendChild(historyHeaderString);

  // tableData.header.forEach((cell) => {
  //   const historyHeaderCell = createElement({ tag: "th", classes: ["history__header-cell"], content: cell });
  //   historyHeaderString.appendChild(historyHeaderCell);
  // });

  // const historyBody = createElement({ tag: "tbody", classes: ["history__body"] });
  // histroryTable.appendChild(historyBody);

  // const historyBodyData = sortAccountsByDate(data.transactions.slice(slice));

  // historyBodyData.forEach((string) => {
  //   const historyBodyString = createElement({ tag: "tr", classes: ["history__body-string"] });
  //   historyBody.appendChild(historyBodyString);

  //   const historyBodyCellFrom = createElement({ tag: "td", classes: ["history__body-cell"], content: string.from });
  //   historyBodyString.appendChild(historyBodyCellFrom);

  //   const historyBodyCellTo = createElement({ tag: "td", classes: ["history__body-cell"], content: string.to });
  //   historyBodyString.appendChild(historyBodyCellTo);

  //   const historyBodyCellSum = createElement({ tag: "td", classes: ["history__body-cell"], content: string.amount });
  //   if (string.from === data.account) {
  //     historyBodyCellSum.classList.add("history__body-cell--red");
  //   } else {
  //     historyBodyCellSum.classList.add("history__body-cell--green");
  //   }
  //   historyBodyString.appendChild(historyBodyCellSum);

  //   const historyBodyCellDate = createElement({ tag: "td", classes: ["history__body-cell"], content: new Date(string.date).toLocaleDateString() });
  //   historyBodyString.appendChild(historyBodyCellDate);
  // });
  // historyBlock.appendChild(histroryTable);

  // historyBlock.addEventListener("click", () => {
  //   console.log("History");
  // });

  return historyBlock;
}
// Details
export function createDetailsBody({ dynamicBlockData, differentBlockData, historyBlockData } = {}) {
  const body = createElement({ classes: ["details__body"] });

  const wrapper = createElement({ classes: ["details__body-wrapper__column"] });
  body.appendChild(wrapper);
  wrapper.appendChild(createDynamicBlock(dynamicBlockData));
  wrapper.appendChild(createDifferentBlock(differentBlockData));
  body.appendChild(createHistoryBlock(historyBlockData));

  return body;
}
export function createDifferentBlock({ parentBlockClass, blockClass, title, wrapper, canvas, differentChartData } = {}) {
  const differentBlock = createElement({ classes: [`${parentBlockClass}__${blockClass}`, blockClass] });

  const differentTitle = createElement(title);
  differentBlock.appendChild(differentTitle);

  const canvasWrapper = createElement(wrapper);
  differentBlock.appendChild(canvasWrapper);

  const ctx = createElement(canvas);
  canvasWrapper.appendChild(ctx);

  createChart({ ...differentChartData, ctx });

  return differentBlock;
}
// createHistoryBlock(Details)
// Currency
export function createCurrencyBody({ yourCurrencyBlockData, exchangeBlockData, coursesBlockData } = {}) {
  const body = createElement({ classes: ["currency__body"] });

  const currencyWrapper = createElement({ classes: ["currency__wrapper"] });
  body.appendChild(currencyWrapper);

  const yourCurrencyBlock = createYourCurrencyBlock(yourCurrencyBlockData);
  currencyWrapper.appendChild(yourCurrencyBlock);

  const exchangeCurrencyElement = createExchangeCurrencyBlock(exchangeBlockData);
  currencyWrapper.appendChild(exchangeCurrencyElement);

  const coursesElement = createCoursesBlock(coursesBlockData);
  body.appendChild(coursesElement);

  return body;
}
export function createYourCurrencyBlock({ parentBlockClass, blockClass, title, ul } = {}) {
  const yourCurrencyBlock = createElement({ classes: [`${parentBlockClass}__your`, blockClass] });

  const yourCurencyTitle = createElement({ tag: "h3", classes: [`${blockClass}__title`, "subtitle"], content: title });
  yourCurrencyBlock.appendChild(yourCurencyTitle);

  const yourCurencyList = createUl(ul);
  yourCurrencyBlock.appendChild(yourCurencyList);

  return yourCurrencyBlock;
}
export function createYourCurrencyItem({ parentBlockClass = "your-currency", code, amount } = {}) {
  const item = createElement({ classes: [`${parentBlockClass}__string`] });

  const nameElement = createElement({ tag: "span", classes: [`${parentBlockClass}__name`], content: code });
  item.appendChild(nameElement);

  const separator = createElement({
    tag: "span",
    classes: [`${parentBlockClass}__dots`],
    content: "................................................................................................................",
  });
  item.appendChild(separator);

  const valueElement = createElement({ tag: "span", classes: [`${parentBlockClass}__value`], content: amount });
  item.appendChild(valueElement);

  if (amount === 0) item.style.display = "none";

  return item;
}
export function createExchangeCurrencyBlock({ parentBlockClass, blockClass, title, currency, button } = {}) {
  const exchangeCurrencyElement = createElement({ classes: [`${parentBlockClass}__${blockClass}`, blockClass] });

  const exchangeTitle = createElement({ tag: "h3", classes: [`${blockClass}__title`, "subtitle"], content: title });
  exchangeCurrencyElement.appendChild(exchangeTitle);

  const exchangeForm = createElement({ tag: "form", classes: [`${blockClass}__form`] });
  exchangeCurrencyElement.appendChild(exchangeForm);

  const exchangeFields = createElement({ classes: [`${blockClass}__fields`] });
  exchangeForm.appendChild(exchangeFields);

  const exchangeSelects = createElement({ classes: [`${blockClass}__selects`] });
  exchangeFields.appendChild(exchangeSelects);

  const exchangeLabelFrom = createElement({ tag: "label", classes: [`${blockClass}__label`], content: "Из" });
  exchangeSelects.appendChild(exchangeLabelFrom);

  const exchangeSelectFrom = createElement({ tag: "select", classes: [`${blockClass}__select`] });
  exchangeLabelFrom.append(exchangeSelectFrom);

  currency.forEach((name) => {
    const exchangeOption = createElement({ tag: "option", classes: [`${blockClass}__option`], content: name });
    exchangeSelectFrom.append(exchangeOption);
  });

  const exchangeLabelTo = createElement({ tag: "label", classes: [`${blockClass}__label`], content: "в" });
  exchangeSelects.appendChild(exchangeLabelTo);

  const exchangeSelectTo = createElement({ tag: "select", classes: [`${blockClass}__select`] });
  exchangeLabelTo.append(exchangeSelectTo);

  currency.forEach((name) => {
    const exchangeOption = createElement({ tag: "option", classes: [`${blockClass}__option`], content: name });
    exchangeSelectTo.append(exchangeOption);
  });

  const exchangeLabelInput = createElement({ tag: "label", classes: [`${blockClass}__label`], content: "Сумма" });
  exchangeFields.appendChild(exchangeLabelInput);

  const exchangeInput = createElement({ tag: "input", classes: [`${blockClass}__input`], value: "0.1235421" });
  exchangeLabelInput.appendChild(exchangeInput);

  const exchangeCurrencyBtn = new ButtonComponent(button).element;
  exchangeForm.appendChild(exchangeCurrencyBtn);

  return exchangeCurrencyElement;
}
export function createCoursesBlock({ parentBlockClass, blockClass, title, ul } = {}) {
  const coursesElement = createElement({ classes: [`${parentBlockClass}__${blockClass}`, blockClass] });

  const coursesTitle = createElement({ tag: "h3", classes: [`${blockClass}__title`, "subtitle"], content: title });
  coursesElement.appendChild(coursesTitle);

  const coursesListElement = createUl(ul);
  coursesElement.appendChild(coursesListElement);

  return coursesElement;
}
export function createCoursesItem({ parentBlockClass = "courses" }, { type, from, to, rate, change }) {
  // console.log(type, from, to, rate, change);
  const item = createElement({ classes: [`${parentBlockClass}__string`] });

  // if (from && rate) {
  const nameElement = createElement({ tag: "span", classes: [`${parentBlockClass}__name`], content: `${from}/${to}` });
  item.appendChild(nameElement);

  const separator = createElement({
    tag: "span",
    classes: [`${parentBlockClass}__dots`, change === -1 ? `${parentBlockClass}__dots--red` : null],
    content:
      "................................................................................................................................................................................",
  });
  item.appendChild(separator);
  console.log(separator);

  const valueElement = createElement({
    tag: "span",
    classes: [`${parentBlockClass}__value`, change === -1 ? `${parentBlockClass}__value--red` : null],
    content: rate,
  });
  item.appendChild(valueElement);
  // }

  return item;
}
