import React, { useState, useEffect } from 'react';
import { useAuth } from '../Auth/AuthContainer';
import { useQuery, useMutation, ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { GET_CATEGORIES, GET_USER_PROFILE } from '../graphql/Queries';
import { UPDATE_USER_PROFILE } from '../graphql/Mutations';
import { setContext } from '@apollo/client/link/context';

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
    client: client, // Voeg de Apollo Client toe aan de query
  });

  useEffect(() => {
    // console.log(profileData)
    // if (profileData && profileData.user) {
      
      // Stel de initiële waarden in met behulp van de gegevens van de query
      setEmail(user.user.email || '');  // Gebruik de gegevens van de query
      setNaam(user.user.fullname || '');    // Gebruik de gegevens van de query
      setGsm(user.user.gsm || '');      // Gebruik de gegevens van de query
    // }
  }, [profileData]);


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

      setEditMode(false);
    } catch (error) {
      console.error('Fout bij het bijwerken van het profiel:', error);
    }
  };

  return (
    <div>
      <h2>Mijn Profiel</h2>
      <p>Specialisaties:</p>
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
      {/* ) : ( */}
        {/* <button onClick={() => setEditMode(true)}>Bewerk Profiel</button> */}
      {/* )} */}
      <button onClick={logout}>Log uit</button>
    </div>
  );
};

export default Profiel;
