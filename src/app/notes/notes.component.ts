import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Note } from '../shared/note.model';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];

  constructor(private dataStorageService: DataStorageService) {}

  ngOnInit() {
    this.dataStorageService.fetchNotes().subscribe((n) => {
      console.log(n);
      this.notes = [...n.data];
      console.log(this.notes);
      // let cook = this.cookie.get('auth');
      // console.log(cook);
    });
  }
}
