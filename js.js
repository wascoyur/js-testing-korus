let data = [
    {
        "customer": "MDT",
        "performance": [
            {
                "playId": "Гамлет",
                "audience": 55,
                "type": "tragedy"
            },
            {
                "playId": "Ромео и Джульетта",
                "audience": 35,
                "type": "tragedy"
            },
            {
                "playId": "Отелло",
                "audience": 40,
                "type": "comedy"
            }
        ]
    }
]
console.log(statement(data, 11));
let b = document.querySelector('body');
b.insertAdjacentHTML('afterbegin',statement(data, 11));
function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Счет для ${invoice[0].customer}\n`;
const format = new Intl.NumberFormat("ru-RU",
    {
        style: "currency", currency: "RUB",
        minimumFractionDigits: 2
    }).format;
for (let perf of invoice[0].performance) {
    const play = [perf.playId];
    let thisAmount = 0;
    switch (perf.type) {
        case "tragedy":
            thisAmount = 40000;
            if (perf.audience > 30) {
                thisAmount += 1000 * (perf.audience - 30);
            }
            break;
        case "comedy":
            thisAmount = 30000;
            if (perf.audience > 20) {
                thisAmount += 10000 + 500 * (perf.audience - 20);
            }
            thisAmount += 300 * perf.audience;
            break;
        default:
            throw new Error('неизвестный тип: ${play.type}');
    }

    // Добавление бонусов
    volumeCredits += Math.max(perf.audience - 30, 0);

    // Дополнительный бонус за каждые 10 комедий
    if ("comedy" === perf.type && plays >= 10 ){
        volumeCredits += Math.floor(perf.audience / 5);
    };

 // Вывод строки счета
    result += ` ${play}: ${format(thisAmount / 100)}`;
    result += ` (${perf.audience} мест)\n`;
    totalAmount += thisAmount;

    }
    result += `Итого с вас  ${format(totalAmount/100)}\n`;
    result += `Вы заработали ${volumeCredits} бонусов\n`;
    return result;
}
