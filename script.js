const WHATSAPP_NUMBER = "5519982266218";

const heroOrdersInput = document.querySelector("#hero-orders");
const heroTicketInput = document.querySelector("#hero-ticket");
const heroFeeInput = document.querySelector("#hero-fee");
const heroResult = document.querySelector("#hero-result");

const ordersInput = document.querySelector("#orders");
const ticketInput = document.querySelector("#ticket");
const feeInput = document.querySelector("#fee");
const result = document.querySelector("#result");

const moneyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

const compactMoneyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0
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

function calculateLoss(ordersValue, ticketValue, feeValue) {
  const orders = toNumber(ordersValue);
  const ticket = toNumber(ticketValue);
  const fee = toNumber(feeValue);

  return orders * ticket * (fee / 100);
}

function getMonthlyLoss() {
  return calculateLoss(ordersInput.value, ticketInput.value, feeInput.value);
}

function updateHeroCalculator() {
  const monthlyLoss = calculateLoss(heroOrdersInput.value, heroTicketInput.value, heroFeeInput.value);
  heroResult.textContent = compactMoneyFormatter.format(monthlyLoss);
}

function updateCalculator() {
  result.textContent = moneyFormatter.format(getMonthlyLoss());
}

function getCalculatorMessage() {
  const formattedLoss = moneyFormatter.format(getMonthlyLoss());

  return `Olá, fiz a simulação e vi que posso estar perdendo cerca de ${formattedLoss} por mês em taxas. Quero entender como vender direto e reduzir essa dependência dos apps.`;
}

function getHeroCalculatorMessage() {
  const monthlyLoss = calculateLoss(heroOrdersInput.value, heroTicketInput.value, heroFeeInput.value);
  const formattedLoss = compactMoneyFormatter.format(monthlyLoss);

  return `Olá, fiz a simulação e vi que posso estar perdendo cerca de ${formattedLoss} por mês em taxas. Quero entender como recuperar essa margem com um sistema próprio.`;
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

    if (action === "hero-calculator-whatsapp") {
      openWhatsApp(getHeroCalculatorMessage());
      return;
    }

    if (action === "whatsapp") {
      openWhatsApp(button.dataset.message);
    }
  });
});

[heroOrdersInput, heroTicketInput, heroFeeInput].forEach((input) => {
  input.addEventListener("input", updateHeroCalculator);
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
updateHeroCalculator();
