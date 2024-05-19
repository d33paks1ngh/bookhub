import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfiletabComponent } from './profiletab.component';

describe('ProfiletabComponent', () => {
  let component: ProfiletabComponent;
  let fixture: ComponentFixture<ProfiletabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfiletabComponent]
    });
    fixture = TestBed.createComponent(ProfiletabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
