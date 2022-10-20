import React,{useState,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import axios from "axios";
import Table from 'react-bootstrap/Table';
import { useNavigate,useParams } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import Card from 'react-bootstrap/Card';

const options = [
    { key: 1, text: "pendind", value: "pending" },
    { key: 2, text: "inprogress", value: "inprogress" },
    { key: 3, text: "completed", value: "completed" }
  ];


export const TodoUpdate = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    console.log(id);
    const [tTitle ,setTitle] = useState("");
    const [tStatus ,setStatus] = useState("");
    const [options ,setOptions] = useState([]);
    

    useEffect(() => {
        function getTodo(){
            axios.get("http://localhost:4000/todo/get/"+id).then((res)=>{
                setTitle(res.data.todo.tTitle);
                setStatus(res.data.todo.tStatus);
                
            }).catch((err)=>{
                alert(err);
            })
        }
        getTodo();
     
    }, [])
    
    // handleDropdownChange = (e, data) => {
    //   e.persist();
  
    //   this.setState({ options: data.value });
    // };

    function sendData(e){
        e.preventDefault();
        const newTodo = {
            tTitle,tStatus
        }
        axios.put("http://localhost:4000/todo/update/"+id,newTodo).then(() => {
           navigate("/")
        }).catch((err)=>{
            alert(err);
        })

    }


  return (
    <>
    <Container style={{width:"60%",padding:"20px",marginTop:"20px",paddingBottom:"100px",border: '2px solid '}}>
    <Form onSubmit={sendData}>
      <Form.Group className="mb-3" >
        
        <Form.Control type="text" placeholder="Task Title" value={tTitle}
        onChange={(e) => {
            setTitle(e.target.value);
          }}
          
        />
      </Form.Group>

      
      <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu >
        <Dropdown.Item href="#/action-1">Pending</Dropdown.Item>
        <Dropdown.Item href="#/action-2"> InProgress</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Completed</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </Form>
    </Container>
    {/* <Modal
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
      </Modal> */}
      <Card style={{ width: '18rem',marginTop:"100px" }}>
      
      <Card.Body>
        <Card.Title>Congratulation</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Ok</Button>
      </Card.Body>
    </Card>
    </>
  )
}
