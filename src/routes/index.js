const khuyenMaiRouter = require('./KhuyenMai');
const dichVuRouter = require('./DichVu');
const tuyenDungRouter = require('./TuyenDung');
const adminRouter = require('./admins');
const nhanvienRouter = require('./NhanVien');
const donHangRouter = require('./DonHang');

const Sanpham = require('../app/models/Sanpham');
const TTtuyendung = require('../app/models/TTtuyendung');
const { mutilpleMongooseToObject, mongooseToObject } = require('../util/mongooes');

function route(app) {

    app.use('/DonHang', donHangRouter);

    app.use('/NhanVien', nhanvienRouter);

    app.use('/admins', adminRouter);

    app.use('/TuyenDung', tuyenDungRouter);

    app.use('/KhuyenMai', khuyenMaiRouter);

    app.use('/DichVu', dichVuRouter);

    app.get('/LienHe', (req, res) => {
        return res.render('LienHe');
    });

    app.get('/GioiThieu', (req, res) => {
        return res.render('GioiThieu');
    });

    app.get('/', (req, res) => {
        Promise.all([Sanpham.findOne({ masp: 'c' }),
        Sanpham.findOne({ masp: 'r' }),
        Sanpham.findOne({ masp: 'bgt' }),
        Sanpham.findOne({ masp: 'pk' }),
        Sanpham.findOne({ masp: 'x' }),
        Sanpham.findOne({ masp: 'b' }),
        Sanpham.findOne({ masp: 'bg' }),
        Sanpham.findOne({ masp: 'bt' }),
        TTtuyendung.find({}),
        ])
            .then((result) => {
                Sanpham.find({})
                    .then(sanphams => {
                        const data = sanphams.filter(item => {
                            return item.khuyenmai != "0";
                        })
                        res.render('Home', {
                            cong: mongooseToObject(result[0]),
                            rap: mongooseToObject(result[1]),
                            bangiatien: mongooseToObject(result[2]),
                            phukien: mongooseToObject(result[3]),
                            xehoa: mongooseToObject(result[4]),
                            backdropChupanh: mongooseToObject(result[5]),
                            bangall: mongooseToObject(result[6]),
                            bantiec: mongooseToObject(result[7]),
                            thongbao: mutilpleMongooseToObject(result[8]),
                            spSale: mutilpleMongooseToObject(data.slice(0,3))
                        })
                    })
            }
            )

    });

}

module.exports = route;
