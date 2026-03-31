
'use server'
import { userService } from "@/services/user.services";
import { UserCreateInput } from "@/types/auth.types";


export async function updateUserProfileAction( updateData: Partial<UserCreateInput>) {
    const result = await userService.updateUser(updateData);
    return result;
}

export async function deleteuserown() {
    const result = await userService.deleteUserOwn();
    return result;
}