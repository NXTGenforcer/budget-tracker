const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDb ||
  window.msIndexedDB ||
  window.shimIndexedDB;

const request = indexedDB.open("budgetTracker", 1);
let db, tx, store;

request.onupgradeneeded = function (e) {
  const db = e.target.result;
  db.createObjectStore("pending", { autoIncrement: true });
};

request.onerror = function (e) {
  console.log("There was an error", e.target.errorCode);
};

request.onsuccess = function (e) {
  db = e.target.result;

  if (navigator.onLine) {
    checkForIndexedDb();
  }
};

function saveRecord(record) {
  const tx = db.transaction(["pending"], "readwrite");
  const store = tx.objectStore("pending");
  store.add(record);
}

function checkForIndexedDb() {
  tx = db.transaction(["pending"], "readwrite");
  store = tx.objectStore("pending");
  const allBudget = store.getAll();

  allBudget.onsuccess = function () {
    if (allBudget.result.length > 0) {
      fetch("/api/transaction/bulk", {
        method: "POST",
        body: JSON.stringify(allBudget.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then(() => {
          const tx = db.transaction(["pending"], "readwrite");
          const store = tx.objectStore("pending");
          store.clear();
        });
    }
  };
}

window.addEventListener("online", checkForIndexedDb);
