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
          navigate("/payment_option");
        } else {
          // ✅ Check institution type from localStorage
          const institutionType = localStorage.getItem("institution_type");

          if (institutionType === "school") {
            window.location.href = "http://localhost:5174/admin/dashboard";
          } else if (institutionType === "college") {
            window.location.href = "http://localhost:5173/admin/dash";
          } 
          else {
          console.warn("No valid institution type. Redirecting to login.");
          navigate("/login");
        }
        }
      } catch (error) {
        console.error("Trial check failed", error);
        // Optional: navigate("/login");
      }
    };

    checkTrialStatus();
  }, []);

  return <div>Loading...</div>;
}

export default DashboardLoader;
