import React from 'react'
import {Modal, Button} from 'react-bootstrap'

export default function NewModal(props) {
    return (
        <Modal size={props.size} show={props.show} onHide={props.handleClose} 
            animation={false}>
            <Modal.Header closeButton>
            <Modal.Title>{props.modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                {
                    props.buttons && props.buttons.map((btn, index) =>
                        <Button key={index} variant={btn.color} onClick={btn.onClick}>
                            {btn.label}
                        </Button>
                        )
                }
            <Button variant="primary" 
                style={{backgroundColor: "#333"}}
                {...props} className="btn-sm" onClick={props.handleSavenClose}>
                Save
            </Button>
            <Button variant="secondary" className="btn-sm" onClick={props.handleClose}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
    )
}
