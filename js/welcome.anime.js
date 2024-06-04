document.addEventListener("DOMContentLoaded", () => {
 const welcomeWrapper = document.querySelector('.welcome-wrapper');
  //   if (sessionStorage.getItem('welcomeScreen') == 'true') {
  //   welcomeWrapper.remove();
  // } else {
    sessionStorage.setItem('welcomeScreen', true);
    // Select the elements
    // Welcome animation using Anime.js
    const loaderWrapper = document.querySelector('.loader-wrapper');
    const text1 = document.getElementById('text1');
    const line1 = document.getElementById('line1');
    const line2 = document.getElementById('line2');
    const heroImg = document.querySelector('.hero .himg img');
    const heading = document.querySelector('.text-container .heading h1');
    const typingEffect = document.querySelector('.typingEffect');
    const subHeading = document.querySelector('.text-container .sub-heading');
    const ctaBtn1 = document.querySelector('.ctaBtns:nth-child(1)');
    const ctaBtn2 = document.querySelector('.ctaBtns:nth-child(2)');
    const updateText = document.querySelector('.updateText');
  
    // Wrapper animation using Anime.js timeline
    const tl = anime.timeline({
      easing: 'easeOutCirc',
    });
  
    tl
      .add({
        targets: line1,
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 300,
        easing: 'easeOutCirc',
      })
      .add({
        targets: line2,
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 300,
        easing: 'easeOutCirc',
      })
      .add({
        targets: updateText,
        opacity: [0, 1],
        duration: 200,
        delay: 400,
        easing: 'easeOutCirc',
      })
      .add({
        targets: loaderWrapper,
        opacity: [0, 1],
        translateY: [10, 0],
        duration: 100,
        easing: 'linear',
      })
      .add({
        targets: '#text1',
        marginTop: ['5.8rem', '1.8rem'],
        duration: 500,
        delay:600,
        easing: 'easeInOutQuad',
      })
      .add({
        targets: '.loader-wrapper .loader',
        width: ['10px', '50px'],
        duration: 1000,
        easing: 'easeInOutQuad',
      })
      .add({
        targets: '#text1',
        marginTop: ['1.8rem', '-1.8rem'],
        duration: 500,
        easing: 'easeInOutQuad',
      })
      .add({
        targets: '.loader-wrapper .loader',
        width: ['50px', '90px'],
        duration: 1000,
        easing: 'easeInOutQuad',
      })
      .add({
        targets: '#text1',
        marginTop: ['-1.8rem', '-6rem'],
        duration: 500,
        easing: 'easeInOutQuad',
      })
      .add({
        targets: '.loader-wrapper .loader',
        width: ['90px', '150px'],
        duration: 1000,
        easing: 'easeInOutQuad',
      })
      .add({
        targets: welcomeWrapper,
        opacity: [1, 0],
        translateY: ['0%', '100%'],
        duration: 500,
        delay: 2000,
        easing: 'easeInOutQuad',
      })
      .add({
        targets: welcomeWrapper,
        complete: () => {
          welcomeWrapper.remove();
        },
      })
      .add({
        targets: 'nav',
        opacity: [0, 1],
        translateY: [-70, 0],
        duration: 200,
        delay: 0,
        easing: 'easeOutCirc',
      })
      .add({
        targets: heroImg,
        opacity: [0, 1],
        scale: [1.2, 1],
        duration: 250,
        easing: 'easeOutQuad',
      })
      .add({
        targets: heading,
        opacity: [0, 1],
        translateY: [-50, 0],
        duration: 300,
        easing: 'easeOutCirc',
      })
      .add({
        targets: typingEffect,
        opacity: [0, 1],
        translateY: [-30, 0],
        duration: 300,
        easing: 'easeOutCirc',
      })
      .add({
        targets: subHeading,
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 300,
        easing: 'easeOutCirc',
      })
      .add({
        targets: ctaBtn1,
        opacity: [0, 1],
        translateX: [-100, 0],
        duration: 200,
        easing: 'easeOutQuad',
      })
      .add({
        targets: ctaBtn2,
        opacity: [0, 1],
        translateX: [-70, 0],
        duration: 200,
        easing: 'easeOutQuad',
      });
    // }
});