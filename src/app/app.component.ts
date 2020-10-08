import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { UploadService } from './upload.service';
import {Result} from './Shared/result.model';
import {HttpClient} from '@angular/common/http';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;
    files = [];
    articleWritersAndOccurrences: Result[] = [];
    dataSource;
    public disponibleDatas: any;
    displayedColumns = ['writerName', 'writerOccurrencesCount', 'dateEnregistrement'];
    public pageSlice: any;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private uploadService: UploadService,
        private httpClient: HttpClient
    ) {
    }

    // tslint:disable-next-line:typedef use-lifecycle-interface
    ngAfterViewInit() {
        // this.dataSource.paginator = this.paginator;
    }

    ngOnInit(): void {
        this.disponibleDatas = false;
        this.loadResultsWithOccurrences();
    }

    uploadFile(event): any {
        this.uploadService.upload(event);
    }

    // @ts-ignore
    async loadResultsWithOccurrences(): Promise<Result[]> {
        this.articleWritersAndOccurrences = await this.httpClient.get<Result[]>(this.uploadService.SERVER_URL + '/results/all-results').toPromise();
        this.pageSlice = this.articleWritersAndOccurrences.slice(0, 5);
        this.disponibleDatas = this.articleWritersAndOccurrences ? true : false;
        // this.articleWritersAndOccurrences = data;
        this.dataSource = new MatTableDataSource<Result>(this.pageSlice);
        // this.dataSource.paginator = this.paginator;
        console.log('datas here again', this.articleWritersAndOccurrences);
    }

    onPageChange(event: PageEvent): void {
        console.log(event);
        const startIndex = event.pageIndex * event.pageSize;
        let endIndex = startIndex + event.pageSize;
        if (endIndex > this.articleWritersAndOccurrences.length) {
            endIndex = this.articleWritersAndOccurrences.length;
        }
        this.pageSlice = this.articleWritersAndOccurrences.slice(startIndex, endIndex);
    }
}
