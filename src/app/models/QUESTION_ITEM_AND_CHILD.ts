import { QUESTION_ITEM } from './QUESTION_ITEM';
import { QUESTION_CONTROL_AND_CONTROL_MASTER } from './QUESTION_CONTROL_AND_CONTROL_MASTER';
// tslint:disable-next-line:class-name
export class QUESTION_ITEM_AND_CHILD {
    public QUESTION_ITEM: QUESTION_ITEM;
    // tslint:disable-next-line:variable-name
    public QUESTION_CONTROL_AND_CONTROL_MASTERs: QUESTION_CONTROL_AND_CONTROL_MASTER[];

    constructor() {
        this.QUESTION_CONTROL_AND_CONTROL_MASTERs  = [];
    }
}
