const observableModule = require("data/observable");

function ExploreViewModel() {
    const viewModel = observableModule.fromObject({
        /* Add your view model properties here */
    });

    return viewModel;
}

module.exports = ExploreViewModel;
