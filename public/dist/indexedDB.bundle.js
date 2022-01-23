/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/js/indexed-db.js":
/*!*********************************!*\
  !*** ./assets/js/indexed-db.js ***!
  \*********************************/
/***/ (() => {

eval("var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDb || window.msIndexedDB || window.shimIndexedDB;\nvar request = indexedDB.open(\"budgetTracker\", 1);\nvar db, tx, store;\n\nrequest.onupgradeneeded = function (e) {\n  var db = e.target.result;\n  db.createObjectStore(\"pending\", {\n    autoIncrement: true\n  });\n};\n\nrequest.onerror = function (e) {\n  console.log(\"There was an error\", e.target.errorCode);\n};\n\nrequest.onsuccess = function (e) {\n  db = e.target.result;\n\n  if (navigator.onLine) {\n    checkForIndexedDb();\n  }\n};\n\nfunction saveRecord(record) {\n  var tx = db.transaction([\"pending\"], \"readwrite\");\n  var store = tx.objectStore(\"pending\");\n  store.add(record);\n}\n\nfunction checkForIndexedDb() {\n  tx = db.transaction([\"pending\"], \"readwrite\");\n  store = tx.objectStore(\"pending\");\n  var allBudget = store.getAll();\n\n  allBudget.onsuccess = function () {\n    if (allBudget.result.length > 0) {\n      fetch(\"/api/transaction/bulk\", {\n        method: \"POST\",\n        body: JSON.stringify(allBudget.result),\n        headers: {\n          Accept: \"application/json, text/plain, */*\",\n          \"Content-Type\": \"application/json\"\n        }\n      }).then(function (res) {\n        return res.json();\n      }).then(function () {\n        var tx = db.transaction([\"pending\"], \"readwrite\");\n        var store = tx.objectStore(\"pending\");\n        store.clear();\n      });\n    }\n  };\n}\n\nwindow.addEventListener(\"online\", checkForIndexedDb);\n\n//# sourceURL=webpack://public/./assets/js/indexed-db.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./assets/js/indexed-db.js"]();
/******/ 	
/******/ })()
;