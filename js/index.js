jQuery(document).ready(function($) {
	loadSwiper();
	getNews();
});
//加载Banner焦点图插件的代码
function loadSwiper() {
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true
    });
}
//从数据库中获取推荐的新闻内容
function getNews(){
	$.ajax({
		url: 'localhost/baidunews/php/loadnews.php',
		type: 'GET',
		// dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
		// data: {param1: 'value1'},
	})
	.done(function() {
		alert("success");
	})
	.fail(function() {
		alert("error");
	})
	.always(function() {
		alert("complete");
	});
	
}