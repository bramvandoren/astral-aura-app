// Importeer de benodigde hooks en queries
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_OPDRACHTEN, GET_STATS, GET_PARTNERS, GET_TESTIMONIALS, GET_ABOUT_US, GET_WIDGETS, GET_MEDIUMS } from '../graphql/Queries';
import { Link } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContainer';


function Home() {

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


  // Haal gegevens op met behulp van de GraphQL-query's
  const { loading: opdrachtenLoading, error: opdrachtenError, data: opdrachtenData } = useQuery(GET_OPDRACHTEN);
  const { loading: statsLoading, error: statsError, data: statsData } = useQuery(GET_STATS);
  const [countedStats, setCountedStats] = useState({
    entryCount: 0,
    userCount: 0,
  });
  // const { loading: partnersLoading, error: partnersError, data: partnersData } = useQuery(GET_PARTNERS);
  // const { loading: testimonialsLoading, error: testimonialsError, data: testimonialsData } = useQuery(GET_TESTIMONIALS);
  const { loading: aboutUsLoading, error: aboutUsError, data: aboutUsData } = useQuery(GET_ABOUT_US);
  // const { loading: widgetsLoading, error: widgetsError, data: widgetsData } = useQuery(GET_WIDGETS);


  useEffect(() => {
    let entryCountInterval;
    let userCountInterval;

    const startCounting = () => {
      // Animate the total cases
      entryCountInterval = setInterval(() => {
        setCountedStats((prevStats) => {
          const nextEntryCount = prevStats.entryCount + 1;
          return {
            ...prevStats,
            entryCount: nextEntryCount >= statsData.entryCount ? statsData.entryCount : nextEntryCount,
          };
        });
      }, 200);

      // Animate the total registered mediums
      userCountInterval = setInterval(() => {
        setCountedStats((prevStats) => {
          const nextUserCount = prevStats.userCount + 1;
          return {
            ...prevStats,
            userCount: nextUserCount >= statsData.userCount ? statsData.userCount : nextUserCount,
          };
        });
      }, 200);
    };

    if (statsData) {
      // Start counting after a delay of 500 milliseconds (0.5 seconds)
      const countingDelay = setTimeout(startCounting, 500);

      // Clear the intervals and timeout when the component unmounts or when the counting is done
      return () => {
        clearTimeout(countingDelay);
        clearInterval(entryCountInterval);
        clearInterval(userCountInterval);
      };
    }
  }, [statsData]);

  // Gebruik de auth-hook als je de gebruikersinformatie nodig hebt
  // const { user } = useAuth();

  // Toon de loader als gegevens worden geladen
  if (opdrachtenLoading || statsLoading || aboutUsLoading) {
    return <p>Loading...</p>;
  }

  // Toon een foutmelding als er een fout optreedt bij het ophalen van gegevens
  if (opdrachtenError || statsError || aboutUsError) {
    return <p>Error: {opdrachtenError || statsError || aboutUsError}</p>;
  }

  // Render de homepage met de opgehaalde gegevens
  return (<>
    <h1>AstralAura</h1>
    <div className='wrapper'>
      <h2>Welkom bij AstralAura</h2>
      <p className='slogan'>
        Waar paranormale liefhebbers verbonden worden met degenen die hulp zoeken!
      </p>
      {/* Maak een opdracht */}
      {!userIsMedium && (<div>
        <h3>Maak hier een nieuwe opdracht</h3>
        {/* <button><a href={}>Maak opdracht</a></button> */}
        <button><Link to="opdrachten/create">Maak een opdracht</Link></button>
      </div>)}

      {/* Informatie over het uitzendbureau/soc. netwerk */}
      <div >
        <h3>Over ons</h3>
        <p><b>AstralAura</b></p>
        <p>Dorpstraat 1</p>
        <p>9000 Gent</p>
        {aboutUsData && <p>{aboutUsData.title}</p>}
      </div>

      {/* Statistieken (hoeveel cases, hoeveel geregistreerde mediums, ...) */}
      <div className="statistics-container">
        <h3>Statistieken</h3>
        {statsData && (
          <div className="stats-wrapper">
            <div className="stat-item">
              <p className="stat-label">Totaal aantal opdrachten</p>
              <p className="stat-value">{countedStats.entryCount}</p>
            </div>
            <div className="stat-item">
              <p className="stat-label">Totaal aantal mediums</p>
              <p className="stat-value">{countedStats.userCount}</p>
            </div>
          </div>
        )}
      </div>

      {/* Laatst teogevoegde opdrachten */}
      <div>
        <h3>Recente Opdrachten</h3>
        {opdrachtenData && opdrachtenData.entries && opdrachtenData.entries
          .slice(0, 3) // Neem de eerste drie opdrachten
          .map((entry, index) => (
            <div className="opdracht" key={index}>
              <p className="opdracht-titel"><b>{entry.title}</b></p>
              <p className="opdracht-auteur-naam">{entry.author.name}</p>
            </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default Home;
