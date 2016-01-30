$(function() {
    loadSwiper();//加载Banner滑动控件
    loadNews('recommend');//初始状态下【推荐】板块内容预加载
    underline();//点击导航标签之后增加下划线
    switchNews();//点击导航标签之后更滑新闻流的内容
    showBanner();//部分类别的页面下展示Banner板块
});
/**
 * 鼠标点击导航事件
 */
function underline() {
    $('.nav-item li span').each(function(index, el) {
        $(this).on('click', function(event) {
            event.preventDefault();
            $('.nav-item li span').removeClass('underline');
            $(this).addClass('underline');
        });
    });
}
/**
 * 部分板块展示Banner
 */
function showBanner(){
	$('.recommend,.entertain').on('click', function(event) {
		event.preventDefault();
		$('.banner').removeClass('hide');
	});
}
/**
 * 切换新闻标签
 */
function switchNews() {

    updateNews('.social', 'social');
    updateNews('.entertain', 'entertain');
    updateNews('.local', 'local');
    updateNews('.families', 'families');
    updateNews('.recommend', 'recommend');

}

/**
 * 使用ajax从数据库加载数据
 */
function updateNews(newsItemClass, newsItem) {

    $(newsItemClass).on('click', function(event) {
        event.preventDefault();
        $('.news-box').remove();
        $('.banner').addClass('hide');
        loadNews(newsItem);
    });

}
/**
 * 配置焦点图
 * @return {[type]} [description]
 */
function loadSwiper() {
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true
    });
}
/**
 * 从服务器加载推荐版块的新闻
 * @param  newstype 新闻的分类
 */
function loadNews(newstype) {
    $.ajax({
            url: 'php/loadnews.php',
            type: 'POST',
            dataType: 'json',
            data: {
                name: newstype
            }
        })
        .done(function(data) {
            var length = data.length;
            for (var i = 0; i < data.length; i++) {
                addNews(data[i]);
            };
        })

    .fail(function() {
        console.log("error");
    });

}

/**
 * 将获取到的数据转换成HTML插入到页面中
 * @param array data 
 */
function addNews(data) {
    var newsbox = $('<div>').addClass('news-box').appendTo('.news');
    var newslink = $('<a>').addClass('news-link').appendTo(newsbox);
    newslink.attr('href', data.newslink);
    var newsimg = $('<div>').addClass('newsimg').appendTo(newslink);
    $('<img>').attr('src', data.newsimg).appendTo(newsimg);
    var newscontent = $('<div>').addClass('newscontent').appendTo(newslink);
    var newstitlr = $('<h2>').text(data.newstitle).appendTo(newscontent);
    var addtime = $('<span>').text(data.addtime).appendTo(newscontent);
}
