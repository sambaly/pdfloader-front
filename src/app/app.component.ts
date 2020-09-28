import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { UploadService } from './upload.service';
import {Result} from './Shared/result.model';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;
    files = [];
    articleWritersAndOccurrences: Result[] = [];

    constructor(
        private uploadService: UploadService,
        private httpClient: HttpClient
    ) {
    }

    ngOnInit(): void {
        this.loadResultsWithOccurrences();
    }

    uploadFile(event): any {
        this.uploadService.upload(event);
    }

    // @ts-ignore
    async loadResultsWithOccurrences(): Promise<Result[]> {
        const data = await this.httpClient.get<Result[]>(this.uploadService.SERVER_URL + '/results/all-results').toPromise();
        this.articleWritersAndOccurrences = data;
        console.log('datas here again', this.articleWritersAndOccurrences);
    }

}
