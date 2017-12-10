class Stopwatch extends React.Component {

    render() {

        return (

            <div id="container">

                <div className="stopwatch">{this.state.display}</div>

                <nav className="controls">
                    <button className="button" id="start" onClick={this.start}>Start</button>
                    <button className="button" id="stop" onClick={this.stop}>Stop</button>
                    <button className="button" id="save" onClick={this.save}>Save</button>
                    <button className="button" id="reset" onClick={this.reset}>Reset</button>
                </nav>

                
                {/* <Results results={this.state.results}/> */}
                
                <button className="button" id="listReset">Reset Results List</button>

            </div>
        );



    }

    constructor(props) {

        super(props);

        this.state = {

            running: false,
            display: '00:00:00',
            results: []
        }

        this.times = {

            minutes: 0,
            seconds: 0,
            miliseconds: 0
        }

        //this.start = this.start.bind(this);       jesli nie mamy presetu stage zero musimy tak sie babrac...
    }

    print() {

        this.setState({display: this.format(this.times)})  // setState() daje znac Reactowi ze musi sprawdzic czy wykonac re-render
        console.log(this.state.display);
    }

    

    format(times) { // tu wystarczy times jako nazwa parametru bo print podaje this.times
                    // i moglibysmy na odbiorcy nazwac ten parametr jakkolwiek

        console.log(this.state.display);
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`

        function pad0(value) {

            let result = value.toString();
            if (result.length < 2) {

                result = '0' + result;
            }

            return result;
        }
    }


    start = () => {  // do obslugi przez babel arrow fctions musimy zainstalowac "Stage 0 preset" i dodac odpowiedni wpis do .babelrc

        
        if (!this.state.running) {
            this.state.running = true;
            this.watch = setInterval( () => {
                this.step()}, 10);
            // przypisujemy interwal do atrybutu watch zebysmy mogli go potem zatrzymac
        }
    }


    step() {

        if (!this.state.running) return; // <=> jeśli timer nie chodzi, nie rob nic (return konczy dzialanie metody)

        // jesli timer chodzi:
        this.calculate();
        this.print();
    }

    calculate() {

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


    stop = () => {

        this.state.running = false;
        clearInterval(this.watch); // konczymy interwal przypisany do atrybutu watch
    }


    reset = () => {

        this.state.running = false;
        clearInterval(this.watch);
        this.times.miliseconds = 0;
        this.times.seconds = 0;
        this.times.minutes = 0;
        this.print();
    }

    save = () => {
        
        if(!(this.times.miliseconds === 0 & this.times.seconds === 0 & this.times.minutes === 0)) {

            /* this.setState((prevState) => {

                return {results: [...prevState.results, this.times]}
                   //console.log(this.state.results);
            }, console.log(this.state.results));
 */
            this.setState({

                results: 
                    // rest operator (...) expands out to:
                    [...this.state.results, // x:0, y:0,
                    ...[this.times]] // overwrites old y
                
                        //https://stackoverflow.com/questions/24898012/react-js-setstate-overwriting-not-merging
                        //const table = [...table1, ...table2, ...table3];
                        //const newNames = [...names, 'Tadeusz'];
                        //https://reactjs.org/docs/state-and-lifecycle.html   merging
            }, console.log(this.state.results))
        }
  
    }      

}

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



var element =
    React.createElement(Stopwatch);

ReactDOM.render(element, document.getElementById('app'));