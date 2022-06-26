import { SUBDOMAIN } from './SUBDOMAIN';
import { DOMAIN } from './DOMAIN';
export class Menu {
    public domain: DOMAIN;
    public subDomains: SUBDOMAIN[];

    constructor() {
        this.subDomains = [];
    }
}
