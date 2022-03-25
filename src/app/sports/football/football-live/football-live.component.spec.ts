import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballLiveComponent } from './football-live.component';

describe('FootballLiveComponent', () => {
  let component: FootballLiveComponent;
  let fixture: ComponentFixture<FootballLiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FootballLiveComponent ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
