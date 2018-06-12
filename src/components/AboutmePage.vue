<template>
  <div id="AboutmePage">
      <div class="wrapper wrapper-content">
            <div class="row animated fadeInRight">
                <div class="col-lg-5">
                    <div class="ibox float-e-margins">
                        <div class="ibox-title">
                            <h5>Detail</h5>
                        </div>
                        <div>
                            <div class="ibox-content ">
                                <h4><strong>vv</strong></h4>
                                <p><i class="fa fa-map-marker"></i> Shanghai Jiading</p>
                                <h5>
                                    About me
                                </h5>

                                <p style="margin-left: 5px">
                                   Student
                                </p>
                                <p style="margin-left: 5px">
                                   @Tongji University
                                </p>
                                <p style="margin-left: 5px">
                                   22 years old
                                </p>
                            
                                <div class="row m-t-lg">
                                    <div class="col-md-4">
                                        <h5><i class="fa fa-edit"></i><strong>{{counts}}</strong> Articles</h5>
                                    </div>
                                    <div class="col-md-6">
                                        <h5><i class="fa fa-files-o"></i><strong>6</strong> Categories</h5>
                                    </div>
                                </div>
                                <div>
                                    <h5><i class="fa fa-envelope"></i><strong>Contact me at:</strong> crazyphe@gmail.com </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="ibox float-e-margins">
                        <div class="ibox-title">
                            <h5>Browse Detail</h5>
                        </div>
                        
                        <div>
                            <div class="ibox-content">
                                <div class=" rt-btn" v-if="showLine">
                                    <button class="btn btn-default dim" type="button" @click="turnToPie"><i class="fa fa-arrow-circle-left"></i></button>
                                </div>
                                <div v-if="showPie"> 
                                    <eChart :options="pieOption" @click="handlePieClick"></eChart>
                                </div>
                                <div v-if="showLine" style="width: 5px"> 
                                    <eChart :options="lineOption"></eChart>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-7">
                    <div class="ibox float-e-margins">
                        <div class="ibox-title">
                            <h5>Activites</h5>
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

                            <div>
                                <div class="feed-activity-list">

                                    <div class="feed-element" v-for="log in logs">
                                        <!-- <a href="#" class="pull-left">
                                            <img alt="image" class="img-circle" src="img/a1.jpg">
                                        </a> -->
                                        <div class="media-body ">
                                            <small class="pull-right text-navy">{{log.logdate}}</small>
                                            <strong>{{log.logcontent}}</strong>. <br>
                                            <!-- <small class="text-muted">Today 4:21 pm - 12.06.2014</small>
                                            <div class="actions">
                                                <a class="btn btn-xs btn-white"><i class="fa fa-thumbs-up"></i> Like </a>
                                                <a class="btn btn-xs btn-danger"><i class="fa fa-heart"></i> Love</a>
                                            </div> -->
                                        </div>
                                    </div>
                                </div>

                                

                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        showPie: true,
        showLine: false,
        categoryData: [],
        pieOption: {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series: [
                {
                    name: 'category',
                    type: 'pie',
                    radius : '55%',
                    center: ['30%', '50%'],
                    data: [
                        // {value: 10, name: 'Java'},
                        // {value: 7, name: 'Python'},
                        // {value: 8, name: 'Nodejs'},
                        // {value: 12, name: 'Javascript'},
                        // {value: 9, name: 'Mongodb'},
                        // {value: 20, name: 'Mysql'}
                    ],
                    //data: this.categoryData,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        },
        lineOption: {
            title: {
                text: ''
            },
            grid: {
                x: 25,
                width: 400
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'time',
                maxInterval: 3600 * 24 * 1000
            },
            yAxis: {
                type: 'value'
            },
            series: {
                name: '',
                type: 'line',
                data: []
            }
        },

        logs: [],
        counts: '',
    }
  },
  methods: {
    handlePieClick: function(params) {
        let category = params.name
        this.$http.get(global.vblogUrl + '/article/categoryreadcount', {params: {category: category}})
            .then((res) => {
                var finalData = []
                var myData = res.body
                for(var key in myData) {
                    finalData.push([key, myData[key]])
                }
                this.showPie = false
                this.showLine = true
                this.lineOption.title.text = category
                this.lineOption.series.name = category
                this.lineOption.series.data = finalData
            }, (err) => {
                console.log(err)
            })
    },
    turnToPie: function() {
        this.showPie = true
        this.showLine = false
    },

    getArticleCount: function() {
        this.$http.get(global.vblogUrl + '/article/count')
            .then(res => {
                this.counts = res.body
            })
    },
    getCategoryArticleCnt: function() {
        var categorys = ['Java', 'Python', 'Nodejs', 'Javascript', 'Mongodb', 'Mysql']
        categorys.forEach(category => {
            this.$http.get(global.vblogUrl + '/article/categorycnt', {params: {category: category}})
                .then(res => {
                    this.pieOption.series[0].data.push({value: res.body, name: category})
                })
        })
    }
  },
  mounted() {
      this.$http.get(global.vblogUrl + '/log/getlogs')
        .then((res) => {
            res.body.forEach(element => {
                let value = element.logdate
                let time = new Date(value)

                let Y = time.getFullYear()
                let m = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth()
                let d = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
                let H = time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
                let M = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
                let s = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()

                element.logdate = Y + '-' + m + '-' + d + ' ' + H + ':' + M + ':' + s
                
            })
            this.logs = res.body
        })

      this.getArticleCount()
      this.getCategoryArticleCnt()
  }
}
</script>

<style scoped>
.rt-btn {
    display: flex;
    justify-content: flex-end;
}
</style>
