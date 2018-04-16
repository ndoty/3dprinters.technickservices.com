'use strict';

let printers = {
    1: {
        id: 'mk2',
        name: 'Original Prusa i3 mk2s',
        url: 'https://3dprinters.technickservices.com/mk2',
        apiKey: 'ED3B442790D2459AB01AEEAE418F2827'
    },
    2: {
        id: 'mk22',
        name: 'Original Prusa i3 mk2s',
        url: 'https://3dprinters.technickservices.com/mk2',
        apiKey: 'ED3B442790D2459AB01AEEAE418F2827'
    },
    3: {
        id: 'mk23',
        name: 'Original Prusa i3 mk2s',
        url: 'https://3dprinters.technickservices.com/mk2',
        apiKey: 'ED3B442790D2459AB01AEEAE418F2827'
    }
};

let ajaxCount = 0;

let buildPrinterUI = () => {
    let html = '';
    for (printer in printers) {
        html += '<div class="printer" id="';
        html += printers[printer].id + '"><label><a href="' + printers[printer].url + '">'
        html += printers[printer].name + '</a></label><div class="webcam">'
        for (var e = 0; e < printers[printer].extruders; e++) {
            html += '<div class="temp temp--extruder' + e + '">Hotend: <span>' + printers[printer].stats.temperature['tool' + e].actual + '°C</span></div>';
        }
        for (var b = 0; b < printers[printer].beds; b++) {
            var bed = b === 0 ? 'bed' : 'bed' + b;
            html += '<div class="temp temp--bed' + b + '">Bed: <span>' + printers[printer].stats.temperature[bed].actual + '°C</span></div>'
        }
        html += '<img src="' + printers[printer].url;
        html += '/webcam/?action=stream&1483251353028" alt="No camera found">';
        html += '<div class="status">' + printers[printer].stats.state.text + '</div></div></div>';
    }
    $('.printers').html(html);
}

let setNumOfTemps = (printer) => {
    var checkExtruder = new RegExp('tool');
    var checkBed = new RegExp('bed');
    var extruderCount = 0;
    var bedCount = 0;
    for (temp in printers[printer].stats.temperature) {
        var isExtruder = checkExtruder.test(temp);
        var isBed = checkBed.test(temp);

        if (isExtruder) {
            extruderCount++;
        }

        if (isBed) {
            bedCount++;
        }
    }
    printers[printer].extruders = extruderCount;
    printers[printer].beds = bedCount;
}

let updateStatsUI = () => {
    for (printer in printers) {
        var printerID = printers[printer].id;
        for (var e = 0; e < printers[printer].extruders; e++) {
            $('#' + printerID + ' .temp.temp--extruder' + e + ' span').html(printers[printer].stats.temperature['tool' + e].actual + '°C');
        }

        for (var b = 0; b < printers[printer].beds; b++) {
            var bed = b === 0 ? 'bed' : 'bed' + b;
            $('#' + printerID + ' .temp.temp--bed' + b + ' span').html(printers[printer].stats.temperature[bed].actual + '°C');
        }
    }
}

let updatePrinterStats = (firstRun) => {
    var printerCount = Object.keys(printers).length;
    ajaxCount = 0;
    for (printer in printers) {
        doAPICall(printer, printerCount, firstRun);
    }
}

let doAPICall = (printer, printerCount, firstRun) => {
    $.ajax({
        url: printers[printer].url + '/api/printer',
        type: "GET",
        beforeSend: (xhr) => {
            xhr.setRequestHeader('X-Api-Key', printers[printer].apiKey);
        },
        success: (res) => {
            ajaxCount++;
            printers[printer].stats = res;
            if (firstRun) {
                setNumOfTemps(printer);
            }
            if (ajaxCount === printerCount && firstRun) {
                buildPrinterUI();
            } else if (ajaxCount === printerCount && !firstRun) {
                updateStatsUI();
            }
        }
    });
}

$(document).ready(() => {
    updatePrinterStats(true);
    setTimeout(() => {
        updatePrinterStats(false);
    }, 5000);
});