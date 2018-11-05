import React, { Component } from "react";
import SliderContainer from './Container';

class Slider extends Component {
    state = {
        mark: {
            start: null,
            move: null, 
            direction: null,
            end: null,
        }
    }

    mark = Object.create(null);

    mouseEvent = (e) => {
        return {
            onTouchStart: e => {
                this.mark.start = e.touches[0].pageX;
            },
            onTouchMove: e => {
                this.mark.move = e.touches[0].pageX - this.mark.start;
                // -1 - справа налево / 1 - слева направо
                this.mark.direction = (this.mark.start - e.touches[0].pageX) > 0 ? -1 : 1;
                // this.mark = {
                //     start: this.mark.start,
                //     move: this.mark.move,
                //     direction: this.mark.direction,
                // }
                this.setState({
                    mark:{
                        move: this.mark.move,
                    }
                })
            },
            onTouchEnd: e => {
                this.mark.end = e.changedTouches[0].clientX;
                this.mark = {
                    start: this.mark.start,
                    move: this.mark.move,
                    direction: this.mark.direction,
                    end: this.mark.end,
                };
                this.setState({mark: this.mark})
            }
        };
    }
    

    render(){
        const mouseEvent = this.mouseEvent();
        console.log(this.state.mark)
        return (
            <React.Fragment>
                <SliderContainer>
                    <p {...mouseEvent}
                    style={{transform: `translateX(${this.mark.move}px)`}}>
                        Какой-то абзац
                    </p>
                </SliderContainer>
            </React.Fragment>
        )
    }
}

export default Slider;