"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
    _inherits(Stopwatch, _React$Component);

    _createClass(Stopwatch, [{
        key: "render",
        value: function render() {

            return React.createElement(
                "div",
                { id: "container" },
                React.createElement(
                    "div",
                    { className: "stopwatch" },
                    this.state.display
                ),
                React.createElement(
                    "nav",
                    { className: "controls" },
                    React.createElement(
                        "button",
                        { className: "button", id: "start", onClick: this.start },
                        "Start"
                    ),
                    React.createElement(
                        "button",
                        { className: "button", id: "stop", onClick: this.stop },
                        "Stop"
                    ),
                    React.createElement(
                        "button",
                        { className: "button", id: "save", onClick: this.save },
                        "Save"
                    ),
                    React.createElement(
                        "button",
                        { className: "button", id: "reset", onClick: this.reset },
                        "Reset"
                    )
                ),
                React.createElement(
                    "button",
                    { className: "button", id: "listReset" },
                    "Reset Results List"
                )
            );
        }
    }]);

    function Stopwatch(props) {
        _classCallCheck(this, Stopwatch);

        var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, props));

        _this.start = function () {
            // do obslugi przez babel arrow fctions musimy zainstalowac "Stage 0 preset" i dodac odpowiedni wpis do .babelrc


            if (!_this.state.running) {
                _this.state.running = true;
                _this.watch = setInterval(function () {
                    _this.step();
                }, 10);
                // przypisujemy interwal do atrybutu watch zebysmy mogli go potem zatrzymac
            }
        };

        _this.stop = function () {

            _this.state.running = false;
            clearInterval(_this.watch); // konczymy interwal przypisany do atrybutu watch
        };

        _this.reset = function () {

            _this.state.running = false;
            clearInterval(_this.watch);
            _this.times.miliseconds = 0;
            _this.times.seconds = 0;
            _this.times.minutes = 0;
            _this.print();
        };

        _this.save = function () {

            if (!(_this.times.miliseconds === 0 & _this.times.seconds === 0 & _this.times.minutes === 0)) {

                /* this.setState((prevState) => {
                      return {results: [...prevState.results, this.times]}
                       //console.log(this.state.results);
                }, console.log(this.state.results));
                */
                _this.setState({

                    results:
                    // rest operator (...) expands out to:
                    [].concat(_toConsumableArray(_this.state.results), [_this.times]) // overwrites old y

                    //https://stackoverflow.com/questions/24898012/react-js-setstate-overwriting-not-merging
                    //const table = [...table1, ...table2, ...table3];
                    //const newNames = [...names, 'Tadeusz'];
                    //https://reactjs.org/docs/state-and-lifecycle.html   merging
                }, console.log(_this.state.results));
            }
        };

        _this.state = {

            running: false,
            display: '00:00:00',
            results: []
        };

        _this.times = {

            minutes: 0,
            seconds: 0,
            miliseconds: 0

            //this.start = this.start.bind(this);       jesli nie mamy presetu stage zero musimy tak sie babrac...
        };return _this;
    }

    _createClass(Stopwatch, [{
        key: "print",
        value: function print() {

            this.setState({ display: this.format(this.times) }); // setState() daje znac Reactowi ze musi sprawdzic czy wykonac re-render
            console.log(this.state.display);
        }
    }, {
        key: "format",
        value: function format(times) {
            // tu wystarczy times jako nazwa parametru bo print podaje this.times
            // i moglibysmy na odbiorcy nazwac ten parametr jakkolwiek

            console.log(this.state.display);
            return pad0(times.minutes) + ":" + pad0(times.seconds) + ":" + pad0(Math.floor(times.miliseconds));

            function pad0(value) {

                var result = value.toString();
                if (result.length < 2) {

                    result = '0' + result;
                }

                return result;
            }
        }
    }, {
        key: "step",
        value: function step() {

            if (!this.state.running) return; // <=> jeśli timer nie chodzi, nie rob nic (return konczy dzialanie metody)

            // jesli timer chodzi:
            this.calculate();
            this.print();
        }
    }, {
        key: "calculate",
        value: function calculate() {

            this.times.miliseconds += 1;
            /* 
            'miliseconds' to tak naprawdę centysekundy. Jest 1000 milisec w sec, 
            a display timera ma tylko dwie cyfry dla kazdej jednostki czasu,
            doliczamy więc co 10ms(setInterval) 1 centysekundę(czyli 10 ms)
            */
            if (this.times.miliseconds >= 100) {

                this.times.seconds += 1;
                this.times.miliseconds = 0;
            }

            if (this.times.seconds >= 60) {

                this.times.minutes += 1;
                this.times.seconds = 0;
            }
        }
    }]);

    return Stopwatch;
}(React.Component);

/* function Results(props) {
    

    props.results.forEach((result) => {
        
                    <li>    {result}</li>
    })   
    //console.log(props.results);
   var results = props.results.map((result) => {

       return ( 
           <li>{result}</li>
       );
    }); 

    return(

        <ul>
            {results}
        </ul>
    )
} */

var element = React.createElement(Stopwatch);

ReactDOM.render(element, document.getElementById('app'));
