// DON HANG
var mangNS = document.getElementsByClassName('format_ngay');
for (const i of mangNS) {

  var ng = i.innerHTML;
  var a = new Date(ng);
  i.innerHTML = a.getDate() + '-' + (a.getMonth() + 1) + '-' + a.getFullYear();
};

if (document.cookie.split(';')[1] === ' loai=1') {
  const ngban = document.getElementsByClassName('ngban');
  for (var i of ngban) {
    i.style.display = 'none';
  }
};

// kiem tra input
bien_kt = '';
bien_kt_ten = '';
bien_kt_sdt = '';
bien_kt_email = '';
bien_kt_ngaygiao = '';

function kt_ten(x) {
  var ten = /^[^\d!#@]+$/;
  if (!ten.test(x)) {
    document.getElementById('ktten').innerHTML = 'nhap ten chua phu hop!';
    document.getElementById('ktten').style.display = 'block';
    bien_kt_ten = false;
  }
  else {
    document.getElementById('ktten').style.display = 'none';
    bien_kt_ten = true;
  }
}

function kt_sdt(x) {
  var sdt = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
  if (!sdt.test(x)) {
    document.getElementById('ktsdt').innerHTML = 'nhap sdt chua phu hop!';
    document.getElementById('ktsdt').style.display = 'block';
    bien_kt_sdt = false;
  }
  else {
    document.getElementById('ktsdt').style.display = 'none';
    bien_kt_sdt = true;
  }
}

function kt_email(x) {
  var email = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  if (!email.test(x)) {
    document.getElementById('ktemail').innerHTML = 'nhap email chua phu hop!';
    document.getElementById('ktemail').style.display = 'block';
    bien_kt_email = false;
  }
  else {
    document.getElementById('ktemail').style.display = 'none';
    bien_kt_email = true;
  }
}

function kt_ngaygiao(x) {
  var d = new Date().toISOString().slice(0, 10);
  if (x > d) {
    document.getElementById('ktngaygiao').style.display = 'none';
    bien_kt_ngaygiao = true;
  }
  else {
    document.getElementById('ktngaygiao').innerHTML = 'nhap ngay chua phu hop!';
    document.getElementById('ktngaygiao').style.display = 'block';
    bien_kt_ngaygiao = false;
  }
}

