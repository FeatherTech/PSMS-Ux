// tslint:disable-next-line:class-name
export class SUB_QUESTION_CATEGORY {
    public NAME: string;
    public DESCRIPTION: string;
    public DEL_FLG: string;
    public ORGL_USER: string;
    public UPDT_USER: string;
    public SQC_ID: number;
    public QC_ID: number;
    public DOM_ID: number;
    public SUB_DOM_ID: number;
    public SEQ_NO: number;
    public ORGL_STAMP: Date;
    public UPDT_STAMP: Date;
    public Visibile: boolean;

    constructor() {
        this.Visibile = false;
    }
}
