// import fetch from "node-fetch";

const images = "https://picsum.photos/v2/list";
let cities = document.querySelector("#cities");
let data_div = document.querySelector("#data");
let data2 = document.querySelector("#data2");
let footer = document.querySelector("footer");
let copyright = document.querySelector(".copyright");

// copyright.innerText = new
// const cities =
//   "http://api.openweathermap.org/geo/1.0/direct?q=Denizli,+90&limit=5&appid=ecaf5818a23ef58a9eb5417f2184737b";
async function getCity(city_name) {
  try {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city_name},+90&limit=1&appid=ecaf5818a23ef58a9eb5417f2184737b`;
    const response = await fetch(url);
    const data = await response.json();
    return getData(data[0].lat, data[0].lon);
  } catch (error) {
    console.error(error);
  }
}
async function getData(lat, lon) {
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=tr&appid=ecaf5818a23ef58a9eb5417f2184737b&units=metric&formatted=0`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
async function getCities() {
  const response = await fetch("cities_of_turkey.json");
  const data = await response.json();
  return data;
}

const data_cities = await getCities();
let str = ``;
data_cities.forEach((element) => {
  let option = document.createElement("option");
  option.value = element.name;
  option.innerText = element.name;
  cities.appendChild(option);
});

cities.addEventListener("change", async (e) => {
  const data_temp = await getCity(e.target.value);
  const img = `http://openweathermap.org/img/wn/${data_temp.weather[0].icon}@2x.png`;
  const sunrise = new Date(data_temp.sys.sunrise * 1000);
  const sunset = new Date(data_temp.sys.sunset * 1000);
  console.table(data_temp);
  data2.innerHTML = `
  <h2>${data_temp.name}</h2><br>
  <img src=${img}></img>
  <h1 class="mt-4">${data_temp.main.temp} C°</h1><br>
  <h5>&#x2022; En Yüksek: ${data_temp.main.temp_min} C°</h5><br>
  <h5>&#x2022; En Düşük: ${data_temp.main.temp_max} C°</h5><br>
  <h5>&#x2022; Hissedilen: ${data_temp.main.feels_like} C°</h5><br>
  `;

  data_div.innerHTML = `
  <div>
  <h3>${data_temp.weather[0].main}</h3>
  <p class="mt-2">&#x2022; ${
    data_temp.weather[0].description[0].toUpperCase() +
    data_temp.weather[0].description.substring(1)
  }</p><hr>
  <h5>&#x2022; Basınç: ${data_temp.main.pressure}.mb</h5>
  <h5>&#x2022; Nem: %${data_temp.main.humidity}</h5>
  </div>
  <hr>
    <div>
    <h3>Rüzgar</h3>
    <h5>&#x2022; Hız: ${data_temp.wind.speed} m/s</h5>  
    <h5>&#x2022; Derece: ${data_temp.wind.deg}°</h5>  
    </div>
    <div>
    <hr class="mt-3">
    <h5>&#x2022; Gün Doğumu: 0${sunrise.getHours()}:${sunrise.getMinutes()}</h5>  
    <h5>&#x2022; Gün Batımı: ${sunset.getHours()}:${sunrise.getMinutes()}</h5>  
    </div>
  `;

  footer.innerHTML = `
      <hr>
      <span>${new Date().toLocaleDateString()}</span>
  `;
  console.log(typeof data_temp.wind);
  // data_div.classList.remove("d-none");
});
{
  /* <span>Boylam: ${data_temp.coord.lon}</span>
    <span>Enlem: ${data_temp.coord.lat}</span> */
}
