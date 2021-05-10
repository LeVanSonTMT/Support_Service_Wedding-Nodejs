const TTtuyendung = require('../models/TTtuyendung')
const {mutilpleMongooseToObject, mongooseToObject} = require('../../util/mongooes');

class TuyenDungControlers{
    //GET /TuyenDung.js
    index(req, res, next){
        TTtuyendung.find({})
        .then(tuyendungs => {
            res.render('TuyenDung', { tuyendungs: mutilpleMongooseToObject(tuyendungs) })
        })
        .catch(next);
    }

    //GET /TuyenDung/create
    create(req, res, next) {
        res.render('TuyenDung/create')
    }

    //POST /TuyenDung/store
    store(req, res, next) {
        const sp = new TTtuyendung(req.body)
        sp.save()
            .then(() => res.redirect('/TuyenDung/quanLyTD'))
            .catch(error => { })
    }

    //GET /TuyenDung/:_id/edit
    edit(req, res, next) {
        TTtuyendung.findById(req.params.id)
            .then(tuyendungs => res.render('TuyenDung/edit', {
                tuyendungs: mongooseToObject(tuyendungs)
            }))
            .catch(next)
    }

    //POST /TuyenDung/:id/update
    update(req, res, next) {
        TTtuyendung.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/TuyenDung/quanLyTD'))
            .catch(next);
    }

    //GET /TuyenDung/create
    qlTD(req, res, next) {
        TTtuyendung.find({})
            .then(tuyendungs => {
                res.render('TuyenDung/quanLyTD', { tuyendungs: mutilpleMongooseToObject(tuyendungs) })
            })
            .catch(next);
    }

    //GET /TuyenDung/qlTDdelete
    qlTDdelete(req, res, next) {
        TTtuyendung.findDeleted({})
            .then(tuyendungs => {
                res.render('TuyenDung/quanLyTDDaXoa', { tuyendungs: mutilpleMongooseToObject(tuyendungs) })
            })
            .catch(next);
    }

    //POST /TuyenDung/:id/SoftDelete
    SoftDelete(req, res, next) {
        TTtuyendung.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //POST /TuyenDung/:id/delete
    delete(req, res, next) {
        TTtuyendung.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }


}

module.exports = new TuyenDungControlers();

