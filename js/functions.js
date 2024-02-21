//Проверка длины строки
function checkLength(string, maxLength) {
  return string?.length <= maxLength;
}

checkLength();

//Является ли строка палиндромом
function isPalindrome (string) {
  string = string.toLowerCase().replaceAll(' ','');
  return string === [...string.replaceAll(' ','')].reverse().join('').toLowerCase();
}

isPalindrome ('Лёша на полке клопа нашёл');

//Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN:

function makeNumber (str) {
// //String(str);
  for (let elem of str) {
    if(isNaN(elem)) {
      str = str.replace(elem,'');
    }
  }
  if (!str.length) {
    return NaN;
  }
  return str.replaceAll(' ','');
}
// function makeNumber (str) {
//   return str.replaceAll(' ','').split('').filter((c) => !isNaN(c) ? str.replaceAll(c,'').join('') : NaN);
//   }

makeNumber ('ECMAScript 2022');


//Дополнительные задания
// имяФункции('2023 год');            // 2023
// имяФункции('ECMAScript 2022');     // 2022
// имяФункции('1 кефир, 0.5 батона'); // 105
// имяФункции('агент 007');           // 7
// имяФункции('а я томат');           // NaN

//На каком этаже и в каком подъезде находится квартира в многоквартирном доме

function calculateEtazh(allFlats,flatsOnFloor,floorsInEntrance,flatNumber) {
  if(allFlats < flatNumber || flatNumber <= 0 || allFlats <= 0 || floorsInEntrance <= 0) {
    return 'Проверьте данные';
  }
  const flatsInOneEntrance = flatsOnFloor * floorsInEntrance;//квартир в подъезде 15
  //const entranceQuantity = allFlats / floorsInEntrance;// количество подъездов 6
  const flatEntrance = Math.ceil(flatNumber / flatsInOneEntrance);//номер подъезда искомой квартиры 6
  const numberOfFlatsInOtherEntrance = (flatEntrance - 1) * 15;//количество квартир в других подъездах
  const flatLocationInEtrance = flatNumber - numberOfFlatsInOtherEntrance;//какая по счету снизу искомая квартира 5-я
  const etashOfWohnung = Math.ceil(flatLocationInEtrance / flatsOnFloor);//округляем до целого в большую сторону, определяем этаж искомой
  return `Квартира ${flatNumber} находится в ${flatEntrance} подъезде на ${etashOfWohnung} этаже `;
}

calculateEtazh(90,3,5,80);

//Проба построить треугольник
const n = 5;
let str = '';
for (let i = 0; i <= n; i++) { //высота пирамиды

  for (let j = 0; j <= i * 2; j++) {
    str += '*';
  }

  for (let k = 0; k < i * 2 - 1; k++) {
    str += ' ';
  }
  str += '/n';
}

console.log(str);
