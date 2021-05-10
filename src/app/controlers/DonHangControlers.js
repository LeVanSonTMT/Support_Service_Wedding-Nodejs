const DonHang = require('../models/DonHang')
const ChiTietDonHang = require('../models/ChiTietDonHang')
const Masanpham = require('../models/Masanpham')
const Sanpham = require('../models/Sanpham')
const NhanVien = require('../models/NhanVien')
const lStorage = require('local-storage-json');

const { mutilpleMongooseToObject, mongooseToObject } = require('../../util/mongooes');
const { now } = require('mongoose')

class DonHangControlers {

    DH_choduyet(req, res, next) {
        var page = parseInt(req.query.page) || 1;
        var perpage = 5;

        var start = (page - 1) * perpage;
        var end = perpage * page;

        DonHang.find({ trangthai: 'Chờ Duyệt' })
            .then(donhang => {
                res.render('DonHang/DH_choduyet', { donhang: mutilpleMongooseToObject(donhang).slice(start, end), countDH: donhang.length })
            })
            .catch(next);
    }

    DH_chogiao(req, res, next) {
        var page = parseInt(req.query.page) || 1;
        var perpage = 5;

        var start = (page - 1) * perpage;
        var end = perpage * page;

        if (req.cookies['loai'] === '0') {
            DonHang.find({ trangthai: 'Đã Đặt' })
                .then(donhang => {
                    res.render('DonHang/DH_chogiao', { donhang: mutilpleMongooseToObject(donhang).slice(start, end), countDH: donhang.length })
                })
                .catch(next);
        }
        else {
            var id = req.cookies['id'];
            DonHang.find({ trangthai: 'Đã Đặt' })
                .then(donhang => {
                    const data = donhang.filter(
                        item => {
                            return item.id_nguoiban === id;

                        })
                    res.render('DonHang/DH_chogiao', { donhang: mutilpleMongooseToObject(data).slice(start, end), countDH: data.length })
                })
                .catch(next);
        }

    }

    DH_dagiao(req, res, next) {
        var page = parseInt(req.query.page) || 1;
        var perpage = 5;

        var start = (page - 1) * perpage;
        var end = perpage * page;

        if (req.cookies['loai'] === '0') {
            DonHang.find({ trangthai: 'Đã Giao' })
                .then(donhang => {
                    res.render('DonHang/DH_dagiao', { donhang: mutilpleMongooseToObject(donhang).slice(start, end), countDH: donhang.length })
                })
                .catch(next);
        }
        else {
            var id = req.cookies['id'];
            DonHang.find({ trangthai: 'Đã Giao' })
                .then(donhang => {
                    const data = donhang.filter(
                        item => {
                            return item.id_nguoiban === id;

                        })
                    res.render('DonHang/DH_dagiao', { donhang: mutilpleMongooseToObject(data).slice(start, end), countDH: data.length })
                })
                .catch(next);
        }

    }

    DH_ht(req, res, next) {
        var page = parseInt(req.query.page) || 1;
        var perpage = 5;

        var start = (page - 1) * perpage;
        var end = perpage * page;

        var id = req.cookies['id'];
        if (req.cookies['loai'] === '0') {
            DonHang.find({ trangthai: 'Hoàn Thành' })
                .then(donhang => {
                    res.render('DonHang/DH_ht', { donhang: mutilpleMongooseToObject(donhang).slice(start, end), countDH: donhang.length })
                })
                .catch(next);
        }
        else {
            DonHang.find({ trangthai: 'Hoàn Thành' })
                .then(donhang => {
                    const data = donhang.filter(
                        item => {
                            return item.id_nguoiban === id;
                        })
                    res.render('DonHang/DH_ht', { donhang: mutilpleMongooseToObject(data).slice(start, end), countDH: data.length })
                })
                .catch(next);
        }
    }

