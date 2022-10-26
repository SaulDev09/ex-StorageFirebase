import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { fileItemModel } from '../model/fileItemModel';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {
  @Input() files: fileItemModel[] = [];
  @Output() mouseOver: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any) {
    this.mouseOver.emit(true);
    this.preventStop(event);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.mouseOver.emit(false);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any) {
    this.mouseOver.emit(false);
    const transfer = this._getTransfer(event);
    if (!transfer) { return;}
    this._extractFiles(transfer.files);
    this.preventStop(event);
    this.mouseOver.emit(false);
  }

  private _getTransfer(event: any) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _extractFiles(fileList: FileList) {

    for (const property in Object.getOwnPropertyNames(fileList)) {
      const fileTmp = fileList[property];

      if (this.fileAble(fileTmp)) {
        const newFile = new fileItemModel(fileTmp);
        this.files.push(newFile);
      }
    }

  }


  private fileAble(file: File): boolean {
    if (!this._fileDropped(file.name) && this._isImagen(file.type)) {
      return true;
    } else {
      return false;
    }
  }

  private preventStop(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _fileDropped(fileName: string): boolean {
    for (const file of this.files) {
      if (file.fileName === fileName) {
        console.log('File ' + fileName + 'already added');
        return true;
      }
    }
    return false;
  }

  private _isImagen(fileType: string): boolean {
    return (fileType === '' || fileType === undefined) ? false : fileType.startsWith('image');
  }

}
