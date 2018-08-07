$(function(){
	
	$("#buPicker").picker({
	  title: "请选择业务",
	  cols: [
	    {
	      textAlign: 'center',
	      values: ['业务1', '业务2', '业务3', '业务4', '业务5']
	    }
	  ]
	});

	$('#showPicker').on('click', function () {
        weui.picker([{
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
            disabled: true,
            value: 3
        }, {
            label: '其他',
            value: 4
        }], {
            onChange: function (result) {
                console.log(result);
            },
            onConfirm: function (result) {
                console.log(result);
            }
        });
    });
})
