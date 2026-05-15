const WHATSAPP_NUMBER = "5519982266218";

const ordersInput = document.querySelector("#orders");
const ticketInput = document.querySelector("#ticket");
const feeInput = document.querySelector("#fee");
const result = document.querySelector("#result");

const moneyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

function openWhatsApp(message) {
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, "_blank");
}

function scrollToCalculator() {
  document.querySelector("#calculator").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function toNumber(value) {
  return Number(String(value).replace(",", ".")) || 0;
}

function getMonthlyLoss() {
  const orders = toNumber(ordersInput.value);
  const ticket = toNumber(ticketInput.value);
  const fee = toNumber(feeInput.value);

  return orders * ticket * (fee / 100);
}

function updateCalculator() {
  result.textContent = moneyFormatter.format(getMonthlyLoss());
}

function getCalculatorMessage() {
  const formattedLoss = moneyFormatter.format(getMonthlyLoss());

  return `Olá, fiz a simulação e vi que posso estar perdendo cerca de ${formattedLoss} por mês em taxas. Quero entender como reduzir isso com um sistema próprio.`;
}

document.querySelectorAll("[data-action]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();

    const action = button.dataset.action;

    if (action === "scroll-calculator") {
      scrollToCalculator();
      return;
    }

    if (action === "calculator-whatsapp") {
      openWhatsApp(getCalculatorMessage());
      return;
    }

    if (action === "whatsapp") {
      openWhatsApp(button.dataset.message);
    }
  });
});

[ordersInput, ticketInput, feeInput].forEach((input) => {
  input.addEventListener("input", updateCalculator);
});

document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    item.classList.toggle("is-open");
  });
});

updateCalculator();
