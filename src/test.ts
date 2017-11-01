export class Test {
    constructor() {
        console.log('this is tester!');
    }

    private text = ko.observable("Saying test!");
    public sayTest(){
        console.log(this.text());
    }
}