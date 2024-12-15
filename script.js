// 移动端检测
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// 统一的弹窗处理
document.addEventListener('DOMContentLoaded', function() {
    // 微信按钮
    const weixinBtn = document.getElementById('weixinBtn');
    const weixinModal = document.getElementById('weixinModal');
    const closeWeixinBtn = weixinModal.querySelector('.close');
    
    // 抖音按钮
    const douyinBtn = document.getElementById('douyinBtn');
    const douyinModal = document.getElementById('douyinModal');
    const closeDouyinBtn = douyinModal.querySelector('.close');
    
    // 点击按钮显示对应的弹窗
    weixinBtn.onclick = function(e) {
        e.preventDefault();
        weixinModal.style.display = 'flex';
    }
    
    douyinBtn.onclick = function(e) {
        e.preventDefault();
        douyinModal.style.display = 'flex';
    }
    
    // 点击关闭按钮关闭对应的弹窗
    closeWeixinBtn.onclick = function() {
        weixinModal.style.display = 'none';
    }
    
    closeDouyinBtn.onclick = function() {
        douyinModal.style.display = 'none';
    }
    
    // 统一处理点击空白区域关闭弹窗
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    }
});

// 添加图片加载处理
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
            // 移除加载动画
            const container = this.closest('.swiper-slide, .main-image, .qr-item');
            if (container) {
                container.classList.add('loaded');
            }
        });
        
        // 如果图片已经缓存，立即添加 loaded 类
        if (img.complete) {
            img.classList.add('loaded');
            const container = img.closest('.swiper-slide, .main-image, .qr-item');
            if (container) {
                container.classList.add('loaded');
            }
        }
    });
});

// 生日倒计时功能
function updateBirthdayCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const birthday = new Date(currentYear, 11, 21); // 12月21日
    const startYear = 2024; // 修改为2024年，对应19岁
    const age = currentYear - startYear + 19; // 计算当前年龄
    
    // 获取倒计时显示元素
    const countdownElement = document.getElementById('countdown');
    
    // 检查是否是生日当天
    if (now.getMonth() === birthday.getMonth() && now.getDate() === birthday.getDate()) {
        // 生日当天显示年龄祝福语
        countdownElement.innerHTML = `
            <div class="birthday-message">
                <i class="fas fa-star"></i>
                <div class="birthday-text">${age}<span class="dot">·</span>快乐</div>
            </div>
        `;
        countdownElement.classList.add('birthday-wish');
    } else {
        // 如果今年的生日已经过了，就计算到明年的生日
        if (now > birthday) {
            birthday.setFullYear(currentYear + 1);
        }
        
        const diff = birthday - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        countdownElement.innerHTML = `
            <span>${days}<span class="time-unit">天</span></span>
            <span>${hours}<span class="time-unit">时</span></span>
            <span>${minutes}<span class="time-unit">分</span></span>
            <span>${seconds}<span class="time-unit">秒</span></span>
        `;
    }
}

// 页面加载完成后启动倒计时
document.addEventListener('DOMContentLoaded', function() {
    updateBirthdayCountdown(); // 立即执行一次
    setInterval(updateBirthdayCountdown, 1000); // 每秒更新一次
});

// 添加节假日数据
const holidays = {
    '1-1': '元旦',
    '2-14': '情人节',
    '3-8': '妇女节',
    '4-1': '愚人节',
    '5-1': '劳动节',
    '6-1': '儿童节',
    '8-1': '建军节',
    '9-10': '教师节',
    '10-1': '国庆节',
    '12-21': '生日',
    '12-25': '圣诞节'
};

// 修改日历更新函数
function updateCalendar() {
    const now = new Date();
    const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    
    // 更新月份和份
    document.getElementById('calendar-month-year').textContent = 
        `${months[now.getMonth()]} ${now.getFullYear()}`;
    
    // 获取当月的天数
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    
    // 生成日期网格
    const daysGrid = document.querySelector('.calendar-days-grid');
    daysGrid.innerHTML = ''; // 清空现有内容
    
    // 添加所有日期
    for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        // 检查是否是当前日期
        if (i === now.getDate()) {
            dayElement.className += ' current';
        }
        
        // 检查是否是节假日
        const holidayKey = `${now.getMonth() + 1}-${i}`;
        if (holidays[holidayKey]) {
            dayElement.className += ' holiday';
            dayElement.setAttribute('title', holidays[holidayKey]);
        }
        
        dayElement.textContent = i;
        daysGrid.appendChild(dayElement);
    }
}

// 页面加载完成后启动日历
document.addEventListener('DOMContentLoaded', function() {
    updateCalendar(); // 立即执行一次
    setInterval(updateCalendar, 1000); // 每秒更新一次
});

