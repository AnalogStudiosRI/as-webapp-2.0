import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostInterface, PostsService } from '../../services/posts.service';

@Component({
  selector: 'admin-posts',
  templateUrl: './admin-posts.html',
  styleUrls: [ './admin.css' ],
  providers: [ FormBuilder, PostsService ]
})

export class AdminViewPostsComponent extends OnInit {
  private posts: Array<PostInterface> = [];
  private pristinePost: PostInterface = {
    id: null,
    title: '',
    summary: ''
  };
  public postForm: FormGroup;

  constructor(private FormBuilder: FormBuilder, private PostsService: PostsService){
    super();
    this.setPostFormGroup(this.pristinePost);
  }

  ngOnInit(): void {
    this.PostsService.getPosts().subscribe((data: Array<PostInterface>) => {
      this.posts = data;
    });
  }

  private setPostFormGroup(post: PostInterface): void  {
    this.postForm = this.FormBuilder.group({
      id: post.id || null,
      title: post.title || '',
      summary: post.summary || ''
    })
  }

  private modelPostsRequestBody(): PostInterface {
    let controls = this.postForm.controls;

    return {
      title: controls['title'].value,
      summary: controls['summary'].value
    }
  }

  private createPost(): void {
    //TODO modal / error handling - https://thegreenhouse.atlassian.net/browse/AS-250
    let body = this.modelPostsRequestBody();

    this.PostsService.createPost(body).subscribe(() => {
      this.setPostFormGroup(this.pristinePost);
    }, (error) => {
      console.error('createPost failure!', error);
    });
  }

  private updatePost(): void {
    //TODO modal / error handling - https://thegreenhouse.atlassian.net/browse/AS-250
    let id: number = this.postForm.controls['id'].value;
    let body: PostInterface = this.modelPostsRequestBody();

    this.PostsService.updatePost(id, body).subscribe(() => {
      this.setPostFormGroup(this.pristinePost);
    }, (error) => {
      console.error('Update failure!', error);
    });
  }

  private getPosts(): Array<PostInterface> {
    return this.posts;
  }

  public onPostSelected(index: number): void {
    let post = this.posts[index];

    this.setPostFormGroup(post);
  }

  public submitForm(): boolean {
    console.log('submitForm', this.postForm);
    let isUpdatingPost: boolean = this.postForm.controls['id'].value ? true : false;

    if(isUpdatingPost) {
      this.updatePost();
    } else if(!isUpdatingPost){
      this.createPost();
    } else {
      console.error('unable to submit form');
    }

    return false;
  }

}