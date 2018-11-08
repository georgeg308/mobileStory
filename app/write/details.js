const listViewModule = require("tns-core-modules/ui/list-view");

const Observable = require("tns-core-modules/data/observable").Observable;
const fromObject = require("tns-core-modules/data/observable").fromObject;
const fromObjectRecursive = require("tns-core-modules/data/observable").fromObjectRecursive;
const observableModule = require("data/observable");
const ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/
const chapterArray = new ObservableArray(
    [
        {
            title:"1.The Da Vinci Code"
        },
        {
            title:"2.Harry Potter and the Chamber of Secrets"
        },
        {
            title:"3.The Alchemist"
        },
        {
            title:"4.The Godfather"
        },
        {
            title:"5.Goodnight Moon"
        },
        {
            title:"6.The Hobbit"
        }
    ]);

function onNavigatingTo(args) {
    const page = args.object;

    const vm = new observableModule.Observable();
    vm.set("chapters", chapterArray);
    page.bindingContext = vm;
}

exports.onNavigatingTo = onNavigatingTo;
