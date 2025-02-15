import './Button.css';
const Button=({name,onClick,className,style})=>{
    return(
        <div>
            <button className={className} onClick={onClick} style={style} >{name}</button>         
        </div>
        
    )
}

export default Button;