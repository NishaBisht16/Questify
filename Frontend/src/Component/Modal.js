import './Modal.css'
import Button from './Button';
const MyModal=({closeModel,deleteData,itemId,getQuestionAnswer})=>{
   
    return(
        <>
        <div className="modal-Wrapper"></div>
        <div className="modal-Container">
            <p>Are you sure to delete this file</p>
                <div className='stylebutton'>
                 <Button className='button-primary'  onClick={() => {
                         deleteData({id:itemId});  
                         getQuestionAnswer();
                         closeModel();  
      }} name='Yes' style={{backgroundColor:"red"}}></Button>
             <Button className='button-Secondary' onClick={closeModel} name='No'></Button>   
                </div>
             
        </div>
        </>
    )
 }

 export default MyModal;
