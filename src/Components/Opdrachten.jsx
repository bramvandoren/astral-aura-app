// Opdrachten.js
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_OPDRACHTEN_QUERY, GET_OPDRACHTEN } from '../graphql/Queries';
import { Link } from 'react-router-dom';
import { route, Routes } from '../core/routes'



const Opdrachten = () => {
  const { loading: opdrachtenLoading, error: opdrachtenError, data: opdrachtenData } = useQuery(GET_OPDRACHTEN);

  if (opdrachtenLoading) return <p>Laden...</p>;
  if (opdrachtenError) return <p>Error: {opdrachtenError.message}</p>;
  // console.log(opdrachtenData)

  return (
    <div>
      <h2>Alle Opdrachten</h2>
      <div >
      {opdrachtenData && opdrachtenData.entries && opdrachtenData.entries.map((entry, index) => (
        (entry.opdrachtStatus !== 'draft') && (
          <div className='opdracht' key={index}>
            <div className='author'>
              <p>{entry.author.name}</p>
            </div>
            <div className='opdracht'>
              <h3>{entry.title}</h3>
              <p>{entry.omschrijving}</p>
              <div className='status'>
                Status: {entry.opdrachtStatus}
              </div>
            </div>
            <button><Link to={route(Routes.OpdrachtDetail, {id: entry.id})}>Meer info</Link></button>
          </div>
        )
        ))}
      </div>
    </div>
  );
};

export default Opdrachten;
