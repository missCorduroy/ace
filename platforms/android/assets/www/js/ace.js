window.nativeUIEnabled = true;
window.firstLoad = true;

function initializeApp() {
    if (ace.platform == "Android") {
        setupWidget();
    }
}

function setupWidget() {
  // Handle the app being resumed by a widget click:
    ace.addEventListener("android.intentchanged", checkForWidgetActivation);

    ace.android.appWidget.clear();

    for (var i = 0; i < 10; i++) {
      ace.android.appWidget.add("Item with index " + i);
    }
}

function checkForWidgetActivation() {
    if (ace.platform != "Android") {
        return;
    }

    ace.android.getIntent().invoke("getIntExtra", "widgetSelectionIndex", -1, function (value) {
        if (value != -1) {
            // We have the index of the session we need to show
            showSessionDetailByIndex(value);

            // Show a toast, just for fun
            ace.NativeObject.getField("android.widget.Toast", "LENGTH_SHORT", function(length_short) {
                ace.NativeObject.invoke("android.widget.Toast", "makeText", ace.android.getActivity(),
                                         "Here's the event", length_short, function(toast) {
                    toast.invoke("show");
                });
            });
        }
    });
}

(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        //document.addEventListener('pause', onPause.bind(this), false);
        //document.addEventListener('resume', onResume.bind(this), false);
        
        initializeApp();
    };

    function onPause() {
        // This application has been suspended. Save application state here.
    };

    function onResume() {
        // This application has been reactivated. Restore application state here.
    };
})();