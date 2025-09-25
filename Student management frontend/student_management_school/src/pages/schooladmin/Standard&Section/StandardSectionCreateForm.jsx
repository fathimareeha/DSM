// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function StandardSectionCreateForm() {
//   const [standards, setStandards] = useState([]);
//   const [sections, setSections] = useState([]);
//   const [newStandard, setNewStandard] = useState("");
//   const [newSection, setNewSection] = useState("");
//   const [selectedStandard, setSelectedStandard] = useState("");
//   const [message, setMessage] = useState("");
//   const [loadingStandards, setLoadingStandards] = useState(false);
//   const [loadingSections, setLoadingSections] = useState(false);

//   // Convert number to Roman numeral (1-10)
//   const toRoman = (num) => {
//     const romans = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
//     return romans[num - 1] || num;
//   };

//   // Fetch all standards
//   const fetchStandards = () => {
//     setLoadingStandards(true);
//     axios
//       .get("http://127.0.0.1:8000/schoolapp/standards/")
//       .then((res) => {
//         const validStandards = res.data.filter((s) => s.name);
//         setStandards(validStandards);
//       })
//       .catch((err) => console.log(err))
//       .finally(() => setLoadingStandards(false));
//   };

//   useEffect(() => {
//     fetchStandards();
//   }, []);

//   // Reset message after 3 seconds
//   useEffect(() => {
//     if (message) {
//       const timer = setTimeout(() => setMessage(""), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [message]);

//   // Fetch sections when a standard is selected
//   const handleStandardChange = (e) => {
//     const standardId = e.target.value;
//     setSelectedStandard(standardId);
//     setSections([]);
//     setNewSection("");
//     if (!standardId) return;

//     setLoadingSections(true);
//     axios
//       .get(`http://127.0.0.1:8000/schoolapp/standards/${standardId}/sections/`)
//       .then((res) => {
//         const validSections = res.data.filter((sec) => sec.name);
//         setSections(validSections);
//       })
//       .catch((err) => console.log(err))
//       .finally(() => setLoadingSections(false));
//   };

//   // Create new Standard
//   const handleStandardSubmit = (e) => {
//     e.preventDefault();
//     const standardNumber = parseInt(newStandard);

//     if (!standardNumber || standardNumber < 1 || standardNumber > 10) {
//       setMessage("Please enter a number between 1 and 10.");
//       setNewStandard(""); // reset input
//       return;
//     }

//     const exists = standards.some((s) => parseInt(s.name) === standardNumber);
//     if (exists) {
//       setMessage(`Standard ${toRoman(standardNumber)} already exists.`);
//       setNewStandard(""); // ✅ reset input if exists
//       return;
//     }

//     axios
//       .post("http://127.0.0.1:8000/schoolapp/standards/create/", { name: standardNumber })
//       .then((res) => {
//         setMessage(`Standard ${toRoman(res.data.name)} created successfully!`);
//         setNewStandard("");       // reset input
//         setSelectedStandard("");  // reset dropdown
//         setSections([]);          // clear sections
//         fetchStandards();
//       })
//       .catch(() => setMessage("Error creating standard"));
//   };

//   // Create new Section
//   const handleSectionSubmit = (e) => {
//     e.preventDefault();
//     if (!selectedStandard || !newSection) return;

//     const duplicateSection = sections.some(
//       (sec) => sec.name.toUpperCase() === newSection.toUpperCase()
//     );
//     if (duplicateSection) {
//       setMessage(`Section ${newSection.toUpperCase()} already exists for this standard.`);
//       setNewSection("");        // ✅ reset input if duplicate
//       setSelectedStandard("");  // ✅ reset dropdown
//       setSections([]);          // ✅ clear sections
//       return;
//     }

//     axios
//       .post("http://127.0.0.1:8000/schoolapp/sections/create/", {
//         name: newSection.toUpperCase(),
//         standard: selectedStandard,
//       })
//       .then((res) => {
//         setMessage(`Section ${res.data.name} created successfully!`);
//         setNewSection("");        // reset input
//         setSelectedStandard("");  // reset dropdown
//         setSections([]);          // clear sections
//       })
//       .catch(() => setMessage("Error creating section"));
//   };

