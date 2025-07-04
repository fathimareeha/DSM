
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Institution_adminHomepage() {
  const [data, setData] = useState(null);      // Holds API data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);     // Error state

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("http://127.0.0.1:8000/superadmin_app/institution_homepage", {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then(res => {
      setData(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.error("Error fetching homepage data:", err);
      setError("Failed to load homepage data.");
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading homepage...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Institution Admin Homepage</h2>
      <p>{data.message}</p>
      <p>Role: {data.role}</p>
      <p>{data.homepage}</p>
    </div>
  );
}

export default Institution_adminHomepage;
