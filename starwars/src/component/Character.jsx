const character = ({character}) => {
    return ( 
        <div className="card p-8  border-1 rounded-full border-black m-10" >
            <h1 className="m-6 text-white-300">{character.name}</h1>
            <div>{character.image}</div>
            <p className="m-10 text-yellow-400">{character.gender}</p>
        </div>
     );
}
 
export default character;