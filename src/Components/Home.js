import React,{useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import axios from "axios";
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';


function Home() {
    const navigate = useNavigate();
    const [tTitle ,setTitle] = useState("");
    const [tStatus ,setStatus] = useState("");
    const [todos, setTodos] = useState([]);
    const [smShow, setSmShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);

    useEffect(() => {
        function getTodos(){
            axios.get("http://localhost:4000/todo/")
            .then((res)=>{
                console.log(res.data);
                setTodos(res.data);
            }).catch((err)=>{
                alert(err);
            })
        }
        getTodos();
    },[])

   

function sendData(e){
    e.preventDefault();
    const newTodo = {
        tTitle,tStatus:"Pending"
    }
    axios.post("http://localhost:4000/todo/add",newTodo).then(() => {
        alert("todo added");
         navigate(0);
        
    }).catch((err)=>{
        alert(err);
    })

}
function UpdateTodo(id){
    navigate("/update/"+id);

}
function DeleteTodo(id){
    axios.delete("http://localhost:4000/todo/delete/"+id).then((res) => {
        navigate(0);
}).catch((err) => {
    alert(err.message);
})
}
  return (
    <>
    <Container style={{width:"60%",padding:"20px",marginTop:"20px",border: '2px solid '}}>
    <Form onSubmit={sendData}>
      <Form.Group className="mb-3" >
        
        <Form.Control type="text" placeholder="Task Title"
        onChange={(e) => {
            setTitle(e.target.value);
          }}
          
        />
      </Form.Group>

      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </Container>
    <Container style={{width:"60%",padding:"20px",marginTop:"20px",border: '2px solid '}}>
    <Table striped bordered hover>
      <thead>
        <tr>
         
          <th>Title</th>
          <th>Status</th>
          {/* <th>Username</th> */}
        </tr>
      </thead>
      <tbody>
      {
            todos.map((data)=> {
                return(
                    <tr key={data._id}>
                    <td>{data.tTitle}</td>
                    <td>{data.tStatus}</td>
                    
                    <td>
                    <Button onClick={()=>UpdateTodo(data._id)} variant="warning">Edit</Button>
                    <Button onClick={() => setSmShow(true)} variant="danger" style={{marginLeft:"10px"}}>Delete</Button>
                    </td>
                    </tr>
                )
            })
        }
        
      </tbody>
    </Table>
    </Container>
   
      
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Are you want to delete
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Button onClick={()=>DeleteTodo()} className="me-2">
       OK DELETE
      </Button>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Home