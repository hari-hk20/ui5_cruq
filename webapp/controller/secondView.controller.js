sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel"
],function (Controller,History,JSONModel){
    "use strict"
    return Controller.extend("odata.ui5.odatacrudqprac.controller.secondView", {
        onInit : function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("secondView").attachPatternMatched(this.onObjectDetails, this);
        },

        onObjectDetails: function(oEvent){
            var oRecord = oEvent.getParameter("arguments");
            var oDatamodel = this.getOwnerComponent().getModel();
            var oBusyDialog = new sap.m.BusyDialog({
                title: "Loading Data",
                text : "please wait",
                customIcon : "./css/busy_dialog1.png"

            });

            oBusyDialog.open();

            // method to invoke odata GET Operation.
            oDatamodel.read("/BOOK_LISTSet('" +oRecord.ObjectId+ "')",{
                success : function(oResponse){
                    sap.m.MessageToast.show("Record Fetched");
                    //oModel.setData(oResponse.results); //one way to set data to model
                    //oModel.setProperty("/Row",oResponse.results);
                    //console.log(oResponse);
                    this.getView().setModel(new JSONModel(oResponse),"BookRecord");
                    //console.log(this.getView().getModel("BookRecord"));
                    oBusyDialog.close();
                }.bind(this),

                error : function(oError){
                    sap.m.MessageToast.show("Record Not Fetched");
                    oBusyDialog.close();
                }.bind(this),
                   
            });
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
        },

        onPressForward : function(){
            alert("Button Pressed");
            var oRouter=this.getOwnerComponent().getRouter();
	        oRouter.navTo("thirdView");
        }
    })
});