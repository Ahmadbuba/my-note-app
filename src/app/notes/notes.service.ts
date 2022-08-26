import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SimpleNote } from '../shared/simple-note.model';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  id = new BehaviorSubject<SimpleNote>(null);

  constructor() {}
}
