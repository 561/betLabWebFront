import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Bet365Service } from '../../services/bet365.service';
import { GamesListItem } from '../../interfaces/bet365';
import { Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-games-statuses-panel',
  templateUrl: './games-statuses-panel.component.html',
  styleUrls: ['./games-statuses-panel.component.scss'],
})
export class GamesStatusesPanelComponent implements OnInit, OnDestroy {
  typeToggle: string;
  @Output() typeEmitter = new EventEmitter<GamesListItem[]>();
  @Input() sportId: number;
  @Input() sport: string;
  loading = true;
  subscription$: Observable<GamesListItem[]>;
  destroy$ = new Subject<void>();

  constructor(
    private bet365: Bet365Service,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.typeToggle = this.activatedRoute.snapshot.paramMap.get('status') || 'live';
  }

  goToItem(status: string): void {
    this.router.navigate(['/dashboard', this.sport, status], { relativeTo: this.activatedRoute });
    this.changeValue(status);
  }

  ngOnInit(): void {
    this.changeValue(this.typeToggle);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getFetch(value: string): Observable<GamesListItem[]> {
    if (value === 'live') {
      return this.bet365.live_games(this.sportId);
    }
    if (value === 'prematch') {
      return this.bet365.prematch_games(this.sportId);
    }
    return this.bet365.finished_games(this.sportId);
  }


  changeValue(value: string): void {
    this.typeToggle = value;
    this.loading = true;
    this.typeEmitter.emit(undefined);
    this.getFetch(value).subscribe((data) => {
      this.loading = false;
      if (Array.isArray(data)) {
        this.typeEmitter.emit(data);
      } else {
        this.typeEmitter.emit([]);
      }
    }, (error) => {
      console.log(error);
      this.typeEmitter.emit([]);
    });
  }

}
