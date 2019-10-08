import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchInputText;
  songsNum = 0;
  endingText = this.songsNum === 1 ? ' song' : ' songs' ;
  textSongs = 'Type song name or author';
  songsList = [];
  p: number = 1;

  ngOnInit() {
    this.songsNum = null;
  }

  getSearchResult(searchText): void {
    if (this.searchInputText === undefined || '') {
      this.songsNum = 0;
      return;
    }
    const testSongsList = new Array();
    const url = 'https://itunes.apple.com/search?entity=song&limit=200&term=' + searchText;
    fetch(url)
    .then(data => data.json())
    .then(json => {
      this.songsNum = json.results.length;
      this.textSongs = 'Found: ' + this.songsNum + this.endingText;
      if (this.isThereSongs()) {
        json.results.forEach(songItem => {
        const song = {
          songName: songItem.trackCensoredName,
          songAuthor: songItem.artistName,
          thumbnailUrl: songItem.artworkUrl100,
          itunesUrl: songItem.trackViewUrl
      };
        testSongsList.push(song);
        this.songsList = testSongsList;
      });
      } else {
        this.songsList = new Array();
      }
    });
  }

  isThereSongs(): boolean {
      if (this.songsNum == 0) {
        return false;
      }
      return true;
  }

}
