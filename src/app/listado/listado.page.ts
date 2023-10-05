import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoPage implements OnInit {
  
  personajes: any = []

  encontrados: any

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getPersonajes().subscribe(res => {
      console.log("Res = ", res)
      this.personajes = res
      this.encontrados = this.personajes
    })
  }

  buscar(event: any) {
    const texto = event.target.value
    this.encontrados = this.personajes
    if(texto && texto.trim() != ''){
      this.encontrados = this.personajes.filter((personaje: any) =>{
        return(personaje.name.toLowerCase().indexOf(texto.toLowerCase()) > -1)
      })
    }
  }

  getPersonajes() {
    return this.http
    .get('assets/files/starwars.json')
    .pipe(
      map((resp: any) => {
        return resp.data
      })
    )
  }

}
