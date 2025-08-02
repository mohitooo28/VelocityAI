"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { supabase } from "@/services/supabase";
import { UserDetailsContext } from "@/context/UserDetailsContext";

function Provider({ children }) {
    const { user } = useUser();

    const [userDetail, setUserDetail] = useState();

    useEffect(() => {
        user && CreateNewUser();
    }, [user]);

    const CreateNewUser = async () => {
        try {
            if (!supabase) {
                console.error("Supabase client is not initialized");
                return;
            }

            let { data: Users, error } = await supabase
                .from("Users")
                .select("*")
                .eq("email", user?.primaryEmailAddress.emailAddress);

            if (error) {
                console.error("Error fetching users:", error);
                return;
            }

            console.log("Existing users:", Users);

            if (Users.length == 0) {
                const { data, error } = await supabase
                    .from("Users")
                    .insert([
                        {
                            name: user?.fullName,
                            email: user?.primaryEmailAddress.emailAddress,
                        },
                    ])
                    .select();

                setUserDetail(data[0]);
                return;
            }

            setUserDetail(Users[0]);
        } catch (err) {
            console.error("Error in CreateNewUser:", err);
        }
    };

    return (
        <UserDetailsContext.Provider value={{ userDetail, setUserDetail }}>
            <div className="w-full">{children}</div>
        </UserDetailsContext.Provider>
    );
}

export default Provider;
