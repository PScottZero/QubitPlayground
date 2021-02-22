import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  buttonList = [
    {
      icon: 'wikipedia.svg',
      link: 'https://en.wikipedia.org/wiki/Quantum_logic_gate',
      color: '#FC80FF',
    },
    { icon: 'about_me.svg', link: 'http://pjs4.com', color: '#A252FF' },
    {
      icon: 'github.svg',
      link: 'https://github.com/PScottZero/QubitPlayground',
      color: '#4724FF',
    },
  ];
}
