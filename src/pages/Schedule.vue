<template>
    <div class="calendar">
        <el-calendar>
            <template slot="dateCell" slot-scope="{date, data}">
                <div style="height:100%" :class="data.isSelected ? 'is-selected' : ''" @click="handleclick(data.day)">
                    <div>{{ data.day.split('-').slice(1).join('-') }}</div>
                    <div class="state" v-if="schedule.find(v => v.date === data.day)">{{ "已分配" }}</div>
                </div>
            </template>
        </el-calendar>

        <el-dialog title="收货地址" :visible.sync="dialogTableVisible" width = 1200px center = true>
        <el-table :data="schedule">
            <el-table-column property="staff" label="员工姓名" width="80"></el-table-column>
            <el-table-column property="time" label="工作时间" width="200"></el-table-column>
            <el-table-column property="work" label="岗位" width="150"></el-table-column>
            <el-table-column property="staffId" label="员工号" width="100"></el-table-column>
            <el-table-column property="id" label="编号" width="100"></el-table-column>
            <el-table-column property="storeId" label="所属门店" width="8 0"></el-table-column>
            <el-table-column property="startTime" label="开始时间" width="150"></el-table-column>
            <el-table-column property="date" label="日期" width="150"></el-table-column>
        </el-table>
    </el-dialog>
    </div>
    <!-- Table -->
    

</template>
<script>

export default {
    name: 'shiftScheduling',
    data() {
        return {
            schedule: [
            {
            "staff": "老白",
            "time": "8:00--10:00",
            "work": "准备工作",
            "staffId": 3,
            "id": 1621453308566745090,
            "storeId": 1,
            "startTime": 8,
            "workTime": 2,
            "date": "2023-02-01"
        },
        {
            "staff": "晴天",
            "time": "8:00--10:00",
            "work": "准备工作",
            "staffId": 4,
            "id": 1621453308566745091,
            "storeId": 1,
            "startTime": 8,
            "workTime": 2,
            "date": "2023-02-01"
        },
        {
            "staff": "春秋",
            "time": "8:00--10:00",
            "work": "准备工作",
            "staffId": 6,
            "id": 1621453308566745092,
            "storeId": 1,
            "startTime": 8,
            "workTime": 2,
            "date": "2023-02-01"
        },
        {
            "staff": "长瞄",
            "time": "8:00--10:00",
            "work": "准备工作",
            "staffId": 8,
            "id": 1621453308566745093,
            "storeId": 1,
            "startTime": 8,
            "workTime": 2,
            "date": "2023-02-01"
        },
            ],

            dialogTableVisible:false,
     
        }
    },
    methods: {
        handleclick(data) {
            if(this.schedule.find(v => v.date === data)){
                this.dialogTableVisible = true;
            }
            //console.log(this.dialogTableVisible)
        }
    }
}
</script> 

<style scoped>
.state {
    font-size: medium;
    font-weight: 800;
    color: #5bb093;
}

.calendar {
    height: 80px;
}

.el-calendar {
    /* max-height: 1000px; */
    width: 100%;
}

::v-deep .el-calendar-table .el-calendar-day {
    height: 80px;
    line-height: 30px;
}
</style>