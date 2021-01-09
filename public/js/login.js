(() => {
    // $$('#validate').onclick = function () {
    //     $$('.box').style.display = 'block'
    // }

    let header_right = document.querySelector('.header_right');
    let footer_left = document.querySelector('.footer_left');
    let main = document.querySelector('.main');
    // let validateBtn = document.querySelector('.validateBtn');
    //定义一个数组 里面存文字 
    let arr = ["行", "尸", "走", "肉", "金", "蝉", "脱", "壳", "百", "里", "挑", "一", "玉", "满", "堂", "背", "水", "战", "霸", "王", "别", "姬", "天", "上", "人", "间", "不", "吐", "快", "海", "阔", "空", "情", "非", "得", "已", "腹", "经", "纶", "兵", "临", "城", "下", "春", "暖", "花", "开", "插", "翅", "难", "逃", "黄", "道", "吉", "日", "无", "双", "偷", "换", "两", "小", "猜", "卧", "虎", "藏", "龙", "珠", "光", "宝", "气", "簪", "缨", "世", "族", "公", "子", "绘", "声", "影", "国", "色", "香"];
    //  文字去重
    // let x = arr.filter((ele, i, arr) => {
    //     return arr.indexOf(ele) == i;
    // })
    // console.log(x);
    // console.log(arr);
    let header_arr = [];
    let footer_arr = [];
    for (let i = 0; i < 4; i++) {
        //将随机的索引在数组中取出
        header_arr.push(arr[getRound(arr.length, 0)]);
    }
    // 将数组的内容添加到头部显示  将数组转化成字符串
    header_right.innerHTML = header_arr.join('');
    // let text = header_arr.join('');
    // console.log(text);
    // console.log(header_arr)

    // 获取中间内容的大小和位置 
    let mainW = main.offsetWidth;
    let mainH = main.offsetHeight;
    console.log(mainW, mainH);
    // 遍历随机出来的四个文字
    for (let i = 0; i < header_arr.length; i++) {
        let div = document.createElement('div');
        div.innerHTML = header_arr[i];
        // console.log(header_arr[i]);
        div.style = `position:absolute;width:30px;height:30px;left:${getRound(mainW - 30, 0) - 30 > mainW ? mainW : getRound(mainW - 30, 0) + 'px'};top:${getRound(mainH - 30, 0) > mainH ? mainH : getRound(mainH - 30, 0) + 'px'};font-size:18px;transform: rotate(${getRound(180, 0)}deg);`;
        // console.log(getRound(mainW, 0) + 'px')
        main.appendChild(div);
    }
    // console.log(main.children);
    // 当点击时显示并追加到footer数组里面去
    for (let i = 0; i < main.children.length; i++) {
        main.children[i].onclick = function () {
            console.log(this.innerHTML);
            //  如果数组中存在就不能在添加
            // if (footer_arr.indexOf(this.innerHTML) == -1) { }
            footer_arr.push(this.innerHTML);
            // 点击当前元素时创建一个span 为了实现✔现象
            let sp = document.createElement('span');
            sp.style = `position: absolute;
              top:0;
              left:0;
              z-index: 2;
              width: 30px;
              height: 30px;
              background-color: red;
              clip-path: polygon(0% 50%, 0% 40%, 35% 55%, 60% 0%, 70% 0%, 45% 73%, 0% 50%);`;
            footer_left.innerHTML = footer_arr.join('');
            this.appendChild(sp);
            // this.toLowcase()
            // console.log();
            let spH = (this.children[0].nodeName).toLowerCase();
            if (spH == 'span') {
                //当存在span 说明已经点击过 不能再次点击
                main.children[i].onclick = false;
            }
        }
    }
    let flag = false
    $$('.validateBtn').onclick = function () {
        if (!footer_arr[0]) return alert('没有东西确定个鸡儿');
        // console.log(footer_arr);
        //将数组转换为字符串然后开始比较
        if (header_arr.join('') == footer_arr.join('')) {
            // console.log('验证正确');
            flag = true
            $$('#validateBox').style.visibility = 'visible'
            setLogin()
            // alert('恭喜恭喜')
        } else {
            // console.log('验证错误');
            alert('这都能点错是不是瞎')
            location.reload();
        }

    }

    function getRound(max, min) {
        return parseInt(Math.random() * (max - min) + min)
    }



    $$('#btn').onclick = async function () {
        // $$('#validateBox').style.visibility = 'visible'
        setLogin()
    }


    function setLogin() {
        let username = $$('#username').value
        let password = $$('#password').value

        let data = `username=${username}&password=${password}`
        // const res = await axios.post('login/dl',data)
        let xhr = new XMLHttpRequest()
        xhr.open('post', 'http://127.0.0.1:3000/login/dl')
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
        xhr.send(data)
        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                // console.log(this.response)
                let data = JSON.parse(this.response)
                console.log(data)
                if (data == 0) {
                    window.location.href = '/pro'
                } else {
                    window.alert('服务器忙，请稍后重试')
                    location.reload();
                }
            }
        }
    }
})()