document.addEventListener("DOMContentLoaded", function() {
    function detectOS() {
        const userAgent = window.navigator.userAgent.toLowerCase();
        let osDetected = null;

        if (userAgent.indexOf('windows nt') !== -1) {
            osDetected = 'windows';
        }

        if (userAgent.indexOf('mac os') !== -1) {
            osDetected = 'macos';
        }

        if (userAgent.indexOf('linux') !== -1 && userAgent.indexOf('android') === -1) {
            osDetected = 'linux';
        }

        if (osDetected) {
            document.querySelector(`.os-${osDetected}`).style.display = 'block';
        } else {
            document.querySelector('.os-select').style.display = 'block';
        }
    }

    detectOS();
});