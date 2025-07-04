import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import School_edit from '../../components/super_admin/forms/School_edit';
import SchoolForm from '../../components/super_admin/forms/SchoolForm';
import College_edit from '../../components/super_admin/forms/College_edit';
import CollegeForm from '../../components/super_admin/forms/CollegeForm';

function Edit_institutionForm() {
  const { institution_id } = useParams();
  const [selectedType, setSelectedType] = useState('');
  const [schoolExists, setSchoolExists] = useState(null);
  const [collegeExists, setCollegeExists] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedType || !institution_id) return;

      setSchoolExists(null);
      setCollegeExists(null);

      if (selectedType === 'school') {
        try {
          const res = await axios.get(
            `http://127.0.0.1:8000/superadmin_app/school_list_update_institution/${institution_id}/`,
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );
          if (res.data && res.data.id) {
            setSchoolExists(true);
          } else {
            setSchoolExists(false);
          }
        } catch {
          setSchoolExists(false);
        }
      } else if (selectedType === 'college') {
        try {
          const res = await axios.get(
            `http://127.0.0.1:8000/superadmin_app/college_list_update_institution/${institution_id}/`,
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );
          if (res.data && res.data.id) {
            setCollegeExists(true);
          } else {
            setCollegeExists(false);
          }
        } catch {
          setCollegeExists(false);
        }
      }
    };

    fetchData(); // ✅ Call fetchData inside useEffect
  }, [selectedType, institution_id]);

  const renderForm = () => {
    if (selectedType === 'school') {
      if (schoolExists === null) return <p>Loading...</p>;
      return schoolExists ? (
        <School_edit institution_id={institution_id} />
      ) : (
        <SchoolForm institution_id={institution_id} />
      );
    }

    if (selectedType === 'college') {
      if (collegeExists === null) return <p>Loading...</p>;
      return collegeExists ? (
        <College_edit institution_id={institution_id} />
      ) : (
        <CollegeForm institution_id={institution_id} />
      );
    }

    return null;
  };

  return (
    <div>
      <h3>Select Institution Type</h3>
      <label>
        <input
          type="radio"
          value="school"
          checked={selectedType === 'school'}
          onChange={(e) => setSelectedType(e.target.value)}
        />
        School
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="college"
          checked={selectedType === 'college'}
          onChange={(e) => setSelectedType(e.target.value)}
        />
        College
      </label>

      <div style={{ marginTop: '20px' }}>{renderForm()}</div>
    </div>
  );
}

export default Edit_institutionForm;
