// const express = require('express')
// const bodyParser = require('body-parser')
// const expressFileUpload = require('express-fileupload');
// const app = express()

// app.use(bodyParser.urlencoded({extended:false}));

// app.use(bodyParser.json())

// app.use(expressFileUpload({
//     useTempFiles:true,
//     tempFileDir:"/tmp/",
// }))

// // fluent.setFfmpegPath("c:/ffmpeg/bin/ffmpeg.exe")
// // fluent.setFfprobePath("c:/ffmpeg/bin")
// // fluent.setFlvtoolPath("c:/flvtool")

// // console.log(fluent)

// app.get('/',(req,res)=>{
//     res.sendFile(__dirname + '/index.html')
// })

// // app.post('/convert',(req,res)=>{
// //     var to = req.body.to
// //     let file = req.files.file
// //     let fileName = `output.${to}`
// //     console.log(to)
// //     console.log(file)
// //     file.mv('tmp/'+file.name,function(err){
// //         if(err) return res.sendStatus(500).send(err)
// //         console.log('file uploaded succesfully');
         
// //      })

// //      fluent("tmp/"+file.name)
// //      .withOutputFormat(to)
// //      .on('end',function(stdout,stderr){
// //         console.log("finished")
// //         res.download(__dirname+fileName,function(err){
// //             if(err) throw err;
// //             fs.unlink(__dirname+fileName,function(err){
// //                 if(err) throw err;
// //                 console.log('file deleted')
// //             })
// //         })
// //         fs.unlink('tmp/'+file.name,function(err){
// //             if(err) throw err;
// //             console.log('file deleted')
// //         })
// //      })
// //      .on('error',function(err){
// //         console.log('error takes place')
// //         fs.unlink('tmp/'+file.name,function(err){
// //             if(err) throw err;
// //             console.log('file deleted')
// //         })
// //      })
// //      .saveToFile(__dirname + fileName)
// // })

// app.listen(4000,() => {
//     console.log('App listening on port 4000')
// })



const express = require('express')
const fetch = require('node-fetch') // use version 2.6.6 to fix error
require("dotenv").config()
// express server
const path = require('path');
const app = express()
let initial_path = path.join(__dirname, "static");
const PORT  = process.env.PORT || 2000
//set template engine
app.set('view engine','html');
app.engine('html', require('ejs').renderFile);
//parsing html for post request
app.use(express.static(initial_path));
app.use(express.urlencoded({
    extended:true
}))
app.use(express.json());
app.use('/static', express.static('static'));
// app.set('views',path.join(__dirname,'views'))
app.set('view engine','html');
app.set('views',path.join(__dirname,'views'))
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, "/views/index.html"));
})
app.post('/convert-mp3',async (req,res)=>{
    const videoId = req.body.videoID;
    const fetchAPI = await fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`,{
        "method":"GET",
        "headers":{
            "x-rapidapi-key":process.env.API_KEY,
            "x-rapidapi-host":process.env.API_HOST
        }
    })
    const fetchResponse = await fetchAPI.json();

    console.log(videoId)
    
        if(fetchResponse.status == 'ok'){
        return res.send(JSON.stringify({
            success:true, song_title:fetchResponse.title, song_link:fetchResponse.link
        }))
    }
    else{
        res.send(JSON.stringify({
           success:false,message:fetchResponse.msg
        }))
    }
})
app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`)
})