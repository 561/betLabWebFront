import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketballListComponent } from './basketball-list.component';

describe('BasketballListComponent', () => {
  let component: BasketballListComponent;
  let fixture: ComponentFixture<BasketballListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasketballListComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketballListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
