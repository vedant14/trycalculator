import { AgeCalculatorForm } from "./";

export function CalculatorDecider({ title, calculator }) {
  if ((calculator = "age-calculator")) {
    return <AgeCalculatorForm title={title} />;
  }
}
