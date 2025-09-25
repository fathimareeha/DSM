import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditStandardSection() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [standard, setStandard] = useState({ id: id, name: "", sections: [] });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch standard + its sections
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all standards
        const stdRes = await axios.get("http://127.0.0.1:8000/schoolapp/standards/");
        const std = stdRes.data.find((s) => s.id === parseInt(id));
        if (!std) throw new Error("Standard not found");

        // Fetch sections belonging to this standard
        const secRes = await axios.get(
          `http://127.0.0.1:8000/schoolapp/standards/${id}/sections/`
        );

        setStandard({
          id: std.id,
          name: std.name || "",
          sections: secRes.data || [],
        });
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Handle standard name change
  const handleStandardChange = (e) => {
    setStandard({ ...standard, name: e.target.value });
  };

  // Handle section name change
  const handleSectionNameChange = (sectionId, newName) => {
    const updatedSections = standard.sections.map((sec) =>
      sec.id === sectionId ? { ...sec, name: newName } : sec
    );
    setStandard({ ...standard, sections: updatedSections });
  };

  // Toggle section active/inactive
  const handleSectionToggle = (sectionId) => {
    const updatedSections = standard.sections.map((sec) =>
      sec.id === sectionId ? { ...sec, is_active: !sec.is_active } : sec
    );
    setStandard({ ...standard, sections: updatedSections });
  };

  // Save changes
  const handleSave = async () => {
    try {
      setSaving(true);

      // Update standard
      await axios.patch(`http://127.0.0.1:8000/schoolapp/standards/${id}/edit/`, {
        name: standard.name,
      });

      // Update each section
      await Promise.all(
        standard.sections.map((sec) =>
          axios.patch(`http://127.0.0.1:8000/schoolapp/sections/${sec.id}/edit/`, {
            name: sec.name,
            is_active: sec.is_active,
          })
        )
      );

      navigate("/admin/list/standard&section");
    } catch (err) {
      console.error("Error saving changes:", err);
      alert("Failed to save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">
        Edit Standard & Sections
      </h2>

      {/* Standard Name */}
      <div className="mb-4">
        <label className="block text-gray-600 mb-2">Standard Name</label>
        <input
          type="text"
          value={standard.name}
          onChange={handleStandardChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      {/* Sections */}
      <h3 className="text-xl font-semibold text-gray-700 mb-2">Sections</h3>
      <ul className="space-y-3">
        {standard.sections.map((sec) => (
          <li
            key={sec.id}
            className="flex justify-between items-center px-4 py-2 border rounded-md"
          >
            {/* Section Name */}
            <input
              type="text"
              value={sec.name}
              onChange={(e) =>
                handleSectionNameChange(sec.id, e.target.value)
              }
              className="px-2 py-1 border rounded-md w-1/3"
            />

            {/* Toggle Active/Inactive */}
            <div className="flex items-center gap-3">
              <span
                className={`text-sm ${
                  sec.is_active ? "text-green-600" : "text-red-500"
                }`}
              >
                {sec.is_active ? "Active" : "Inactive"}
              </span>
              <button
                onClick={() => handleSectionToggle(sec.id)}
                className={`px-3 py-1 rounded text-white ${
                  sec.is_active
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {sec.is_active ? "Deactivate" : "Activate"}
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}

export default EditStandardSection;