// 更多按钮点击事件
document.addEventListener('DOMContentLoaded', function() {
    const moreBtn = document.getElementById('moreBtn');
    const moreModal = document.getElementById('moreModal');
    const closeMoreBtn = moreModal.querySelector('.close');
    
    // 点击更多按钮显示弹窗
    moreBtn.onclick = function() {
        moreModal.style.display = 'flex';
    }
    
    // 点击关闭按钮关闭弹窗
    closeMoreBtn.onclick = function() {
        moreModal.style.display = 'none';
    }
    
    // 点击弹窗外关闭
    window.onclick = function(event) {
        if (event.target == moreModal) {
            moreModal.style.display = 'none';
        }
    }
});

// 加载更多按钮点击事件
document.addEventListener('DOMContentLoaded', function() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const loadMoreModal = document.getElementById('loadMoreModal');
    const closeLoadMoreBtn = loadMoreModal.querySelector('.close');
    
    // 点击加载更多按钮显示弹窗
    loadMoreBtn.onclick = function() {
        loadMoreModal.style.display = 'flex';
    }
    
    // 点击关闭按钮关闭弹窗
    closeLoadMoreBtn.onclick = function() {
        loadMoreModal.style.display = 'none';
    }
    
    // 点击弹窗外部关闭
    window.onclick = function(event) {
        if (event.target == loadMoreModal) {
            loadMoreModal.style.display = 'none';
        }
    }
});

// 小黄按钮点击事件
document.addEventListener('DOMContentLoaded', function() {
    const yellowBtn = document.getElementById('yellowBtn');
    const yellowPasswordModal = document.getElementById('yellowPasswordModal');
    const yellowModal = document.getElementById('yellowModal');
    const closePasswordBtn = yellowPasswordModal.querySelector('.close');
    const closeYellowBtn = yellowModal.querySelector('.close');
    const yellowPassword = document.getElementById('yellowPassword');
    const yellowSubmit = document.getElementById('yellowSubmit');
    const yellowError = document.getElementById('yellowError');
    
    const correctPassword = '060820'; // 设置正确的密码
    
    // 点击小黄显示密码输入弹窗
    yellowBtn.onclick = function() {
        yellowPasswordModal.style.display = 'flex';
        yellowPassword.value = ''; // 清空密码输入框
        yellowError.textContent = ''; // 清空错误信息
    }
    
    // 点击确认按钮验证密码
    yellowSubmit.onclick = function() {
        if (yellowPassword.value === correctPassword) {
            yellowPasswordModal.style.display = 'none';
            yellowModal.style.display = 'flex';
        } else {
            yellowError.textContent = '密码错误，请重试';
            yellowPassword.value = '';
        }
    }
    
    // 密码输入框回车事件
    yellowPassword.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            yellowSubmit.click();
        }
    });
    
    // 点击关闭按钮关闭弹窗
    closePasswordBtn.onclick = function() {
        yellowPasswordModal.style.display = 'none';
    }
    
    closeYellowBtn.onclick = function() {
        yellowModal.style.display = 'none';
    }
    
    // 点击弹窗外部关闭
    window.onclick = function(event) {
        if (event.target == yellowPasswordModal) {
            yellowPasswordModal.style.display = 'none';
        }
        if (event.target == yellowModal) {
            yellowModal.style.display = 'none';
        }
    }
});

// 小蓝按钮点击事件
document.addEventListener('DOMContentLoaded', function() {
    const blueBtn = document.getElementById('blueBtn');
    const bluePasswordModal = document.getElementById('bluePasswordModal');
    const blueModal = document.getElementById('blueModal');
    const closePasswordBtn = bluePasswordModal.querySelector('.close');
    const closeBlueBtn = blueModal.querySelector('.close');
    const bluePassword = document.getElementById('bluePassword');
    const blueSubmit = document.getElementById('blueSubmit');
    const blueError = document.getElementById('blueError');
    
    const correctPassword = '040620'; // 修改密码为040620
    
    // 点击小蓝显示密码输入弹窗
    blueBtn.onclick = function() {
        bluePasswordModal.style.display = 'flex';
        bluePassword.value = ''; // 清空密码输入框
        blueError.textContent = ''; // 清空错误信息
    }
    
    // 点击确认按钮验证密码
    blueSubmit.onclick = function() {
        if (bluePassword.value === correctPassword) {
            bluePasswordModal.style.display = 'none';
            blueModal.style.display = 'flex';
        } else {
            blueError.textContent = '密码错误，请重试';
            bluePassword.value = '';
        }
    }
    
    // 密码输入框回车事件
    bluePassword.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            blueSubmit.click();
        }
    });
    
    // 点击关闭按钮关闭弹窗
    closePasswordBtn.onclick = function() {
        bluePasswordModal.style.display = 'none';
    }
    
    closeBlueBtn.onclick = function() {
        blueModal.style.display = 'none';
    }
    
    // 点击弹窗外部关闭
    window.onclick = function(event) {
        if (event.target == bluePasswordModal) {
            bluePasswordModal.style.display = 'none';
        }
        if (event.target == blueModal) {
            blueModal.style.display = 'none';
        }
    }
});

