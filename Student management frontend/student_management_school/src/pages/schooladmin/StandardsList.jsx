import React from 'react';

const standards = [
  { name: '1st Standard', sections: ['A', 'B', 'C'] },
  { name: '2nd Standard', sections: ['A', 'B'] },
  { name: '3rd Standard', sections: ['A', 'B', 'C', 'D'] },
  { name: '4th Standard', sections: ['A', 'B'] },
  { name: '5th Standard', sections: ['A', 'B', 'C'] },
  { name: '6th Standard', sections: ['A', 'B'] },
  { name: '7th Standard', sections: ['A', 'B', 'C'] },
  { name: '8th Standard', sections: ['A', 'B'] },
  { name: '9th Standard', sections: ['A', 'B', 'C'] },
  { name: '10th Standard', sections: ['A', 'B'] },
  { name: '11th (Plus One)', sections: ['A', 'B', 'C'] },
  { name: '12th (Plus Two)', sections: ['A', 'B'] },
];

export default function StandardsList() {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Standards & Sections</h1>
      <ul className="space-y-6">
        {standards.map(({ name, sections }) => (
          <li key={name} className="border p-4 rounded-md shadow-sm hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-3">{name}</h2>
            <div className="flex flex-wrap gap-3">
              {sections.map((section) => (
                <span
                  key={section}
                  className="px-4 py-2 bg-blue-100 text-blue-700 font-medium rounded-full"
                >
                  Section {section}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
