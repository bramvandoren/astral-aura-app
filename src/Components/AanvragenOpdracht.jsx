import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { AANMELDEN_OPDRACHT_MUTATION } from '../graphql/Mutations'; // Zorg ervoor dat je deze query hebt
import { GET_OPDRACHT } from '../graphql/Queries';


const AanvragenOpdracht = ({ opdrachtId, specialiteit }) => {
  const [aanmeldingTekst, setAanmeldingTekst] = useState('');

  const [aanmeldenOpdracht, { loading: aanmeldenLoading, error: aanmeldenError }] = useMutation(AANMELDEN_OPDRACHT_MUTATION, {
    // Hier zou je de variabelen voor de mutatie moeten instellen, bijvoorbeeld: variables: { opdrachtId, aanmeldingTekst, specialiteit }
    // Voeg eventueel ook een update-functie toe om de UI bij te werken na een succesvolle aanmelding
    variables: { opdrachtId, aanmeldingTekst, specialiteit },
    refetchQueries: [{ query: GET_OPDRACHT, variables: { id: opdrachtId } }], // Refetch de opdracht na een succesvolle aanmelding
  });

  const handleAanmelden = async () => {
    try {
      // Voer de aanmeldenOpdracht-mutatie uit met de benodigde variabelen
      await aanmeldenOpdracht();
      setAanmeldingTekst(''); // Leeg het tekstveld na een succesvolle aanmelding
      // Voeg hier eventueel logica toe om de UI bij te werken na een succesvolle aanmelding
    } catch (error) {
      console.error('Fout bij aanmelden voor opdracht:', error);
    }
  };

  return (
    <div>
      <h2>Aanmelden voor opdracht</h2>
      <p>{specialiteit}</p>
      <textarea
        value={aanmeldingTekst}
        onChange={(e) => setAanmeldingTekst(e.target.value)}
        placeholder="Waarom ben jij de juiste persoon voor deze opdracht?"
      />
      <button onClick={handleAanmelden} disabled={aanmeldenLoading}>
        Aanmelden
      </button>
      {aanmeldenLoading && <p>Loading...</p>}
      {aanmeldenError && <p>Error: {aanmeldenError.message}</p>}
    </div>
  );
};

export default AanvragenOpdracht;
