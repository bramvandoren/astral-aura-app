// OpdrachtIndienen.js
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { INDIEN_OPDRACHT_MUTATION } from '../graphql/mutations';

const OpdrachtIndienen = () => {
  const [vraag, setVraag] = useState('');
  const [omschrijving, setOmschrijving] = useState('');
  const [plaats, setPlaats] = useState('');
  const [tijdstip, setTijdstip] = useState('');

  const [indienOpdracht, { loading, error }] = useMutation(INDIEN_OPDRACHT_MUTATION);

  const handleOpdrachtIndienen = async () => {
    try {
      const { data } = await indienOpdracht({
        variables: { vraag, omschrijving, plaats, tijdstip },
      });

      // Verwerk het resultaat van de ingediende opdracht, bijv. door gebruiker door te sturen naar een overzichtspagina.
    } catch (error) {
      console.error('Fout bij het indienen van de opdracht:', error.message);
    }
  };

  return (
    <div>
      <h2>Opdracht Indienen</h2>
      <input type="text" placeholder="Vraag" onChange={(e) => setVraag(e.target.value)} />
      <input type="text" placeholder="Omschrijving" onChange={(e) => setOmschrijving(e.target.value)} />
      <input type="text" placeholder="Plaats" onChange={(e) => setPlaats(e.target.value)} />
      <input type="text" placeholder="Tijdstip" onChange={(e) => setTijdstip(e.target.value)} />
      <button onClick={handleOpdrachtIndienen} disabled={loading}>Indienen</button>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default OpdrachtIndienen;
