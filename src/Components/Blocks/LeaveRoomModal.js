import React from 'react'
import {Modal} from 'react-bootstrap'
import Api from './../../Api'

const LeaveRoomModal = ({show, forClose, thisClass}) => {

  const leaveRoom = () => {
    Api.Chat.leaveRoom(thisClass.state.activeRoom.id).then(response => {
      thisClass.addNotification('You successfully leave room','info');
    }, (e) => {});
    thisClass.delRoomFromBar(thisClass.state.activeRoom.id);
    thisClass.setState({activeRoom: {}, messages: []});
    forClose();
  };

  return (
    <div className="bottom-zone">
      <Modal bsSize="small" className="sendMessageModal" show={show} onHide={forClose}>
        <Modal.Header closeButton>
          <Modal.Title>Leave Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Are you sure want leave this room?</h4>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={leaveRoom}  className="btn send-btn">Confirm</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LeaveRoomModal;