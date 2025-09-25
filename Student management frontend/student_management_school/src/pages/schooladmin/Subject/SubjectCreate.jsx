import React, { useState } from "react";
import Inputfield from "../../../components/common/Inputfield";
import Button from "../../../components/common/Button";
import { toast } from "react-toastify";
import axios from "axios";

function CreateSubject() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [standard, setStandard] = useState(""); // Selected standard

  // Convert number → Roman numeral
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

  // Generate Standards 1 to 10
  const romanStandards = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: toRoman(i + 1),
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("⚠️ No token found. Please login first.");
      return;
    }

    try {
      await axios.post(
        "http://127.0.0.1:8000/schoolapp/subjectcreate/",
        { name, code, standard },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("✅ Subject Created Successfully");

      // Reset form
      setName("");
      setCode("");
      setStandard("");
    } catch (error) {
      console.error("❌ Error creating subject:", error);

      if (error.response && error.response.data) {
        const data = error.response.data;
        if (data.code) toast.error(`❌ ${data.code[0]}`);
        else if (data.name) toast.error(`❌ ${data.name[0]}`);
        else toast.error("❌ Failed to create subject");
      } else {
        toast.error("❌ Server not responding");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Subject</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Inputfield
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Inputfield
          label="Code"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />

        {/* Standard Dropdown (I to X) */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Standard</label>
          <select
            value={standard}
            onChange={(e) => setStandard(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Standard</option>
            {romanStandards.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <Button type="submit" label="Create Subject" />
      </form>
    </div>
  );
}

export default CreateSubject;
