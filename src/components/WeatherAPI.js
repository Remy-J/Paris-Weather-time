import React from "react";
import Form from "./Form";
import WeatherDiv from "./WeatherDiv";
import "./Form.css"
import "./WeatherAPi.css"
import Slider from "react-slick"
import ActivityCards from "./ActivityCards"
import Activity from "./Activity.json"
import { Link } from 'react-router-dom'

class WeatherAPI extends React.Component {
  state = {
    city: '',
    lat: '',
    loading: true,
    lon: '',
    weatherData: []
  }

  getWeather = (e) => {
    if (this.state.loading) {
      fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${this.state.lat}&lon=${this.state.lon}&lang=fr&units=metric&appid=e8fc88dd5f1edd7f7ff6a9a5be06bd83`)
        .then(res => res.json())
        //permet de remplir le tableau weatherData dans le state et de desactiver loading - voir le if/else au début du render
        .then(res => this.setState({ weatherData: res, loading: false, city: res.city.name }))
    } else {
      // s'active quand le bouton de Form.js est activé, celui-ci appelant la fonction getWeather et le loading étant false après le premier chargement de la page
      e.preventDefault();
      const city = e.target.city.value;
      fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=fr&units=metric&appid=e8fc88dd5f1edd7f7ff6a9a5be06bd83`)
        .then(res => res.json())
        .then(res => this.setState({ weatherData: res, city: res.city.name }))
    }
  }
  //fonction qui permet d'obtenir la localisation
  getLocation = () => {
    //si l'utilisateur accepte d'être géolocalisé
    if (navigator.geolocation) {
      //getCurrentPosition permet de retourner un objet position qui donne notamment les coordonnées
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({ lon: position.coords.longitude, lat: position.coords.latitude })
        //Attention cette ligne est importante, elle permet de s'assurer que getWeather ne s'active que après avoir obtenu la geolocalisation
        this.getWeather()
      })
    } else {
      //alerte qui s'active si l'utilisateur n'accepte pas d'être géolocalisé

    }
  }

  componentDidMount() {
    this.getLocation()
  }

  render() {

    const param = {
      dots: true,
      infinite: true,
      speed: 1500,
      slidesToShow: 3,
      slidesToScroll: 3,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: false,
      
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 0,
            infinite: true
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,

            infinite: true,
            repeat: 99

          }
        }
      ]
    }

    const settings = {
      dots: false,
      infinite: false,
      speed: 800,
      slidesToShow: 1,
      slidesToScroll: 1


    };
    //le if/else, permet de s'assurer que le render ne s'active que quand l'API a bien chargé ses données dans le state et donc transformé loading en false
    if (this.state.loading) {
      return (<div>loading</div>)
    } else if (this.state.weatherData.list[0].weather[0].main === "Rain") {

      return (

        <div>
          <div>
            <Form getWeather={this.getWeather} city={this.state.city} />
          </div>

          <div>
            <Slider {...settings} >
              {/*le filter map permet de ne sélectionner que une prévision par jour dans le tableau d'objets list contenu dans l'objet weatherData. Autrement list contient des prévisions toutes les trois heures. */}
              {this.state.weatherData.list
                .filter(data => data.dt_txt.includes("12:00:00"))
                .map((data, index) => (

                  <WeatherDiv {...data} city={this.state.city} index={index} key={index} />

                ))}
            </Slider>
          </div>

          <Slider className="sliderActivity"{...param}>
            {Activity.filter(data => data.type.toString().includes("indoor"))
              .map((data) => {
                let url = `/activity/${data.id}`
                return (
                  <div key={data.id}>

                    <Link to={url}> <ActivityCards {...data} /></Link>
                  </div>
                )
              })}
          </Slider>
        </div>
      )
    } else {
      return (
        <div>
          <div>
            <Form getWeather={this.getWeather} city={this.state.city} />
          </div>

          <div>
            <Slider {...settings} >
              {/*le filter map permet de ne sélectionner que une prévision par jour dans le tableau d'objets list contenu dans l'objet weatherData. Autrement list contient des prévisions toutes les trois heures. */}
              {this.state.weatherData.list
                .filter(data => data.dt_txt.includes("12:00:00"))
                .map((data, index) => (

                  <WeatherDiv {...data} city={this.state.city} index={index} key={index} />

                ))}
            </Slider>
          </div>
          <Slider className="sliderActivity"{...param}>
            {Activity.map((data) => {
              let url = `/activity/${data.id}`
              return (
                <div key={data.id}>
                  <Link to={url}>
                    <ActivityCards {...data} />
                  </Link>
                </div>
              )
            })}
          </Slider>
        </div>
      )
    }
  }
}

export default WeatherAPI
