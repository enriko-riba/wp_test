export class LinkItem {

    constructor(href: string, text: string, componentName: string, isActive: boolean = false) {
        this.isActive(isActive);
        this.href = href;
        this.text = text;
        this.component = componentName;
    }

    public isActive = ko.observable(false);
    public href = "";
    public text = "";
    public component = "";
}