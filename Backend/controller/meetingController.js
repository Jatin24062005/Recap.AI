import { response } from "express";
import joinMeetBot from "../services/meetingbot.js";

export const joinBot  = async (req,res) => {
const url = await req.body.url;
   if(!url){
res.status(404).json({ message: "undefined Url", path: req.path, method: req.method });   }
try {
    console.log('⚙️ Received request to join meet:', url);
    const response = await joinMeetBot(url);
    res.status(200).json({ message: 'Bot launched' , response});

    if(response.status === "success") {
      //start recoding and save it into the database
      
    }
  } catch (err) {
    console.error('❌ Bot failed:', err);
    res.status(500).json({ error: 'Bot failed to join meet' });
  }

}
 