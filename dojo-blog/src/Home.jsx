import { useState } from "react";
import BlogList from "./BlogList";
import useFetch from "./useFetch";


const Home = () => {
        const [name, setName] = useState('mario');
        const {data: blogs, isPending, } = useFetch('http://localhost:8000/blogs')


    return (
        <div className="home">
            {isPending && <div> ...loading </div>}
           {blogs && <BlogList blogs={blogs} title="all blogs" />}
           <button onClick={() => {
            setName('luigi')
           }}>change name</button>
           <p>{name}</p>
        </div>
    );
}
 
export default Home;