type Store = {
  [key: string]: string;
};

export class MockStorage {
  private store: Store = {};
  public getItem(key: string): string {
    return this.store[key];
  }

  public setItem(key: string, value: string): void {
    this.store[key] = value;
  }

  public removeItem(key: string): void {
    Object.keys(this.store).forEach(item => {
      if (item === key) {
        delete this.store[key];
      }
    });
  }

  public clear(): void {
    this.store = {};
  }
}
