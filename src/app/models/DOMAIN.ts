export class DOMAIN {
    public NAME: string;
    public DESCRIPTION: string;
    public DEL_FLG: string;
    public ORGL_USER: string;
    public UPDT_USER: string;
    public DOM_ID: number;
    public ORGL_STAMP: Date;
    public UPDT_STAMP: Date;
    constructor() {
        this.DOM_ID = 0;
        this.DEL_FLG = 'N';
        this.ORGL_USER = 'AMIT';
        this.UPDT_USER = 'AMIT';
    }
}
