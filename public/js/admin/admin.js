moment.lang('pt-br');

$('.moment-me').each(function(i,el){
    var _this = $(this);
    var date = _this.text();
    _this.text(moment(date).fromNow() + ' (' + moment(date).format('L') + ')');
});