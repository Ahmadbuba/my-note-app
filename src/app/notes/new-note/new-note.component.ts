import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.scss'],
})
export class NewNoteComponent implements OnInit {
  isLoading = false;

  constructor(
    private dataStorageService: DataStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const title = form.value.title;
    const content = form.value.content;

    this.isLoading = true;
    this.dataStorageService.newNote(title, content).subscribe((resData) => {
      this.isLoading = false;
      console.log(resData);
      this.router.navigate(['/notes']);
    });
  }

  onCancel() {
    this.router.navigate(['/notes']);
  }
}
