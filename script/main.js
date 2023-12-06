let overlayDiv = document.getElementById("overlay");
//overlayDiv.style.display = "none";
overlayDiv.classList.add("hidden");
const colors = [
  "yellow",
  "lightgray",
  "lightblue",
  "orange",
  "orange",
  "beige",
  "lightblue",
  "lightblue",
  "blue",
  "blue",
];
const colorsRGB = [
  "255, 201, 14",
  "255, 0, 0",
  "0, 255, 0",
  "0, 0, 255",
  "255, 255, 255",
  "0, 0, 0",
  "128, 0, 128",
  "255, 165, 0",
  "0, 128, 0",
  "128, 128, 128",
];

createStars();

function createStars() {
  let overlay = document.getElementById("overlay");

  for (let i = 0; i < 5; i++) {
    let starDiv = document.createElement("div");
    starDiv.classList.add("planet__star");

    starDiv.style.position = "fixed";
    starDiv.style.top = 200 + "px";
    starDiv.style.left = 125 * i + "px";
    overlay.appendChild(starDiv);
  }
}

let planets = document.querySelectorAll(".solarsystem");
planets.forEach((planet, index) => {
  planet.addEventListener("click", function () {
    getApiKey(index);
    let planetLarge = document.getElementById("planet__large");
    planetLarge.style.backgroundColor = colors[index];
    planetLarge.style.boxShadow =
      "0 0 40px 40px rgba(" + colorsRGB[index] + ", 0.5)";
    console.log(colors[0]);

    overlayDiv.classList.remove("hidden");
  });
});

let closeButton = document.getElementById("closeButton");
closeButton.addEventListener("click", function () {
  overlayDiv.classList.add("hidden");
});

async function getApiKey(index) {
  let resp = await fetch(
    "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys",
    {
      method: "POST",
    }
  );

  let data = await resp.json();
  console.log(data.key);
  getData(index, data.key);
}

async function getData(index, apiKey) {
  let resp = await fetch(
    "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies",
    {
      method: "GET",
      headers: { "x-zocom": apiKey },
    }
  );

  let data = await resp.json();

  printApiData(index, data);
}

function printApiData(index, data) {
  console.log(data.bodies[index]);
  let overlayHeading = document.getElementById("overlay__heading");
  overlayHeading.textContent = data.bodies[index].name;

  let overlayHeadingLatinName = document.getElementById("overlay__latinName");
  overlayHeadingLatinName.textContent = data.bodies[index].latinName;

  let planetDesc = document.getElementById("desc__info");
  planetDesc.textContent = data.bodies[index].desc;

  let overlayCircumferenceInfo = document.getElementById("info__Circumference");
  overlayCircumferenceInfo.textContent =
    data.bodies[index].circumference + " km";

  let distanceFromSun = document.getElementById("distance__info");
  distanceFromSun.textContent = data.bodies[index].distance + " km";

  let maxTemperatur = document.getElementById("info__MaxTemperatur");
  maxTemperatur.textContent = data.bodies[index].temp.day + " C";

  let minTemperatur = document.getElementById("info__MinTemperatur");
  minTemperatur.textContent = data.bodies[index].temp.night + " C";

  let moonInfo = document.getElementById("info__Moon");
  moonInfo.textContent = "";

  let moons = data.bodies[index].moons;
  moons = [...new Set(moons)];
  moons = moons.sort();

  moons.forEach((moon) => {
    let paragraph = document.createElement("p");
    paragraph.textContent = moon;
    moonInfo.appendChild(paragraph);
  });

  let moonInfoHeading = document.getElementById("info__moon__heading");
  moonInfoHeading.innerHTML = "";
  moonInfoHeading.innerHTML = "MÅNAR (" + moons.length + ")";
  //moonInfo.textContent = data.bodies[index].moons.length;
  /** 
  /** 
      h3 -- latinName
    desc
    omkrets
    km från solen
    max temp 
    min temp
    månar
    */
}

//getData();
