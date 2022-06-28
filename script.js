import { createCard, selector } from "./outils.js";

const URL = "https://fakestoreapi.com/products";

const getUserName = prompt("Inserisci il tuo username");

localStorage.setItem("username", getUserName);

const counterEl = selector(".counter");
const salesEl = selector(".sales");
const rateProductsEl = selector(".rate");
const countNavEl = document.getElementById("counterNav");
const countFooterEl = document.getElementById("counterFooter");
const nameNav = document.getElementById("nameNav");
const nameFooter = document.getElementById("nameFooter");

nameNav.append(`${getUserName}, bentornato.`);
nameFooter.append(`${getUserName}, bentornato.`);

fetch(URL)
  .then((res) => res.json())
  .then((data) => {
    data
      .filter((product) => product.rating.count >= 200)
      .map((product) =>
        createCard(
          counterEl,
          product.image,
          product.title,
          product.rating.count
        )
      );
    data
      .filter((product) => product.price < 150)
      .map((product) =>
        createCard(salesEl, product.image, product.title, product.price)
      );

    const list = data
      .filter((product) => product.rating.rate >= 3.2)
      .map((product) =>
        createCard(
          rateProductsEl,
          product.image,
          product.title,
          product.rating.rate
        )
      );
    let counter = list.length;
    countNavEl.innerHTML = counter;
    countFooterEl.innerHTML = counter;
  });
