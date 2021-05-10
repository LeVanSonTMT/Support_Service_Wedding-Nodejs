module.exports.RangBuocLogin = function(req, res, next) {
    if(!req.cookies.id){
        res.redirect('/admins/DangNhap');
        return;
    }
    next();
};