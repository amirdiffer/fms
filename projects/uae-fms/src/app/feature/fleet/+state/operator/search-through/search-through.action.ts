import { createAction, props } from "@ngrx/store";
import { IOperatorSearchThrough } from "./search-through.entity";

export class OperatorSearchThroughActions{


    static loadAvailableOperatorUser = createAction(
        '[operatorSearchThrough] load all available operator user'
    );

    static allAvailableOperatorUserLoaded = createAction(
        '[operatorSearchThrough] all available operator user data are loaded',
        props<{ data: IOperatorSearchThrough[] }>()
    );


    static error = createAction(
        '[operatorSearchThrough] error occurred',
        props<{ reason: any }>()
    );


}