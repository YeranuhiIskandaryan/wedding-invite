const circle = document.getElementById('circle');
const circle2 = document.getElementById('circle2');
const secOne = document.getElementById('secOne');
let isDragging = false;
let startX = 0;


function handleDragMove(e) {
    const currentX = e.clientX || e.touches[0].clientX;
    const newLeft = Math.min(Math.max(currentX - startX, 0), window.innerWidth - circle.offsetWidth);
    circle.style.left = newLeft + 'px';

    const circleRightEdge = newLeft + circle.offsetWidth;
    const circle2LeftEdge = circle2.offsetLeft;

    if (circleRightEdge >= circle2LeftEdge) {
        secOne.classList.add('active');
    }
}

circle.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isDragging = true;
    startX = e.clientX - circle.offsetLeft;
    window.addEventListener('mousemove', handleDragMove);
});

window.addEventListener('mouseup', () => {
    isDragging = false;
    window.removeEventListener('mousemove', handleDragMove);
});

circle.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX - circle.offsetLeft;
    window.addEventListener('touchmove', handleDragMove);
});

window.addEventListener('touchend', () => {
    isDragging = false;
    window.removeEventListener('touchmove', handleDragMove);
});



// Տարեթիվը, մինչև որը պետք է հաշվի առնել մնացած ժամանակը
const targetDate = new Date("February 25, 2025 00:00:00").getTime();

const countdownElement = document.getElementById('countdown');

// Ֆունկցիա, որը հաշվարկում է մնացած ժամանակը
function updateCountdown() {
    const now = new Date().getTime();
    const remainingTime = targetDate - now;

    // Կանխատեսել օրերը, ժամերը, րոպեները և վայրկյանները
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    // Նշանակել հաշվարկը HTML-ում
    countdownElement.innerHTML = `<div>${days} <br/> օր</div>:<div>${hours}<br/> ժամ</div>:<div>${minutes}<br/>  րոպե</div>:<div>${seconds} <br/> վայրկյան</div> `;

    // Երբ ժամանակը ավարտվում է
    if (remainingTime < 0) {
        clearInterval(countdownInterval);  // Դադարեցնում ենք հաշվելու ընթացիկ միջնադիրը
        countdownElement.innerHTML = "Հարսանիքը արդեն տեղի է ունեցել!";
    }
}

// Դրա համար պետք է մի անգամվա միջմիջօրեական տևողություն
const countdownInterval = setInterval(updateCountdown, 1000);


// Գրանցում ենք scroll իրադարձություն, որպեսզի հետևենք, երբ sectionTwoCenter դիվը տեսանելի է դառնում
window.addEventListener('scroll', function () {
    const sectionTwoCenter = document.querySelector('.sectionTwoCenter');

    // Ստուգում ենք, եթե sectionTwoCenter դիվը տեսանելի է էկրանին
    const sectionPosition = sectionTwoCenter.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // Երբ sectionTwoCenter-ի վրա մնացած տարածությունը ներառում է 80% պատուհանից, սկսում ենք անիմացիան
    if (sectionPosition <= windowHeight * 0.8) { // 80%-ում դիվը տեսանելի կլինի
        sectionTwoCenter.classList.add('visible');
    } else {
        sectionTwoCenter.classList.remove('visible'); // Եթե դուրս է գալիս տեսադաշտից՝ վերադառնալ դեպի սկզբնական վիճակ
    }
});

// Գրանցում ենք page load իրադարձություն՝ չհաղթահարելու առաջվա անիմացիան:
document.addEventListener('DOMContentLoaded', function () {
    const sectionTwoCenter = document.querySelector('.sectionTwoCenter');

    // Ստուգում ենք, եթե sectionTwoCenter արդեն ցույց է տալիս պատուհանից առաջ
    const sectionPosition = sectionTwoCenter.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionPosition <= windowHeight * 0.8) { // Եթե այն արդեն երևում է, ապա ավելացնում ենք visible
        sectionTwoCenter.classList.add('visible');
    }
});

