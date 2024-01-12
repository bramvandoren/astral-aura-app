import React, { useState, useEffect } from 'react';
import { useAuth } from '../Auth/AuthContainer';
import { useQuery, useMutation, ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { GET_CATEGORIES, GET_USER_PROFILE, GET_OPDRACHTEN, GET_MEDIUMS } from '../graphql/Queries';
import { UPDATE_USER_PROFILE, DELETE_SPECIALTY, DELETE_SPECIALTY_PROFILE, ADD_SPECIALTY_PROFILE } from '../graphql/Mutations';
import { setContext } from '@apollo/client/link/context';
import { Link } from 'react-router-dom';
import arrow from '../images/arrow.svg';
import bullet from '../images/bullet.svg';
import plus from '../images/plus.svg';




const Profiel = () => {
  const { logout, user } = useAuth();
  // console.log('User information:', user);

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
  const [showEditForm, setShowEditForm] = useState(false)
  const [userIsMedium, setUserIsMedium] = useState(false);
  const [specialisatieId, setSpecialisatieId] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [categoryTitle, setCategoryTitle] = useState('');



  // Haal user info op en alle categorieen op

  const { loading: profileLoading, data: profileData } = useQuery(GET_USER_PROFILE, {
    variables: { id: [user.user.id] }
  });

  const { loading : categoriesLoading, data : categoriesData } = useQuery(GET_CATEGORIES);


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
  
  useEffect(() => {
    // console.log(profileData)
    if (profileData && profileData.user) {
      // Extract data from the query response
      const { id, name, email, gsm } = profileData.user;

      // Set the initial values using the data from the query
      setEmail(email || '');
      setNaam(name || '');
      setGsm(gsm || '');
    }
  }, [profileData]);


  // PROFIEL UPDATEN
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

  const [updateUserProfile, { loading: updateUserLoading, error: updateUserError }] = useMutation(UPDATE_USER_PROFILE, {
    client: client, // Voeg de Apollo Client toe aan de mutatie
  });

  const deleteSpecialtyMutation = useMutation(DELETE_SPECIALTY_PROFILE, {
    client: client
  });

  // console.log(profileData?.user?.categorieen?.filter((specialty) => specialty.id === '308'))
  // console.log(profileData?.user?.categorieen?.filter((specialty) => specialty[0]))


  const [addSpecialtyMutation] = useMutation(ADD_SPECIALTY_PROFILE, {
    client: client,
    onCompleted: () => {
      window.location.reload(); // Ververs de pagina
    },
    onError: (error) => {
      console.error('Fout bij het toevoegen van specialisatie:', error);
    },
  });
  // console.log(selectedSpecialty)

  const addSpecialty = async () => {
    try {
      if (categoryTitle.trim() !== '') {
        
        await addSpecialtyMutation({
          variables: {
            // categorieId,
            categoryTitle,
          },
          context: {
            headers: {
              Authorization: `JWT ${user.jwt}`,
            },
          },
        });

        // Voeg de specialisatie toe aan de lokale staat
        setSpecialisaties([...specialisaties, categoryTitle]);
        // setNieuweSpecialisatie('');

        // Sluit het modal
        setShowModal(false);
      }
    } catch (error) {
      console.error('Fout bij het toevoegen van specialisatie:', error);
    }
  };

  
  const deleteSpecialty = async (userId, specialtyId) => {
    try {
      // setSpecialisaties(specialisaties.filter((specialty) => specialty.id !== specialtyId));
      await deleteSpecialtyMutation({
        variables: { userId, specialisatieId },
        context: {
          headers: {
            Authorization: `JWT ${user.jwt}`,
          },
        },
      });
      // setSpecialisaties(specialisaties.filter((specialty) => specialty.id !== specialtyId));
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error('Error deleting specialty:', error);
    }
  };

  // const handleDeleteSpecialty = async (e) => {
  //   e.preventDefault(); // Prevent the default form submission
  //   try {
  //     // Gebruik de updateUserProfile-mutatie om gebruikersgegevens bij te werken
  //     await updateUserProfile({
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
  //     window.location.reload(); // Refresh the page
  //   } catch (error) {
  //     console.error('Fout bij het bijwerken van het profiel:', error);
  //   }
  // };

  const filteredCategories = profileData?.user?.categorieen?.filter((categorie) =>
    categorie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Alle categorieen ophalen
  const allCategories = categoriesData?.categories.map((categorie) =>
    categorie.title
  );
  // Function to filter the categories and remove the ones that are already in the user's specialties
  const getFilteredCategories = () => {
    const specialtyTitles = profileData?.user?.categorieen?.map((specialty) => specialty.title);
    return allCategories?.filter((categorie) => !specialtyTitles?.includes(categorie));
  };
  // console.log(allCategories)

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
      setEditMode(false);
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error('Fout bij het bijwerken van het profiel:', error);
    }
  };

  return (
    <>
    <h1>AstralAura</h1>
    <div className='wrapper'>
      <div className='profile_intro'>
        <h3 className='page_title'>Mijn Profiel</h3>
        <img className='bullet' src={bullet} alt="bullet" />
        <p>{userIsMedium ? 'MEDIUM' : 'OPDRACHTGEVER'}</p>
      </div>
      {profileData && profileData && (
        <div>
          <p><b>ID:</b> {profileData.user.id}</p>
          <p><b>Naam:</b> {profileData.user.name}</p>
          <p><b>E-mail:</b> {profileData.user.email}</p>
          <p><b>GSM:</b> {profileData.user.gsm}</p>
        </div>
      )}
      <div>
        <button className='button--tertiary' onClick={() => setShowEditForm(!showEditForm)}>
          <div className='edit-button'>
            Profiel bewerken<img src={arrow} alt="arrow" className={showEditForm ? 'rotated' : ''} />
          </div>
        </button>
          {showEditForm && (
            <div>
              <form onSubmit={handleUpdateProfile}>
                <label>
                  Email:
                  <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                  Naam:
                  <input value={naam} onChange={(e) => setNaam(e.target.value)} />
                </label>
                <label>
                  Gsm:
                  <input type="text" value={gsm} onChange={(e) => setGsm(e.target.value)} />
                </label>
                <button type="submit" disabled={updateUserLoading}>
                  Profiel updaten
                </button>
              </form>
              {updateUserLoading && <p>Loading...</p>}
              {updateUserError && <p>Error: {updateUserError.message}</p>}
            </div>
          )}
      </div>

      <div>
        <h3>Mijn opdrachten</h3>
        <button><Link to="/profiel/opdrachten">Mijn opdrachten</Link></button>
      </div>

      {userIsMedium && (
      <div className='profile__specialisaties'>
        <h3>Mijn Specialisaties:</h3>
        {profileData && profileData && (
          <div>
            {profileData.user.categorieen.map((specialisatie, index) => (
              <li key={specialisatie.id}>
                {specialisatie.title}
                <button onClick={() => deleteSpecialty(user.user.id, specialisatie.id)}>Verwijderen</button>
              </li>
            ))}
          </div>
        )}
        <div>
          <button className='button--secondary' onClick={() => setShowModal(true)}>Specialisatie Toevoegen <img src={plus} alt="add" /></button>
        </div>
        {showModal && (
          <div>
            <div>
              {/* <label> Zoek en voeg een specialisatie toe:  */}
              <select type="text" value={categoryTitle} onChange={(e) => setCategoryTitle(e.target.value)} > 
                <option value="">Selecteer een specialisatie...</option> 
                  {getFilteredCategories()?.map((categorie, index) => ( 
                  <option key={index} value={categorie}>{categorie}</option> ))} 
                </select> 
            </div>
            {/* <ul>
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
            </ul> */}
            <button className='button--tertiary' onClick={() => setShowModal(false)}>Annuleren</button>
            <button onClick={addSpecialty}>Toevoegen</button>
          </div>
        )} 
        {/* <div>{specialisaties}</div> */}
      </div>
      )}
      <div className='logout'>
      <button className='button--logout' onClick={logout}>Log uit</button>
      </div>
    </div>
    </>
  )
}

export default Profiel
