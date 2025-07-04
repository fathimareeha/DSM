import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function DashboardLoader() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkTrialStatus = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get("http://127.0.0.1:8000/superadmin_app/deactivate", {
          headers: {
            Authorization: `Token ${token}`,
          }
        });
        console.log(response.data);
        
        if (response.data.trial_status === "expired") {
          // If trial expired, redirect to payment
          navigate("/payment_option");
        } else {
          // If trial is valid, go to homepage
          navigate("/institution_homepage");
        }
      } catch (error) {
        console.error("Trial check failed", error);
        // Optional: navigate to error page or login
      }
    };

    checkTrialStatus();
  }, []);

  return <div>Loading...</div>;
}

export default DashboardLoader;
