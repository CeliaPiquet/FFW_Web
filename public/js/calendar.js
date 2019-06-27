document.addEventListener('DOMContentLoaded', function() {
    var initialTimeZone = 'local';
    var timeZoneSelectorEl = document.getElementById('time-zone-selector');
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: [ 'interaction', 'dayGrid', 'timeGrid', 'list' ],
        timeZone: initialTimeZone,
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        navLinks: true, // can click day/week names to navigate views
        editable: true,
        selectable: true,
        eventLimit: true, // allow "more" link when too many events
        eventTimeFormat: { hour: 'numeric', minute: '2-digit', timeZoneName: 'short' },
    });

    calendar.render();

    // load the list of available timezones, build the <select> options
    // it's HIGHLY recommended to use a different library for network requests, not this internal util func
    FullCalendar.requestJson('GET', 'php/get-time-zones.php', {}, function(timeZones) {

        timeZones.forEach(function(timeZone) {
            var optionEl;

            if (timeZone !== 'UTC') { // UTC is already in the list
                optionEl = document.createElement('option');
                optionEl.value = timeZone;
                optionEl.innerText = timeZone;
                timeZoneSelectorEl.appendChild(optionEl);
            }
        });
    }, function() {
        // TODO: handle error
    });


    calendarEl.calendar=calendar;
});

