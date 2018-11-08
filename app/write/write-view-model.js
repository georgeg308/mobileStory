const observableModule = require("data/observable");

function WriteViewModel() {
    const viewModel = observableModule.fromObject({
        /* Add your view model properties here */
        title:"",
        latlng:"",
        location:""
      
    });

    return viewModel;
}

module.exports = WriteViewModel;
