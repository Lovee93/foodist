import React, { useState, useEffect } from 'react';
import './App.css';
import Particles from 'react-particles-js';

function App() {
  const [count, incrementCount] = useState(0)
  const [foodName, getFoodName] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [foodImage, getFoodImage] = useState('')
  const [foodVideo, getFoodVideo] = useState('')
  const [foodCategory, getFoodCategory] = useState('')
  const [cuisine, getCuisine] = useState('')
  const [tags, getTags] = useState('')
  const [instructions, getInstructions] = useState('')

  const feedMe = () => {
    incrementCount(count + 1)

    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then(res => res.json())
      .then(res => {
        const meal = res.meals[0]
        getFoodName(meal.strMeal)
        getIngredients(meal)
        getFoodImage(meal.strMealThumb)
        getFoodCategory(meal.strCategory)
        getCuisine(meal.strArea)
        getTags(meal.strTags)
        getInstructions(meal.strInstructions)
        getFoodVideo(meal.strYoutube.slice(-11))
      })
  }

  const getIngredients = meal => {
    for(let i=1; i<=20; i++) {
      if(meal[`strIngredient${i}`]) {
        setIngredients(oldArray => [...oldArray, {
          id: `Ingredient${i}`,
          value: `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
        }])
      }
      else {
        break;
      }
    }
  }

  const particlesParams = {
    particles: {
    number: {
      value: 5,
      density: {
        enable: true,
        value_area: 1000
      }
    },
    color: {
      value: "#ff4b44"
    },
    shape: {
      type: "circle",
      polygon: {
        nb_sides: 6
      },
    },
    opacity: {
      value: 0.15,
      random: true,
    },
    size: {
      value: 160,
      random: true,
      anim: {
        enable: true,
        speed: 5,
        size_min: 40,
        size_max: 140,
        sync: false
      }
    },
    move: {
      enable: true,
      speed: 4,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false
    }
  },
  interactivity: {
    detect_on: "canvas",
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1
        }
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 5,
        speed: 3
      },
      repulse: {
        distance: 200,
        duration: 0.4
      },
      push: {
        particles_nb: 4
      },
      remove: {
        particles_nb: 2
      }
    }
  },
  retina_detect: true
  }
  
  
  const uberEats = () => console.log("Uber Eats")

  return (
    <div className="App">
      <Particles params = {particlesParams} className='particles' />
      <header className="App-header">
        <div className="heading">Foodist</div>
        {
          (count === 0) ? 
            <div className="body-out">
              <div className="body-title">Wondering what to eat?</div><br/>
              <button 
                type="button" 
                className="feed-me-button"
                onClick={feedMe} 
              >
                Feed Me!
              </button>
            </div>
          :
            <div className="body-in">
            <div className="bod">
            <div className="meal-container">
              <div className="meal-header">
                <div className="left-col">
                  <img src={foodImage} title="Meal Image" width="420" height="315" className="food-image"/>
                  <div className="ingredients">
                    <div className="cct">
                      <h4 className="cct-heading">Category: </h4>
                      {foodCategory}
                    </div>
                    <div className="cct">
                      <h4 className="cct-heading">Cuisine: </h4>
                      {cuisine}
                    </div>
                    <div className="cct">
                      <h4 className="cct-heading">Tags: </h4>
                      {tags}
                    </div>
                    <h4 className="cct-heading">Ingredients: </h4>
                    <ul>{ingredients.map(ingredient => (
                      <li key={ingredient.id}>{ingredient.value}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="right-col">
                  <h2 className="food-name">{foodName}</h2>
                  <p className="instructions">{instructions}</p>
                </div>
              </div>
              <h3 className="video-heading">Video Recipe</h3>
              <iframe title="Food Video" className="video-frame" width="96%" height="500" src={`https://www.youtube.com/embed/${foodVideo}`} />
              <div className="button-align">
                <button 
                  type="button" 
                  className="uber-eats-button"
                  onClick={uberEats} 
                >
                  Order on Uber<span style={{color:"#05a357"}}>Eats</span>?
                </button>
                <h2 className="video-heading" style={{fontFamily:"Playfair Display"}}>Or</h2>
                <button 
                  type="button" 
                  className="feed-me-button"
                  onClick={feedMe} 
                >
                  Feed Me!
                </button>
              </div>
            </div>
            </div>
            </div>  
        }
      </header>
      <div className="footer">
        <div className="footer-text">
          Copyrights Ltd.
        </div>
      </div>
    </div>
  );
}

export default App;
