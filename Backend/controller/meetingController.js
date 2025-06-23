import joinMeetBot from "../services/meetingbot.js";

export const joinBot  = async (req,res) => {
const url = await req.body.url;
   if(!url){
res.status(404).json({ message: "undefined Url", path: req.path, method: req.method });   }
   try {
    const response = await joinMeetBot(url);
    res.send({
        response,
    })
   } catch (error) {
    console.log(error)
   }

}
 