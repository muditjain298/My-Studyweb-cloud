import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
      <p className="mt-4 text-gray-600 dark:text-gray-300">
        Welcome back, {user?.name}! Here are your study materials.
      </p>
      
      {/* Sections Placeholder */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Link to="/notes" className="block overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800 p-6 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Notes</h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Manage your PDF and text notes.</p>
        </Link>
        <Link to="/videos" className="block overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800 p-6 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Video Links</h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Saved educational videos.</p>
        </Link>
        <Link to="/questions" className="block overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800 p-6 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Question Banks</h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Previous year papers.</p>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
