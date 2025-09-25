import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../../components/common/Button";
import { toast } from "react-toastify";
import axios from "axios";

function SubjectAssign() {
  const { id } = useParams(); // teacherId from route
  const [selectedSubject, setSelectedSubject] = useState("");
  const [code, setCode] = useState("");
  const [standard, setStandard] = useState("");
  const [section, setSection] = useState("");
  const [teacher, setTeacher] = useState(id || "");

  const [standards, setStandards] = useState([]);
  const [availableSections, setAvailableSections] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);

  // Convert number → Roman numeral
  const toRoman = (num) => {
    const romans = ["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"];
    return romans[num - 1] || num;
  };

  // Fetch standards, teachers, and subjects
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const [stdRes, tchRes, subRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/schoolapp/standards/", { headers: { Authorization: `Token ${token}` } }),
          axios.get("http://127.0.0.1:8000/schoolapp/teachers/", { headers: { Authorization: `Token ${token}` } }),
          axios.get("http://127.0.0.1:8000/schoolapp/subjectcreate/", { headers: { Authorization: `Token ${token}` } }),
        ]);
        setStandards(stdRes.data);
        setTeachers(tchRes.data);
        setSubjects(subRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        toast.error("⚠️ Failed to fetch dropdown data");
      }
    };
    fetchData();
  }, []);

  // Update available sections when standard changes
  useEffect(() => {
    if (standard) {
      const stdObj = standards.find((s) => s.id.toString() === standard);
      setAvailableSections(stdObj?.sections || []);
      setSection(""); // reset section
    } else {
      setAvailableSections([]);
      setSection("");
    }
  }, [standard, standards]);

  // Auto-generate code
  useEffect(() => {
    if (selectedSubject && standard && section && teacher) {
      const stdObj = standards.find((s) => s.id.toString() === standard);
      const secObj = availableSections.find((s) => s.id.toString() === section);
      const tchObj = teachers.find((t) => t.id.toString() === teacher);

      const stdName = stdObj ? toRoman(parseInt(stdObj.name)) : "";
      const secName = secObj ? secObj.name : "";
      const tchCode = tchObj
        ? (tchObj.username || tchObj.name || "")
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
        : "";

      setCode(`${stdName}-${secName}-${selectedSubject.toUpperCase().slice(0, 4)}-${tchCode}`);
    }
  }, [selectedSubject, standard, section, teacher, standards, availableSections, teachers]);

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://127.0.0.1:8000/schoolapp/subjectcreate/",
        { name: selectedSubject, code, standard, section, teacher },
        { headers: { Authorization: `Token ${token}`, "Content-Type": "application/json" } }
      );
      toast.success("✅ Subject Assigned Successfully");
      setSelectedSubject("");
      setCode("");
      setStandard("");
      setSection("");
    } catch (err) {
      console.error("Error assigning subject:", err);
      if (err.response?.data) {
        Object.entries(err.response.data).forEach(([field, msgs]) =>
          toast.error(`❌ ${field}: ${msgs[0]}`)
        );
      } else {
        toast.error("❌ Server not responding");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Assign Subject</h2>
      <form onSubmit={handleSubmit}>
        {/* Subject Dropdown */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Select Subject</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Subject</option>
            {subjects.map((sub) => (
              <option key={sub.id} value={sub.name}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>

        {/* Standard Dropdown */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Standard</label>
          <select
            value={standard}
            onChange={(e) => setStandard(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Standard</option>
            {standards.map((s) => (
              <option key={s.id} value={s.id}>
                {toRoman(parseInt(s.name))}
              </option>
            ))}
          </select>
        </div>

        {/* Section Dropdown */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Section</label>
          <select
            value={section || ""}
            onChange={(e) => setSection(e.target.value)}
            className="w-full p-2 border rounded"
            required
            disabled={!standard}
          >
            <option value="">Select Section</option>
            {availableSections.length > 0 ? (
              availableSections.map((sec) => (
                <option key={sec.id} value={sec.id}>
                  {sec.name}
                </option>
              ))
            ) : (
              <option value="" disabled>No sections available</option>
            )}
          </select>
        </div>

        {/* Teacher Dropdown */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Teacher</label>
          <select
            value={teacher}
            onChange={(e) => setTeacher(e.target.value)}
            className="w-full p-2 border rounded"
            required
            disabled={!!id} // lock if teacher preselected
          >
            <option value="">Select Teacher</option>
            {teachers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.username || t.name}
              </option>
            ))}
          </select>
        </div>

        <Button type="submit" label="Assign Subject" />
      </form>
    </div>
  );
}

export default SubjectAssign;



