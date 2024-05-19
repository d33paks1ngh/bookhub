import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReadinglistComponent } from './user-readinglist.component';

describe('UserReadinglistComponent', () => {
  let component: UserReadinglistComponent;
  let fixture: ComponentFixture<UserReadinglistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserReadinglistComponent]
    });
    fixture = TestBed.createComponent(UserReadinglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
