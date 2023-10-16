import {Component, OnInit} from '@angular/core';
import {Post} from "./post.model";
import {PostService} from "./post.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loadedPosts: Post[] = [];
  isFetching: boolean;
  error = null;

  constructor(private postService: PostService) {
  }

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost = (postData: { title: string; content: string }) => {
    this.postService.createPost(postData).subscribe(response => {
      console.log(response);
      this.onFetchPosts();
    })
  }

  onFetchPosts = () => {
    // Send Http request
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(
      results => {
        this.isFetching = false;
        this.loadedPosts = results;
      },
      error => {
        console.error(error);
        this.isFetching = false;
        this.error = error.message;
      })
  }

  onClearPosts = () => {
    // Send Http request
    this.postService.deletePosts().subscribe(() => {
      this.onFetchPosts();
    });
  }

  closeErrMsg = () => {
    this.error = null;
  }
}
