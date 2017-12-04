
class Stopwatch {

    constructor(display) {

        this.running = false;
        this.display = display;
        this.set(); 
        /* to było 'reset' w zadaniu, zmieniłem na set bo chyba nie da sie jednoczesnie 
        zrobic tak by ustawialo to wartosc poczatkowa oraz resetowalo juz po/w trakcie mierzenia,
        bo musimy najpierw zatrzymac interwal ale tez musimy miec zdefiniowany poczatkowy obiekt times
        zeby w ogole cos sie wyswietlalo w display. reset() jest zdefiniowane pozniej i zajmuje sie tylko 
        resetem po/w trakcie odliczania, nie ustawianiem wartosci poczatkowych obiektu 'times'
        */
        this.print(this.times);
    }

    set() {

        this.times = {  // times difiniujemy dopiero tutaj i niejako "przy okazji" ustawiania metody set()

            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
    }

    print() {

        this.display.innerText = this.format(this.times);
    }

    format(times) {

        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;

        function pad0(value) {

            let result = value.toString();
            if (result.length < 2) {

                result = '0' + result;
            }

            return result;
        }
    }

    start() {

        if (!this.running) {

            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
            // przypisujemy interwal do atrybutu watch zebysmy mogli go potem zatrzymac
        }
    }

    step() {

        if(!this.running) return; // <=> jeśli timer nie chodzi, nie rob nic (return konczy dzialanie metody)

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

        if(this.times.seconds >= 60) {

            this.times.minutes += 1;
            this.times.seconds = 0;
        }
    }

    stop() {

        this.running = false;
        clearInterval(this.watch); // konczymy interwal przypisany do atrybutu watch
    }


    reset() {

        this.running = false;
        clearInterval(this.watch);
        this.times.miliseconds = 0;
        this.times.seconds = 0;
        this.times.minutes = 0;
        this.print();
    }


    save() {
        
        if(!(this.times.miliseconds === 0 & this.times.seconds === 0 & this.times.minutes === 0)) {

            let li = document.createElement("li");
            li.innerText = this.format(this.times);
            li.classList.add("resultsListItem");
            resultList.appendChild(li);
           
        }
  
    }

    listReset() {

        while (resultList.hasChildNodes()) {

            resultList.removeChild(resultList.firstChild);
        } 
        
    }
}

const stopwatch = new Stopwatch(
    document.querySelector('.stopwatch'));


var startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

var stopButton = document.getElementById('stop');
stopButton.addEventListener('click', ()=> stopwatch.stop());

var resetButton = document.getElementById('reset');
resetButton.addEventListener('click', ()=> stopwatch.reset());

var saveButton = document.getElementById('save');
saveButton.addEventListener('click', ()=> stopwatch.save());



var resultList = document.getElementById('resultsList');
//console.log(resultList);

var listResetButton = document.getElementById('listReset');
listResetButton.addEventListener('click', ()=> stopwatch.listReset());