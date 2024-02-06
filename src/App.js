//import logo from './logo.svg';
import './App.css';
import Carousel from "./components/carousel.component";
import slidesData from './db.json'; 

/** */

function App() {

  const slides = slidesData.slides

  return (
    <div className="m-auto">
      <Carousel slides={slides} />
  </div>
  );
}

export default App;
