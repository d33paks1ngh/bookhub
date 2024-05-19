// book.effects.ts

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as BookActions from '../actions/book.actions';
import { BookService } from '../../services/book.service';


@Injectable()
export class BookEffects {

  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.loadBooks),
      mergeMap(() =>
        this.bookService.getAllBooks().pipe(
          map((books) => BookActions.loadBooksSuccess({ books })),
          catchError((error) => of(BookActions.loadBooksFailure({ error: error.message })))
        )
      )
    )
  );


  searchBooksByTitle$ = createEffect(() =>
  this.actions$.pipe(
    ofType(BookActions.searchBooksByTitle),
    mergeMap((action) =>
      this.bookService.searchBooksByTitle(action.title).pipe(
        map((books) => BookActions.loadBooksSuccess({ books })),
        catchError((error) => of(BookActions.loadBooksFailure({ error: error.message })))
      )
    )
  )
);

filterBooksByGenre$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.filterBooksByGenre),
      mergeMap((action) =>
        this.bookService.filterBooksByGenre(action.title, action.genre).pipe(
          map((books) => BookActions.loadBooksSuccess({ books })),
          catchError((error) => of(BookActions.loadBooksFailure({ error: error.message })))
        )
      )
    )
  );


  


  constructor(
    private actions$: Actions,
    private bookService: BookService 
  ) {}
}
