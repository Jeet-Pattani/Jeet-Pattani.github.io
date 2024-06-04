var welcomeWrapper = document.querySelector('.welcome-wrapper');
document.addEventListener("DOMContentLoaded", () => {

    // Wrapper animation
    var tl = gsap.timeline({
        defaults: {
            ease: "Circ.easeInOut"
        }
    });

    tl.fromTo(".heading .part1", {
        opacity: 0,
        x: -50,
    }, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        delay: 1
    }).fromTo(".heading .part2", {
        opacity: 0,
        x: 50,
    }, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        delay: -0.3
    }).fromTo(".sub-heading p", {
        opacity: 0,
        y: -20,
    }, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: 0.5
    })
        .to('.welcome-wrapper', {
            opacity: 0,
            y: "100%",
            duration: 0.5,
            delay: 2.5,
        })
        .to('.welcome-wrapper', {
            onComplete: function () {
                document.querySelector('.welcome-wrapper').remove();
            }
        });
      
});