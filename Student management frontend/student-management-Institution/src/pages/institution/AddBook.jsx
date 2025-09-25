import React, { useState } from "react";
import axios from "axios";

function BookManager() {
  const [activeTab, setActiveTab] = useState("single");

  // -------------------
  // Single Book States
  // -------------------
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "",
    
    quantity: "",
  });
  const [singleMsg, setSingleMsg] = useState("");

  // -------------------
  // Bulk Upload States
  // -------------------
  const [file, setFile] = useState(null);
  const [bulkMsg, setBulkMsg] = useState("");
  const [bulkErrors, setBulkErrors] = useState([]);

  // -------------------
  // Single Book Handlers
  // -------------------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSingleSubmit = async (e) => {
    e.preventDefault();
    setSingleMsg("");

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://127.0.0.1:8000/collegeapp/books/",
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      setSingleMsg("✅ Book added successfully!");
      setFormData({
        title: "",
        author: "",
        isbn: "",
        category: "",
        
        quantity: "",
      });
    } catch (err) {
      setSingleMsg(
        err.response?.data?.detail || "❌ Failed to add book. Try again."
      );
    }
  };

  // -------------------
  // Bulk Upload Handlers
  // -------------------
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setBulkMsg("");
    setBulkErrors([]);
  };

  const handleBulkSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setBulkMsg("❌ Please select an Excel file to upload.");
      return;
    }

    const formDataFile = new FormData();
    formDataFile.append("file", file);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://127.0.0.1:8000/collegeapp/books/upload/",
        formDataFile,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${token}`,
          },
        }
      );

      setBulkMsg(`✅ ${res.data.message || "Bulk upload successful!"}`);
      setBulkErrors(res.data.errors || []);
    } catch (err) {
      setBulkMsg(
        err.response?.data?.error || "❌ Failed to upload file. Try again."
      );
      setBulkErrors([]);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow p-6 rounded-md">
      {/* Tabs */}
      <div className="flex mb-6 border-b">
        <button
          onClick={() => setActiveTab("single")}
          className={`flex-1 py-2 ${
            activeTab === "single"
              ? "border-b-2 border-blue-600 font-bold text-blue-600"
              : "text-gray-600"
          }`}
        >
          ➕ Add Single Book
        </button>
        <button
          onClick={() => setActiveTab("bulk")}
          className={`flex-1 py-2 ${
            activeTab === "bulk"
              ? "border-b-2 border-blue-600 font-bold text-blue-600"
              : "text-gray-600"
          }`}
        >
          📂 Bulk Upload
        </button>
      </div>

      {/* Single Book Form */}
      {activeTab === "single" && (
        <>
          {singleMsg && (
            <div
              className={`mb-4 p-3 rounded ${
                singleMsg.includes("✅")
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {singleMsg}
            </div>
          )}
          <form onSubmit={handleSingleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Book Title"
              required
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Author"
              required
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              placeholder="ISBN (13 digits)"
              maxLength="13"
              required
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              required
              className="w-full border p-2 rounded"
            />
            
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Number of Copies"
              min="1"
              required
              className="w-full border p-2 rounded"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              ➕ Add Book
            </button>
          </form>
        </>
      )}

      {/* Bulk Upload Form */}
      {activeTab === "bulk" && (
        <>
          {bulkMsg && (
            <div
              className={`mb-4 p-3 rounded ${
                bulkMsg.includes("✅")
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {bulkMsg}
            </div>
          )}
          <form onSubmit={handleBulkSubmit} className="space-y-4">
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              className="w-full border p-2 rounded"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              ⬆ Upload
            </button>
          </form>

          {bulkErrors.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold text-red-700 mb-2">Errors:</h3>
              <ul className="list-disc ml-5 text-sm text-red-600">
                {bulkErrors.map((err, i) => (
                  <li key={i}>
                    Row {err.row}: {JSON.stringify(err.error)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default BookManager;






// import React, { useState } from "react";
// import axios from "axios";

// function BookManager() {
//   const [activeTab, setActiveTab] = useState("single");

//   // -------------------
//   // Single Book States
//   // -------------------
//   const [formData, setFormData] = useState({
//     title: "",
//     author: "",
//     isbn: "",
//     category: "",
//     quantity: "",
//   });
//   const [singleMsg, setSingleMsg] = useState("");

//   // -------------------
//   // Bulk Upload States
//   // -------------------
//   const [file, setFile] = useState(null);
//   const [bulkMsg, setBulkMsg] = useState("");
//   const [bulkErrors, setBulkErrors] = useState([]);

//   // -------------------
//   // Single Book Handlers
//   // -------------------
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSingleSubmit = async (e) => {
//     e.preventDefault();
//     setSingleMsg("");

//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.post(
//         "http://127.0.0.1:8000/collegeapp/books/",
//         formData,
//         {
//           headers: {
//             Authorization: `Token ${token}`,
//           },
//         }
//       );
//       setSingleMsg("✅ Book added successfully!");
//       setFormData({
//         title: "",
//         author: "",
//         isbn: "",
//         category: "",
//         quantity: "",
//       });
//     } catch (err) {
//       setSingleMsg(
//         err.response?.data?.detail || "❌ Failed to add book. Try again."
//       );
//     }
//   };

//   // -------------------
//   // Bulk Upload Handlers
//   // -------------------
//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setBulkMsg("");
//     setBulkErrors([]);
//   };

//   const handleBulkSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       setBulkMsg("❌ Please select an Excel file to upload.");
//       return;
//     }

//     const formDataFile = new FormData();
//     formDataFile.append("file", file);

//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.post(
//         "http://127.0.0.1:8000/collegeapp/books/upload/",
//         formDataFile,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Token ${token}`,
//           },
//         }
//       );

//       setBulkMsg(`✅ ${res.data.message}`);
//       setBulkErrors(res.data.errors || []);
//     } catch (err) {
//       setBulkMsg(
//         err.response?.data?.error || "❌ Failed to upload file. Try again."
//       );
//       setBulkErrors([]);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto bg-white shadow p-6 rounded-md">
//       {/* Tabs */}
//       <div className="flex mb-6 border-b">
//         <button
//           onClick={() => setActiveTab("single")}
//           className={`flex-1 py-2 ${
//             activeTab === "single"
//               ? "border-b-2 border-blue-600 font-bold text-blue-600"
//               : "text-gray-600"
//           }`}
//         >
//           ➕ Add Single Book
//         </button>
//         <button
//           onClick={() => setActiveTab("bulk")}
//           className={`flex-1 py-2 ${
//             activeTab === "bulk"
//               ? "border-b-2 border-blue-600 font-bold text-blue-600"
//               : "text-gray-600"
//           }`}
//         >
//           📂 Bulk Upload
//         </button>
//       </div>

//       {/* Single Book Form */}
//       {activeTab === "single" && (
//         <>
//           {singleMsg && (
//             <div
//               className={`mb-4 p-3 rounded ${
//                 singleMsg.includes("✅")
//                   ? "bg-green-100 text-green-800"
//                   : "bg-red-100 text-red-800"
//               }`}
//             >
//               {singleMsg}
//             </div>
//           )}
//           <form onSubmit={handleSingleSubmit} className="space-y-4">
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               placeholder="Book Title"
//               required
//               className="w-full border p-2 rounded"
//             />
//             <input
//               type="text"
//               name="author"
//               value={formData.author}
//               onChange={handleChange}
//               placeholder="Author"
//               required
//               className="w-full border p-2 rounded"
//             />
//             <input
//               type="text"
//               name="isbn"
//               value={formData.isbn}
//               onChange={handleChange}
//               placeholder="ISBN (13 digits)"
//               maxLength="13"
//               required
//               className="w-full border p-2 rounded"
//             />
//             <input
//               type="text"
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               placeholder="Category"
//               required
//               className="w-full border p-2 rounded"
//             />
//             <input
//               type="number"
//               name="quantity"
//               value={formData.quantity}
//               onChange={handleChange}
//               placeholder="Number of Copies"
//               min="1"
//               required
//               className="w-full border p-2 rounded"
//             />

//             <button
//               type="submit"
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
//             >
//               ➕ Add Book
//             </button>
//           </form>
//         </>
//       )}

//       {/* Bulk Upload Form */}
//       {activeTab === "bulk" && (
//         <>
//           {bulkMsg && (
//             <div
//               className={`mb-4 p-3 rounded ${
//                 bulkMsg.includes("✅")
//                   ? "bg-green-100 text-green-800"
//                   : "bg-red-100 text-red-800"
//               }`}
//             >
//               {bulkMsg}
//             </div>
//           )}
//           <form onSubmit={handleBulkSubmit} className="space-y-4">
//             <input
//               type="file"
//               accept=".xlsx"
//               onChange={handleFileChange}
//               className="w-full border p-2 rounded"
//             />

//             <button
//               type="submit"
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
//             >
//               ⬆ Upload
//             </button>
//           </form>

//           {bulkErrors.length > 0 && (
//             <div className="mt-4">
//               <h3 className="font-semibold text-red-700 mb-2">Errors:</h3>
//               <ul className="list-disc ml-5 text-sm text-red-600">
//                 {bulkErrors.map((err, i) => (
//                   <li key={i}>
//                     Row {err.row}: {JSON.stringify(err.error)}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// export default BookManager;





// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from "recharts";

// function BookManager() {
//   const [activeTab, setActiveTab] = useState("single");

//   // -------------------
//   // Single Book States
//   // -------------------
//   const [formData, setFormData] = useState({
//     title: "",
//     author: "",
//     isbn: "",
//     category: "",
//     quantity: "",
//   });
//   const [singleMsg, setSingleMsg] = useState("");

//   // -------------------
//   // Bulk Upload States
//   // -------------------
//   const [file, setFile] = useState(null);
//   const [bulkMsg, setBulkMsg] = useState("");
//   const [bulkErrors, setBulkErrors] = useState([]);

//   // -------------------
//   // Book List + Chart States
//   // -------------------
//   const [books, setBooks] = useState([]);
//   const [chartData, setChartData] = useState([]);

//   const token = localStorage.getItem("token");

//   // -------------------
//   // Single Book Handlers
//   // -------------------
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSingleSubmit = async (e) => {
//     e.preventDefault();
//     setSingleMsg("");

//     try {
//       await axios.post("http://127.0.0.1:8000/collegeapp/books/", formData, {
//         headers: { Authorization: `Token ${token}` },
//       });
//       setSingleMsg("✅ Book added successfully!");
//       setFormData({
//         title: "",
//         author: "",
//         isbn: "",
//         category: "",
//         quantity: "",
//       });
//       fetchBooks();
//     } catch (err) {
//       setSingleMsg(err.response?.data?.detail || "❌ Failed to add book. Try again.");
//     }
//   };

//   // -------------------
//   // Bulk Upload Handlers
//   // -------------------
//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setBulkMsg("");
//     setBulkErrors([]);
//   };

//   const handleBulkSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       setBulkMsg("❌ Please select an Excel file to upload.");
//       return;
//     }

//     const formDataFile = new FormData();
//     formDataFile.append("file", file);

//     try {
//       const res = await axios.post(
//         "http://127.0.0.1:8000/collegeapp/books/upload/",
//         formDataFile,
//         {
//           headers: {
//             // "Content-Type": "multipart/form-data",
//             Authorization: `Token ${token}`,
//           },
//         }
//       );

//       setBulkMsg(`✅ ${res.data.message}`);
//       setBulkErrors(res.data.errors || []);
//       fetchBooks();
//     } catch (err) {
//       setBulkMsg(err.response?.data?.error || "❌ Failed to upload file. Try again.");
//       setBulkErrors([]);
//     }
//   };

//   // -------------------
//   // Fetch Books + Chart Data
//   // -------------------
//   const fetchBooks = async () => {
//     try {
//       const res = await axios.get("http://127.0.0.1:8000/collegeapp/books/", {
//         headers: { Authorization: `Token ${token}` },
//       });
//       setBooks(res.data);

//       // Prepare monthly data
//       const monthlyCount = {};
//       res.data.forEach((book) => {
//         const month = new Date(book.created_at).toLocaleString("default", { month: "short" });
//         monthlyCount[month] = (monthlyCount[month] || 0) + 1;
//       });
//       const chartArr = Object.entries(monthlyCount).map(([month, count]) => ({
//         month,
//         books: count,
//       }));
//       setChartData(chartArr);
//     } catch (error) {
//       console.error("Error fetching books:", error);
//     }
//   };

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   return (
//     <div className="max-w-5xl mx-auto bg-white shadow p-6 rounded-md space-y-8">
//       {/* Tabs */}
//       <div className="flex mb-6 border-b">
//         <button
//           onClick={() => setActiveTab("single")}
//           className={`flex-1 py-2 ${
//             activeTab === "single"
//               ? "border-b-2 border-blue-600 font-bold text-blue-600"
//               : "text-gray-600"
//           }`}
//         >
//           ➕ Add Single Book
//         </button>
//         <button
//           onClick={() => setActiveTab("bulk")}
//           className={`flex-1 py-2 ${
//             activeTab === "bulk"
//               ? "border-b-2 border-blue-600 font-bold text-blue-600"
//               : "text-gray-600"
//           }`}
//         >
//           📂 Bulk Upload
//         </button>
//       </div>

//       {/* Single Book Form */}
//       {activeTab === "single" && (
//         <>
//           {singleMsg && (
//             <div
//               className={`mb-4 p-3 rounded ${
//                 singleMsg.includes("✅")
//                   ? "bg-green-100 text-green-800"
//                   : "bg-red-100 text-red-800"
//               }`}
//             >
//               {singleMsg}
//             </div>
//           )}
//           <form onSubmit={handleSingleSubmit} className="space-y-4">
//             <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Book Title" required className="w-full border p-2 rounded" />
//             <input type="text" name="author" value={formData.author} onChange={handleChange} placeholder="Author" required className="w-full border p-2 rounded" />
//             <input type="text" name="isbn" value={formData.isbn} onChange={handleChange} placeholder="ISBN (13 digits)" maxLength="13" required className="w-full border p-2 rounded" />
//             <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" required className="w-full border p-2 rounded" />
//             <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Number of Copies" min="1" required className="w-full border p-2 rounded" />
//             <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition">
//               ➕ Add Book
//             </button>
//           </form>
//         </>
//       )}

//       {/* Bulk Upload Form */}
//       {activeTab === "bulk" && (
//         <>
//           {bulkMsg && (
//             <div
//               className={`mb-4 p-3 rounded ${
//                 bulkMsg.includes("✅")
//                   ? "bg-green-100 text-green-800"
//                   : "bg-red-100 text-red-800"
//               }`}
//             >
//               {bulkMsg}
//             </div>
//           )}
//           <form onSubmit={handleBulkSubmit} className="space-y-4">
//             <input type="file" accept=".xlsx" onChange={handleFileChange} className="w-full border p-2 rounded" />
//             <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition">
//               ⬆ Upload
//             </button>
//           </form>
//           {bulkErrors.length > 0 && (
//             <div className="mt-4">
//               <h3 className="font-semibold text-red-700 mb-2">Errors:</h3>
//               <ul className="list-disc ml-5 text-sm text-red-600">
//                 {bulkErrors.map((err, i) => (
//                   <li key={i}>
//                     Row {err.row}: {JSON.stringify(err.error)}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </>
//       )}

      
//     </div>
//   );
// }

// export default BookManager;
