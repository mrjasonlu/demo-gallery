import { Link, Outlet } from 'react-router';

export default function AppLayout() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex text-3xl font-bold p-5 min-w-7xl mx-auto">
        <Link to="/" className="flex">
          <h1 className="font-bold text-teal-600">JL Gallery</h1>
        </Link>
      </header>
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="px-10 py-5 bg-gray-200">
        <div className="max-w-7xl mx-auto flex flex-row gap-5">
          <p className="mr-auto font-semibold text-teal-600">JL Gallery</p>
          <p className="ml-auto">Jason Lu - {currentYear} </p>
        </div>
      </footer>
    </div>
  );
}
