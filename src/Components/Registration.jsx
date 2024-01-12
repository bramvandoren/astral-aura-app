// src/components/Register.js

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_MEDIUM } from '../graphql/users/REGISTER';
import { REGISTER_OPDRACHTGEVER } from '../graphql/users/REGISTER';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userGroup, setUserGroup] = useState('');

  const [naam, setNaam] = useState('');
  const [diploma, setDiploma] = useState(null);
  const [error, setError] = useState(null);

  const [registerMedium, { loading: mediumLoading, error: mediumError }] = useMutation(REGISTER_MEDIUM);
  const [registerOpdrachtgever, { loading: opdrachtgeverLoading, error: opdrachtgeverError }] = useMutation(REGISTER_OPDRACHTGEVER);

  const handleRegister = async () => {
    try {
      if (!userGroup) {
        setError('Kies welke soort member je bent');
        return;
      }

      if (userGroup === 'Medium') {
        const { data } = await registerMedium({ variables: { email, password, diploma } });
        console.log('Medium Registration data:', data);

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
    <div className='wrapper'>
      <div>
        <h1>AstralAura</h1>
      </div>
      <h2>Registreer hier.</h2>
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <select value={userGroup} onChange={(e) => setUserGroup(e.target.value)}>
        <option value="" disabled hidden>Selecteer soort Lid</option>
        <option value="Opdrachtgever">Opdrachtgever</option>
        <option value="Medium">Medium</option>
      </select>
      {userGroup === 'Opdrachtgever' && (
        <div>
          <input type="text" placeholder="Naam" value={naam} onChange={(e) => setNaam(e.target.value)} />
        </div>
      )}
      {userGroup === 'Medium' && (
        <input type="file" accept=".png" onChange={(e) => setDiploma(e.target.files[0])} />
      )}
      <button onClick={handleRegister} disabled={mediumLoading || opdrachtgeverLoading}>
        {mediumLoading || opdrachtgeverLoading ? 'Aan het registreren...' : 'Registreer'}
      </button>
      {mediumError && <p>Error: {mediumError.message}</p>}
      {opdrachtgeverError && <p>Error: {opdrachtgeverError.message}</p>}
      {error && <p>Error: {error}</p>}
      <p>
        Alreeds een account?
      </p>
      <Link to="/login">Log hier in</Link>
    </div>
  );
};

export default Register;
