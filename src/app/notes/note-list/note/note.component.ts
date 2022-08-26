import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotesService } from '../../notes.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
  sub: Subscription;

  constructor(private notesService: NotesService) {}

  ngOnInit() {}
}
