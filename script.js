const plants = [
  { id: "القمح", waterLitersPerDay: 4.3 },
  { id: "الشعير", waterLitersPerDay: 3.6 },
  { id: "الزيتون", waterLitersPerDay: 7.1 },
  { id: "الطماطم", waterLitersPerDay: 5.7 },
  { id: "الحمضيات", waterLitersPerDay: 8.6 },
  { id: "البطاطس", waterLitersPerDay: 5 },
  { id: "البصل", waterLitersPerDay: 4.3 },
  { id: "الشمندر السكري", waterLitersPerDay: 6.4 },
  { id: "الذرة", waterLitersPerDay: 7.1 },
  { id: "البطيخ", waterLitersPerDay: 6.4 },
]; //this data is for the normal conditions which are Air Temperature	23°C, Air Humidity	55%,Soil Moisture	45%;
function water(event) {
  event.preventDefault();
  const clickedId = event.target.id;
  const plant = plants.find((p) => p.id === clickedId);
  processPlant(plant);
  let buttons = document.querySelector(".buttons");
  buttons.innerHTML = `استنادًا إلى بيانات الحساسات ونوع النبتة (${
    plant.id
  })، تحتاج نبتتك تقريبًا إلى ${Math.round(
    waterNeeded,
  )} لتر/م² اليوم. يمكنك الآن بدء عملية السقي 😊`;
}
let waterNeeded;
let plantButtons = document.querySelectorAll(".plant-button");
plantButtons.forEach((button) => {
  button.addEventListener("click", water);
});
function processPlant(plant) {
  waterNeeded = plant.waterLitersPerDay;
  let soilHumidity = 40;
  let airTemperature = 25;
  let airHumidity = 60;
  if (soilHumidity > 45) {
    let extraHumidity = soilHumidity - 45;
    let soilHumidityPercentage = extraHumidity / 45;
    waterNeeded = waterNeeded - waterNeeded * soilHumidityPercentage;
  } else {
    let neededHumidity = 45 - soilHumidity;
    percentage = neededHumidity / 45;
    waterNeeded = waterNeeded + waterNeeded * percentage;
  }
  if (airTemperature > 23) {
    let extraTemperature = airTemperature - 23;
    let TemperaturePercentage = extraTemperature / 23;
    waterNeeded = waterNeeded + waterNeeded * TemperaturePercentage;
  } else {
    let neededTemperature = 23 - airTemperature;
    TemperaturePercentage = neededTemperature / 23;
    waterNeeded = waterNeeded - waterNeeded * TemperaturePercentage;
  }
  if (airHumidity > 55) {
    let extraAirHumidity = airHumidity - 55;
    let airHumidityPercentage = extraAirHumidity / 55;
    waterNeeded = waterNeeded - waterNeeded * airHumidityPercentage;
  } else {
    let neededAirHumidity = 55 - airHumidity;
    airHumidityPercentage = neededAirHumidity / 55;
    waterNeeded = waterNeeded - waterNeeded * airHumidityPercentage;
  }
}
// circular progress bar
let counter = 0;
const intervalTime = 50;
let intervalID;
let irrigationRunning = false;
let irrigationStarted = false;
let plantSelected = false;

const irrigationButton = document.querySelector("#irrigation-button");
const number = document.querySelector("#number");
const circle = document.querySelector("circle");

// Only one click listener
irrigationButton.addEventListener("click", handleIrrigationAction);

function handleIrrigationAction(event) {
  event.preventDefault();

  if (!plantSelected) {
    alert("المرجو اختيار نوع النبتة أولاً، هذا أمر ضروري.🔔");
    return;
  }

  if (!irrigationStarted) {
    startIrrigation();
  } else if (irrigationStarted && irrigationRunning) {
    stopIrrigation();
  } else if (irrigationStarted && !irrigationRunning) {
    continueIrrigation();
  }
}

function startIrrigation() {
  circle.classList.add("animate");
  irrigationButton.textContent = "أوقف السقي";
  irrigationStarted = true;
  irrigationRunning = true;

  intervalID = setInterval(() => {
    if (counter >= 100) {
      clearInterval(intervalID);
      irrigationButton.textContent = "انتهى السقي";
      irrigationRunning = false;
    } else {
      counter++;
      number.textContent = `${counter}%`;
    }
  }, intervalTime);
}

function stopIrrigation() {
  clearInterval(intervalID);
  circle.style.animationPlayState = "paused";

  irrigationRunning = false;
  irrigationButton.textContent = "تابع السقي";
}

function continueIrrigation() {
  circle.style.animationPlayState = "running";

  irrigationRunning = true;
  irrigationButton.textContent = "أوقف السقي";

  intervalID = setInterval(() => {
    if (counter >= 100) {
      clearInterval(intervalID);
      alert("لقد انتهت عملية السقي اليوم ، الى الغد 👋");
      irrigationButton.textContent = "انتهى السقي";
      irrigationRunning = false;
    } else {
      counter++;
      number.textContent = `${counter}%`;
    }
  }, intervalTime);
}
plantButtons.forEach((button) => {
  button.addEventListener("click", () => {
    plantSelected = true;
  });
});
