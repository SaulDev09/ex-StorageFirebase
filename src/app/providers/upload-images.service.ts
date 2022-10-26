import { Injectable } from '@angular/core';
import { fileItemModel } from '../model/fileItemModel';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class UploadImagesService {
  public folderImages = 'images';

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {

  }

  // getImages() {
  //   this.itemsCollection = afs.collection<Item>('items');
  // }
  
  loadImages(images: fileItemModel[]) {
    for (const item of images) {
      item.isUploading = true;
      if (item.progress >= 100) { continue }

      const file = item.file;
      const filePath = `${this.folderImages}/${item.fileName}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);

      task.percentageChanges().subscribe((rpta: any) => { item.progress = rpta; });

      task.snapshotChanges().subscribe((rpta_: any) => {
        fileRef.getDownloadURL().subscribe((rpta: any) => {
          item.isUploading = false;
          item.url = rpta;
          this.saveImage({
            name: item.fileName,
            url: item.url
          });
        });
      })
    }
  }

  public saveImage(imagen: { name: string, url: string }) {
    this.db.collection(`/${this.folderImages}`).add(imagen);
  }
}
