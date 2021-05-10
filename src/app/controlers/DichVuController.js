const Sanpham = require('../models/Sanpham')
const Masanpham = require('../models/Masanpham')
const { mutilpleMongooseToObject, mongooseToObject } = require('../../util/mongooes');
const { count } = require('../models/Sanpham');

class DichVuControlers {

    //GET /DichVu.js
    index(req, res, next) {
        Promise.all([Sanpham.find({ masp: 'c' }),
        Sanpham.find({ masp: 'r' }),
        Sanpham.find({ masp: 'bgt' }),
        Sanpham.find({ masp: 'pk' }),
        Sanpham.find({ masp: 'x' }),
        Sanpham.find({ masp: 'b' }),
        Sanpham.find({ masp: 'bg' }),
        Sanpham.find({ masp: 'bt' })
        ])
            .then((result) =>
                res.render('DichVu', {
                    cong: mutilpleMongooseToObject(result[0].slice(0, 3)),
                    rap: mutilpleMongooseToObject(result[1].slice(0, 3)),
                    bangiatien: mutilpleMongooseToObject(result[2].slice(0, 3)),
                    phukien: mutilpleMongooseToObject(result[3].slice(0, 3)),
                    xehoa: mutilpleMongooseToObject(result[4].slice(0, 3)),
                    backdropChupanh: mutilpleMongooseToObject(result[5].slice(0, 3)),
                    bangall: mutilpleMongooseToObject(result[6].slice(0, 3)),
                    bantiec: mutilpleMongooseToObject(result[7].slice(0, 3)),
                })
            )
    }

    //GET /DichVu.js/:slug
    show(req, res, next) {
        var page = parseInt(req.query.page) || 1;
        var perpage = 6;

        var start = (page - 1)*perpage;
        var end = perpage*page;

        Sanpham.find({ masp: req.params.slug })
            .then(sanphams => {
                res.render('DichVu/show', { tongSP: sanphams.length , sanphams: mutilpleMongooseToObject(sanphams).slice(start,end) })
            })
            .catch(next);
    }


    //GET /DichVu/ quanLySP
    quanLySP(req, res, next) {
        var page = parseInt(req.query.page) || 1;
        var perpage = 10;

        var start = (page - 1)*perpage;
        var end = perpage*page;

        if (!req.params.type) {
            Promise.all([Sanpham.countDocuments(), Sanpham.find({})])
                .then(([countSP, sanphams]) =>
                    res.render('DichVu/quanLySP', { countSP, sanphams: mutilpleMongooseToObject(sanphams).slice(start,end) })
                )
        }
        else {
            Sanpham.find({ masp: req.params.type })
                .then(sanphams =>
                    res.render('DichVu/quanLySP', { countSP: sanphams.length, sanphams: mutilpleMongooseToObject(sanphams).slice(start,end) })
                )
        }
    }

    //GET /DichVu/ quanLySPDaXoa
    quanLySPDaXoa(req, res, next) {
        var page = parseInt(req.query.page) || 1;
        var perpage = 10;

        var start = (page - 1)*perpage;
        var end = perpage*page;

        Sanpham.findDeleted({})
            .then(sanphams => {
                res.render('DichVu/quanLySPDaXoa', { sanphams: mutilpleMongooseToObject(sanphams).slice(start,end), tongsp: sanphams.length })
            })
            .catch(next);
    }

    //GET /DichVu/tiemkiem
    timkiem(req, res, next) {
        const key = req.query.search;
        if (key) {

            Sanpham.find({ tensp: { $regex: new RegExp(key.toLowerCase(), "i") } })
                .then(sanphams => {
                    res.render('DichVu/timkiem', { sanphams: mutilpleMongooseToObject(sanphams) })
                })
                .catch(next);
        }
        else{
            res.redirect('back');
        }
    }

    //GET /DichVu/create
    create(req, res, next) {
        Masanpham.find({})
            .then(masp => {
                res.render('DichVu/create', { masp: mutilpleMongooseToObject(masp) })
            })
            .catch(next);
    }

    //POST /DichVu/store
    store(req, res, next) {
        const sp = new Sanpham(req.body)
        sp.hinhanh = req.file.filename;
        // console.log(sp);
        sp.save()
            .then(() => res.redirect('/DichVu/quanLySP'))
            .catch(error => { })
    }

    //GET /DichVu/:_id/edit
    edit(req, res, next) {
        Sanpham.findOne({ _id: req.params.id })
            .then(sanphams => res.render('DichVu/edit', {
                sanphams: mongooseToObject(sanphams)
            }))
            .catch(next)
    }

    //POST /DichVu/:id/update
    update(req, res, next) {
        const sp = req.body;
        if (req.file) {
            sp.hinhanh = req.file.filename;
        }
        Sanpham.updateOne({ _id: req.params.id }, sp)
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //POST /DichVu/:id/delete
    delete(req, res, next) {
        Sanpham.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //POST /DichVu/:id/anSP Ẩn sản phẩm
    anSP(req, res, next) {
        Sanpham.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //POST /DichVu/:id/restore
    restore(req, res, next) {
        const temp = req.body;
        temp.deleted = 'false';
        temp.deletedAt = '';
        Sanpham.updateOne({ _id: req.params.id }, temp)
            .then(() => res.redirect('/DichVu/quanLySPDaXoa'))
            .catch(next);
    }

}

module.exports = new DichVuControlers();

