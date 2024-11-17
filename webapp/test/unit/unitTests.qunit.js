/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"odataui5/odata_crudq_prac/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
