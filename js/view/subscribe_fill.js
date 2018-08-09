$(function(){
	var yArr = [{
            label: '业务1',
            value: 0
        }, {
            label: '业务2',
            value: 1
        }, {
            label: '业务3',
            value: 2
        },{
            label: '业务4',
            value: 3
        }, {
            label: '其他',
            value: 4
        }];
    var dArr = [{
            label: '9:00-10:00',
            value: 0
        }, {
            label: '10:00-11:00',
            value: 1
        }, {
             label: '11:00-12:00',
             value: 2
        }];
	$('#showPicker').on('click', function () {
        weui.picker(yArr, {
            onChange: function (result) {
                console.log(result);
            },
            onConfirm: function (result) {
                $("#showPicker").val(yArr[result].label);
            }
        });
    });
    $('#dateBetween').on('click', function () {
        weui.picker(dArr, {
            onChange: function (result) {
                console.log(result);
            },
            onConfirm: function (result) {
                $("#dateBetween").val(dArr[result].label);
            }
        });
    });
    $('#showDatePicker').on('click', function () {
        weui.datePicker({
            start: "1990",
            defaultValue: [new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate()],
            onChange: function (result) {
                console.log(result);
            },
            onConfirm: function (result) {
                var arr = result.splice(",");
                $("#showDatePicker").val(arr[0]+'-'+arr[1]+'-'+arr[2]);
            }
        });
    });
})
