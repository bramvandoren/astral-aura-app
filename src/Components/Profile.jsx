import React, { useState, useEffect } from 'react';
import { useAuth } from '../Auth/AuthContainer';
import { useQuery, useMutation, ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { GET_CATEGORIES, GET_USER_PROFILE, GET_OPDRACHTEN } from '../graphql/Queries';
import { UPDATE_USER_PROFILE } from '../graphql/Mutations';
import { setContext } from '@apollo/client/link/context';
import { Link } from 'react-router-dom';


const Profiel = () => {
  const { logout, user } = useAuth();
  // console.log('User information:', user.jwt);

  const [specialisaties, setSpecialisaties] = useState([]);
  const [nieuweSpecialisatie, setNieuweSpecialisatie] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [email, setEmail] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');
  const [password, setPassword] = useState('');
  const [naam, setNaam] = useState('');
  const [gsm, setGsm] = useState('');

  const httpLink = createHttpLink({
    uri: 'https://astralaura.ddev.site:5530/api',
  });

  const authLink = setContext((_, { headers }) => {
    // Voeg de Authorization-header toe als de JWT-token beschikbaar is
    const token = user.jwt;
    return {
      headers: {
        ...headers,
        Authorization: token ? `JWT ${token}` : '',
      },
    };
  });

  // Combineer de authLink met de httpLink om de Apollo Client-link te maken
  const link = authLink.concat(httpLink);

  const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
  });

  const { loading: profileLoading, data: profileData } = useQuery(GET_USER_PROFILE, {
    client: client,
  });



  useEffect(() => {
    if (profileData && profileData.viewer) {
      // Extract data from the query response
      const { id, fullName, email, gsm } = profileData.viewer;

      // Set the initial values using the data from the query
      setEmail(email || '');
      setNaam(fullName || '');
      setGsm(gsm || '');
    }
  }, [profileData]);

  // const { loading: opdrachtenLoading, error: opdrachtenError, data: opdrachtenData } = useQuery(GET_OPDRACHTEN);


  // const { loading, error, data } = useQuery(GET_CATEGORIES, {
  //   client: client, // Voeg de Apollo Client toe aan de query
  // });

  const [updateUserProfile, { loading: updateUserLoading, error: updateUserError }] = useMutation(UPDATE_USER_PROFILE, {
    client: client, // Voeg de Apollo Client toe aan de mutatie
  });


  const voegSpecialisatieToe = () => {
    if (nieuweSpecialisatie.trim() !== '') {
      setSpecialisaties([...specialisaties, nieuweSpecialisatie]);
      setNieuweSpecialisatie('');
    }
  };

  const verwijderSpecialisatie = (index) => {
    const nieuweSpecialisaties = [...specialisaties];
    nieuweSpecialisaties.splice(index, 1);
    setSpecialisaties(nieuweSpecialisaties);
  };

  // const filteredCategories = data?.categories.filter((categorie) =>
  //   categorie.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // const handleProfile = async () => {
  //   try {
  //     // Gebruik de updateUserProfile-mutatie om gebruikersgegevens bij te werken
  //     await profielGegevens({
  //       variables: {
  //         email,
  //         naam,
  //         gsm
  //       },
  //       context: {
  //         headers: {
  //           Authorization: `JWT ${user.jwt}`,
  //         },
  //       },
  //     });
  //     setEditMode(false);
  //     setEmail(user.user.email || '');  // Gebruik de gegevens van de query
  //     setNaam(user.user.fullname || '');    // Gebruik de gegevens van de query
  //     setGsm(user.user.gsm || '');      // Gebruik de gegevens van de query
  //   } catch (error) {
  //     console.error('Fout bij het bijwerken van het profiel:', error);
  //   }
  // };

  const handleUpdateProfile = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    try {
      if (!user.jwt) {
        console.error('User not authenticated');
        return;
      }

      // Gebruik de updateUserProfile-mutatie om gebruikersgegevens bij te werken
      await updateUserProfile({
        variables: {
          email,
          naam,
          gsm
        },
        context: {
          headers: {
            Authorization: `JWT ${user.jwt}`,
          },
        },
      });
      // setEditMode(false);
    } catch (error) {
      console.error('Fout bij het bijwerken van het profiel:', error);
    }
  };

  return (
    <div>
      <h2>Mijn Profiel</h2>
      {profileLoading && <p>Loading...</p>}
      {profileData && profileData.viewer && (
        <div>
          <p>ID: {profileData.viewer.id}</p>
          <p>Email: {profileData.viewer.email}</p>
          <p>Naam: {profileData.viewer.fullName}</p>
          <p>GSM: {profileData.viewer.gsm}</p>
        </div>
      )}

      <h3>Mijn opdrachten</h3>
      <button><Link to="/profiel/opdrachten">Mijn opdrachten</Link></button>
      <h3>Specialisaties:</h3>
      <ul>
        {specialisaties.map((specialisatie, index) => (
          <li key={index}>
            {specialisatie}
            <button onClick={() => verwijderSpecialisatie(index)}>Verwijderen</button>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => setShowModal(true)}>Specialisatie Toevoegen</button>
      </div>
      {/* {showModal && (
        <div>
          <div>
            <label>
              Zoek en voeg een specialisatie toe:
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </label>
          </div>
          <ul>
            {filteredCategories.map((categorie) => (
              <li
                key={categorie.title}
                onClick={() => {
                  setNieuweSpecialisatie(categorie.title);
                  setShowModal(false);
                }}
              >
                {categorie.title}
              </li>
            ))}
          </ul>
          <button onClick={() => setShowModal(false)}>Annuleren</button>
          <button onClick={voegSpecialisatieToe}>Toevoegen</button>
        </div>
      )} */}
      {/* {editMode ? ( */}

        <div>
          <h3>Gegevens</h3>
          <form onSubmit={handleUpdateProfile}>
            {/* Title input */}
            <label>
              Email:
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            {/* Omschrijving input */}
            <label>
              Naam:
              <input value={naam} onChange={(e) => setNaam(e.target.value)} />
            </label>
            {/* Plaats input */}
            <label>
              Gsm:
              <input type="text" value={gsm} onChange={(e) => setGsm(e.target.value)} />
            </label>
            {/* Submit button */}
            <button type="submit" disabled={updateUserLoading}>
            Profiel updaten
            </button>
          </form>
          {updateUserLoading && <p>Loading...</p>}
          {updateUserError && <p>Error: {updateUserError.message}</p>}
          {/* Invoervelden voor bijwerken profiel */}
          
        </div>
      <button onClick={logout}>Log uit</button>
    </div>
  );
};

export default Profiel;
