//获取url参数
function getParams(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]);
    }
    return null;
};




function getUser() {
    var user = null;

    $.ajax({
        url: getAccountIp() + "/account/getOneByToekn?token=" + window.localStorage.getItem('jwt'), //路径 只需改为你的路径即可
        type: "get",
        dataType: "json",
        async: false,
        success: function(data) {
            user = data.data
                // console.log(user)
                // console.log(user.img)
                // console.log(data.data)
                // $("#topavatar").attr("src", data.img)
        }
    });

    return user;
}













//退出登录
function logout() {
    window.localStorage.removeItem('jwt')
}


//退出登录
function logoutAdmin() {
    window.localStorage.removeItem('adminjwt')
}

//视频服务socket
function getMovieIp() {
    // return getOriginialIp() + ':8091';
    return getOriginialIp() + '/movie';
}

function isAuth() {
    var jwt = window.localStorage.getItem('jwt');
    if (!jwt) {
        return false;
    }
    return true;
}

//解析jwt
function decodeAdmin() {
    // token 有缩略
    var token = window.localStorage.getItem('adminjwt');
    if (token != null) {

        let strings = token.split("."); //截取token，获取载体
        var userinfo = JSON.parse(decodeURIComponent(escape(window.atob(strings[1].replace(/-/g, "+").replace(/_/g, "/")))));
        return userinfo;
    }

    return null;

}

function isAdminAuth() {
    var jwt = window.localStorage.getItem('adminjwt');
    if (!jwt) {
        return false;
    }
    return true;
}

function isExpired() {
    user = decode();
    if (user['exp'] > Date.now()) {
        return false;
    }
    return false;
}

function decode() {
    // // token 有缩略
    // var token = window.localStorage.getItem('jwt');
    // if (token != null) {

    //     let strings = token.split("."); //截取token，获取载体
    //     var userinfo = JSON.parse(decodeURIComponent(escape(window.atob(strings[1].replace(/-/g, "+").replace(/_/g, "/")))));
    //     return userinfo;
    // }

    // return null;
    var user = null;

    $.ajax({
        url: getAccountIp() + "/account/getOneByToekn?token=" + window.localStorage.getItem('jwt'), //路径 只需改为你的路径即可
        type: "get",
        dataType: "json",
        headers: {
            token: window.localStorage.getItem('jwt')
        },
        async: false,
        success: function(data) {
            user = data.data
                // console.log(user)
                // console.log(user.img)
                // console.log(data.data)
                // $("#topavatar").attr("src", data.img)
        }
    });

    return user;

}

//文件服务socket
function getFileIp() {
    // return "http://192.168.241.10:8092";
    // return getOriginialIp() + ':8092'; 
    return getOriginialIp() + '/fileserver';
}

//用户服务socket
function getAccountIp() {
    // return 'http://101.33.243.182:8090';
    // return getOriginialIp() + ':8090';
    return getOriginialIp() + '/account';
}


//付费服务socket
function getMoneyIp() {
    // return 'http://101.33.243.182:8090';
    // return getOriginialIp() + ':8090';
    return getOriginialIp() + '/money';
}

function getOriginialIp() {

    // return 'http://192.168.0.19:8050'
    // return 'http://172.24.63.192:8050'
    // return 'http://172.24.30.63:8050'
    return 'http://127.0.0.1:8050'
        // return 'http://172.25.85.71:8050'
}