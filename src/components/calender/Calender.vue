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
          if(event.title.indexOf("finish") !== -1) {
            revertFunc()
            toastr.error("已完成任务无法修改")
          }
          else {
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
        }

      },
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: this.events,
      eventClick: function(calEvent, jsEvent, view) {
        let that = this
        if(confirm("确定完成?")) {
          if(calEvent.title.indexOf('finish') != -1) {
            toastr.error("已完成任务无法更改状态")
          } else {
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
                // console.log($(that))
                // $(that).css('border-color', 'red')
              },
              error: function() {
                toastr.error("无此权限")
              }
            })
          }
        }
      },
      
    });
    })

  console.log($("calendar").fullCalendar())

  
  }

  
}
</script>

<style scoped>
</style>
