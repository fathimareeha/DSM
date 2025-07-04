import { Link, useLocation } from 'react-router-dom';

function Breadcrumbs() {
  const location = useLocation();

  // Split the path and filter out empty strings and "admin"
  const rawPaths = location.pathname.split('/').filter(Boolean);
  const paths = rawPaths.filter((segment) => segment.toLowerCase() !== 'admin');  //Remove "admin" from the array so it won't be shown in breadcrumbs.

  return (
    <div className="bg-gray-100 px-6 py-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-2 capitalize">
        {paths[paths.length - 1]?.replace(/-/g, ' ') || 'Dashboard'}
      </h1>

      <div className="flex items-center text-sm text-gray-600 space-x-2">
        <Link to="/" className="hover:underline">Home</Link>

        {paths.map((segment, index) => {
          const fullPath = '/' + rawPaths.slice(0, rawPaths.indexOf(segment) + 1).join('/');
          const isLast = index === paths.length - 1;

          return (
            <div key={fullPath} className="flex items-center space-x-2">
              <span>&gt;</span>
              {isLast ? (
                <span className="text-blue-900 font-medium capitalize">
                  {segment.replace(/-/g, ' ')}
                </span>
              ) : (
                <Link to={fullPath} className="hover:underline capitalize">
                  {segment.replace(/-/g, ' ')}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Breadcrumbs;
