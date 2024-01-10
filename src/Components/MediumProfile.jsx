// MediumProfile.js
import React from 'react';
import { useParams } from 'react-router-dom';

function MediumProfile() {
  const { mediumId } = useParams();

  // Fetch and display detailed information about the specified medium
  // You can use the mediumId parameter to fetch the specific medium's data

  return (
    <div>
      <h1>Medium Profile</h1>
      {/* Display detailed information about the medium */}
    </div>
  );
}

export default MediumProfile;
