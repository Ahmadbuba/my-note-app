import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from './note.model';
import { User } from './user.model';
import { Title } from '@angular/platform-browser';
import { GeneralResponse } from './general.model';
import { switchMap } from 'rxjs';

export interface NoteGetResponse {
  status: string;
  message: string;
  has_next: boolean;
  per_page: number;
  total: number;
  data: Note[];
}

export interface NotePostResponse {
  status: string;
  message: string;
  data: Note;
}

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private http: HttpClient) {}

  newNote(title: string, content: string) {
    return this.http.post<NotePostResponse>(
      'https://note-xyz.herokuapp.com/api/v1/note/',
      {
        title: title,
        content: content,
      }
    );
  }

  fetchNotes() {
    return this.http.get<NoteGetResponse>(
      'https://note-xyz.herokuapp.com/api/v1/note/'
    );
  }

  deleteNote(note_id: number) {
    return this.http.delete<GeneralResponse>(
      'https://note-xyz.herokuapp.com/api/v1/note/' + note_id
    );
  }

  updateNote(note_id: number, title: string, content: string) {
    return this.http.put<NoteGetResponse>(
      'https://note-xyz.herokuapp.com/api/v1/note/' + note_id,
      {
        title: title,
        content: content,
      }
    );
  }

  getNote(note_id: number) {
    return this.http.get(
      'https://note-xyz.herokuapp.com/api/v1/note/' + note_id
    );
  }
}
