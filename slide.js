// 定义数组常量存储图片路径，注意图片的后缀！！！
const images = ['./image/轮播1.png', './image/轮播2.png', './image/轮播3.png'];
const links = ['./subpage1.html', './subpage3.html', './subpage2.html'];
// 当前被选中的图片
let imgNow = 0;
// 存储定时器任务标识符
let t;

// 动态创建小圆点，同时添加监听器，最后添加到小圆点容器中
let dotContainer = document.getElementById("dot-container"); // 通过id获取存放小圆点的容器
// 根据数组images的长度获取图片张数，并动态创建小圆点，同时为小圆点添加事件监听器
for(let i=0; i<images.length; i++) {
    let dot = document.createElement("span");   // 创建小圆点
    dot.className = "dot";  // 为创建的小圆点设置类名
    dot.id = "dot"+i;       // 为创建的小圆点设置id
    // 给小圆点添加监听事件
    dot.addEventListener("click", function() {
        // 先清除之前的定时器
        clearTimeout(t);
        dotID = this.getAttribute("id");    // 获取当前小圆点的id
        imgNow = Number(dotID.replace("dot", ""));  // 取出id里的数字
        document.getElementById("img-show").src = images[imgNow];   // 显示指定的图片
        document.getElementById("img-link").href = links[imgNow];
        // 将所有小圆点的样式设置成默认
        for(let i=0; i<dots.length; i++) {
            dots[i].className = "dot";
        }
        // 再将当前被选中的小圆点颜色变为灰色, 这里通过给它添加两个类实现
        this.className = "dot selected";
        // 设置定时器，两秒后再切换下一张
        t = setTimeout( ()=>{ timer(); }, 1000*2);
    });
    // 将创建的小圆点添加到小圆点容器中
    dotContainer.appendChild(dot);
}
// 页面加载后，让第一张图片的小圆点颜色变灰
let defaultDot = document.getElementById("dot0").className = "dot selected";

// 小圆点创建完后，我们需要先通过类名获取所有小圆点，页面加载之后会用到
let dots = document.getElementsByClassName("dot");

// 接下来让图片自动切换
t = setTimeout( ()=>{ 
    timer(); // 调用这个函数形成定时器死循环，模拟出每隔两秒切换一次的效果
}, 1000*2);

// 鼠标移入移出图片事件
document.getElementById("img-show").addEventListener("mouseover", function() { 
    clearTimeout(t);    // 鼠标移入时取消定时器
});
document.getElementById("img-show").addEventListener("mouseout", function() { 
    t = setTimeout( ()=>{ timer(); }, 1000*2); // 鼠标移出时重新添加计时器
});

// 前后切换按钮
let previous = document.getElementById("to-pre");
previous.addEventListener("click", function() { 
    clearTimeout(t);    // 先清除定时器
    changeImage(true);  // true 向前切换图片
    t = setTimeout( ()=>{ timer(); }, 1000*2);    // 重新创建一个定时器
});
let next = document.getElementById("to-next");
next.addEventListener("click", function() { 
    clearTimeout(t);
    changeImage(false); 
    t = setTimeout( ()=>{ timer(); }, 1000*2);
});

// 定时器死循环
function timer() {
    changeImage(false); // 调用图片切换函数
    // 图片切换后重新设置一个定时器
    t = setTimeout( ()=>{ timer(); }, 1000*2);
}

// 图片切换函数，传入布尔值，true:前一张， false:后一张
function changeImage(direction) {
    // 先通过循环让所有小圆点样式恢复初始值（白色）
    for(let i=0; i<dots.length; i++) {
        dots[i].className = "dot";
    }
    // 判断是向前切换还是向后切换
    if(direction) {
        if(imgNow == 0) {
            // 如果是第一张继续向前切换，则切换到最后一张形成循环
            imgNow = images.length-1;
        } else {
            imgNow -= 1;
        }
        // 切换图片
        document.getElementById("img-show").src = images[imgNow]; 
        document.getElementById("img-link").href = links[imgNow];
        // 将当前图片的小圆点变灰
        dots[imgNow].className = "dot selected";
    } else {
        if(imgNow == images.length-1) {
            // 如果是最后一张继续向后切换，则切换到第一张形成循环
            imgNow = 0;
        } else {
            imgNow += 1;
        }
        document.getElementById("img-show").src = images[imgNow];
        document.getElementById("img-link").href = links[imgNow];
        dots[imgNow].className = "dot selected";
    }
}