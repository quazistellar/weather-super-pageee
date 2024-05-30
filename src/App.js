import React from "react";
import './App.css';
import Header from "./components/Header"
import Footer from "./components/Footer"
import Section from "./components/Section"
import Weather from "./components/Weather"


class App extends React.Component {
  render() {
    return (
      <div className="container" >
      <Header/>
      <div style={{ width: '280px', margin: '0 auto' }}>
      <Weather/>
    </div>
      <Section/>
      <Footer/>
          <video autoPlay loop muted>
            <source src="../images/starsbk1.mp4" type="video/mp4" />
          </video>
      </div>
    );
  }
}

export default App;
