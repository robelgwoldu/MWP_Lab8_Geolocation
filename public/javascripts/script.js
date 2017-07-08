(function() {
    "use strict";

    navigator.geolocation.getCurrentPosition(success, fail);

    function fail(msg) {
        console.log(msg.code + msg.message);
    }
    function success(position) {
        window.location.href = "/?longitude=" + position.coords.longitude + "&latitude=" + position.coords.latitude;
    }

})();
