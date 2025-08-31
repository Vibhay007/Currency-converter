import https from "https"  
import readline from "readline"
import chalk from "chalk"
import { log } from "console"
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
const apikey=' fbdf601c9b1099c1f6b1b065'
const url =`https://v6.exchangerate-api.com/v6/fbdf601c9b1099c1f6b1b065/latest/USD`;
 const ConvertCurrency=(amount,rate)=>{
    return amount*rate
 }
 https.get(url,(response)=>{
    let data=" "
    response.on('data',(chunk)=>{
        data +=chunk
    })
    response.on('end',()=>{
     const rates=JSON.parse(data).conversion_rates


rl.question(chalk.cyan.italic.bold("Enter the amount in USD: "), (amount) => {
      rl.question(
        chalk.cyan.italic.bold("Enter the target currency (e.g. INR, EUR, NPR): "),
        (currency) => {
          const rate = rates[currency.toUpperCase()];
          if (rate) {
            console.log(
              chalk.green.bold(
                `${amount} USD = ${ConvertCurrency(amount, rate)} ${currency}`
              )
            );
          } else {
            console.log(chalk.red.bold("Invalid currency code!"));
          }
          rl.close(); 
        }
      );
    });
  });
});