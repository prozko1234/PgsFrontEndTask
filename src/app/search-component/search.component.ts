import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  searchInputText;
  songsNum = 0;
  textSongs = this.songsNum === 1 ? 'song' : 'songs' ;
  songsList = [];

  ngOnInit() {
    this.songsNum = null;
  }

  getSearchResult(searchText): void {
    let testSongsList = new Array();
    let url = 'https://itunes.apple.com/search?entity=song&limit=200&term=' + searchText;
    fetch(url)
    .then(data => data.json())
    .then(json => {
      this.songsNum = json.results.length;
      console.log(json);
      json.results.forEach(songItem => {
        let song = {
          songName: songItem.trackCensoredName,
          songAuthor: songItem.artistName,
          thumbnailUrl: songItem.artworkUrl100,
          itunesUrl: songItem.artistViewUrl
      };
        testSongsList.push(song);
        this.songsList = testSongsList;
      });
    });
  }

}
