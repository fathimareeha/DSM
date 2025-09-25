import React, { useState, useEffect } from "react";
import axios from "axios";

// Convert number to Roman numeral
const toRoman = (num) => {
  const romans = [
    ["M", 1000], ["CM", 900], ["D", 500], ["CD", 400],
    ["C", 100], ["XC", 90], ["L", 50], ["XL", 40],
    ["X", 10], ["IX", 9], ["V", 5], ["IV", 4], ["I", 1],
  ];
  let result = "";
  for (let [letter, value] of romans) {
    while (num >= value) {
      result += letter;
      num -= value;
    }
  }
  return result;
};

function StudentCreate() {
  const [formData, setFormData] = useState({
    // 🧑‍🎓 Student Personal Details
    admissionNumber: "",
    rollNo: "",
    studentName: "",
    gender: "",
    dob: "",
    bloodGroup: "",
    nationality: "",
    religion: "",
    aadharNo: "",
    profilePic: null,

    // 🏠 Contact & Address
    email: "",
    phone: "",
    alternatePhone: "",
    studentAddress: "",

    // 📚 Academic Details
    standard: "",
    section: "",
    admissionDate: "",
    previousSchool: "",
    academicYear: "",

    // 👨‍👩‍👧 Parent / Guardian Details
    fatherName: "",
    fatherOccupation: "",
    fatherPhone: "",
    motherName: "",
    motherOccupation: "",
    motherPhone: "",
    guardianName: "",
    guardianRelation: "",
    guardianPhone: "",

    // 🏥 Health / Emergency Info
    emergencyName: "",
    emergencyPhone: "",
    medicalConditions: "",
    doctorContact: "",

    // 🏫 Other Details
    transportNeeded: "",
    busRoute: "",
    hostelNeeded: "",
    activities: "",
    remarks: "",
  });

  const [standards, setStandards] = useState([]);
  const [sections, setSections] = useState([]);

  // Fetch Standards
  useEffect(() => {
    const fetchStandards = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/schoolapp/standards/");
        setStandards(res.data);
      } catch (err) {
        console.error("Error fetching standards:", err);
      }
    };
    fetchStandards();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Gmail field special case
  const handleEmailChange = (e) => {
    const username = e.target.value.replace("@gmail.com", "");
    setFormData({ ...formData, email: username + "@gmail.com" });
  };

  // Standard & Section
  const handleStandardChange = (e) => {
    const selectedStandardId = e.target.value;
    setFormData({ ...formData, standard: selectedStandardId, section: "" });

    const selectedStandard = standards.find((std) => std.id == selectedStandardId);
    if (selectedStandard) {
      setSections(selectedStandard.sections);
    } else {
      setSections([]);
    }
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();
      for (let key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      await axios.post("http://127.0.0.1:8000/schoolapp/studentcreate/", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      });
      alert("✅ Student created successfully!");
    } catch (error) {
      console.error("❌ Error creating student:", error);
      alert("Failed to create student.");
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-indigo-800 mb-6">Create Student</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* 🧑‍🎓 Student Personal Details */}
        <SectionHeader title="🧑‍🎓 Student Personal Details" />
        <InputField label="Admission Number" name="admissionNumber" value={formData.admissionNumber} onChange={handleChange} required />
        <InputField label="Roll Number" name="rollNo" value={formData.rollNo} onChange={handleChange} />
        <InputField label="Full Name" name="studentName" value={formData.studentName} onChange={handleChange} required />

        <SelectField label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={["Male","Female","Other"]} />
        <InputField type="date" label="Date of Birth" name="dob" value={formData.dob} onChange={handleChange} />
        <InputField label="Blood Group" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} />
        <InputField label="Nationality" name="nationality" value={formData.nationality} onChange={handleChange} />
        <InputField label="Religion / Caste" name="religion" value={formData.religion} onChange={handleChange} />
        <InputField label="Aadhar / National ID" name="aadharNo" value={formData.aadharNo} onChange={handleChange} />
        <FileField label="Photo" name="profilePic" onChange={handleChange} />

        {/* 🏠 Contact & Address */}
        <SectionHeader title="🏠 Contact & Address" />
        <InputField label="Email" name="email" value={formData.email.replace("@gmail.com","")} onChange={handleEmailChange} />
        <InputField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} />
        <InputField label="Alternate Phone" name="alternatePhone" value={formData.alternatePhone} onChange={handleChange} />
        <TextAreaField label="Address" name="studentAddress" value={formData.studentAddress} onChange={handleChange} />

        {/* 📚 Academic Details */}
        <SectionHeader title="📚 Academic Details" />
        <SelectStandard standards={standards} value={formData.standard} onChange={handleStandardChange} />
        <SelectSection sections={sections} value={formData.section} onChange={handleChange} />
        <InputField type="date" label="Admission Date" name="admissionDate" value={formData.admissionDate} onChange={handleChange} />
        <InputField label="Previous School" name="previousSchool" value={formData.previousSchool} onChange={handleChange} />
        <InputField label="Academic Year" name="academicYear" value={formData.academicYear} onChange={handleChange} />

        {/* 👨‍👩‍👧 Parent / Guardian Details */}
        <SectionHeader title="👨‍👩‍👧 Parent / Guardian Details" />
        <InputField label="Father’s Name" name="fatherName" value={formData.fatherName} onChange={handleChange} />
        <InputField label="Father’s Occupation" name="fatherOccupation" value={formData.fatherOccupation} onChange={handleChange} />
        <InputField label="Father’s Phone" name="fatherPhone" value={formData.fatherPhone} onChange={handleChange} />
        <InputField label="Mother’s Name" name="motherName" value={formData.motherName} onChange={handleChange} />
        <InputField label="Mother’s Occupation" name="motherOccupation" value={formData.motherOccupation} onChange={handleChange} />
        <InputField label="Mother’s Phone" name="motherPhone" value={formData.motherPhone} onChange={handleChange} />
        <InputField label="Guardian Name" name="guardianName" value={formData.guardianName} onChange={handleChange} />
        <InputField label="Guardian Relation" name="guardianRelation" value={formData.guardianRelation} onChange={handleChange} />
        <InputField label="Guardian Phone" name="guardianPhone" value={formData.guardianPhone} onChange={handleChange} />


        {/* 🏫 Other Details */}
        <SectionHeader title="🏫 Other Details" />
        <SelectField label="Transport Needed" name="transportNeeded" value={formData.transportNeeded} onChange={handleChange} options={["Yes","No"]} />
        <InputField label="Bus Route / Vehicle Number" name="busRoute" value={formData.busRoute} onChange={handleChange} />
        <SelectField label="Hostel Needed" name="hostelNeeded" value={formData.hostelNeeded} onChange={handleChange} options={["Yes","No"]} />
        <InputField label="Extra-Curricular Activities" name="activities" value={formData.activities} onChange={handleChange} />
        <TextAreaField label="Special Notes / Remarks" name="remarks" value={formData.remarks} onChange={handleChange} />

        {/* Submit */}
        <div className="col-span-1 md:col-span-2 flex justify-end">
          <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            Save Student
          </button>
        </div>
      </form>
    </div>
  );
}

