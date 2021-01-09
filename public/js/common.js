baseUrl = 'http://127.0.0.1:3000/'
let axios = {
    get(url, dataT) {
        return this.publicFn('get', url, dataT)
    },
    post(url, data, dataT) {
        return this.publicFn('post', url, data, dataT)
    },
    put(url, data, dataT) {
        return this.publicFn('put', url, data, dataT)
    },
    delete(url, dataT) {
        return this.publicFn('delete', url, dataT)
    },
    publicFn(type, url, data = '', dataT = 'json') {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open(type, url);
            (type == 'post' || type == 'put') && xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
            xhr.send(data && data);
            xhr.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        dataT = dataT ? JSON.parse(this.response) : this.response
                        resolve(dataT)
                    } else {
                        reject('一个简单的ajax都写错,读鬼书')
                    }
                }
            }
        })
    }
}

function $$(docu) {
    return document.querySelector(docu);
}

function $All(docu) {
    return document.querySelectorAll(docu);
}