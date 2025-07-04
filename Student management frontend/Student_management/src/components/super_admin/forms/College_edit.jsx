import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Input from '../Input';
import Select from 'react-select';
import { stdcode } from '../../../static/Std_codes';

function College_edit({ institution_id }) {
  const [college_name, setName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pin_code, setPincode] = useState('');
  const [location, setLocation] = useState('');
  const [college_type, setType] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [std_code, setStdCode] = useState('');
  const [landline_number, setLandlineNumber] = useState('');
  const [aishe_code, setAishe_code] = useState('');
  const [university, setUniversity] = useState('');
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  const options = stdcode.map((item) => ({
    value: item.code,
    label: `${item.code}`,
  }));

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/superadmin_app/college_list_update_institution/${institution_id}/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        const data = response.data;
        setName(data.college_name);
        setAddress1(data.address1);
        setAddress2(data.address2);
        setCity(data.city);
        setState(data.state);
        setPincode(data.pin_code);
        setLocation(data.location);
        setType(data.college_type);
        setPhone_number(data.phone_number);
        setStdCode(data.std_code);
        setLandlineNumber(data.landline_number);
        setAishe_code(data.aishe_code);
        setUniversity(data.university);
      } catch (error) {
        console.error('Failed to fetch college data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollege();
  }, [institution_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://127.0.0.1:8000/superadmin_app/college_list_update_institution/${institution_id}/`,
        {
          college_name,
          address1,
          address2,
          city,
          state,
          pin_code,
          location,
          college_type,
          phone_number,
          std_code,
          landline_number,
          aishe_code,
          university,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      alert('College updated successfully');
    } catch (error) {
      console.error('Failed to update college:', error);
      alert('Error updating college');
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading college details...</p>;
  }

  return (
    <div className="mt-7 flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full">
        <h1 className="text-2xl font-bold text-center mb-6">COLLEGE REGISTRATION</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="College Name"
            type="text"
            value={college_name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Institution Name"
            required
          />

          <Input
            label="Address Line 1"
            type="text"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            placeholder="Enter Address1"
            required
          />
          <Input
            label="Address Line 2"
            type="text"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            placeholder="Enter Address2 (optional)"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Input
              label="City"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <Input
              label="State"
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
            <Input
              label="Pin Code"
              type="text"
              value={pin_code}
              onChange={(e) => setPincode(e.target.value)}
              required
            />
            <Input
              label="Location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            <Input
              label="AISHE Code"
              type="text"
              value={aishe_code}
              onChange={(e) => setAishe_code(e.target.value)}
              required
            />
            <Input
              label="Phone Number"
              type="number"
              value={phone_number}
              onChange={(e) => setPhone_number(e.target.value)}
              required
            />

            <div className="flex flex-col">
              <label className="font-semibold">Landline Number</label>
              <div className="flex gap-2 items-center">
                <Select
                  className="w-1/5 rounded bg-gray-200 shadow border-b border-b-gray-400 focus:border-blue-900 focus:border-b-2 outline-none"
                  options={options}
                  onChange={(sel) => setStdCode(sel.value)}
                  placeholder="STD"
                />
                <input
                  type="number"
                  value={landline_number}
                  onChange={(e) => setLandlineNumber(e.target.value)}
                  placeholder="Landline Number"
                  className="w-4/5 py-2 rounded bg-gray-200 px-3 shadow border-b border-b-gray-400 focus:border-blue-900 focus:border-b-2 outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold">Type of College</label>
              <select
                value={college_type}
                onChange={(e) => setType(e.target.value)}
                className="w-full py-2 rounded bg-gray-200 px-3 shadow border-b border-b-gray-400 focus:border-blue-900 focus:border-b-2 outline-none"
                required
              >
                <option value="">Select Type</option>
                <option value="private">Private</option>
                <option value="government">Government</option>
                <option value="aided">Aided</option>
                <option value="unaided">Unaided</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold">Universities</label>
              <select
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="w-full py-2 rounded bg-gray-200 px-3 shadow border-b border-b-gray-400 focus:border-blue-900 focus:border-b-2 outline-none"
                required
              >
                <option value="">Select University</option>
                <option value="kerala technical university">Kerala Technical University (KTU)</option>
                <option value="kannur university">Kannur University</option>
                <option value="M G university">Mahatma Gandhi University</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="bg-blue-900 text-white py-2 px-6 rounded-md hover:bg-blue-800 transition"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default College_edit;
