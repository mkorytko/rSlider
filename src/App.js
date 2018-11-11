import React, { Component } from 'react';
import './App.css';
import Slider from "./Slider";
import img_1 from "./Slider/assets/1.jpg";
import img_2 from "./Slider/assets/2.jpg";
import img_3 from "./Slider/assets/3.jpg";
import img_4 from "./Slider/assets/4.jpg";

const imgs = [img_1, img_2, img_3, img_4, img_1, img_2, img_3, img_4,img_1, img_2, img_3, img_4, img_1, img_2, img_3, img_4];

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="experimentWindow">
          <Slider
            contents={imgs}/>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
