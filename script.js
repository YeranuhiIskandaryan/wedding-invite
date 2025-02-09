document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const secOne = document.getElementById("secOne");
    const circle = document.getElementById("circle");
    const circle2 = document.getElementById("circle2");
    const sectionTwoCenter = document.querySelector(".sectionTwoCenter");
    const imageTwo = document.querySelector(".imageTwo");
    const countdownElement = document.getElementById("countdown");
    const mainTexts = document.querySelectorAll(".main h1, .main h3, .mainBottom");
    const music = document.getElementById("background-music");

    let isDragging = false;
    let startX = 0;

    // ✅ Սկզբում scroll-ը անջատում ենք
    body.style.overflow = "hidden";

    // ✅ Եթե `secOne`-ը բացվում է, scroll-ը պետք է միանա և main-ի տեքստերը թաքցվեն
    function enableScroll() {
        if (secOne.classList.contains("active")) {
            body.style.overflow = "auto";
            mainTexts.forEach(el => {
                el.style.opacity = "0";
                el.style.pointerEvents = "none";
                el.style.transition = "opacity 0.5s ease-out";
            });
        }
    }

    // ✅ `circle`-ի drag գործառույթ
    function handleDragMove(e) {
        const currentX = e.clientX || e.touches[0]?.clientX;
        const maxRight = circle2.offsetLeft - circle.offsetWidth + 35;
        let newLeft = Math.min(Math.max(currentX - startX, 0), maxRight);

        if (newLeft >= maxRight - 5) {
            newLeft = maxRight;
            secOne.classList.add("active");
            enableScroll();
        }

        circle.style.left = newLeft + "px";
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
        window.removeEventListener("touchmove", handleDragMove);
    });

    // ✅ Scroll event — `imageTwo` & `sectionTwoCenter`
    function checkVisibility() {
        const sectionPosition = sectionTwoCenter.getBoundingClientRect().top;
        const imagePosition = imageTwo.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionPosition <= windowHeight * 0.8) {
            sectionTwoCenter.classList.add("visible");
        }
        if (imagePosition <= windowHeight * 0.8) {
            imageTwo.classList.add("visible");
        }
    }

    window.addEventListener("scroll", checkVisibility);
    checkVisibility();

    // ✅ Countdown Timer
    const targetDate = new Date("February 25, 2025 00:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const remainingTime = targetDate - now;

        if (remainingTime < 0) {
            clearInterval(countdownInterval);
            countdownElement.innerHTML = "Հարսանիքը արդեն տեղի է ունեցել!";
            return;
        }

        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `
            <div>${days} <br/> օր</div>:
            <div>${hours} <br/> ժամ</div>:
            <div>${minutes} <br/> րոպե</div>:
            <div>${seconds} <br/> վայրկյան</div>
        `;
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();

    // ✅ Երգի ավտոմատ նվագարկումը
    function playMusic() {
        music.play().catch(error => console.log("Autoplay blocked:", error));
        document.removeEventListener("click", playMusic);
        document.removeEventListener("touchstart", playMusic);
    }

    document.addEventListener("click", playMusic);
    document.addEventListener("touchstart", playMusic);

    // ✅ secOne ակտիվանալիս main-ի տեքստերը թաքցնում ենք
    function hideMainTexts() {
        mainTexts.forEach((element) => {
            element.style.opacity = "0";
            element.style.pointerEvents = "none";
            element.style.transition = "opacity 0.5s ease-out";
        });
    }

    circle.addEventListener("click", function () {
        secOne.classList.add("active");
        hideMainTexts();
    });
});
