import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Result} from './Shared/result.model';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
    public SERVER_URL = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }


  public upload(event): any {
      const fileList: FileList = event.target.files;
      if (fileList.length > 0) {
          const file: File = fileList[0];
          const formData: FormData = new FormData();
          formData.append('postedPdf', file, file.name);
          const headers = new HttpHeaders();
          /** In Angular 5, including the header Content-Type can invalidate your request */
          headers.append('Content-Type', undefined);
          headers.append('Accept', 'application/json');
          //  let options = new RequestOptions({ headers: headers });
          const options = {
              params: new HttpParams(),
              headers
          };
          console.log(formData, file, typeof file, typeof file.name);
          this.httpClient.post(this.SERVER_URL + '/api/pdf-loaded', formData, options)

              .subscribe(
                  data => console.log('success'),
                  error => console.log(error)
              );
      }

  }

}
