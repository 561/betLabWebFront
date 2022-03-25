import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketballLiveComponent } from './basketball-live.component';

describe('BasketballLiveComponent', () => {
  let component: BasketballLiveComponent;
  let fixture: ComponentFixture<BasketballLiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasketballLiveComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketballLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
