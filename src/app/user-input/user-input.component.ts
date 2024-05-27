import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

function calculateInvestmentResults(
  initialInvestment: number,
  annualInvestment: number,
  expectedReturn: number,
  duration: number
) {
  const annualData = [];
  let investmentValue = initialInvestment;

  for (let i = 0; i < duration; i++) {
    const year = i + 1;
    const interestEarnedInYear = investmentValue * (expectedReturn / 100);
    investmentValue += interestEarnedInYear + annualInvestment;
    const totalInterest =
      investmentValue - annualInvestment * year - initialInvestment;
    annualData.push({
      year: year,
      interest: interestEarnedInYear,
      valueEndOfYear: investmentValue,
      annualInvestment: annualInvestment,
      totalInterest: totalInterest,
      totalAmountInvested: initialInvestment + annualInvestment * year,
    });
  }

  return annualData;
}

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
})
export class UserInputComponent {
  enteredInitialInvestment = '';
  enteredAnnualInvestment = '';
  enteredExpectedReturn = '';
  enteredDuration = '';

  onSubmit() {
    const initialInvestment = +this.enteredInitialInvestment;
    const annualInvestment = +this.enteredAnnualInvestment;
    const expectedReturn = +this.enteredExpectedReturn;
    const duration = +this.enteredDuration;

    const annualData = calculateInvestmentResults(
      initialInvestment,
      annualInvestment,
      expectedReturn,
      duration
    );
  }
}
