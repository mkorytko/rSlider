import React, { Component } from "react";
import PropTypes from "prop-types";

const styles = {
    sliderItemContent: {
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
        userSelect: "none",
    }
}

class Slider extends Component {
    state = {
        contents: [],
        mark: {
            start: null, //начало тача
            move: null, // расстояние от старта тача
            direction: null, // направление движения -1 - справа налево / 1 - слева направо
            end: null, // отпускание пальца
            stop: null, // маркер конца пройденного расстояния move
        },
        slideIndex: 0,
        sliderLengts: 0,
        slidesShow: this.props.slidesShow || 5, //сколько видно контента
        showSize: null, // длина главного контейнера с контентом
        slideTheEnd: null, // расчёт конечной длины трансформа
        contentWidth: this.props.widthItem || 200,
        itemStyle: {},
        /*TODO:
        slidesHeight: null, // высота контента 
        */
    }
    
    mark = Object.create(null);

    componentDidMount() {
        const { slidesShow, contentWidth } = this.state;
        this.windowSize();
        this.setState({
            contents: this.props.contents,
            sliderLengts: this.props.contents.length * contentWidth + "px",
            showSize: slidesShow * contentWidth + "px",
            slideTheEnd: (this.props.contents.length - slidesShow) * contentWidth,
            itemStyle: {width: contentWidth, height: "120px"},
        })
    }

    windowSize = () => {
        window.addEventListener("resize", (e) => {
            // изменение размера экрана
            //console.log(e.target.screen.width)
        })
        
    }

    mouseEvent = (e) => {
        return {
            onTouchStart: e => {
                this.mark.start = e.touches[0].pageX;
            },
            onTouchMove: e => {
                if (!this.mark.stop) {
                    if (e.touches[0].pageX - this.mark.start <= 0) {
                        this.mark.move = e.touches[0].pageX - this.mark.start;
                    } else {
                        this.mark.move = 0;
                    }
                } else {
                    if (this.mark.stop + (e.touches[0].pageX - this.mark.start) > 0) {
                        this.mark.move = 0;
                    } else if (this.mark.stop + (e.touches[0].pageX - this.mark.start) < (-this.state.slideTheEnd)) {
                        this.mark.move = (-this.state.slideTheEnd);
                    }
                    else {
                        this.mark.move = this.mark.stop + (e.touches[0].pageX - this.mark.start);
                    }
                }
                this.mark.direction = (this.mark.start - e.touches[0].pageX) > 0 ? -1 : 1;
                this.setState({
                    mark: {
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

    selectIndex = (i) => this.setState(() => ({slideIndex: i}));
    
    render(){
        const mouseEvent = this.mouseEvent();
        const { contents, sliderLengts, showSize, itemStyle, slideIndex } = this.state;
        // const styleIs = {transform: `translateX(${this.state.mark.move}px)`, width: `${sliderLengts}`, transition: "transform .05s"};
        const styleIs = {transform: `translateX(${this.state.mark.move}px)`, width: `${sliderLengts}`};
        return (
            <React.Fragment>
                <div
                    style={{width: showSize}}
                    className="slider-container"
                    {...mouseEvent}>
                    <div className="slider-line" style={styleIs}>
                        <div className="slider-box" >
                            {contents.map((els, i)=> (
                                <div 
                                    key={i} style={Object.assign({}, itemStyle)}>
                                    <img
                                        className={`slider-item${slideIndex === i ? ' active' : ''}`}
                                        style={styles.sliderItemContent}
                                        src={els}
                                        data-slide={i}
                                        onClick={() => this.selectIndex(i)} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

Slider.propTypes = {
    slidesShow: PropTypes.string,
    widthItem: PropTypes.string,
}

export default Slider;