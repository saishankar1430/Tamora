import headphones from "../assets/images/headphones.jpg";
import watch from "../assets/images/watch.jpg";
import keyboard from "../assets/images/keyboard.jpg";
import mouse from "../assets/images/mouse.jpg";
import speaker from "../assets/images/speaker.jpg";
import monitor from "../assets/images/monitor.jpg";
import laptopStand from "../assets/images/laptop-stand.jpg";
import usbHub from "../assets/images/usb-hub.jpg";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Audio",
    price: 4999,
    rating: 4.8,
    image: headphones,
  },

  {
    id: 2,
    name: "Smart Watch",
    category: "Wearables",
    price: 8999,
    rating: 4.7,
    image: watch,
  },

  {
    id: 3,
    name: "Mechanical Keyboard",
    category: "Accessories",
    price: 6999,
    rating: 4.9,
    image: keyboard,
  },

  {
    id: 4,
    name: "Gaming Mouse",
    category: "Accessories",
    price: 2999,
    rating: 4.8,
    image: mouse,
  },

  {
    id: 5,
    name: "Bluetooth Speaker",
    category: "Audio",
    price: 5499,
    rating: 4.6,
    image: speaker,
  },

  {
    id: 6,
    name: "Laptop Stand",
    category: "Accessories",
    price: 1999,
    rating: 4.5,
    image: laptopStand,
  },

  {
    id: 7,
    name: "4K Monitor",
    category: "Displays",
    price: 18999,
    rating: 4.9,
    image: monitor,
  },

  {
    id: 8,
    name: "USB-C Hub",
    category: "Accessories",
    price: 2499,
    rating: 4.7,
    image: usbHub,
  },
];

export default products;