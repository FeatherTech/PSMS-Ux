import { QUESTION_CATEGORY } from './QUESTION_CATEGORY';
import { SUB_QUESTION_CATEGORY_AND_CHILD } from './SUB_QUESTION_CATEGORY_AND_CHILD';

// tslint:disable-next-line:class-name
export class QUESTION_CATEGORY_AND_CHILD {
    public QUESTION_CATEGORY: QUESTION_CATEGORY;
    // tslint:disable-next-line:variable-name
    public SUB_QUESTION_CATEGORY_AND_CHILDs: SUB_QUESTION_CATEGORY_AND_CHILD[];

    constructor() {
        this.SUB_QUESTION_CATEGORY_AND_CHILDs = [];
    }
}
