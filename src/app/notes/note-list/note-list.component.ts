import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Note } from 'src/app/shared/note.model';
import { SimpleNote } from 'src/app/shared/simple-note.model';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss'],
})
export class NoteListComponent implements OnInit, OnDestroy {
  notes: Note[];
  sub: Subscription;
  isLoading = false;
  note: SimpleNote;

  constructor(
    private dataStorageService: DataStorageService,
    private noteService: NotesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.sub = this.dataStorageService.fetchNotes().subscribe((n) => {
      this.isLoading = false;
      console.log(n);
      this.notes = [...n.data];
      console.log(this.notes);
      // let cook = this.cookie.get('auth');
      // console.log(cook);
    });
  }

  onNewNote() {
    this.router.navigate(['/new']);
  }

  onPick(note_id: number, title: string, content: string) {
    this.note = {
      note_id: note_id,
      title: title,
      content: content,
    };
    this.noteService.id.next(this.note);
    this.router.navigate(['/edit', note_id]);
  }

  onDelete(note_id: number) {
    this.dataStorageService.deleteNote(note_id).subscribe((resData) => {
      console.log('Deleting is working');
      console.log(resData);
      this.isLoading = true;
      this.dataStorageService.fetchNotes().subscribe((resData) => {
        this.notes = [...resData.data];
        this.isLoading = false;
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
