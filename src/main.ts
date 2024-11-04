// game premise: pet cat by pressing button
// emoji to display: cat 🐈, petting hand 🫳, fish cake 🍥, milk, 🍼, yarn 🧶, meat 🥩, basket 🧺

import "./style.css";

// setup

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Saima's Awesome Cat Petting Game 🐈";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const pettingButton = "🫳";
const button = document.createElement("button");
button.innerHTML = pettingButton;
app.append(button);

let petCounts: number = 0;
const counterDisplay = document.createElement("p");
counterDisplay.innerHTML = `${petCounts} pets!`;
app.append(counterDisplay);

let growthRate: number = 0; // initializing growth rate

interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string;
}

const availableItems: Item[] = [
  { name: "fish cake 🍥", cost: 10, rate: 0.1, description: "a yummy treat" },
  { name: "milk 🍼", cost: 100, rate: 2, description: "a tasty drink" },
  { name: "yarn 🧶", cost: 500, rate: 10, description: "so fun to play with" },
  { name: "meat 🥩", cost: 1000, rate: 50, description: "a hearty meal" },
  {
    name: "basket 🧺",
    cost: 5000,
    rate: 250,
    description: "a warm basket to sleep in",
  },
];

const upgradeCounts: { [key: string]: number } = {
  "fish cake 🍥": 0,
  "milk 🍼": 0,
  "yarn 🧶": 0,
  "meat 🥩": 0,
  "basket 🧺": 0,
};

// check upgrade func availability
function checkUpgradeButton() {}
checkUpgradeButton();

// displays
const growthRateDisplay = document.createElement("p");
growthRateDisplay.innerHTML = `Current growth rate: ${growthRate.toFixed(1)} pets/sec`;
app.append(growthRateDisplay);

const upgradeDisplay = document.createElement("p");
upgradeDisplay.innerHTML = `Upgrades: ${JSON.stringify(upgradeCounts)}`;
app.append(upgradeDisplay);

button.addEventListener("click", () => {
  petCounts++;
  counterDisplay.innerHTML = `${petCounts} pets!`;
  checkUpgradeButton(); // check if upgrade button should be enabled
});

let lastTimestamp: number | null = null;

function updateCounter(timestamp: number) {
  if (lastTimestamp == null) {
    lastTimestamp = timestamp;
  }

  const deltaTime = (timestamp - lastTimestamp) / 1000;
  const increment = deltaTime * growthRate; // calculate increment based on elapsed time
  petCounts += increment;
  counterDisplay.innerHTML = `${Math.floor(petCounts)} pets!`;
  lastTimestamp = timestamp;
  requestAnimationFrame(updateCounter); // request the next animation frame
}

requestAnimationFrame(updateCounter);

availableItems.forEach((item) => {
  const upgradeButton = document.createElement("button");
  upgradeButton.innerHTML = `${item.name} ${item.description}<br>(+${item.rate.toFixed(1)} pets/sec) - Cost: ${item.cost.toFixed(2)}`;
  app.append(upgradeButton);

  upgradeButton.addEventListener("click", () => {
    if (petCounts >= item.cost) {
      petCounts -= item.cost; // deduct cost
      item.cost *= 1.15; // increase cost
      growthRate += item.rate; // increase growth rate
      upgradeCounts[item.name]++; // increment upgrade count

      counterDisplay.innerHTML = `${Math.floor(petCounts)} pets!`;
      growthRateDisplay.innerHTML = `Current growth rate: ${growthRate.toFixed(1)} pets/sec`;
      upgradeDisplay.innerHTML = `Upgrades: ${JSON.stringify(upgradeCounts)}`;
      upgradeButton.innerHTML = `${item.name} - ${item.description}<br>(+${item.rate.toFixed(1)} pets/sec) - Cost: ${item.cost.toFixed(2)}`;
    }
  });
});
