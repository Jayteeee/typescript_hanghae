interface User {
  id: number;
  name: string;
  role: "admin" | "customer";
}

interface Beverage {
  name: string;
  price: number;
}

interface Order {
  orderId: number;
  customerId: number;
  customerName: string;
  beverageName: string;
  status: "placed" | "completed" | "picked-up";
}

let beverages: Beverage[] = [];
let orders: Order[] = [];

const isCustomer = (user: User): boolean => {
  return user.role === "customer";
};
const isAdmin = (user: User): boolean => {
  return user.role === "admin";
};

function addBeverage(user: User, name: string, price: number): void {
  if (!isAdmin(user)) {
    console.log("권한이 없습니다.");
    return;
  }

  const newBeverage: Beverage = { name, price };
  beverages.push(newBeverage);
}

function removeBeverage(user: User, beverageName: string): void {
  if (!isAdmin(user)) {
    console.log("권한이 없습니다.");
    return;
  }

  beverages = beverages.filter((beverage) => beverage.name != beverageName);
}

function getBeverages(user: User): Beverage[] {
  if (!user) {
    return [];
  }
  return beverages;
}

function findBeverage(beverageName: string): Beverage | undefined {
  return beverages.find((beverage) => beverage.name === beverageName);
}

function placeOrder(user: User, beverageName: string): number {
  if (!isCustomer(user)) {
    console.log("권한이 없습니다.");
    return -1;
  }

  const beverage = findBeverage(beverageName);
  if (!beverage) {
    console.log("해당 음료를 찾을 수 없습니다.");
    return -1;
  }

  const newOrder: Order = {
    orderId: orders.length + 1,
    customerId: user.id,
    customerName: user.name,
    beverageName,
    status: "placed",
  };
  orders.push(newOrder);
  return newOrder.orderId;
}
