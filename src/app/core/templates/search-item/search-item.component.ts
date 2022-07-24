import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchData } from '../../interfaces/bet365';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent implements OnInit {
  @Input() searchItem: SearchData;

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  clear(): void {
    const currentUrl = this.router.url.split('?')[0];
    this.router.navigate([currentUrl]).then(() => {
      window.location.reload();
    });
  }
}
