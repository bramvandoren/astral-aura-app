import React, { useState } from 'react';
import { useAuth } from '../Auth/AuthContainer';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { CREATE_OPDRACHT } from '../graphql/Mutations';
import { Link } from 'react-router-dom';
import { route, Routes } from '../core/routes';


const CreateOpdracht = () => {
  // State for form input values
  const [title, setTitle] = useState('');
  const [omschrijving, setOmschrijving] = useState('');
  const [plaats, setPlaats] = useState('');
  const [deadline, setDeadline] = useState('');
  const { user } = useAuth();


  // Apollo Client useMutation hook
  const [createOpdrachtMutation, { loading, error }] = useMutation(CREATE_OPDRACHT, {
    onCompleted: () => {
      window.location.reload();
      alert("Opdracht is verzonden!");
    },
  });

  // Function to handle form submission
  const handleCreateOpdracht = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      // Call the createOpdrachtMutation with the input values
      const { data } = await createOpdrachtMutation({
        variables: {
          authorId: user.user.id,
          title,
          omschrijving,
          plaats,
          deadline,
          // status: 'disabled',
        },
      });

      // Handle the response data as needed
      console.log('Opdracht created:', data.save_missions_default_Entry);
    } catch (err) {
      // Handle errors
      console.error('Error creating Opdracht:', err.message);
    }
  };

  return (
    <div className='wrapper'>
      <div className='back'>
       <Link to={"/"}>Terug</Link>
      </div>
      <h3>Maak Opdracht</h3>
      {/* Add your form fields here */}
      <form onSubmit={handleCreateOpdracht}>
        {/* Title input */}
        <label>
          Vraag: <span className='required'>*</span>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='bv. Mijn zoon is bezeten door de duivel!' required/>
        </label>
        {/* Omschrijving input */}
        <label>
          Omschrijving: <span className='required'>*</span>
          <textarea value={omschrijving} onChange={(e) => setOmschrijving(e.target.value)} required/>
        </label>
        {/* Plaats input */}
        <label>
          Plaats: <span className='required'>*</span>
          <input type="text" value={plaats} onChange={(e) => setPlaats(e.target.value)} required/>
        </label>
        {/* Deadline input */}
        <label>
          Deadline: <span className='required'>*</span>
          <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
        </label>
        {/* Submit button */}
        <button type="submit" disabled={loading}>
           Stuur opdracht
        </button>
      </form>
      {/* Display loading or error messages as needed */}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

    </div>
  );
};

export default CreateOpdracht;
