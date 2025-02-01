import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInputEditComponent } from './form-input-edit.component';

describe('FormInputEditComponent', () => {
  let component: FormInputEditComponent;
  let fixture: ComponentFixture<FormInputEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormInputEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormInputEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
