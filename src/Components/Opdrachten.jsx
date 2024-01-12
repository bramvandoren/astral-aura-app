// Opdrachten.js
import React, {useState, useEffect} from 'react';
import { useQuery } from '@apollo/client';
import { GET_OPDRACHTEN, GET_MEDIUMS } from '../graphql/Queries';
import { Link } from 'react-router-dom';
import { route, Routes } from '../core/routes';
import { useAuth } from '../Auth/AuthContainer';




const Opdrachten = () => {

  const { user } = useAuth();


  const [userIsMedium, setUserIsMedium] = useState(false);

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

  // Add a state variable to store the selected opdrachtStatus filter
  const [selectedStatus, setSelectedStatus] = useState('')

  const { loading: opdrachtenLoading, error: opdrachtenError, data: opdrachtenData } = useQuery(GET_OPDRACHTEN, {
    variables: { status: selectedStatus }
  })

  if (opdrachtenLoading) return <p>Laden...</p>;
  if (opdrachtenError) return <p>Error: {opdrachtenError.message}</p>;
  console.log(opdrachtenData)

  // Add a function to handle filter changes
  const handleFilterChange = (e) => {
    setSelectedStatus(e.target.value)
  }

  return (
  <>
    <h1>AstralAura</h1>
    <div className='wrapper'>
      <h2>Alle Opdrachten</h2>
      {userIsMedium && (
      <div>
        <label htmlFor="status-filter">Filter by status:</label>
        <select id="status-filter" value={selectedStatus} onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>)}
      <div >
      {opdrachtenData && opdrachtenData.entries && opdrachtenData.entries.map((entry, index) => (
        (entry.opdrachtStatus !== 'draft') && (
          <div className='opdracht' key={index}>
            <div>
              <h3>{entry.title}</h3>
              <div className='author'>
                <p>{entry.author.name}</p>
              </div>
              {/* <p className='opdracht__omschrijving'>{entry.omschrijving}</p> */}
              <div className='opdracht__status'>
                {entry.opdrachtStatus}
              </div>
            </div>
            {userIsMedium &&(<button><Link to={route(Routes.OpdrachtDetail, {id: entry.id})}>Meer info</Link></button>)}
            
          </div>
        )
        ))}
      </div>
    </div>
    </>
  );
};

export default Opdrachten;
