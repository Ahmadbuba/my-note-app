import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { SimpleNote } from 'src/app/shared/simple-note.model';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.scss'],
})
export class NoteEditComponent implements OnInit, OnDestroy {
  isLoading = false;
  subscription: Subscription;
  data: SimpleNote;

  title: string;
  content: string;

  constructor(
    private dataStorageService: DataStorageService,
    private notesService: NotesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscription = this.notesService.id.subscribe(
      (resData: SimpleNote) => {
        console.log('This is the id of the note: ' + resData.note_id);
        this.data = { ...resData };
        this.title = this.data.title;
        this.content = this.data.content;
      }
    );
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const title = form.value.title;
    const content = form.value.content;

    console.log('this is the value: ' + content);
    this.isLoading = true;
    this.dataStorageService
      .updateNote(this.data.note_id, title, content)
      .subscribe((resData) => {
        this.isLoading = false;
        console.log('here I am, i work:');
        console.log(resData);
        this.router.navigate(['/notes']);
      });
  }

  onCancel() {
    this.router.navigate(['/notes']);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
