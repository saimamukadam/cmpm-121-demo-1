import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Saima's Awesome Cat Petting Game 🐈"; // changed this line
document.title = gameName;

const header = document.createElement("h1"); // put "button"
header.innerHTML = gameName;
app.append(header);

// MY CODE HERE

// game premise: pet cat by pressing button
// emoji to display: petting hand 🫳, cat 🐈, fish cake 🍥, yarn 🧶

// Step 1: A button you can click
const pettingButton = "🫳";
const button = document.createElement("button"); // put "button"
button.innerHTML = pettingButton;
app.append(button);

// Step 2: Clicking increases a counter
// div element: "# pets!"
let counter: number = 0; // initializing counter w/ type annotation
const counterDisplay = document.createElement("p"); // create paragraph to display count
counterDisplay.innerHTML = `${counter} pets!`;
app.append(counterDisplay);

// ADDITION FOR STEP 5
let growthRate: number = 0; // initializing growth rate

button.addEventListener("click", () => {
  counter++; // incrementing counter each time u click
  counterDisplay.innerHTML = `${counter} pets!`; // update the display
  // ADDITION FOR STEP 5
  checkUpgradeButton(); // check if upgrade button should be enabled
});

// Step 3: Automatic Clicking
// implement using setInterval global function
// set interval 1 click per 1 second
/*
setInterval(() => {
  counter++; // incrementing counter
  counterDisplay.innerHTML = `${counter} pets!`; // updating display
}, 1000); // 1000 milliseconds = 1 second
*/

// Step 4: Continuous Growth
// use requestAnimationFrame & remove setTimeout implementation
// get current time of program
// every 1000 ms, counter ++
// need to use requestAnimationFrame(step) to get current time of program
// if(timestamp - lastUpdatedTime == 1000) {increment} // if the diff btwn current time is 1000ms
let lastTimestamp: number | null = null;
const incrementPerSecond = growthRate; // total increment wanted per sec // changed 1 to growthRate

function updateCounter(timestamp: number) {
  if (lastTimestamp == null) {
    lastTimestamp = timestamp;
  }

  const deltaTime = (timestamp - lastTimestamp) / 1000; // time in seconds
  const increment = deltaTime * incrementPerSecond; // calculate increment based on elapsed time

  counter += increment; // increase counter by calculated increment
  counterDisplay.innerHTML = `${Math.floor(counter)} pets!`; // update display
  lastTimestamp = timestamp; // update lastTimestamp for the next frame
  requestAnimationFrame(updateCounter); // request the next animation frame
}

// start the animation loop
requestAnimationFrame(updateCounter);

// Step 5: Purchasing an Upgrade
// upgrade button setup
const upgradeButton = document.createElement("button");
upgradeButton.innerHTML = `Purchase Upgrade treat 🍥 - Cost: 10 pets`;
upgradeButton.disabled = true; // start disabled
app.append(upgradeButton);

// check if the upgrade button should be enabled
function checkUpgradeButton() {
  upgradeButton.disabled = counter < 10; // enable if counter is at least 10
}

// purchase upgrade functionality
upgradeButton.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10; // deduct cost
    growthRate++; // increase growth rate
    counterDisplay.innerHTML = `${Math.floor(counter)} pets`; // update display
    checkUpgradeButton(); // check if the button should be re-enabled
  }
});

// call check function initially to set button state correctly
checkUpgradeButton();
