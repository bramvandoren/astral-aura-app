// OpdrachtDetail.js
import React , {useState, useEffect} from 'react';
import { useAuth } from '../Auth/AuthContainer';
import { useQuery } from '@apollo/client';
import { GET_OPDRACHT, GET_MEDIUMS, GET_USER_PROFILE } from '../graphql/Queries';
import { useParams } from 'react-router-dom';
import AanmeldenOpdracht from './AanvragenOpdracht'; // Importeer de nieuwe component
import { Link } from 'react-router-dom';
import { route, Routes } from '../core/routes';
import OpdrachtVoltooien from './OpdrachtVoltooien';


const OpdrachtDetail = () => {

  const { user } = useAuth();
  const { id } = useParams();

  const [userIsMedium, setUserIsMedium] = useState(false);


  const { loading, error, data } = useQuery(GET_OPDRACHT, {
    variables: {
      opdrachtId: useParams().opdrachtId,
    },
  });

   // Haal Mediums op en kijk of user.user.id één van de ids is in de medium profielen
   const { loading: mediumsLoading, data: mediumsData } = useQuery(GET_MEDIUMS, {
    variables: { id: [user.user.id] }
  });

  useEffect(() => {
    if (mediumsData) {
      const isMedium = mediumsData.users.some(medium => medium.id === user.user.id);
      setUserIsMedium(isMedium);
    }
  }, [mediumsData, user.user.id]);
  
  
  

  if (loading) return <p>Laden...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const opdracht = data.entry;
  // console.log((parseInt(opdracht.author.id) === parseInt(user.user.id))
  console.log(opdracht.aanvragen.length)
 


  return (
    <>
    <div className='back'>
    <Link to={route(Routes.Opdrachten)}>Terug</Link>
    </div>
    <div className='wrapper'>
      <div className='opdracht__details'>
        <h3 >{opdracht.title}</h3>
        <div className='opdracht_gegevens'>
          <div className='author'>
            <img src="../bullet.svg" alt="bullet" /><p>{opdracht.author.name}</p>
          </div>
          <div>
            <p><b>Beschrijving:</b></p>
            <p>{opdracht.omschrijving}</p>
          </div>
          <div>
            <p><b>Deadline:</b></p>
            <p>{opdracht.deadline ? opdracht.deadline : <p>/</p>}</p>
          </div>
          <div>
            <p><b>Status:</b></p>
            <p className='status'>{opdracht.opdrachtStatus}</p>
          </div>
          <div className='categories'>
            <p><b>Categorië(en):</b></p>
            {
              opdracht.categorieen && (
                  opdracht.categorieen.map((categorie) => (
                      <p key={categorie.id} className="categorie">{categorie.title}</p>
                  ))
              )
            }
            { opdracht.categorieen.length >= 0 ? <p>/</p> : null}
          </div>
        </div>

      </div>
      
      {/* Voeg de AanmeldenOpdracht-component toe */}
      {/* <AanmeldenOpdracht opdrachtId={opdracht.id} specialiteit={opdracht.specialiteit} /> */}
      {/* <button><Link to={route(Routes.OpdrachtDetail, {id: entry.id})}>Meer info</Link></button> */}
      <div>
      
      {
          // Als de gebruiker de autheur is en er zijn aanvragen
          (((parseInt(opdracht.author.id) === parseInt(user.user.id)) && opdracht.aanvragen.length > 0) ?
          <button><Link to={route(Routes.OpdrachtKandidaten, {id: opdracht.id})}>Aanvragen ({opdracht.aanvragen.length})</Link></button>

          : <p>Geen aanvragen</p>)
      }
      {
          // if not in state pending or searching, user is a medium and user is not the author
          ( userIsMedium & (opdracht.opdrachtStatus === 'pending' || opdracht.opdrachtStatus === 'searching') & (parseInt(opdracht.author.id) !== parseInt(user.user.id))) ? <Link>Mission accept</Link>: null
      }
      
      {
          // if user is the author or the accepted medium
          // ((parseInt(opdracht.author.id) === parseInt(user.user.id)) || opdracht.assignedTo.some((medium) => parseInt(medium.id) === parseInt(user.user.id))) && data.entry.assignedTo.length > 0 ? <Candidates accepted={data.entry.assignedTo}/> : null
      }
      {
          // if user is the author
          ((parseInt(opdracht.author.id) === parseInt(user.user.id)) && (opdracht.opdrachtStatus !== 'success' && opdracht.missionStatus !=='failed')) ? "voltooien" : null
      }
      </div>
    </div>
    </>
  );
};

export default OpdrachtDetail;
