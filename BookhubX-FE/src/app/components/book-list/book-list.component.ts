import { Component,OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { Store } from '@ngrx/store';
import * as BookActions from '../../store/actions/book.actions';
import * as BookSelectors from '../../store/selectors/book.selectors';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit{
  books$: Observable<Book[]>;
  loading$: Observable<boolean>;
  error$: Observable<string|null>;
  searchTitle = '';

  constructor(private store: Store) {
    this.books$ = this.store.select(BookSelectors.selectAllBooks);
    this.loading$ = this.store.select(BookSelectors.selectBooksLoading);
    this.error$ = this.store.select(BookSelectors.selectBooksError);
  }

  ngOnInit(): void {
    const defaultTitle = '';
    this.store.dispatch(BookActions.loadBooks());
  }


  onSearchInputChange(event: Event): void {
     this.searchTitle = (event.target as HTMLInputElement).value;
    this.store.dispatch(BookActions.searchBooksByTitle({ title: this.searchTitle  }));
  }


  onGenreSelectChange(event: Event): void {
    const selectedGenre = (event.target as HTMLSelectElement).value;
    this.store.dispatch(BookActions.filterBooksByGenre({ title: this.searchTitle , genre: selectedGenre }));
  }
 
}