    DH_huy(req, res, next) {
        var page = parseInt(req.query.page) || 1;
        var perpage = 5;

        var start = (page - 1) * perpage;
        var end = perpage * page;

        if (req.cookies['loai'] === '0') {
            DonHang.findDeleted({})
                .then(donhang => {
                    res.render('DonHang/DH_huy', { donhang: mutilpleMongooseToObject(donhang).slice(start, end), countDH: donhang.length })
                })
                .catch(next);
        }
        else {
            var id = req.cookies['id'];
            DonHang.findDeleted({})
                .then(donhang => {
                    const data = donhang.filter(
                        item => {
                            return item.id_nguoiban === id;
                        })
                    res.render('DonHang/DH_huy', { donhang: mutilpleMongooseToObject(data).slice(start, end), countDH: data.length })
                })
                .catch(next);
        }
    }

    // tao don hang cho khach
    ClientCreate(req, res, next) {

        Promise.all([Sanpham.find({ masp: 'c' }),
        Sanpham.find({ masp: 'r' }),
        Sanpham.find({ masp: 'bgt' }),
        Sanpham.find({ masp: 'pk' }),
        Sanpham.find({ masp: 'x' }),
        Sanpham.find({ masp: 'b' }),
        Sanpham.find({ masp: 'bg' }),
        Sanpham.find({ masp: 'bt' }),
        Masanpham.find({})
        ])
            .then((result) =>
                res.render('DonHang/ClientCreate', {
                    cong: mutilpleMongooseToObject(result[0]),
                    rap: mutilpleMongooseToObject(result[1]),
                    bangiatien: mutilpleMongooseToObject(result[2]),
                    phukien: mutilpleMongooseToObject(result[3]),
                    xehoa: mutilpleMongooseToObject(result[4]),
                    backdropChupanh: mutilpleMongooseToObject(result[5]),
                    bangall: mutilpleMongooseToObject(result[6]),
                    bantiec: mutilpleMongooseToObject(result[7]),
                    masp: mutilpleMongooseToObject(result[8])
                })
            )
    }

    storeHDClient(req, res, next) {
        const hd = new DonHang(req.body);
        hd.id_nguoiban = '';
        hd.nguoiban = '';
        hd.trangthai = 'Chờ Duyệt';
        var tt = 0;
        var mangSP = req.body.tempSP.split('-');
        hd.slSP = mangSP.length;
        for (var i = 0; i < mangSP.length; i++) {
            var sanpham = mangSP[i].split(',');
            const detainHD = new ChiTietDonHang(sanpham);
            detainHD.idDonHang = hd._id;
            detainHD.idsp = sanpham[0];
            detainHD.soluong = sanpham[1];
            detainHD.ghichu = sanpham[2];
            detainHD.tensp = sanpham[3];
            detainHD.giasp = sanpham[4];
            detainHD.sale = sanpham[5];
            var t = (sanpham[4] * sanpham[1]) - (sanpham[4] * sanpham[5] / 100);
            tt = tt + t;
            detainHD.thanhtien = t;
            detainHD.save()
            // console.log("detainHD: ", detainHD);
        }
        hd.tongtien = tt;
        // console.log("HD: ", hd);
        hd.save()
            .then(() => res.redirect('back'))
            .catch(error => { })
    }

