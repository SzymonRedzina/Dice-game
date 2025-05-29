import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [tabilcaKostek, setTablicaKostek] = useState([1, 1, 1, 1, 1]);
  const [liczbaRzutow, setLiczbaRzutow] = useState(3);
  const [zaznaczoneKostki, setZaznaczoneKostki] = useState([false, false, false, false, false]);
  const [tablicaWynikow, setTablicaWynikow] = useState([]);
  const [ostatnieWyniki, setOstatnieWyniki] = useState([]);
  

  useEffect(() => {
    const dane = JSON.parse(localStorage.getItem('wynik'));
    if (dane) {
      setOstatnieWyniki(dane);
    }
  }, []);

  const rzuc = (e) => {
    e.preventDefault();
    if (liczbaRzutow > 0) {
      setLiczbaRzutow(liczbaRzutow - 1);

      const noweKostki = tabilcaKostek.map((kostka, index) =>
        zaznaczoneKostki[index] ? kostka : Math.floor(Math.random() * 6) + 1
      );

      setTablicaKostek(noweKostki);

      if (liczbaRzutow === 1) {
        const licznik = {};
        for (let i = 0; i < noweKostki.length; i++) {
          const val = noweKostki[i];
          licznik[val] = (licznik[val] || 0) + 1;
        }

        const wartosci = Object.values(licznik);
        let wynik = '';

        if (wartosci.includes(3) && wartosci.includes(2)) {
          wynik = 'Full';
        } else if (wartosci.includes(5)) {
          wynik = 'Poker';
        } else if (wartosci.includes(4)) {
          wynik = 'Kareta';
        } else if (wartosci.includes(3)) {
          wynik = 'Trójka';
        } else if (wartosci.filter(c => c === 2).length === 2) {
          wynik = 'Dwie pary';
        } else if (wartosci.includes(2)) {
          wynik = 'Para';
        } else {
          wynik = 'Brak wygranej';
        }

        const noweWyniki = [...ostatnieWyniki, wynik];
        setTablicaWynikow([...tablicaWynikow, wynik]);
        setOstatnieWyniki(noweWyniki);
        localStorage.setItem('wynik', JSON.stringify(noweWyniki));
      }
    }
  };

  const nowaGra = (e) => {
    e.preventDefault();
    setLiczbaRzutow(3);
    setTablicaKostek([1, 1, 1, 1, 1]);
    setZaznaczoneKostki([false, false, false, false, false]);
  };

  const zaznacz = (index) => {
    if (liczbaRzutow === 3) return;
    const noweZaznaczenia = [...zaznaczoneKostki];
    noweZaznaczenia[index] = !noweZaznaczenia[index];
    setZaznaczoneKostki(noweZaznaczenia);
  };
  const usun = (e) =>{
     e.preventDefault();
     localStorage.setItem('wyniki',JSON.stringify([]));
     setOstatnieWyniki([]);
  }

  return (
    <div className="">
      <div className="column">    
          <div>
            <h1 className="text-center">Graj w kości</h1>
            <div className="d-flex justify-content-center ">
              {tabilcaKostek.map((kostka, index) => (
                <img
                  key={index}
                  src={`dice${kostka}.png`}
                  alt={`Kostka ${kostka}`}
                  className={`m-2 ${zaznaczoneKostki[index] ? 'border border-primary border-4 rounded' : ''}`}
                  style={{
                    cursor: liczbaRzutow < 3 ? 'pointer' : 'not-allowed',
                    width: '64px',
                    height: '64px',
                  }}
                  onClick={() => zaznacz(index)}
                />
              ))}
            </div>
            <div className="d-flex justify-content-center">
              <button className="btn btn-primary m-2" onClick={rzuc}>
                Rzuć kością ({liczbaRzutow})
              </button>
              <button className="btn btn-success m-2" onClick={nowaGra}>
                Nowa gra
              </button>
              <button className='btn btn-danger m-2' onClick={usun}>Usuń wyniki</button>
            </div>
            <div className='d-flex justify-content-center'>
              <div className='row'>
                <h3 className='text-center'>Ostatnie wyniki:</h3>
               
                {ostatnieWyniki.map((wynik, index) => (
                 <p key={index} className='text-center fw-bold fs-5'>{wynik}</p>
                ))}
               
              </div>
          </div>
          </div>
        </div>
    </div>
  );
}

export default App;