window.addEventListener('scroll', function () {
    const imageTwo = document.querySelector('.imageTwo');

    // Ստուգում ենք, եթե imageTwo տարրը տեսանելի է էկրանին
    const imagePosition = imageTwo.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (imagePosition <= windowHeight * 0.8) { // 80%-ում տարրը տեսանելի կլինի
        imageTwo.style.transition = 'opacity 3s, transform 2s'; // Տևողությունը սահմանվում է 2 վայրկյան
        imageTwo.style.opacity = '1'; // Թափանցիկից մգանալ
        imageTwo.style.transform = 'rotate(-10deg)'; // Կրճված ռոտացիա
    } else {
        imageTwo.style.opacity = '0'; // Եթե դուրս է գալիս տեսադաշտից՝ վերադառնալ սկզբնական վիճակին
        imageTwo.style.transform = 'rotate(0deg)'; // Վերադառնալ սկզբնական ռոտացիային
    }
});

window.addEventListener('DOMContentLoaded', function () {
    const imageTwo = document.querySelector('.imageTwo');
    imageTwo.style.opacity = '0'; // Թաքնված է սկզբում
    imageTwo.style.transform = 'rotate(-50deg)'; // Սկզբնական դիրքը
});



document.addEventListener('DOMContentLoaded', function () {
    const secOne = document.getElementById('secOne');
    const body = document.body;

    body.style.overflow = 'hidden';

    document.getElementById('circle').addEventListener('mouseup', function () {
        if (secOne.classList.contains('active')) {
            body.style.overflow = 'auto';
        }
    });

    document.getElementById('circle').addEventListener('touchend', function () {
        if (secOne.classList.contains('active')) {
            body.style.overflow = 'auto';
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const secOne = document.getElementById("secOne");
    const circle = document.getElementById("circle");
    const circle2 = document.getElementById("circle2");

    let isDragging = false;
    let startX = 0;

    function handleDragMove(e) {
        const currentX = e.clientX || e.touches[0]?.clientX;

        // ✅ `circle2`-ի սահմանը՝ `margin`-ով թույլ տալով մի փոքր շարժվել
        const maxRight = circle2.offsetLeft - circle.offsetWidth + 35; // +10՝ թույլ է տալիս մի քիչ անցնել
        let newLeft = Math.min(Math.max(currentX - startX, 0), maxRight);

        // 🔹 Եթե `circle`-ը շատ մոտ է `circle2`-ին, ապա այն կանգնում է
        if (newLeft >= maxRight - 5) { // Թույլ ենք տալիս մի փոքր ավելի մոտենալ
            newLeft = maxRight;
            secOne.classList.add("active");
            body.style.overflow = "auto"; // Միացնում ենք scroll-ը
            console.log("✅ secOne became active!");
        }

        circle.style.left = newLeft + "px"; // Թարմացնում ենք դիրքը
    }

    // 🖱️ Մկնիկի իրադարձություններ (Desktop)
    circle.addEventListener("mousedown", (e) => {
        e.preventDefault();
        isDragging = true;
        startX = e.clientX - circle.offsetLeft;
        window.addEventListener("mousemove", handleDragMove);
    });

    window.addEventListener("mouseup", () => {
        isDragging = false;
        window.removeEventListener("mousemove", handleDragMove);
    });

    // 📱 Touch իրադարձություններ (Mobile)
    circle.addEventListener("touchstart", (e) => {
        isDragging = true;
        startX = e.touches[0].clientX - circle.offsetLeft;
        window.addEventListener("touchmove", handleDragMove);
    });

    window.addEventListener("touchend", () => {
        isDragging = false;
        window.removeEventListener("touchmove");
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("background-music");

    function playAudio() {
        audio.play().catch(error => {
            console.log("⚠️ Երաժշտության նվագարկումը չհաջողվեց:", error);
        });
        document.removeEventListener("click", playAudio);
        document.removeEventListener("touchstart", playAudio);
    }

    // Երաժշտությունը կսկսվի, երբ օգտատերը կտտացնի կամ կպնի էկրանին
    document.addEventListener("click", playAudio);
    document.addEventListener("touchstart", playAudio);
});
