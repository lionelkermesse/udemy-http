import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Post} from "./post.model";
import {Constants} from "./app.constant";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private POSTS_ENDPOINT = Constants.SERVER_ENDPOINT + 'posts.json';

  constructor(private http: HttpClient) {
  }

  fetchPosts = (): Observable<Post[]> =>
    // this.http.get<{[key: string], Post}>(this.POSTS_ENDPOINT)

    this.http.get(this.POSTS_ENDPOINT)
      .pipe(
        map((response) => {
          const posts: Post[] = [];
          for (const key in response) {
            if (response.hasOwnProperty(key)) {
              posts.push({...response[key], id: key});
            }
          }
          return posts;
        })
      );

  createPost = (post: Post): Observable<any> =>
    // this.http.post<{ name: string }>(this.POSTS_ENDPOINT, post);
    this.http.post(this.POSTS_ENDPOINT, post);

  deletePosts = (): Observable<any> => this.http.delete(this.POSTS_ENDPOINT)

}
