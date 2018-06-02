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
                                <p><i class="fa fa-map-marker"></i> Riviera State 32/106</p>
                                <h5>
                                    About me
                                </h5>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitat.
                                </p>
                                <div class="row m-t-lg">
                                    <div class="col-md-4">
                                        <h5><i class="fa fa-edit"></i><strong>169</strong> Articles</h5>
                                    </div>
                                    <div class="col-md-6">
                                        <h5><i class="fa fa-files-o"></i><strong>28</strong> Categories</h5>
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
                                <div>
                                <eChart :options="pieOption"></eChart>
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
        pieOption: {
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series: [
                {
                    type: 'pie',
                    radius : '55%',
                    center: ['30%', '50%'],
                    data: [
                        {value: 10, name: 'Java'},
                        {value: 7, name: 'Python'},
                        {value: 8, name: 'Nodejs'},
                        {value: 12, name: 'Javascript'},
                        {value: 9, name: 'Mongodb'},
                        {value: 20, name: 'Mysql'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
    }
  },
  methods: {

  },
  mounted() {

  }
}
</script>

<style scoped>
</style>
