import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgUploadComponent } from '../ng-upload.component';

interface NgFile {
  name: string;
  type: string;
  size: number;
  src: string;
}

@Component({
  selector: 'ng-upload-list',
  templateUrl: './ng-upload-list.component.html',
  styleUrls: ['./ng-upload-list.component.scss'],
})
export class NgUploadListComponent implements OnInit {
  _ngUploadRef: NgUploadComponent;
  $valueChanges: Subscription;
  files: NgFile[] = [
    {
      name: 'Douglas.png',
      size: 1024,
      src: 'https://avatars.githubusercontent.com/u/61251163?v=4',
      type: 'image/png',
    },
  ];

  @Input() set ngUploadRef(value: NgUploadComponent) {
    if (this.$valueChanges) {
      this.$valueChanges.unsubscribe();
    }
    this._ngUploadRef = value;
    this.$valueChanges = this._ngUploadRef.control.valueChanges.subscribe(
      (files: FileList) => {
        Array.from(files).forEach(async (file) => {
          this.files.push({
            name: file.name,
            type: file.type,
            size: file.size,
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
