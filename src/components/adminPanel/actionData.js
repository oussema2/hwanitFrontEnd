import { faStore } from "@fortawesome/free-solid-svg-icons";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";
import { faPaste } from "@fortawesome/free-solid-svg-icons";
import { faLaptop } from "@fortawesome/free-solid-svg-icons";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faPercent } from "@fortawesome/free-solid-svg-icons";

export const Vendor = [
  {
    name: "Gerer Boutique",
    icon: faStore,
    actions: ["Tout Boutiques", "Ajouter Boutique"],
  },
  {
    name: "Gerer Produit",
    icon: faLaptop,
    actions: ["lister Produit", "Modifier Produit", "ajouter Produit"],
  },
  { name: "Gerer Commande", icon: faPaste, actions: ["Lister  Commandes"] },
  {
    name: "Promotions",
    icon: faPercent,
    actions: ["Liste Promotion", "Ajouter Promotion"],
  },
  { name: "Statistics", icon: faChartBar, actions: ["Vente Statistics"] },
];

export const SuperAdmin = [
  {
    name: "Gerer Boutique",
    icon: faStore,
    actions: ["Tout Boutiques", "Ajouter Boutique"],
  },
  {
    name: "Gerer Produit",
    icon: faLaptop,
    actions: ["lister Produit", "Modifier Produit", "ajouter Produit"],
  },
  { name: "Gerer Commande", icon: faPaste, actions: ["Lister  Commandes"] },
  {
    name: "Promotions",
    icon: faPercent,
    actions: ["Liste Promotion", "Ajouter Promotion"],
  },
  {
    name: "Categories",
    icon: faAddressBook,
    actions: ["Les Categories", "Add Categories"],
  },
  { name: "Brands", icon: faCopyright, actions: ["Les Brands", "Add Brands"] },
  { name: "Vendors", icon: faClipboard, actions: ["List Vendors"] },
  { name: "Users", icon: faUsers, actions: ["List Users"] },
  { name: "Statistics", icon: faChartBar, actions: ["Vente Statistics"] },
];

export const Transporter = [
  { name: "Gerer Commande", icon: faPaste, actions: ["Lister  Commandes"] },
];