    // tao don hang cho khach
    create(req, res, next) {

        Promise.all([Sanpham.find({ masp: 'c' }),
        Sanpham.find({ masp: 'r' }),
        Sanpham.find({ masp: 'bgt' }),
        Sanpham.find({ masp: 'pk' }),
        Sanpham.find({ masp: 'x' }),
        Sanpham.find({ masp: 'b' }),
        Sanpham.find({ masp: 'bg' }),
        Sanpham.find({ masp: 'bt' }),
        Masanpham.find({})
        ])
            .then((result) =>
                res.render('DonHang/create', {
                    cong: mutilpleMongooseToObject(result[0]),
                    rap: mutilpleMongooseToObject(result[1]),
                    bangiatien: mutilpleMongooseToObject(result[2]),
                    phukien: mutilpleMongooseToObject(result[3]),
                    xehoa: mutilpleMongooseToObject(result[4]),
                    backdropChupanh: mutilpleMongooseToObject(result[5]),
                    bangall: mutilpleMongooseToObject(result[6]),
                    bantiec: mutilpleMongooseToObject(result[7]),
                    masp: mutilpleMongooseToObject(result[8])
                })
            )
    }
    // luu don hang chi tiet vaf luu don hang cho khac
    storeHD(req, res, next) {
        var id_nv = req.cookies['id'];
        var tenNhanVien;
        NhanVien.findOne({ _id: id_nv })
            .then(data => {
                tenNhanVien = data.ten;
                const hd = new DonHang(req.body);
                hd.id_nguoiban = id_nv;
                hd.nguoiban = tenNhanVien;
                hd.trangthai = 'Đã Đặt';
                var tt = 0;
                var mangSP = req.body.tempSP.split('-');
                hd.slSP = mangSP.length;
                for (var i = 0; i < mangSP.length; i++) {
                    var sanpham = mangSP[i].split(',');
                    const detainHD = new ChiTietDonHang(sanpham);
                    detainHD.idDonHang = hd._id;
                    detainHD.idsp = sanpham[0];
                    detainHD.soluong = sanpham[1];
                    detainHD.ghichu = sanpham[2];
                    detainHD.tensp = sanpham[3];
                    detainHD.giasp = sanpham[4];
                    detainHD.sale = sanpham[5];
                    var t = (sanpham[4] * sanpham[1]) - (sanpham[4] * sanpham[5] / 100);
                    tt = tt + t;
                    detainHD.thanhtien = t;
                    detainHD.save()

                }
                hd.tongtien = tt;
                hd.save()
                    .then(() => res.redirect('back'))
                    .catch(error => { })
            })
            .catch(next)
    }

    editHD(req, res, next) {
        Promise.all([Sanpham.find({ masp: 'c' }),
        Sanpham.find({ masp: 'r' }),
        Sanpham.find({ masp: 'bgt' }),
        Sanpham.find({ masp: 'pk' }),
        Sanpham.find({ masp: 'x' }),
        Sanpham.find({ masp: 'b' }),
        Sanpham.find({ masp: 'bg' }),
        Sanpham.find({ masp: 'bt' }),
        Masanpham.find({}),
        ChiTietDonHang.find({ idDonHang: req.params.id }),
        DonHang.findOne({ _id: req.params.id })
        ])
            .then((result) =>
                res.render('DonHang/edit', {
                    cong: mutilpleMongooseToObject(result[0]),
                    rap: mutilpleMongooseToObject(result[1]),
                    bangiatien: mutilpleMongooseToObject(result[2]),
                    phukien: mutilpleMongooseToObject(result[3]),
                    xehoa: mutilpleMongooseToObject(result[4]),
                    backdropChupanh: mutilpleMongooseToObject(result[5]),
                    bangall: mutilpleMongooseToObject(result[6]),
                    bantiec: mutilpleMongooseToObject(result[7]),
                    masp: mutilpleMongooseToObject(result[8]),
                    detainHD: mutilpleMongooseToObject(result[9]),
                    donhang: mongooseToObject(result[10]),
                })
            )
            .catch(next)

    }

    huySP(req, res, next) {
        console.log(req.params.id);
        ChiTietDonHang.deleteOne({ idsp: req.params.id })
            .then(() => res.redirect('back'))
    }

