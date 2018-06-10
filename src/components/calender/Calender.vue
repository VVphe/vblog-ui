<template>
  <div id="calender">
      <div class="wrapper wrapper-content">
          <div class="row animated fadeInDown">
    <div class="col-lg-12">
        <div class="ibox float-e-margins">
            <div class="ibox-title">
                <h5>Striped Table </h5>
                <div class="ibox-tools">
                    <a class="collapse-link">
                        <i class="fa fa-chevron-up"></i>
                    </a>
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                        <i class="fa fa-wrench"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-user">
                        <li><a href="#">Config option 1</a>
                        </li>
                        <li><a href="#">Config option 2</a>
                        </li>
                    </ul>
                    <a class="close-link">
                        <i class="fa fa-times"></i>
                    </a>
                </div>
            </div>
            <div class="ibox-content">
                <div id="calendar" class="fc fc-ltr fc-unthemed"></div>
            </div>
        </div>
    </div>
          </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'calender',
  data() {
    return {

    }
  },
  methods: {

  },
  mounted() {
      


  $(document).ready(function() {

    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultDate: '2018-03-12',
      navLinks: true, // can click day/week names to navigate views
      selectable: true,
      selectHelper: true,
      select: function(start, end) {
        var title = prompt('Event Title:');
        var eventData;
        if (title) {
          eventData = {
            title: title,
            start: start,
            end: end
          };
          $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
        }
        $('#calendar').fullCalendar('unselect');
      },
      eventResize: function(event, delta, revertFunc) {
        alert(event.title + " end is now " + event.end.format());
        if (!confirm("is this okay?")) {
          revertFunc();
        }

      },
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: [
        {
          title: 'All Day Event',
          start: '2018-03-01'
        },
        {
          title: 'Long Event',
          start: '2018-03-07',
          end: '2018-03-10'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2018-03-09T16:00:00'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2018-03-16T16:00:00'
        },
        {
          title: 'Conference',
          start: '2018-03-11',
          end: '2018-03-13'
        },
        {
          title: 'Meeting',
          start: '2018-03-12T10:30:00',
          end: '2018-03-12T12:30:00'
        },
        {
          title: 'Lunch',
          start: '2018-03-12T12:00:00',
          end: '2018-03-12T12:30:00'
        },
        {
          title: 'Meeting',
          start: '2018-03-12T14:30:00'
        },
        {
          title: 'Happy Hour',
          start: '2018-03-12T17:30:00'
        },
        {
          title: 'Dinner',
          start: '2018-03-12T20:00:00'
        },
        {
          title: 'Birthday Party',
          start: '2018-03-13T07:00:00'
        },
        {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2018-03-28'
        }
      ]
    });

  });



    // $(document).ready(function() {

    //         $('.i-checks').iCheck({
    //             checkboxClass: 'icheckbox_square-green',
    //             radioClass: 'iradio_square-green'
    //         });

    //     /* initialize the external events
    //      -----------------------------------------------------------------*/


    //     $('#external-events div.external-event').each(function() {

    //         // store data so the calendar knows to render an event upon drop
    //         $(this).data('event', {
    //             title: $.trim($(this).text()), // use the element's text as the event title
    //             stick: true // maintain when user navigates (see docs on the renderEvent method)
    //         });

    //         // make the event draggable using jQuery UI
    //         $(this).draggable({
    //             zIndex: 1111999,
    //             revert: true,      // will cause the event to go back to its
    //             revertDuration: 0  //  original position after the drag
    //         });

    //     });


    //     /* initialize the calendar
    //      -----------------------------------------------------------------*/
    //     var date = new Date();
    //     var d = date.getDate();
    //     var m = date.getMonth();
    //     var y = date.getFullYear();

    //     $('#calendar').fullCalendar({
    //         header: {
    //             left: 'prev,next today',
    //             center: 'title',
    //             right: 'month,agendaWeek,agendaDay'
    //         },
    //         editable: true,
    //         droppable: true, // this allows things to be dropped onto the calendar
    //         eventResize: function(event, delta, revertFunc) {

    //             alert(event.title + " end is now " + event.end.format());

    //             if (!confirm("is this okay?")) {
    //             revertFunc();
    //             }

    //         },
    //         drop: function() {
    //             // is the "remove after drop" checkbox checked?
    //             if ($('#drop-remove').is(':checked')) {
    //                 // if so, remove the element from the "Draggable Events" list
    //                 $(this).remove();
    //             }
    //         },
    //         events: [
    //             {
    //                 title: 'All Day Event',
    //                 start: new Date(y, m, 1)
    //             },
    //             {
    //                 title: 'Long Event',
    //                 start: new Date(y, m, d-5),
    //                 end: new Date(y, m, d-2)
    //             },
    //             {
    //                 id: 999,
    //                 title: 'Repeating Event',
    //                 start: new Date(y, m, d-3, 16, 0),
    //                 allDay: false
    //             },
    //             {
    //                 id: 999,
    //                 title: 'Repeating Event',
    //                 start: new Date(y, m, d+4, 16, 0),
    //                 allDay: false
    //             },
    //             {
    //                 title: 'Meeting',
    //                 start: new Date(y, m, d, 10, 30),
    //                 allDay: false
    //             },
    //             {
    //                 title: 'Lunch',
    //                 start: new Date(y, m, d, 12, 0),
    //                 end: new Date(y, m, d, 14, 0),
    //                 allDay: false
    //             },
    //             {
    //                 title: 'Birthday Party',
    //                 start: new Date(y, m, d+1, 19, 0),
    //                 end: new Date(y, m, d+1, 22, 30),
    //                 allDay: false
    //             },
    //             {
    //                 title: 'Click for Google',
    //                 start: new Date(y, m, 28),
    //                 end: new Date(y, m, 29),
    //                 url: 'http://google.com/'
    //             }
    //         ]
    //     });


    // });

  }
}
</script>

<style scoped>
</style>
