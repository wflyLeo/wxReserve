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
            label: '9:00-10:00',
            value: 1
        }, {
             label: '9:00-10:00',
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
})
