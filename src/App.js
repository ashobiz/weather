import React, {useState, useEffect} from "react";

function App() {

  const [Weather, setWeather] = useState('');
  const [Search, setSearch] = useState('');
  const [DateTime, setDateTime] = useState('');

  // Date & Time
  var dateTime = {
    months : ['Jan','Feb','Mar','Apr','May','Jun','July','Aug','Sep','Oct','Nov','Dec'],
    days : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
    newDate : null,
    // Get date function
    setDate : function(){
      this.newDate = new Date();
      let year = this.newDate.getFullYear();
      let month = this.newDate.getMonth();
      let day = this.newDate.getDay();
      let date = this.newDate.getDate();
      return `${this.days[day]} ${date} ${this.months[month]}, ${year}`
    }
  }

  // Submit
  const handleSubmit = (e) => {
    if(e.key==="Enter"){
      let url = process.env.REACT_APP_PATH;
      let api = process.env.REACT_APP_WEATHER_API;
      // Fetch
      fetch(`${url}/weather?q=${Search}&units=imperial&appid=${api}`)
        .then(res => res.json())
        .then(res => setWeather(res))
    }
  }

  // Handle search
  function handleSearch(e){
    setSearch(e.target.value);
  }

  // Call datetime function

  useEffect(()=>{
    setDateTime(dateTime.setDate());
  },[])


  return (
    <div className="app">
      <div className="container">
        <div className="search">
          <input 
            type="text"
            onChange={(e)=>handleSearch(e)}
            value={Search}
            placeholder="Type a city and hit Enter..."
            onKeyDown={handleSubmit}
          />
          {
            Weather.main? (
              <div>
                <h1>Weather in <span>{Weather.name}, {Weather.sys.country}</span></h1>
                <h2>{DateTime}</h2>
                <div className="weather">{Weather.main.temp} <sup>°</sup><b>F</b></div>
                <div className="feel">{Weather.weather[0].description}</div>
                <div className="others">Humidity - {Weather.main.humidity}% &nbsp; Wind - {Weather.wind.speed} mph</div>
              </div>
            ) : (
              <div>
                <p class="error">Please check your input...</p>
              </div>
            )
          }
          
        </div>
      </div>
    </div>
  );
}

export default App;
