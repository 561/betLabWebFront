import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Bet365Service } from '../../services/bet365.service';
import { GamesListItem } from '../../interfaces/bet365';
import { Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

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
  subscribtion: Observable<GamesListItem[]>;
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
  }

  ngOnInit(): void {
    this.changeValue(this.typeToggle);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeValue(value: string): void {
    this.typeToggle = value;
    this.loading = true;
    this.typeEmitter.emit(undefined);
    if (value === 'live') {
      this.subscribtion = this.bet365.live_games(this.sportId);
    } else if (value === 'prematch') {
      this.subscribtion = this.bet365.prematch_games(this.sportId);
    } else {
      this.subscribtion = this.bet365.finished_games(this.sportId);
    }
    this.subscribtion.pipe(
      takeUntil(this.destroy$),
      switchMap(() => this.subscribtion),
    ).subscribe((data) => {
      this.loading = false;
      if (Array.isArray(data)) {
        this.typeEmitter.emit(data);
      } else {
        console.log(data);
        this.typeEmitter.emit([]);
      }
    }, error => {
      console.log(error);
      this.typeEmitter.emit([]);
    });
  }

}
