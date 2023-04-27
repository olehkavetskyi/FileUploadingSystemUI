import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { AppService } from './app.service';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let appServiceSpy: jasmine.SpyObj<AppService>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('AppService', ['upload']);
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['success']);

    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, ToastrModule.forRoot()],
      declarations: [AppComponent],
      providers: [
        { provide: AppService, useValue: spy },
        { provide: ToastrService, useValue: toastrSpy }
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    appServiceSpy = TestBed.inject(AppService) as jasmine.SpyObj<AppService>;
    toastrServiceSpy = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should create a FormGroup with email and file controls', () => {
    expect(component.submitForm.contains('email')).toBeTruthy();
    expect(component.submitForm.contains('file')).toBeTruthy();
  });

  it('should make the email control required', () => {
    const control = component.submitForm.get('email');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('should make the email control have an email validator', () => {
    const control = component.submitForm.get('email');
    control.setValue('invalid-email');
    expect(control.valid).toBeFalsy();
  });

  it('should make the file control required', () => {
    const control = component.submitForm.get('file');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('should make the file control have a pattern validator for .docx extension', () => {
    const control = component.submitForm.get('file');
    control.setValue('file.pdf');
    expect(control.valid).toBeFalsy();
  });

  it('should call AppService.upload method when the form is submitted', () => {
    const formData = new FormData();
    formData.append('email', 'test@test.com');
    formData.append('file', new File([], 'test.docx'));
  
    const formValues = { email: 'test@test.com', file: 'test.docx' };
    component.submitForm.setValue(formValues);
  
    appServiceSpy.upload.and.returnValue(of(null));
  
    component.selectedFile = formData.get('file') as File;
    component.onSubmit();
  
    expect(appServiceSpy.upload).toHaveBeenCalledWith(formData);
  });

  it('should call ToastrService.success method when the file is successfully uploaded', () => {
    appServiceSpy.upload.and.returnValue(of(null));
    component.onSubmit();
    expect(toastrServiceSpy.success).toHaveBeenCalled();
  });
});
