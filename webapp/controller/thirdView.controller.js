sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/routing/History"
], function(Controller, JSONModel,History){
    "use strict"

    return Controller.extend("odata.ui5.odatacrudqprac.controller.thirdView",{
        onInit : function(){
            
        },
        onBackToPrev1 : function(){
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