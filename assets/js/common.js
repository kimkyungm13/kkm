
window.onload = () => {
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
        duration: 0.2
    }).to('.sc-intro .intro-txt .title .line', {
        transform: 'translateY(0)',
        stagger: 0.2,
        autoAlpha: 1,
        // delay: 1
    }).to('.sc-intro .intro-title', {
        duration: 1,
        '--transform': 'translateX(100%)',
    }).from('.sc-intro .logo-txt', {
        yPercent: 100
    }).to('#header', {
        autoAlpha: 1,
    });

    gsap.to('.sc-intro .logo-wrap, .sc-intro .intro-txt h2', {
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
    let mm = gsap.matchMedia();
    mm.add("(min-width:1025px)", () => {
        // ScrollTrigger.refresh()
        /** header scroll */
        let lastScrollY = 0;
        window.addEventListener("scroll", () => {
            const currentScrollY = window.scrollY;
            const introH = $('.sc-intro').height();
            if (currentScrollY < introH) {
                gsap.to("#header .logo a", { y: "100%", autoAlpha: 0, 'transform': 'scale(1)' });
            } else {
                gsap.to("#header .logo a", { y: "0%", autoAlpha: 1 });
            }
            lastScrollY = introH;
        });
    })

    /** sc-desc */
    //desc 글자단위로 split
    const descTxt = new SplitType('.sc-desc .desc', { types: 'chars', });
    gsap.to('.sc-desc .desc-wrap .desc .char', {
        scrollTrigger: {
            trigger: '.sc-desc ',
            start: '0% 50%',
            end: '100% 100%',
            scrub: 0,
        },
        stagger: 1,
        color: "#000",
    });

    gsap.to('.sc-desc .about-txt h2 span, .sc-desc .about-txt .txt-wrapper span', {
        scrollTrigger: {
            trigger: '.sc-desc .about-txt',
            start: '0% 50%',
            end: '100% 30%',
            stagger: 0.2,
            scrub: 0,
            // markers: true
        },
        y: 0
    })


    /** sc-work title */
    const titleTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.sc-work .title',
            start: '0% 70%',
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
        onUpdate: function (self) {
            totalLength = $('.sc-work .thumb-wrap .thumb').length;
            idx = Math.round(self.progress * (totalLength - 1))
            currItem = $('.sc-work .stic .work.show');
            newItem = $('.sc-work .stic .work').eq(idx);
            if (currItem) { currItem.removeClass('show'); }
            if (newItem) { newItem.addClass("show"); }
        }
    });

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
        $('.sc-sub .work-list li').hover(function () {
            $(this).addClass('active');
        }, function () {
            $(this).removeClass('active');
        })
        $('.sc-sub .work-list .pic-wrap').each(function () {
            const $li = $(this).parents('li');
            const img = $li.find('.hover-img')[0]; // jQuery 객체 → DOM 요소
            const canvas = $(this).find(".pixel-canvas")[0];
            const ctx = canvas.getContext("2d");
            let pixelation = 50; // 초기 픽셀 크기

            function drawPixelated(size) {
                if (!img || !img.complete) return;

                let w = img.naturalWidth || img.width;
                let h = img.naturalHeight || img.height;

                // if (w === 0 || h === 0) return; // 크기가 0이면 실행 안 함

                canvas.width = w;
                canvas.height = h;

                let tempCanvas = document.createElement("canvas");
                let tempCtx = tempCanvas.getContext("2d");
                tempCanvas.width = Math.max(1, w / size);
                tempCanvas.height = Math.max(1, h / size);

                tempCtx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);
                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
            }

            if (img.complete) {
                drawPixelated(pixelation);
            } else {
                img.onload = function () {
                    drawPixelated(pixelation);
                };
            }

            $li.on("mouseenter", function () {
                gsap.to({ size: pixelation }, {
                    size: 1,
                    delay: 0.5,
                    duration: 1,
                    ease: "power2.out",
                    onUpdate: function () {
                        drawPixelated(Math.max(1, this.targets()[0].size));
                    }
                });
            });

            $li.on("mouseleave", function () {
                gsap.to({ size: 1 }, {
                    size: pixelation,
                    duration: 1,
                    ease: "power2.out",
                    onUpdate: function () {
                        drawPixelated(Math.max(1, this.targets()[0].size));
                    }
                });
            });
        });
    });
    mm.add("(max-width: 799px)", () => {
        gsap.set('.sc-sub .work-list li picture', { x: 0, y: 0 })
        // gsap.set('.sc-sub .work-list li', {Pointe})
    });
    window.addEventListener("resize", ScrollTrigger.update);

    /** FOOTER */
    const lastTl = gsap.timeline({
        scrollTrigger: {
            trigger: '#footer',
            start: '0% 70%',
            end: '100%, 100%',
            scrub: 0,
            // markers: true,
        },
    });
    lastTl.to('#footer .logo-txt', {
        yPercent: -100
    },).to('#header .logo a', {
        yPercent: 100
    },)
} //end



