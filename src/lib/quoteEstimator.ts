export type PaymentFrequency = "Anual" | "Semestral" | "Trimestral" | "Mensual";

export interface ProjectionRow {
  year: number;
  age: number;
  primaAcumulada: number;
  valAcumulado65: number;
  valEfectivo65: number;
  beneficioMuerte: number;
  valAcumulado50: number;
  valEfectivo50: number;
}

export const LIFE_PRODUCTS = [
  { id: "Best Indexed 100 BMII S&P 500", label: "Best Indexed 100 BMII S&P 500", slug: "best-indexed-100-sp500", premiumFactor: 1, allocation: 0.82, projectedRate: 0.065, conservativeRate: 0.05, hasCashValue: true },
  { id: "Best Indexed BMII S&P 500", label: "Best Indexed BMII S&P 500", slug: "best-indexed-sp500", premiumFactor: 0.96, allocation: 0.8, projectedRate: 0.06, conservativeRate: 0.045, hasCashValue: true },
  { id: "Best Indexed 100 BMII NASDAQ", label: "Best Indexed 100 BMII NASDAQ", slug: "best-indexed-100-nasdaq", premiumFactor: 1.04, allocation: 0.82, projectedRate: 0.07, conservativeRate: 0.05, hasCashValue: true },
  { id: "Best Indexed BMII NASDAQ", label: "Best Indexed BMII NASDAQ", slug: "best-indexed-nasdaq", premiumFactor: 1, allocation: 0.8, projectedRate: 0.065, conservativeRate: 0.045, hasCashValue: true },
  { id: "LifeTime", label: "LifeTime (Vida Entera)", slug: "lifetime", premiumFactor: 1.75, allocation: 0.74, projectedRate: 0.0375, conservativeRate: 0.03, hasCashValue: true },
  { id: "Nova II", label: "Nova II (Vida Universal Flexible)", slug: "nova-ii", premiumFactor: 1.12, allocation: 0.8, projectedRate: 0.055, conservativeRate: 0.04, hasCashValue: true },
  { id: "Term NRNC", label: "Term NRNC (Término 20 años)", slug: "term-nrnc", premiumFactor: 0.26, allocation: 0, projectedRate: 0, conservativeRate: 0, hasCashValue: false },
] as const;

export const HEALTH_PRODUCTS = [
  { id: "Meridian II", label: "Meridian II - USD 7.000.000", maxCov: "$7,000,000 USD", slug: "meridian-ii", baseRate: 1850, deductibles: [1000, 2500, 5000, 10000, 20000], defaultDeductible: 2500 },
  { id: "Azure", label: "Azure - USD 5.000.000", maxCov: "$5,000,000 USD", slug: "azure", baseRate: 1580, deductibles: [1000, 2500, 5000, 10000, 20000], defaultDeductible: 2500 },
  { id: "Ideal", label: "Ideal - USD 2.000.000", maxCov: "$2,000,000 USD", slug: "ideal", baseRate: 1280, deductibles: [500, 1000, 2500, 5000, 10000, 20000], defaultDeductible: 2500 },
  { id: "Support", label: "Support - USD 500.000", maxCov: "$500,000 USD", slug: "support", baseRate: 980, deductibles: [5000, 10000, 20000], defaultDeductible: 5000 },
  { id: "Gastos Médicos Mayores", label: "Gastos Médicos Mayores - USD 500.000", maxCov: "$500,000 USD", slug: "gastos-medicos-mayores", baseRate: 780, deductibles: [5000, 10000, 20000], defaultDeductible: 5000 },
] as const;

const FREQUENCY_FACTORS: Record<PaymentFrequency, number> = {
  Anual: 1,
  Semestral: 0.52,
  Trimestral: 0.27,
  Mensual: 0.09,
};

const DEDUCTIBLE_FACTORS: Record<number, number> = {
  500: 1.28,
  1000: 1.18,
  2000: 1.08,
  2500: 1,
  5000: 0.82,
  10000: 0.68,
  20000: 0.55,
};

function lifeAgeFactor(age: number) {
  if (age < 38) return Math.pow(0.968, 38 - age);
  if (age <= 50) return Math.pow(1.048, age - 38);
  return Math.pow(1.048, 12) * Math.pow(1.072, age - 50);
}

function healthAgeFactor(age: number) {
  if (age < 30) return Math.pow(0.982, 30 - age);
  if (age <= 50) return Math.pow(1.023, age - 30);
  return Math.pow(1.023, 20) * Math.pow(1.047, age - 50);
}

function rangeAround(value: number, variation: number) {
  return {
    min: Math.round(value * (1 - variation)),
    max: Math.round(value * (1 + variation)),
  };
}

