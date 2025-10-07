import { useState } from "react";
import Navbar from "./component/Navbar";
import Planet from "./component/Planet";
import People from "./component/People"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  const[page, setPage] = useState('planet');
  return (
    <>
    <div className="App">
       <h1 className="text-6xl text-yellow-600 font-bold ml-150">Star Wars Info</h1>
        <Navbar setpage={setPage}/>
           <div className="content">
        {page === 'planet' ? <Planet /> : <People />}
    </div>
    </div>
    <ReactQueryDevtools initialIsOpen={false} />
    </>

  )

}
export default App
