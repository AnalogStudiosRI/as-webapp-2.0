import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostInterface, PostsService } from '../../services/posts.service';

@Component({
  selector: 'admin-posts',
  templateUrl: './src/views/admin/admin-posts.html',
  styleUrls: [ './src/views/admin/admin.css' ],
  providers: [ FormBuilder, PostsService ]
})

export class AdminViewPostsComponent extends OnInit {
  private posts: Array<PostInterface> = [];
  private pristinePost: PostInterface = {
    id: null,
    title: '',
    summary: '',
    createdTime: null
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
    //yes, it is known we are picking the endTime for the user.  it is a required field
    let controls = this.postForm.controls;

    return {
      title: controls['title'].value,
      summary: controls['summary'].value
    }
  }

  private createPost(): void {
    //TODO modal / error handling
    let body = this.modelPostsRequestBody();

    this.PostsService.createPost(body).subscribe((response) => {
      console.log('createPost sucess and refresh!', response);
    }, (error) => {
      console.error('createPost failure!', error);
    });
  }

  private updatePost(): void {
    //TODO modal / error handling
    let id: number = this.postForm.controls['id'].value;
    let body: PostInterface = this.modelPostsRequestBody();

    this.PostsService.updatePost(id, body).subscribe((response) => {
      console.log('Update sucess and refresh!', response);
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