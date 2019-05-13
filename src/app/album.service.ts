import { Injectable } from '@angular/core';
import { Album, List, Position } from './albums'; // types
import { ALBUMS, ALBUM_LISTS } from './mock-albums';

import { Subject, Observable } from 'rxjs'; // librarie à parti intégrée dans Angular

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private _albums: Album[] = ALBUMS; // _ convention private et protected
  private _albumList: List[] = ALBUM_LISTS;

  private albumsUrl = 'https://app-music-71bd0.firebaseio.com/albums';
  private albumListsUrl = 'https://app-music-71bd0.firebaseio.com/albumLists';

  // Observer => next publication d'information et Observable d'attendre des informations et d'exécuter du code
  sendCurrentNumberPage = new Subject<{ current: number, position: Position }>();
  subjectAlbum = new Subject<Album>();
  buttonPlay = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  getAlbums(order = (a, b) => b.duration - a.duration): Album[] {
    return this._albums.sort(order);
  }

  getAlbums2(): Observable<Album[]> {
    return this.http.get<Album[]>(this.albumsUrl + '/.json', httpOptions).pipe(
      // Préparation des données avec _.values pour avoir un format exploitable dans l'application => Array de values JSON
      map(albums => _.values(albums)),
      // Ordonnez les albums par ordre de durées décroissantes
      map(albums => {
        return this._albums.sort(
          (a, b) => { return b.duration - a.duration }
        );
      })
    )
  }

  getAlbum(id: string): Album {
    return this._albums.find(list => list.id === id);
  }

  getAlbumList(id: string): List {
    return this._albumList.find(l => l.id === id);
  }

  count(): number {
    return this._albums == null ? 0 : this._albums.length;
  }

  switchOn(album: Album): void {
    this.buttonPlay.next(false);

    this.getAlbums().map(al => {
      if (album.id === al.id) { al.status = 'on'; this.subjectAlbum.next(album); }
      else al.status = 'off';
    });
  }

  switchOff(album: Album): void {
    this.buttonPlay.next(true);

    this.getAlbums().map(al => {
      al.status = 'off';
    });
  }

  paginate(start: number, end: number): Album[] {
    return this.getAlbums().slice(start, end);
  }

  stop(album: Album) {
  }

  search(word: string | null): Album[] {

    if (word == null) return this.getAlbums();

    let albums = [];

    if (word.length > 3) {

      this.getAlbums().forEach(album => {
        if (album.title.includes(word)) albums.push(album);
      });
    }

    return albums;
  }

}