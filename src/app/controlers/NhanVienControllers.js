const NhanVien = require('../models/NhanVien')

const { mutilpleMongooseToObject, mongooseToObject } = require('../../util/mongooes');

class NhanVienControlers {

    //GET /NhanVien.js
    index(req, res, next) {
        NhanVien.find({})
            .then(taikhoan => {
                res.render('NhanVien', { taikhoan: mutilpleMongooseToObject(taikhoan) })
            })
            .catch(next);
    }

    //GET /NhanVien.js/sl
    show(req, res) {
        res.render();
    }

    //GET /NhanVien/ quanLyNV
    quanLyNV(req, res, next) {
        NhanVien.find({})
            .then(taikhoan => {
                res.render('NhanVien/quanLyNV', { taikhoan: mutilpleMongooseToObject(taikhoan) })
            })
            .catch(next);
    }

    //GET /NhanVien/ quanLyNVDaXoa
    quanLyNVDaXoa(req, res, next) {
        NhanVien.findDeleted({})
            .then(taikhoan => {
                res.render('NhanVien/quanLyNVDaXoa', { taikhoan: mutilpleMongooseToObject(taikhoan) })
            })
            .catch(next);
    }

    //GET /NhanVien/create
    create(req, res) {
        res.render('NhanVien/create');
    }

    //POST /NhanVien/store
    async store(req, res, next) {
        let data = await NhanVien.findOne({ username: req.body.username })
            .then(data1 => data1)
        if (data) {
            res.render('NhanVien/create', { errr: ['user_name đã tồn tại!'] })
        }
        else {
            const nv = req.body;
            nv.password = req.body.username;
            nv.loai = '1';
            if(req.filename){
            nv.avt = req.file.filename;}
            const sp = new NhanVien(nv)
            sp.save()
                .then(() => res.redirect('back'))
                .catch(error => { })
        }
    }

    //GET /NhanVien/:_id/edit
    edit(req, res, next) {
        NhanVien.findById(req.params.id)
            .then(taikhoan => res.render('NhanVien/edit', {
                taikhoan: mongooseToObject(taikhoan)
            }))
            .catch(next)
    }

    //POST /NhanVien/:id/update
    update(req, res, next) {
        const nv = req.body;
        if (req.file) {
            nv.avt = req.file.filename;
        }
        NhanVien.updateOne({ _id: req.params.id }, nv)
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //POST /NhanVien/:id/delete
    delete(req, res, next) {
        NhanVien.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //POST /NhanVien/:id/anNV Ẩn nhân viên
    anNV(req, res, next) {
        NhanVien.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //POST /NhanVien/:id/restore
    restore(req, res, next) {
        const temp = req.body;
        temp.deleted = 'false';
        temp.deletedAt = '';
        NhanVien.updateOne({ _id: req.params.id }, temp)
            .then(() => res.redirect('/NhanVien/quanLyNVDaXoa'))
            .catch(next);
    }

}

module.exports = new NhanVienControlers();

