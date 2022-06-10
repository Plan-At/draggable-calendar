//class for a date (my code gets more dates than me)
export class Date{
    constructor(day, month, year){
      this.day = day;
      this.month = month;
      this.year = year;
    }
  
}

export class Time{
    constructor(hour, minute){
        this.hour = hour;
        this.minute = minute;
    }
    hours(otherTime){
        return otherTime.hour-this.hour;
    }
    format(){
        if(this.hour == 0) return "12:00AM";
        return ((this.hour-1)%12 +1)+":"+(this.minute < 10 ? "0" : "")+this.minute+(this.hour < 12 ? "AM" : "PM");
    }
    add(hour, minute){
        this.hour+=hour;
        this.minute+=minute;
    }
}