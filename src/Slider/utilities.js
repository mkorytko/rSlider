export default function touchEvent (e) {
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
};