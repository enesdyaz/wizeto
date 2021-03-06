exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next()   // 인수가 있으면 에러처리, 없으면 다음 미들웨어로 넘어감 
    }
    return res.send('LOGIN required')

}

exports.isNotLoggedIn = (req, res, next) =>{
    if(!req.isAuthenticated()){
        return next()
    }
    return res.send('a logged user is not permitted')

}