//   return (
//     <div className="max-w-md md:max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
//       {message && (
//         <div className="mb-4 p-3 text-green-800 bg-green-100 rounded">{message}</div>
//       )}

//       {/* Create Standard Form */}
//       <form onSubmit={handleStandardSubmit} className="mb-8">
//         <h3 className="text-xl font-semibold mb-3 text-gray-700">Create Standard</h3>
//         <div className="flex gap-2">
//           <input
//             type="number"
//             placeholder="Enter Standard (1 - 10)"
//             value={newStandard}
//             onChange={(e) => setNewStandard(e.target.value)}
//             min="1"
//             max="10"
//             className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <button
//             type="submit"
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//           >
//             Create
//           </button>
//         </div>
//       </form>

//       {/* Create Section Form */}
//       <form onSubmit={handleSectionSubmit}>
//         <h3 className="text-xl font-semibold mb-3 text-gray-700">Create Section</h3>
//         <div className="flex flex-col gap-3">
//           {loadingStandards ? (
//             <p>Loading standards...</p>
//           ) : (
//             <select
//               value={selectedStandard}
//               onChange={handleStandardChange}
//               className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//             >
//               <option value="">Select Standard</option>
//               {standards.map((s) => (
//                 <option key={s.id} value={s.id}>
//                   {toRoman(parseInt(s.name))}
//                 </option>
//               ))}
//             </select>
//           )}

//           <input
//             type="text"
//             placeholder="Section Name (e.g., A, B)"
//             value={newSection}
//             onChange={(e) => setNewSection(e.target.value.toUpperCase())}
//             className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />

//           <button
//             type="submit"
//             disabled={!selectedStandard || !newSection}
//             className={`px-4 py-2 rounded text-white ${
//               selectedStandard && newSection
//                 ? "bg-green-500 hover:bg-green-600"
//                 : "bg-gray-400 cursor-not-allowed"
//             } transition`}
//           >
//             Create Section
//           </button>
//         </div>
//       </form>

//       {/* List Sections */}
//       {loadingSections ? (
//         <p className="mt-4">Loading sections...</p>
//       ) : sections.length > 0 ? (
//         <div className="mt-6">
//           <h4 className="text-lg font-medium mb-2 text-gray-700">
//             Sections for Standard{" "}
//             {toRoman(
//               parseInt(standards.find((s) => s.id === parseInt(selectedStandard))?.name)
//             )}
//             :
//           </h4>
//           <ul className="list-disc list-inside bg-gray-50 p-3 rounded">
//             {sections.map(
//               (sec) =>
//                 sec.name && (
//                   <li key={sec.id} className="text-gray-800">
//                     {sec.name}
//                   </li>
//                 )
//             )}
//           </ul>
//         </div>
//       ) : null}
//     </div>
//   );
// }




import React, { useState, useEffect } from "react";
import axios from "axios";

