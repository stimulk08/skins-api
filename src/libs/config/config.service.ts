import { config } from 'dotenv';

export type ConfigValueType = 'string' | 'number' | 'boolean';

export class ConfigService {
  private readonly typeToParser: Record<
    ConfigValueType,
    (value: string) => any
  > = {
    string: (value: string) => value,
    number: (value: string) => parseFloat(value),
    boolean: (value: string) => value !== undefined && value === 'true',
  };
  constructor() {
    config();
  }

  get(key: string, type: 'boolean'): boolean;
  get(key: string, type: 'string'): string;
  get(key: string, type: 'number'): number;
  get(
    key: string,
    type: ConfigValueType = 'string',
  ): string | number | boolean | undefined {
    const value = process.env[key];
    if (!value) {
      return undefined;
    }
    return this.typeToParser[type](value);
  }
}

export const configService = new ConfigService();
