
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

export async function getAllUsersAction(params?: any, options?: { cache?: RequestCache; revalidate?: number }) {
    const result = await userService.getAllUsers(params, options);
    return result;
}
export async function updateUserByAdminAction(id: string, data: Partial<{ [key: string]: any }>) {
    const result = await userService.updateUserByADmin(id, data);
    return result;
}