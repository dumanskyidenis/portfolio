function toggleReadMore() {
    const wrapper = document.getElementById('more-text-wrapper');
    const btn = document.getElementById('read-more-btn');
    const card = wrapper.closest('.about-card'); // Находим саму карточку
    
    // Переключаем классы
    wrapper.classList.toggle('expanded');
    card.classList.toggle('expanded-card'); // Даем сигнал CSS увеличить роспись
    
    // Меняем текст кнопки
    if (wrapper.classList.contains('expanded')) {
        btn.innerHTML = 'READ LESS ↑';
    } else {
        btn.innerHTML = 'READ MORE ↓';
    }
}

/* =========================================
   ЛОГИКА БОКОВОГО МЕНЮ (SIDEBAR)
========================================= */
const menuBtn = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebar-overlay');
const sidebarLinks = document.querySelectorAll('.sidebar-link');

// Функция открытия/закрытия меню
function toggleSidebar() {
    menuBtn.classList.toggle('active');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
}

// Клик по гамбургеру
menuBtn.addEventListener('click', toggleSidebar);

// Клик по темному фону (закрывает меню)
overlay.addEventListener('click', toggleSidebar);

// Закрывать меню автоматически при клике на любую вкладку (якорь)
sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (sidebar.classList.contains('open')) {
            toggleSidebar();
        }
    });
});

/* =========================================
   ЖИВОЙ ТАЙМКОД (АНИМАЦИЯ REC)
========================================= */
/* =========================================
   ЖИВОЙ ТАЙМКОД (АНИМАЦИЯ REC) - 60 FPS
========================================= */
const timecodeElement = document.querySelector('.camera-timecode .numbers');

// Запоминаем время, когда пользователь зашел на сайт
const startTime = Date.now();

function updateTimecode() {
    if (!timecodeElement) return;

    // Считаем, сколько миллисекунд прошло с момента загрузки
    const elapsed = Date.now() - startTime;

    // Переводим миллисекунды в часы, минуты и секунды
    const totalSeconds = Math.floor(elapsed / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Меняем 24 кадра на 60 кадров в секунду (60 FPS)
    // Теперь счетчик доходит до 59, и ровно на 60 добавляется секунда
    const frames = Math.floor((elapsed % 1000) / (1000 / 60));

    // Добавляем нули спереди (чтобы было 01, а не 1)
    const h = String(hours).padStart(2, '0');
    const m = String(minutes).padStart(2, '0');
    const s = String(seconds).padStart(2, '0');
    const f = String(frames).padStart(2, '0');

    // Обновляем цифры на сайте
    timecodeElement.textContent = `${h}:${m}:${s}:${f}`;

    // Запускаем функцию бесконечно с частотой обновления экрана
    requestAnimationFrame(updateTimecode);
}

// Запускаем таймер
updateTimecode();

/* =========================================
   АНИМАЦИЯ СЧЕТЧИКОВ (СТАТИСТИКА)
========================================= */
const counters = document.querySelectorAll('.counter');
const statsSection = document.querySelector('.stats');

function animateCounters() {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        
        // Задаем общее время анимации для всех цифр (например, 1.2 секунды)
        // Чтобы и 18, и 2 заканчивали считаться примерно одновременно
        const duration = 1200; 
        const interval = duration / target;

        const counterInterval = setInterval(() => {
            count += 1;
            counter.textContent = count;
            
            // Когда досчитали до нужной цифры — останавливаем таймер
            if (count >= target) {
                clearInterval(counterInterval);
                counter.textContent = target; // Жестко фиксируем финальную цифру
            }
        }, interval);
    });
}

// Используем IntersectionObserver, чтобы запустить цифры ТОЛЬКО когда блок появится на экране
if (statsSection) {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ждем 700мс (пока блок плавно выплывет снизу благодаря CSS анимации fadeUp),
                // а затем запускаем счетчик
                setTimeout(animateCounters, 700); 
                
                // Отключаем слежку, чтобы анимация сработала только один раз
                obs.unobserve(entry.target); 
            }
        });
    }, { 
        threshold: 0.5 // Код сработает, когда блок статистики будет виден хотя бы наполовину
    });

    observer.observe(statsSection);
}

/* =========================================
   АНИМАЦИЯ ПОЯВЛЕНИЯ ФУТЕРА ПРИ СКРОЛЛЕ
========================================= */
/* =========================================
   АНИМАЦИЯ ПОЯВЛЕНИЯ ФУТЕРА ПРИ СКРОЛЛЕ
========================================= */
const footer = document.querySelector('.site-footer');

if (footer) {
    const footerObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Как только футер показывается на экране, добавляем класс
                entry.target.classList.add('visible');
                // Прекращаем слежку (анимация проиграется только один раз)
                obs.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.2 // Срабатывает, когда мы доскроллили до 20% футера
    });

    footerObserver.observe(footer);
}

/* =========================================
   ЛОГИКА ВКЛАДОК (WORKS: VIDEOS & REELS)
========================================= */
const tabBtnsWorks = document.querySelectorAll('.tab-btn');
const tabContentsWorks = document.querySelectorAll('.works-tab-content');

tabBtnsWorks.forEach(btn => {
    btn.addEventListener('click', () => {
        // Убираем подсветку со всех кнопок и скрываем весь контент
        tabBtnsWorks.forEach(b => b.classList.remove('active'));
        tabContentsWorks.forEach(c => c.classList.remove('active'));
        
        // Добавляем подсветку нажатой кнопке
        btn.classList.add('active');
        
        // Показываем нужный блок по ID (из атрибута data-tab)
        const targetId = btn.getAttribute('data-tab');
        document.getElementById(targetId).classList.add('active');
    });
});