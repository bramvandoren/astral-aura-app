// KandidaatMediums.js
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_MEDIUMS } from '../graphql/Queries';

const KandidaatMediums = () => {
  const { loading, error, data: mediumdata } = useQuery(GET_MEDIUMS);
  console.log(mediumdata)

  if (loading) return <p>Laden...</p>;
  if (error) return <p>Error: {error.message}</p>;


  return (
    <>
    <h1>AstralAura</h1>
    <div className='wrapper'>
      <h2>Mediums</h2>
      <div>
        {mediumdata.users.map((medium) => (
          <div className='medium' key={medium.id}>
            <h3>{medium.name}</h3>
            <a href='#'>{medium.email}</a>
            <p><b>Specialiteit(en):</b></p>
            {medium.categorieen.map((specialiteit) => (
              <p>{specialiteit.title}</p>
            ))}
            {medium.categorieen.length === 0 && <p>Geen specialiteit(en) opgegeven.</p>}
            {/* <img className='medium-foto' src={medium.photo ? medium.photo.url : "https://www.pexels.com/photo/a-woman-in-black-clothes-sitting-n-the-table-with-wooden-board-and-candlelight-7278732/" } alt={`Foto van ${medium.name}`}/> */}
            {/* <button>Kies dit Medium</button> */}
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default KandidaatMediums;
