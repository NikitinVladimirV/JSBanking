import { postCreateAccount, postLogin } from "./api";
import { createAutocompleteBlock, createElement } from "./createElement";
import { submit } from "./helper";
import { positiveNumber, signinFieldValidate } from "./validate";

export async function clickSigninBtn(e) {
  e.preventDefault();
  const btnElement = e.target;
  const formData = new FormData(btnElement.parentElement);
  const login = formData.get("login");
  const password = formData.get("password");

  if (!signinFieldValidate(login) || !signinFieldValidate(password)) {
    const errorElement = createElement({ tag: "span", classes: ["form-signin__error", "error"], content: "No space! Min length 6 characters!" });
    btnElement.appendChild(errorElement);

    return;
  }

  const response = await postLogin("login", { login, password });

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

export function clickNavBarBtn(e) {
  const button = e.target;

  window.location.hash = `#/${button.dataset.path}`;
}

export function clickNewAccountBtn() {
  postCreateAccount();
  window.location.reload();
}

export function clickExchangeBtn() {
  console.log("EXCHANGE");
}

export function inputSortSelect(e) {
  window.location.search = `${e.target.name}=${e.target.value}`;
}

export function clickSendMoneyBtn(e) {
  e.preventDefault();
  const formData = new FormData(e.target.parentElement);
  const from = e.target.dataset.path;
  const to = formData.get("number");
  const amount = formData.get("sum");
  if (to !== "" && amount !== "" && positiveNumber(amount)) {
    submit({ from, to, amount });
  }
}

export function inputHandlerAutocomplete(e) {
  console.log("AUTOCOMPLETE HANDLER");
  const value = e.target.value;
  const accounts = JSON.parse(localStorage.getItem("accounts"));
  const label = e.target.parentElement;
  const autocompleteElement = label.querySelector(".autocomplete");

  if (autocompleteElement) autocompleteElement.remove();

  const autocomplete = createAutocompleteBlock({ value, accounts });
  label.appendChild(autocomplete);
}

// Однотипные
export function clickBackBtn(e) {
  window.location.hash = `#/${e.target.dataset.path}`;
}
export function clickOpenAccountBtn(e) {
  window.location.hash = `#/${e.target.dataset.path}`;
}
export function clickAccountElement(e, historyTableData) {
  window.location.hash = `/details?${historyTableData}`;
}
