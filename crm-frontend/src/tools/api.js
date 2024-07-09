export async function postLogin(url, data) {
  const response = await fetch(`http://localhost:3000/${url}`, {
    method: "POST",
    body: JSON.stringify({
      login: data.login,
      password: data.password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
}

export async function postCreateAccount(url = "create-account") {
  const response = await fetch(`http://localhost:3000/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("token")}`,
    },
  });

  return await response.json();
}

export async function postTransfer(url = "", data) {
  const response = await fetch(`http://localhost:3000/${url}`, {
    method: "POST",
    body: JSON.stringify({
      from: data.from,
      to: data.to,
      amount: data.amount,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("token")}`,
    },
  });

  return await response.json();
}

export async function getData(url = "") {
  const response = await fetch(`http://localhost:3000/${url}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${localStorage.getItem("token")}`,
    },
  });

  return await response.json();
}

export function webSocket2(url = "") {
  return new WebSocket(`ws://localhost:3000/${url}`);
  // const socket = new WebSocket(`ws://localhost:3000/${url}`);

  // const array = [];

  // socket.addEventListener("message", (e) => {
  //   const msg = e.data;
  //   console.log(msg);
  //   array.push(JSON.parse(msg));
  // });

  // console.log(array);
}

// ## Методы API
// ### POST /login --- вход
// ### POST /create-account --- создание нового счета
// ### POST /transfer-funds --- перевод средств
// ### POST /currency-buy --- обмен валюты

// ### GET /accounts --- получить список счетов пользователя ### //
// ### GET /account/{id} --- получить инфу по счету ### //

// ### GET /all-currencies --- получить список валют
// ### GET /currencies --- получить список счетов пользователя
// ### GET /banks --- получить список банкоматов
