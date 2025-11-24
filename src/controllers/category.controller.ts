import { Request, Response } from "express";
import Category from "../models/Category";

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  const userId = (req as any).user?.id;
  if (!name) return res.status(400).json({ message: "Name required" });

  const category = await Category.create({ name, user: userId });
  res.status(201).json({ category });
};

export const getCategories = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  const categories = await Category.find({ user: userId });
  res.json({ categories });
};

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await Category.findByIdAndUpdate(id, { name }, { new: true });
  res.json({ category });
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Category.findByIdAndDelete(id);
  res.json({ message: "Deleted" });
};
