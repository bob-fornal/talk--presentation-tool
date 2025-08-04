import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

function debounce(func: any, delay: any) {
  let timeoutId: any;

  return function(...args: any) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
}


@Component({
  selector: 'app-ditch-your-javascript-for-css',
  standalone: false,
  
  templateUrl: './ditch-your-javascript-for-css.component.html',
  styleUrl: './ditch-your-javascript-for-css.component.scss'
})
export class DitchYourJavascriptForCssComponent implements OnInit {
  constructor(
    private titleService: Title,
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Demo Page');
    setTimeout(this.handleJS.bind(this), 1000);
  }

  handleJS() {
    // connect up accordians
    let details = document.querySelectorAll('.accordion details');

    details.forEach(function (d: any, index) {
      d.onclick = () => {
        details.forEach(function(c, i) {
          index === i ?'':c.removeAttribute('open');
        });
      };
    });

    // demo: janky buttons
    const button: any = document.querySelector('#jankyButton')!;
    console.log(button);
    // Buttons “janky” on mobile
    const jankyButton = document
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'scale(1.1)';
      button.style.backgroundColor = '#0055bb';
    });

    button.addEventListener('mouseleave', () => {
      button.style.transform = 'scale(1)';
      button.style.backgroundColor = '#0077ff';
    });

    // demo: equal height
    const cards = document.querySelectorAll('.demo-old-height-card');
    let maxHeight = 0;
    cards.forEach((card: any) => {
      card.style.height = '5em';
      maxHeight = Math.max(maxHeight, card.offsetHeight);
    });

    // demo: sticky header
    const oldHeader: any = document.querySelector('.old.sticky-header-inner-wrapper');
    oldHeader.addEventListener('scroll', function() {
      const header: any = oldHeader.querySelector('.header');
      const stickyThreshold = 16; // Adjust as needed

      if (oldHeader.scrollTop > stickyThreshold) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    });
  }

  show(element: any) {
    element.style.display = "block";
  }

  hide(element: any) {
    element.style.display = "";
  }
}
