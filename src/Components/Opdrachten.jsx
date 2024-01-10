// Opdrachten.js
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_OPDRACHTEN_QUERY } from '../graphql/Queries';

const Opdrachten = () => {
  const { loading, error, data } = useQuery(GET_ALL_OPDRACHTEN_QUERY);

  if (loading) return <p>Laden...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const opdrachten = data.opdrachten;

  return (
    <div>
      <h2>Opdrachten</h2>
      <ul>
        {opdrachten.map((opdracht) => (
          <li key={opdracht.id}>
            <strong>{opdracht.vraag}</strong>
            <p>{opdracht.omschrijving}</p>
            {/* Voeg hier andere opdrachtgegevens toe */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Opdrachten;
