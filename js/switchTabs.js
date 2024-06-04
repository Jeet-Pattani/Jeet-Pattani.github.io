export function showTab(e) {
    const tabContents = document.querySelectorAll(".tab-content");
    const highlight = document.querySelector(".highlight");
    const tabButtons = document.querySelectorAll(".tab-btn");
    
    tabContents.forEach(tab => {
        if (tab.id === e) {
            tab.style.display = "grid";
            setTimeout(() => tab.classList.remove("hidden"), 100);
        } else {
            tab.classList.add("hidden");
            tab.style.display = "none";
        }
    });
  
    tabButtons.forEach(btn => btn.classList.remove("active"));
    document.getElementById(e + "Btn").classList.add("active");
  
    const activeTabButton = document.querySelector(".tab-btn.active");
  
    highlight.style.width = activeTabButton.offsetWidth + "px";
    highlight.style.transform = `translateX(${activeTabButton.offsetLeft}px)`;
}

document.addEventListener("DOMContentLoaded", function () {
    const tabContents = document.querySelectorAll(".tab-content");
    const tabButtons = document.querySelectorAll(".tab-btn");

    tabContents.forEach(tab => tab.classList.add("hidden"));
    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const tabId = btn.getAttribute("data-tab");
            showTab(tabId);
        });
    });
  
    // Set the "proficient" tab as active by default
    const defaultTabId = "proficient";
    showTab(defaultTabId);
  
    const adjustHighlight = () => {
      const highlight = document.querySelector(".highlight");
      const activeTabButton = document.querySelector(".tab-btn.active");
      highlight.style.width = activeTabButton.offsetWidth + "px";
      highlight.style.transform = `translateX(${activeTabButton.offsetLeft}px)`;
    };
  
    adjustHighlight();
    window.addEventListener("resize", adjustHighlight);
});
