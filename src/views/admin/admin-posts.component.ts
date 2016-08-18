import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostInterface } from '../../components/posts/post.interface';
import { PostsService } from '../../components/posts/posts.service';

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
      summary: post.summary || '',
      createdTime: post.createdTime || ''
    })
  }

  private getPosts(): Array<PostInterface> {
    return this.posts;
  }

  public onPostSelected(index: number): void {
    console.log('onPostSelected', index);
    this.setPostFormGroup(this.posts[index]);
  }

  public submitForm(): void {
    console.log('submitForm', this.postForm);
  }
}