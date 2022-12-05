import { Link } from "react-router-dom";

export default function Root() {

  return (
    <>
      <div className='text-7xl'>
        Tic Tac Toe Battlegrounds
      </div>

      <Link to={`/login`} className="p-4 text-xl bg-blue-700 text-gray-100 active:bg-blue-800">Start</Link>
    </>
  );
}


