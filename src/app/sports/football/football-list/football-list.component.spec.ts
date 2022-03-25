import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballListComponent } from './football-list.component';

describe('GamesListComponent', () => {
  let component: FootballListComponent;
  let fixture: ComponentFixture<FootballListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FootballListComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
