export function TravelMenu({name, type, icon, handleClick}) {
    return(
        <button type="button" 
                className="travel-menu" 
                onClick={() => {handleClick(type)}} ><i className={icon}></i> {name}</button>
    );
}