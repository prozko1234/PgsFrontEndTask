import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  searchInputText;
  songsNum = 0;
  textSongs = this.songsNum === 1 ? 'song' : 'songs' ;
  songName = 'Unknown song';
  songAuthor = 'Unknown author';
  thumbnailUrl;
  itunesUrl;
  songsList = {
    day: null,
    dayRange: null,
    month: null
};

  ngOnInit() {
    this.getSearchResult('Ed');
  }

  getSearchResult(searchText) {
    let url = 'https://itunes.apple.com/search?entity=song&term=' + searchText;
    fetch(url)
    .then(data => data.json())
    .then(json => {
      json.results.forEach(song => {
        this.songAuthor = song.artistName;
        this.thumbnailUrl = song.artworkUrl100;
        this.songName = song.trackCensoredName;
      });
    });
  }

}
