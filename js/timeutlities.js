export class Date{
    constructor(day, month, year){
      this.day = day;
      this.month = month;
      this.year = year;
    }
    
    get dayOfWeek(){
      return dayOfWeek(this);
    }
    get daysInMonth(){
        return daysInMonth(this);
    }
    get daysSince1970(){
        return daysSince1970(this);
    }
}

export function daysInMonth(date){
    var year = date.year;
    var month = date.month;
    if(month == 2){
         return (year%4 == 0 && (year%100 != 0 || year%400 == 0)) ? 29 : 28;
    }
    if(month <= 7){
        return 30+month%2;
    }
    return 31-month%2;
}

export function dayOfWeek(date){
    return (daysSince1970(date)+4)%7 +1;
}

// reeeeeeeeeeeeeeeee
export function daysSince1970(date){
    var d = date.day, m = date.month, y = date.year;
    y -= m <= 2;
    const era = ((y >= 0 ? y : y-399) / 400) | 0;
    const yoe = ((y - era * 400)) | 0;      // [0, 399]
    const doy = ((153*(m + (m > 2 ? -3 : 9)) + 2)/5 + d-1) | 0;  // [0, 365]
    const doe = yoe * 365 + ((yoe/4) | 0) - ((yoe/100) | 0) + doy;         // [0, 146096]
    return era * 146097 + (doe | 0) - 719468;
}

export class Time{
    constructor(hour, minute){
        this.hour = hour;
        this.minute = minute;
    }

    format(){
        return (this.hour%12)+":"+(this.minute < 10 ? "0" : "")+this.minute+(this.hour < 12 ? "AM" : "PM");
    }
}