import React, { useState } from 'react';
import { useAuth } from '../Auth/AuthContainer';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { CREATE_OPDRACHT } from '../graphql/Mutations';


const CreateOpdracht = () => {
  // State for form input values
  const [title, setTitle] = useState('');
  const [omschrijving, setOmschrijving] = useState('');
  const [plaats, setPlaats] = useState('');
  const [deadline, setDeadline] = useState('');
  const { user } = useAuth();


  // Apollo Client useMutation hook
  const [createOpdrachtMutation, { loading, error }] = useMutation(CREATE_OPDRACHT);

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
          status: 'disabled',
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
    <div>
      <h2>Maak Opdracht</h2>
      {/* Add your form fields here */}
      <form onSubmit={handleCreateOpdracht}>
        {/* Title input */}
        <label>
          Vraag:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        {/* Omschrijving input */}
        <label>
          Omschrijving:
          <textarea value={omschrijving} onChange={(e) => setOmschrijving(e.target.value)} />
        </label>
        {/* Plaats input */}
        <label>
          Plaats:
          <input type="text" value={plaats} onChange={(e) => setPlaats(e.target.value)} />
        </label>
        {/* Deadline input */}
        <label>
          Deadline:
          <input type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
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
