import React, { useContext, useState } from 'react'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editItemApi } from '../Apis/allApis';
import { editResponseContext } from '../Apis/Context';

function EditItem({items}) {
    //context
    const {setEditUpdate}=useContext(editResponseContext)

    const [item,setItem]=useState({
        name:items.name,
        description:items.description
      })

      //modal control
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUpdate=async (e)=>{
    e.preventDefault()
    const {name,description}=item
    if(!name || !description){
      toast.error('Please fill all details!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else{
      const reqBody=new FormData()
      reqBody.append("name",name)
      reqBody.append("description",description)

      //item id
      const itemId=items._id 
      //console.log(itemId);

      const result=await editItemApi(reqBody,itemId)
      console.log(result);
      if (result.status === 200) {
        toast.success(`${result.data.name} updated! `, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        setEditUpdate(result.data)
        setShow(false)
    }
    else{
        toast.error('Edit failed!', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    }
  }

  return (
    <div>
        <i onClick={handleShow} className="fa-solid  fa-pen-to-square text-blue-600"></i> 
       <div>
        <Modal  show={show} onHide={handleClose}>
        <div className="bg-dark">
          <Modal.Body>
          <FloatingLabel
        controlId="floatingInput"
        label="Name"
        className="mb-3"
      >
      
        <Form.Control  onChange={(e)=>setItem({...item,["name"]:e.target.value})} value={item.name}  name='name' type="text" placeholder="Name" />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="Description"
        className="mb-3"
      >
        <Form.Control  onChange={(e)=>setItem({...item,["description"]:e.target.value})} value={item.description}  name="description" type="text" placeholder="Description" />
      </FloatingLabel>
      
      <Button variant="outline-danger" onClick={handleClose}>
              Close
            </Button>
            <Button onClick={(e)=>handleUpdate(e)}  className="ms-2" variant="outline-warning" >
              Update Item
            </Button>
          
          </Modal.Body>
          </div>
        </Modal>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default EditItem