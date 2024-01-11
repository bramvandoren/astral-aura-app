// KandidaatMediums.js
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_MEDIUMS } from '../graphql/Queries';

const KandidaatMediums = () => {
  const { loading, error, data: mediumdata } = useQuery(GET_MEDIUMS);

  if (loading) return <p>Laden...</p>;
  if (error) return <p>Error: {error.message}</p>;


  return (
    <div>
      <h2>Kandidaat Mediums</h2>
      <div>
        {mediumdata.users.map((medium) => (
          <div className='medium' key={medium.id}>
            <h3>{medium.name}</h3>
            <img className='medium-foto' src={medium.photo ? medium.photo.url : "https://www.pexels.com/photo/a-woman-in-black-clothes-sitting-n-the-table-with-wooden-board-and-candlelight-7278732/" } alt={`Foto van ${medium.name}`}/>
            <p>Specialiteit(en): {medium.specialiteit}</p>
            <button>Kies dit Medium</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KandidaatMediums;
