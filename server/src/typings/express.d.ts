declare global {
  module "express" {
    interface Request {
      token?: string;
    }
  }
}
