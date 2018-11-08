const observableModule = require("data/observable");

function LocationViewModel() {
    const viewModel = observableModule.fromObject({
        /* Add your view model properties here */
        latitude:-38.84,
        longtitude:151.20,
        zoom:2,
        address:""
    });

    return viewModel;
}

module.exports = LocationViewModel;
