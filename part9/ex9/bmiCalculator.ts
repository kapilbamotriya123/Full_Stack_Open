const bmiCalculator = (height: number, weight: number) => {
    const hInMtr = height/100;

    let BMI = weight/(hInMtr**2);
    BMI = Math.round(BMI * 10) / 10;
    if (BMI <= 18.5) {
        return `underweight `;
    }
    else if (BMI >= 18.5 && BMI <= 24.9) {
        return `normalweight `;
    } else if (BMI >=24.9 && BMI <= 29.9) {
        return `Overweight `;
    } else if (BMI >= 29.9) {
        return `Obese `;
    } else {
        return 'invalid';
    }
};

export default bmiCalculator;
