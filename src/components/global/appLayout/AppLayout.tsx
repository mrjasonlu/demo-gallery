import { Link, Outlet } from 'react-router';

export default function AppLayout() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="flex flex-col min-h-screen w-full">
      <header className="p-5">
        <div className="max-w-7xl mx-auto flex flex-row gap-5 text-2xl">
          <Link to="/" className="flex mr-auto">
            <h1 className="font-bold text-teal-600 ">JL Gallery</h1>
          </Link>
        </div>
      </header>
      <main className="flex-grow w-full">
        <Outlet />
      </main>
      <footer className="mt-10 px-10 py-5 bg-gray-200">
        <div className="max-w-7xl mx-auto flex flex-row gap-5">
          <p className="mr-auto font-semibold text-teal-600">JL Gallery</p>
          <p className="ml-auto">Jason Lu - {currentYear} </p>
        </div>
      </footer>
    </div>
  );
}
