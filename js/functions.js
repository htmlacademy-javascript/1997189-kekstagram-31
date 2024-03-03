
// Делу — время
// Напишите функцию, которая принимает время начала и конца рабочего дня, а также время старта и продолжительность встречи в минутах и возвращает true,

//если встреча не выходит за рамки рабочего дня, и false, если выходит.

// Время указывается в виде строки в формате часы:минуты. Для указания часов и минут могут использоваться как две цифры, так и одна. Например, 8 часов 5 минут могут быть указаны по-разному: 08:05, 8:5, 08:5 или 8:05.

// Продолжительность задаётся числом. Гарантируется, что и рабочий день, и встреча укладываются в одни календарные сутки.
/*
'8:00' - начало рабочего дня
'17:30' - конец рабочего дня
'14:00' - начало встречи
90 - продолжительность встречи в минутах
*/
// имяФункции('08:00', '17:30', '14:00', 90); // true
// имяФункции('8:0', '10:0', '8:0', 120);     // true
// имяФункции('08:00', '14:30', '14:00', 90); // false
// имяФункции('14:00', '17:30', '08:0', 90);  // false
// имяФункции('8:00', '17:30', '08:00', 900); // false

function getParametrOfMeeting (startOfWorkingDay, endOfWorkingDay, meetingStartTime, durationOfMeeting) {
  const arrFromData = [[...startOfWorkingDay.split(':')], [...endOfWorkingDay.split(':')], [...meetingStartTime.split(':')]];
  const newArr = arrFromData.map((item) => Number(item[0]) * 60 + Number(item[1]));
  [startOfWorkingDay, endOfWorkingDay, meetingStartTime] = newArr;
  return (startOfWorkingDay <= meetingStartTime) && (meetingStartTime + durationOfMeeting <= endOfWorkingDay);
}

getParametrOfMeeting ('14:00', '17:30', '08:0', 90);

//getParametrOfMeeting ('14:00', '17:30', '08:0', 90);

// // // // const checkLength = (string, maxLength) => string?.length <= maxLength;
// // // // checkLength();

// //Является ли строка палиндромом ! код будет падать, если не включить проверку, либо доб параметр по умолч, либо проверку if(!string) {return false} - возвр то значение, которое от нас требется в задаче, т.е в данном случае boolean
// function isPalindrome(string = '') {
//   string = string.toLowerCase().replaceAll(' ', '');
//   return string === [...string].reverse().join('');
// }

// isPalindrome ('5');


// //Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN:

// function makeNumber (str) {
// // //String(str);
//   for (let elem of str) {
//     if(isNaN(elem)) {
//       str = str.replace(elem,'');
//     }
//   }
//   if (!str.length) {
//     return NaN;
//   }
//   return str.replaceAll(' ','');
// }


// const makeNumber = (str) => parseInt(str.replaceAll(' ', '')
//   .split('')
//   .filter((item) => !isNaN(item))
//   .join(''),10);

// // // makeNumber('2023 год');

// // // // console.log(makeNumber('2023 год'))
// // // // console.log(makeNumber('ECMAScript 2022'))
// // // // console.log(makeNumber('1 кефир, 0.5 батона'))
// // // // console.log(makeNumber('агент 007'))
// // // // console.log(makeNumber('а я томат'))
// // // //Дополнительные задания
// // // // имяФункции('2023 год');            // 2023
// // // // имяФункции('ECMAScript 2022');     // 2022
// // // // имяФункции('1 кефир, 0.5 батона'); // 105
// // // // имяФункции('агент 007');           // 7
// // // // имяФункции('а я томат');           // NaN

// // // //На каком этаже и в каком подъезде находится квартира в многоквартирном доме

// // // function calculateEtazh(allFlats, flatsOnFloor, floorsInEntrance, flatNumber) {
// // //   if (allFlats < flatNumber || flatNumber <= 0 || allFlats <= 0 || floorsInEntrance <= 0) {
// // //     return 'Проверьте данные';
// // //   }
// // //   const flatsInOneEntrance = flatsOnFloor * floorsInEntrance;//квартир в подъезде 15
// // //   //const entranceQuantity = allFlats / floorsInEntrance;// количество подъездов 6
// // //   const flatEntrance = Math.ceil(flatNumber / flatsInOneEntrance);//номер подъезда искомой квартиры 6
// // //   const numberOfFlatsInOtherEntrance = (flatEntrance - 1) * 15;//количество квартир в других подъездах
// // //   const flatLocationInEtrance = flatNumber - numberOfFlatsInOtherEntrance;//какая по счету снизу искомая квартира 5-я
// // //   const etashOfWohnung = Math.ceil(flatLocationInEtrance / flatsOnFloor);//округляем до целого в большую сторону, определяем этаж искомой
// // //   return {
// // //     entrance: flatEntrance,
// // //     floor: etashOfWohnung
// // //   };
// // //   // `Квартира ${flatNumber} находится в ${flatEntrance} подъезде на ${etashOfWohnung} этаже `; лучше объектом!
// // // }

// // // const result = calculateEtazh(90, 3, 5, 80);
// // // console.log(`Квартира 80 находится в ${result.entrance} подъезде на ${result.floor} этаже `)


// // // //Проба построить треугольник
// // // const n = 5;
// // // let str = '';
// // // for (let i = 0; i <= n; i++) { //высота пирамиды

// // //   for (let j = 0; j <= i * 2; j++) {
// // //     str += '*';
// // //   }

// // //   for (let k = 0; k < i * 2 - 1; k++) {
// // //     str += ' ';
// // //   }
// // //   str += '\n';
// // // }

// // // console.log(str);

// // // LEarn.js ДЕСТРУКТУРИЗАЦИЯ ОБЪЕКТОВ

// // // Создайте функцию topSalary(salaries), которая возвращает имя самого высокооплачиваемого сотрудника.

// // // Если объект salaries пустой, то нужно вернуть null.
// // // Если несколько высокооплачиваемых сотрудников, можно вернуть любого из них.
// // // P.S. Используйте Object.entries и деструктурирование, чтобы перебрать пары ключ/значение.

// let salaries = {
//   "John": 100,
//   "Pete": 300,
//   "Mary": 250
// };

// function topSalaries (salaries) {
//   if(!salaries) {
//     return null;
//   }

//   let max = 0;
//   let maxName = null;

//   for (const [name, salary] of Object.entries(salaries)) {
//     if(max < salary) {
//       max = salary;
//       maxName = name;
//     }
//   }
//   return maxName;
// }

// topSalaries (salaries);

