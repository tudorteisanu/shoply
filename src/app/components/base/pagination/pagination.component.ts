import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginationMetaInterface } from '@/ts/interfaces';
import { Observable } from 'rxjs';

const PAGES_TO_DISPLAY = 5;

@Component({
  selector: 'Pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  // @Input() total: number = 0;
  @Input() meta: Observable<PaginationMetaInterface>;
  @Output() changePage: EventEmitter<number> = new EventEmitter<number>();

  total: number = 0;
  current: number = 1;

  ngOnInit(): void {
    if (this.meta) {
      this.meta.subscribe(({ page, total }) => {
        this.total = total;
        this.current = page;
      });
    }
  }

  get pagesArray(): number[] {
    return [...new Array(this.total)].map((_, index) => index + 1);
  }

  get pages(): number[] {
    if (this.current < PAGES_TO_DISPLAY) {
      return this.pagesArray.slice(0, PAGES_TO_DISPLAY);
    }

    if (this.current + PAGES_TO_DISPLAY > this.total) {
      return this.pagesArray.slice(
        this.total - PAGES_TO_DISPLAY - 1,
        this.total - 1
      );
    }

    const middleFloor = Math.floor(PAGES_TO_DISPLAY / 2);
    const middleRound = Math.round(PAGES_TO_DISPLAY / 2);

    return this.pagesArray.slice(
      this.current - middleRound,
      this.current + middleFloor
    );
  }

  get isPrevDisabled(): boolean {
    return this.current <= 1;
  }

  get isNextDisabled(): boolean {
    return this.current >= this.total;
  }

  getPageClass(page: number): string {
    if (this.isActive(page)) {
      return 'pagination--active';
    }

    return '';
  }

  isActive(page: number): boolean {
    return this.current === page;
  }

  onChangePage(page: number): void {
    this.changePage.emit(page);
  }

  nextPage(): void {
    if (!this.isNextDisabled) {
      this.onChangePage(this.current + 1);
    }
  }
  prevPage(): void {
    if (!this.isPrevDisabled) {
      this.onChangePage(this.current - 1);
    }
  }
}
