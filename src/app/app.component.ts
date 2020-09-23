import { Component, ElementRef, ViewChild } from '@angular/core';
import { UploadService } from './upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;
    files = [];

    constructor(private uploadService: UploadService) {

    }

    uploadFile(event): any {
        this.uploadService.upload(event);
    }

}
