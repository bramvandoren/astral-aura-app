// OpdrachtDetail.js
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_OPDRACHT } from '../graphql/Queries';
import { useParams } from 'react-router-dom';
import AanmeldenOpdracht from './AanvragenOpdracht'; // Importeer de nieuwe component
import { Link } from 'react-router-dom';
import { route, Routes } from '../core/routes'


const OpdrachtDetail = () => {
  const { id } = useParams();
  // console.log(useParams().opdrachtId)
  const { loading, error, data } = useQuery(GET_OPDRACHT, {
    variables: {
      opdrachtId: useParams().opdrachtId,
    },
  });
  console.log(data)

  if (loading) return <p>Laden...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const opdracht = data.entry;

  return (
    <div className='opdracht'>
      <h3>{opdracht.title}</h3>
      <div className='opdracht_gegevens'>
        <p>{opdracht.omschrijving}</p>
        <p>Deadline: {opdracht.deadline}</p>
        <div className='author'>
          <p>{opdracht.author.name}</p>
        </div>
        <div className='status'>
          <h4>Status: {opdracht.opdrachtStatus}</h4>
        </div>
        <div className='categories'>
          <h4>Categoriëen</h4>
          {
            opdracht.categorieen && (
                opdracht.categorieen.map((categorie) => (
                    <p key={categorie.id} className="categorie">{categorie.title}</p>
                ))
            )
          }
        </div>
      </div>
      {/* Voeg de AanmeldenOpdracht-component toe */}
      <AanmeldenOpdracht opdrachtId={opdracht.id} specialiteit={opdracht.specialiteit} />
      {/* <button><Link to={route(Routes.OpdrachtDetail, {id: entry.id})}>Meer info</Link></button> */}
    </div>
  );
};

export default OpdrachtDetail;
