type CSSUnit = 'px' | 'em' | 'rem' | '%';
type Size = `${number}${CSSUnit}`;

function setWidth(width: Size) {
  element.style.width = width;
}

setWidth('100px');   // ✅
setWidth('50%');     // ✅
setWidth('100');     // ❌ Must include unit
