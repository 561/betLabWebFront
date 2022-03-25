import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesStatusesPanelComponent } from './games-statuses-panel.component';

describe('GamesStatusesPanelComponent', () => {
  let component: GamesStatusesPanelComponent;
  let fixture: ComponentFixture<GamesStatusesPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesStatusesPanelComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesStatusesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
