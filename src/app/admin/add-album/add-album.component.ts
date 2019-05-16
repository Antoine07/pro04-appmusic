import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlbumService } from 'src/app/album.service';
import { Router } from '@angular/router';
import { Album } from 'src/app/albums';

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.scss']
})
export class AddAlbumComponent implements OnInit {

  albumForm: FormGroup;

  album: any;

  constructor(
    private fb: FormBuilder,
    private aS: AlbumService,
    private router: Router
  ) {
    this.album = {
      name: '',
      title: '',
      ref: '', // optional
      duration: 0,
      description: '',
      status: 'off'
    }
  }

  ngOnInit() {
    this.initAlbum();
  }

  initAlbum() {

    // FormControl
    // utilisez les validators suivants pattern, max, required, minLength(5)
    this.albumForm = this.fb.group(
      {
        name: new FormControl(this.album.name, [
          Validators.required,
          Validators.minLength(5)
        ]),
        status : this.album.status
      }
    );
  }

  // getter pour récupérer les messages d'erreur dans le formulaire cote html
  get name() { return this.albumForm.get('name'); }

  onSubmit() {

    console.log(
      this.albumForm.value['status'], 
      this.albumForm.value['name']
      );
    
      // au final on utilisera this.albumForm pour créer un nouvel album en base de données
      // ici on doit ajouter un nouvel album
  }


}
