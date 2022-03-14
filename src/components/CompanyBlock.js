import React from 'react';

import '../styles/CompanyBlock.css';

const CompanyBlock = ({quote}) => {
    return (
        <div className='quote-container'>
          <p className="quote">
            {quote.name}
          </p>
          <img src={quote.logo}/>
          <div className=".quote-description">
            <p>Specialties:<span className='highlight'> {quote.specialties} </span></p> 
            <p>City:<span className='highlight'> {quote.city} </span></p> 
          </div>
        </div>
      );
};

export default CompanyBlock;

