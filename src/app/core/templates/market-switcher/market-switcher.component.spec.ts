import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketSwitcherComponent } from './market-switcher.component';

describe('MarketSwitcherComponent', () => {
  let component: MarketSwitcherComponent;
  let fixture: ComponentFixture<MarketSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketSwitcherComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
