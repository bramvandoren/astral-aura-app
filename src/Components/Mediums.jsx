// KandidaatMediums.js
import React from 'react';
import { useQuery } from '@apollo/client';
// import { GET_KANDIDAAT_MEDIUMS_QUERY } from '../graphql/queries';

const KandidaatMediums = () => {
  // const { loading, error, data } = useQuery(GET_KANDIDAAT_MEDIUMS_QUERY);

  // if (loading) return <p>Laden...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  // const kandidaatMediums = data.kandidaatMediums;

  return (
    <div>
      <h2>Kandidaat Mediums</h2>
      {/* <ul>
        {kandidaatMediums.map((medium) => (
          <li key={medium.id}>
            <strong>{medium.naam}</strong>
            <p>Specialiteit: {medium.specialiteit}</p>
            {
            <button>Kies dit Medium</button>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default KandidaatMediums;
