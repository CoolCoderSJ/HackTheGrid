const lenis = new Lenis()

lenis.on('scroll', (e) => {
  console.log(e)
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = element;

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
  });


$(document).ready(function(){
    if (window.screen.width < 768) {
        let menu = document.getElementsByClassName('menu')[0]
        menu.parentElement.innerHTML = `<div class="dropdown dropdown-end">
        <label tabindex="0" class="btn m-1"><svg class="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/></svg></label>
        <ul class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
        <li><a href="#work" onclick="lenis.scrollTo('#work')">Work</a></li>
        <li><a href="#projects" onclick="lenis.scrollTo('#projects')">Projects</a></li>
        <li><a href="#skills" onclick="lenis.scrollTo('#skills')">Skills</a></li>
        <li><a href="https://shuchir.dev/resume">Resume</a></li>
        <li><a href="https://photography.shuchir.dev" target="_blank">Photography</a></li>
        <li><a href="#contact" onclick="lenis.scrollTo('#contact')">Contact and Socials</a></li>
        </ul>
      </div>`
    }

    let containers = document.getElementsByClassName('container')
    let containersArray = Array.from(containers)
    containersArray.forEach((container) => {
        let $elem = $(container)
        $elem.css('opacity', 0)
    })
    
    $(window).on('scroll', function(){
        let containers = document.getElementsByClassName('container')
        let containersArray = Array.from(containers)
        containersArray.forEach((container) => {
            let $elem = $(container)
            let $window = $(window)
            var docViewTop = $window.scrollTop();
            var docViewBottom = docViewTop + $window.height();
            var elemTop = $elem.offset().top;
            var elemBottom = elemTop + $elem.height();
            if (elemBottom < docViewBottom) {
                $elem.css('opacity', 1)
                if ($(container).hasClass('already_animated')) return
                animateCSS(container, 'fadeInUp')
                $(container).addClass('already_animated')
            }
        })
    });
})