export function estimateLifeQuote(input: {
  age: number;
  sex: "1" | "2";
  smoker: boolean;
  productId: string;
  protectionOption: string;
  frequency: PaymentFrequency;
  coverage: number;
  accidentalDeath: boolean;
  accidentalDeathAmount: number;
}) {
  const product = LIFE_PRODUCTS.find((item) => item.id === input.productId) ?? LIFE_PRODUCTS[0];
  const coverage = Math.max(100000, input.coverage);
  const policyFee = 125;
  const sexFactor = input.sex === "2" ? 0.87 : 1;
  const smokerFactor = input.smoker ? 1.55 : 1;
  const growingBenefitFactor = input.protectionOption.startsWith("B") && product.hasCashValue ? 1.08 : 1;
  const recurringBase = 1224 * (coverage / 100000) * lifeAgeFactor(input.age) * sexFactor * smokerFactor * product.premiumFactor * growingBenefitFactor;
  const accidentalRider = input.accidentalDeath ? (input.accidentalDeathAmount / 1000) * 1.75 : 0;
  const recurringPremium = Math.max(0, Math.round(recurringBase + accidentalRider));
  const annualPremium = recurringPremium + policyFee;
  const modalPremium = Math.round(annualPremium * FREQUENCY_FACTORS[input.frequency]);
  const variation = input.smoker || input.age > 60 ? 0.15 : product.id === "LifeTime" ? 0.12 : 0.1;
  const premiumRange = rangeAround(annualPremium, variation);

  const projections: ProjectionRow[] = [];
  let projected = 0;
  let conservative = 0;

  for (let year = 1; year <= 35; year += 1) {
    if (product.hasCashValue) {
      const earlyAllocation = year === 1 ? 0.25 : year <= 10 ? product.allocation : Math.min(0.92, product.allocation + 0.08);
      const loyaltyBonus = year >= 20 && product.id.includes("Indexed") ? 0.01 : 0;
      projected = (projected + recurringPremium * earlyAllocation) * (1 + product.projectedRate + loyaltyBonus);
      conservative = (conservative + recurringPremium * earlyAllocation) * (1 + product.conservativeRate);
    }

    const surrenderFactor = year <= 5 ? 0 : year <= 10 ? 0.7 + (year - 5) * 0.06 : 1;
    const termExpired = !product.hasCashValue && year > 20;
    const deathBenefit = termExpired
      ? 0
      : input.protectionOption.startsWith("B") && product.hasCashValue
        ? coverage + Math.round(projected)
        : coverage;
    const contributionYears = product.hasCashValue ? year : Math.min(year, 20);

    projections.push({
      year,
      age: input.age + year,
      primaAcumulada: annualPremium * contributionYears,
      valAcumulado65: Math.round(projected),
      valEfectivo65: Math.round(projected * surrenderFactor),
      beneficioMuerte: deathBenefit,
      valAcumulado50: Math.round(conservative),
      valEfectivo50: Math.round(conservative * surrenderFactor),
    });
  }

  return {
    primaAnual: annualPremium,
    primaModal: modalPremium,
    primaMin: premiumRange.min,
    primaMax: premiumRange.max,
    coberturaEfectiva: coverage,
    primaBase: Math.round(recurringBase) + policyFee,
    primaAnexos: Math.round(accidentalRider),
    proyecciones: projections,
    hasCashValue: product.hasCashValue,
    projectedRate: product.projectedRate,
    conservativeRate: product.conservativeRate,
  };
}

export function estimateHealthQuote(input: {
  age: number;
  sex: "1" | "2";
  spouseAge?: number;
  includeSpouse: boolean;
  children: number;
  productId: string;
  deductible: number;
  excludesUsa: boolean;
  frequency: PaymentFrequency;
  maternity: boolean;
  transplants: boolean;
  evacuation: boolean;
}) {
  const product = HEALTH_PRODUCTS.find((item) => item.id === input.productId) ?? HEALTH_PRODUCTS[0];
  const deductible = (product.deductibles as readonly number[]).includes(input.deductible) ? input.deductible : product.defaultDeductible;
  const deductibleFactor = DEDUCTIBLE_FACTORS[deductible] ?? 1;
  const geographicFactor = input.excludesUsa ? 0.82 : 1;
  const femaleFactor = input.sex === "2" && input.age <= 45 ? 1.07 : input.sex === "2" ? 0.98 : 1;
  let annual = product.baseRate * healthAgeFactor(input.age) * femaleFactor * deductibleFactor * geographicFactor;

  if (input.includeSpouse && input.spouseAge) {
    annual += product.baseRate * healthAgeFactor(input.spouseAge) * 0.9 * deductibleFactor * geographicFactor;
  }
  if (input.children > 0) {
    annual += product.baseRate * deductibleFactor * geographicFactor * (0.42 + Math.max(0, input.children - 1) * 0.34);
  }

  if (input.maternity) annual *= 1.2;
  if (input.transplants) annual *= 1.04;
  if (input.evacuation) annual *= 1.03;

  const annualPremium = Math.round(annual);
  const modalPremium = Math.round(annualPremium * FREQUENCY_FACTORS[input.frequency]);
  const premiumRange = rangeAround(annualPremium, input.includeSpouse || input.children > 0 ? 0.15 : 0.12);

  return {
    primaAnual: annualPremium,
    primaModal: modalPremium,
    primaMin: premiumRange.min,
    primaMax: premiumRange.max,
    deductible,
  };
}
