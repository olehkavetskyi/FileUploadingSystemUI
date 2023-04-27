import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
  selectedFile: File;

  
  constructor(private appService: AppService, private toastrService: ToastrService) {}

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submitForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    file: new FormControl('', [Validators.required, Validators.pattern(/\.docx$/)])
  })

  onSubmit() {
    const formData = new FormData();
    formData.append('email', this.submitForm.get('email').value);
    formData.append('file', this.selectedFile, this.selectedFile.name);

    this.appService.upload(formData).subscribe( {
      next: () => this.toastrService.success("Your file is successfully uploaded"),
      error: (response) => console.log(response)
    });
  }
}
