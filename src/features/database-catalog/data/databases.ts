import type { Database } from "./database.types";

export const databases: Database[] = [
  { name: "To-Do List", description: "Simple task management database", tableCount: 1 },
  { name: "Contacts", description: "Contacts and groups database", tableCount: 2 },
  { name: "Library", description: "Library with books, members, and loans", tableCount: 3 },
  {
    name: "Fitness Club",
    description: "Gym members and subscriptions database",
    tableCount: 3,
  },
  { name: "Car Rental", description: "Car rental management database", tableCount: 4 },
  {
    name: "Restaurant",
    description: "Restaurant orders and menu items database",
    tableCount: 4,
  },
  {
    name: "HR Payroll",
    description: "Company departments, job positions, employees, and salary history",
    tableCount: 4,
  },
  {
    name: "Logistics",
    description: "Packages, drivers, deliveries, and status history database",
    tableCount: 5,
  },
  {
    name: "Pharmacy",
    description: "Pharmacy inventory, suppliers, customers, and sales database",
    tableCount: 5,
  },
  {
    name: "School",
    description: "School management with students, teachers, classes, enrollments, and grades",
    tableCount: 5,
  },
  {
    name: "Social Network",
    description: "Social media with users, posts, likes, comments, and followers",
    tableCount: 5,
  },
  {
    name: "Hotel",
    description: "Hotel reservations, rooms, payments, employees, and services database",
    tableCount: 6,
  },
  {
    name: "Banking",
    description: "Banking system with accounts, transactions, loans, and employees",
    tableCount: 6,
  },
  {
    name: "E-Commerce",
    description: "Online store with products, orders, carts, and reviews",
    tableCount: 8,
  },
];
