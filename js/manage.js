$(document).ready(function() {
    // getNewsList();
    switchNavColor();
    switchTab();
    callBack();
    updataCallBack();
});

//返回后台提示，并且跳转到新闻管理界面
function callBack() {
    $('.news-submit').on('click', function(event) {
        event.preventDefault();
        $('.news-content').ajaxSubmit(function(data) {
            alert(data);
            $('.tab-pane').removeClass('active');
            $('.manage-news').addClass('active');
            $('.news-nav li').removeClass('active');
            $('.btn-manage').addClass('active');
            getNewsList();
        });
    });
}

//百度新闻管理系统  开始
/**
 * 左侧导航栏标签切换
 */
function switchNavColor() {
    $('.news-nav li').each(function(index, el) {
        $(this).on('click', function(event) {
            event.preventDefault();
            $('.news-nav li').removeClass('active');
            $(this).addClass('active');
        });
    });
}
/**
 * 切换Tab页
 */
function switchTab() {
    $('.btn-up').on('click', function(event) {
        event.preventDefault();
        $('.tab-pane').removeClass('active');
        $('.up-news').addClass('active');
    });
    $('.btn-welcome').on('click', function(event) {
        event.preventDefault();
        $('.tab-pane').removeClass('active');
        $('.welcome').addClass('active');
    });
    $('.btn-manage').on('click', function(event) {
        event.preventDefault();
        $('.tab-pane').removeClass('active');
        $('.manage-news').addClass('active');
        getNewsList();
    });

}

/**
 * 在新闻管理界面获取新闻标题列表
 */

function getNewsList() {
    $.ajax({
            url: './php/downloadnews.php',
            type: 'POST',
            dataType: 'json',
            // data: {param1: 'value1'},
        })
        .done(function(data) {
            $.each(data, function(index, val) {
                insertNewsTitle(index, val);
            });
        });

}
/**
 * 将从数据库获取到的数据添加到新闻管理界面中
 */
function insertNewsTitle(index, val) {
    $('<li>').addClass('list-group-item').appendTo('.list-group');
    var newlist = $('.list-group-item').eq(index).text(val['newstitle']);
    $('<span>').text("上传时间：" + val['addtime']).appendTo(newlist);
    $('<button>').attr({
        'title': val['newsid'],
        'type': 'button',
        'class': 'btn btn-info btn-update',
        'onclick':'updateNews(this)',
        'data-toggle':'modal',
        'data-target':'.bs-example-modal-lg'
    }).html("修改").appendTo(newlist);
    $('<button>').attr({
        'title': val['newsid'],
        'type': 'button',
        'data-dismiss':'alert',
        'class': 'btn btn-danger btn-delete',
        'onclick':'deleteNews(this)'
    }).html("删除").appendTo(newlist);
}
/**
 * 删除新闻
 */

function deleteNews(ele){
    event.preventDefault();
    var newsId = ele.title;
    $.get('./php/deletenews.php',{deleteId:newsId}, function(data) {
        if (data) {
            alert('新闻已经从系统中删除！');
            $('.list-group').empty();
            getNewsList();
        };
    });
    
}

/**
 * 修改新闻
 */
function updateNews(ele){
    event.preventDefault();
    var newsId = ele.title;
    $.ajax({
        url: './php/updatenews.php',
        type: 'POST',
        dataType: 'json',
        data: {updateId: newsId},
    })
    .done(function(data) {
        $('#update-id'). attr('value', data.newsid);
        $('#update-img').attr('value', data.newsimg);
        $('#update-title'). attr('value', data.newstitle);
        $('#update-img').attr('value', data.newsimg);
        $('#update-link').attr('value', data.newslink);
        $('#update-content').attr('value', data.newscontent);
        $('#update-addtime').attr('value', data.addtime);
    });
    
}

/**
 * 更新数据回调函数
 */
function updataCallBack(){
    $('.news-update').on('click', function(event) {
        event.preventDefault();
        $('.update-content').ajaxSubmit(function(data) {            
            // 清理bootstrap模态框的残留
            $('.modal').attr('style', 'display:none');
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
            $('body').removeAttr('style');
            alert(data);
            getNewsList();
        });
    });
}