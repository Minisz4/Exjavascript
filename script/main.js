let overlayDiv = document.getElementById("overlay");
overlayDiv.style.display = "none";

let planets = document.querySelectorAll(".solarsystem");
planets.forEach((planet, index) => {
  planet.addEventListener("click", function () {
    getData(index);
    overlayDiv.style.display = "block";
    // console.log(index);
  });
});

let closeButton = document.getElementById("closeButton");
closeButton.addEventListener("click", function () {
  overlayDiv.style.display = "none";
});

async function getApiKey() {
  let resp = await fetch(
    "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys",
    {
      method: "POST",
    }
  );

  let data = await resp.json();
  console.log(data.key);
}

async function getData(index) {
  let overlayHeading = document.getElementById("overlay__heading");
  let apiKey = "solaris-B2mWxADrthdHqd22";
  //getApiKey();
  let resp = await fetch(
    "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies",
    {
      method: "GET",
      headers: { "x-zocom": apiKey },
    }
  );

  let data = await resp.json();
  overlayHeading.textContent = data.bodies[index].name;
  console.log(data.bodies[index].name);
}

//getData();
