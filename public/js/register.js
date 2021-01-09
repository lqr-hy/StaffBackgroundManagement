let form = document.forms[0];
console.log(document.forms);

// getReg(/^1[3-9]{1}\d{9}$/, form.elements[4]);
// getReg(/^\w+[@][0-9a-z]+[.][a-z]{3}$/, form.elements[5]);
// getReg(/^[0-9]{17}([0-9]|x){1}$/, form.elements[5]);
// getReg(/^0[1-9]{3,4}[-][0-9]{4,6}$/, form.elements[6]);

// 判断密码长度
form.elements[1].onkeyup = function () {
    let s = /\d+/;
    let e = /[a-zA-Z]+/;
    let f = /[^0-9a-zA-Z]+/;
    let x = y = z = sum = 0;
    if (form.elements[1].value) {
        f.test(form.elements[1].value) ? z = 1 : 0
        s.test(form.elements[1].value) ? x = 1 : 0
        e.test(form.elements[1].value) ? y = 1 : 0
        sum = z + y + x;
        sum == 1 ? this.nextElementSibling.innerHTML = '弱' : 0;
        sum == 2 ? this.nextElementSibling.innerHTML = '中' : 0;
        sum == 3 ? this.nextElementSibling.innerHTML = '强' : 0;
    } else {
        this.nextElementSibling.innerHTML = ''
        return
    }
    // getReg(/\w{8,16}[^0-9a-zA-Z]+/, form.elements[1]);
}

form.elements[2].onblur = function () {
    // console.log(form.elements[2].value);
    // console.log(form.elements[1].value);
    if (form.elements[1].value != '') {
        if (form.elements[2].value !== form.elements[1].value) {
            this.nextElementSibling.innerHTML = '两次密码不一样';
        } else {
            this.nextElementSibling.innerHTML = '输入密码正确';
        }
    }
}
// getReg(/\w/, form.elements[1])

// getReg(/(\d{3})\d{5}(\d3)/,)
// function getReg(reg, ele) {
//     ele.onblur = function () {
//         if (this.value !== '') {
//             if (reg.test(this.value)) {
//                 this.nextSibling.innerHTML = '√';
//             } else {
//                 this.nextSibling.innerHTML = '×';
//                 this.value = '';
//             }
//         } else {
//             this.nextSibling.innerHTML = ' ';
//             this.value = ' ';
//         }
//     }
// }

// console.log($All('input'))
// console.log($$('#btn'))
$$('#btn').onclick = async function () {
    let username = form.elements[1].value
    let password = form.elements[2].value
    console.log(username, password)
    let data = `&username=${username}&password=${password}`
    // console.log(data)
    const res = await axios.post(`/login/user`, data)
    if (res == 0) {
        window.location.href = '/pro'
    } else {
        window.alert('服务器忙，请稍后重试')
    }
    form.elements[0].value = ''
    form.elements[1].value = ''
    form.elements[2].value = ''
}