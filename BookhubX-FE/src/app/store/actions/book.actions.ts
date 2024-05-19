import { createAction, props } from "@ngrx/store";
import { Book } from "src/app/components/models/book.model";

export const loadBooks=createAction('[Book] Load Books')



export const setBooks = createAction(
    '[Book] Set Books',
    props<{ books: any[] }>()
  );

  export const searchBooksByTitle = createAction(
    '[Book] Search Books By Title',
    props<{ title: string }>()
  );

  export const filterBooksByGenre = createAction(
    '[Book] Filter Books By Genre',
    props<{ title: string, genre: string }>()
  );
  export const loadBooksSuccess = createAction(
    '[Book] Load Books Success',
    props<{ books: Book[] }>()
  );

  export const loadBooksFailure = createAction(
    '[Book] Load Books Failure',
    props<{ error: string }>()
  );



