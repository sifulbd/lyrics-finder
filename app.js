
// artist song name search input and use search event handler

document.getElementById('search').addEventListener('click',function(evt){
  const songName = document.getElementById('searchBox').value;
  document.getElementById('searchBox').value = '';
  const ApiUrl = `https://api.lyrics.ovh/suggest/${songName}`;
  fetch(ApiUrl)
  .then(response => response.json())
  .then(data => searchResult(data))
  .catch((error) => {
      const songsList = document.getElementById('songs-list');
      songsList.innerHTML = '';
      songsList.innerHTML = 'result not found';
  });
  evt.preventDefault();
})

const searchResult = data=>{
  const songsList = document.getElementById('songs-list');
  songsList.innerHTML = '';
  for(let i = 0; i < 10; i++){
  songsList.innerHTML += `
  
        <div class="search-result col-md-8 mx-auto">
             <div class="single-result row align-items-center my-3 p-3">
                <div class="col-md-9">
                  <h3 class="lyrics-name"><strong>${data.data[i].title}</strong></h3>
                  <p class="author lead"> Album by <span>${data.data[i].album.title}</span>
                        </p>
                  <p> <a href="${data.data[i].artist.link}" target="_blank" style="text-decoration: none; color:green; font-size:25px;"> Lyrics Mp3 Link:</a></p>
                </div>

               <div class="col-md-3 text-md-right text-center">
                  <button onclick="lyrics('${data.data[i].title}','${data.data[i].artist.name}')" class="btn btn-success">Get Lyrics</button>
              </div>
            </div>


      </div>
    `;
  }   
}
// get lyrics 
const lyrics = (titleName, artistName)=>{ 
  const lyricsApiUrl = `https://api.lyrics.ovh/v1/${artistName}/${titleName}`
  fetch(lyricsApiUrl)
  .then(response => response.json())
  .then(data => showLyrics (data, titleName, artistName))
}

// display Lyrics result
document.getElementById('lyricId').style.display = 'none';
const showLyrics = (data, titleName, artistName) => {
  if(data.error == 'No lyrics found'){
      document.getElementById('song-title').innerHTML = ` ${titleName} lyrics is not found`;
      document.getElementById('lyrics-field').innerHTML ='';
      document.getElementById('lyricId').style.display = 'block';
      setTimeout(function(){
        document.getElementById('lyricId').style.display = 'none';

      }, 3000)
  }
  else{
    document.getElementById('song-title').innerHTML = `${titleName} --- ${artistName}`;
    document.getElementById('lyrics-field').innerHTML = data.lyrics;
    document.getElementById('lyricId').style.display = 'block';
  }
}

document.getElementById('close').addEventListener('click', function() {
  document.getElementById('lyricId').style.display = 'none';
})
