export class TimeConverter {
  public static convertFromUTCToLocalTime(value: Date): Date {
    return new Date(value.toString().replace('T', ' ') + ' UTC');
  }
}
