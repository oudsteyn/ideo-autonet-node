export class Setting {

  public static serverPort(): string {
    return process.env.PORT || 8000;
  }

  public static apiBaseUrl(): string {
    return process.env.API_BASE_URL;
  }

  public static recordsUrl(): string {
    return Setting.apiBaseUrl() + 'records';
  }

  public static apiKey(): string {
    return process.env.apiKey;
  }

  public static appApiKey(): string {
    return process.env.appApiKey;
  }
  public static localTimeZone(): string {
    return process.env.localTimeZone;
  }

}

