//스크롤 위치 복원 비활
history.scrollRestoration = "manual";

//GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

/** LENIS */
const lenis = new Lenis()
// lenis.on('scroll', (e) => {
//     console.log(e)
// })

//lenis + gsap scrollTrigger 연동
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)
gsap.defaults({
    ease: "power1.out"
})

/** NAV LINK*/
const navLink = [
    { link: '.nav .about a', scrollTo: '#about' },
    { link: '.nav .work a', scrollTo: '#work' },
    { link: '.nav .contact a', scrollTo: '#footer' },
]
navLink.forEach(({ link, scrollTo }) => {
    document.querySelector(link).addEventListener('click', (e) => {
        e.preventDefault();
        lenis.scrollTo(scrollTo)
    })
}
)
//가상선택자 data-title 스크린리더 막기
document.querySelectorAll('.menu a').forEach(link => {
    link.setAttribute('aria-label', link.getAttribute('data-title')); // 스크린 리더용 텍스트 설정
});

/** sc-intro */
const introBg = gsap.timeline({
    onStart: () => {
        // 시작 : 스크롤 방지
        document.querySelector('#wrapper').addEventListener('wheel', preventScroll, { passive: false });
    },
    onComplete: () => {
        // 끝 : 스크롤 허용
        document.querySelector('#wrapper').removeEventListener('wheel', preventScroll);
        lenis.start();  // lenis의 멈춤 기능 호출
    },
});
/** sc-intro */
//시작애니메이션
introBg.set('.sc-intro .intro-title', {
    duration: 0.2, ease: "power1.in",
}).to('.sc-intro .intro-txt .title .line', {
    transform: 'translateY(0)',
    stagger: 0.2,
    autoAlpha: 1,
    // delay: 1
}).to('.sc-intro .intro-title', {
    duration: 1,
    '--transform': 'translateX(100%)',
    ease: "power1.in",
}).from('.sc-intro .logo-txt', {
    yPercent: 100
}).to('#header', {
    autoAlpha: 1,
});

gsap.to('.sc-intro .logo-wrap, .sc-intro .intro-txt .title', {
    scrollTrigger: {
        trigger: '.sc-intro',
        start: '00% 0%',
        end: '100% 80%',
        scrub: 0,
    },
    '--left': '0'
});
function preventScroll(e) {
    e.preventDefault();
    lenis.stop();  // lenis의 멈춤 기능 호출
}


//반응형
const mm = gsap.matchMedia();

// 1025px 이상
mm.add("(min-width: 1025px)", () => {
    // 헤더 스크롤 애니메이션 등록
    const onScroll = () => {
        const currentScrollY = window.scrollY;
        const introH = document.querySelector(".sc-intro").offsetHeight;
        if (currentScrollY < introH) {
            gsap.to("#header .logo a", {
                y: "100%",
                autoAlpha: 0,
                transform: "scale(1)",
            });
        } else {
            gsap.to("#header .logo a", { y: "0%", autoAlpha: 1 });
        }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
        window.removeEventListener("scroll", onScroll);
        ScrollTrigger.refresh();
    };
});

mm.add("(max-width: 1024px)", () => {
    gsap.set("#header .logo a", { y: "0%", autoAlpha: 1 });
    return () => {
        // nothing to clean up here
    };
})
mm.add("(max-width:768px", () => {
    gsap.set("#header .logo a", { autoAlpha: 0 });

});

// 초기 강제 리프레시 (필요시)
ScrollTrigger.refresh();

/** sc-desc */
//desc 글자단위로 split
const descTxt = new SplitType('.sc-desc .desc', { types: 'chars', });
gsap.to('.sc-desc .desc-wrap .desc .char', {
    scrollTrigger: {
        trigger: '.sc-desc ',
        start: '0% 60%',
        end: '90% 100%',
        scrub: 0,
        // markers: true,
        ease: "bounce.out",
    },
    stagger: 1,
    color: "#000",
});
gsap.from('.sc-desc .about-txt h2 span, .sc-desc .about-txt .txt-wrapper span', {
    scrollTrigger: {
        trigger: '.sc-desc .about-txt',
        start: '0 80%',
        end: '100% 100%',
        scrub: 0,
        // markers: true
    },
    autoAlpha: 0
})
// gsap.to('.sc-desc .about-txt h2 span, .sc-desc .about-txt .txt-wrapper span', {
//     scrollTrigger: {
//         trigger: '.sc-desc .about-txt',
//         start: '0% 80%',
//         end: '100% 80%',
//         stagger: 0.2,
//         scrub: 0,
//         markers: true
//     },
//     y: 0
// })


/** sc-work title */
const titleTl = gsap.timeline({
    scrollTrigger: {
        trigger: '.sc-work .title',
        start: '0% 60%',
        end: '100% 100%',
        scrub: 0,
        // markers: true,
    },
})
titleTl.to('.sc-work .title h2 span:nth-child(1)', {
    transform: 'translateX(0%)',
    'background-position-x': '0%'
}, 'a').to('.sc-work .title h2 span:nth-child(2)', {
    transform: 'translateX(5%)',
    'background-position-x': '5%',
}, 'a').to('.sc-work .title h2 span:nth-child(2)', {
    'background-position-x': '0%',
    transform: 'translateX(0%)'
},).to('.sc-work .title p span', {
    transform: 'translateY(0%)'
},)


