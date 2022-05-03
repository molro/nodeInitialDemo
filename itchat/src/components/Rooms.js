import React from "react";
import { useState, useEffect, useRef } from "react";

import EVENTS from "../config/events";
import Rooms_style from '../styles/Rooms_style.css'

import {socket} from "../context/SocketContext";
import getRooms from "../services/getRooms";

export default function Room({jwt, user, id}) {
  const [rooms, setRooms] = useState([]);
  const [roomId, setRoomId] = useState('');
  const [newRoom, setRoom] = useState(true);
  const newRoomRef = useRef(null);  
  
  useEffect(() => { 
        socket.emit(EVENTS.CLIENT.CONNECTED, user);
    },[user])

  useEffect(() => {
    getRooms(jwt)
      .then(response => {
      setRooms(response.rooms)
    })
  },[jwt])

  useEffect(() => {//Actualiza cuando se escucha el nuevo evento CREAR desde otros Clientes
    socket.on(EVENTS.SERVER.CREATED_ROOM, (rooms) => {
      setRooms(rooms)
    });

  },[rooms]);
 
  const  createRoom = () =>{ 
    let room = newRoomRef.current.value || '';
    if(!String(room).trim()) return;
    socket.emit(EVENTS.CLIENT.CREATE_ROOM, room);
    room = '';
    setRoom(room)
  }
  
  const joinRoom = (e) => {
    e.preventDefault();
    socket.emit(EVENTS.CLIENT.LEFT_ROOM, id, user)
    window.localStorage.setItem('RoomNow', roomId);
    window.location.reload();
  }
  
  return (
    <div className="rooms">     
      <h2>Salas</h2>
      <div className="rooms__create">
      <form>
 
          <input type='text' placeholder='Nombre de la sala' ref={newRoomRef} />
          <button onClick={createRoom}>Crear nueva sala</button>
      </form>
      </div>
      <div className="rooms__join">
      <form >
          <h2>Unirse</h2>
          <select className="rooms__List" size='5' onChange={(e) => setRoomId(e.target.value)}>
          <optgroup label="Elige tu sala">
          {rooms.map((e) => 
              <option key={e._id} value={e._id}>
              {e.roomName}
              </option>
            )}
          </optgroup>
          </select><br/>
          <button onClick={joinRoom}>Unete!</button>
      </form>
      </div>
    </div>
  )};