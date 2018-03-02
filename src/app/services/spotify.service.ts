import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService {

  artistas:any[] = [];
  urlspotify:string = 'https://api.spotify.com/v1/';
  token:string = 'BQBBtLX5Y7Tc73-TlcdEjZ-6uthWE7Csa0f-Zgynohz-gLrPZsMxidiLevDAMzJr4dmAgHxevRPSH-nirdI';

  constructor( public http:HttpClient ) {
    console.log('hola inicado');
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Authorization':'Bearer ' + this.token
    });

    return headers;
  }

  getArtistas(termino:string) {
    let url =  `${this.urlspotify}search?q=${termino}&type=artist&limit=20&offset=5`;
    let headers = this.getHeaders();
    //Operador map obtiene la respuesta del observable y lo puede cambiar
    return this.http.get(url, { headers })
                .map( (res:any) => {
                  this.artistas = res.artists.items
                  return this.artistas;
                });
  }

  getArtista(id:string) {
    let url =  `${this.urlspotify}artists/${id}`;
    let headers = this.getHeaders();

    return this.http.get(url, { headers });
  }

  getTopTracks( id: string ) {
    let url =  `${this.urlspotify}artists/${id}/top-tracks?country=US`;
    let headers = this.getHeaders();

    return this.http.get(url, { headers })
                .map( (res:any) => {
                  return res.tracks;
                });
  }



}
