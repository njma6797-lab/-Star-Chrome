const goBtn = document.getElementById('goBtn');
const skipBtn = document.getElementById('skipBtn');
const modal = document.getElementById('modal');
const iframe = document.getElementById('browserFrame');
const urlInput = document.querySelector('.url-input');

let urlToOpen = "";

// عند الضغط على "دخول" يظهر الإشعار
goBtn.addEventListener('click', () => {
  let url = urlInput.value.trim();
  if (!url) return alert('من فضلك ادخل رابط الموقع');
  if (!url.startsWith('http')) url = 'https://' + url;
  urlToOpen = url;
  modal.style.display = 'flex';
});

// عند الضغط على "تخطي" يفتح الموقع داخل iframe
skipBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  iframe.src = urlToOpen;
  iframe.style.display = 'block';
});

/*------------- نجوم متحركة في الخلفية -------------*/
const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
const starCount = 150;

// إنشاء النجوم
for(let i=0; i<starCount; i++){
  stars.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    radius: Math.random()*2 + 1,
    alpha: Math.random(),
    dx: (Math.random()-0.5)*0.2,
    dy: (Math.random()-0.5)*0.2
  });
}

// رسم وتحريك النجوم
function animateStars(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI*2);
    ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
    ctx.shadowBlur = 10;
    ctx.shadowColor = "white";
    ctx.fill();
    
    star.x += star.dx;
    star.y += star.dy;

    // إعادة النجوم عند الخروج من الشاشة
    if(star.x<0) star.x = canvas.width;
    if(star.x>canvas.width) star.x = 0;
    if(star.y<0) star.y = canvas.height;
    if(star.y>canvas.height) star.y = 0;
  });
  requestAnimationFrame(animateStars);
}
animateStars();

// تحديث حجم canvas عند تغيير حجم النافذة
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
