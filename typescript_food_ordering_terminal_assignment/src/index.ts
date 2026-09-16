type FoodCategory = "pizza" | "burger" | "drink" | "dessert";

interface FoodItem {
    id: number;
    name: string;
    category: FoodCategory;
    price: number;
    isAvailable: boolean;
}

const foodItems: FoodItem[] = [
    { id: 1, name: "Margherita Pizza", category: "pizza", price: 299, isAvailable: true },
    { id: 2, name: "Farmhouse Pizza", category: "pizza", price: 399, isAvailable: true },
    { id: 3, name: "Veg Burger", category: "burger", price: 199, isAvailable: true },
    { id: 4, name: "Cheese Burger", category: "burger", price: 249, isAvailable: true },
    { id: 5, name: "Cold Drink", category: "drink", price: 99, isAvailable: true },
    { id: 6, name: "Chocolate Shake", category: "drink", price: 149, isAvailable: true },
    { id: 7, name: "Chocolate Cake", category: "dessert", price: 199, isAvailable: true },
    { id: 8, name: "Ice Cream", category: "dessert", price: 129, isAvailable: true }
];

interface Customer {
    id: number;
    name: string;
    phone?: string;
    address: string;
}

type CustomerType = "guest" | "member";
type MembershipLevel = "silver" | "gold" | "platinum";

interface Member extends Customer {
    membershipId: string;
    discountPercentage: number;
    membershipLevel: MembershipLevel;
}

const customer: Customer = {
    id: 1,
    name: "Rahul",
    phone: "9876543210",
    address: "Ahmedabad"
};

const member: Member = {
    id: 2,
    name: "Harshil",
    phone: "9876543210",
    address: "Ahmedabad",
    membershipId: "MEM001",
    discountPercentage: 10,
    membershipLevel: "gold"
};

interface CartItem {
    food: FoodItem;
    quantity: number;
    specialInstruction?: string;
}

let cart: CartItem[] = [];

type OrderStatus = "pending" | "confirmed" | "preparing" | "delivered" | "cancelled";

let orderStatus: OrderStatus = "pending";

interface CashPayment {
    method: "cash";
    receivedAmount: number;
}

interface CardPayment {
    method: "card";
    last4Digits: string;
}

interface UpiPayment {
    method: "upi";
    transactionId: string;
}

type Payment = CashPayment | CardPayment | UpiPayment;

function addToCart(food: FoodItem, quantity: number, specialInstruction?: string): void {
    const item: CartItem = {
        food: food,
        quantity: quantity,
        specialInstruction: specialInstruction
    };

    cart.push(item);
}

function removeFromCart(foodId: number): void {
    cart = cart.filter(function(item) {
        return item.food.id !== foodId;
    });
}

function updateQuantity(foodId: number, quantity: number): void {
    for (let item of cart) {
        if (item.food.id === foodId) {
            item.quantity = quantity;
        }
    }
}

function calculateItemTotal(item: CartItem): number {
    return item.food.price * item.quantity;
}

function calculateSubtotal(): number {
    let subtotal = 0;

    for (let item of cart) {
        subtotal = subtotal + calculateItemTotal(item);
    }

    return subtotal;
}

function calculateDiscount(subtotal: number, customerType: CustomerType): number {
    let discount = 0;

    if (customerType === "member") {
        discount = subtotal * member.discountPercentage / 100;
    }

    if (subtotal > 2000) {
        discount = discount + subtotal * 5 / 100;
    }

    return discount;
}

function calculateTax(amount: number): number {
    return amount * 5 / 100;
}

function calculateFinalAmount(subtotal: number, discount: number, tax: number): number {
    return subtotal - discount + tax;
}

function processPayment(payment: Payment, amount: number): void {
    if (payment.method === "cash") {
        console.log("Payment: Cash");
        console.log("Received: ₹" + payment.receivedAmount);
        console.log("Change: ₹" + (payment.receivedAmount - amount));
    } else if (payment.method === "card") {
        console.log("Payment: Card");
        console.log("Card ending: " + payment.last4Digits);
    } else {
        console.log("Payment: UPI");
        console.log("Transaction ID: " + payment.transactionId);
    }
}

function updateOrderStatus(status: OrderStatus): void {
    orderStatus = status;
    console.log("Order Status: " + orderStatus);
}

function generateBill(customer: Customer, customerType: CustomerType, payment: Payment): void {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount(subtotal, customerType);
    const amountAfterDiscount = subtotal - discount;
    const tax = calculateTax(amountAfterDiscount);
    const finalAmount = calculateFinalAmount(subtotal, discount, tax);

    console.log("==============================");
    console.log("       FOOD ORDER BILL");
    console.log("==============================");
    console.log("Customer: " + customer.name);
    console.log("Address: " + customer.address);
    console.log("");

    for (let item of cart) {
        console.log(
            item.food.name + " x " + item.quantity +
            " = ₹" + calculateItemTotal(item)
        );
    }

    console.log("");
    console.log("Subtotal: ₹" + subtotal);
    console.log("Discount: ₹" + discount);
    console.log("GST 5%: ₹" + tax);
    console.log("Final Amount: ₹" + finalAmount);
    console.log("");

    processPayment(payment, finalAmount);

    console.log("");
    console.log("Order Status: " + orderStatus);
    console.log("==============================");
}

addToCart(foodItems[0], 2);
addToCart(foodItems[2], 1, "No onion");
addToCart(foodItems[4], 2);

updateQuantity(3, 2);

console.log("Subtotal: ₹" + calculateSubtotal());

updateOrderStatus("confirmed");

const payment: Payment = {
    method: "upi",
    transactionId: "UPI123456"
};

generateBill(member, "member", payment);

updateOrderStatus("preparing");
updateOrderStatus("delivered");