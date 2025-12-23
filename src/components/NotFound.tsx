import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex w-full mx-auto max-w-7xl flex-col px-12">
      <h1 className="my-4">Coś poszło nie tak...</h1>
      <div>
        <p className="mb-1">wróć na stronę główną:</p>
        <button className="px-2 py-1 bg-gray-200 rounded-lg hover:opacity-80">
          <Link to="/">Strona glowna</Link>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
