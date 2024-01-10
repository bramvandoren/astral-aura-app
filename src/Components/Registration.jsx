// src/components/Register.js

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_MEDIUM } from '../graphql/users/REGISTER';
import { REGISTER_OPDRACHTGEVER } from '../graphql/users/REGISTER';
// import { MEDIUM_REGISTRATIE_MUTATION } from '../graphql/users/MEDIUM_REGISTRATION'; // Voeg de daadwerkelijke mutatie toe
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userGroup, setUserGroup] = useState(''); // Assuming a default user group

  const [naam, setNaam] = useState('');
  // const [gsm, setGsm] = useState('');
  // const [adres, setAdres] = useState('');
  // const [socialMedia, setSocialMedia] = useState('');

  // Exta veld voor Medium
  const [diploma, setDiploma] = useState(null);
  const [error, setError] = useState(null);

  // Voeg de daadwerkelijke mutatie toe
  const [registerMedium, { loading: mediumLoading, error: mediumError }] = useMutation(REGISTER_MEDIUM);
  const [registerOpdrachtgever, { loading: opdrachtgeverLoading, error: opdrachtgeverError }] = useMutation(REGISTER_OPDRACHTGEVER);
  // const [mediumRegistratie, { loading: mediumRegistratieLoading, error: mediumRegistratieError }] = useMutation(MEDIUM_REGISTRATIE_MUTATION);

  const handleRegister = async () => {
    try {
      if (!userGroup) {
        setError('Kies welke soort member je bent');
        return; // Exit the function if no value is selected
      }

      if (userGroup === 'Medium') {
        const { data } = await registerMedium({ variables: { email, password } });
        console.log('Medium Registration data:', data);

        // Voeg de logica toe voor het uploaden van het mediumdiploma
        const mediumRegistratieResponse = await registerMedium({
          variables: {
            mediumId: data.registerMedium.id,
            diploma: diploma,
          },
        });

        // Handle success, redirect, or perform other actions as needed
      } else if (userGroup === 'Opdrachtgever') {
        const { data } = await registerOpdrachtgever({ variables: { email, password, naam } });
        console.log('Opdrachtgever Registration data:', data);
        // Handle success, redirect, or perform other actions as needed
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div>
      <div>
        <h1>AstralAura</h1>
      </div>
      <h2>Register</h2>
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {/* You can add more input fields for other registration details */}
      <select value={userGroup} onChange={(e) => setUserGroup(e.target.value)}>
        <option value="" disabled hidden>Select Soort Member</option>
        <option value="Opdrachtgever">Opdrachtgever</option>
        <option value="Medium">Medium</option>
      </select>
      {userGroup === 'Opdrachtgever' && (
        <div>
          <input type="text" placeholder="Naam" value={naam} onChange={(e) => setNaam(e.target.value)} />
          {/* <input type="text" placeholder="GSM" value={gsm} onChange={(e) => setGsm(e.target.value)} />
          <input type="text" placeholder="Adres" value={adres} onChange={(e) => setAdres(e.target.value)} />
          <input type="text" placeholder="Social Media" value={socialMedia} onChange={(e) => setSocialMedia(e.target.value)} /> */}
        </div>
      )}
      {userGroup === 'Medium' && (
        <input type="file" accept=".png" onChange={(e) => setDiploma(e.target.files[0])} />
      )}
      <button onClick={handleRegister} disabled={mediumLoading || opdrachtgeverLoading || mediumLoading}>
        {mediumLoading || opdrachtgeverLoading || mediumLoading ? 'Registering...' : 'Register'}
      </button>
      {mediumError && <p>Error: {mediumError.message}</p>}
      {opdrachtgeverError && <p>Error: {opdrachtgeverError.message}</p>}
      {mediumError && <p>Error: {mediumError.message}</p>}
      {error && <p>Error: {error}</p>}
      <p>
        Alreeds een account? 
        <Link to="/login">Log hier in</Link>
      </p>
    </div>
  );
};

export default Register;
