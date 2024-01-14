export interface IDiscountCode {
  id: number;
  name: string;
  discountPercent: number;
  numberOfUses?: number;
  expiresAt?: Date;
}