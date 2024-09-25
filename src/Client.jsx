// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// // import random from "random";
// import './Client.css';


// const socket = io("http://localhost:3001");

// export const Client = () => {

//     const [messages, setMessages] = useState([])
//     const [input, setInput] = useState("")
//     const[room, setRoom]=useState("")
//     // const[auther,setAuther]=useState(null);
//     function sendmessage(e){
//         e.preventDefault()
//         setMessages((prev)=>
//         [...prev,input])
//         socket.emit("chat message",input,room)

        
        
        
        

        
//     }
//     useEffect(()=>{
//         socket.on("recieve-message",(msg)=>{
//             console.log(msg);
//               setMessages((prev)=>
//               [...prev,msg]

//             )
//         })
//         return()=>{
//             socket.off("recieve-message")
//         }
//     })

//     const joinroom=(e)=>{
//         e.preventDefault();
//         if(room){
//             socket.emit("joinroom",room)
//         }
//     }






//     return (


//         <div>
//             {
//                 messages.map((msg)=>{
//                     return <p>{msg}</p>
//                 })
//             }


//             <form  onSubmit={sendmessage}>
//                 <input type="text" placeholder="message" 
//                 onChange={(e)=>{setInput(e.target.value)}} />
//                 <button>send</button>


//             </form>
//             <form onSubmit={joinroom}>
//                 <input type="text" placeholder="enter the room number" 
//                 value={room}
//                  onChange={(e)=>setRoom(e.target.value)} />
//                 <button>send</button>
//             </form>


//         </div>


//     )
// }

import React, { useEffect, useState } from 'react';
import './Client.css';
import { io } from "socket.io-client";
// import random from "random";

const socket = io("http://localhost:3001");




function Client() {

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [room, setRoom] = useState("");
   




    useEffect(() => {
       
        socket.on("message-receive", (msg) => {


            setMessages((pre) =>
                [...pre, msg]
            )
        })
        return () => {
            socket.off("message-receive")
        }
    }, [])

    function handleSendMessage(e) {
        e.preventDefault()
        setMessages((pre) =>
            [...pre, input]

        )
        socket.emit("chat message", input, room)
        setInput("")
    }
    const joinroom = (e) => {
        e.preventDefault()
        if (room){
            socket.emit("joinroom",room)
        }

    }




    return (
        <div>
        <h1 className='heading'>Chat Application</h1>


        <div className='maindiv'>


            <div className='msgdiv'>{messages.map((msg, index) => {
                return <p key={index} className='paragragh'>{msg}</p>
            })}
            </div>
            <form onSubmit={handleSendMessage} className='form'>

                <input type="text" onChange={(e) => {
                    setInput(e.target.value)

                }} className='input' />
                <button className='button' >send</button>
            </form>

            <form onSubmit={joinroom} className='joinnowform'>
                <input value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    placeholder='enter room number' className='joinnowinput' />

                <button className='joinnow button'>join now</button>
            </form>



        </div>
        </div>

    )
}

export default Client
