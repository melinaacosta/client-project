import { DateFormatPipe } from './date-format';

describe('DateFormatPipe', () => {
  let pipe: DateFormatPipe;

  beforeEach(() => {
    pipe = new DateFormatPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty string for null value', () => {
    expect(pipe.transform(null)).toBe('');
  });

  it('should return empty string for empty string', () => {
    expect(pipe.transform('')).toBe('');
  });

  it('should format Date object correctly', () => {
    const date = new Date(2023, 6, 15);
    const result = pipe.transform(date);
    expect(result).toBe('15/07/2023');
  });

  it('should format string date correctly', () => {
    const result = pipe.transform('2023-12-25T00:00:00');
    expect(result).toMatch(/^\d{2}\/12\/2023$/);
  });

  it('should pad single digit day with zero', () => {
    const date = new Date(2023, 6, 5);
    const result = pipe.transform(date);
    expect(result).toBe('05/07/2023');
  });

  it('should pad single digit month with zero', () => {
    const date = new Date(2023, 2, 15);
    const result = pipe.transform(date);
    expect(result).toBe('15/03/2023');
  });

  it('should format start of year correctly', () => {
    const date = new Date(2023, 0, 1);
    const result = pipe.transform(date);
    expect(result).toBe('01/01/2023');
  });

  it('should format end of year correctly', () => {
    const date = new Date(2023, 11, 31);
    const result = pipe.transform(date);
    expect(result).toBe('31/12/2023');
  });

  it('should handle different year formats', () => {
    const date = new Date(1995, 5, 20);
    const result = pipe.transform(date);
    expect(result).toBe('20/06/1995');
  });

  it('should format ISO string correctly', () => {
    const isoString = '2023-08-15T10:30:00.000Z';
    const result = pipe.transform(isoString);
    expect(result).toMatch(/^\d{2}\/\d{2}\/2023$/);
  });

  it('should handle leap year date', () => {
    const date = new Date(2024, 1, 29);
    const result = pipe.transform(date);
    expect(result).toBe('29/02/2024');
  });
});
