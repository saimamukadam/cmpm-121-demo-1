import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Saima's Awesome Cat Petting Game"; // changed this line
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
