import React, { useState } from "react";
import Inputfield from "../../components/common/Inputfield";
import Button from "../../components/common/Button";
import { toast } from "react-toastify";
import axios from "axios";

function CreateSubject() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/schoolapp/subjectcreate/",
        { name, code },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
      toast.success("Subject Created Successfully");

      // Reset form
      setName("");
      setCode("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create subject");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Subject</h2>
      <form onSubmit={handleSubmit}>
        <Inputfield
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Inputfield
          label="Code"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <Button type="submit" label="Create Subject" />
      </form>
    </div>
  );
}

export default CreateSubject;
