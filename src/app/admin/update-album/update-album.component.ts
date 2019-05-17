import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/album.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Album } from 'src/app/albums';

@Component({
  selector: 'app-update-album',
  templateUrl: './update-album.component.html',
  styleUrls: ['./update-album.component.scss']
})
export class UpdateAlbumComponent implements OnInit {

  updateFormAlbum: FormGroup;
  messageError: string;
  album: Album;

  constructor(private aS: AlbumService, private fb: FormBuilder) { }

  ngOnInit() {
    const id = "-LKdlklqin9090"; // dans la route pensez à récupérer l'id

    this.initAlbum(); // crée l'objet

    this.aS.getAlbum(id).subscribe(
      album => {
        // hydrate l'objet
        this.updateFormAlbum.patchValue(album);
      }
    );

  }

  initAlbum() {

    // FormControl
    // utilisez les validators suivants pattern, max, required, minLength(5)
    this.updateFormAlbum = this.fb.group(
      {
        id: this.album.id,
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(5)
        ]),
        title: new FormControl('', [
          Validators.required,
        ]),
        ref: new FormControl('', [
          Validators.required,
          Validators.pattern("[a-zA-Z0-9\_]{5}") // regex pour vérifire une syntaxe
        ]),
        duration: new FormControl('', [
          Validators.required,
          Validators.max(960)
        ]),
        description: '',
        status: '',
        price: 0,
        priceTTC: 0,
        priceHT: 0,
        proposition: new FormControl('', [
          Validators.required,
          Validators.min(100),
        ]),
      }
    );
  }

  // getter pour récupérer les messages d'erreur dans le formulaire cote html
  get name() { return this.updateFormAlbum.get('name'); }
  get title() { return this.updateFormAlbum.get('title'); }
  get ref() { return this.updateFormAlbum.get('ref'); }
  get duration() { return this.updateFormAlbum.get('duration'); }
  get description() { return this.updateFormAlbum.get('description'); }
  get price() { return this.updateFormAlbum.get('price'); }
  get proposition() { return this.updateFormAlbum.get('proposition'); }
  get priceTTC() { return this.updateFormAlbum.get('priceTTC'); }

  onSubmit() { console.log(this.updateFormAlbum.value); }

}
