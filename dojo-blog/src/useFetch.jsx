import { useState,useEffect } from "react";
 
 const useFetch = (url) => {

     const [data, setData] = useState(null);
        const [isPending, setIsPending] = useState(true);
       

     useEffect(() => {
                   setTimeout(() => {
                     fetch(url)
                    .then(res => {
                        if (!res.ok) {
                            throw Error('could not fetch data');
                        }
                        return res.json();
                    })
                    .then(data => {
                        setData(data) 
                        setIsPending(false)
                    })
                    .catch(err => {
                        console.error(err.message);
                        setIsPending(false);
                    });
                   }, 100);
                },[url]);

                return {data, isPending}
}
 
export default useFetch;