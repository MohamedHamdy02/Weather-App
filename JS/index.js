
mobileContainer = document.getElementById('mobileContainer');

active = document.querySelector('.active');

mobileMenu = document.getElementById('mobileMenu');

mobileMenu.addEventListener('click' , function () {
    mobileContainer.classList.toggle('active');
});

//------------MENU TOGGLE----------//

let currentCity = "alexandria";

let searchBar = document.getElementById("searchLocation");

searchBar.addEventListener("keyup", function () {
    currentCity = searchBar.value;
    GetInfoCity();
});

// button (SEARCH-LOCATION)

let findLocation = document.getElementById("findLocation");

findLocation.addEventListener('click' , function () {
    currentCity = searchBar.value;
    GetInfoCity();
});

// button (FIND-LOCATION)


// on load
GetInfoCity();

(date = new Date()) ,
        weekDays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",],
        monthName = [
        "Jan",
        "Feb",
        "March",
        "April",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
    ];

async function GetInfoCity() {
    let response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${currentCity}&days=3`
    );
    data = await response.json();
    displayDay1Weather();
    displayDay2Weather();
    displayDay3Weather();
};
function displayDay1Weather() {
    let DateOfDay = data.forecast.forecastday[0].date;

    let date_components = DateOfDay.split("-");

    let current_day = date_components[2];

    let nameOfCity = data.location.name;

    let degreeOfTempraure = Math.round(data.current.temp_c);

    let currentCondition = data.current.condition.text;

    let todayConditionIcon = data.current.condition.icon;

    let humidty = data.current.humidity;

    let wind = data.current.wind_kph;

    let compass = data.current.wind_dir;

    document.getElementById("day1").innerHTML = weekDays[date.getDay()];

    document.getElementById("date1").innerText = `${current_day} ${monthName[date.getMonth(DateOfDay)]
        }`;

    document.getElementById("cityName").innerHTML = nameOfCity;

    document.getElementById("day1Max").innerHTML = `${degreeOfTempraure}<sup>o</sup>C`;

    document.getElementById("day1Icon").setAttribute("src" , `${todayConditionIcon}`);

    document.getElementById("weatherStatusDay1").innerHTML = currentCondition;

    document.getElementById("rainPrecentage").innerHTML = humidty;

    document.getElementById("windSpeed").innerHTML = wind;

    document.getElementById("windDirection").innerHTML = compass;
};

function displayDay2Weather() {
    let nextDayDate = data.forecast.forecastday[1].date;

    let nextDayIcon = data.forecast.forecastday[1].day.condition.icon;

    let nextDayMaxDegree = Math.round(data.forecast.forecastday[1].day.maxtemp_c);

    let nextDayMinDegree = Math.round(data.forecast.forecastday[1].day.mintemp_c);

    let nextDayDescription = data.forecast.forecastday[1].day.condition.text;

    document.getElementById("day2").innerHTML = getNextDays(nextDayDate);

    document.getElementById("day2Icon").setAttribute("src" , `${nextDayIcon}`);

    document.getElementById("day2Max").innerHTML = `${nextDayMaxDegree}<sup>o</sup>C`;

    document.getElementById("day2Min").innerHTML = `${nextDayMinDegree}<sup>o</sup>`;

    document.getElementById("weatherStatusDay2").innerHTML = nextDayDescription;
};

function displayDay3Weather() {
    let afternextDayDate = data.forecast.forecastday[2].date;

    let afterNextDayIcon = data.forecast.forecastday[2].day.condition.icon;

    let AfterNExtDayhigheTemp = Math.round(data.forecast.forecastday[2].day.maxtemp_c);

    let AfterNExtDayloweTemp = Math.round(data.forecast.forecastday[2].day.mintemp_c);

    let afterNextDayDescription = data.forecast.forecastday[2].day.condition.text;

    document.getElementById("day3").innerHTML = getNextDays(afternextDayDate);

    document.getElementById("iconDay3").setAttribute("src" , `${afterNextDayIcon}`);
    
    document.getElementById("day3Max").innerHTML = `${AfterNExtDayhigheTemp}<sup>o</sup>C`;

    document.getElementById("day3Min").innerHTML = `${AfterNExtDayloweTemp}<sup>o</sup>`;
    
    document.getElementById("day3WeatherStatus").innerHTML =
    afterNextDayDescription;
};

//Next Day - Name Function;
function getNextDays(nextDateApi) {
    let d = new Date(nextDateApi);
    return d && weekDays[d.getDay()];
};

//Next Day - Month Function;
function getNextDayMonth(nextDateApi) {
    let m = new Date(nextDateApi);
    return m && monthName[m.getMonth()];
};