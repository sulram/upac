$(document).ready(function(){
    var o, n, list = $('#sortables'), items = $('#sortables tr');
	list.sortable({
        items: "> tr",
        start: function(e,ui){
            o = ui.item.index();
        },
        update: function(e,ui){
            n = ui.item.index();
            //console.log(ui.item, 'from ', o, ' to ', n);
            console.log('from ', o, ' to ', n);
            order_text();
        }
    });
    function order_text(){
        $('#sortables tr').each(function(i,el){
            var order = $(el).find('.order');
            var n = Number(order.text());
            var id = $(el).attr('id');
            order.text(i+1);
            if(n != i+1){
                $.ajax({
                    type: 'POST',
                    url: '/admin/notice/' + id,
                    data: {'order': i+1},
                    success: function(data, status, jqXHR){
                        console.log('saved! ', id);
                    }
                });
            }
        });
    }
    order_text();
});