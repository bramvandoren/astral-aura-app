// Opdrachten.js
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useAuth } from '../Auth/AuthContainer';
import { GET_ALL_OPDRACHTEN_QUERY, GET_PERSONAL_OPDRACHTEN } from '../graphql/Queries';

const ProfielOpdrachten = () => {

  const { logout, user } = useAuth();

  const { loading: personalOpdrachtenLoading, error: personalOpdrachtenError, data: personalOpdrachtenData } = useQuery(GET_PERSONAL_OPDRACHTEN, {
    variables: {
      id: [user.user.id]
    }
  });

  const [toonVoltooideOpdrachten, setToonVoltooideOpdrachten] = useState(false);

  const voltooideOpdrachten = personalOpdrachtenData?.entries?.filter(
    (entry) => entry.status === 'voltooid'
  );
  console.log(personalOpdrachtenData);

  if (personalOpdrachtenLoading) return <p>Laden...</p>;
  if (personalOpdrachtenError) return <p>Error: {personalOpdrachtenError.message}</p>;

  return (
    <div>
      <h2>Mijn Opdrachten</h2>
      {personalOpdrachtenData && personalOpdrachtenData.entries && personalOpdrachtenData.entries.map((entry, index) => (
          <div className='opdracht' key={index}>
            <h3>{entry.title}</h3>
            <p>{entry.omschrijving}</p>
            <p>{entry.deadline}</p>
            <div>
              <p>Status: {entry.opdrachtStatus}</p>
            </div>
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
  );
};

export default ProfielOpdrachten;
