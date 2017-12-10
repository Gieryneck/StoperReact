class Stopwatch extends React.Component {

    render() {

        return (

            <div className="container">

                <div className="stopwatch">{this.state.display}</div>

                <nav className="controls">
                    <button className="button" onClick={this.start}>Start</button>
                    <button className="button" onClick={this.stop}>Stop</button>
                    <button className="button" onClick={this.save}>Save</button>
                    <button className="button" onClick={this.reset}>Reset</button>
                </nav>

                
                <Results results={this.formatResults(this.state.results)}/>
                
                <button className="button listReset" onClick={this.resetList}>Reset Results List</button>

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

    formatResults = (results) => {
        var self = this;
        return results.map(function(result) {

            return self.format(result)        
        })
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
        
        if(!(this.times.miliseconds === 0 && this.times.seconds === 0 && this.times.minutes === 0)) {

            
            let newResults = this.state.results;

           // newResults.push(JSON.parse(JSON.stringify(this.times))); 

            /* musimy stworzyc kopie wartosci this.times niezalezna od this.times, bo do tablicy przekazujemy
            tylko adres do zmiennej this.times mozna to zrobic tym czyms powyzej robiac z times
            stringa a potem znow obiekt. w ten sposob utracimy powiazanie z times, ale jest to brzydka 
            metoda. lepiej stworzyc nowy obiekt jak ponizej:  */

            

             newResults.push({
                minutes: this.times.minutes,
                seconds: this.times.seconds,
                miliseconds: this.times.miliseconds
            }); 

            this.setState({

                results: newResults
                   
            }, console.log(this.state.results))
        }
  
    } 
    
    resetList = () => {

        this.setState({results: []});
    }

}

function Results(props) {
    
    var results = props.results.map((result, key) => {

       return ( 

           <li key={key.toString()} className="resultsListItem">{result}</li> // nadajemy key bo react chce wiedziec ktory li jest ktory
       );
    }); 

    if (results.length===0) return null; // nie chcemy rendera jesli nie ma zadnych <li>, ReactOrg w takich sytuacjach każe zwracac 'null'

    return(

        <ul className="resultsList">
            {results}
        </ul>

        // React jest taki madry ze nie re-renderuje calej listy a tylko dokleja nowy element <li>, sprawdza ile musi dorenderowac
    )
}



var element =
    React.createElement(Stopwatch);

ReactDOM.render(element, document.getElementById('app'));