    async updateHD(req, res, next) {
        var id_nv = req.cookies['id'];
        var id_DH = req.params.id;
        await NhanVien.findOne({ _id: id_nv })
            .then(async (data) => {
                let hd = await DonHang.findOne({ _id: id_DH })
                    .then(data1 => data1)
                if (hd) {
                    hd.id_nguoiban = id_nv;
                    hd.nguoiban = data.ten;
                    hd.nguoimua = req.body.nguoimua;
                    hd.SDTnguoimua = req.body.SDTnguoimua;
                    hd.DiaChinguoimua = req.body.DiaChinguoimua;
                    hd.ngaygiao = req.body.ngaygiao;

                    var tt = 0;
                    var mangSP = req.body.tempSP.split('-');

                    hd.slSP = mangSP.length;

                    for (var i = 0; i < mangSP.length; i++) {
                        var sanpham = mangSP[i].split(',');
                        var t = (sanpham[4] * sanpham[1]) - ((sanpham[4] * sanpham[5]) / 100);
                        tt = tt + t;

                        let a = await ChiTietDonHang.findOne({ idDonHang: id_DH, idsp: sanpham[0] })
                            .then(data2 => data2)

                        if (a) {
                            a.idDonHang = id_DH;
                            a.idsp = sanpham[0];
                            a.soluong = sanpham[1];
                            a.ghichu = sanpham[2];
                            a.tensp = sanpham[3];
                            a.giasp = sanpham[4];
                            a.sale = sanpham[5];
                            a.thanhtien = t;
                            a.save();
                        } else {
                            const detainHD = new ChiTietDonHang();
                            detainHD.idDonHang = id_DH;
                            detainHD.idsp = sanpham[0];
                            detainHD.soluong = sanpham[1];
                            detainHD.ghichu = sanpham[2];
                            detainHD.tensp = sanpham[3];
                            detainHD.giasp = sanpham[4];
                            detainHD.sale = sanpham[5];
                            detainHD.thanhtien = t;
                            detainHD.save();
                        }
                    }
                    hd.tongtien = tt;
                    // console.log(hd);
                    hd.save()
                        .then(() => res.redirect('/DonHang/DH_choduyet'))
                        .catch(next);
                }
            })
            .catch(next)
    }

    xem_sp(req, res, next) {
        // console.log(req.params.id);
        ChiTietDonHang.find({ idDonHang: req.params.id })
            .then(data => {
                res.render('DonHang/xem_sp', { chitietdonhang: mutilpleMongooseToObject(data) })
            })
            .catch(next)
    }

    updateDH_choduyet(req, res, next) {
        var id_nv = req.cookies['id'];
        var ten_nv = req.cookies['ten'];
        DonHang.findOne({ _id: req.params.id })
            .then(data => {
                data.trangthai = 'Đã Đặt';
                data.nguoiban = ten_nv;
                data.id_nguoiban = id_nv;
                DonHang.updateOne({ _id: req.params.id }, data)
                    .then(() => res.redirect('back'))
                    .catch(next);
            })
            .catch(next);
    }

    updateDH_chogiao(req, res, next) {
        DonHang.findOne({ _id: req.params.id })
            .then(data => {
                data.trangthai = 'Đã Giao';
                DonHang.updateOne({ _id: req.params.id }, data)
                    .then(() => res.redirect('back'))
                    .catch(next);
            })
            .catch(next);
    }

    updateDH_dagiao(req, res, next) {
        DonHang.findOne({ _id: req.params.id })
            .then(data => {
                data.trangthai = 'Hoàn Thành';
                data.ngaytra = now();
                DonHang.updateOne({ _id: req.params.id }, data)
                    .then(() => res.redirect('back'))
                    .catch(next);
            })
            .catch(next);
    }

    updateDH_huy(req, res, next) {
        DonHang.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    updateDH_xoa(req, res, next) {
        DonHang.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    async updateDH_restore(req, res, next) {
        let dh = await DonHang.findDeleted({ _id: req.params.id })
            .then(data => { return data })
        console.log(dh);
        if (dh) {
            dh[0].deleted = 'false';
            dh[0].deletedAt = '';
            // console.log(dh);
            DonHang.updateOne({ _id: req.params.id }, dh[0])
                .then(() => res.redirect('back'))
                .catch(next);
        }
        else {
            res.redirect('back');
        }
    }

}

module.exports = new DonHangControlers();

