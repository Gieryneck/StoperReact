"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
    _inherits(Stopwatch, _React$Component);

    _createClass(Stopwatch, [{
        key: "handleStart",
        value: function handleStart() {

            console.log('click');
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { id: "container" },
                React.createElement("div", { "class": "stopwatch" }),
                React.createElement(
                    "nav",
                    { "class": "controls" },
                    React.createElement(
                        "a",
                        { href: "#", "class": "button", id: "start" },
                        "Start"
                    ),
                    React.createElement(
                        "a",
                        { href: "#", "class": "button", id: "stop" },
                        "Stop"
                    ),
                    React.createElement(
                        "a",
                        { href: "#", "class": "button", id: "save" },
                        "Save"
                    ),
                    React.createElement(
                        "a",
                        { href: "#", "class": "button", id: "reset" },
                        "Reset"
                    )
                ),
                React.createElement("ul", { "class": "results", id: "resultsList" }),
                React.createElement(
                    "a",
                    { href: "#", "class": "button", id: "listReset" },
                    "Reset Results List"
                )
            );
        }
    }]);

    function Stopwatch(props) {
        _classCallCheck(this, Stopwatch);

        var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, props));

        _this.state = {

            running: false,
            times: {

                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        };
        return _this;
    }

    _createClass(Stopwatch, [{
        key: "print",
        value: function print() {

            this.display.innerText = this.format(this.state.times);
        }
    }, {
        key: "format",
        value: function format(times) {
            // tu wystarczy times jako nazwa parametru bo print podaje this.state.times
            // i moglibysmy na odbiorcy nazwac ten parametr jakkolwiek

            return pad0(times.minutes) + ":" + pad0(times.seconds) + ":" + pad0(Math.floor(times.miliseconds));

            function pad0(value) {

                var result = value.toString();
                if (result.length < 2) {

                    result = '0' + result;
                }

                return result;
            }
        }
    }]);

    return Stopwatch;
}(React.Component);

var element = React.createElement(Stopwatch);

ReactDOM.render(element, document.getElementById('app'));
