import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgUploadComponent } from '../ng-upload.component';

interface NgFile {
  files: File[];
  $files: {
    name: string;
    type: string;
    extension: string;
    size: string | number;
    src: string;
  }[];
}

@Component({
  selector: 'ng-upload-list',
  templateUrl: './ng-upload-list.component.html',
  styleUrls: ['./ng-upload-list.component.scss'],
})
export class NgUploadListComponent implements OnInit {
  _ngUploadRef: NgUploadComponent;
  $valueChanges: Subscription;
  files: NgFile = {
    $files: [],
    files: [],
  };

  @Input() set ngUploadRef(value: NgUploadComponent) {
    if (this.$valueChanges) {
      this.$valueChanges.unsubscribe();
    }
    this._ngUploadRef = value;
    this.$valueChanges = this._ngUploadRef.control.valueChanges.subscribe(
      (files: FileList) => {
        Array.from(files).forEach(async (file) => {
          let extension = file.name.split('.');
          this.files.files.push(file);
          this.files.$files.push({
            name: file.name,
            extension: extension.pop(),
            type: file.type,
            size: (file.size / 1024).toFixed(2),
            src: await this.handleBase64(file),
          });
        });
      }
    );
  }

  constructor() {}

  async handleBase64(result: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.onerror = (error) => reject(error);
      fileReader.readAsDataURL(result);
    });
  }

  ngOnInit() {}
}
