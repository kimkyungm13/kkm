
window.onload = function () {
    history.scrollRestoration = "manual";

    /** LENIS */
    const lenis = new Lenis()
    lenis.on('scroll', (e) => {
    })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)
    gsap.defaults({
        ease: "ease"
    })
    $('.nav .menu .about a').click(function (e) {
        e.preventDefault();
        lenis.scrollTo('#about')
    })
    $('.nav .menu .work a').click(function (e) {
        e.preventDefault();
        lenis.scrollTo('#work')
    })
    $('.nav .menu .contact a').click(function (e) {
        e.preventDefault();
        lenis.scrollTo('#footer')
    })



    const introBg = gsap.timeline({
        onStart: () => {
            // 애니메이션이 시작될 때 스크롤 방지
            document.querySelector('#wrapper').addEventListener('wheel', preventScroll, { passive: false });
        },
        onComplete: () => {
            // 애니메이션이 끝날 때 스크롤 허용
            document.querySelector('#wrapper').removeEventListener('wheel', preventScroll);
            lenis.start();  // lenis의 멈춤 기능 호출

        },
        // onReverseComplete: () => {
        //     // 애니메이션이 끝날 때 스크롤 허용
        //     document.querySelector('#wrapper').removeEventListener('wheel', preventScroll);
        // }
    });

    function preventScroll(e) {
        e.preventDefault();
        lenis.stop();  // lenis의 멈춤 기능 호출
    }




    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.matchMedia({
        // large
        "(min-width: 1025px)": function () {
            $('.sc-sub .work-list li').hover(function () {
                $(this).addClass('active');
            }, function () {
                $(this).removeClass('active');
            })
            $('.sc-sub .work-list li').each(function () {
                const $li = $(this);
                const $picture = $li.find('picture');

                // 마우스가 li 위에 있을 때 picture를 따라오게 설정
                $li.on('mousemove', function (e) {
                    const offset = $li.offset();
                    // const x = e.pageX - offset.left // 오프셋 추가 (예: 10px)
                    const y = e.pageY - offset.top - ($picture.height() / 2);  // 오프셋 추가 (예: 10px)

                    gsap.to($picture, {
                        // x: x,
                        y: y,
                        ease: 'power2.out',
                        duration: 0.3
                    });
                });

                // 마우스가 li를 떠났을 때 picture를 초기 위치로 복원
                $li.on('mouseleave', function () {
                    gsap.to($picture, {
                        opacity: 0,
                        ease: 'power2.out',
                        duration: 0.3
                    });
                });

                // 마우스가 li 위에 있을 때 picture를 활성화 및 초기 위치 설정
                $li.on('mouseenter', function (e) {
                    const offset = $li.offset();
                    // const x = e.pageX - offset.left // 오프셋 추가 (예: 10px)
                    const y = e.pageY - offset.top - ($picture.height() / 2); // 오프셋 추가 (예: 10px)

                    gsap.set($picture, {
                        // x: x,
                        y: y,
                        opacity: 1
                    });
                });
            });
            gsap.to('.sc-work .title h2 span', {
                scrollTrigger: {
                    trigger: '.sc-work .title',
                    start: '0% 50%',
                    end: '100% 100%',
                    scrub: 0,

                },
                'transform': ' scale(0.35, 0.35)',
            },)
        },
        // medium
        "(min-width: 768px) and (max-width: 1024px)": function () {

        },
        // small
        "(max-width: 767px)": function () {

        },
        // all
        "all": function () {

        }
    });




















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

    // const conWrap = document.getElementById('main');
    // const $body = document.querySelector('body');
    // function preventScroll(e) {
    //     e.preventDefault();
    //     lenis.stop();
    // }
    // conWrap.addEventListener('wheel', preventScroll, { passive: false })
    // conWrap.addEventListener('wheel', function () {
    //     conWrap.removeEventListener('wheel', preventScroll, { passive: false })
    // })
    // // let firstScroll = true; //초반세팅
    // // $body.addEventListener('wheel', function (e) {
    // //     if (e.deltaY > 0 && firstScroll == true) {
    // //         $('.section1').addClass('down');
    // //         setTimeout(() => {
    // //             main.removeEventListener('wheel', preventScroll, { passive: false });
    // //             firstScroll = false;
    // //         }, 4000);
    // //     }
    // // });
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
    /**
     * mouse cursor
     */
    gsap.set(".custom-cursor", { xPercent: -50, yPercent: -50 });
    document.addEventListener("mousemove", function (e) {
        gsap.to(".custom-cursor", {
            duration: 0.2,
            left: e.pageX,
            top: e.pageY,
            ease: "power2.out"
        });
    });

    const links = document.querySelectorAll('.btn-link');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to('.custom-cursor', {
                width: 20,
                height: 20,
                borderColor: 'blue',
                backgroundColor: 'yellow',
                duration: 0.2,
                ease: "power2.out"
            });
        });

        link.addEventListener('mouseleave', () => {
            gsap.to('.custom-cursor', {
                width: 10,
                height: 10,
                borderColor: 'black',
                backgroundColor: 'transparent',
                duration: 0.2,
                ease: "power2.out"
            });
        });
    });
    const follower = document.querySelector(".follower");
    gsap.set(follower, {
        opacity: 1,
        scale: 0,
        transformOrigin: "center center",
        xPercent: -50,
        yPercent: -50
    });
    const xTo = gsap.quickTo(follower, "x", { ease: "power3" });
    const yTo = gsap.quickTo(follower, "y", { ease: "power3" });

    const box = document.querySelector(".sc-intro");
    const boxPosition = box.getBoundingClientRect().x;
    const boxLeft = box.getBoundingClientRect().x;
    const boxTop = box.offsetTop;

    box.addEventListener("mousemove", (e) => {
        // console.log(e.pageY, e.clientY, boxTop);
        xTo(e.clientX - boxLeft);
        yTo(e.pageY - boxTop);
    });

    box.addEventListener("mouseenter", () => {
        gsap.to(follower, {
            duration: 0.3,
            opacity: 1,
            scale: 1,
            transformOrigin: "center center"
        });
    });

    box.addEventListener("mouseleave", () => {
        gsap.to(follower, {
            duration: 0.3,
            opacity: 0,
            scale: 0,
            transformOrigin: "center center"
        });
    });


    /** sc-intro */
    const headTxt = new SplitType('.sc-intro .title .line-wrap .line', { types: ' words, chars', });



    /** sc-about */
    const aboutTxt = new SplitType('.sc-about .group-sub h3,.sc-about .group-sub h4', { types: 'lines,words', });
    gsap.from('.sc-about .group-title span,.sc-about .group-sub h3 .word,.sc-about .group-sub h4 .word', {
        yPercent: 100,
        stagger: 0.5,
        duration: 0.4,
        scrollTrigger: {
            trigger: '.sc-about',
            start: '50% 100%',
            end: '100% 100%',
            scrub: 0,
            // markers: true,
            once: true
        }
    })


    /** sc-service */
    serviceTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.sc-service',
            start: '0% 100%',
            end: '80% 100%',
            scrub: 0,
            // markers: true
        }
    })
    serviceTl.to('.sc-service .consulting', {
        duration: 1,
        transform: 'translateY(0)'
    }, 'a').to('.sc-service .designing', {
        transform: 'translateY(0)'
    }, 'a+=0.5').to('.sc-service .developing', {
        transform: 'translateY(0)'
    }, 'a+=1')
    const descTxt = new SplitType('.sc-desc .desc', { types: 'words, chars', });


    /** sc-desc */
    gsap.to('.sc-desc .desc-wrap .desc .word .char', {
        scrollTrigger: {
            trigger: '.sc-desc ',
            start: '0% 50%',
            end: '100% 100%',
            scrub: 0,
        },
        stagger: 1,
        color: "#000",
    });
    gsap.to('.sc-desc .title-wrap .first,.sc-desc .title-wrap .second', {
        scrollTrigger: {
            trigger: ".sc-desc .title-wrap",
            start: "10% 100%",
            end: "100% 0%",
            scrub: 0,
            // markers: true,
            invalidateOnRefresh: true,
        },
        '--x': '0%',
    })

    gsap.to('.sc-desc .about-txt h2 span', {
        scrollTrigger: {
            trigger: '.sc-desc .about-txt',
            start: '0% 100%',
            end: '100% 100%',
            scrub: 0,
            markers: true
        },
        y: 0
    })


    /** sc-work */


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



    $('.sc-work .work-wrap').mousemove(function (e) {
        const projectCursor = $('.project-cursor [data-target="cursor"]');
        gsap.to(projectCursor, {
            x: e.clientX + 'px',
            y: e.clientY + 'px'
        })
    })
    $('.sc-work .work-wrap').mouseover(function () {
        $('.sc-work .project-cursor').addClass('on');
    })
    $('.sc-work .work-wrap').mouseleave(function () {
        $('.sc-work .project-cursor').removeClass('on');
    })
    $('.sc-work .work h3 a').mouseover(function () {
        $('.sc-work .project-cursor').addClass('red')
    })
    $('.sc-work .work h3 a').mouseleave(function () {
        $('.sc-work .project-cursor').removeClass('red')
    })



    /** sc-project */
    projectTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.sc-project',
            start: '50% 100%',
            end: '150% 100%',
            scrub: 0,
            // markers: true,
        },
    });
    projectTl.to('.list-area:first-child', {
        xPercent: 1
    }, 'a').to('.list-area:last-child', {
        xPercent: -1
    }, 'a')


    lastTl = gsap.timeline({
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



