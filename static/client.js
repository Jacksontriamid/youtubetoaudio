let convert_btn = document.querySelector('#convert-btn')
let api_res
convert_btn.addEventListener('click',()=>{
    let videoId = document.querySelector('.video-id')
    if(videoId.value.length!=0){
    const xml = new XMLHttpRequest();
    xml.onreadystatechange = function () {
  if (xml.readyState == XMLHttpRequest.DONE) {
     api_res = xml.responseText
     api_res = JSON.parse(api_res)
     console.log(api_res)
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
videoID:videoId.value
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