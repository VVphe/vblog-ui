<template>
  <div id="calender">
      <div class="wrapper wrapper-content">
          <div class="row animated fadeInDown">
    <div class="col-lg-12">
        <div class="ibox float-e-margins">
            <div class="ibox-title">
                <h5>My Calendar </h5>
                
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
      events: []
    }
  },
  methods: {

  },
  mounted() {
  
  let now = new Date()
  let Y = now.getFullYear()
  let m = now.getMonth() + 1 < 10 ? '0'+(now.getMonth() + 1) : now.getMonth() + 1
  let d = now.getDate() < 10 ? '0'+now.getDate() : now.getDate()
  let today = Y + '-' + m + '-' + d

  this.$http.get(global.vblogUrl + '/event/events')
    .then(res => {
      let that = this
      this.events = res.body
      $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultDate: today,
      navLinks: true, // can click day/week names to navigate views
      selectable: true,
      selectHelper: true,
      select: function(start, end) {
        var title = prompt('Event Title:');
        var eventData;
        if (title) {
          eventData = {
            id: (new Date()).valueOf(),
            title: title,
            start: start,
            end: end
          };

          $.ajax({
            type: 'post',
            headers: {
              "Authorization": window.localStorage.getItem('token')
            },
            url: global.vblogUrl + '/event/publish',
            data: {
              "eventid": eventData.id, 
              "eventtitle": title, 
              "start": start.format(), 
              "end": end.format()
            },
            success: function(res) {
              console.log(res)
              $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
            },
            error: function() {
              toastr.error("无此权限")
            }
          })
        }
        $('#calendar').fullCalendar('unselect');
      },
      eventResize: function(event, delta, revertFunc) {
        if (!confirm("确定修改?")) {
          revertFunc();
        } else {
          $.ajax({
            type: 'post',
            headers: {
              "Authorization": window.localStorage.getItem('token')
            },
            url: global.vblogUrl + '/event/update',
            data: {
              "eventid": event.id,  
              "start": event.start.format(), 
              "end": event.end.format()
            },
            success: function(res) {
              toastr.success("修改成功")
            },
            error: function() {
              toastr.error("无此权限")
            }
          })
        }

      },
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: this.events,
      eventClick: function(calEvent, jsEvent, view) {
        if(confirm("确定完成?")) {
          $.ajax({
            type: 'post',
            headers: {
              "Authorization": window.localStorage.getItem('token')
            },
            url: global.vblogUrl + '/event/delete',
            data: {
              "eventid": calEvent.id
            },
            success: function(res) {
              location.reload()
            },
            error: function() {
              toastr.error("无此权限")
            }
          })
        }
      },
      
    });
    })

  //$(document).ready(function() {
    // $('#calendar').fullCalendar({
    //   header: {
    //     left: 'prev,next today',
    //     center: 'title',
    //     right: 'month,agendaWeek,agendaDay'
    //   },
    //   defaultDate: today,
    //   navLinks: true, // can click day/week names to navigate views
    //   selectable: true,
    //   selectHelper: true,
    //   select: function(start, end) {
    //     var title = prompt('Event Title:');
    //     var eventData;
    //     if (title) {
    //       eventData = {
    //         id: (new Date()).valueOf(),
    //         title: title,
    //         start: start,
    //         end: end
    //       };

    //       console.log(eventData)
          
    //       $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true

    //       $.post(global.vblogUrl + '/event/publish', {"eventid": eventData.id, "eventtitle": title, "start": start._i, "end": end._i},
    //         function(res) {
    //           console.log(res)
    //         },"json"
    //       )
    //     }
    //     $('#calendar').fullCalendar('unselect');
    //   },
    //   eventResize: function(event, delta, revertFunc) {
    //     console.log(event)
    //     alert(event + " end is now " + event.end.format());
    //     if (!confirm("确定修改?")) {
    //       revertFunc();
    //     } else {
    //       $.post(global.vblogUrl + '/event/update', {"eventid": event.id,  "start": event.start.format(), "end": event.end.format()},
    //         function(res) {
    //           console.log(res)
    //         },"json"
    //       )
    //     }

    //   },
    //   editable: true,
    //   eventLimit: true, // allow "more" link when too many events
    //   events: this.events
    // });

  //});



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
