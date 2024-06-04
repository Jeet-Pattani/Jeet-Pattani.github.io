var welcomeWrapper = document.querySelector('.welcome-wrapper');
document.addEventListener("DOMContentLoaded", () => {
  // if (sessionStorage.getItem('welcomeScreen') == 'true') {
  //   welcomeWrapper.remove();
  // } else {
    sessionStorage.setItem('welcomeScreen', true);

    // Wrapper animation
    var tl = gsap.timeline({
      defaults: {
        ease: "Circ.easeInOut"
      }
    });

    // Nested timeline for loader width animation
    var loaderTl = gsap.timeline({
      defaults: {
        duration: 0.5
      }
    });

    tl
    .fromTo("#line1",{
      opacity:0,
      y:-20,
    }, {
      opacity:1,
      y:0,
      duration: 0.3,
    })
    .fromTo("#line2", {
      opacity:0,
      y:-20,
    }, {
      opacity:1,
      y:0,
      duration: 0.3,
    }).to('.updateText',{
      opacity:1,
      duration:0.2,
      delay:0.4,
  }).fromTo('.loader-wrapper',{
    opacity:0,
    y:10,
  },{
    opacity:1,
    y:0,
    duration:0.1,
    delay:-0.3,
  }).fromTo('#text1', {
      marginTop: '5.7rem',
      //opacity:0,
    }, {
      //opacity:1,
      marginTop: '1.8rem',
      duration: 0.5,
      delay: 1,
      onStart: function () {
        loaderTl.to('.loader-wrapper .loader',
        { //opacity:1,
          width:'80px',
          duration: 1,
          delay:1,
        });
      },
      onComplete: function () {
        loaderTl.to('.loader-wrapper .loader', {
          width: '150px',
          duration: 1,
          delay: 1,
        });
      }
    })
    .to('#text1', {
      marginTop: '-1.8rem',
      duration: 0.5,
      delay: 1
    })
    .to('#text1', {
      marginTop: '-5.8rem',
      duration: 0.5,
      delay: 1,
    })
    .to('.welcome-wrapper', {
      opacity: 0,
      y: "100%",
      duration: 0.5,
      delay: 2,
    })
    .to('.welcome-wrapper', {
      onComplete: function () {
        document.querySelector('.welcome-wrapper').remove();
      }
    })
    .fromTo('nav', {
      opacity: 0,
      y: -70,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      delay: 0.2,
    })
    .fromTo(".hero .himg img", {
      opacity: 0,
      scale: 1.2,
    }, {
      scale: 1,
      opacity: 1,
      duration: 0.25,
      delay: 0.3,
    })
    .fromTo('.text-container .heading h1', {
      opacity: 0,
      y: -50,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      delay: -0.2,
    })    .fromTo('.typingEffect', {
      opacity: 0,
      y: -60,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      delay: 0.1,
    })
    .fromTo('.text-container .sub-heading', {
      opacity: 0,
      y: 50,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      delay: -0.2,
    }).fromTo('.ctaBtns:nth-child(1)',{
      opacity:0,
      x:-100,
    },{
      opacity:1,
      x:0,
      duration:0.2,
      delay:0.2,
    }).fromTo('.ctaBtns:nth-child(2)',{
      opacity:0,
      x:-50,
    },{
      opacity:1,
      x:0,
      duration:0.2,
      delay:0.1,
    });
  // }
});