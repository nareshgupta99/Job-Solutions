
import { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { IoMdSend } from "react-icons/io";

const ChatBot = () => {
    const { transcript, resetTranscript } = useSpeechRecognition();
    const [text,setText]=useState()

    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });

    useEffect(()=>{
        SpeechRecognition.startListening({continuous:true})
        console.log('listening start')
    },[])

    const handleSubmit=async(e)=>{
        setText()
        resetTranscript()
       let p= document.createElement("p")
       p.innerHTML()
    }

    function handleChange(e){
        setText(e.target.value)
    }


    return (
        // <div style={{position:"relative",bottom:"10px"}} >
        //     <textarea value={transcript} style={{width:"80%"}}></textarea>
        //     <button onClick={handleSubmit} style={{position:"relative",top:"-1.2em" ,border:"none",background:"white",right:"0px",}}><IoMdSend style={{color:"black",width:"40px"}} /></button>
        //     {/* <button onClick={resetTranscript} className='btn' >clear text</button> */}
        // </div>
<div style={{height:"100vh",width:"100%"}}>

        <div style={{display: "flex", flexDirection: "column", justifyContent: "flex-end",  height: "85vh"}}>
    <div style={{position: "relative", bottom: "10px"}}>
        <textarea value={transcript} style={{width: "80%"}} name='text' onChange={handleChange}></textarea>
        <button onClick={handleSubmit} style={{position: "relative", top: "-1.2em", border: "none", background: "white", right: "0px"}}>
            <IoMdSend style={{color: "black", width: "40px"}} />
        </button>
        {/* <button onClick={resetTranscript} className='btn' >clear text</button> */}
    </div>

    <p></p>
</div>
</div>

    );
};

export default ChatBot;