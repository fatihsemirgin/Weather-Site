// import fetch from "node-fetch";

const images = "https://picsum.photos/v2/list";
let cities = document.querySelector("#cities");
let data_div = document.querySelector("#data");
let data2 = document.querySelector("#data2");
let footer = document.querySelector("footer");
let search_data = document.querySelector("#data_list");
let search_data_div = document.querySelector("#search_data");
let search = document.querySelector("#search");
let default_option = document.querySelector("#default");
let first_hour = document.querySelector("#first_hour");
let daily = document.querySelector("#daily");
async function deneme(city_name = "") {
  try {
    const url = `http://api.weatherapi.com/v1/current.json?key=bf5c637060c54f2cbd7155536232402&q=Denizli&aqi=yes

    `;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
// deneme();
async function getCity(city_name) {
  // For latitude and longitude (optional)
  try {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city_name},+90&limit=1&appid=ecaf5818a23ef58a9eb5417f2184737b`;
    const response = await fetch(url);
    const data = await response.json();
    return getData(data[0].lat, data[0].lon);
  } catch (error) {
    console.error(error);
  }
}
async function getData(city_name = "") {
  try {
    // const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=tr&appid=ecaf5818a23ef58a9eb5417f2184737b&units=metric&formatted=0`;
    const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=bf5c637060c54f2cbd7155536232402&q=${city_name}&days=10&aqi=no&alerts=no&lang=tr
    `;
    const response = await fetch(apiUrl);
    const data = await response.json();
    // console.log(data);
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
data_cities.forEach((element) => {
  let option = document.createElement("option");
  option.value = element.name;
  option.innerText = element.name;
  cities.appendChild(option);
});
search.addEventListener("input", (e) => {
  search_data.innerHTML = ``;
  if (e.target.value == "") {
    search_data_div.classList.add("d-none");
    search_data.innerHTML = ``;
  } else {
    data_cities.forEach((element) => {
      if (
        element.name
          .toLocaleLowerCase()
          .includes(e.target.value.toLocaleLowerCase())
      ) {
        search_data_div.classList.remove("d-none");
        console.log(e.target.value);
        let new_element = document.createElement("li");
        new_element.id = element.name;
        console.log(new_element.value);
        new_element.addEventListener("click", get_all);
        new_element.innerHTML = element.name;
        search_data.appendChild(new_element);
      }
    });
  }
});
let temp_element = null;
document.body.addEventListener(
  "click",
  (e) => {
    temp_element = e.target;
    if (temp_element.id != "search_data") {
      search_data_div.classList.add("d-none");
      search_data.innerHTML = ``;
    }
  },
  true
);

let get_all = async (e) => {
  search_data.innerHTML = ``;
  search.value = "";
  let data_temp = null;
  if (e.target.value != 0) {
    data_temp = await getData(e.target.value);
  } else {
    console.log("eles");
    data_temp = await getData(e.target.id);
  }
  console.log(data_temp);
  const img = `${data_temp.current.condition.icon}`;
  const sunrise = data_temp.forecast.forecastday[0].astro.sunrise;
  const sunset = data_temp.forecast.forecastday[0].astro.sunset;
  console.log(typeof sunrise);
  data2.innerHTML = `
  <h2>${data_temp.location.name}</h2><br>
  <img id="first_img" width=100 height=100 src=${img}></img>
  <h1 class="mt-4">${data_temp.current.temp_c} C°</h1><br>
  <h5>&#x2022; En Yüksek:  0C°</h5><br>
  <h5>&#x2022; En Düşük: 0C°</h5><br>
  <h5>&#x2022; Hissedilen: ${data_temp.current.feelslike_c} C°</h5><br>
  `;

  data_div.innerHTML = `
  <div  class="">
  <h3>${data_temp.current.condition.text}</h3>
  <hr>
  <h5>&#x2022; Basınç: ${data_temp.current.pressure_mb}.mb</h5>
  <h5>&#x2022; Nem: %${data_temp.current.humidity}</h5>
  </div>
  <hr>
    <div class="">
    <h3><svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-wind" viewBox="0 0 16 16">
    <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5zm-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2zM0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5z"/>
  </svg>  Rüzgar</h3>
   
    <h5>&#x2022; Hız: ${data_temp.current.wind_kph} m/s</h5>  
    <h5>&#x2022; Derece: ${data_temp.current.wind_degree}°</h5>  
    </div>
<hr>
    <div class="d-flex justify-content-around">
    <div id="sunrise"><svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-sunrise-fill" viewBox="0 0 16 16">
    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l1.5 1.5a.5.5 0 0 1-.708.708L8.5 2.707V4.5a.5.5 0 0 1-1 0V2.707l-.646.647a.5.5 0 1 1-.708-.708l1.5-1.5zM2.343 4.343a.5.5 0 0 1 .707 0l1.414 1.414a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707zm11.314 0a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zM11.709 11.5a4 4 0 1 0-7.418 0H.5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10zm13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
  </svg>
  <h5>&#x2022; Gün Doğumu: 0${sunrise}</h5></div>
    <div>
    <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-sunset" viewBox="0 0 16 16">
    <path d="M7.646 4.854a.5.5 0 0 0 .708 0l1.5-1.5a.5.5 0 0 0-.708-.708l-.646.647V1.5a.5.5 0 0 0-1 0v1.793l-.646-.647a.5.5 0 1 0-.708.708l1.5 1.5zm-5.303-.51a.5.5 0 0 1 .707 0l1.414 1.413a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707zm11.314 0a.5.5 0 0 1 0 .706l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zM8 7a3 3 0 0 1 2.599 4.5H5.4A3 3 0 0 1 8 7zm3.71 4.5a4 4 0 1 0-7.418 0H.499a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10zm13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
  </svg>
    <h5>&#x2022; Gün Batımı: ${sunset}</h5>
    </div>  
    </div>
  `;
  const hours = data_temp.forecast.forecastday[0].hour;
  first_hour.innerHTML = ``;
  hours.forEach((element) => {
    let new_div = document.createElement("div");
    new_div.style.border = "1px solid"
    new_div.style.borderRadius = "0.25rem"
    new_div.classList.add("me-2");
    new_div.innerHTML = `
    <img src=${element.condition.icon}></img>
  <h1 class="mt-4">${element.temp_c} C°</h1><br>
  <h5>Hissedilen:</h5>
  <h5>${element.feelslike_c} C°</h5><br>
  <h5>${element.time.split(" ")[1]}</h5></div>
    `;
    first_hour.appendChild(new_div);
  });

  const daily_data = data_temp.forecast.forecastday;
  daily.innerHTML = ``;
  daily_data.forEach((element) => {
    let new_div = document.createElement("div");
    new_div.classList.add("me-2");
    new_div.style.border = "1px solid"
    new_div.style.borderRadius = "0.25rem"
    new_div.innerHTML = `
    <img src=${element.day.condition.icon}></img>
  <h1 class="mt-4">${element.day.avgtemp_c} C°</h1><br>
  <h5>En Yüksek:</h5><br>
  <h5>${element.day.maxtemp_c} C°</h5><br>
  <h5>En Düşük:</h5>
  <h5>${element.day.mintemp_c} C°</h5><br>
  <h5>${element.day.condition.text}</h5><br>
  <h5> ${element.date}</h5>
    `;
    daily.appendChild(new_div);
  });
  footer.innerHTML = `
      <hr>
      <span>${new Date().toLocaleDateString()}</span>
  `;
  if (e.target.value == 0) default_option.selected = "selected";
};

cities.addEventListener("change", get_all);
