
  // Animation timeline using Anime.js for Intro
  const tl1 = anime.timeline({
    easing: 'easeInOutCirc',
    duration: 1000,
  });

  tl1
    .add({
      targets: '.intro .sub-heading h3',
      opacity: [0, 1],
      translateY: ['100%', '0%'],
      delay: anime.stagger(300, { start: 100 }),
    })
    .add({
      targets: '.intro .sub-heading ~ p',
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 300,
      delay: 100,
    });

  // Animation timeline using Anime.js for Footer
  const tl3 = anime.timeline({
    easing: 'easeInOutCirc',
    duration: 750,
  });

  tl3
    .add({
      targets: 'footer .name h3',
      opacity: [0, 1],
      translateY: ['100%', '0%'],
      delay: 250,
    })
    .add({
      targets: '.footerContents .resumeBtn',
      opacity: [0, 1],
      translateX: [-30, 0],
      duration: 300,
      delay: 200,
    })
    .add({
      targets: '.footerContents .credits',
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 200,
      delay: 100,
    })
    .add({
      targets:".footerContents .contact",
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 200,
      delay: 100,
    })
    .add({
      targets:".footerContents .icons-container",
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 200,
      delay: 50,
    })

  // Function to run the timeline animation for Intro
  function runIntroAnimation(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // If the .intro p section is in view, play the timeline animation
        tl1.play();
      } else {
        // If the .intro p section is not in view, pause the timeline animation
        tl1.pause();
      }
    });
  }

  // Create an Intersection Observer to trigger the animation for Intro
  const introObserver = new IntersectionObserver(runIntroAnimation, {
    root: null,
    rootMargin: "0px",
    threshold: 0.1, // Adjust this threshold value as needed
  });

  // Get the .intro p section element
  const introSection = document.querySelector(".intro p");

  // Observe the .intro p section
  introObserver.observe(introSection);

  // Function to run the timeline animation for Footer
  function runFooterAnimation(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // If the footer section is in view, play the timeline animation
        tl3.play();
      } else {
        // If the footer section is not in view, pause the timeline animation
        tl3.pause();
      }
    });
  }

  // Create an Intersection Observer to trigger the animation for Footer
  const footerObserver = new IntersectionObserver(runFooterAnimation, {
    root: null,
    rootMargin: "0px",
    threshold: 0.1, // Adjust this threshold value as needed
  });

  // Get the footer section element
  const footerSection = document.querySelector(".footerContents");

  // Observe the footer section
  footerObserver.observe(footerSection);

  