
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


    /** header scroll */
    let lastScrollY = 0;
    window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY) {
            gsap.to("#header", { y: "-100%" });
        } else {
            gsap.to("#header", { y: "0%" });
        }
        lastScrollY = currentScrollY;
    });

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
        console.log(e.pageY, e.clientY, boxTop);
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

    /** odometer count */
    $('.odometer').html(100);
    const loader = gsap.timeline({
        onComplete: () => {
            introTl = gsap.timeline({});
            introTl.to('.sc-intro .title .line', {
                transform: ' translateY(0)',
                stagger: 0.2,
                autoAlpha: 1
            }).to('.btn-link', {
                opacity: 1
            })
        }
    });
    loader.to('.loader', {
        duration: 2,
        autoAlpha: 1
    }, 'a').to('.loader', {
        yPercent: 100,
        delay: 0.5
    }, 'a+=2').to('.loader', {
        autoAlpha: 0
    });

    /** sc-intro */
    const textElement = document.querySelector('.sc-intro .title');
    const headTxt = new SplitType('.sc-intro .title .line', { types: 'words, chars', });
    const words = textElement.querySelectorAll('.sc-intro .word');
    words.forEach(word => {
        if (word.textContent.trim() === 'impactful') {
            word.classList.add('IvyPresto');
        }
    });

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


    serviceTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.sc-service',
            start: '0% 100%',
            end: '80% 100%',
            scrub: 0,
            // markers: true
        }
    })
    // consulting designing developing
    serviceTl.to('.sc-service .consulting', {
        duration: 1,
        transform: 'translateY(0)'
    }, 'a').to('.sc-service .designing', {
        transform: 'translateY(0)'
    }, 'a+=0.5').to('.sc-service .developing', {
        transform: 'translateY(0)'
    }, 'a+=1')
    const descTxt = new SplitType('.sc-desc .desc', { types: 'words, chars', });

    /** section 02 sc-mmodule */
    gsap.to('.sc-desc .desc-wrap .desc .word .char', {
        scrollTrigger: {
            trigger: '.sc-desc .desc-wrap',
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
        // x: function () {
        //     return window.innerWidth;
        // }
    })
    workTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.sc-work',
            start: '00% 00%',
            end: '100% 100%',
            scrub: 0,
            // markers: true,
        },
    });
    workTl.to('.group-work .item01', {
        yPercent: 0,
    }).to('.group-work .item02', {
        yPercent: -100,
        y: 20,
        transform: 'scale(0.98)'
    }).to('.group-work .item03', {
        yPercent: -200,
        y: 20 * 2,
    }).to('.group-work .item04', {
        yPercent: -300,
        y: 20 * 3
    })
    // gsap.to('.sc-desc .title-wrap .second', {
    //     scrollTrigger: {
    //         trigger: ".sc-desc .title-wrap",
    //         start: "20% 100",
    //         end: "100% 0%",
    //         scrub: 1,
    //         markers: true,
    //         invalidateOnRefresh: true,

    //     },
    //     xPercent: -100,
    //     // x: function () {
    //     //     return window.innerWidth;
    //     // }
    // })
    /**
     * sc-desc
     *
     */
    // descTl = gsap.timeline({
    //     scrollTrigger: {
    //         trigger: '.sc-desc .title-wrap',
    //         start: '20% 100%',
    //         end: '100% 100%',
    //         markers: true,
    //         scrub: 0,
    //     }
    // });
    // descTl.from('.sc-desc .title-wrap .first', { xPercent: -50 }, 'a')
    //     .from('.sc-desc .title-wrap .second', { xPercent: 50 }, 'a')
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
} //end



