import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameInfoHeaderComponent } from './game-info-header.component';

describe('GameInfoHeaderComponent', () => {
  let component: GameInfoHeaderComponent;
  let fixture: ComponentFixture<GameInfoHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameInfoHeaderComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameInfoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
