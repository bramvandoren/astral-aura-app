// // OpdrachtVoltooien.js
// import React from 'react';
// import { useMutation } from '@apollo/client';
// import { VOLTOOI_OPDRACHT_MUTATION } from '../graphql/Mutations';

// const OpdrachtVoltooien = () => {
//   const [voltooienOpdracht, { loading, error }] = useMutation(VOLTOOI_OPDRACHT_MUTATION);

//   const handleOpdrachtVoltooien = async (opdrachtId) => {
//     try {
//       const { data } = await voltooienOpdracht({
//         variables: { opdrachtId },
//       });

//       // Verwerk het resultaat van het voltooien van de opdracht, bijv. door gebruiker door te sturen naar een overzichtspagina.
//     } catch (error) {
//       console.error('Fout bij het voltooien van de opdracht:', error.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Opdracht Voltooien</h2>
//       <button onClick={() => handleOpdrachtVoltooien(opdrachtId)} disabled={loading}>Voltooien</button>
//       {error && <p>Error: {error.message}</p>}
//     </div>
//   );
// };

// export default OpdrachtVoltooien;