ScrollTrigger.create({
    trigger: '.sc-work .work-wrap',
    start: '0% 0%',
    end: '100% 100%',
    scrub: 0,
    // markers: true,
    onUpdate: self => {
        const totalLength = document.querySelectorAll('.sc-work .thumb-wrap .thumb').length;
        const idx = Math.round(self.progress * (totalLength - 1));

        const currItem = document.querySelector('.sc-work .stic .work.show');
        const newItem = document.querySelectorAll('.sc-work .stic .work')[idx];

        if (currItem) currItem.classList.remove('show');
        if (newItem) newItem.classList.add('show');
    }
});

// work 내 마우스
document.querySelector('.sc-work .work-wrap').addEventListener('mousemove', (e) => {
    const projectCursor = document.querySelector('.project-cursor [data-target="cursor"]')
    gsap.to(projectCursor, {
        x: `${e.clientX}px`,
        y: `${e.clientY}px`,
    })
})
const projectCursor = document.querySelector('.sc-work .project-cursor');
const workWrap = document.querySelectorAll('.sc-work .work-wrap');
const linkView = document.querySelectorAll('.sc-work .link-view');
workWrap.forEach(workWrap => {
    workWrap.addEventListener(
        'mouseover', () => { projectCursor.classList.add('on') })
})
workWrap.forEach(workWrap => {
    workWrap.addEventListener(
        'mouseleave', () => { projectCursor.classList.remove('on') })
})
linkView.forEach(linkView => {
    linkView.addEventListener(
        'mouseover', () => { projectCursor.classList.add('red') }
    )
})
linkView.forEach(linkView => {
    linkView.addEventListener(
        'mouseleave', () => { projectCursor.classList.remove('red') }
    )
})

/** logo 사이즈 sc-work섹션에서 작아지게 */
ScrollTrigger.create({
    trigger: `.sc-work`,
    start: "0% 0",
    end: "100% 0%",
    scrub: 0,
    duration: 0.2,
    onEnter: () => gsap.to("#header .logo a", {
        'scale': '0.5',
        'transform-origin': 'left center'
    }),
    onEnterBack: () => gsap.to("#header .logo a", {
        'scale': '0.5',
        'transform-origin': 'left center'
    }),
    onLeave: () => gsap.to("#header .logo a", {
        'scale': '1',
        // 'transform-origin': 'left top'
    }),
    onLeaveBack: () => gsap.to("#header .logo a", {
        'scale': '1',
        // 'transform-origin': 'left top'
    })
})


/** sc-sub */
mm.add("(min-width: 880px)", () => {
    document.querySelectorAll('.sc-sub .work-list li').forEach(li => {
        li.addEventListener("mouseenter", () => li.classList.add("active"));
        li.addEventListener("mouseleave", () => li.classList.remove("active"));
    });

    document.querySelectorAll('.sc-sub .work-list .pic-wrap').forEach(picWrap => {
        const li = picWrap.closest("li");
        const img = li.querySelector(".hover-img");
        const canvas = picWrap.querySelector(".pixel-canvas");
        const ctx = canvas.getContext("2d");
        const pixelation = 50; // 초기 픽셀 크기

        const drawPixelated = (size) => {
            if (!img || !img.complete) return;

            const w = img.naturalWidth || img.width;
            const h = img.naturalHeight || img.height;

            canvas.width = w;
            canvas.height = h;

            const tempCanvas = document.createElement("canvas");
            const tempCtx = tempCanvas.getContext("2d");
            tempCanvas.width = Math.max(1, w / size);
            tempCanvas.height = Math.max(1, h / size);

            tempCtx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
        };

        if (img.complete) {
            drawPixelated(pixelation);
        } else {
            img.onload = () => drawPixelated(pixelation);
        }

        li.addEventListener("mouseenter", () => {
            gsap.to({ size: pixelation }, {
                size: 1,
                delay: 0.5,
                duration: 1,
                ease: "power2.out",
                onUpdate() {
                    drawPixelated(Math.max(1, this.targets()[0].size));
                }
            });
        });

        li.addEventListener("mouseleave", () => {
            gsap.to({ size: 1 }, {
                size: pixelation,
                duration: 1,
                ease: "power2.out",
                onUpdate() {
                    drawPixelated(Math.max(1, this.targets()[0].size));
                }
            });
        });
    });
});

window.addEventListener("resize", ScrollTrigger.update);

/** FOOTER */
const lastTl = gsap.timeline({
    scrollTrigger: {
        trigger: '#footer',
        start: '0% 80%',
        end: '100%, 100%',
        scrub: 0,
        // markers: true,
        ease: "power1.in",
    },
});
lastTl.to('#footer .logo-txt', {
    'transform': 'translateY(0%)',
    duration: 1,
    opacity: 1
},).to('#header .logo a', {
    yPercent: 100,
    duration: 1
},)



