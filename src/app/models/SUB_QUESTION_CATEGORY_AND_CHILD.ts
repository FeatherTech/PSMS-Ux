import { SUB_QUESTION_CATEGORY } from './SUB_QUESTION_CATEGORY';
import { QUESTION_ITEM_AND_CHILD } from './QUESTION_ITEM_AND_CHILD';
// tslint:disable-next-line:class-name
export class SUB_QUESTION_CATEGORY_AND_CHILD {
    public SUB_QUESTION_CATEGORY: SUB_QUESTION_CATEGORY;
    // tslint:disable-next-line:variable-name
    public QUESTION_ITEM_AND_CHILDs: QUESTION_ITEM_AND_CHILD[];

    constructor() {
        this.QUESTION_ITEM_AND_CHILDs = [];
        this.SUB_QUESTION_CATEGORY = new SUB_QUESTION_CATEGORY();
    }
}
