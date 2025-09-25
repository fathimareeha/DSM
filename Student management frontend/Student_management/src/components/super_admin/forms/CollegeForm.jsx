import React, { useContext, useState ,useEffect} from 'react';
import Input from '../Input';
import { SuperadminContext } from '../../../context/super_admin/Superadmin_Context';
import { stdcode } from '../../../static/Std_codes';
import Select from 'react-select';
import Loader from '../Loader';
import axios from 'axios';

function CollegeForm() {
  const [college_name, setName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const [pin_code, setPincode] = useState('');
  const [pincodeOptions, setPincodeOptions] = useState([]);
  const [location, setLocation] = useState('');
  const [college_type, setType] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [std_code, setStdCode] = useState('');
  const [landline_number, setLandlineNumber] = useState('');
  const [aishe_code,setAishe_code]=useState('')
 
  const [created_date, setCreated_date] = useState('');
  const [activated_date, setActivated_date] = useState('');
  const [universities, setUniversities] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [logo, setLogo] = useState(null);


  const token = localStorage.getItem("token");

const [stdCodeOptions, setStdCodeOptions] = useState([]);


//fetch std code
useEffect(() => {
  fetch("http://localhost:8000/superadmin_app/std-codes/")
    .then(res => res.json())
    .then(data => setStdCodeOptions(data))
    .catch(err => console.error("Error fetching STD codes:", err));
}, []);


  //fech pin code
    useEffect(() => {
      fetch("http://localhost:8000/superadmin_app/pincodes/")
        .then(res => res.json())
        .then(data => {
          const options = data.map(pin => ({
            value: pin,
            label: pin
          }));
          setPincodeOptions(options);
        })
        .catch(err => console.error("Error fetching pincodes:", err));
    }, []);
  

// Fetch universities from your backend
   useEffect(() => {
    
    axios.get('http://127.0.0.1:8000/superadmin_app/university',{
        headers: { Authorization: `Token ${token}` },
      })
      .then(res => {
        console.log("University API Response:", res.data); 
        setUniversities(res.data);
      })
      .catch(err => {
        console.error("Error fetching universities", err);
      });
  }, []);
  const {college_create,institution_id,loading}=useContext(SuperadminContext)
    const handle_submit =  (e) => {
      e.preventDefault();
      college_create(institution_id,college_name, address1, address2, district, state, pin_code, aishe_code, location, phone_number,std_code, landline_number,college_type, selectedUniversity,logo);
      
    };
    const options = stdcode.map(item => ({
                        value: item.code,
                        label: ` ${item.code}`
                    }));
    

    
  return (
    <div className="mt-7 flex items-center justify-center px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full ">
        <h1 className="text-2xl font-bold text-center mb-6">COLLEGE REGISTRATION</h1>
        <form onSubmit={handle_submit} className="space-y-6">

          <Input
            label="College Name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Institution Name"
            required={true}
          />

          <Input
            label="Address Line 1"
            type="text"
            onChange={(e) => setAddress1(e.target.value)}
            placeholder="Enter Address1"
            required={true}
          />
          <Input
            label="Address Line 2"
            type="text"
            onChange={(e) => setAddress2(e.target.value)}
            placeholder="Enter Address2 (optional)"
            required={false}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Input
              label="District"
              type="text"
              onChange={(e) => setDistrict(e.target.value)}
              placeholder="District"
              required={true}
            />
            <Input
              label="State"
              type="text"
              onChange={(e) => setState(e.target.value)}
              placeholder="State"
              required={true}
            />
            <div className="flex flex-col">
              <label className="font-semibold">Pin Code</label>
              <Select
                options={pincodeOptions}
                onChange={(selected) => setPincode(selected.value)}
                placeholder="Select Pin Code"
                className="bg-gray-200 rounded shadow"
              />
            </div>
            <Input
              label="Location"
              type="text"
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              required={false}
            />
            <Input
              label="AISHE Code"
              type="text"
              onChange={(e) => setAishe_code(e.target.value)}
              placeholder="Enter Code"
              required={false}
            />
            <Input
              label="Phone Number"
              type="number"
              onChange={(e) => setPhone_number(e.target.value)}
              placeholder="Phone Number"
              required={true}
            />
            <div className="flex flex-col">
              <label className=" font-semibold">Landline Number</label>
              <div className="flex gap-2 items-center">
                {/* STD Code Select */}
               

                <Select
  className="w-1/5 rounded bg-gray-200 shadow border-b border-b-gray-400 focus:border-blue-900 focus:border-b-2 outline-none"
  options={stdCodeOptions}
  onChange={(sel) => setStdCode(sel.value)}
  placeholder="STD"
/>


                {/* Landline Number Input */}
                <input
                  type="number"
                  placeholder="Landline Number(optional)"
                  onChange={(e) => setLandlineNumber(e.target.value)}
                  className="w-4/5 py-2 rounded bg-gray-200 px-3 shadow border-b border-b-gray-400 focus:border-blue-900 focus:border-b-2 outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">Type of College</label>
              <select
                className="w-full  py-2 rounded bg-gray-200 px-3 shadow border-b border-b-gray-400 focus:border-blue-900 focus:border-b-2 outline-none"
                onChange={(e) => setType(e.target.value)} 
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
        className="w-full py-2 rounded bg-gray-200 px-3 shadow border-b border-b-gray-400 focus:border-blue-900 focus:border-b-2 outline-none"
        onChange={(e) => setSelectedUniversity(e.target.value)}
        value={selectedUniversity}
      >
        <option value="">Select university</option>
        {universities.map((uni) => (
          <option key={uni.id} value={uni.id}>
            {uni.name}
          </option>
        ))}
      </select>
    </div>
    <div className="flex flex-col">
  <label className="font-semibold">College Logo</label>
  <input
    type="file"
    accept="image/*"
    onChange={(e) => setLogo(e.target.files[0])}
    className="w-full py-2 rounded bg-gray-200 px-3 shadow border-b border-b-gray-400 focus:border-blue-900 focus:border-b-2 outline-none"
  />
</div>

          </div>

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="bg-blue-900 text-white py-2 px-6 rounded-md hover:bg-blue-800 transition"
            >
              {loading?<Loader/>: 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CollegeForm;
