import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function StaticExample() {
  return (
    <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>are yo want to delete.</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary">ok</Button>
        
      </Modal.Footer>
    </Modal.Dialog>
  );
}

export default StaticExample;