/* 🔹 Reusable Components */
const InputField = ({ label, type = "text", name, value, onChange, required }) => (
  <div>
    <label className="block font-medium">{label}</label>
    <input type={type} name={name} value={value} onChange={onChange} className="w-full p-2 border rounded" required={required} />
  </div>
);

const TextAreaField = ({ label, name, value, onChange }) => (
  <div className="col-span-1 md:col-span-2">
    <label className="block font-medium">{label}</label>
    <textarea name={name} value={value} onChange={onChange} className="w-full p-2 border rounded" />
  </div>
);

const FileField = ({ label, name, onChange }) => (
  <div>
    <label className="block font-medium">{label}</label>
    <input type="file" name={name} accept="image/*" onChange={onChange} className="w-full p-2 border rounded" />
  </div>
);

const SelectField = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="block font-medium">{label}</label>
    <select name={name} value={value} onChange={onChange} className="w-full p-2 border rounded">
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

const SectionHeader = ({ title }) => (
  <div className="col-span-1 md:col-span-2 mt-4">
    <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
  </div>
);

const SelectStandard = ({ standards, value, onChange }) => (
  <div>
    <label className="block font-medium">Standard</label>
    <select name="standard" value={value} onChange={onChange} className="w-full p-2 border rounded">
      <option value="">Select Standard</option>
      {standards.map((std, index) => (
        <option key={std.id} value={std.id}>{toRoman(index + 1)}</option>
      ))}
    </select>
  </div>
);

const SelectSection = ({ sections, value, onChange }) => (
  <div>
    <label className="block font-medium">Section</label>
    <select name="section" value={value} onChange={onChange} className="w-full p-2 border rounded" disabled={!sections.length}>
      <option value="">Select Section</option>
      {sections.map((sec) => (
        <option key={sec.id} value={sec.id}>{sec.name}</option>
      ))}
    </select>
  </div>
);

export default StudentCreate;
