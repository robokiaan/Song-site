var songs = []
var songList = [
    `Bones - Imagine Dragons`,
    `Radioactive - Imagine Dragons`,
    `Shotgun - Geogre Ezra`,
    `House of memories - panic! At the Disco`,
    `Closer - Chainmokers`,
    `Blah Blah Blah - Armin Van Buuren`,
    `Counting stars - One direction`,
    `Titanium - David guetta`,
    `As it was - Harry Styles`,
    `Toxic - Boywithuke`
]

var favourites = []

jQuery(document).ready(function () {
    jQuery('.screen').hide()
    jQuery('.home-screen').show()
    if (localStorage.getItem('songs') != null || localStorage.getItem('favouriteSongs') != null) {
        if (localStorage.getItem('favouriteSongs') != '') {
            favourites = String(localStorage.getItem('favouriteSongs')).split(',')
        }
        songs = stringToSongs(localStorage.getItem('songs'))
    }
    updateHome()
})

function createPlaylist() {
    songs.push([
        jQuery('#playlist-name').val()
    ])
    updateHome()
    nav('home-screen')
    save()
}

function openPlaylist(name, index) {
    jQuery('.screen').hide()
    jQuery('.playlist-view').show()
    jQuery('.playlist-view').html('')
    jQuery('.playlist-view').prepend(`
        <h1 class="col-xs-12 heading">${name}</h1>
        <br><br>
        <ul class="songs col-xs-8"></ul>
        <div class="col-xs-4 playlist-options">
            <button class="btn btn-merge col-xs-12 submit-button" onclick="deletePlaylist(${index})">
                Delete Playlist
            </button>
        </div>
    `)
    for (i = 1; i < songs[index].length; i++) {
        jQuery('.songs').append(`
            <li><label class='col-xs-11'>${songs[index][i]}</label> <button class='btn btn-merge btn-delete col-xs-1' onclick='deleteSong(${index}, ${i}, "${name}")'>&times;</button></li>
        `)
    }
}

function deleteSong(index, i, name) {
    songs[index].splice(i, 1)
    openPlaylist(name, index)
    save()
}

function deletePlaylist(index) {
    songs.splice(index, 1)
    updateHome()
    nav('home-screen')
    save()
}

function playPlaylist(index) {
    var selectedSongs = songs[index]
    for (i = 1; i < selectedSongs.length; i++) {
        jQuery('.playlist-options').append(`
            <audio autoplay>
                <source="${selectedSongs[i]}.mp3" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
        `)
    }
}

function nav(screen) {
    jQuery('.screen').hide()
    jQuery('.' + screen).show()
    jQuery('.list').html('')
    if (screen == 'search-screen') {
        for (i = 0; i < songList.length; i++) {
            jQuery('.list').append(`
                <li>
                    <a href='#' class="col-xs-4 song">${songList[i]}</a>
                    <button class="btn btn-merge col-xs-1" onclick="addToPlaylist('${songList[i]}')">
                        <i class="material-icons">add</i>
                    </button>
                    <div class="col-xs-1"></div>
                    <button class="btn btn-merge col-xs-1" onclick="addToFavourites('${songList[i]}')">
                        <i class="material-icons">star</i>
                    </button>
                    <div class="col-xs-1"></div>
                    <audio controls>
                        <source src="${songList[i]}.mp3" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                </li>
            `)
        }
    } else if (screen == 'favourites-screen') {
        jQuery('.favourites').html('')
        for (i = 0; i < favourites.length; i++) {
            jQuery('.favourites').append(`
                <li>
                    <label class="col-xs-4 song">${favourites[i]}</label>
                    <button class="btn btn-merge col-xs-1" onclick="addToPlaylist('${favourites[i]}')">
                        <i class="material-icons">add</i>
                    </button>
                    <div class="col-xs-1"></div>
                    <button class="btn btn-merge col-xs-1" onclick="removeFromFavourites('${favourites[i]}')">
                        <i class="material-icons">star</i>
                    </button>
                    <div class="col-xs-1"></div>
                    <audio controls>
                        <source src="${favourites[i]}.mp3" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                </li>
            `)
        }
    }
}

function removeFromFavourites(name) {
    var index = favourites.indexOf(name)
    favourites.splice(index, 1)
    nav('home-screen')
    save()
}

function addToFavourites(name) {
    if (favourites.includes(name) == false) {
        favourites.push(name)
    }
    nav('favourites-screen')
    save()
}

function addToPlaylist(songName) {
    nav('add-to-playlist-screen')
    jQuery('.song-list').html('')
    for (i = 0; i < songs.length; i++) {
        jQuery('.song-list').append(`
            <li class="col-xs-12">
                <button class="btn song btn-merge col-xs-12" onclick="addSongToPlaylist(${i}, '${songName}')">
                    ${songs[i][0]}
                </button>
            </li>
        `)
    }
    save()
}

function addSongToPlaylist(index, name) {
    songs[index].push(name)
    nav('home-screen')
    save()
}

function updateHome() {
    jQuery('#playlist-list').html('')
    for (i = 0; i < songs.length; i++) {
        jQuery('#playlist-list').append(`
            <li>
                <button class="playlist btn col-xs-12" onclick="openPlaylist('${songs[i][0]}', ${i})">
                    ${songs[i][0]}
                </button>
            </li>
        `)
    }
}

function songsToString(array) {
    var songsString = ''
    for (i = 0; i < array.length; i++) {
        songsString = songsString + array[i].toString() + ' || '
    }
    return songsString
}

function stringToSongs(string) {
    var newSongs = string.split(' || ')
    newSongs.pop()
    for (i = 0; i < newSongs.length; i++) {
        newSongs[i] = newSongs[i].split(',')
    }
    return newSongs
}

function save() {
    localStorage.setItem('songs', songsToString(songs))
    localStorage.setItem('favouriteSongs', favourites.toString())    
}

function search() {
    var input, filter, ul, li, a, i;
    input = jQuery('.searchBar').val()
    filter = String(input).toUpperCase();
    ul = document.getElementById("myMenu");
    li = ul.getElementsByTagName("li");

    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }