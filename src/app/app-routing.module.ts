import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { NewNoteComponent } from './notes/new-note/new-note.component';
import { NoteEditComponent } from './notes/note-edit/note-edit.component';
import { NotesComponent } from './notes/notes.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  {
    path: 'notes',
    component: NotesComponent,
  },
  { path: 'new', component: NewNoteComponent },
  { path: 'edit/:id', component: NoteEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