function StandardSectionCreateForm() {
  const [standards, setStandards] = useState([]);
  const [sections, setSections] = useState([]);
  const [newStandard, setNewStandard] = useState("");
  const [newSection, setNewSection] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [message, setMessage] = useState("");
  const [loadingStandards, setLoadingStandards] = useState(false);
  const [loadingSections, setLoadingSections] = useState(false);

  const baseURL = "http://127.0.0.1:8000/schoolapp";

  const toRoman = (num) => {
    const romans = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
    return romans[num - 1] || num;
  };

  const fetchStandards = () => {
    setLoadingStandards(true);
    axios
      .get(`${baseURL}/standards/`)
      .then((res) => setStandards(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoadingStandards(false));
  };

  useEffect(() => {
    fetchStandards();
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleStandardChange = (e) => {
    const standardId = e.target.value;
    setSelectedStandard(standardId);
    setSections([]);
    setNewSection("");
    if (!standardId) return;

    setLoadingSections(true);
    axios
      .get(`${baseURL}/standards/${standardId}/sections/`)
      .then((res) => setSections(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoadingSections(false));
  };

  const handleStandardSubmit = (e) => {
    e.preventDefault();
    const standardNumber = parseInt(newStandard);

    if (!standardNumber || standardNumber < 1 || standardNumber > 10) {
      setMessage("Please enter a number between 1 and 10.");
      setNewStandard("");
      return;
    }

    if (standards.length > 0) {
      setMessage("A standard already exists! You can only have one standard at a time.");
      setNewStandard("");
      return;
    }

    axios
      .post(`${baseURL}/standards/`, { name: standardNumber })
      .then((res) => {
        setMessage(`Standard ${toRoman(res.data.name)} created successfully!`);
        setNewStandard("");
        setSelectedStandard("");
        setSections([]);
        fetchStandards();
      })
      .catch(() => setMessage("Error creating standard"));
  };

  const handleSectionSubmit = (e) => {
    e.preventDefault();
    if (!selectedStandard || !newSection) return;

    // If this standard already has a section, block creation
    if (sections.length > 0) {
      setMessage(
        `Standard ${toRoman(
          parseInt(standards.find((s) => s.id === parseInt(selectedStandard))?.name)
        )} already has a section. Only one section per standard is allowed.`
      );
      setNewSection("");
      return;
    }

    axios
      .post(`${baseURL}/sections/`, {
        name: newSection.toUpperCase(),
        standard_id: selectedStandard,
      })
      .then((res) => {
        setMessage(`Section ${res.data.name} created successfully!`);
        setNewSection("");
        handleStandardChange({ target: { value: selectedStandard } }); // refresh sections
      })
      .catch(() => setMessage("Error creating section"));
  };

  return (
    <div className="max-w-md md:max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      {message && (
        <div className="mb-4 p-3 text-green-800 bg-green-100 rounded">{message}</div>
      )}

      {/* Create Standard Form */}
      <form onSubmit={handleStandardSubmit} className="mb-8">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">Create Standard</h3>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Enter Standard (1 - 10)"
            value={newStandard}
            onChange={(e) => setNewStandard(e.target.value)}
            min="1"
            max="10"
            className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Create
          </button>
        </div>
      </form>

      {/* Create Section Form */}
      <form onSubmit={handleSectionSubmit}>
        <h3 className="text-xl font-semibold mb-3 text-gray-700">Create Section</h3>
        <div className="flex flex-col gap-3">
          {loadingStandards ? (
            <p>Loading standards...</p>
          ) : (
            <select
              value={selectedStandard}
              onChange={handleStandardChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Standard</option>
              {standards
                .slice()
                .sort((a, b) => Number(a.name) - Number(b.name))
                .map((s) => (
                  <option key={s.id} value={s.id}>
                    {toRoman(parseInt(s.name))}
                  </option>
                ))}
            </select>
          )}

          <input
            type="text"
            placeholder="Section Name (e.g., A, B)"
            value={newSection}
            onChange={(e) => setNewSection(e.target.value.toUpperCase())}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            disabled={!selectedStandard || !newSection}
            className={`px-4 py-2 rounded text-white ${
              selectedStandard && newSection
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-400 cursor-not-allowed"
            } transition`}
          >
            Create Section
          </button>
        </div>
      </form>

      {/* List Sections */}
      {loadingSections ? (
        <p className="mt-4">Loading sections...</p>
      ) : sections.length > 0 ? (
        <div className="mt-6">
          <h4 className="text-lg font-medium mb-2 text-gray-700">
            Sections for Standard{" "}
            {toRoman(
              parseInt(standards.find((s) => s.id === parseInt(selectedStandard))?.name)
            )}
            :
          </h4>
          <ul className="list-disc list-inside bg-gray-50 p-3 rounded">
            {sections.map(
              (sec) =>
                sec.name && (
                  <li key={sec.id} className="text-gray-800">
                    {sec.name}
                  </li>
                )
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default StandardSectionCreateForm;





