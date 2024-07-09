import { postLogin, postTransfer } from "./api";

export function dateToMonth(date) {
  return new Date(date)
    .toLocaleString("default", {
      month: "long",
    })
    .slice(0, 3);
}

export function responseToTwelveLatestMonth(response) {
  let date = "";
  let amount = 0;
  let step = 0;
  const newArray = [];

  for (let i = 0; i < response.length; i++) {
    step++;
    amount += response[i].amount;

    if (dateToMonth(response[i].date) !== date) {
      date = dateToMonth(response[i].date);
      newArray.push({
        date,
        amount: Math.floor(amount / step),
      });

      amount = 0;
      step = 0;
    }
  }

  return newArray.slice(-12);
}

export function sortAccounts(data, flag = "account", asc = true) {
  data.sort((a, b) => {
    const first = a.transactions[0] ? new Date(a.transactions[0].date) : new Date();
    const second = b.transactions[0] ? new Date(b.transactions[0].date) : new Date();

    if (asc) {
      switch (flag) {
        case "transaction":
          return +first - +second;
        case "balance":
          return a.balance - b.balance;
        default:
          return a.account - b.account;
      }
    } else {
      switch (flag) {
        case "transaction":
          return +second - +first;
        case "balance":
          return b.balance - a.balance;
        default:
          return b.account - a.account;
      }
    }
  });

  return data;
}

export function sortAccountsByDate(array) {
  return array.sort((a, b) => {
    const first = new Date(a.date);
    const second = new Date(b.date);

    return +second - +first;
  });
}

export async function signIn(data) {
  const response = await postLogin("login", data);

  if (response.payload) {
    localStorage.setItem("token", response.payload.token);

    window.location.hash = "#/accounts";
  } else {
    const form = document.querySelector(".signin__form");
    const error = this.getErrorLabel(response.error);
    error.style.display = "block";
    form.appendChild(error);
  }
}

export async function submit(data) {
  const response = await postTransfer("transfer-funds", data);
  if (response.error) {
    window.location.hash = "error";
    return;
  }

  const accounts = JSON.parse(localStorage.accounts || JSON.stringify([]));
  const targetAccount = data.to;

  if (!accounts.includes(targetAccount)) addAccountToStorage(targetAccount, accounts);

  window.location.reload();
}

export function addAccountToStorage(data, accounts) {
  accounts.push(data);
  localStorage.setItem("accounts", JSON.stringify(accounts));
}

export function returnElementFromClassName(data, className) {
  return new className(data).element;
}

export function arrayClassesToString(classes = []) {
  return classes.join(" ");
}

export function objectToArray(keysArray = [], object = {}) {
  const array = [];

  keysArray.forEach((key) => {
    array.push(object[key]);
  });

  return array;
}

export function sortData() {}
