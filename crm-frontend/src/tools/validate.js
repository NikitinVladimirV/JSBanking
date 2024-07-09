export function signinFieldValidate(login) {
  if (/ /.test(login) || login.length < 6) {
    return false;
  } else {
    return true;
  }
}

export function positiveNumber(number) {
  return +number >= 0;
}

export function sum(a, b) {
  return a + b;
}

// const itemElement = createElement();
// const socket = webSocket("currency-feed");
// const array = [];
// socket.addEventListener("message", (e) => {
//   const msg = JSON.parse(e.data);
//   array.push(msg);
//   if (array.length > 3) {
//     array.shift();
//   }
//   console.log(array);
//   array.forEach((item) => {
//     const string = createElement({ classes: [`${parentBlockClass}__string`] });
//     const nameElement = createElement({ tag: "span", classes: [`${parentBlockClass}__name`], content: item.from });
//     string.appendChild(nameElement);
//     const separator = createElement({
//       tag: "span",
//       classes: [`${parentBlockClass}__dots`],
//       content: "........................................................................................",
//     });
//     string.appendChild(separator);
//     const valueElement = createElement({ tag: "span", classes: [`${parentBlockClass}__value`], content: item.rate });
//     string.appendChild(valueElement);
//   });
//   return itemElement;
//   // const item = createElement({ classes: [`${parentBlockClass}__string`], content: msg.from });
//   // liElement.appendChild(item);
// });
