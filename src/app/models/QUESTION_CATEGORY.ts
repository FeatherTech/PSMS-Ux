// tslint:disable-next-line:class-name
export class QUESTION_CATEGORY {
    public NAME: string;
        public DESCRIPTION: string;
        public QC_ID: number;
        public DOM_ID: number;
        public SUB_DOM_ID: number;
        public SEQ_NO: number;
        public ORGL_USER: string;
        public ORGL_STAMP: Date;
        public UPDT_USER: string;
        public UPDT_STAMP: Date;
        public DEL_FLG: string;

        constructor() {

            this.Active = false;
        }
        public Active: boolean;
}
