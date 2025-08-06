import { useParams } from 'react-router-dom';

const DeleteDepartment = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Delete Department ID: {id}</h2>
      {/* Add confirmation logic here */}
    </div>
  );
};

export default DeleteDepartment;
