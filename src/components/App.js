import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/App.css';
import CompannyBlock from './CompanyBlock';


const App = () => {
  const [quotes, setQuotes] = useState([]);
  const [value, setValue] = useState('');
  const [state, setChecked] = useState({
    Excavation: false,
    Plumbing: false,
    Electrical: false,
  });

  const getCompanys = () => { 
    axios.get('http://localhost:3002/company')
    .then((response) => {
      setQuotes(response.data)
    })
  }
  useEffect(() =>{
    getCompanys()
  }, [])

  const filterQuotes = quotes.filter(nameCompany => {
    const returnValue =  nameCompany.name.toLowerCase().includes(value.toLowerCase());
    if (state.Excavation === true && nameCompany.specialties === 'Excavation') {
      return returnValue;
    }
    if (state.Plumbing === true && nameCompany.specialties === 'Plumbing') {
      return returnValue;
    }
    if (state.Electrical === true && nameCompany.specialties === 'Electrical') {
      return returnValue;
    }
    if (state.Excavation !== true && state.Plumbing !== true && state.Electrical !== true) {
      return returnValue;
    }
  })

  const handleChange = (event) => {
    setChecked({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };
  
  const { Excavation, Plumbing, Electrical } = state;

  const renderedQuotes = filterQuotes.map((quote, i) => {
    return <CompannyBlock quote={quote} key={i} />
  })

  return (
    <div className='app'>
      <h1 className='title'>Enter company name</h1>
      
      <div className='searchbar'>
        <input 
            className='searchbar-input' 
            type='text' 
            placeholder="Search by name. . ."
            onChange={e => setValue(e.target.value)}
        />
        <input
        className='checkbox-input'
        type="checkbox"
        checked={Excavation}
        onChange={handleChange}
        name="Excavation"
        />
        <span>Excavation</span>

        <br/>
        <input
        className='checkbox-input'
        type="checkbox"
        checked={Plumbing}
        onChange={handleChange}
        name="Plumbing"
        />
        <span>Plumbing</span>
        
        <br/>
        <input
        className='checkbox-input'
        type="checkbox"
        checked={Electrical}
        onChange={handleChange}
        name="Electrical"
        />
        <span>Electrical</span>
      

      </div>

      <div className='main-content'>
        {renderedQuotes}
      </div>
    </div>
    
  );
};

export default App;
