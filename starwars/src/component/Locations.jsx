const Locations = ({locate}) => {
    return ( 
        <div className="card p-8  border-1 rounded-full border-black m-10" >
            <h1 className="m-6 text-white-300">{locate.name}</h1>
            <div>{locate.type}</div>
            <p className="m-10 text-yellow-800">{locate.residents}</p>
        </div>
     );
}
 
export default Locations;