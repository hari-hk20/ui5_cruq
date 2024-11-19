sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
],function (Controller,History){
    "use strict"
    return Controller.extend("odata.ui5.odatacrudqprac.controller.secondView", {
        onInit : function(){

        },
        onBackToPrev: function () {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } 
            else {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("mainView", {}, true);
            }
        }
    })
});