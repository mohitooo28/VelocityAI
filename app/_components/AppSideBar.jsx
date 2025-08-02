"use client";
import { Button } from "@/components/ui/button";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
    useSidebar,
} from "@/components/ui/sidebar";
import {
    SignOutButton,
    SignUpButton,
    UserButton,
    useUser,
} from "@clerk/nextjs";
import {
    Compass,
    GalleryHorizontalEnd,
    LogOut,
    PanelLeftIcon,
    Search,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MenuOptions = [
    {
        title: "Home",
        icon: Search,
        path: "/",
    },
    {
        title: "Discovery",
        icon: Compass,
        path: "/discovery",
    },
    {
        title: "Library",
        icon: GalleryHorizontalEnd,
        path: "/library",
    },
];

function AppSideBar() {
    const path = usePathname();
    const { user } = useUser();
    const { toggleSidebar, state } = useSidebar();

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader
                className="bg-accent flex flex-row items-center justify-between py-4 px-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:cursor-pointer"
                onClick={() => state === "collapsed" && toggleSidebar()}
            >
                <div className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
                    <Image
                        src={"/logo.svg"}
                        alt="logo"
                        width={22}
                        height={22}
                    />
                </div>
                <div className="hidden group-data-[collapsible=icon]:block relative group hover:cursor-pointer">
                    <Image
                        src={"/logo.svg"}
                        alt="logo"
                        width={28}
                        height={28}
                        className="transition-opacity duration-200 group-hover:opacity-0"
                    />
                    <PanelLeftIcon
                        size={18}
                        className="absolute top-0 left-0 opacity-0 ml-1 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                    />
                </div>
                <SidebarTrigger className="group-data-[collapsible=icon]:hidden" />
            </SidebarHeader>
            <SidebarContent
                className="bg-accent group-data-[collapsible=icon]:cursor-pointer"
                onClick={() => state === "collapsed" && toggleSidebar()}
            >
                <SidebarGroup />
                <SidebarContent>
                    <SidebarMenu>
                        {MenuOptions.map((menu, index) => (
                            <SidebarMenuItem
                                key={index}
                                className="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center"
                            >
                                <SidebarMenuButton
                                    asChild
                                    tooltip={menu.title}
                                    className={`p-5 py-6 hover:bg-transparent hover:font-bold group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:w-auto group-data-[collapsible=icon]:justify-center ${
                                        (menu.path === "/"
                                            ? path === "/"
                                            : path?.startsWith(menu.path)) &&
                                        "font-bold"
                                    }`}
                                    onClick={(e) =>
                                        state === "collapsed" &&
                                        e.stopPropagation()
                                    }
                                >
                                    <Link href={menu.path}>
                                        <menu.icon className="h-8 w-8" />
                                        <span className="text-lg group-data-[collapsible=icon]:hidden">
                                            {menu.title}
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarContent>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter
                className="bg-accent group-data-[collapsible=icon]:cursor-pointer"
                onClick={() => state === "collapsed" && toggleSidebar()}
            >
                <div className="p-3 flex flex-col">
                    <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
                        <UserButton />
                        {/* <div className="group-data-[collapsible=icon]:hidden">
                            <h2 className="text-gray-500 text-[15px]">
                                Made By Mohit
                            </h2>
                        </div> */}
                    </div>

                    {/* <div className="group-data-[collapsible=icon]:hidden">
                        <p className="text-gray-400 text-[13px] mt-2">
                            Fast, AI-powered answers with search precision and
                            clarity.
                        </p>
                    </div> */}

                    {!user ? (
                        <div className="group-data-[collapsible=icon]:hidden">
                            <SignUpButton mode="modal">
                                <Button
                                    variant={"secondary"}
                                    className="text-gray-500 my-3 w-full"
                                >
                                    Sign Up
                                </Button>
                            </SignUpButton>
                        </div>
                    ) : (
                        <div className="mt-3 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
                            <SignOutButton>
                                <Button
                                    variant={"secondary"}
                                    className="text-gray-500 group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:w-auto"
                                    size="sm"
                                    onClick={(e) =>
                                        state === "collapsed" &&
                                        e.stopPropagation()
                                    }
                                >
                                    <LogOut className="h-4 w-4 group-data-[collapsible=icon]:h-5 group-data-[collapsible=icon]:w-5" />
                                    <span className="group-data-[collapsible=icon]:hidden ml-2">
                                        Log Out
                                    </span>
                                </Button>
                            </SignOutButton>
                        </div>
                    )}
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}

export default AppSideBar;
