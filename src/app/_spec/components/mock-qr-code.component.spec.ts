import { Component, Input } from '@angular/core';

@Component({
  selector: 'qr-code',
  template: '<div>qr-code</div>',
})
export class MockQrCodeComponent {
  @Input() class: string = '';
  @Input() value: string = ''
  @Input() size: string = ''
  @Input() darkColor: string = ''
  @Input() lightColor: string = ''
  @Input() errorCorrectionLevel: string = ''
}