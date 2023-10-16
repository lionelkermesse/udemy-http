import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {flatMap, map, mergeMap} from "rxjs";
import {Post} from "./post.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private readonly SERVER_ENDPOINT = 'https://udemy-angular-dbe7d-default-rtdb.europe-west1.firebasedatabase.app/';

  loadedPosts: Post[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }


  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http.post<{name: string}>(this.SERVER_ENDPOINT + 'posts.json', postData).subscribe(response => {
      console.log('response', response);
    });
  }

  onFetchPosts() {
    // Send Http request
    this.http.get(this.SERVER_ENDPOINT + 'posts.json')
      .pipe(
        map((response) => {
          const posts: Post[] = [];
          for (const key in response) {
            if(response.hasOwnProperty(key)) {
              posts.push({...response[key], id: key});
            }
          }
          return posts;
        })
      )
      .subscribe(results => {
        console.log('results', results);
        this.loadedPosts = results
      })
  }

  onClearPosts() {
    // Send Http request
  }
}
