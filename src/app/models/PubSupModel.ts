import { DOMAIN } from './DOMAIN';
export class PubSubModel {
    public DomID: number;
    public SubDomId: number;
    public title: string;

    constructor(domId: number, subDomid: number, title: string) {
        this.DomID = domId;
        this.SubDomId = subDomid;
        this.title = title;
    }
}
