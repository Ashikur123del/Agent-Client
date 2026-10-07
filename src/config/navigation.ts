import { IconType } from "react-icons";
import {
    FaTachometerAlt,
    FaUser,
    FaPlane,
    FaCog,
    FaRegUser,
    FaUserCircle,
    FaUserPlus,
    FaList,
    FaMoneyBillWave,
    FaUsers,
} from "react-icons/fa";

export interface NavItem {
    label: string;
    href: string;
    icon: IconType;
    allowedRoles: string[];
}

export const NAV_ITEMS: NavItem[] = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: FaTachometerAlt,
        allowedRoles: ["admin", "agent"],
    },

    // ---------- Admin only (website content) ----------
    {
        label: "Hero Slider",
        href: "/heroslider",
        icon: FaUser,
        allowedRoles: ["admin"],
    },
    {
        label: "Add News",
        href: "/addnews",
        icon: FaPlane,
        allowedRoles: ["admin"],
    },
    {
        label: "Add Gallery",
        href: "/addgallery",
        icon: FaCog,
        allowedRoles: ["admin"],
    },
    {
        label: "Contact Info",
        href: "/contactinfo",
        icon: FaRegUser,
        allowedRoles: ["admin"],
    },
    {
        label: "Agents",
        href: "/agents",
        icon: FaUsers,
        allowedRoles: ["admin"],
    },

    // ---------- Admin + Agent (Hajjah) ----------
    {
        label: "Create Hajjah",
        href: "/hajjahadd",
        icon: FaUserPlus,
        allowedRoles: ["admin", "agent"],
    },
    {
        label: "Hajjah List",
        href: "/hajjahlist",
        icon: FaList,
        allowedRoles: ["admin", "agent"],
    },
    {
        label: "Due / Payment",
        href: "/duepayment",
        icon: FaMoneyBillWave,
        allowedRoles: ["admin", "agent"],
    },

    // ---------- Profile ----------
    {
        label: "My Profile",
        href: "/myprofile",
        icon: FaUserCircle,
        allowedRoles: ["admin", "agent"],
    },
];