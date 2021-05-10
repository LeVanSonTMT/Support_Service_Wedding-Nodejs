const NhanVien = require('../models/NhanVien');
const DonHang = require('../models/DonHang');
const { mutilpleMongooseToObject, mongooseToObject } = require('../../util/mongooes');

class adminControlers {

    dangNhap(req, res, next) {
        res.render('admins/DangNhap')
    }

    dangXuat(req, res, next) {
        res.clearCookie('id');
        res.clearCookie('loai');
        res.clearCookie('ten');
        res.redirect('/admins/DangNhap');
    }

    XLlogin(req, res, next) {
        var u = req.body.username;
        var p = req.body.pw;
        NhanVien.findOne({ username: u })
            .then(data => {
                if (data.password === p) {
                    res.cookie('id', data._id)
                    res.cookie('loai', data.loai)
                    res.cookie('ten', data.ten)
                    if (data.loai === '1') {
                        res.redirect('/admins/tk')
                    }
                    else {
                        res.redirect('/admins/tk')
                    }
                }
                else {
                    res.render('admins/DangNhap', { errpass: ['Mật khẩu chưa đúng!'] })
                }
            }).catch(() => {
                res.render('admins/DangNhap', { errusers: ['Tên đăng chưa đúng!'] })
            })


    }

    tk(req, res, next) {
        var id = req.cookies['id'];
        Promise.all([
            NhanVien.findOne({ _id: id }),
            DonHang.find({ trangthai: 'Đã Đặt' })
                .then(donhang => {
                    const data = donhang.filter(
                        item => {
                            return item.id_nguoiban === id;
                        })
                    return data.length
                }),

            DonHang.find({ trangthai: 'Đã Giao' })
                .then(donhang => {
                    const data = donhang.filter(
                        item => {
                            return item.id_nguoiban === id;
                        })
                    return data.length
                }),

            DonHang.find({ trangthai: 'Hoàn Thành' })
                .then(donhang => {
                    const data = donhang.filter(
                        item => {
                            return item.id_nguoiban === id;
                        })
                    return data.length
                }),

            DonHang.findDeleted({})
                .then(donhang => {
                    const data = donhang.filter(
                        item => {
                            return item.id_nguoiban === id;
                        })
                    return data.length
                })


        ])
            .then((result) =>
                res.render('admins/tk', {
                    taikhoan: mongooseToObject(result[0]),
                    soDH1: result[1], soDH2: result[2],
                    soDH3: result[3], soDH4: result[4]
                })
            )
            .catch(next)


    }
}

module.exports = new adminControlers();

