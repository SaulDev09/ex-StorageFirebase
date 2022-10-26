import { Component, OnInit } from '@angular/core';
// import { AngularFireStorage } from '@angular/fire/compat/storage';
import { fileItemModel } from 'src/app/model/fileItemModel';
import { UploadImagesService } from 'src/app/providers/upload-images.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html'
})
export class UploadComponent implements OnInit {
  public files: fileItemModel[] = [];
  public isOverElement: boolean = false;

  constructor(
    private uploadImagesService: UploadImagesService,
    // private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
  }

  public onLoadImages() {
    this.uploadImagesService.loadImages(this.files)
  }

  public onClearImages() {
    this.files = [];
  }

  // uploadFile(event: any) {
  //   const file = event.target.files[0];
  //   const filePath = 'PRS01';
  //   const ref = this.storage.ref(filePath);
  //   const task = ref.put(file);
  // }
}
