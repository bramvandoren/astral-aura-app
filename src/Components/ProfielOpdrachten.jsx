// Opdrachten.js
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useAuth } from '../Auth/AuthContainer';
import { GET_PERSONAL_OPDRACHTEN } from '../graphql/Queries';
import { Link } from 'react-router-dom';
import { route, Routes } from '../core/routes';

const ProfielOpdrachten = () => {

  const { logout, user } = useAuth();

  const { loading: personalOpdrachtenLoading, error: personalOpdrachtenError, data: personalOpdrachtenData } = useQuery(GET_PERSONAL_OPDRACHTEN, {
    variables: {
      id: [user.user.id]
    }
  });

  const [toonVoltooideOpdrachten, setToonVoltooideOpdrachten] = useState(false);

  const voltooideOpdrachten = personalOpdrachtenData?.entries?.filter(
    (entry) => entry.opdrachtStatus === 'success'
  );
  console.log(personalOpdrachtenData);

  if (personalOpdrachtenLoading) return <p>Laden...</p>;
  if (personalOpdrachtenError) return <p>Error: {personalOpdrachtenError.message}</p>;

  return (
    <>
    <div className='back'>
        <Link to={route(Routes.Profiel)}>Terug</Link>      
    </div>
    <div className='wrapper'>
      <h2>Mijn Opdrachten</h2>
      {personalOpdrachtenData && personalOpdrachtenData.entries && personalOpdrachtenData.entries.map((entry, index) => (
          <div className='opdracht' key={index}>
            <h3 className='opdracht__title'>{entry.title}</h3>
            <p className='opdracht__status'>{entry.opdrachtStatus}</p>
            {/* <p>Omschrijving:</p>
            <p className='opdracht__omschrijving'>{entry.omschrijving}</p> */}
            <p className='opdracht__deadline'>{entry.deadline}</p>
            <button><Link to={route(Routes.OpdrachtDetail, {id: entry.id})}>Meer info</Link></button>
          </div>
        ))}
      <div>
        <h3>
          Voltooide opdrachten ({voltooideOpdrachten ? voltooideOpdrachten.length : 0})
        </h3>
        {voltooideOpdrachten && voltooideOpdrachten.length > 0 && (
          <ul>
            {voltooideOpdrachten.map((entry, index) => (
              <div className="opdracht" key={index}>
                <p>{entry.title}</p>
              </div>
            ))}
          </ul>
        )}
        {(!voltooideOpdrachten || voltooideOpdrachten.length === 0) && (
          <p>Er zijn geen voltooide opdrachten.</p>
        )}
      </div>
    </div>
    </>
  );
};

export default ProfielOpdrachten;
