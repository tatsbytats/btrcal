function calculate() {
    const currentBalance = parseFloat(document.getElementById('currentBalance').value) || 0;
    const vacationLeaveUsed = parseFloat(document.getElementById('vacationLeaveUsed').value) || 0;
    const numberint = parseFloat(document.getElementById('tardiness').value) || 0;

    // Combine tardiness and under time into total minutes lost
    const totalMinutesLost = numberint;

    // Convert total minutes lost to fraction of a day
    const totalMinutesFraction = convertMinutesToFraction(totalMinutesLost);

    // Gain per month (1.250 hours accrued)
    const vacationLeaveAccrued = 1.250;

    // Calculate remaining vacation leave
    const totalVacationRemaining = currentBalance + vacationLeaveAccrued - vacationLeaveUsed - totalMinutesFraction;

    let resultText = `
        <p>Total Vacation Leave Accrued: ${vacationLeaveAccrued.toFixed(3)} hours</p>
        <p>Current Vacation Leave Balance: ${currentBalance.toFixed(3)} hours</p>
        <p>Total Vacation Leave Used: ${vacationLeaveUsed.toFixed(3)} hours</p>
        <p>Total Tardiness + Under Time: ${totalMinutesLost} minutes (Equivalent Fraction: ${totalMinutesFraction.toFixed(3)} days)</p>
        <p>Total Vacation Leave Remaining: ${totalVacationRemaining.toFixed(3)} hours</p>
    `;

    if (totalVacationRemaining < 0) {
        resultText += "<p style='color: red;'>Warning: Negative Vacation Leave Remaining!</p>";
    }

    document.getElementById('results').innerHTML = resultText;
}
function convertHours() {
    const hours = parseFloat(document.getElementById('hoursInput').value) || 0;
    const fractionOfDay = (hours / 8).toFixed(3);  // Assuming 8-hour workday
    document.getElementById('hoursResult').innerHTML = `Equivalent Day: ${fractionOfDay}`;
}


// Convert total minutes (even if exceeding 60) to fraction of a day
function convertMinutesToFraction(totalMinutes) {
    const minuteFractions = {
        1: 0.002,  2: 0.004,  3: 0.006,  4: 0.008,  5: 0.010,
        6: 0.012,  7: 0.014,  8: 0.016,  9: 0.018, 10: 0.020,
        11: 0.023, 12: 0.025, 13: 0.027, 14: 0.029, 15: 0.031,
        16: 0.033, 17: 0.035, 18: 0.038, 19: 0.040, 20: 0.042,
        21: 0.044, 22: 0.046, 23: 0.048, 24: 0.050, 25: 0.052,
        26: 0.054, 27: 0.056, 28: 0.058, 29: 0.061, 30: 0.062,
        31: 0.065, 32: 0.067, 33: 0.069, 34: 0.071, 35: 0.073,
        36: 0.075, 37: 0.077, 38: 0.079, 39: 0.081, 40: 0.083,
        41: 0.085, 42: 0.088, 43: 0.090, 44: 0.092, 45: 0.094,
        46: 0.096, 47: 0.098, 48: 0.100, 49: 0.102, 50: 0.104,
        51: 0.106, 52: 0.108, 53: 0.111, 54: 0.113, 55: 0.115,
        56: 0.117, 57: 0.119, 58: 0.121, 59: 0.123, 60: 0.125
    };

    // Calculate full hours from total minutes
    const hours = Math.floor(totalMinutes / 60); // Full hours
    const remainingMinutes = totalMinutes % 60;  // Remaining minutes after full hours

    // Convert hours to fraction of a day (1 hour = 0.125 day)
    const hoursFraction = (hours * 0.125);  // Example: 1 hour = 0.125

    // Convert remaining minutes to fraction of a day
    const minutesFraction = minuteFractions[remainingMinutes] || 0;

    // Return the combined fraction of hours and minutes
    return hoursFraction + minutesFraction;
}

function convertMinutes() {
    const minutes = parseFloat(document.getElementById('minutesInput').value) || 0;
    const fractionOfDay = convertMinutesToFraction(minutes);  // Use the minutes-to-fraction conversion
    document.getElementById('minutesResult').innerHTML = `Equivalent Day: ${fractionOfDay.toFixed(3)}`;
}