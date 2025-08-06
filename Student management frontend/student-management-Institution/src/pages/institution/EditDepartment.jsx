import { useParams } from 'react-router-dom';

const EditDepartment = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Edit Department ID: {id}</h2>
      {/* Add form here */}
    </div>
  );
};

export default EditDepartment;
