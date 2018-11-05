import React, { Component } from "react";
import SliderContainer from './Container';
import img_1 from "./assets/1.jpg";
import img_2 from "./assets/2.jpg";
import img_3 from "./assets/3.jpg";
import img_4 from "./assets/4.jpg";

class Slider extends Component {
    state = {
        mark: {
            start: null, //начало тача
            move: null, // расстояние от старта тача
            direction: null, // направление движения -1 - справа налево / 1 - слева направо
            end: null, // отпускание пальца
            stop: null, // маркер конца пройденного расстояния move
        }
    }
    
    mark = Object.create(null);

    mouseEvent = (e) => {
        return {
            onTouchStart: e => {
                this.mark.start = e.touches[0].pageX;
            },
            onTouchMove: e => {
                if (!this.mark.stop) {
                    this.mark.move = e.touches[0].pageX - this.mark.start;    
                } else {
                    this.mark.move = this.mark.stop + (e.touches[0].pageX - this.mark.start);
                }
                this.mark.direction = (this.mark.start - e.touches[0].pageX) > 0 ? -1 : 1;
                this.setState({
                    mark:{
                        move: this.mark.move,
                    }
                });
            },
            onTouchEnd: e => {
                this.mark.end = e.changedTouches[0].clientX;
                this.mark.stop = this.mark.move
                this.mark = {
                    start: this.mark.start,
                    move: this.mark.move,
                    direction: this.mark.direction,
                    end: this.mark.end,
                    stop: this.mark.move,
                };
                this.setState({mark: this.mark});
            }
        };
    }

    moveTarget = (el) => {

    }


    render(){
        const mouseEvent = this.mouseEvent();
        //console.log(this.state.mark)
        const styleIs = {transform: `translateX(${this.state.mark.move}px)`};
        return (
            <React.Fragment>
                <SliderContainer>
                    <div className="slides-wrapper" {...mouseEvent}>
                        <div 
                        className="slider-box"  style={styleIs}>
                            <div className="slider-item"></div>
                            <div className="slider-item"></div>
                            <div className="slider-item"></div>
                            <div className="slider-item"></div>
                            <div className="slider-item">
                                <img src={img_1} alt="car"/>
                            </div>
                            <div className="slider-item">
                                <img src={img_2} alt="car"/>
                            </div>
                            <div className="slider-item">
                                <img src={img_3} alt="car"/>
                            </div>
                            <div className="slider-item">
                                <img src={img_4} alt="car"/>
                            </div>
                            <div className="slider-item"></div>
                            <div className="slider-item"></div>
                            <div className="slider-item"></div>
                        </div>
                    </div>
                </SliderContainer>
            </React.Fragment>
        )
    }
}

export default Slider;