// 小黑按钮点击事件
document.addEventListener('DOMContentLoaded', function() {
    const blackBtn = document.getElementById('blackBtn');
    const blackPasswordModal = document.getElementById('blackPasswordModal');
    const blackModal = document.getElementById('blackModal');
    const closePasswordBtn = blackPasswordModal.querySelector('.close');
    const closeBlackBtn = blackModal.querySelector('.close');
    const blackPassword = document.getElementById('blackPassword');
    const blackSubmit = document.getElementById('blackSubmit');
    const blackError = document.getElementById('blackError');
    
    const correctPassword = '051012'; // 设置正确的密码
    
    // 点击小黑显示密码输入弹窗
    blackBtn.onclick = function() {
        blackPasswordModal.style.display = 'flex';
        blackPassword.value = ''; // 清空密码输入框
        blackError.textContent = ''; // 清空错误信息
    }
    
    // 点击确认按钮验证密码
    blackSubmit.onclick = function() {
        if (blackPassword.value === correctPassword) {
            blackPasswordModal.style.display = 'none';
            blackModal.style.display = 'flex';
        } else {
            blackError.textContent = '密码错误，���重试';
            blackPassword.value = '';
        }
    }
    
    // 密码输入框回车事件
    blackPassword.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            blackSubmit.click();
        }
    });
    
    // 点击关闭按钮关闭弹窗
    closePasswordBtn.onclick = function() {
        blackPasswordModal.style.display = 'none';
    }
    
    closeBlackBtn.onclick = function() {
        blackModal.style.display = 'none';
    }
    
    // 点击弹窗外部关闭
    window.onclick = function(event) {
        if (event.target == blackPasswordModal) {
            blackPasswordModal.style.display = 'none';
        }
        if (event.target == blackModal) {
            blackModal.style.display = 'none';
        }
    }
});

// 优化图片加载
document.addEventListener('DOMContentLoaded', function() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });

    // 优先加载可视区域的图片
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        if (img.getBoundingClientRect().top < window.innerHeight) {
            imageObserver.observe(img);
        } else {
            requestIdleCallback(() => {
                imageObserver.observe(img);
            });
        }
    });
});

// 添加图片加载错误处理
document.querySelectorAll('img').forEach(img => {
    img.onerror = function() {
        // 加载失败时显示占位图
        this.src = 'images/placeholder.jpg';
        this.classList.add('error');
    };
});

// 作者图片点击事件
document.addEventListener('DOMContentLoaded', function() {
    const aboutLink = document.querySelector('a[href="#about"]');
    const aboutModal = document.getElementById('aboutModal');
    const closeAboutBtn = aboutModal.querySelector('.close');
    
    // 点击"关于"链接时显示弹窗
    aboutLink.onclick = function(e) {
        e.preventDefault();  // 阻止默认的滚动行为
        aboutModal.style.display = 'flex';
    }
    
    // 点击关闭按钮关闭弹窗
    closeAboutBtn.onclick = function() {
        aboutModal.style.display = 'none';
    }
    
    // 点击弹窗外部关闭
    window.onclick = function(event) {
        if (event.target == aboutModal) {
            aboutModal.style.display = 'none';
        }
    }
});

// 更新加载进
function updateLoadingText(percent) {
    const loadingText = document.querySelector('.loading-text');
    if (loadingText) {
        loadingText.textContent = `${Math.round(percent)}%`;
    }
}

// 监听图片加载
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    let loadedImages = 0;
    const totalImages = images.length;

    function imageLoaded() {
        loadedImages++;
        const progress = (loadedImages / totalImages) * 100;
        updateLoadingText(progress);
    }

    images.forEach(img => {
        if (img.complete) {
            imageLoaded();
        } else {
            img.addEventListener('load', imageLoaded);
            img.addEventListener('error', imageLoaded);
        }
    });

    // 确保最终显示100%
    setTimeout(() => {
        updateLoadingText(100);
    }, 3000);
});

// Hello点击事件
document.addEventListener('DOMContentLoaded', function() {
    const helloText = document.querySelector('.hello-text');
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content welcome-message">
            <span class="close">&times;</span>
            <p>欢迎来到作的世界，一个能够让你放松的网页</p>
        </div>
    `;
    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('.close');
    
    // 点击Hello显示欢迎文本
    helloText.onclick = function() {
        modal.style.display = 'flex';
    }
    
    // 点击关闭按钮关闭弹窗
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }
    
    // 点击弹窗外部关闭
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
});

// QQ按钮点击事件
document.addEventListener('DOMContentLoaded', function() {
    const qqBtn = document.getElementById('qqBtn');
    const qqModal = document.getElementById('qqModal');
    const closeQqBtn = qqModal.querySelector('.close');
    
    // 点击QQ图标显示弹窗
    qqBtn.onclick = function(e) {
        e.preventDefault();
        qqModal.style.display = 'flex';
    }
    
    // 点击关闭按钮关闭弹窗
    closeQqBtn.onclick = function() {
        qqModal.style.display = 'none';
    }
    
    // 点击弹窗外部关闭
    window.onclick = function(event) {
        if (event.target == qqModal) {
            qqModal.style.display = 'none';
        }
    }
});
 