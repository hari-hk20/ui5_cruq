/*global QUnit*/

sap.ui.define([
	"odataui5/odata_crudq_prac/controller/mainView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("mainView Controller");

	QUnit.test("I should test the mainView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
