var webpageW = document.documentElement.scrollWidth || document.body.scrollWidth;
var webpageH = document.documentElement.scrollHeight - 100 || document.body.scrollHeight - 100;
var box = document.getElementsByClassName('show')[0];


let url = '';
let dataSource = {};//声明全局变量，使axios到的数据可在全局使用。
let arr_list = []
let animated_show;


function start() {

    axios.post(url).then(res => {
        dataSource = res.data.data
        arr_list = [];
        for (let i = 0; i < dataSource.length; i++) {
            arr_list.push(dataSource[i].article)
        }
        animated_show = setInterval(() => {
            for (let i = 0; i < 3; i++) {
                let ran = Math.floor(Math.random() * arr_list.length)
                let x = Math.round(Math.random() * webpageW + 1)
                let y = Math.round(Math.random() * webpageH + 1)
                let ran_time = Math.round(Math.random() * 5000 + 2000);
                let art = arr_list[ran];
                let ran_showtime = Math.round(Math.random() * 6000 + 3000);
                ((ran_time, art, ran_showtime) => {
                    let show_div = document.createElement('div');
                    show_div.style.opacity = '0'
                    box.appendChild(show_div);
                    show_div.innerHTML = art;
                    setTimeout(() => {
                        show_div.className = 'opa';
                        show_div.style.left = x + 'px';
                        show_div.style.top = y + 'px';
                        setTimeout(() => {
                            show_div.className = 'hidden';
                        }, ran_showtime)
                    }, ran_time)
                })(ran_time, art, ran_showtime)
            }
            if (box.childNodes.length > 20) {
                for (let i = 0; i < 5; i++) {
                    box.removeChild(box.childNodes[i])
                }
            }
        }, 10000)
    }).catch(error => {
        console.log(error)
    })
}
start()
let result = {};
//实际使用 
document.onkeydown = function (e) {  //对整个页面文档监听 
    let keyNum = window.event ? e.keyCode : e.which;  //获取被按下的键值 


    if (keyNum == 13) {
        for (let i = 0; i < box.childNodes.length; i++) {
            box.removeChild(box.childNodes[i])
        }
        let post_url = '';
        let art = document.getElementById('article').value;
        document.getElementById('article').value = '';
        let x = Math.round(Math.random() * webpageW + 1)
        let y = Math.round(Math.random() * webpageH + 1)
        let show_div = document.createElement('div');
        show_div.style.opacity = '0'
        box.appendChild(show_div);
        show_div.innerHTML = art;
        show_div.className = 'opa';
        show_div.style.left = x + 'px';
        show_div.style.top = y + 'px';
        setTimeout(() => {
            show_div.className = 'hidden';
        }, 5000)
        let data = { data: art }
        axios.post(post_url, data).then(res => {
            result = res.data;
            clearInterval(animated_show);
            start()

        }).catch(error => {
            console.log(error)
        })
    }
}
function mouseCoords(ev) {
    if (ev.PageX && ev.PageY) {
        return {
            x: ev.PageX,
            y: ev.PageY
        }
    }
    //做兼容
    d = document.documentElement || document.body;
    return {
        x: ev.clientX + d.scrollLeft - d.clientLeft,
        y: ev.clientY + d.scrollTop - d.clientTop
    }
}
let mousePos = {}
window.addEventListener("click", function (e) {
    if (e.target.tagName == 'BODY') {
        e = e || window.event;
        let random_num = Math.floor(Math.random() * arr_list.length)
        mousePos = mouseCoords(e);
        let show_div = document.createElement('div');
        show_div.style.opacity = '0'
        box.appendChild(show_div);
        show_div.innerHTML = arr_list[random_num];
        show_div.className = 'opa';
        show_div.style.left = mousePos.x + 'px';
        show_div.style.top = mousePos.y + 'px';
        setTimeout(() => {
            show_div.className = 'hidden';
        }, 4000)
    }
});
let x = Math.round(Math.random() * webpageW + 1)
let y = Math.round(Math.random() * webpageH + 1)
let show_div = document.createElement('div');
show_div.style.opacity = '0'
box.appendChild(show_div);
show_div.innerHTML = '稍等一会嗷';
show_div.className = 'opa';
show_div.style.left = x + 'px';
show_div.style.top = y + 'px';
setTimeout(() => {
    show_div.className = 'hidden';
}, 4000)



