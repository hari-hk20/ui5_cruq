sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/core/syncStyleClass"
],
function (Controller, JSONModel, MessageBox,syncStyleClass) {
    "use strict";

    return Controller.extend("odata.ui5.odatacrudqprac.controller.mainView", {
        onInit: function () {
            this.readData();
            var oAppProperties = {
                ButtonEnabled:false,
                iSBookIdEmpty : true
            };
            var oSysModel = new JSONModel();
            oSysModel.setData(oAppProperties);
            this.getView().setModel(oSysModel,"sysProp");            
        },

        onSelectionChange: function(oEvent){
            //const oTable = oEvent.getSource();
            //const aSelectedItems = oTable?.getSelectedContexts();
            var oSelected = this.byId("BookList").getSelectedItem();
            if(oSelected){
                this.getView().getModel("sysProp").setProperty("/ButtonEnabled",true);
            }
        },

        readData : function(){
            var oDatamodel = this.getOwnerComponent().getModel();
            var oModel = new JSONModel();
            var oBusyDialog = new sap.m.BusyDialog({
                title: "Loading Data",
                text : "please wait",
                customIcon : "./css/busy_dialog1.png"

            });
            var oFilter = new sap.ui.model.Filter({
                path : 'AuthorId',
                operator : 'Contains',
                value1 : '5'
            });
            var oSorter = new sap.ui.model.Sorter({
                path : 'GenreId',
            });
            oBusyDialog.open();
            oDatamodel.read("/BOOK_LISTSet",{
                filters:[oFilter],
                sorters : [oSorter],
                urlParameters :{
                    "$skip" : 0,
                    "$top" : 5
                },
                success : function(oResponse){
                    //oModel.setData(oResponse.results);
                    oModel.setProperty("/BL", oResponse.results);
                    this.getView().setModel(oModel,"Book_List");
                    oBusyDialog.close();
                }.bind(this),

                error : function(oError){
                    oBusyDialog.close();
                }.bind(this),
                   
            });
            
        },
        
        onDelete : async function(oEvent){

            var oItem= this.getView().byId("BookList").getSelectedItem();
            var oEntry = oItem.getBindingContext("Book_List").getObject();
            //console.log(oEntry); //your quantity you want to update
            var BookId = oEntry.BookId;
            //console.log(BookId);

            MessageBox.confirm("Are you sure, you want to delete a record", {
                title : "Confirm",
                onClose: function(oAction){
                    if(oAction==="OK"){
                        this._deleteSpecificRecord(BookId);
                    }
                }.bind(this),                                 
                actions: [ sap.m.MessageBox.Action.OK,
                sap.m.MessageBox.Action.CANCEL ],         
                emphasizedAction: sap.m.MessageBox.Action.OK
                })
        
        },

        _deleteSpecificRecord : function(oRecord){
            var oDataModel = this.getOwnerComponent().getModel();
            var oBusyDialog = new sap.m.BusyDialog({
                title: "Deleting Data",
                text : "please wait",
                customIcon : "./css/busy_dialog1.png"
 
            });
            oBusyDialog.open();
            oDataModel.remove("/BOOK_LISTSet(BookId='" +oRecord+ "')",{
                success : function(oResponse){
                oBusyDialog.close();
                sap.m.MessageToast.show("Record Deleted");
                this.readData();
                }.bind(this),
 
                error : function(oError){
                    sap.m.MessageToast.show("Record Not Deleted")
                    oBusyDialog.close();
                }.bind(this),
            })
        },
        onUpdate : function(oEvent){
            var oItem= this.getView().byId("BookList").getSelectedItem();
            var oEntry = oItem.getBindingContext("Book_List").getObject();
            // var oRecordData = {
            //     BookId : oEntry.BookId,
            //     AuthorId : oEntry.AuthorId,
            //     GenreId : oEntry.GenreId,
            //     BookName : oEntry.BookName,
            //     Price : oEntry.Price,
            //     Stock : oEntry.Stock
            // }
            this.getView().setModel(new JSONModel({
                "oRecord" : oEntry
            }), "oUpdRecData");
            if (!this.pDialog) {
                this.pDialog = this.loadFragment({
                  name: "odata.ui5.odatacrudqprac.fragment.dialog"
                }).then(function (oDialog) {
                  return oDialog;
                }.bind(this));
            }
            else{
              this.pDialog.then(function (oDialog) {
                oDialog.open();
              });
            }
        },

        onSave : function(){

            var oDataModel = this.getOwnerComponent().getModel();
            var oRecData = this.getView().getModel("oUpdRecData").getProperty("/oRecord");
            var oBusyDialog = new sap.m.BusyDialog({
                title: "Updating Data",
                text : "please wait",
                customIcon : "./css/busy_dialog1.png"
 
            });
            oBusyDialog.open();
            oDataModel.update("/BOOK_LISTSet(BookId='" +oRecData.BookId+ "')", oRecData,{
                success : function(oResponse){
                oBusyDialog.close();
                sap.m.MessageToast.show("Record Updated");
                this.byId("dialog").close();
                this.readData();
                }.bind(this),
 
                error : function(oError){
                    sap.m.MessageToast.show("Values not Passed Properly")
                    oBusyDialog.close();
                }.bind(this),
            })
            
        },

        onCancel : function(){
            this.byId("dialog").close();
        },

        onCreate : function(){
            var newRecord ={
                BookId : "",
                AuthorId : "",
                GenreId : "",
                BookName : "",
                Price : "",
                Stock : ""
            }
            var oModeldata = new JSONModel(newRecord);
            this.getView().setModel(oModeldata,"newEntity");

            if (!this.cDialog) {
                this.cDialog = this.loadFragment({
                  name: "odata.ui5.odatacrudqprac.fragment.createDialog"
                }).then(function (qDialog) {
                  return qDialog;
                }.bind(this));
            }
            else{
              this.cDialog.then(function (qDialog) {
                qDialog.open();
              });
            }

        },

        onCreateRecord:function(){
            var oDataModel = this.getOwnerComponent().getModel();
            var oRecData = this.getView().getModel("newEntity").getData();
            var oBusyDialog = new sap.m.BusyDialog({
                title: "Creating Data",
                text : "please wait",
                customIcon : "./css/busy_dialog1.png"
 
            });
            
            oBusyDialog.open();
            oDataModel.create("/BOOK_LISTSet", oRecData,{
                success : function(oResponse){
                oBusyDialog.close();
                sap.m.MessageToast.show("Record Created");
                this.byId("Createdialog").close();
                this.readData();
            }.bind(this),
 
            error : function(oError){
                sap.m.MessageToast.show("Values not Passed Properly")
                oBusyDialog.close();
            }.bind(this),
        })

        },

        onCreateCancel: function(){
            this.byId("Createdialog").close();
        }
    });
});
