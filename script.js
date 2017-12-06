class Stopwatch extends React.Component {

    handleStart() {

        console.log('click');
    }

    render() {
        return (

            <div id="container">

                <div class="stopwatch"></div>

                <nav class="controls">
                    <a href="#" class="button" id="start">Start</a>
                    <a href="#" class="button" id="stop">Stop</a>
                    <a href="#" class="button" id="save">Save</a>
                    <a href="#" class="button" id="reset">Reset</a>
                </nav>

                <ul class="results" id="resultsList"></ul>
                <a href="#" class="button" id="listReset">Reset Results List</a>
            </div>
        );


        
    }

    constructor(props) {

        super(props);

        this.state = {

            running: false,
            times: {

                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        }
    }

    print() {

        this.display.innerText = this.format(this.state.times);
    }

    format(times) { // tu wystarczy times jako nazwa parametru bo print podaje this.state.times
                    // i moglibysmy na odbiorcy nazwac ten parametr jakkolwiek

        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;

        function pad0(value) {

            let result = value.toString();
            if (result.length < 2) {

                result = '0' + result;
            }

            return result;
        }
    }

  
}

var element = 
React.createElement(Stopwatch);

ReactDOM.render(element, document.getElementById('app'));