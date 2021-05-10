const Sanpham = require('../models/Sanpham')
const {mutilpleMongooseToObject} = require('../../util/mongooes');

class KhuyenMaiControlers{
    //GET /KhuyenMai.js
    index(req, res, next){
        Sanpham.find({})
            .then(sanphams => 
            {
                const data = sanphams.filter(item => {
                    return item.khuyenmai != 0;
                })                
                res.render('KhuyenMai', {sanphams: mutilpleMongooseToObject(data) })
            })
            .catch(next);    
    }
}

module.exports = new KhuyenMaiControlers();

