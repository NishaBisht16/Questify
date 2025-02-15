import './Input.css'
const Input=({className,onChange,placeholder,name,type,value})=>{
    return(
        <div>
            <input className={className} onChange={onChange} placeholder={placeholder} type={type} name={name} value={value}></input>  
        </div>
    )
}
export default Input;