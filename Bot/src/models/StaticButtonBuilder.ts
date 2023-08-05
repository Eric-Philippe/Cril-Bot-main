export default class StaticButtonBuilder {
  // The validator is a function that will return a boolean value
  private validator: (str: string) => boolean;

  constructor() {
    this.validator = () => false;
  }

  public equals(str: string) {
    this.validator = (input: string) => input === str;
    return this;
  }

  public contains(str: string) {
    this.validator = (input: string) => input.includes(str);
    return this;
  }

  public startsWith(str: string) {
    this.validator = (input: string) => input.startsWith(str);
    return this;
  }

  public endsWith(str: string) {
    this.validator = (input: string) => input.endsWith(str);
    return this;
  }

  public check(str: string) {
    return this.validator(str);
  }
}
