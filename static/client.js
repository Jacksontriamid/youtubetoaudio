let convert_btn = document.querySelector('#convert-btn')
let api_res
convert_btn.addEventListener('click',()=>{
    let videoId = document.querySelector('.video-id')
    let sendid;
    function youtube_parser(url){
        // var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        // var match = url.match(regExp);
        // console.log(match&&match[7].length==11)? match[7] : false;
        var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
var match = url.match(regExp);
if (match && match[2].length == 11) {
    sendid=match[2]
} else {
  //error
  sendid = url
}
    }
    youtube_parser(videoId.value)
    if(videoId.value.length!=0){
    const xml = new XMLHttpRequest();
    xml.onreadystatechange = function () {
  if (xml.readyState == XMLHttpRequest.DONE) {
     api_res = xml.responseText
     api_res = JSON.parse(api_res)
}
}
xml.onload = function(){
    let song_title = document.querySelector('.success p')
    let song_link = document.querySelector('.song-link')
    song_title.innerHTML = api_res.song_title
    song_link.href = api_res.song_link
}
xml.open('POST','/convert-mp3',true)
xml.setRequestHeader('Content-Type', 'application/json')          
let send_data = {
videoID:sendid
}
xml.send(JSON.stringify(send_data))
    }
    else{
        let errors = document.querySelector('.errors')
        let errors_p = document.querySelector('.errors-p')
        errors.style.display = 'flex'
        errors_p.innerHTML='Enter a video ID'
    }
})